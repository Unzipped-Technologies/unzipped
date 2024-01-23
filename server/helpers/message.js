const user = require('../models/User')
const message = require('../models/Message')
const conversation = require('../models/Conversation')
const mongoose = require('mongoose')

const sendMessage = async (data, id) => {
  const isConversation = await conversation.findById(data?.conversationId)
  let getConversation = isConversation
  if (!data?.receiver?.userId) return undefined
  if (!isConversation) {
    getConversation = await conversation.create({
      participants: [{ ...data.sender, userId: id }, { ...data.receiver }]
    })
  }
  await message.create({
    sender: id,
    message: data?.message,
    attachment: data?.attachment,
    conversationId: getConversation._id
  })
  await conversation.findByIdAndUpdate(getConversation._id, {
    messages: await message.find({ conversationId: getConversation._id })
  })
  return await conversation
    .findById(getConversation._id)
    .populate('messages')
    .populate({
      path: 'participants.userId',
      model: 'users',
      select: ['email', 'FirstName', 'LastName', 'profileImage']
    })
    .exec()
}

const getMessagesForUser = async ({ filter = {}, take = 25, skip = 0 }, id) => {
  return await conversation
    .find({
      participants: {
        $elemMatch: { userId: id }
      },
      ...filter
    })
    .skip(skip)
    .limit(take)
    .populate('messages')
    .populate({
      path: 'participants.userId',
      model: 'users',
      select: ['email', 'FirstName', 'LastName', 'profileImage']
    })
    .exec()
}

const getConversationById = async (conversationId, id, limit) => {
  const updatedConversation = await conversation
    .findByIdAndUpdate(
      conversationId,
      {
        $set: {
          'participants.$[elem].unreadCount': 0
        }
      },
      {
        arrayFilters: [{ 'elem.userId': id }],
        new: true
      }
    )
    .populate({
      path: 'messages',
      options: {
        sort: { createdAt: -1 },
        limit: limit
      }
    })
    .populate({
      path: 'participants.userId',
      model: 'users',
      select: ['email', 'FirstName', 'LastName', 'profileImage']
    })
    .exec()
  const count = await message.countDocuments({ conversationId: conversationId })
  return { updatedConversation, count }
}

const updateConversationStatus = async (conversationId, type, status) => {
  const updateField = {
    [type]: status
  }
  const updatedConversation = await conversation
    .findByIdAndUpdate(conversationId, { $set: updateField }, { new: true })
    .exec()
  if (updatedConversation) {
    return { msg: `Conversation ${type} updated successfully` }
  } else {
    return undefined
  }
}

module.exports = {
  sendMessage,
  getMessagesForUser,
  getConversationById,
  updateConversationStatus
}
