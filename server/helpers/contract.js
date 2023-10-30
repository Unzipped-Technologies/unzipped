const Contracts = require('../../models/Contract');
const Business = require('../../models/Business');
const ThirdPartyApplications = require('../../models/ThirdPartyApplications');
const PaymentMethod = require('../../models/paymentMethod')
const mongoose = require('mongoose');
const keys = require('../../config/keys');
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
        const newThirdPartyApplication = new ThirdPartyApplications({ userId, githubId, stripeId, googleId, calendlyId });
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
        const { userId, businessId } = updatedContract
        console.log(updatedContract,"updatedCont")
        const updatedBusiness = await Business.findOneAndUpdate(
            { _id: businessId },
            { $push: { employees: updatedContract?._id } },
            { new: true }
        );
            console.log(updatedBusiness,"busi")
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
