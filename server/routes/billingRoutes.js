const express = require("express");
const router = express.Router();
const keys = require('../../config/keys');
const stripe = require('stripe')(`${keys.stripeSecretKey}`);
const requireLogin = require('../middlewares/requireLogin');
const user = require('../../models/User');
const promo = require('../../models/Promo');
const Order = require('../../models/Orders');
const Mailer = require('../../services/Mailer');
const receiptTemplate = require('../../services/emailTemplates/receipt');
const product = require("../../models/Product");
const subscription = require("../../models/Subscription");
const PaymentHistory = require("../../models/PaymentHistory");
const { paymentStatusEnum, paymentTypeEnum } = require("../enum/paymentEnum");
const cron = require('node-cron');
const Invoice = require("../../models/Invoice");
const bodyParser = require("body-parser");
const PaymentMethod = require("../../models/PaymentMethod");
const InvoiceRecord = require("../../models/InvoiceRecord");
const { ObjectId } = require('mongoose').Types;


router.post('/stripe', requireLogin, async (req, res) => {
  // console.log(req.body)
  let amount = req.body.total * 100;
  let total = req.body.total;
  let id = req.body.orderDetails.id;
  let name = req.body.orderDetails.billing_details.name;
  let card = req.body.orderDetails.card.last4;
  let phone = req.body.orderDetails.billing_details.phone;
  let splitName = name.split(" ");
  let { email } = req.body;
  let promo = req.body.promo;
  let promoCount;
  let orderNum = req.body.order;
  let service = req.body.cart;
  let time = req.body.time;
  let date = req.body.date;
  let transmission = req.body.transmission;
  let location = req.body.location;
  let hotel = req.body.hotel;
  let roomNumber = req.body.roomNumber;
  let valetNumber = req.body.valetNumber;
  var month = new Array(12);
  month[0] = "Jan.";
  month[1] = "Feb.";
  month[2] = "March";
  month[3] = "April";
  month[4] = "May";
  month[5] = "June";
  month[6] = "July";
  month[7] = "Aug.";
  month[8] = "Sept.";
  month[9] = "Oct.";
  month[10] = "Nov.";
  month[11] = "Dec.";
  let orderDate = `${month[new Date().getMonth()]} ${new Date().getDate()} ${new Date().getFullYear()}`

  const existinguser = await user.findById(req.user.sub).select('-password');
  if (!existinguser.stripeId) {
    const customer = await stripe.customers.create({
      name: name,
      email: email,
    });
    await user.updateOne({ _id: req.user.sub }, { $set: { stripeId: customer.id, phone: phone, firstName: splitName[0], lastName: splitName[1] } })
  }

  const existinguser2 = await user.findById(req.user.sub).select('-password');
  if (existinguser2.promo) {
    promoCount = existinguser2.promo;
  } else {
    promoCount = 0
  }

  const paymentMethod = await stripe.paymentMethods.attach(
    id,
    { customer: existinguser2.stripeId }
  );
  if (promo) {
    promoCount += 1
  }
  await user.updateOne({ _id: req.user.sub }, { $set: { phone: phone, firstName: splitName[0], lastName: splitName[1], paymentMethod: { card: card, id: id }, promo: promoCount } })

  try {
    const payment = await stripe.paymentIntents.create({
      amount: amount,
      currency: "USD",
      description: "Vohnt Car Car",
      customer: existinguser2.stripeId,
      payment_method: id,
      confirm: true,
    });
    await Order.create({
      user: req.user.sub,
      name: name,
      email: email,
      services: [...service],
      total: total,
      orderNumber: orderNum,
      Vehicle: existinguser2._doc.defaultVehicle,
      location: location,
      refundId: payment.charges.data[0].id,
      phone: phone,
      roomNumber: roomNumber,
      valetNumber: valetNumber,
      time: time,
      transmission: transmission,
      date: date,
      hotel: hotel,
      orderDate: orderDate,
      promo: promo,
    })
    const Orders = await Order.find({ user: req.user.sub });
    console.log(Orders);
    res.json({
      message: "Payment Successful",
      success: true,
      orderHistory: Orders,
    });
  } catch (error) {
    console.log("stripe-routes.js 17 | error", error);
    res.json({
      message: "Payment Failed",
      success: false,
    });
  }
});

router.post('/promo', requireLogin, async (req, res) => {
  const { id, code, description, userType, discount } = req.body;
  const existingPromo = await promo.findOne({ code });
  if (!existingPromo) {
    await promo.create({ id, code, description, userType, discount });
    res.send('success')
  } else {
    res.send('promo already exists')
  }
});

router.post('/getPromo', requireLogin, async (req, res) => {
  console.log(req.body)
  const { code, userType } = req.body;
  const existingPromo = await promo.findOne({ code });
  console.log(existingPromo)
  if (existingPromo) {
    if (userType === existingPromo.userType) {
      res.send({ ...existingPromo._doc })
    } else {
      if (existingPromo.userType == 'Customer') {
        res.send({ ...existingPromo._doc })
      } else {
        res.send({ error: 'promo not valid' });
      }
    }
  } else {
    res.send({ error: 'promo not valid' });
  }
});

router.post('/receipt', requireLogin, async (req, res) => {
  let today = new Date();
  let currentDate = `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`;
  console.log(currentDate);
  let order = req.body.order;
  let date = req.body.date;
  let time = req.body.time;
  let location = req.body.location;
  let service = req.body.cart.map(({ name }) => name);
  let price = req.body.cart.map(({ price }) => price);
  let quantity = req.body.cart.map(({ quantity }) => quantity);
  let total = req.body.total;
  const existinguser = await user.findById(req.user.sub).select('-password');
  console.log(existinguser);
  const msg = {
    id: existinguser._id,
    recipients: [{ email }],
    name: existinguser.email,
    currentDate: currentDate,
    quantity: quantity,
    order: order,
    date: date,
    time: time,
    location: location,
    service: service,
    price: price,
    total: total,
    // recipients: [{email: "noreplyvohnt@gmail.com"}],
    from: "schedule@vohnt.com",
    subject: `Your Vohnt Order receipt from ${currentDate}`,
  };
  const mailer = new Mailer(msg, receiptTemplate(msg));
  mailer.send();
  res.send('success');
});


router.post('/subscription/create', requireLogin, async (req, res) => {
  // calculate date for free trial end
  const trialEnd = new Date().setDate(new Date().getDate() + 7)

  // get users ip address
  const ip = req.headers['x-forwarded-for'] ||
    req.socket.remoteAddress ||
    null;
  const [existinguser, subscriptionType] = await Promise.all([
    user.findByIdAndUpdate(req.user.sub, { $set: { ...req.body } }).select('-password'),
    product.findOne({ subscriptionType: req.body.selectedPlan, paymentFrequency: req.body.paymentFrequency })
  ]);
  let customerId = existinguser.stripeId

  // if no customer Id then create customer
  if (!existinguser.stripeId) {
    const customer = await stripe.customers.create({
      name: req.body.paymentMethod.card.billing_details.name,
      email: existinguser.email,
      payment_method: req.body.paymentMethod.card.id,
    });
    customerId = customer.id
    await user.updateOne({ _id: req.user.sub }, { $set: { stripeId: customer.id, isUserSubscribed: true } })
  }

  // create user subscription, and a payment history entry
  const [newSubscription] = await Promise.all([
    stripe.subscriptions.create({
      customer: customerId,
      items: [
        { price: subscriptionType.stripePriceId },
      ],
      trial_end: new Date(trialEnd),
      default_payment_method: req.body.paymentMethod.card.id,
      metadata: {
        userId: req.user.sub,
        stripeId: customerId,
        email: existinguser.email
      }
    }),
    subscription.create({
      ...req.body,
      userId: req.user.sub,
      stripeId: customerId,
      plan: req.body.selectedPlan,
      isBusiness: true,
      paymentMethod: {
        card: req.body.paymentMethod.card.card.brand,
        stripeId: req.body.paymentMethod.card.id,
        lastFour: req.body.paymentMethod.card.card.last4
      }
    }),
    PaymentHistory.create({
      userId: req.user.sub,
      ipAddress: ip,
      paymentStatus: paymentStatusEnum.INITIATED,
      paymentType: paymentTypeEnum.SUBSCRIPTION,
      paymentAmount: subscriptionType.price,
    })
  ])
  await Promise.all([
    user.findByIdAndUpdate(req.user.sub, { $set: { trialEndDate: new Date(trialEnd), phoneNumber: req.body.BusinessAddressPhone, stripeSubscription: newSubscription.id } }),
    subscription.findOneAndUpdate(
      { userId: req.user.sub },
      {
        $set: {
          product: await product.findOne({ subscriptionType: req.body.selectedPlan, paymentFrequency: req.body.paymentFrequency }),
          payments: await PaymentHistory.find({ userId: req.user.sub })
        }
      })
  ])
  res.send('success');
});

router.post('/subscription/payment/webhook', async (req, res) => {
  const [current_user, UserSubscription] = await Promise.all([
    user.findById(req.body.userId),
    subscription.findOne({ userId: req.body.id })
      .populate({
        path: 'product',
        model: 'product',
      })
      .exec()
  ])
  await Promise.all([
    PaymentHistory.create({
      userId: current_user.id,
      ipAddress: ip,
      paymentStatus: paymentStatusEnum.SUCCESSFUL,
      paymentType: paymentTypeEnum.SUBSCRIPTION,
      paymentAmount: UserSubscription.product.price,
    })
  ])
  await subscription.findOneAndUpdate(
    { userId: req.user.sub },
    {
      $set: {
        payments: await PaymentHistory.find({ userId: req.user.sub })
      }
    })
  res.send(req.body);
});

async function handleSuccessfulPayment(paymentIntent) {
  const invoiceRecord = await InvoiceRecord.findOne({ _id: paymentIntent.metadata.invoiceRecord });

  await PaymentHistory.updateMany(
    { '_id': { $in: invoiceRecord.paymentHistoryIds } },
    { $set: { isPaymentSuccessful: true } }
  );
  const updatedPaymentHistories = await PaymentHistory
    .find({ '_id': { $in: invoiceRecord.paymentHistoryIds } }).populate({
      path: 'invoiceId',
      model: 'invoices',
      select: 'freelancerId'
    }).select('paymentAmount createdAt').exec();
  const data = updatedPaymentHistories.map(async element => {
    return await user.findByIdAndUpdate(element.invoiceId.freelancerId, { $inc: { totalBalance: element.paymentAmount } }, { new: true })

  });
  const threeDaysAgo = new Date();
  threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
  const threeDaysAgoISO = threeDaysAgo.toISOString();

  await Promise.all(updatedPaymentHistories.map(async element => {
    const elementDate = new Date(element.createdAt);
    if (elementDate > threeDaysAgo) {
      return await user.findByIdAndUpdate(element.invoiceId.freelancerId, {
        $inc: { totalBalance: -element.paymentAmount, totalPending: element.paymentAmount }
      }, { new: true });
    }
  }));

}

async function handleFailedPayment(paymentIntent) {
  const invoiceRecord = await InvoiceRecord.findOne({ _id: paymentIntent.metadata.invoiceRecord });

  await PaymentHistory.updateMany(
    { '_id': { $in: invoiceRecord.paymentHistoryIds } },
    { $set: { isPaymentDeclined: true } }
  );
}


cron.schedule('59 23 * * 0', async () => {
  try {
    const Invoices = await Invoice.aggregate([
      {
        $match: { isApproved: true, isPaid: false }
      },
      {
        $group: {
          _id: '$clientId',
          invoices: { $push: '$$ROOT' },
          totalAmount: { $sum: { $multiply: ["$hourlyRate", "$hoursWorked"] } }
        }
      },
      {
        $project: {
          _id: 1,
          totalAmount: 1,
          invoices: {
            $map: {
              input: "$invoices",
              as: "invoice",
              in: {
                _id: "$$invoice._id",
                hoursWorked: "$$invoice.hoursWorked",
                hourlyRate: "$$invoice.hourlyRate"
              }
            }
          }
        }
      }
    ]);

    const paymentHistories = [];
    Invoices.forEach(entry => {
      const userId = entry._id;
      entry.invoices.forEach(invoice => {
        const paymentHistory = {
          userId: userId,
          invoiceId: invoice._id,
          paymentStatus: paymentStatusEnum.INITIATED,
          paymentType: paymentTypeEnum.FREELANCER_PAYMENT,
          paymentAmount: invoice.hoursWorked * invoice.hourlyRate,
          paymentCurrency: 'USD',
        };
        paymentHistories.push(paymentHistory);
      });
    });

    const paymentHistory = paymentHistories.map(async (ph) => {
      const newPaymentHistory = new PaymentHistory(ph);
      const savedHistory = await newPaymentHistory.save();
      return { _id: savedHistory._id, userId: savedHistory.userId };
    });
    const savedIds = await Promise.all(paymentHistory);

    const groupedByIds = savedIds.reduce((acc, { _id, userId }) => {
      if (acc[userId]) {
        acc[userId].push(_id);
      } else {
        acc[userId] = [_id];
      }
      return acc;
    }, {});

    const invoiceRecordsData = Object.keys(groupedByIds).map(userId => ({
      userId,
      paymentHistoryIds: groupedByIds[userId]
    }));

    const invoiceRecords = await Promise.all(invoiceRecordsData.map(async record => {
      const newInvoiceRecord = new InvoiceRecord(record);
      const savedRecord = await newInvoiceRecord.save();
      return savedRecord._id;
    }));

    const PaymentMethods = await Promise.all(Invoices.map(async (entry) => {
      if (!entry || !entry._id || !ObjectId.isValid(entry._id)) {
        return;
      }

    const paymentMethod = await PaymentMethod.findOne({ userId: ObjectId(entry._id) });
    const records = await InvoiceRecord.findOne({
        _id: { $in: invoiceRecords },
        userId: entry?._id
    }); if (!paymentMethod || !records) {
        return;
    }

    return {
      userId: paymentMethod.userId,
      customerId: paymentMethod.paymentMethod?.customer,
      paymentMethod: paymentMethod.paymentMethod?.payment_method,
      totalAmount: entry.totalAmount,
      invoiceRecord: records._id
    };
    }));

    const transactionPromises = PaymentMethods.map(paymentMethod => {
      if (paymentMethod?.totalAmount) {
        const amountInCents = paymentMethod.totalAmount * 100;
        return stripe.paymentIntents.create({
          amount: amountInCents,
          currency: 'usd',
          payment_method: paymentMethod.paymentMethod,
          customer: paymentMethod.customerId,
          metadata: { invoiceRecord: paymentMethod?.invoiceRecord?.toString() },
          confirm: true,
        });
      } else {
        return Promise.resolve(null);
      }
    });

    Promise.allSettled(transactionPromises).then(results => {
      results.forEach((result, index) => {
        if (result.status === 'rejected') {
          console.error(`Transaction ${index + 1} failed:`, result.reason);
        }
      });
    });

  } catch (error) {
    return res.status(500).json({ error: `Payment failed: ${error.message}` });
  }
});

router.post(
  "/webhook",
  bodyParser.raw({ type: "application/json" }),
  async (request, response) => {
    let event = request.body;

    switch (event.type) {
      case "customer.created":
        const customerCreated = event.data.object;
        console.log("Customer created:", customerCreated);
        break;

      case "setup_intent.succeeded":
        const setupIntentSucceeded = event.data.object;
        console.log("SetupIntent succeeded:", setupIntentSucceeded);
        break;

      case "payment_intent.succeeded":
        const paymentIntentSucceeded = event.data.object;
        handleSuccessfulPayment(paymentIntentSucceeded)
        console.log("PaymentIntent succeeded:", paymentIntentSucceeded);
        break;
      case "payment_intent.failed":
        const paymentIntentFailed = event.data.object;
        handleFailedPayment(paymentIntentFailed)
        console.log("PaymentIntent failed:", paymentIntentFailed);
        break;

      case "payment_intent.canceled":
        const paymentIntentCanceled = event.data.object;
        paymentIntentFailed(paymentIntentCanceled)
        console.log("PaymentIntent canceled:", paymentIntentCanceled);
        break;
      case "issuing_card.created":
        const issuingCardCreated = event.data.object;
        console.log("Issuing Card created:", issuingCardCreated);
        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    response.send();
  }
);

module.exports = router;