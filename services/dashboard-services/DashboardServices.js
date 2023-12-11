const UserModel = require('../../models/User')
const OrderModel = require('../../models/Orders')
const PromoModel = require('../../models/Promo')
const pdfMake = require('../../services/pdfmaker/pdfmake');
const pdfFonts = require("../../services/pdfmaker/vfs_fonts");
const keys = require('../../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const bcrypt = require('bcryptjs');

const getAllUsers = async skip => {
    try {
        let limit = 20
        let number = skip * limit
        const users = await UserModel.find().skip(number).limit(limit)
        return users
    } catch (error) {
        console.error(`Error: DashboardServices.getAllUsers Failed to find users: ${error}`)
    }
}

const getAllOrders = async skip => {
    try {
        let limit = 20
        let number = skip * limit
        const orders = await OrderModel.find().sort({ _id: -1 }).skip(number).limit(limit)
        return orders
    } catch (error) {
        console.error(`Error: DashboardServices.getAllOrders Failed to find orders: ${error}`)
    }
}

const createOrder = async (order, user) => {
    try {
        let number = 0
        let limit = 20
        let total = order.total
        let email = order.email
        let orderNum = order.order
        let time = order.time
        let date = order.date
        let transmission = order.transmission
        var month = new Array(12)
        month[0] = 'Jan.'
        month[1] = 'Feb.'
        month[2] = 'March'
        month[3] = 'April'
        month[4] = 'May'
        month[5] = 'June'
        month[6] = 'July'
        month[7] = 'Aug.'
        month[8] = 'Sept.'
        month[9] = 'Oct.'
        month[10] = 'Nov.'
        month[11] = 'Dec.'
        let orderDate = `${month[new Date().getMonth()]} ${new Date().getDate()} ${new Date().getFullYear()}`
        date = `${month[new Date(date).getMonth()]} ${new Date(date).getDate() + 1} ${new Date(date).getFullYear()}`

        await OrderModel.create({
            user: user,
            email: email,
            services: [...service],
            total: total,
            orderNumber: orderNum,
            time: time,
            date: date,
            transmission: transmission,
            orderDate: orderDate
        })
        const orders = await OrderModel.find().sort({ _id: -1 }).skip(number).limit(limit)
        return orders
    } catch (error) {
        console.error(`Error: DashboardServices.createOrder Failed to create order: ${error}`)
        throw new Error(error)
    }
}

const getOrdersByUser = async user => {
    try {
        let limit = 20
        const ordersByUser = await OrderModel.find({ user: user }).sort('-date').limit(limit)
        return ordersByUser
    } catch (error) {
        console.error(`Error: DashboardServices.getOrdersByUser Failed to find orders: ${error}`)
    }
}

const getOrdersByDate = async date => {
    try {
        const ordersByDate = await OrderModel.find({ date: date })
        return ordersByDate
    } catch (error) {
        console.error(`Error: DashboardServices.getOrdersByDate Failed to find orders: ${error}`)
    }
}

const deleteUser = async user => {
    try {
        let limit = 20;
        const ids = user.map(item => item._id);
        await UserModel.deleteMany({ _id: { $in: ids } });
        const users = await UserModel.find().limit(limit);
        return users
    } catch (error) {
        throw new Error(error)
    }
}

const getAllPromos = async (skip) => {
    try{
        let limit = 20
        let number = skip * limit
        const promos = await PromoModel.find().skip(number).limit(limit)
        return promos
    } catch {
        console.error(`Error: DashboardServices.getAllPromos Failed to find promos: ${error}`)
    }
}

const createPromo = async (promo) => {
    try {
        let limit = 20
        await PromoModel.create({ ...promo })
        const promos = await PromoModel.find().limit(limit)
        return promos
    } catch (error) {
        console.error(`Error: DashboardServices.createPromo Failed to create promo: ${error}`)
    }
}

const deletePromo = async (promo) => {
    try {
        let limit = 20
        const ids = promo.map(item => item._id);
        await PromoModel.deleteMany({ _id: { $in: ids } });
        const promos = await PromoModel.find().limit(limit);
        return promos
    } catch (error) {
        throw new Error(error)
    }
}

const createUser = async (user) => {
    let limit = 20;
    let type;
    let {email, password, name, role} = user
    let dateCreated = new Date()
    if (role === "Admin") {
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
            await UserModel.create({ email, password: hash, name: name, userType: role, dateCreated: dateCreated, ...type });
            const users = await UserModel.find().limit( limit );
            return users;
        } catch {
            throw new Error("User not created");
        }
    } else {
        throw new Error('user already exists')
    }
}

const editUser = async (user) => {
    let limit = 20;
    let type;
    let {id, name, role, email} = user
    if (role === "Admin") {
        type = {isAdmin: true}
    } else { type = {} }
    const existingUser = await UserModel.findOne({ _id: id });
    if (existingUser) {
        try {
            await UserModel.updateOne({ _id: id}, {$set:{name: name, email: email, userType: role, ...type }});
            const users = await user.find().limit( limit );
            return users;
        } catch {
            throw new Error("User not Edited");
        }
    } else {
        throw new Error('User Not Found')
    }
}

const updateUser = async (user) => {
    await UserModel.updateOne({_id: user._id}, {$set:{...user}});
    const updatedUser = await UserModel.findOne({_id: user._id});
    return updatedUser;
}

const refundOrders = async (orders) => {
    try {
        let limit = 20;
        await Promise.all(orders.map( async (item) => {
            const existingOrder = await OrderModel.findOne({_id: item._id});
           
            let refunds;
            let amount = item.total * 100;
            if (amount > (existingOrder.total * 100) - 1) {
                refunds = "Refunded"
            } else { refunds = "Partial Refund" }
            // console.log(existingOrder.refundId)
            const refund = await stripe.refunds.create({
                charge: existingOrder.refundId,
                amount: amount,
              });
            await OrderModel.updateOne({_id: existingOrder._doc._id}, {$set:{status: refunds}})
        }))
        const orders = await OrderModel.find().limit( limit );
        return orders;
    } catch {
        throw new Error("Refund order failed");
    }
}

const updateOrderStatus = async (order) => {
    await OrderModel.updateOne({_id: order.order}, {$set:{status: order.status}});
    let limit = 20;
    const orders = await OrderModel.find().sort({_id: -1}).limit( limit );
    return orders;
}


// const calcTotals = async (item, month) => {
//     let newTotal = 0;
//     let newQuantity = 0;
//     await OrderModel.find({ $and: [{"date" : {$regex : `.*${month}.*`}}, {location: item}]})
//         .then(resp => {
//             resp.forEach((order) => {
//                 newTotal = order.total + newTotal;
//                 newQuantity = newQuantity + 1;
//             })
//         })
//     return {
//         name: item.name,
//         total: newTotal,
//         quantity: newQuantity
//     }
// }


const createOrdersPDF = async obj => {
    let {status} = obj.body;
    let price = 0;
    let datetime = new Date();
    const PendingOrders = await OrderModel.find({"status": status});
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
                                    text: 'Unzipped - Freelancers Platform',
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
    return pdfDoc;
}

module.exports = {
    getAllUsers,
    getAllOrders,
    createOrder,
    getOrdersByUser,
    getOrdersByDate,
    deleteUser,
    getAllPromos,
    createPromo,
    deletePromo,
    createUser,
    editUser,
    updateUser,
    refundOrders,
    updateOrderStatus,
    createOrdersPDF
}
