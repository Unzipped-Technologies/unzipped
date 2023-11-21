const mongoose = require('mongoose');
const user = require('../../models/User');
const taxDataTables = require('../../models/TaxDataTable');
const thirdPartyApplications = require('../../models/ThirdPartyApplications');
const freelancerSkills = require('../../models/FreelancerSkills');
const list = require('../../models/List');
const freelancer = require('../../models/Freelancer');
const notifications = require('../../models/Notifications');
const emailList = require('../../models/EmailList');
const listHelper = require('./list');
const { accountTypeEnum } = require("../enum/accountTypeEnum");
const { planEnum } = require("../enum/planEnum");
const { notificationEnum } = require("../enum/notificationEnum");
const likeHistory = require('../../models/LikeHistory');
const { likeEnum } = require('../enum/likeEnum');
const FreelancerSkills = require('../../models/FreelancerSkills');
const User = require('../../models/User');

// create user
const createUser = async (data, hash) => {
    // create User 
    const newUser = await user.create({
        ...data,
        // TODO: needs to be removed once email is back online
        isEmailVerified: true,
        password: hash,
        plan: planEnum.UNSUBSCRIBED
    });
    // create favorites and recently viewed list
    if (accountTypeEnum.FOUNDER === data.role || accountTypeEnum.ADMIN === data.role) {
        const listsToCreate = [
            {
                name: 'Favorites',
                icon: "heart"
            },
            {
                name: 'Recently Viewed',
                icon: "eye"
            },
            {
                name: 'My Team',
                icon: "work"
            }
        ]
        for (const item of listsToCreate) {
            const list = {
                name: item.name,
                icon: item.icon,
                userId: newUser.id,
                user: await user.findById(newUser.id)
            }
            await listHelper.createLists(list)
        }
        const ids = await list.find({ userId: newUser.id })
        // update users to have skills
        await user.findByIdAndUpdate(newUser.id, {
            lists: ids.map(item => mongoose.Types.ObjectId(item.id))
        });
    }

    // create 3rd party application row with googleId if have it
    thirdPartyApplications.create({ _id: newUser.id, userId: newUser.id })
    if (accountTypeEnum.INVESTOR === data.role) {
        createFreelanceAccount({
            isAcceptEquity: data.isAcceptEquity,
            rate: data.rate,
            category: data.category,
            userId: newUser.id
        })
        if (data.skills && data.skills.length > 0) {
            for (const skill of data.skills) {
                await freelancerSkills.create({
                    ...skill,
                    profileId: newUser.id,
                    user: await user.findById(newUser.id)
                })
            }
            const ids = await freelancerSkills.find({ profileId: newUser.id })
            // update users to have skills
            await user.findByIdAndUpdate(newUser.id, {
                freelancerSkills: ids.map(item => mongoose.Types.ObjectId(item.id))
            });
        }
    }
    return newUser;
}

// update User
const updateUserByid = async (id, data) => {
    try {
        return await user.findByIdAndUpdate(id, { $set: { ...data } })
    } catch (e) {
        throw Error(`Something went wrong ${e}`);
    }
}

// update tax data
const updateTaxDataByid = async (id, data) => {
    try {
        return await taxDataTables.findByIdAndUpdate(id, { $set: { ...data } })
    } catch (e) {
        throw Error(`Something went wrong ${e}`);
    }
}

// update User
const updateUserByEmail = async (email, data) => {
    try {
        return await user.updateOne({ email }, { $set: { ...data } })
    } catch (e) {
        throw Error(`Something went wrong ${e}`);
    }
}

// get User By Id
const getUserById = async (id) => {
    try {
        return await user.findById(id).select('-password')
    } catch (e) {
        throw Error(`Could not find user, error: ${e}`);
    }
}

// list users
const listUsers = async ({ filter, take, skip }) => {
    try {
        return await user.find({ ...filter }).skip(skip).limit(take)
    } catch (e) {
        throw Error(`Could not find user, error: ${e}`);
    }
}

const listFreelancers = async ({ filter, take, skip, sort, minRate, maxRate, skill }) => {
    try {
        const regexQuery = new RegExp(filter, 'i');
        const existingIndexes = await freelancer.collection.getIndexes();
        const existingFreelancerSkillsIndexes = await FreelancerSkills.collection.getIndexes();
        const existingUserIndexes = await User.collection.getIndexes();
        const indexExists = existingIndexes && 'user_1_rate_1' in existingIndexes;
        const indexExistsFreelancerSkillsIndexes = existingFreelancerSkillsIndexes && 'skill_1' in existingFreelancerSkillsIndexes;
        const indexExistsUserIndexes = existingUserIndexes && 'FullName_1' in existingUserIndexes;
        if (!indexExists) {
            await freelancer.createIndex({ user: 1, rate: 1 });
        }
        if(!indexExistsFreelancerSkillsIndexes){
            await FreelancerSkills.createIndex({skill : 1});
        }
        if(!indexExistsUserIndexes){
            await User.createIndex({ FullName: 1});
            await User.createIndex({ freelancerSkills: 1});
        }

        const aggregationPipeline = [
            {
                $lookup: {
                    from: 'users',
                    let: { userId: '$user' },
                    pipeline: [
                        {
                            $match: {
                                $expr: { $eq: ['$_id', '$$userId'] }
                            }
                        },
                        {
                            $project: {
                                AddressLineCountry: 1,
                                freelancerSkills: 1,
                                FirstName: 1,
                                LastName: 1,
                                profileImage: 1,
                                FullName: 1
                            }
                        }
                    ],
                    as: 'user'
                }
            },
            {
                $unwind: '$user'
            },
            {
                $lookup: {
                    from: 'freelancerskills',
                    let: { freelancerSkills: '$user.freelancerSkills' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $in: ['$_id', '$$freelancerSkills']
                                }
                            }
                        },
                        {
                            $project: {
                                skill: 1,
                            }
                        }
                    ],
                    as: 'user.freelancerSkills'
                }
            },
            {
                $match: {
                    $or: [
                        { 'user.FullName': { $regex: regexQuery } },
                        { 'user.freelancerSkills.skill': { $regex: regexQuery } }
                    ],
                    ...(skill?.length > 0 ? {
                        'user.freelancerSkills.skill': {
                            $in: skill,
                        }
                    } : {}),
                    ...(minRate && {
                        rate: { $gte: +minRate },
                    }),
                    ...(maxRate && {
                        rate: { $lte: +maxRate },
                    })
                },
            },
            ...(sort === 'lowest hourly rate' || sort === 'highest hourly rate' ? [
                {
                    $sort: {
                        rate: sort === 'lowest hourly rate' ? 1 : -1,
                    },
                }
            ] : []),
            {
                $facet: {
                    limitedRecords: [
                        {
                            $skip: +skip,
                        },
                        {
                            $limit: +take,
                        }
                    ],
                    totalCount: [
                        {
                            $count: 'count',
                        }
                    ]
                }
            },
        ];

        const list = await freelancer.aggregate(aggregationPipeline).exec();
        return list[0];
    } catch (e) {
        throw Error(`Could not find user, error: ${e}`);
    }
};


const getFreelancerById = async (id) => {
    try {
        return await freelancer.findById(id)
            .populate({
                path: 'user',
                model: 'users',
                populate: { path: 'freelancerSkills', model: 'freelancerSkills' }
            })
            .exec()
    } catch (e) {
        throw Error(`Could not find user, error: ${e}`);
    }
}

// delete users
const deleteUser = async (id) => {
    // set inactive, dont actually delete
    try {
        return await user.findByIdAndUpdate(id, { $set: { isActive: false } })
    } catch (e) {
        throw Error(`Something went wrong ${e}`);
    }
}

// create freelancer account
const createFreelanceAccount = async (data) => {
    // create this when a user is created that is freelancer
    await freelancer.create({
        ...data,
        user: await user.findById(data.userId)
    });
    return;
}

// add skills to freelancer

const addSkillsToFreelancer = async (data, id) => {
    try {
        const updateUser = await user.findById(id)
        const ids = []
        for (const item of data.skills) {
            const id = await freelancerSkills.create({
                ...item
            });
            ids.push(id.id)
        }
        updateUser.freelancerSkills.push(...ids.map(item => mongoose.Types.ObjectId(item.id)))
        updateUser.save()
        return updateUser;
    } catch (e) {
        throw Error(`Something went wrong ${e}`);
    }
}
// add list to freelancer

const addListsToFreelancer = async (data, id) => {
    try {
        for (const item of data.list) {
            const list = {
                name: item.name,
                icon: item.icon,
                userId: item.userId,
                user: await user.findById(item.userId)
            }
            await listHelper.createLists(list)
        }
        const ids = await list.find({ userId: id })
        // update users to have skills
        await user.findByIdAndUpdate(id, {
            lists: ids.map(item => mongoose.Types.ObjectId(item.id))
        });

        return { msg: 'success' };
    } catch (e) {
        throw Error(`Something went wrong ${e}`);
    }
}

// add like to freelancer

const addLikeToFreelancer = async (data, id) => {
    try {
        if (data.likeType === likeEnum.PROFILE_LIKES || data.likeType === likeEnum.PROFILE_DISLIKES) {
            await likeHistory.findOneAndUpdate({ profileId: data.profileId, userId: id },
                {
                    $set: {
                        ...data,
                        freelancers: await freelancer.findById(data.profileId),
                        user: await user.findById(id)
                    }
                }, { upsert: true })
            const ids = await likeHistory.find({ profileId: data.profileId })
            const likes = ids.filter(item => item.likeType === likeEnum.PROFILE_LIKES)
            const dislikes = ids.filter(item => item.likeType === likeEnum.PROFILE_DISLIKES)
            // update users to have skills
            await freelancer.findByIdAndUpdate(data.profileId, {
                likes: likes.map(item => mongoose.Types.ObjectId(item.id)),
                dislikes: dislikes.map(item => mongoose.Types.ObjectId(item.id)),
                likeTotal: likes.length,
                dislikeTotal: dislikes.length
            });
            await user.findByIdAndUpdate(id, {
                likes: likes.map(item => mongoose.Types.ObjectId(item.id)),
                dislikes: dislikes.map(item => mongoose.Types.ObjectId(item.id)),
                likeTotal: likes.length,
                dislikeTotal: dislikes.length
            })
            return { likes: ids.length, msg: 'success' };
        }

    } catch (e) {
        throw Error(`Something went wrong ${e}`);
    }
}

// remove like from freelancer

const removeLikeToFreelancer = async (data, id) => {
    try {
        if (data.likeType === likeEnum.PROFILE_LIKES || data.likeType === likeEnum.PROFILE_DISLIKES) {
            await likeHistory.findOneAndDelete({ profileId: data.profileId, userId: id })
            const ids = await likeHistory.find({ profileId: data.profileId })
            const likes = ids.filter(item => item.likeType === likeEnum.PROFILE_LIKES)
            const dislikes = ids.filter(item => item.likeType === likeEnum.PROFILE_DISLIKES)
            // update users to have skills
            await freelancer.findByIdAndUpdate(data.profileId, {
                likes: likes.map(item => mongoose.Types.ObjectId(item.id)),
                dislikes: dislikes.map(item => mongoose.Types.ObjectId(item.id)),
                likeTotal: likes.length,
                dislikeTotal: dislikes.length
            });
            await user.findByIdAndUpdate(id, {
                likes: likes.map(item => mongoose.Types.ObjectId(item.id)),
                dislikes: dislikes.map(item => mongoose.Types.ObjectId(item.id)),
                likeTotal: likes.length,
                dislikeTotal: dislikes.length
            })
            return { likes: ids.length, msg: 'success' };
        }

    } catch (e) {
        throw Error(`Something went wrong ${e}`);
    }
}

// list likes for user
const listLikes = async (id) => {
    return user.findById(id)
        .populate({
            path: 'likes',
            model: 'likeHistorys',
            populate: { path: 'freelancers', model: 'freelancers' }
        })
}

// list likes for user
const addToNewsletter = async (data) => {
    return await emailList.findOneAndUpdate({ email: data }, { $set: { email: data, isActive: true } }, { upsert: true })
}

const setUpNotificationsForUser = async (id) => {
    const userNotifications = [
        notificationEnum.IS_GITHUB,
        notificationEnum.PICK_A_PLAN,
        notificationEnum.SELECT_TYPE_OF_TALENT,
        notificationEnum.CREATE_FIRST_BUSINESS,
        // complete account
        notificationEnum.UPDATE_ACCOUNT_DETAILS,
        notificationEnum.UPLOAD_PROFILE_PIC,
        // business notifications
        notificationEnum.HIRE_A_FREELANCER,
        notificationEnum.VIEW_FIRST_INVOICE,
        // freelancer
        notificationEnum.FIND_FIRST_JOB,
    ]
    try {
        for (const notification of userNotifications) {
            await notifications.create({
                type: notification,
                userId: id,
                user: await user.findById(id)
            })
        }

        await user.findByIdAndUpdate(id, {
            notifications: await notifications.find({ userId: id })
        })
    } catch (e) {
        throw Error(`Something went wrong ${e}`);
    }
}

module.exports = {
    createUser,
    updateUserByEmail,
    getUserById,
    listUsers,
    deleteUser,
    createFreelanceAccount,
    addSkillsToFreelancer,
    updateUserByid,
    listFreelancers,
    getFreelancerById,
    addListsToFreelancer,
    setUpNotificationsForUser,
    updateTaxDataByid,
    addLikeToFreelancer,
    removeLikeToFreelancer,
    listLikes,
    addToNewsletter
}