const Contracts = require('../../models/Contract'); // Import your Contracts model here
const Business = require('../../models/Business');
const ThirdPartyApplications = require('../../models/ThirdPartyApplications');
const PaymentMethod = require('../../models/paymentMethod')
const mongoose = require('mongoose');
const stripe = require("stripe")(
    "sk_test_51N8neBKbRhZhJxMgqn7xtwILzeKZPoobbygMQzxUeAFKi3D2ldnUXCsDiaGfdQOH4oALxxXcEIZXlQ3887et74cu00YBfjyyZM"
);

const createContracts = async (data) => {
    try {
        const newContract = new Contracts(data);
        const savedContract = await newContract.save();
        return savedContract;
    } catch (e) {
        throw Error(`Something went wrong: ${e}`);
    }
};

const createStripeCustomer = async ({ businessId, userId, email, githubId, googleId, calendlyId }) => {
    const customer = await stripe.customers.create({
        email: email,
    });
    const setupIntent = await stripe.setupIntents.create({
        customer: customer.id,
        payment_method_types: ["card"],
        usage: "off_session",
        metadata: {
            customer: customer.id,
            businessId: businessId,
            userId: userId,
            githubId: githubId,
            stripeId: customer.id,
            googleId: googleId,
            calendlyId: calendlyId,
        },
    });
    return setupIntent
}

const createPaymentMethod = async ({ businessId, userId, githubId, stripeId, googleId, calendlyId, paymentMethod }) => {
    try {
        const newThirdPartyApplication = new ThirdPartyApplications({ githubId, stripeId, googleId, calendlyId });
        const savedThirdPartyApplication = await newThirdPartyApplication.save();
        const newPaymentMethod = new PaymentMethod({ businessId, userId, paymentMethod });
        const savedPaymentMethod = await newPaymentMethod.save();
        return { savedThirdPartyApplication, savedPaymentMethod };
    } catch (e) {
        throw Error(`Something went wrong: ${e}`);
    }
}

const getContractById = async (id) => {
    try {
        return await Contracts.findById(id)
            .populate({
                path: 'businessId',
                model: 'businesses', // Replace with the actual 'businesses' model name
            })
            .populate({
                path: 'freelancerId',
                model: 'freelancers', // Replace with the actual 'freelancers' model name
            })
            .populate({
                path: 'departmentId',
                model: 'departments', // Replace with the actual 'freelancers' model name
            })
            .populate({
                path: 'userId',
                model: 'users', // Replace with the actual 'users' model name
            })
            .exec();

    } catch (e) {
        throw Error(`Could not find contract, error: ${e}`);
    }
};


const getContractByfreelacerId = async (id) => {
    try {
        return await Contracts.findOne({ freelancerId: id })
            .populate({
                path: 'businessId',
                model: 'businesses', // Replace with the actual 'businesses' model name
            })
            .populate({
                path: 'freelancerId',
                model: 'freelancers', // Replace with the actual 'freelancers' model name
            })
            .populate({
                path: 'departmentId',
                model: 'departments', // Replace with the actual 'freelancers' model name
            })
            .populate({
                path: 'userId',
                model: 'users', // Replace with the actual 'users' model name
            })
            .exec();
    } catch (e) {
        throw Error(`Could not find contract, error: ${e}`);
    }
};


const updateContract = async (data) => {
    try {
        const updatedContract = await Contracts.findByIdAndUpdate(
            data.contractId,
            { $set: { ...data } },
            { new: true }
        );
        return updatedContract;
    } catch (e) {
        throw Error(`Could not update contract, error: ${e}`);
    }
};

const updateContractByFreelancer = async ({ _id, freelancerId, newIsOfferAcceptedValue }) => {
    try {
        const updatedContract = await Contracts.findOneAndUpdate(
            { _id, freelancerId },
            { $set: { isOfferAccepted: newIsOfferAcceptedValue } },
            { new: true } // This option returns the updated document
        );
        const userId = updatedContract.userId
        const updatedBusiness = await Business.findOneAndUpdate(
            { userId },
            { $push: { employees: updatedContract?._id } },
            { new: true } // This option returns the updated document
        );

        if (!updatedContract) {
            throw Error('Contract not found')
            // Handle the case where no contract with the specified _id and freelancerId was found
        }
        return { updatedContract, updatedBusiness };
    } catch (e) {
        throw Error(`Could not update contract, error: ${e}`);
    }
};



const deleteContract = async (id) => {
    try {
        await Contracts.findByIdAndDelete(id);
        // You can add additional cleanup logic here if needed
    } catch (e) {
        throw Error(`Could not delete contract, error: ${e}`);
    }
};

module.exports = {
    createContracts,
    getContractById,
    updateContract,
    deleteContract,
    getContractByfreelacerId,
    updateContractByFreelancer,
    createStripeCustomer,
    createPaymentMethod,
};
