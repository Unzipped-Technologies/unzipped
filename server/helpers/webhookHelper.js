const keys = require('../../config/keys')
const stripe = require('stripe')(`${keys.stripeSecretKey}`)
const billingHelper = require('./billingHelper')


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

const webhookHandlers = {
    "account.application.deauthorized": () => {},
    "account.updated": accountUpdatedWebhook,
    "customer.created": () => {},
    "charge.succeeded": billingHelper.transferPaymentToFreelancers,
    "customer.subscription.created": () => {},
    "accountCreatedWebhook": accountCreatedWebhook,
    "accountOnboardedWebhook": accountOnboardedWebhook,
};

const handleWebhookEvent = (body) => {    
    // Lookup the appropriate handler based on the body type
    console.log(body.type)
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