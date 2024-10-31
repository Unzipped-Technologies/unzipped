const message = require('../models/Message')
const conversation = require('../models/Conversation')
const mongoose = require('mongoose')

const sendMessage = async (data, id) => {
  try {
    let conversationData = null
    // conversationData = await conversation.findById(data?.conversationId)
    const senderId = mongoose.Types.ObjectId(id);
    const receiverId = mongoose.Types.ObjectId(data.receiver.userId);

    conversationData = await conversation.findOne({
      $and: [
        { participants: { $elemMatch: { userId: senderId } } },
        { participants: { $elemMatch: { userId: receiverId } } }
      ]
    });

    if (!data?.receiver?.userId) return undefined

    if (!conversationData) {
      conversationData = await conversation.create({
        participants: [{ ...data.sender, userId: id }, { ...data.receiver }]
      })
    }
    const newMessage = await message.create({
      sender: id,
      message: data?.message,
      attachment: data?.attachment,
      conversationId: conversationData._id,
      ...(data?.meetingId && { meetingId: data?.meetingId })
    })
    if (conversationData?.messages?.length) {
      conversationData.messages.push(newMessage?._id)
    } else {
      conversationData['messages'] = [newMessage?._id]
    }

    await conversationData.save()
    return await conversation
      .findById(conversationData._id)
      .populate('messages')
      .populate({
        path: 'participants.userId',
        model: 'users',
        select: ['email', 'FirstName', 'LastName', 'profileImage']
      })
      .exec()
  } catch (err) {}
}

const getMessagesForUser = async ({ filter = {}, take = 25, skip = 0 }, id) => {
  try {
    return await conversation
      .find({
        participants: {
          $elemMatch: { userId: id }
        },
        ...filter
      })
      .skip(skip)
      .limit(take)
      .populate({
        path: 'messages',
        model: 'messages',
        populate: {
          path: 'meetingId',
          model: 'meetings'
        }
      })
      .populate({
        path: 'participants.userId',
        model: 'users',
        select: ['email', 'FirstName', 'LastName', 'profileImage', 'freelancers'],
        populate: {
          path: 'freelancers',
          model: 'freelancers',
          select: ['category']
        }
      })

      .exec()
  } catch (error) {}
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
      },
      populate: {
        path: 'meetingId',
        model: 'meetings'
      }
    })
    .populate({
      path: 'participants.userId',
      model: 'users',
      select: ['email', 'FirstName', 'LastName', 'profileImage', 'freelancers'],
      populate: {
        path: 'freelancers',
        model: 'freelancers',
        select: ['category']
      }
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

const checkConversation = async data => {
  let newConversation = null
  const freelancerId = mongoose.Types.ObjectId(data.freelancerId)
  const clientId = mongoose.Types.ObjectId(data.clientId)

  const conversationData = await conversation.aggregate([
    {
      $lookup: {
        from: 'conversations', // Replace with your collection name
        localField: '_id',
        foreignField: '_id',
        as: 'conversationData'
      }
    },
    {
      $unwind: '$conversationData' // Unwind the looked up data
    },
    {
      $project: {
        numParticipants: { $size: '$conversationData.participants' },
        matchingUserId1: {
          $sum: {
            $map: {
              input: '$conversationData.participants',
              as: 'participant',
              in: {
                $cond: { if: { $eq: ['$$participant.userId', clientId] }, then: 1, else: 0 }
              }
            }
          }
        },
        matchingUserId2: {
          $sum: {
            $map: {
              input: '$conversationData.participants',
              as: 'participant',
              in: {
                $cond: { if: { $eq: ['$$participant.userId', freelancerId] }, then: 1, else: 0 }
              }
            }
          }
        },
        conversation: '$conversationData' // Include the conversation data
      }
    },
    {
      $match: {
        numParticipants: 2, // Ensure exactly 2 participants
        matchingUserId1: 1, // One participant matches userId1
        matchingUserId2: 1 // One participant matches userId2
      }
    }
  ])
  if (!conversationData?.length) {
    newConversation = await conversation.create({
      participants: [{ userId: data.clientId }, { userId: data.freelancerId }]
    })
  } else {
    newConversation = conversationData[0]?.conversation
  }

  return newConversation
}

module.exports = {
  sendMessage,
  getMessagesForUser,
  getConversationById,
  checkConversation,
  updateConversationStatus
}
