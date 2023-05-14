const invoice = require('../../models/Invoice');
const mongoose = require('mongoose');

const createInvoice = async () => {
    return await invoice.create(data);
}

const listInvoice = async ({filter, take, skip}) => {
    try {
        const list = await invoice.find({...filter})
            .skip( skip )
            .limit( take )
            .exec()
        return list;
    } catch (e) {
        throw Error(`Could not find department, error: ${e}`);
    } 
}

const getInvoiceByUserId = async () => {
    try {
        return await invoice.findById(id).exec()
    } catch (e) {
        throw Error(`Could not find user, error: ${e}`);
    } 
}

const updateInvoice = async (data) => {
    return await invoice.findAndUpdate({profileId: data.userId, businessId: data.clientId}, {$set:{...data}}).exec();
}

const disableInvoice = async () => {
    return await invoice.updateOne({profileId: data.userId, businessId: data.clientId}, {$set: {isActive: false, isInvoice: true}}).exec();
}

module.exports = {
    createInvoice,
    listInvoice,
    getInvoiceByUserId,
    updateInvoice,
    disableInvoice
}