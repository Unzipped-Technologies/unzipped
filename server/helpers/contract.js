const contract = require('../../models/Contract');
const mongoose = require('mongoose');

const createContract = async () => {
    return await contract.create(data);
}

const listContract = async ({filter, take, skip}) => {
    try {
        const list = await contract.find({...filter})
            .skip( skip )
            .limit( take )
            .exec()
        return list;
    } catch (e) {
        throw Error(`Could not find department, error: ${e}`);
    } 
}

const getContractByUserId = async () => {
    try {
        return await contract.findById(id).exec()
    } catch (e) {
        throw Error(`Could not find user, error: ${e}`);
    } 
}

const updateContract = async (data) => {
    return await contract.findAndUpdate({profileId: data.userId, businessId: data.clientId}, {$set:{...data}}).exec();
}

const disableContract = async () => {
    return await contract.updateOne({profileId: data.userId, businessId: data.clientId}, {$set: {isActive: false, isContract: true}}).exec();
}

module.exports = {
    createContract,
    listContract,
    getContractByUserId,
    updateContract,
    disableContract
}