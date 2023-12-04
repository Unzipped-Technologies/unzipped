const express = require("express");
const router = express.Router();
const requireLogin = require('../middlewares/requireLogin');

// Refactor
const OrderService = require('../../services/order-service/OrderService');

router.get('/users/:number', requireLogin, async (req, res) => {
    console.log('request:',req.params.number)
    const allUsers = await OrderService.getAllUsers( req.params.number);
    res.send(allUsers)
})

router.get('/orders/:number', requireLogin, async (req, res) => {
    console.log('request:',req.params.number)
    const allOrders = await OrderService.getAllOrders( req.params.number);
    res.send(allOrders)
})

router.post('/orders/create', requireLogin, async (req, res) => {
    console.log('request body:',req.body)
    try {
      const allOrders = await OrderService.createOrder( req.body, req.user.sub );
      res.send(allOrders);
    } catch (error) {
      res.send({
        message: "Order Failed",
        success: false,
      });
    }
})

router.get('/garage/:number', requireLogin, async (req, res) => {
    console.log('request:',req.params.number)
    const allGarages = await OrderService.getAllGarages( req.params.number );
    res.send(allGarages)
})

router.get('/map/:number', requireLogin, async (req, res) => {
    console.log('request:',req.params.number)
    const allGarages = await OrderService.getAllGarages( req.params.number );
    res.send(allGarages)
})

router.get('/orders-by-user/:user', requireLogin, async (req, res) => {
    console.log('request',req.params.user)
    const allOrders = await OrderService.getOrdersByUser(req.params.user);
    res.send(allOrders)
})

router.post('/orders/date', requireLogin, async (req, res) => {
    console.log('request:',req.body)
    const allOrders = await OrderService.getOrdersByDate(req.body.date);
    res.send(allOrders)
})

router.post('/garage/add', requireLogin, async (req, res) => {
    console.log('request:',req.body)
    const allGarages = await OrderService.createGarage( req.body );
    res.send(allGarages);
})

router.post('/garage/delete', requireLogin, async (req, res) => {
    console.log('request:',req.body)
    try {
        const allGarages = await OrderService.deleteGarage( req.body );
        res.send(allGarages);
    } catch {
        res.status(400).send("Garage not found");
    }
})

router.post('/user/delete', requireLogin, async (req, res) => {
    console.log('request:',req.body)
    try {
        const allUsers = await OrderService.deleteUser( req.body );
        res.send(allUsers);
    } catch {
        res.status(400).send("User not found");
    }
})

router.post('/garage/update', requireLogin, async (req, res) => {
    console.log('request:',req.body) 
    try {
        const allGarages= await OrderService.updateGarage( req.body );
        res.send(allGarages);    
    } catch {
        res.status(400).send("Garage not found");
    }
})

router.get('/promos/:number', requireLogin, async (req, res) => {
    console.log(req.params.number)
    const allPromos = await OrderService.getAllPromos( req.params.number );
    res.send(allPromos)
})

router.post('/promos/add', requireLogin, async (req, res) => {
    console.log('request:',req.body)
    const allPromos = await OrderService.createPromo( req.body );
    res.send(allPromos)
})

router.post('/promos/delete', requireLogin, async (req, res) => {
    console.log('request:',req.body) 
    try {
        const allPromos = await OrderService.deletePromo( req.body );
        res.send(allPromos)
    } catch {
        res.status(400).send("Promo code not found");
    }
})

router.post('/user/add', requireLogin, async (req, res) => {
    console.log('request:',req.body) 
    try {
        const allUsers = await OrderService.createUser( req.body );
        res.send(allUsers)
    } catch {
        res.status(400).send(error.message)
    }
})

router.post('/user/edit', requireLogin, async (req, res) => {
    console.log('request:', req.body)
    try {
        const allUsers = await OrderService.editUser(req.body)
        res.send(allUsers)
    } catch {
        res.status(400).send(error.message)
    }
})

router.post('/user/update', requireLogin, async (req, res) => {
    console.log('request:', req.body)
    try {
        const existingUser = await OrderService.updateUser(req.body)
        res.send(existingUser)
    } catch {
        res.status(400).send('User not found')
    }
})

router.post('/order/refund', requireLogin, async (req, res) => {
    console.log('request:',req.body)
    try {
        const allOrders = await OrderService.refundOrders( req.body );
        res.send(allOrders);
    } catch {
        res.status(400).send("Refund order failed");
    }
})

router.post('/status', requireLogin, async (req, res) => {
    console.log('request:',req.body)
    try {
        const allOrders = await OrderService.updateOrderStatus( req.body );
        res.send(allOrders);
    } catch {
        res.status(400).send("Update status failed");
    }
})

router.post('/garageOrders', requireLogin, async (req, res) => {
    console.log('request:',req.body)
    try {
        const LocationObj = await OrderService.getGarageOrders( req.body.month );
        res.send(LocationObj);
    } catch {
        res.status(400).send("No Garages Found");
    }
})

router.post('/hotelorders', requireLogin, async (req, res) => {
    console.log('request:',req.body)
    try {        
        const HotelObj = await OrderService.getHotelOrders( req.body.month );
        res.send(HotelObj);
    } catch {
        res.status(400).send("No Hotels Found");
    }
})

router.post('/hotelowed', requireLogin, async (req, res) => {
    console.log('request:',req.body)
    try {
        const HotelObj = await OrderService.getHotelOwed( req.body.month );
        res.send(HotelObj);
    } catch {
        res.status(400).send("No Hotels Found");
    }
})

router.post('/hotel/add', requireLogin, async (req, res) => {
    console.log('request:',req.body)
    try {
        const HotelObj = await OrderService.createHotel( req.body );
        res.send(HotelObj);
    } catch {
        res.status(400).send('Error')
    }
})

router.post('/hotel/payment', requireLogin, async (req, res) => {
    console.log(req.body)
    try {
        const HotelObj = await OrderService.createHotelPayment( req.body );
        res.send(HotelObj);
    } catch (error) {
        res.json({
            message: "Failed"
        });
    }
  });


router.post('/hotel/pdf', async (req, res) => {
    console.log('request:',req.body)
    try {
        const pdfDoc= await OrderService.createHotelPDF( req );
        pdfDoc.getBase64((data) => {
            res.writeHead(200,
                {
                    'Content-Type': 'application/pdf',
                    'Content-Disposition': `attachment;filename="${month}-orders.pdf"`
                });
            const download = Buffer.from(data.toString('utf-8'), 'base64');
            console.log(download)
            res.end(download);
        })
    } catch {
        res.status(400).send("No Hotels Found");
    }
})

router.post('/garage/pdf', async (req, res) => {
    console.log('request:',req.body)
    try {
        const pdfDoc = await OrderService.createGaragePDF( req );
        pdfDoc.getBase64((data) => {
            res.writeHead(200,
                {
                    'Content-Type': 'application/pdf',
                    'Content-Disposition': `attachment;filename="${month}-orders.pdf"`
                });
            const download = Buffer.from(data.toString('utf-8'), 'base64');
            console.log(download)
            res.end(download);
        })
    } catch {
        res.status(400).send("No Orders Found");
    }
})

router.post('/hotel/orders/pdf', async (req, res) => {
    console.log('request:',req.body)
    try {
        const pdfDoc = await OrderService.createHotelOrdersPDF( req );
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

  router.post('/orders/pdf', async (req, res) => { 
    console.log('request:',req.body)
    try {
        const pdfDoc = await OrderService.createOrdersPDF( req );
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