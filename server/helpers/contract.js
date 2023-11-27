const Contracts = require('../../models/Contract');
const Business = require('../../models/Business');
const ThirdPartyApplications = require('../../models/ThirdPartyApplications');
const PaymentMethod = require('../../models/PaymentMethod')
const mongoose = require('mongoose');
const keys = require('../../config/keys');
const Department = require('../../models/Department');
const stripe = require('stripe')(`${keys.stripeSecretKey}`);

const createContracts = async (data) => {
    const { businessId, freelancerId, userId } = data;
    try {
        const existingPaymentMethod = await PaymentMethod.findOne({
            userId: userId
        });
        if (!existingPaymentMethod) {
            throw new Error('No payment method exists against user.');
        }
        const existingContract = await Contracts.findOne({
            businessId: businessId,
            freelancerId: freelancerId
        });

        if (existingContract) {
            throw new Error('Freelancer is already hired for this business.');
        }
        const newContract = new Contracts(data);
        const savedContract = await newContract.save();
        return savedContract;
    } catch (e) {
        throw Error(`Something went wrong: ${e.message}`);
    }
};

const createStripeCustomer = async (data) => {
    const customer = await stripe.customers.create({
        email: data?.email || '',
    });
    const setupIntent = await stripe.setupIntents.create({
        customer: customer.id,
        payment_method_types: ["card"],
        usage: "off_session",
        metadata: {
            customer: customer.id || '',
            businessId: data?.businessId || '',
            userId: data?.userId || '',
            githubId: data?.githubId || '',
            stripeId: customer.id || '',
            googleId: data?.googleId || '',
            calendlyId: data?.calendlyId || '',
        },
    });
    return setupIntent
}

const createPaymentMethod = async (data) => {
    let businessId = data?.data?.businessId;
    let userId = data?.data?.userId;
    const paymentMethod = data?.paymentMethod || '';
    if (businessId === '') {
        businessId = null;
    }
    if (userId === '') {
        userId = null; 
    }

    try {
        const newThirdPartyApplication = new ThirdPartyApplications(data?.data);
        const savedThirdPartyApplication = await newThirdPartyApplication.save();
        const newPaymentMethodData = { paymentMethod };
        if (businessId !== null) {
            newPaymentMethodData.businessId = businessId;
        }
        if (userId !== null) {
            newPaymentMethodData.userId = userId;
        }
        const newPaymentMethod = new PaymentMethod(newPaymentMethodData);
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
                model: 'businesses',
            })
            .populate({
                path: 'freelancerId',
                model: 'freelancers',
            })
            .populate({
                path: 'departmentId',
                model: 'departments',
            })
            .populate({
                path: 'userId',
                model: 'users',
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
                model: 'businesses',
            })
            .populate({
                path: 'freelancerId',
                model: 'freelancers',
            })
            .populate({
                path: 'departmentId',
                model: 'departments',
            })
            .populate({
                path: 'userId',
                model: 'users',
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
            { new: true }
        );
        const { departmentId, businessId } = updatedContract
        await Business.findOneAndUpdate(
            { _id: businessId },
            { $addToSet: { employees: updatedContract?._id } },
            { new: true }
        );

        await Department.findOneAndUpdate(
            { _id: departmentId },
            { $addToSet: { employees: updatedContract?._id } },
            { new: true }
        );


        if (!updatedContract) {
            throw Error('Contract not found')
        }
        return { updatedContract };
    } catch (e) {
        throw Error(`Could not update contract, error: ${e}`);
    }
};

const endContract = async (id) => {
    try {
        const updatedContract = await Contracts.findByIdAndUpdate(
            id,
            { $set: { isActive: false } },
            { new: true }
        );
        if (!updatedContract) {
            throw Error('Contract not found')
        }
        return updatedContract;
    } catch (error) {
        throw Error(`Could not end contract, error: ${e}`);
    }
}

const deleteContract = async (id) => {
    try {
        await Contracts.findByIdAndDelete(id);
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
    endContract,
};
