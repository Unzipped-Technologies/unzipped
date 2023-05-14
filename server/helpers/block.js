const block = require('../../models/Block');
const mongoose = require('mongoose');

const createBlock = async () => {
    return await block.create(data);
}

const listBlock = async ({filter, take, skip}) => {
    try {
        const list = await block.find({...filter})
            .skip( skip )
            .limit( take )
            .exec()
        return list;
    } catch (e) {
        throw Error(`Could not find blocks, error: ${e}`);
    } 
}

const getBlockByUserId = async () => {
    try {
        return await block.findById(id).exec()
    } catch (e) {
        throw Error(`Could not find blocked user, error: ${e}`);
    } 
}

const updateBlock = async (data) => {
    return await block.findAndUpdate({profileId: data.userId, businessId: data.clientId}, {$set:{...data}}).exec();
}

const disableBlock = async () => {
    return await block.updateOne({profileId: data.userId, businessId: data.clientId}, {$set: {isActive: false, isBlock: true}}).exec();
}

module.exports = {
    createBlock,
    listBlock,
    getBlockByUserId,
    updateBlock,
    disableBlock
}