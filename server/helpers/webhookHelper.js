const keys = require('../../config/keys')
const stripe = require('stripe')(`${keys.stripeSecretKey}`)
const billingHelper = require('./billingHelper')
const userHelper = require('./user')
const { accountVerificationEnum } = require('../enum/accountTypeEnum')
const Mailer = require('../../services/Mailer')


const defaultHandler = (event) => {
    console.log(`No handler for event type '${event.type}'`);
};

const accountUpdatedWebhook = (event) => {
    // Process the account.updated event
    console.log('Handling account.updated event:', event);
}

// Placeholder for actual functions you mentioned
const accountCreatedWebhook = (event) => {
    console.log('Handling account created event:', event);
}

const accountOnboardedWebhook = (event) => {
    console.log('Handling account onboarded event:', event);
}

const paymentSucessful = (event) => {
    console.log('Handling account payout event:', event);
}

const identityVerificationSucessful = async (event) => {
    const user = await billingHelper.getUserById(event.data.metadata?.customer)
    await userHelper.updateUserByid(user.id, { isIdentityVerified: accountVerificationEnum.SUCCESS })
    await Mailer.sendInviteMail({
        to: user.email,
        templateId: "d-2ab2650476da476a8ab7b0c52b822043",
        dynamicTemplateData: {
            firstName: user?.FirstName ? user.FirstName : user.email.split('@')[0],
            lastName: user?.LastName ?? '',
            suportLink: `${keys.redirectDomain}/wiki/getting-started`,
            loginLink: `${keys.redirectDomain}/login`
        }
    })
}

const identityVerificationFailed = async (event) => {
    const user = await billingHelper.getUserById(event.data.metadata?.customer)
    await userHelper.updateUserByid(user.id, { isIdentityVerified: accountVerificationEnum.REJECTED })
    const user2 = await billingHelper.getUserById(event.data.metadata?.customer)
}

const webhookHandlers = {
    "account.application.deauthorized": () => { },
    "account.updated": accountUpdatedWebhook,
    "customer.created": () => { },
    "identity.verification_session.verified": identityVerificationSucessful,
    "identity.verification_session.requires_input": identityVerificationFailed,
    "identity.verification_session.canceled": identityVerificationFailed,
    "payout.paid": paymentSucessful,
    "charge.succeeded": billingHelper.transferPaymentToFreelancers,
    "customer.subscription.created": () => { },
    "accountCreatedWebhook": accountCreatedWebhook,
    "accountOnboardedWebhook": accountOnboardedWebhook,
};

const handleWebhookEvent = (body) => {
    // Lookup the appropriate handler based on the body type
    const handler = webhookHandlers[body.type] || defaultHandler;
    console.log('handler', webhookHandlers[body.type], ': ', handler)
    try {
        handler(body);
    } catch (error) {
        console.error(`Error handling ${body.type}:`, error.message);
    }
};

module.exports = {
    handleWebhookEvent,
};