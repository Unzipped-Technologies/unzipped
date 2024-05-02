const express = require('express')
const router = express.Router()
const messageHelper = require('../helpers/message')
const requireLogin = require('../middlewares/requireLogin')
const permissionCheckHelper = require('../middlewares/permissionCheck')

// lets user send a message
router.post('/send', requireLogin, permissionCheckHelper.hasPermission('sendMessage'), async (req, res) => {
  try {
    const id = req.user.sub
    const sentMessage = await messageHelper.sendMessage(req.body, id)
    if (!sentMessage) throw Error('message not sent')
    res.json(sentMessage)
  } catch (e) {
    res.status(400).json({ msg: e.message })
  }
})

// lets user send a message
router.post('/list', requireLogin, permissionCheckHelper.hasPermission('getMessagesById'), async (req, res) => {
  try {
    const id = req.user.sub
    const AllConversations = await messageHelper.getMessagesForUser(req.body, id)
    if (!AllConversations) throw Error('conversations not found')
    res.json(AllConversations)
  } catch (e) {
    res.status(400).json({ msg: e.message })
  }
})

// lets user get conversation by ID
router.get('/:id', requireLogin, permissionCheckHelper.hasPermission('getMessagesById'), async (req, res) => {
  try {
    const conversationId = req.params.id
    const { limit } = req.query
    const id = req.user.sub
    const getConversation = await messageHelper.getConversationById(conversationId, id, limit)
    if (!getConversation) throw Error('conversations not found')
    res.json(getConversation)
  } catch (e) {
    res.status(400).json({ msg: e.message })
  }
})

// update the status of Conversation
router.patch('/:id', requireLogin, permissionCheckHelper.hasPermission('UpdateMessage'), async (req, res) => {
  try {
    const { type, status } = req.body
    const id = req.user.sub
    const conversationId = req.params.id
    const getConversation = await messageHelper.updateConversationStatus(conversationId, type, status, id)
    if (!getConversation) throw Error('Conversation not found')
    res.json(getConversation)
  } catch (e) {
    res.status(400).json({ msg: e.message })
  }
})

module.exports = router
