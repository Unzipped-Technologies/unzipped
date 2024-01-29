const express = require("express");
const router = express.Router();
const CalenderHelper = require('../helpers/CalenderHelper');

router.post('/', async (req, res) => {
    try {
        const savedCalender = await CalenderHelper.createCalender(req.body);
        res.json(savedCalender)
    } catch (error) {
        console.log('Error', error)
        res.status(400).json({ msg: error.message })
    }
});




module.exports = router;