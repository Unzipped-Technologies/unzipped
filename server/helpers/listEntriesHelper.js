const mongoose = require('mongoose');
const ListModel = require("../../models/List");
const ContractModel = require("../../models/Contract");
const ListEntriesModel = require("../../models/ListEntries");
const FreelancerModel = require("../../models/Freelancer");
const ListHelper = require("../helpers/list");


const getAllListEntries = async (id, filters) => {
    let page = 1;
    let pageSize = 10;

    if (filters?.page) { page = parseInt(filters.page); };
    if (filters?.pageSize) { pageSize = parseInt(filters.pageSize); }

    const totalCounts = await ListEntriesModel.countDocuments();

    const listEntries = await ListEntriesModel.find({ userId: id })
        .populate(
            {
                path: 'freelancerId',
                model: 'freelancers',
                populate: {
                    path: 'freelancerSkills',
                    model: 'freelancerSkills'
                }
            },

        )
        .populate({
            path: 'userId',
            model: 'users',
        })
        .populate({
            path: 'listId',
            model: 'lists',
        })
        .skip((page - 1) * pageSize)
        .limit(pageSize);

    return { totalCounts, listEntries }

}

const createListEntries = async (params) => await ListEntriesModel.create(params);

const editListEntries = async (listEntryId, listObj) => {
    const { isDefault } = await isDefaultList(listObj.listId);
    if (isDefault) {
        return { message: 'Default list can not be edited' };
    }
    else {

        return await ListEntriesModel
            .findByIdAndUpdate(
                listEntryId,
                {
                    $set: {
                        ...listObj
                    }
                },
                { new: true }
            );
    }
}

const deleteListEntry = async (listId) => {
    const result = await isDefaultList(listId);
    if (result && result.length > 0 && result[0].isDefault) {
        return { message: 'Default list can not be deleted' };
    } else {
        await ListHelper.deleteLists(listId);
        const listIds = await ListEntriesModel.find({ listId });
        if (listIds) {
            const ids = listIds.map(list => list._id);
            const affectedRows = await ListEntriesModel.deleteMany({ listId: { $in: ids } });
            return affectedRows;
        }
    }
}

const updateUserLists = async (params) => await ListModel.find({ userId: params }).sort({ createdAt: 1 });

const isDefaultList = async (params) => {
    return await ListModel.find({ _id: params });
}


const findListEntriesById = async (id) => {
    const entries = await ListEntriesModel.find(
        { listId: id }
    )
        .populate(
            {
                path: 'freelancerId',
                model: 'freelancers',
                select: 'category rate likeTotal',
                populate: {
                    path: 'freelancerSkills',
                    model: 'freelancerSkills',
                    select: 'yearsExperience skill '
                }
            },

        )
        .populate({
            path: 'userId',
            model: 'users',
            select: 'FirstName LastName profileImage AddressLineCountry'
        });

    return entries;
}


const getAllteamMembers = async (id) => {
    return await ContractModel
        .find({
            userId: mongoose.Types.ObjectId(id),
            isOfferAccepted: true
        })
        .populate(
            {
                path: 'freelancerId',
                model: 'freelancers',
                select: 'category rate _id likeTotal',
                populate:
                    [
                        {
                            path: 'user',
                            model: 'users',
                            select: 'FirstName LastName profileImage AddressLineCountry _id',
                        },
                        {
                            path: 'freelancerSkills',
                            model: 'freelancerSkills',
                            select: 'yearsExperience skill '
                        },
                    ]
            }
        )
}

const getRecentlyViewedProfile = async (params) => {
    const userList = await ListModel.find()
    return userList;
}

const createRecentlyViewdRecod = async (params) => {

    const isExistingRecord = await ListEntriesModel.find({
        listId: params.listId,
        freelancerId: params.freelancerId
    })
    if (isExistingRecord && isExistingRecord.length > 0) {
        return { message: 'Record Already Exists' }
    }
    const freelancer = await FreelancerModel.find(
        {
            _id: mongoose.Types.ObjectId(params.freelancerId)
        }
    );
    if (freelancer && freelancer.length > 0) {
        let listEntryObj = {
            userId: freelancer[0].userId,
            freelancerId: params.freelancerId,
            listId: params.listId
        }
        const listEntity = await ListEntriesModel.create(listEntryObj);
        return listEntity;
    }


}


module.exports = {
    createListEntries,
    deleteListEntry,
    getAllListEntries,
    editListEntries,
    updateUserLists,
    findListEntriesById,
    getAllteamMembers,
    getRecentlyViewedProfile,
    createRecentlyViewdRecod
}