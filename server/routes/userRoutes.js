const express = require('express')
const router = express.Router()
const userHelper = require('../helpers/user')
const newsletterHelper = require('../helpers/newsletter')
const requireLogin = require('../middlewares/requireLogin')
const permissionCheckHelper = require('../middlewares/permissionCheck')
const sgMail = require('@sendgrid/mail')
const Mailer = require('../../services/Mailer')
const keys = require('../../config/keys')
const { _isValidPhoneNumber } = require('../utils/validations')

sgMail.setApiKey(keys.sendGridKey)

router.post('/list', requireLogin, permissionCheckHelper.hasPermission('listAllUsers'), async (req, res) => {
  try {
    const { filter, take = 25, skip = 0 } = req.body
    const listUsers = await userHelper.listUsers({ filter, take, skip })
    if (!listUsers) throw Error('user does not exist')
    res.json(listUsers)
  } catch (e) {
    res.status(400).json({ msg: e.message })
  }
})

router.post(
  '/update',
  requireLogin,
  permissionCheckHelper.hasPermission('updateCurrentUsers'),
  async (req, res, next) => {
    try {
      const updatedUser = await userHelper.updateUserByid(req.user.sub, req.body)
      if (!updatedUser) throw new Error('user does not exist')

      res.json({ ...updatedUser })
    } catch (e) {
      res.status(400).json({ msg: e?.message ?? 'Something went wrong' })
    }
  }
)

router.post(
  '/current/update',
  requireLogin,
  permissionCheckHelper.hasPermission('updateCurrentUsers'),
  async (req, res) => {
    try {
      const updatedUser = await userHelper.updateUserByid(req.user.sub, req.body)
      await userHelper.updateTaxDataByid(req.user.sub, req.body)
      if (!updatedUser) throw new Error('user not updated')
      res.json(updatedUser)
    } catch (e) {
      res.status(400).json({ msg: e.message })
    }
  }
)

router.post('/current/delete', requireLogin, permissionCheckHelper.hasPermission('deleteUser'), async (req, res) => {
  try {
    const deletedUser = await userHelper.deleteUser(req.body.id)
    if (!deletedUser) throw Error('user does not exist')
    res.json(deletedUser)
  } catch (e) {
    res.status(400).json({ msg: e.message })
  }
})

router.post('/newsletter/add', async (req, res) => {
  try {
    const newUser = await userHelper.addToNewsletter(req.body.email)
    await newsletterHelper.sendIntro(req.body.email)
    res.json({ msg: 'success', email: req.body.email })
  } catch (e) {
    res.status(400).json({ msg: e.message })
  }
})

router.post('/newsletter/unsubscribe', async (req, res) => {
  try {
    await newsletterHelper.unsubscribeNewsletter(req.body.email)
    res.json({ msg: 'success', email: req.body.email })
  } catch (e) {
    res.status(400).json({ msg: e.message })
  }
})

router.get('/newsletter/get', async (req, res) => {
  try {
    const getNews = await newsletterHelper.getNewsStories()
    res.json(getNews)
  } catch (e) {
    res.status(400).json({ msg: e.message })
  }
})

router.get('/newsletter/list', async (req, res) => {
  try {
    const getNews = await newsletterHelper.retrieveExternalNews()
    res.json(getNews)
  } catch (e) {
    res.status(400).json({ msg: e.message })
  }
})

router.get('/current/subscriptions', requireLogin, async (req, res) => {
  try {
    const getSubscriptions = await userHelper.retrieveSubscriptions(req.user.sub)
    res.json(getSubscriptions)
  } catch (e) {
    res.status(400).json({ msg: e.message })
  }
})

router.get('/current/payment-methods', requireLogin, async (req, res) => {
  try {
    const getSubscriptions = await userHelper.retrievePaymentMethods(req.user.sub)
    res.json(getSubscriptions)
  } catch (e) {
    res.status(400).json({ msg: e.message })
  }
})

router.get('/getAllFreelancers', async (req, res) => {
  try {
    const { take, skip, minRate, maxRate, skill, name, sort } = req.query
    const freelancers = await userHelper.getAllFreelancers(skip, take, minRate, maxRate, skill, name, sort)
    res.json(freelancers)
  } catch (e) {
    res.status(400).json({ msg: e.message })
  }
})

router.post('/create-freelancer-invite', async (req, res) => {
  try {
    const freelancers = await userHelper.createFreelancerInvite(req.body)
    res.json(freelancers)
  } catch (e) {
    res.status(400).json({ msg: e.message })
  }
})

router.get('/thirdPartyCredentials/:id', async (req, res) => {
  try {
    const { thirdPartyCredentials } = await userHelper.getUserById(req.params.id)
    res.json(thirdPartyCredentials?.github)
  } catch (e) {
    res.status(400).json({ msg: e.message })
  }
})

router.patch(
  '/change-email',
  requireLogin,
  permissionCheckHelper.hasPermission('updateCurrentUsers'),
  async (req, res) => {
    try {
      const updateUser = await userHelper.changeEmail(req.user.sub, req.body)
      if (!updateUser) throw Error('user does not exist')
      res.json(updateUser)
    } catch (e) {
      res.status(400).json({ msg: e.message })
    }
  }
)

router.patch(
  '/change-phone',
  requireLogin,
  permissionCheckHelper.hasPermission('updateCurrentUsers'),
  async (req, res) => {
    try {
      const userData = await userHelper.getSingleUser({ _id: req.user.sub }, '-password')
      if (!userData) throw Error('user does not exist')

      const { currentPhone, phoneNumber } = req.body
      if (!userData?.phoneNumber && !_isValidPhoneNumber(phoneNumber)) {
        throw new Error(`Invalid phone number.`)
      } else if (currentPhone) {
        if (userData?.phoneNumber && currentPhone !== userData?.phoneNumber) {
          throw new Error(`Incorrect phone number.`)
        } else if (!userData?.phoneNumber && currentPhone === phoneNumber) {
          throw new Error(`New and current phone numbers must be different.`)
        } else if (!_isValidPhoneNumber(phoneNumber)) {
          throw new Error(`Invalid phone number.`)
        }
      } else if (userData?.phoneNumber && !currentPhone) {
        throw new Error(`Invalid phone number.`)
      }
      const updateUser = await userHelper.updateUserByid(req.user.sub, { phoneNumber })
      if (!updateUser) throw Error('user does not exist')
      res.json(updateUser)
    } catch (e) {
      res.status(400).json({ message: e.message })
    }
  }
)

router.post(
  '/calendar-settings',
  requireLogin,
  permissionCheckHelper.hasPermission('createCalenderSettings'),
  async (req, res) => {
    try {
      const response = await userHelper.createCalendar(req.body, req.user.sub)
      res.json(response)
    } catch (error) {
      res.status(400).json({ msg: error.message })
    }
  }
)
module.exports = router
