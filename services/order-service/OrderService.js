const UserModel = require('../../models/User')
const OrderModel = require('../../models/Orders')
const GarageModel = require('../../models/Garages')
const PromoModel = require('../../models/Promo')

const getAllUsers = async skip => {
    try {
        let limit = 20
        let number = skip * limit
        const users = await UserModel.find().skip(number).limit(limit)
        return users
    } catch (error) {
        console.error(`Error: OrderService.getAllUsers Failed to find users: ${error}`)
    }
}

const getAllOrders = async skip => {
    try {
        let limit = 20
        let number = skip * limit
        const orders = await OrderModel.find().sort({ _id: -1 }).skip(number).limit(limit)
        return orders
    } catch (error) {
        console.error(`Error: OrderService.getAllOrders Failed to find orders: ${error}`)
    }
}

const createOrder = async (order, user) => {
    try {
        let number = 0
        let limit = 20
        let total = order.total
        let email = order.email
        let orderNum = order.order
        let vehicle = order.vehicle
        let service = order.cart
        let time = order.time
        let date = order.date
        let location = order.location
        let hotel = order.hotel
        let roomNumber = order.roomNumber
        let transmission = order.transmission
        let valetNumber = order.valetNumber
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
            Vehicle: vehicle,
            location: location,
            roomNumber: roomNumber,
            valetNumber: valetNumber,
            time: time,
            date: date,
            transmission: transmission,
            hotel: hotel,
            orderDate: orderDate
        })
        const orders = await OrderModel.find().sort({ _id: -1 }).skip(number).limit(limit)
        return orders
    } catch (error) {
        console.error(`Error: OrderService.createOrder Failed to create order: ${error}`)
        throw new Error(error)
    }
}

const getAllGarages = async skip => {
    try {
        let limit = 20
        let number = skip * limit
        const garages = await GarageModel.find().sort({ _id: -1 }).skip(number).limit(limit)
        return garages
    } catch (error) {
        console.error(`Error: OrderService.getAllGarages Failed to find garages: ${error}`)
    }
}

const getOrdersByUser = async user => {
    try {
        let limit = 20
        const ordersByUser = await OrderModel.find({ user: user }).sort('-date').limit(limit)
        return ordersByUser
    } catch (error) {
        console.error(`Error: OrderService.getOrdersByUser Failed to find orders: ${error}`)
    }
}

const getOrdersByDate = async date => {
    try {
        const ordersByDate = await OrderModel.find({ date: date })
        return ordersByDate
    } catch (error) {
        console.error(`Error: OrderService.getOrdersByDate Failed to find orders: ${error}`)
    }
}

const createGarage = async garage => {
    try {
        let limit = 20
        await GarageModel.create({ ...garage })
        const garages = await GarageModel.find().limit(limit)
        return garages
    } catch (error) {
        console.error(`Error: OrderService.createGarage Failed to create garage: ${error}`)
    }
}

const deleteGarage = async garage => {
    try {
        let limit = 20
        const ids = garage.map(item => item._id);
        await GarageModel.deleteMany({ _id: { $in: ids } });
        const garages = await GarageModel.find().limit(limit);
        return garages
    } catch (error) {
        throw new Error(error)
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

const updateGarage = async (garage) => {
    try {
        let limit = 20
        await GarageModel.updateOne({ _id: garage._id }, {$set:{ ...garage }})
        const garages = await GarageModel.find().limit(limit)
        return garages
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
        console.error(`Error: OrderService.getAllPromos Failed to find promos: ${error}`)
    }
}

const createPromo = async (promo) => {
    try {
        let limit = 20
        await PromoModel.create({ ...promo })
        const promos = await PromoModel.find().limit(limit)
        return promos
    } catch (error) {
        console.error(`Error: OrderService.createPromo Failed to create promo: ${error}`)
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
    let {email, password, name, role, hotel} = user
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
            await UserModel.create({ email, password: hash, name: name, userType: role, hotel: hotel, dateCreated: dateCreated, ...type });
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
    if (role === 'Hotel') {
        type = {isHotel: true}
    } else if (role === "Admin") {
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
            // console.log(req.body)
            // console.log(existingOrder)

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


const calcTotals = async (item, month) => {
    let newTotal = 0;
    let newQuantity = 0;
    await OrderModel.find({ $and: [{"date" : {$regex : `.*${month}.*`}}, {location: item}]})
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
    await OrderModel.find({ $and: [{"date" : {$regex : `.*${month}.*`}}, {hotel: item}]})
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
    await OrderModel.find({ $and: [{"date" : {$regex : `.*${month}.*`}}, {hotel: item}, {time: "Overnight"}]})
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

const getGarageOrders = async month => {
    const LocationMonth = await OrderModel.distinct("location", {"date" : {$regex : `.*${month}.*`}});
    const LocationObj = await Promise.all(LocationMonth.map((item) => calcTotals(item, month)));
    return LocationObj;
}

const getHotelOrders = async month => {
    const HotelMonth = await Order.distinct("hotel", {"date" : {$regex : `.*${month}.*`}});
    const HotelObj = await Promise.all(HotelMonth.map((item) => calcHotelTotals(item, month)));
    return HotelObj;
}

module.exports = {
    getAllUsers,
    getAllOrders,
    createOrder,
    getAllGarages,
    getOrdersByUser,
    getOrdersByDate,
    createGarage,
    deleteGarage,
    deleteUser,
    updateGarage,
    getAllPromos,
    createPromo,
    deletePromo,
    createUser,
    editUser,
    updateUser,
    refundOrders,
    updateOrderStatus,
    getGarageOrders,
    getHotelOrders,
}
