const mongoose = require('mongoose');
const user = require('../../models/User');
const thirdPartyApplications = require('../../models/ThirdPartyApplications');
const freelancerSkills = require('../../models/FreelancerSkills');
const list = require('../../models/List');
const freelancer = require('../../models/Freelancer');
const listHelper = require('./list');
const { accountTypeEnum } = require("../enum/accountTypeEnum");
const { planEnum } = require("../enum/planEnum");

// create user
const createUser = async (data, hash) => {
    // create User 
    const newUser = await user.create({ 
        ...data, 
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
        const ids = await list.find({userId: newUser.id})
        // update users to have skills
        await user.findByIdAndUpdate(newUser.id, { 
            lists: ids.map(item => mongoose.Types.ObjectId(item.id))
        });
    }
    
    // create 3rd party application row with googleId if have it
    thirdPartyApplications.create({_id: newUser.id, userId: newUser.id})
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
            const ids = await freelancerSkills.find({profileId: newUser.id})
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
        return await user.findByIdAndUpdate(id, {$set:{...data}})
    } catch (e) {
        throw Error(`Something went wrong ${e}`);
    } 
}

// update User
const updateUserByEmail = async (email, data) => {
    try {
        return await user.updateOne({email}, {$set:{...data}})
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
const listUsers = async ({filter, take, skip}) => {
    try {
        return await user.find({...filter}).skip( skip ).limit( take )
    } catch (e) {
        throw Error(`Could not find user, error: ${e}`);
    } 
}

// list freelancers
const listFreelancers = async ({filter, take, skip}) => {
    try {
        const list = await freelancer.find({...filter})
            .skip( skip )
            .limit( take )
            .populate({
                path: 'user', 
                model: 'users', 
                populate: { path: 'freelancerSkills', model: 'freelancerSkills' }
            })
            .exec()
        return list;
    } catch (e) {
        throw Error(`Could not find user, error: ${e}`);
    } 
}

const getFreelancerById = async (id) => {
    try {
        return await freelancer.findOne({userId: id})
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
        return await user.findByIdAndUpdate(id, {$set:{isActive: false}})
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
    getFreelancerById
}