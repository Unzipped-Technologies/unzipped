const express = require("express");
const router = express.Router();
const requireLogin = require('../middlewares/requireLogin');

// Refactor
const DashboardServices = require('../../services/dashboard-services/DashboardServices');

router.get('/users/:number', requireLogin, async (req, res) => {
    console.log('request:',req.params.number)
    const allUsers = await DashboardServices.getAllUsers( req.params.number);
    res.send(allUsers)
})

router.get('/orders/:number', requireLogin, async (req, res) => {
    console.log('request:',req.params.number)
    const allOrders = await DashboardServices.getAllOrders( req.params.number);
    res.send(allOrders)
})

router.post('/orders/create', requireLogin, async (req, res) => {
    console.log('request body:',req.body)
    try {
      const allOrders = await DashboardServices.createOrder( req.body, req.user.sub );
      res.send(allOrders);
    } catch (error) {
      res.send({
        message: "Order Failed",
        success: false,
      });
    }
})

router.get('/orders-by-user/:user', requireLogin, async (req, res) => {
    console.log('request',req.params.user)
    const allOrders = await DashboardServices.getOrdersByUser(req.params.user);
    res.send(allOrders)
})

router.post('/orders/date', requireLogin, async (req, res) => {
    console.log('request:',req.body)
    const allOrders = await DashboardServices.getOrdersByDate(req.body.date);
    res.send(allOrders)
})

router.post('/user/delete', requireLogin, async (req, res) => {
    console.log('request:',req.body)
    try {
        const allUsers = await DashboardServices.deleteUser( req.body );
        res.send(allUsers);
    } catch {
        res.status(400).send("User not found");
    }
})

router.get('/promos/:number', requireLogin, async (req, res) => {
    console.log(req.params.number)
    const allPromos = await DashboardServices.getAllPromos( req.params.number );
    res.send(allPromos)
})

router.post('/promos/add', requireLogin, async (req, res) => {
    console.log('request:',req.body)
    const allPromos = await DashboardServices.createPromo( req.body );
    res.send(allPromos)
})

router.post('/promos/delete', requireLogin, async (req, res) => {
    console.log('request:',req.body) 
    try {
        const allPromos = await DashboardServices.deletePromo( req.body );
        res.send(allPromos)
    } catch {
        res.status(400).send("Promo code not found");
    }
})

router.post('/user/add', requireLogin, async (req, res) => {
    console.log('request:',req.body) 
    try {
        const allUsers = await DashboardServices.createUser( req.body );
        res.send(allUsers)
    } catch {
        res.status(400).send(error.message)
    }
})

router.post('/user/edit', requireLogin, async (req, res) => {
    console.log('request:', req.body)
    try {
        const allUsers = await DashboardServices.editUser(req.body)
        res.send(allUsers)
    } catch {
        res.status(400).send(error.message)
    }
})

router.post('/user/update', requireLogin, async (req, res) => {
    console.log('request:', req.body)
    try {
        const existingUser = await DashboardServices.updateUser(req.body)
        res.send(existingUser)
    } catch {
        res.status(400).send('User not found')
    }
})

router.post('/order/refund', requireLogin, async (req, res) => {
    console.log('request:',req.body)
    try {
        const allOrders = await DashboardServices.refundOrders( req.body );
        res.send(allOrders);
    } catch {
        res.status(400).send("Refund order failed");
    }
})

router.post('/status', requireLogin, async (req, res) => {
    console.log('request:',req.body)
    try {
        const allOrders = await DashboardServices.updateOrderStatus( req.body );
        res.send(allOrders);
    } catch {
        res.status(400).send("Update status failed");
    }
})

  router.post('/orders/pdf', async (req, res) => { 
    console.log('request:',req.body)
    try {
        const pdfDoc = await DashboardServices.createOrdersPDF( req );
        pdfDoc.getBase64((data) => {
            res.writeHead(200,
                {
                    'Content-Type': 'application/pdf',
                    'Content-Disposition': `attachment;filename="pending-orders.pdf"`
                });
            const download = Buffer.from(data.toString('utf-8'), 'base64');
            console.log(download)
            res.end(download);
        })
    } catch {
        res.status(400).send("No Hotels Found");
    }
})

module.exports = router;