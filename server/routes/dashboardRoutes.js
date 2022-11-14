const express = require("express");
const router = express.Router();
const keys = require('../../config/keys');
const pdfMake = require('../../services/pdfmaker/pdfmake');
const pdfFonts = require("../../services/pdfmaker/vfs_fonts");
const requireLogin = require('../middlewares/requireLogin');
const stripe = require('stripe')(keys.stripeSecretKey);
const bcrypt = require('bcryptjs');
const user = require('../../models/User');
const Hotels = require('../../models/hotels');
const promo = require('../../models/Promo');
const Order = require('../../models/Orders');
const Garage = require('../../models/Garages');

router.get('/users/:number', requireLogin, async (req, res) => {
    console.log(req.params.number)
    let limit = 20;
    let number = req.params.number * limit;

    const allUsers = await user.find().skip( number ).limit( limit );
    res.send(allUsers)
})

router.get('/orders/:number', requireLogin, async (req, res) => {
    console.log(req.params.number)
    let limit = 20;
    let number = req.params.number * limit;

    const allUsers = await Order.find().sort({_id: -1}).skip( number ).limit( limit );
    res.send(allUsers)
})

router.post('/orders/create', requireLogin, async (req, res) => {
    let number = 0;
    let limit = 20;
    let total = req.body.total;
    let {email} = req.body;
    let orderNum = req.body.order;
    let vehicle = req.body.vehicle;
    let service = req.body.cart;
    let time = req.body.time;
    let date = req.body.date;
    let location = req.body.location;
    let hotel = req.body.hotel;
    let roomNumber = req.body.roomNumber;
    let transmission = req.body.transmission;
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
    date = `${month[new Date(date).getMonth()]} ${new Date(date).getDate() + 1} ${new Date(date).getFullYear()}`
    try {
      await Order.create({
        user: req.user.sub, 
        email: email, 
        services: [...service], 
        total: total, 
        orderNumber: orderNum, 
        Vehicle: vehicle,
        location: location,
        roomNumber: roomNumber,
        valetNumber: valetNumber,
        time: time,
        date: date,
        transmission: transmission,
        hotel: hotel,
        orderDate: orderDate,
      })
      const allOrders = await Order.find().sort({_id: -1}).skip( number ).limit( limit );
      console.log(allOrders);
      res.send(allOrders);
    } catch (error) {
      res.send({
        message: "Order Failed",
        success: false,
      });
    }
})

router.get('/garage/:number', requireLogin, async (req, res) => {
    console.log(req.params.number)
    let limit = 20;
    let number = req.params.number * limit;

    const allGarages = await Garage.find().sort({_id: -1}).skip( number ).limit( limit );
    res.send(allGarages)
})

router.get('/map/:number', async (req, res) => {
    console.log(req.params.number)
    let limit = 20;
    let number = req.params.number * limit;

    const allGarages = await Garage.find().sort({_id: -1}).skip( number ).limit( limit );
    res.send(allGarages)
})

router.get('/orders/:user', requireLogin, async (req, res) => {
    console.log(req.params.user)
    let limit = 20;
    const allUsers = await Order.find({user: user}).sort('-date').limit( limit );
    res.send(allUsers)
})

router.post('/orders/date', requireLogin, async (req, res) => {
    const allUsers = await Order.find({date: req.body.date});
    res.send(allUsers)
})

router.post('/garage/add', requireLogin, async (req, res) => {
    let limit = 20;
    await Garage.create({...req.body});
    const allGarages = await Garage.find().limit( limit );
    res.send(allGarages);
})

router.post('/garage/delete', requireLogin, async (req, res) => {
    let limit = 20;
    try {
        let list = req.body;
        await Promise.all(list.map( async (item) => {
            const existingGarage = await Garage.find({_id: item._id});
            if (existingGarage) {
                await Garage.deleteOne({_id: item._id});
            } else {
                res.status(400).send("Garage not found");
            }
        }))
        const allGarages = await Garage.find().limit( limit );
        console.log(allGarages);
        res.send(allGarages);
    } catch {
        res.status(400).send("Garage not found");
    }
})

router.post('/user/delete', requireLogin, async (req, res) => {
    let limit = 20;
    try {
        let list = req.body;
        await Promise.all(list.map( async (item) => {
            const existingUser = await user.find({_id: item._id});
            if (existingUser) {
                await user.deleteOne({_id: item._id});
            } else {
                res.status(400).send("User not found");
            }
        }))
        const allUsers = await user.find().limit( limit );
        console.log(allUsers);
        res.send(allUsers);
    } catch {
        res.status(400).send("User not found");
    }
})

router.post('/garage/update', requireLogin, async (req, res) => {
    let limit = 20;
    try {
        const existingGarage = await Garage.find({_id: req.body._id});
        if (existingGarage) {
            await Garage.updateOne({_id: req.body._id}, {$set:{...req.body}});
            const allGarages = await Garage.find().limit( limit );
            res.send(allGarages);
        } else {
            res.status(400).send("Garage not found");
        }
    } catch {
        res.status(400).send("Garage not found");
    }
})

router.get('/promos/:number', requireLogin, async (req, res) => {
    console.log(req.params.number)
    let limit = 20;
    let number = req.params.number * limit;

    const allPromos = await promo.find().skip( number ).limit( limit );
    res.send(allPromos)
})

router.post('/promos/add', requireLogin, async (req, res) => {
    let limit = 20;
    await promo.create({...req.body});
    const allPromos = await promo.find().limit( limit );
    res.send(allPromos)
})

router.post('/promos/delete', requireLogin, async (req, res) => {
    let limit = 20;
    try {
        let list = req.body;
        await Promise.all(list.map( async (item) => {
            await promo.deleteOne({_id: item._id});
        }))
        const allPromos = await promo.find().limit( limit );
        res.send(allPromos)
    } catch {
        res.status(400).send("Promo code not found");
    }
})

router.post('/user/add', requireLogin, async (req, res) => {
    let limit = 20;
    let type;
    let {email, password, name, role, hotel} = req.body
    let dateCreated = new Date()
    if (role === 'Hotel') {
        type = {isHotel: true}
    } else if (role === "Admin") {
        type = {isAdmin: true}
    } else { type = {} }
    const existingUser = await user.findOne({ email });
    if (!existingUser) {
        try {
            //salt password
            const salt = await bcrypt.genSalt(10);
            if (!salt) throw Error('Something went wrong with bcrypt');
            const hash = await bcrypt.hash(password, salt);
            if (!hash) throw Error('Something went wrong hashing the password');
            ///Create user and save to database
            await user.create({ email, password: hash, name: name, userType: role, hotel: hotel, dateCreated: dateCreated, ...type });
            const allUsers = await user.find().limit( limit );
            console.log(allUsers)
            res.send(allUsers)
        } catch {
            res.status(400).send("User not created");
        }
    } else {
        res.status(400).send('user already exists')
    }
})

router.post('/user/edit', requireLogin, async (req, res) => {
    let limit = 20;
    let type;
    let {id, name, role} = req.body
    let emails = req.body.email
    if (role === 'Hotel') {
        type = {isHotel: true}
    } else if (role === "Admin") {
        type = {isAdmin: true}
    } else { type = {} }
    const existingUser = await user.findOne({ _id: id });
    if (existingUser) {
        try {
            await user.updateOne({ _id: id}, {$set:{name: name, email: emails, userType: role, ...type }});
            const allUsers = await user.find().limit( limit );
            console.log(allUsers)
            res.send(allUsers)
        } catch {
            res.status(400).send("User not created");
        }
    } else {
        res.status(400).send('User Not Found')
    }
})

router.post('/user/update', requireLogin, async (req, res) => {
    let limit = 20;
    try {
        await user.updateOne({_id: req.body._id}, {$set:{...req.body}});
        const existingUser = await user.findOne({_id: req.body._id});
        res.send(existingUser)
    } catch {
        res.status(400).send("User not found");
    }
})

router.post('/order/refund', requireLogin, async (req, res) => {
    let lists = req.body;
    let limit = 20;
    try {
        await Promise.all(lists.map( async (item) => {
            const existingOrder = await Order.findOne({_id: item._id});
            // console.log(req.body)
            console.log(existingOrder)

            let refunds;
            let amount = item.total * 100;
            if (amount > (existingOrder.total * 100) - 1) {
                refunds = "Refunded"
            } else { refunds = "Partial Refund" }
            console.log(existingOrder.refundId)
            const refund = await stripe.refunds.create({
                charge: existingOrder.refundId,
                amount: amount,
              });
            await Order.updateOne({_id: existingOrder._doc._id}, {$set:{status: refunds}})
        }))
        const allOrders = await Order.find().limit( limit );
        res.send(allOrders);
    } catch {
        res.status(400).send("Refund order failed");
    }
})

router.post('/status', requireLogin, async (req, res) => {
    try {
        await Order.updateOne({_id: req.body.order}, {$set:{status: req.body.status}});
        let limit = 20;
        const allOrders = await Order.find().sort({_id: -1}).limit( limit );
        res.send(allOrders);
    } catch {
        res.status(400).send("Update status failed");
    }
})

const calcTotals = async (item, month) => {
    let newTotal = 0;
    let newQuantity = 0;
    await Order.find({ $and: [{"date" : {$regex : `.*${month}.*`}}, {location: item}]})
        .then(resp => {
            resp.forEach((order) => {
                newTotal = order.total + newTotal;
                newQuantity = newQuantity + 1;
            })
        })
    return {
        name: item.name,
        total: newTotal,
        quantity: newQuantity
    }
}

const calcHotelTotals = async (item, month) => {
    let newTotal = 0;
    let newQuantity = 0;
    await Order.find({ $and: [{"date" : {$regex : `.*${month}.*`}}, {hotel: item}]})
        .then(resp => {
            resp.forEach((order) => {
                newTotal = order.total + newTotal;
                newQuantity = newQuantity + 1;
            })
        })
    return {
        name: item,
        total: newTotal,
        quantity: newQuantity
    }
}

const calcHotelOwed = async (item, month) => {
    let newTotal = 0;
    let newQuantity = 0;
    await Order.find({ $and: [{"date" : {$regex : `.*${month}.*`}}, {hotel: item}, {time: "Overnight"}]})
        .then(resp => {
            resp.forEach((order) => {
                newTotal = order.total + newTotal;
                newQuantity = newQuantity + 1;
            })
        })
    return {
        name: item,
        total: newTotal,
        quantity: newQuantity
    }
}

router.post('/garageOrders', requireLogin, async (req, res) => {
    let {month} = req.body
    try {
        const LocationMonth = await Order.distinct("location", {"date" : {$regex : `.*${month}.*`}});
        const LocationObj = await Promise.all(LocationMonth.map((item) => calcTotals(item, month)));
        console.log(LocationObj);
        res.send(LocationObj);
    } catch {
        res.status(400).send("No Garages Found");
    }
})

router.post('/hotelorders', requireLogin, async (req, res) => {
    let {month} = req.body
    try {
        const HotelMonth = await Order.distinct("hotel", {"date" : {$regex : `.*${month}.*`}});
        const HotelObj = await Promise.all(HotelMonth.map((item) => calcHotelTotals(item, month)));
        console.log(HotelObj);
        res.send(HotelObj);
    } catch {
        res.status(400).send("No Hotels Found");
    }
})

router.post('/hotelowed', requireLogin, async (req, res) => {
    let {month} = req.body
    try {
        const HotelMonth = await Order.distinct("hotel", {"date" : {$regex : `.*${month}.*`}});
        const HotelObj = await Promise.all(HotelMonth.map((item) => calcHotelOwed(item, month)));
        console.log(HotelObj);
        res.send(HotelObj);
    } catch {
        res.status(400).send("No Hotels Found");
    }
})

router.post('/hotel/add', requireLogin, async (req, res) => {
    let {name, address} = req.body;
    try {
        let existingHotel = await Hotels.findOne({name: name});
        console.log(existingHotel);
        if (!existingHotel) {
            await Hotels.create({name, address})
            res.send('Success')
        }
        res.send('Hotel already exists')
    } catch {
        res.status(400).send('Error')
    }
})

router.post('/hotel/payment', requireLogin, async (req, res) => {
    // console.log(req.body)
    let {email, vehicle, hotel, date, roomNumber, valetNumber} = req.body;
    let total = 150;
    let name = req.body.hotel;
    let promo = {error: '', id: '', code: '', description: '', userType: 'any', discount: 1};
    let service = [{name: "Exterior & Interior Detail Package"}];
    let userHotel = await Hotels.findOne({name: hotel});
    let location = {name: hotel, address: userHotel.address }
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
    const OrderNum = Math.round(Math.random() * 1000000)

    try {
      await Order.create({
        user: req.user.sub, 
        name: name,
        email: email, 
        services: [...service], 
        total: total, 
        orderNumber: OrderNum, 
        Vehicle: vehicle,
        location: hotel,
        promo: promo,
        roomNumber: roomNumber,
        valetNumber: valetNumber,
        time: "Overnight",
        date: date,
        hotel: hotel,
        orderDate: orderDate,
      })
      res.json({
        message: "Success"
      });
    } catch (error) {
      res.json({
        message: "Failed"
      });
    }
  });


  router.post('/hotel/pdf', async (req, res) => {
    let {month, hotel} = req.body   
    try {
        let price = 0;
        const HotelMonth = await Order.find({"date" : {$regex : `.*${month}.*`}, "hotel": hotel});
        console.log(HotelMonth);
        price = HotelMonth.reduce((acc, curr) => acc + curr.total, 0);
        var myPDF = {
            content: [		
                {
                    text: 'Unzipped - Invoice w1570',
                    style: 'header'
                },
                {canvas: [ { type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 } ]},
                {
                    alignment: 'justify',
                    style: 'subheader',
                    columns: [
                        {
                            width: "*",
                            stack: [
                                    {
                                        text: 'Unzipped - Carcare Services',
                                        style: 'stacks'
                                    },
                                    {
                                        text:'139 E Main St',
                                        style: 'stacks'
                                    },
                                    {
                                        text: 'Columbus OH',
                                        style: 'stacks'
                                    },
                                    {
                                        text: 'United States',
                                        style: 'stacks'
                                    },
                                    {
                                        text: 'schedule@Unzipped.com',
                                        style: 'stacks'
                                    },
                                ]
                        },
                        {   
                            width: "*",
                            stack: [
                                    {
                                        text: 'Le-Meridien',
                                        style: 'stacks'
                                    },
                                    {
                                        text: '620 N High St',
                                        style: 'stacks'
                                    },
                                    {
                                        text: 'Columbus, OH 43215',
                                        style: 'stacks'
                                    },
                                    {
                                        text: 'United States',
                                        style: 'stacks'
                                    },
                                    {
                                        text: 'frontoffice@lemeridiencolumbus.com',
                                        style: 'stacks'
                                    },
                                ]
                        },
                        // {   
                        //     width: "*",
                        //     image: 'sampleImage.jpg',
                        //     fit: [100, 100],
                        // },
                    ]
                },
                {canvas: [ { type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 } ]},
                {
                    alignment: 'justify',
                    style: 'secheader',
                    columns: [
                        {
                            width: "*",
                            stack: [
                                {
                                    text: 'Invoice date: 06/30/2021',
                                    style: 'stacks'
                                },
                                {
                                    text: 'Invoice reference: w1570',
                                    style: 'stacks'
                                },
                                {
                                    text: 'Customer reference: 1040',
                                    style: 'stacks'
                                }
                            ]
                        }
                    ]
                },
                {canvas: [ { type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 } ]},
                {
                    alignment: 'justify',
                    style: 'triheader',
                    columns: [
                        {
                            width: 290,
                            text: 'Order'
                        },
                        {
                            width: "*",
                            text: 'Order #'
                        },
                        {
                            width: "*",
                            text: 'Price'
                        },
                        {
                            width: "*",
                            text: 'Total'
                        }
                    ]
                },
                {canvas: [ { type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 } ]},
                ////insert here
                HotelMonth.map((item) => {
                    return  (
                        {
                        alignment: 'justify',
                        style: 'triheader',
                        columns: [
                            {
                                width: 30,
                                text: `x1`
                            },
                            {
                                width: 240,
                                stack: [
                                    'Exterior & Interior Detail Package',
                                    {
                                        text: `${item.orderDate}`,
                                        style: 'stacks1'
                                    }
                                   ]
                            },
                            {
                                width: "*",
                                text: `#${item.orderNumber}`
                            },
                            {
                                width: "*",
                                text: `$${item.total.toFixed(2)}`
                            },
                            {
                                width: "*",
                                text: `$${item.total.toFixed(2)}`
                            }
                        ]
                    })
                }),
                {canvas: [ { type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1, margin: [0,25,0,0] } ]},
                {
                    alignment: 'justify',
                    style: 'simheader',
                    columns: [
                        {
                            width: 435,
                            text: 'Sub. total price:'
                        },
                        {
                            width: "*",
                            text: `$${price.toFixed(2)}`
                        }
                    ]
                },
                {
                    alignment: 'justify',
                    style: 'simheader1',
                    columns: [
                        {
                            width: 435,
                            text: 'tax:'
                        },
                        {
                            width: "*",
                            text: '$0.00'
                        }
                    ]
                },
                {canvas: [ { type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 } ]},
                {
                    alignment: 'justify',
                    style: 'simheader3',
                    columns: [
                        {
                            width: 435,
                            text: 'tax:'
                        },
                        {
                            width: "*",
                            text: `$${price.toFixed(2)}`
                        }
                    ]
                }
            ],
            styles: {
                header: {
                    fontSize: 18,
                    bold: true,
                    margin: [0, 0, 0, 15]
                },
                subheader: {
                    margin: [0, 25, 0, 25]
                },
                secheader: {
                    margin: [0, 10, 0, 10]
                },
                triheader: {
                    margin: [0, 30, 0, 15]
                },
                simheader: {
                    margin: [0, 15, 0, 5]
                },
                simheader1: {
                    margin: [0, 0, 0, 15]
                },
                simheader3: {
                    margin: [0, 15, 0, 20]
                },
                simheader4: {
                    margin: [0, 5, 0, 0]
                },
                stacks: {
                    margin: [0, 2, 0, 2]
                },
                stacks1: {
                    margin: [0, 2, 0, 2],
                    fontSize: 11
                },
                center: {
                  textAlign: 'center'
                },
                quote: {
                    italics: true
                },
                small: {
                    fontSize: 8
                }
            }
        } 
        pdfMake.vfs = pdfFonts.pdfMake.vfs;
        const pdfDoc = pdfMake.createPdf(myPDF);
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
    let {month, garage} = req.body   
    console.log(garage)
    console.log(month)
    try {
        let price = 0;
        let GarageMonth = await Order.find({"date" : {$regex : `.*${month}.*`}});
        GarageMonth = GarageMonth.filter((item) => item.location.name === garage);
        price = GarageMonth.reduce((acc, curr) => acc + curr.total, 0);
        var myPDF = {
            content: [		
                {
                    text: 'Unzipped - Invoice w1570',
                    style: 'header'
                },
                {canvas: [ { type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 } ]},
                {
                    alignment: 'justify',
                    style: 'subheader',
                    columns: [
                        {
                            width: "*",
                            stack: [
                                    {
                                        text: 'Unzipped - Carcare Services',
                                        style: 'stacks'
                                    },
                                    {
                                        text:'139 E Main St',
                                        style: 'stacks'
                                    },
                                    {
                                        text: 'Columbus OH',
                                        style: 'stacks'
                                    },
                                    {
                                        text: 'United States',
                                        style: 'stacks'
                                    },
                                    {
                                        text: 'schedule@Unzipped.com',
                                        style: 'stacks'
                                    },
                                ]
                        },
                        {   
                            width: "*",
                            stack: [
                                    {
                                        text: 'Le-Meridien',
                                        style: 'stacks'
                                    },
                                    {
                                        text: '620 N High St',
                                        style: 'stacks'
                                    },
                                    {
                                        text: 'Columbus, OH 43215',
                                        style: 'stacks'
                                    },
                                    {
                                        text: 'United States',
                                        style: 'stacks'
                                    },
                                    {
                                        text: 'frontoffice@lemeridiencolumbus.com',
                                        style: 'stacks'
                                    },
                                ]
                        },
                        // {   
                        //     width: "*",
                        //     image: 'sampleImage.jpg',
                        //     fit: [100, 100],
                        // },
                    ]
                },
                {canvas: [ { type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 } ]},
                {
                    alignment: 'justify',
                    style: 'secheader',
                    columns: [
                        {
                            width: "*",
                            stack: [
                                {
                                    text: 'Invoice date: 06/30/2021',
                                    style: 'stacks'
                                },
                                {
                                    text: 'Invoice reference: w1570',
                                    style: 'stacks'
                                },
                                {
                                    text: 'Customer reference: 1040',
                                    style: 'stacks'
                                }
                            ]
                        }
                    ]
                },
                {canvas: [ { type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 } ]},
                {
                    alignment: 'justify',
                    style: 'triheader',
                    columns: [
                        {
                            width: 290,
                            text: 'Order'
                        },
                        {
                            width: "*",
                            text: 'Order #'
                        },
                        {
                            width: "*",
                            text: 'Price'
                        },
                        {
                            width: "*",
                            text: 'Total'
                        }
                    ]
                },
                {canvas: [ { type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 } ]},
                ////insert here
                GarageMonth.map((item) => {
                    return  (
                        {
                        alignment: 'justify',
                        style: 'triheader',
                        columns: [
                            {
                                width: 30,
                                text: `x1`
                            },
                            {
                                width: 240,
                                stack: [
                                    'Exterior & Interior Detail Package',
                                    {
                                        text: `${item.orderDate}`,
                                        style: 'stacks1'
                                    }
                                   ]
                            },
                            {
                                width: "*",
                                text: `#${item.orderNumber}`
                            },
                            {
                                width: "*",
                                text: `$${item.total.toFixed(2)}`
                            },
                            {
                                width: "*",
                                text: `$${item.total.toFixed(2)}`
                            }
                        ]
                    })
                }),
                {canvas: [ { type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1, margin: [0,25,0,0] } ]},
                {
                    alignment: 'justify',
                    style: 'simheader',
                    columns: [
                        {
                            width: 435,
                            text: 'Sub. total price:'
                        },
                        {
                            width: "*",
                            text: `$${price.toFixed(2)}`
                        }
                    ]
                },
                {
                    alignment: 'justify',
                    style: 'simheader1',
                    columns: [
                        {
                            width: 435,
                            text: 'tax:'
                        },
                        {
                            width: "*",
                            text: '$0.00'
                        }
                    ]
                },
                {canvas: [ { type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 } ]},
                {
                    alignment: 'justify',
                    style: 'simheader3',
                    columns: [
                        {
                            width: 435,
                            text: 'tax:'
                        },
                        {
                            width: "*",
                            text: `$${price.toFixed(2)}`
                        }
                    ]
                }
            ],
            styles: {
                header: {
                    fontSize: 18,
                    bold: true,
                    margin: [0, 0, 0, 15]
                },
                subheader: {
                    margin: [0, 25, 0, 25]
                },
                secheader: {
                    margin: [0, 10, 0, 10]
                },
                triheader: {
                    margin: [0, 30, 0, 15]
                },
                simheader: {
                    margin: [0, 15, 0, 5]
                },
                simheader1: {
                    margin: [0, 0, 0, 15]
                },
                simheader3: {
                    margin: [0, 15, 0, 20]
                },
                simheader4: {
                    margin: [0, 5, 0, 0]
                },
                stacks: {
                    margin: [0, 2, 0, 2]
                },
                stacks1: {
                    margin: [0, 2, 0, 2],
                    fontSize: 11
                },
                center: {
                  textAlign: 'center'
                },
                quote: {
                    italics: true
                },
                small: {
                    fontSize: 8
                }
            }
        } 
        pdfMake.vfs = pdfFonts.pdfMake.vfs;
        const pdfDoc = pdfMake.createPdf(myPDF);
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
    let {hotel} = req.body   
    try {
        let price = 0;
        const HotelOrders = await Order.find({"status": "PENDING", "hotel": hotel});
        price = HotelOrders.reduce((acc, curr) => acc + curr.total, 0);
        var myPDF = {
            content: [		
                {
                    text: 'Unzipped - Pending Orders',
                    style: 'header'
                },
                {canvas: [ { type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 } ]},
                {
                    alignment: 'justify',
                    style: 'subheader',
                    columns: [
                        {
                            width: "*",
                            stack: [
                                    {
                                        text: 'Unzipped - Carcare Services',
                                        style: 'stacks'
                                    },
                                    {
                                        text:'139 E Main St',
                                        style: 'stacks'
                                    },
                                    {
                                        text: 'Columbus OH',
                                        style: 'stacks'
                                    },
                                    {
                                        text: 'United States',
                                        style: 'stacks'
                                    },
                                    {
                                        text: 'schedule@Unzipped.com',
                                        style: 'stacks'
                                    },
                                ]
                        },
                        {   
                            width: "*",
                            stack: [
                                    {
                                        text: 'Le-Meridien',
                                        style: 'stacks'
                                    },
                                    {
                                        text: '620 N High St',
                                        style: 'stacks'
                                    },
                                    {
                                        text: 'Columbus, OH 43215',
                                        style: 'stacks'
                                    },
                                    {
                                        text: 'United States',
                                        style: 'stacks'
                                    },
                                    {
                                        text: 'frontoffice@lemeridiencolumbus.com',
                                        style: 'stacks'
                                    },
                                ]
                        },
                        // {   
                        //     width: "*",
                        //     image: 'sampleImage.jpg',
                        //     fit: [100, 100],
                        // },
                    ]
                },
                {canvas: [ { type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 } ]},
                {
                    alignment: 'justify',
                    style: 'secheader',
                    columns: [
                        {
                            width: "*",
                            stack: [
                                {
                                    text: 'Invoice date: 06/30/2021',
                                    style: 'stacks'
                                },
                                {
                                    text: 'Invoice reference: w1570',
                                    style: 'stacks'
                                },
                                {
                                    text: 'Customer reference: 1040',
                                    style: 'stacks'
                                }
                            ]
                        }
                    ]
                },
                {canvas: [ { type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 } ]},
                {
                    alignment: 'justify',
                    style: 'triheader',
                    columns: [
                        {
                            width: 290,
                            text: 'Order'
                        },
                        {
                            width: "*",
                            text: 'Order #'
                        },
                        {
                            width: "*",
                            text: 'Price'
                        },
                        {
                            width: "*",
                            text: 'Total'
                        }
                    ]
                },
                {canvas: [ { type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 } ]},
                ////insert here
                HotelOrders.map((item) => {
                    return  (
                        {
                        alignment: 'justify',
                        style: 'triheader',
                        columns: [
                            {
                                width: 30,
                                text: `x1`
                            },
                            {
                                width: 240,
                                stack: [
                                    'Exterior & Interior Detail Package',
                                    {
                                        text: `${item.orderDate}`,
                                        style: 'stacks1'
                                    }
                                   ]
                            },
                            {
                                width: "*",
                                text: `#${item.orderNumber}`
                            },
                            {
                                width: "*",
                                text: `$${item.total.toFixed(2)}`
                            },
                            {
                                width: "*",
                                text: `$${item.total.toFixed(2)}`
                            }
                        ]
                    })
                }),
                {canvas: [ { type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1, margin: [0,25,0,0] } ]},
                {
                    alignment: 'justify',
                    style: 'simheader',
                    columns: [
                        {
                            width: 435,
                            text: 'Sub. total price:'
                        },
                        {
                            width: "*",
                            text: `$${price.toFixed(2)}`
                        }
                    ]
                },
                {
                    alignment: 'justify',
                    style: 'simheader1',
                    columns: [
                        {
                            width: 435,
                            text: 'tax:'
                        },
                        {
                            width: "*",
                            text: '$0.00'
                        }
                    ]
                },
                {canvas: [ { type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 } ]},
                {
                    alignment: 'justify',
                    style: 'simheader3',
                    columns: [
                        {
                            width: 435,
                            text: 'tax:'
                        },
                        {
                            width: "*",
                            text: `$${price.toFixed(2)}`
                        }
                    ]
                }
            ],
            styles: {
                header: {
                    fontSize: 18,
                    bold: true,
                    margin: [0, 0, 0, 15]
                },
                subheader: {
                    margin: [0, 25, 0, 25]
                },
                secheader: {
                    margin: [0, 10, 0, 10]
                },
                triheader: {
                    margin: [0, 30, 0, 15]
                },
                simheader: {
                    margin: [0, 15, 0, 5]
                },
                simheader1: {
                    margin: [0, 0, 0, 15]
                },
                simheader3: {
                    margin: [0, 15, 0, 20]
                },
                simheader4: {
                    margin: [0, 5, 0, 0]
                },
                stacks: {
                    margin: [0, 2, 0, 2]
                },
                stacks1: {
                    margin: [0, 2, 0, 2],
                    fontSize: 11
                },
                center: {
                  textAlign: 'center'
                },
                quote: {
                    italics: true
                },
                small: {
                    fontSize: 8
                }
            }
        } 
        pdfMake.vfs = pdfFonts.pdfMake.vfs;
        const pdfDoc = pdfMake.createPdf(myPDF);
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
    let {status} = req.body;
    try {
        let price = 0;
        let datetime = new Date();
        const PendingOrders = await Order.find({"status": status});
        price = PendingOrders.reduce((acc, curr) => acc + curr.total, 0);
        var myPDF = {
            content: [		
                {
                    text: 'Unzipped - Pending Orders',
                    style: 'header'
                },
                {canvas: [ { type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 } ]},
                {
                    alignment: 'justify',
                    style: 'subheader',
                    columns: [
                        {
                            width: "*",
                            stack: [
                                    {
                                        text: 'Unzipped - Carcare Services',
                                        style: 'stacks'
                                    },
                                    {
                                        text:'139 E Main St',
                                        style: 'stacks'
                                    },
                                    {
                                        text: 'Columbus OH',
                                        style: 'stacks'
                                    },
                                    {
                                        text: 'United States',
                                        style: 'stacks'
                                    },
                                    {
                                        text: 'schedule@Unzipped.com',
                                        style: 'stacks'
                                    },
                                ]
                        },
                        {   
                            width: "*",
                            stack: [
                                    {
                                        text: '',
                                        style: 'stacks'
                                    },
                                    {
                                        text: '',
                                        style: 'stacks'
                                    },
                                    {
                                        text: '',
                                        style: 'stacks'
                                    },
                                    {
                                        text: '',
                                        style: 'stacks'
                                    },
                                    {
                                        text: '',
                                        style: 'stacks'
                                    },
                                ]
                        },
                        // {   
                        //     width: "*",
                        //     image: 'sampleImage.jpg',
                        //     fit: [100, 100],
                        // },
                    ]
                },
                {canvas: [ { type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 } ]},
                {
                    alignment: 'justify',
                    style: 'secheader',
                    columns: [
                        {
                            width: "*",
                            stack: [
                                {
                                    text: `Invoice date: ${datetime.getMonth()}/${datetime.getDate()}/${datetime.getFullYear()}`,
                                    style: 'stacks'
                                },
                                {
                                    text: 'Invoice reference: w1570',
                                    style: 'stacks'
                                },
                                {
                                    text: 'Customer reference: Admin',
                                    style: 'stacks'
                                }
                            ]
                        }
                    ]
                },
                {canvas: [ { type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 } ]},
                {
                    alignment: 'justify',
                    style: 'triheader',
                    columns: [
                        {
                            width: 290,
                            text: 'Order'
                        },
                        {
                            width: "*",
                            text: 'Order #'
                        },
                        {
                            width: "*",
                            text: 'Price'
                        },
                        {
                            width: "*",
                            text: 'Total'
                        }
                    ]
                },
                {canvas: [ { type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 } ]},
                ////insert here
                PendingOrders.map((item) => {
                    return  (
                        {
                        alignment: 'justify',
                        style: 'triheader',
                        columns: [
                            {
                                width: 30,
                                text: `x1`
                            },
                            {
                                width: 240,
                                stack: [
                                    'Exterior & Interior Detail Package',
                                    {
                                        text: `${item.orderDate}`,
                                        style: 'stacks1'
                                    }
                                   ]
                            },
                            {
                                width: "*",
                                text: `#${item.orderNumber}`
                            },
                            {
                                width: "*",
                                text: `$${item.total.toFixed(2)}`
                            },
                            {
                                width: "*",
                                text: `$${item.total.toFixed(2)}`
                            }
                        ]
                    })
                }),
                {canvas: [ { type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1, margin: [0,25,0,0] } ]},
                {
                    alignment: 'justify',
                    style: 'simheader',
                    columns: [
                        {
                            width: 435,
                            text: 'Sub. total price:'
                        },
                        {
                            width: "*",
                            text: `$${price.toFixed(2)}`
                        }
                    ]
                },
                {
                    alignment: 'justify',
                    style: 'simheader1',
                    columns: [
                        {
                            width: 435,
                            text: 'tax:'
                        },
                        {
                            width: "*",
                            text: '$0.00'
                        }
                    ]
                },
                {canvas: [ { type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 } ]},
                {
                    alignment: 'justify',
                    style: 'simheader3',
                    columns: [
                        {
                            width: 435,
                            text: 'tax:'
                        },
                        {
                            width: "*",
                            text: `$${price.toFixed(2)}`
                        }
                    ]
                }
            ],
            styles: {
                header: {
                    fontSize: 18,
                    bold: true,
                    margin: [0, 0, 0, 15]
                },
                subheader: {
                    margin: [0, 25, 0, 25]
                },
                secheader: {
                    margin: [0, 10, 0, 10]
                },
                triheader: {
                    margin: [0, 30, 0, 15]
                },
                simheader: {
                    margin: [0, 15, 0, 5]
                },
                simheader1: {
                    margin: [0, 0, 0, 15]
                },
                simheader3: {
                    margin: [0, 15, 0, 20]
                },
                simheader4: {
                    margin: [0, 5, 0, 0]
                },
                stacks: {
                    margin: [0, 2, 0, 2]
                },
                stacks1: {
                    margin: [0, 2, 0, 2],
                    fontSize: 11
                },
                center: {
                  textAlign: 'center'
                },
                quote: {
                    italics: true
                },
                small: {
                    fontSize: 8
                }
            }
        } 
        pdfMake.vfs = pdfFonts.pdfMake.vfs;
        const pdfDoc = pdfMake.createPdf(myPDF);
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