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
// Refactor
const OrderService = require('../../services/order-service/OrderService');

router.get('/users/:number',   async (req, res) => {
    console.log('request:',req.params.number)
    const allUsers = await OrderService.getAllUsers( req.params.number);
    res.send(allUsers)
})

router.get('/orders/:number',  async (req, res) => {
    console.log('request:',req.params.number)
    const allOrders = await OrderService.getAllOrders( req.params.number);
    res.send(allOrders)
})

router.post('/orders/create',  async (req, res) => {
    console.log('request:',req.body)
    console.log('request:',req.user)
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

router.get('/garage/:number',  async (req, res) => {
    console.log('request:',req.params.number)
    const allGarages = await OrderService.getAllGarages( req.params.number );
    res.send(allGarages)
})

router.get('/map/:number',  async (req, res) => {
    console.log('request:',req.params.number)
    const allGarages = await OrderService.getAllGarages( req.params.number );
    res.send(allGarages)
})

router.get('/orders-by-user/:user',  async (req, res) => {
    console.log('request',req.params.user)
    const allOrders = await OrderService.getOrdersByUser(req.params.user);
    res.send(allOrders)
})

router.post('/orders/date',  async (req, res) => {
    console.log('request:',req.body)
    const allOrders = await OrderService.getOrdersByDate(req.body.date);
    res.send(allOrders)
})

router.post('/garage/add',  async (req, res) => {
    console.log('request:',req.body)
    const allGarages = await OrderService.createGarage( req.body );
    res.send(allGarages);
})

router.post('/garage/delete', async (req, res) => {
    console.log('request:',req.body)
    try {
        const allGarages = await OrderService.deleteGarage( req.body );
        res.send(allGarages);
    } catch {
        res.status(400).send("Garage not found");
    }
})

router.post('/user/delete',  async (req, res) => {
    console.log('request:',req.body)
    try {
        const allUsers = await OrderService.deleteUser( req.body );
        res.send(allUsers);
    } catch {
        res.status(400).send("User not found");
    }
})

router.post('/garage/update',  async (req, res) => {
    console.log('request:',req.body) 
    try {
        const allGarages= await OrderService.updateGarage( req.body );
        res.send(allGarages);    
    } catch {
        res.status(400).send("Garage not found");
    }
})

router.get('/promos/:number',  async (req, res) => {
    console.log(req.params.number)
    const allPromos = await OrderService.getAllPromos( req.params.number );
    res.send(allPromos)
})

router.post('/promos/add',  async (req, res) => {
    console.log('request:',req.body)
    const allPromos = await OrderService.createPromo( req.body );
    res.send(allPromos)
})

router.post('/promos/delete',  async (req, res) => {
    console.log('request:',req.body) 
    try {
        const allPromos = await OrderService.deletePromo( req.body );
        res.send(allPromos)
    } catch {
        res.status(400).send("Promo code not found");
    }
})

router.post('/user/add',  async (req, res) => {
    console.log('request:',req.body) 
    try {
        const allUsers = await OrderService.createUser( req.body );
        res.send(allUsers)
    } catch {
        res.status(400).send(error.message)
    }
})

router.post('/user/edit', async (req, res) => {
    console.log('request:', req.body)
    try {
        const allUsers = await OrderService.editUser(req.body)
        res.send(allUsers)
    } catch {
        res.status(400).send(error.message)
    }
})

router.post('/user/update', async (req, res) => {
    console.log('request:', req.body)
    try {
        const existingUser = await OrderService.updateUser(req.body)
        res.send(existingUser)
    } catch {
        res.status(400).send('User not found')
    }
})

router.post('/order/refund',  async (req, res) => {
    console.log('request:',req.body)
    try {
        const allOrders = await OrderService.refundOrders( req.body );
        res.send(allOrders);
    } catch {
        res.status(400).send("Refund order failed");
    }
})

router.post('/status',  async (req, res) => {
    console.log('request:',req.body)
    try {
        const allOrders = await OrderService.updateOrderStatus( req.body );
        res.send(allOrders);
    } catch {
        res.status(400).send("Update status failed");
    }
})

router.post('/garageOrders',  async (req, res) => {
    console.log('request:',req.body)
    try {
        const LocationObj = await OrderService.getGarageOrders( req.body.month );
        res.send(LocationObj);
    } catch {
        res.status(400).send("No Garages Found");
    }
})

router.post('/hotelorders', requireLogin, async (req, res) => {
    cconsole.log('request:',req.body)
    try {        
        const HotelObj = await OrderService.getHotelOrders( req.body.month );
        res.send(HotelObj);
    } catch {
        res.status(400).send("No Hotels Found");
    }
})

/////////////////////////////////////////////////

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