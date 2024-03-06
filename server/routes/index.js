const express = require('express')
const router = express.Router()

router.use('/auth', require('./authRoutes'))
router.use('/user', require('./userRoutes'))
router.use('/freelancerSkills', require('./freelancerSkillsRoutes'))
router.use('/product', require('./productRoutes'))
router.use('/payment', require('./billingRoutes'))
router.use('/contract', require('./contractRoutes'))
router.use('/stripe', require('./bankingRoutes'));
router.use('/dashboard', require('./dashboardRoutes'))
router.use('/facebook', require('./facebookRoutes'))
router.use('/list', require('./listRoutes'))
router.use('/business', require('./businessRoutes'))
router.use('/like', require('./likeRoutes'))
router.use('/message', require('./messageRoutes'))
router.use('/file', require('./fileRoutes'))
router.use('/profile', require('./profileRoutes'))
router.use('/project', require('./projectRoutes'))
router.use('/projectApplication', require('./projectApplicationsRoutes'))
router.use('/education', require('./educationRoutes'))
router.use('/taskHours', require('./taskHoursRoutes'))
router.use('/invoice', require('./invoiceRoutes'))
router.use('/questions', require('./questionRoutes'))
router.use('/tasks', require('./taskRoutes'))
router.use('/tags', require('./tagRoutes'))
router.use('/department', require('./departmentRoutes'))
router.use('/freelancer', require('./freelancerRoutes'))
router.use('/list-entries', require('./listEntriesRoute'));
router.use('/questions', require('./questionRoutes'))
router.use('/projectApplication', require('./projectApplicationsRoutes'))

router.use('/meeting', require('./meetingRoutes'));
router.use('/calender', require('./CalenderSettingRoutes'));

module.exports = router
