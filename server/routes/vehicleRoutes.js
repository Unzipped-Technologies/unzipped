const express = require("express");
const router = express.Router();
const requireLogin = require('../middlewares/requireLogin');

// Refactor
const VehicleService = require('../../services/vehicle-service/VehicleService');


router.post('/add', requireLogin, async (req, res) => {
    try{
        await VehicleService.createVehicles(req.body)
        res.send('success');
    } catch {
        res.status(400).send('Bad request');
    }
})

router.post('/getMake', async (req, res) => {
    try {
        const vehicleList = await VehicleService.getMake( req.body )
        res.send([...vehicleList]);
    } catch {
        res.status(400).send('Bad request');
    }
})

router.post('/getModel', async (req, res) => {
    try {
        const vehicleList = await VehicleService.getModel( req.body )
        res.send([...vehicleList]);
    } catch {
        res.status(400).send('Bad request');
    }
})

router.post('/default', requireLogin, async (req, res) => {
    try {
        console.log(req.body)
        const existingUser = await VehicleService.defaultVehicle ( req.body, req.user )
        res.send({...existingUser._doc});
    } catch {
        res.status(400).send('Bad request');
    }
})

router.post('/decode', requireLogin, async (req, res) => {
    try {
        console.log(req.body)
        const existingUser = await VehicleService.decodeVehicle( req.body, req.user );
        res.send({...existingUser._doc});
    } catch {
        res.status(400).send({data: 'Enter Valid License plate'});
    }
})

module.exports = router;