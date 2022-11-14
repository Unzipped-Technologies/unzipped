const express = require("express");
const router = express.Router();
const keys = require('../../config/keys');
const User = require('../../models/User');
const vehicle = require('../../models/Vehicles');
const requireLogin = require('../middlewares/requireLogin');
const axios = require('axios');

router.post('/add', requireLogin, async (req, res) => {
    let myArray = req.body
    myArray.forEach( async (item) => {
        await vehicle.create({id: item.id, make: item.make, model: item.model, year: item.year})
      });
    res.send('success');
})

router.post('/getMake', async (req, res) => {
    try {
        let { year } = req.body
        const vehicleList = await vehicle.distinct("make" ,{year: year})
        res.send([...vehicleList]);
    } catch {
        res.status(400).send('Bad request');
    }
})

router.post('/getModel', async (req, res) => {
    try {
        let { year, make } = req.body
        const vehicleList = await vehicle.distinct("model" ,{year: year, make: make})
        res.send([...vehicleList]);
    } catch {
        res.status(400).send('Bad request');
    }
})

router.post('/default', requireLogin, async (req, res) => {
    try {
        console.log(req.body)
        const { year, make, model, color, vin, license } = req.body;
        const defaultVehicle = await User.updateOne({_id: req.user.sub} ,{defaultVehicle: {year, make, model, color, vin, license}});
        const existingUser = await User.findById(req.user.sub).select('-password');
        res.send({...existingUser._doc});
    } catch {
        res.status(400).send('Bad request');
    }
})

router.post('/decode', requireLogin, async (req, res) => {
    try {
        console.log(req.body)
        const { license, state, color } = req.body;
        let api_start = `http://api.carsxe.com/platedecoder?key=${keys.carsXe}&plate=${license}&state=${state}&format=json`
        const response = await axios.get(api_start);
        console.log(response.data)
        const defaultVehicle = await User.updateOne({_id: req.user.sub} ,{defaultVehicle: {year: response.data.RegistrationYear, make: response.data.CarMake, model: response.data.CarModel, color: color, vin: response.data.vin, license: response.data.input.plate}});
        const existingUser = await User.findById(req.user.sub).select('-password');
        res.send({...existingUser._doc});
    } catch {
        res.status(400).send({data: 'Enter Valid License plate'});
    }
})



module.exports = router;