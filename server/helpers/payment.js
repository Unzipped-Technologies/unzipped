const stripe = require('stripe')(`${keys.stripeSecretKey}`);
const user = require('../../models/User');
const paymentHistory = require('../../models/PaymentHistory');

const createStripeCustomer = async (data, userId) => {
    const existinguser = await user.findById(userId).select('-password');
    if (!existinguser.stripeId) {
      const customer = await stripe.customers.create({
        name: data.name,
        email: data.email,
      });
      await user.updateOne({_id: req.user.sub}, {$set:{stripeId: customer.id, phone: phone, firstName: splitName[0], lastName: splitName[1]}})
      return customer;
    }
    return 'customer already exists';
}

const updatePaymentMethod = async (data, userId) => {
    const existinguser = await user.findById(userId).select('-password');
    if (existinguser.stripeId) {
        const paymentMethod = await stripe.paymentMethods.attach(
            data.id,
            {customer: existinguser.stripeId}
        );
        await user.updateOne({_id: req.user.sub}, {$set:{paymentMethod: {card: data.card, id: data.id}}})
        return paymentMethod        
    }
    return;
}

const createPaymentIntent = async (data, userId) => {
    const existinguser = await user.findById(userId).select('-password');
    if (existinguser.paymentMethod) {
        const payment = await stripe.paymentIntents.create({
            amount: data.amount,
            currency: "USD",
            description: "Unzipped Invoice Payment",
            customer: existinguser.stripeId,
            payment_method: existinguser.paymentMethod.id,
            confirm: true,
        });  
        await paymentIntent.create({
            paymentIntent: payment.id,
            userId: existinguser.id,
            subscriptionId: existinguser.stripeSubscription,
            paymentAmount: Number,
        })      
        return payment
    }
    return 'payment method not found'
}

const capturePaymentIntent = async (id) => {
    const paymentIntent = await stripe.paymentIntents.capture(id);
    return paymentIntent
}

module.exports = {
    createStripeCustomer,
    updatePaymentMethod,
    createPaymentIntent,
    capturePaymentIntent
}