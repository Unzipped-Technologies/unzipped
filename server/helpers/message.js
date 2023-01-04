const user = require('../../models/User');
const message = require('../../models/Message');
const conversation = require('../../models/Conversation');
const mongoose = require('mongoose');


const sendMessage = async (data, id) => {
    const isConversation = await conversation.findById(data?.conversationId)
    let getConversation = isConversation;
    if (!data?.receiver?.userId) return undefined
    if (!isConversation) {
        getConversation = await conversation.create({
            participants: [
                {...data.sender, userId: id},
                {...data.receiver}
            ]
        }) 
    }
    await message.create({
        sender: id,
        message: data?.message,
        attachment: data?.attachment,
        conversationId: getConversation._id
    })
    await conversation.findByIdAndUpdate(getConversation._id, {
        messages: await message.find({conversationId: getConversation._id})
    })
    const updatedConversation = await conversation.findById(getConversation._id)
        .populate('messages')
        .populate({
            path: 'participants.userId',
            model: 'users',
            select: ['email', 'FirstName', 'LastName', 'profileImage']
        })
        .exec()

    return updatedConversation
}

const getMessagesForUser = async ({filter = {}, take = 25, skip = 0}, id) => {
    return await conversation.find({"participants.userId": id, ...filter})
        .skip( skip )
        .limit( take )
        .populate('messages')
        .populate({
            path: 'participants.userId',
            model: 'users',
            select: ['email', 'FirstName', 'LastName', 'profileImage']
        })
        .exec()
}

const getConversationById = async (conversationId, id) => {
    const getConversation = await conversation.findById(conversationId)
        .populate('messages')
        .populate({
            path: 'participants.userId',
            model: 'users',
            select: ['email', 'FirstName', 'LastName', 'profileImage']
        })
        .exec()
    if (getConversation?.participants?.find(e => e?.userId?._id == id)) {
        return getConversation
    }
    return undefined
}


module.exports = {
    sendMessage,
    getMessagesForUser,
    getConversationById
}