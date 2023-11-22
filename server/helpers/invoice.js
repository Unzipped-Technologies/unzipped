const Invoice = require('../../models/Invoice');

const createInvoice = async (data) => {
    try {
        const newInvoice = new Invoice(data);
        const savedInvoice = await newInvoice.save();
        return savedInvoice;
    } catch (e) {
        throw new Error(`Something went wrong: ${e.message}`);
    }
};
const getInvoiceById = async (id) => {
    try {
        return await Invoice.findById(id).exec();
    } catch (e) {
        throw new Error(`Could not find invoice, error: ${e.message}`);
    }
};

const getAllInvoices = async () => {
    try {
        return await Invoice.find({}).exec();
    } catch (e) {
        throw new Error(`Could not retrieve invoices, error: ${e.message}`);
    }
};
const updateInvoice = async (id, data) => {
    try {
        const updatedInvoice = await Invoice.findByIdAndUpdate(id, { $set: data }, { new: true });
        return updatedInvoice;
    } catch (e) {
        throw new Error(`Could not update invoice, error: ${e.message}`);
    }
};
const deleteInvoice = async (id) => {
    try {
        await Invoice.softDelete({_id: id});
    } catch (e) {
        throw new Error(`Could not delete invoice, error: ${e.message}`);
    }
};
module.exports = {
    createInvoice,
    getInvoiceById,
    getAllInvoices,
    updateInvoice,
    deleteInvoice,
};
