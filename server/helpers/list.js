const list = require('../../models/List');
const listItems = require('../../models/ListItems');
const mongoose = require('mongoose');

const bulkCreateLists = async (data) => {
    list.bulkWrite(data);
}

const createLists = async (data) => {
    return await list.create(data);
}

const addListItemToList = async (data, listId) => {
    try {
        const updateList = await list.findById(listId)
        const ids = []
        for (const item of data.items) {
            const id = await listItems.create({
                ...item
            });
            ids.push(id.id)
        }
        updateList.listItems.push(...ids.map(item => mongoose.Types.ObjectId(item.id)))
        updateList.save()
        return updateList;
    } catch (e) {
        throw Error(`Something went wrong ${e}`);
    }
}

const getListById = async (id) => {
    try {
        return await list.findOne({userId: id})
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
const listLists = async ({filter, take, skip}) => {
    try {
        const list = await lists.find({...filter})
            .skip( skip )
            .limit( take )
            .populate({
                path: 'listItems', 
                model: 'listItems'
            })
            .exec()
        return list;
    } catch (e) {
        throw Error(`Could not find list, error: ${e}`);
    } 
}

module.exports = {
    bulkCreateLists,
    createLists,
    addListItemToList,
    listLists,
    getListById
}