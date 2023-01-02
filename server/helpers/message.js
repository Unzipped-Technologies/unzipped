const user = require('../../models/User');
const message = require('../../models/Message');
const mongoose = require('mongoose');


const sendMessage = async (data, id) => {
    const newMessage = await message.create({
        ...data,
        userSenderId: id
    })
    return newMessage
}

const getMessagesForUser = ({filter, take = 25, skip = 0}, id) => {
    const listMessages = message.find({userSenderId: id, filter, take, skip})
    return
}


module.exports = {
    sendMessage,
    getMessagesForUser
}