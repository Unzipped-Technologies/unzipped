const express = require("express");
const router = express.Router();

router.use('/auth', require('./authRoutes'));
router.use('/user', require('./userRoutes'));
router.use('/product', require('./productRoutes'));
router.use('/payment', require('./billingRoutes'));
router.use('/vehicle', require('./vehicleRoutes'));
router.use('/dashboard', require('./dashboardRoutes'));
router.use('/facebook', require('./facebookRoutes'));
router.use('/list', require('./listRoutes'));
router.use('/business', require('./businessRoutes'));
router.use('/like', require('./likeRoutes'));
router.use('/message', require('./messageRoutes'));
router.use('/file', require('./fileRoutes'));


module.exports = router;