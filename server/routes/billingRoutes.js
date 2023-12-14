const express = require("express");
const router = express.Router();
const requireLogin = require('../middlewares/requireLogin');
const cron = require('node-cron');
const bodyParser = require("body-parser");

// refactor
const billingHelper = require('../helpers/billingHelper');

router.post('/stripe', requireLogin, async (req, res) => {
  console.log(req.body)
  try {
    const Orders = await billingHelper.stripePayment(req.body, req.user.sub);
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
    console.log(req.body)
    const promo = await billingHelper.createPromo( req.body )
    res.send(promo)
});

router.post('/getPromo', requireLogin, async (req, res) => {
  console.log(req.body)
  const promo = await billingHelper.getPromo( req.body )
  res.send(promo)
});

router.post('/receipt', requireLogin, async (req, res) => {
  console.log(req.body);
try {  
  const mailReceipt = await billingHelper.receiptMail( req.body, req.user.sub );
  res.send(mailReceipt);
} catch (error) {
  res.status(400).send(error.message)
}
});

router.post('/subscription/create', requireLogin, async (req, res) => {
  console.log(req.body)
  try{
    const subscription = await billingHelper.createSubscription(req, req.body, req.user.sub);
    res.send(subscription);
  } catch (error) {
    res.status(400).send(error.message)
  }
});

router.post('/subscription/payment/webhook', async (req, res) => {
  console.log(req.body)
  try{
    await billingHelper.subscriptionPayment( req.body, req.user.sub );
    res.send(req.body);
  } catch (error) {
    res.status(400).send(error.message)
  }
});

cron.schedule('59 23 * * 0', async () => {
  try {
    await billingHelper.cronJob();
  } catch (error) {
    return res.status(500).json({ error: `Payment failed: ${error.message}` });
  }
});

router.post(
  "/webhook",
  bodyParser.raw({ type: "application/json" }),
  async (request, response) => {
    billingHelper.handleWebhookEvent(request.body);
    response.send();
  }
);

module.exports = router;