const keys = require('../../config/keys');
const UserModel = require('../../models/User');
const VehicleModel = require('../../models/Vehicles');
const axios = require('axios');


const createVehicles = async ( arr ) =>{
    arr.forEach( async (item) => {
        await VehicleModel.create({id: item.id, make: item.make, model: item.model, year: item.year})
    });
}

const getMake = async ( obj ) => {
    let {year} = obj
    const vehicles = await VehicleModel.distinct("make" ,{year: year})
    return vehicles
}

const getModel = async ( obj ) => {
    let { year, make } = obj
    const vehicles = await VehicleModel.distinct("model" ,{year: year, make: make})
    return vehicles
}

const defaultVehicle = async ( obj, user ) => {
    const { year, make, model, color, vin, license } = obj;
    const defaultVehicle = await UserModel.updateOne({_id: user.sub} ,{defaultVehicle: {year, make, model, color, vin, license}});
    const existingUser = await UserModel.findById(user.sub).select('-password');
    return existingUser
}

const decodeVehicle = async ( obj, user ) => {
    const { license, state, color } = obj;
    let api_start = `http://api.carsxe.com/platedecoder?key=${keys.carsXe}&plate=${license}&state=${state}&format=json`
    const response = await axios.get(api_start);
    console.log(response.data)
    const defaultVehicle = await UserModel.updateOne({_id: user.sub} ,{defaultVehicle: {year: response.data.RegistrationYear, make: response.data.CarMake, model: response.data.CarModel, color: color, vin: response.data.vin, license: response.data.input.plate}});
    const existingUser = await UserModel.findById(user.sub).select('-password');
    return existingUser
}

module.exports = {
    createVehicles,
    getMake,
    getModel,
    defaultVehicle,
    decodeVehicle
}