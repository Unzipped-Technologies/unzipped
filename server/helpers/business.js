const business = require('../../models/Business');
const businessAudience = require('../../models/BusinessAudience');
const listItems = require('../../models/ListItems');
const likeHistory = require('../../models/LikeHistory');
const department = require('../../models/Department');
const departmentHelper = require('./department')
const tags = require('../../models/tags');
const user = require('../../models/User');
const mongoose = require('mongoose');
const { likeEnum } = require('../enum/likeEnum');
const Contracts = require('../../models/Contract');
const Freelancer = require('../../models/Freelancer');
const TaskHours = require('../../models/TaskHours');

const createBusiness = async (data, id) => {
    // create business
    const newBusiness = await business.create({ ...data, userId: id });
    const audience = await businessAudience.create({
        ...data,
        business: await business.findById(newBusiness.id)
    })
    // create department management and assign main user to it
    const dep = await departmentHelper.addDepartmentToBusiness({
        name: 'Management',
        businessId: newBusiness._id,
        userId: id,
        tags: await tags.find({ businessId: newBusiness._id })
    })
    // associate department with business
    await business.findByIdAndUpdate(newBusiness._id, {
        // departments: [await department.findById(dep._id)],
        audience: await businessAudience.findById(audience._id)
    })
    return { msg: 'business created successfully' }
}

const updateBusiness = async (data) => {
    return await business.findByIdAndUpdate(data.listId, { $set: { ...data } });
}

const deleteBusiness = async (id) => {
    await business.findByIdAndDelete(id);
    await listItems.deleteMany({ listId: id })
    // set list history to archived
    // delete bussiness audience
    // delete questions
}

const getBusinessById = async (id, sub) => {
    try {
        await business.updateMany({ userId: sub }, { $set: { isSelected: false } });
        const getBusiness = await business.findByIdAndUpdate(id, { $set: { isSelected: true } });
        const populatedBusiness = await getBusiness
            .populate({
                path: 'employees',
                model: 'contracts',
                populate: {
                    path: 'freelancerId',
                    model: 'freelancers',
                    populate: {
                        path: 'userId',
                        model: 'users',
                        select: 'email FirstName LastName profileImage freelancers'
                    }
                }
            })
            .execPopulate();
        return { getBusiness: populatedBusiness };
    } catch (e) {
        throw Error(`Could not find user, error: ${e}`);
    }
}

// list lists
const listBusinesses = async ({ filter, take, skip, maxRate, minRate, skill, type }) => {
    try {
        const existingNameIndex = await business.collection.indexes();
        const nameIndexExists = existingNameIndex.some((index) => index.name === 'name_1');

        if (!nameIndexExists) {
            await business.collection.createIndex({ name: 1 }, { name: 'name_1' });
            await business.collection.createIndex({ projectType: 1 }, { name: 'projectType_1' });
            await business.collection.createIndex({ budget: 1 }, { name: 'budget_1' });
            await business.collection.createIndex({ requiredSkills: 1 }, { name: 'requiredSkills_1' });
        }

        const regexQuery = new RegExp(filter, 'i');
        const regexType = new RegExp(type, 'i');
        const aggregationPipeline = [
            {
                $match: {
                    name: { $regex: regexQuery },
                    ...(skill?.length > 0 ? {
                        requiredSkills: {
                            $all: skill,
                        },
                    } : {}),
                    ...(type && {
                        projectType: { $regex: regexType }
                    }),
                    ...(minRate && {
                        budget: { $gte: +minRate },
                    }),
                    ...(maxRate && {
                        budget: { $lte: +maxRate },
                    })
                },
            },
            {
                $lookup: {
                    from: 'users', 
                    localField: 'user',
                    foreignField: '_id',
                    as: 'userProfile'
                }
            },
            {
                $unwind: '$userProfile' 
            },
            {
                $project: {
                    name: 1,
                    budget: 1,
                    projectType: 1,
                    requiredSkills: 1,
                    applicants:1,
                    description: 1,
                    profileImage: '$userProfile.profileImage',
                    country: '$userProfile.AddressLineCountry',
                    likes: '$userProfile.likeTotal',
                    createdAt: 1,
                },
            },
            {
                $sort: {
                    createdAt: -1,
                }
            },
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
        const list = await business.aggregate(aggregationPipeline).exec();
        return list[0];

    } catch (e) {
        throw Error(`Could not find list, error: ${e}`);
    }
}

const getBusinessByInvestor = async ({ businessId, id }) => {
    try {
        // Find freelancer by user id 
        const freelancerIds = await Freelancer.findOne({ userId: id }, '_id');
        const ContractRate = await Contracts.findOne({ freelancerId: freelancerIds._id, businessId: businessId }, 'hourlyRate businessId').populate({ path: "businessId", model: "businesses", select: "name" })
        const dep = await department.aggregate([
            {
                $match: {
                    businessId: businessId
                }
            },
            {
                $lookup: {
                    from: "contracts",
                    localField: "employees",
                    foreignField: "_id",
                    as: "employeeDetails"
                }
            },
            {
                $match: {
                    "employeeDetails.freelancerId": freelancerIds._id
                }
            },
            {
                $project: {
                    _id: 1,

                }
            }
        ]);
        const taskHours = await TaskHours.find({ userId: id, departmentId: dep[0]._id }).populate({ path: 'userId', model: 'users', select: '_id FirstName LastName profileImage' }).populate({
            path: 'taskId', model: 'tasks', select: '_id taskName storyPoints tag',
            populate: {
                path: 'tag',
                model: 'tags',
                select: '_id tagName'
            }
        }).exec()
        const tag = await tags.find({ departmentId: dep[0]._id })
        return { count: taskHours.length, taskHours: taskHours, ContractRate: ContractRate, tags: tag };

    } catch (e) {
        throw Error(`Something went wrong ${e}`);
    }
}


const getBusinessByFounder = async (businessId) => {
    try {
        const businessDetails = await business.findById(businessId).populate({ path: "employees", model: "contracts", select: "departmentId hourlyRate", populate: { path: "freelancerId", model: "freelancers", select: 'userId' } }).select('name employees')
        const taskHoursPromises = businessDetails.employees.map(employee => {
            return TaskHours.find({ userId: employee.freelancerId.userId, departmentId: employee.departmentId }).populate({ path: 'userId', model: 'users', select: '_id FirstName LastName profileImage' }).populate({
                path: 'taskId', model: 'tasks', select: '_id taskName storyPoints tag',
                populate: {
                    path: 'tag',
                    model: 'tags',
                    select: '_id tagName'
                }
            }).exec()
        });

        const results = await Promise.all(taskHoursPromises);
        return { businessDetails: businessDetails, results: [].concat(...results) }
    } catch (error) {

    }
}

const getAllBusinessByInvestor = async (id) => {
    try {
        const freelancerIds = await Freelancer.findOne({ userId: id }, '_id');
        const contracts = await Contracts.find({
            freelancerId: { $in: freelancerIds._id },
            isOfferAccepted: true
        })
            .select('businessId -_id')
            .exec();
        const idsToSearch = contracts.map(item => item.businessId);
        const businesses = await business.find({
            _id: { $in: idsToSearch }
        }).exec();
        return businesses;
    } catch (e) {
        throw Error(`Something went wrong ${e}`);
    }
}

// add like to business
const addLikeToBusiness = async (data, id) => {
    try {
        if (data.likeType === likeEnum.BUSINESS_LIKES || data.likeType === likeEnum.BUSINESS_DISLIKES) {
            await likeHistory.findOneAndUpdate({ businessId: data.profileId, userId: id },
                {
                    $set: {
                        ...data,
                        freelancer: await freelancer.findById(data.profileId),
                        user: await user.findById(id)
                    }
                }, { upsert: true })
            const ids = await likeHistory.find({ profileId: data.profileId })
            const likes = ids.filter(item => item.likeType === likeEnum.PROFILE_LIKES)
            const dislikes = ids.filter(item => item.likeType === likeEnum.PROFILE_DISLIKES)
            // update users to have skills
            await business.findByIdAndUpdate(data.profileId, {
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

module.exports = {
    createBusiness,
    listBusinesses,
    getBusinessById,
    updateBusiness,
    deleteBusiness,
    addLikeToBusiness,
    getAllBusinessByInvestor,
    getBusinessByInvestor,
    getBusinessByFounder
}