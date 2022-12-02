const express = require("express");
const router = express.Router();

router.use('/auth', require('./authRoutes'));
router.use('/user', require('./userRoutes'));
router.use('/product', require('./productRoutes'));
router.use('/payment', require('./billingRoutes'));
router.use('/vehicle', require('./vehicleRoutes'));
router.use('/dashboard', require('./dashboardRoutes'));
router.use('/facebook', require('./facebookRoutes'));


module.exports = router;