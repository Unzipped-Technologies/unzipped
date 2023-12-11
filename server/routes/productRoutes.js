const express = require("express");
const router = express.Router();
const keys = require('../../config/keys');
const product = require('../../models/Product');
const requireLogin = require('../middlewares/requireLogin');
// const Order = require('../../models/Orders');

router.post('/add', requireLogin, async (req, res) => {
    const existingProduct = await product.findOne({ name: req.body.name });
    if (existingProduct) {
        res.json("Product already exists")
    }
    let newProduct = await product.create({ ...req.body });
    res.send({newProduct});
});

router.get('/retreive', async (req, res) => {
    const Products = await product.find();
    res.send([...Products]);
});

// router.get('/getOrders', requireLogin, async (req, res) => {
//     const Orders = await Order.find({user: req.user.sub});
//     res.send([...Orders]);
// });

module.exports = router;