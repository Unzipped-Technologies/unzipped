const express = require('express')
const router = express.Router()
const userHelper = require('../helpers/user')
const newsletterHelper = require('../helpers/newsletter')
const requireLogin = require('../middlewares/requireLogin')
const permissionCheckHelper = require('../middlewares/permissionCheck')
const sgMail = require('@sendgrid/mail')
const Mailer = require('../../services/Mailer')
const keys = require('../../config/keys')

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

router.post('/update', requireLogin, permissionCheckHelper.hasPermission('updateAllUsers'), async (req, res) => {
  try {
    if (!req.body.id) throw Error('user id does not exist')
    const updatedUser = await userHelper.updateUserByid(req.body.id, req.body)
    if (!updatedUser) throw Error('user does not exist')
    res.json(updatedUser)
  } catch (e) {
    res.status(400).json({ msg: e.message })
  }
})

router.post(
  '/current/update',
  requireLogin,
  permissionCheckHelper.hasPermission('updateCurrentUsers'),
  async (req, res) => {
    try {
      const updatedUser = await userHelper.updateUserByid(req.user.sub, req.body)
      await userHelper.updateTaxDataByid(req.user.sub, req.body)
      if (!updatedUser) throw Error('user not updated')
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
    console.log(req.user.sub)
    const getSubscriptions = await userHelper.retrievePaymentMethods(req.user.sub)
    res.json(getSubscriptions)
  } catch (e) {
    res.status(400).json({ msg: e.message })
  }
})

module.exports = router
