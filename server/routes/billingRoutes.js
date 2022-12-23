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

router.post('/stripe', requireLogin, async (req, res) => {
    // console.log(req.body)
    let amount = req.body.total * 100;
    let total = req.body.total;
    let id = req.body.orderDetails.id;
    let name = req.body.orderDetails.billing_details.name;
    let card = req.body.orderDetails.card.last4;
    let phone = req.body.orderDetails.billing_details.phone;
    let splitName = name.split(" ");
    let {email} = req.body;
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
      await user.updateOne({_id: req.user.sub}, {$set:{stripeId: customer.id, phone: phone, firstName: splitName[0], lastName: splitName[1]}})
    }

    const existinguser2 = await user.findById(req.user.sub).select('-password');
    if (existinguser2.promo) {
      promoCount = existinguser2.promo;
    } else {
      promoCount = 0
    }

    const paymentMethod = await stripe.paymentMethods.attach(
      id,
      {customer: existinguser2.stripeId}
    );
    if (promo) {
      promoCount += 1
    }
    await user.updateOne({_id: req.user.sub}, {$set:{phone: phone, firstName: splitName[0], lastName: splitName[1], paymentMethod: {card: card, id: id}, promo: promoCount}})
    
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
      const Orders = await Order.find({user: req.user.sub});
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
    const {id, code, description, userType, discount} = req.body;
    const existingPromo = await promo.findOne({ code });
    if (!existingPromo) {
      await promo.create({id, code, description, userType, discount});
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
        res.send({...existingPromo._doc})
      } else {
        if (existingPromo.userType == 'Customer') {
          res.send({...existingPromo._doc})
        } else {
          res.send({error: 'promo not valid'});
        }
      }
    } else {
      res.send({error: 'promo not valid'});
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
      recipients: [{email}],
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
    
    const [existinguser] = await Promise.all([
      user.findByIdAndUpdate(req.user.sub, {$set:{...req.body}}).select('-password')
      
    ])
    if (!existinguser.stripeId) {
      const customer = await stripe.customers.create({
        name: name,
        email: email,
      });
      await user.updateOne({_id: req.user.sub}, {$set:{stripeId: customer.id}})
    }
    const existingUser2 = await user.findById(req.user.sub).select('-password')
    const subscription = await stripe.subscriptions.create({
      customer: existingUser2?.stripeId,
      items: [
        {price: 'price_1MG9bdHVpfsarZmBOVkHthPE'},
      ],
    });

    res.send('success');
  });



  module.exports = router;