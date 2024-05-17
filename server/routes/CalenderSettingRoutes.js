const express = require('express')
const router = express.Router()

const requireLogin = require('../middlewares/requireLogin')
const permissionCheckHelper = require('../middlewares/permissionCheck')
const CalenderHelper = require('../helpers/CalenderHelper')

router.post('/', async (req, res) => {
  try {
    const savedCalender = await CalenderHelper.createCalender(req.body)
    res.json(savedCalender)
  } catch (error) {
    res.status(400).json({ msg: error.message })
  }
})

router.get('/', requireLogin, permissionCheckHelper.hasPermission('getCalenderSettings'), async (req, res) => {
  try {
    const response = await CalenderHelper.getCalender(req?.user?.sub)
    res.json(response)
  } catch (error) {
    res.status(400).json({ msg: error.message })
  }
})

module.exports = router
