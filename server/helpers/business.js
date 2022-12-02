const business = require('../../models/Business');
const listItems = require('../../models/ListItems');
const likeHistory = require('../../models/LikeHistory');
const tags = require('../../models/Tag');
const mongoose = require('mongoose');
const { likeEnum } = require('../enum/likeEnum');

const createBusiness = async(data) => {
    // create business
    const newBusiness = await business.create(data);
    await businessAudience.create({
        ...data,
        business: await business.findById(newBusiness.id)
    })
    // create 3 tags ToDo, In Progress, In Review, Done
    let tagsToCreate = ['To-Do', 'In Progress', 'Done']
    for (const tag of tagsToCreate) {
        await tags.create({businessId: newBusiness.id, tagName: tag})
    }
}

const updateBusiness = async (data) => {
    return await business.findByIdAndUpdate(data.listId, {$set:{...data}});
}

const deleteBusiness = async (id) => {
    await business.findByIdAndDelete(id);
    await listItems.deleteMany({listId: id})
    // set list history to archived
    // delete bussiness audience
    // delete questions
}

const getBusinessById = async (id) => {
    try {
        return await business.findById(id)
            .populate({
                path: 'listItems', 
                model: 'listItemss'
            })
            .exec()
    } catch (e) {
        throw Error(`Could not find user, error: ${e}`);
    } 
}

// list lists
const listBusinesses = async ({filter, take, skip}) => {
    try {
        const lists = await business.find({...filter})
            .skip( skip )
            .limit( take )
            .populate({
                path: 'listItems', 
                model: 'listItems'
            })
            .exec()
        return lists;
    } catch (e) {
        throw Error(`Could not find list, error: ${e}`);
    } 
}

// add like to business
const addLikeToBusiness = async (data, id) => {
    try {
        if (data.likeType === likeEnum.BUSINESS_LIKES || data.likeType === likeEnum.BUSINESS_DISLIKES) {
            await likeHistory.findOneAndUpdate({businessId: data.profileId, userId: id}, 
                { $set: { 
                    ...data,
                    freelancer: await freelancer.findById(data.profileId),
                    user: await user.findById(id)  
                }}, { upsert: true  })
            const ids = await likeHistory.find({profileId: data.profileId})
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
            return {likes: ids.length, msg: 'success'};
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
}