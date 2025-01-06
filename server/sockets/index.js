const socketIO = require('socket.io')
const keys = require('../../config/keys')
const axios = require('axios')
const conversations = require('../models/Conversation')
const MeetingHelper = require('./../helpers/meeting')
const MessageHelper = require('./../helpers/message')
const FreelancerHelper = require('./../helpers/freelancer')
const UserModel = require('./../models/User')
const ZoomHelper = require('./../helpers/ZoomHelper')
const FileModel = require('./../models/file')
const CloudinaryManager = require('../../services/cloudinary') 

module.exports = createSocket = server => {
  const io = socketIO(server, {
    maxHttpBufferSize: 1e9
  })
  const onlineUsers = {}

  io.on('connection', socket => {
    socket.on('createMeeting', async params => {
      const meetingCreated = await MeetingHelper.createMeeting(params)
      const user = await UserModel.findById(params.senderId)
      const msg = `${user._doc.FirstName} ${
        user._doc.LastName
      } is trying to schedule a meeting with you for ${getMonthByName(params.primaryTime.Date)} at ${
        params.primaryTime.Time
      }. Please review if this time will work for you, and approve.`
      const msgObj = {
        sender: params.senderId,
        meetingId: meetingCreated._id,
        message: msg,
        receiver: { userId: params.receiverId }
      }
      await MessageHelper.sendMessage(msgObj, params.senderId)
      socket.emit('refreshConversationList')
      socket.broadcast.to(onlineUsers[params.receiverId]).emit('refreshConversationList')
    })

    socket.on('onMeetingAcceptOrDecline', async ({ meeting, meetingStatus: meetingStatus, message }) => {
      let msg = ''
      const client = await UserModel.findById(meeting.senderId)
      const isExistingMeetingRecord = await MeetingHelper.findMeetingById(meeting._id)
      if (meetingStatus === 'DECLINE') {
        const user = await UserModel.findById(meeting.receiverId)
        if (isExistingMeetingRecord?._doc.meetingStatus === 'DECLINE') {
          await MeetingHelper.updateMeeting({ _id: meeting._id, meetingStatus: 'REJECTED' })
          msg = `${user._doc.FirstName} ${user._doc.LastName} has declined meeting with you.`
        } else {
          if (meeting.secondaryTimes.length > 0) {
            await MeetingHelper.updateMeeting({ _id: meeting._id, meetingStatus: meetingStatus })
            msg = `The ${client._doc.FirstName} ${client._doc.LastName} has proposed some additional times:`
          } else {
            await MeetingHelper.updateMeeting({ _id: meeting._id, meetingStatus: 'REJECTED' })
            msg = ` ${user._doc.FirstName} ${user._doc.LastName} has declined meeting with you.`
          }
        }
      }
      if (meetingStatus === 'ACCEPTED') {
        const user = await UserModel.findById(meeting.receiverId)
        const sender = await UserModel.findById(meeting.senderId)
        const zoomRecord = await ZoomHelper.createZoomMeeting(
          {
            topic: 'Scheduled Interview',
            type: 2,
            start_time: '2023-08-30',
            duration: 60,
            agenda: 'Interview',
            default_password: false,
            close_registration: true,
            settings: {
              host_video: false,
              participant_video: false,
              join_before_host: true
            }
          },
          {
            attendees: [
              {
                 name: `${user?._doc?.FirstName || ''} ${user?._doc?.LastName || ''}`
              },
              { 
                name: `${sender?._doc?.FirstName || ''} ${sender?._doc?.LastName || ''}`
              }
            ],
            ttl: 36000
          }
        )
        const senderJoiningUrl = zoomRecord?.zoomMeeting?.participants?.find(participant => 
        participant.name === `${sender?._doc?.FirstName} ${sender?._doc?.LastName}`)
        ?.join_url
        const receiverJoiningUrl = zoomRecord?.zoomMeeting?.participants?.find(participant => 
        participant.name === `${user?._doc?.FirstName} ${user?._doc?.LastName}`)
        ?.join_url 

        const zoomMeetingLink = senderJoiningUrl + ' ' + receiverJoiningUrl;

        await MeetingHelper.updateMeeting({
          _id: meeting._id,
          meetingStatus: meetingStatus,
          zoomMeeting: zoomMeetingLink ?? null
        })

        msg = `${user._doc.FirstName || ''}   ${
          user._doc.LastName || ''
        } has accepted your invitation for a meeting on ${getMonthByName(meeting.primaryTime.Date)} at ${
          meeting.primaryTime.Time
        }. You can join the meeting at the link here:${senderJoiningUrl}  ${receiverJoiningUrl} `
      }

      if (
        meetingStatus === 'DECLINE' &&
        meeting.secondaryTimes.length > 0 &&
        client._doc.role === 0 && isExistingMeetingRecord?._doc.meetingStatus !== 'DECLINE'
      ) 
      {
        const msgObj = {
          sender: meeting?.senderId,
          meetingId: meeting?._id,
          message: msg,
          receiver: { userId: meeting?.receiverId },
          conversationId: message?.conversationId,
          updatedAt: message?.updatedAt
        }
        await MessageHelper.sendMessage(msgObj, meeting?.senderId)
        socket.emit('chat message', msgObj)
        return;
      } 
      const msgObj = {
        sender: meeting.receiverId,
        meetingId: meeting._id,
        message: msg,
        receiver: { userId: meeting.senderId },
        conversationId: message.conversationId,
        updatedAt: message?.updatedAt
      }        
      await MessageHelper.sendMessage(msgObj, meeting.receiverId)
      socket.emit('chat message', msgObj)
    })

    socket.on('onProposedMeetingTime', async (params, updateMeetingStatus) => {
      const { meeting, message, proposedMeetingTime, index } = params
      const existingMeetingRecord = await MeetingHelper.findMeetingById(meeting._id)
      if (updateMeetingStatus == 'DECLINE') {
        await MeetingHelper.updateMeeting({
          _id: existingMeetingRecord._doc._id,
          meetingStatus: updateMeetingStatus
        })
      }
      if (
        existingMeetingRecord &&
        existingMeetingRecord?.secondaryTimes &&
        existingMeetingRecord.secondaryTimes.length > 0 &&
        updateMeetingStatus == 'ACCEPTED'
      ) {
        const user = await UserModel.findById(meeting.receiverId)
        const sender = await UserModel.findById(meeting.senderId)

        let secondaryTimes = existingMeetingRecord._doc.secondaryTimes

        secondaryTimes[index]._doc.Date = existingMeetingRecord._doc.primaryTime.Date
        secondaryTimes[index]._doc.Time = existingMeetingRecord._doc.primaryTime.Time

        const zoomRecord = await ZoomHelper.createZoomMeeting(
          {
            topic: 'Scheduled Interview',
            type: 2,
            start_time: '2023-08-30',
            duration: 60,
            agenda: 'Interview',
            default_password: false,
            close_registration: true,
            settings: {
              host_video: false,
              participant_video: false,
              join_before_host: true
            }
          },
          {
            attendees: [
              {
                name: `${user._doc.FirstName || ''} ${user._doc.LastName || ''}`
              },
              {
                name: `${sender._doc.FirstName || ''} ${sender._doc.LastName || ''}`
              }
            ],
            ttl: 36000
          }
        )

        
        const senderJoiningUrl = zoomRecord?.zoomMeeting?.participants?.find(participant => 
        participant.name === `${sender?._doc?.FirstName} ${sender?._doc?.LastName}`)
        ?.join_url
        const receiverJoiningUrl = zoomRecord?.zoomMeeting?.participants?.find(participant => 
        participant.name === `${user?._doc?.FirstName} ${user?._doc?.LastName}`)
        ?.join_url 

        const zoomMeetingLink = senderJoiningUrl + '  ' + receiverJoiningUrl;

        let updateMeetingDetails = {
          _id: existingMeetingRecord._doc._id,
          primaryTime: {
            Date: proposedMeetingTime.Date,
            Time: proposedMeetingTime.Time
          },
          secondaryTimes: secondaryTimes,
          meetingStatus: 'ACCEPTED',
          zoomMeeting: zoomMeetingLink ?? null          
        }

        await MeetingHelper.updateMeeting(updateMeetingDetails)

        msg = `${user?.FirstName || ''}   ${
          user?.LastName || ''
        } has accepted your invitation for a meeting on ${getMonthByName(proposedMeetingTime.Date)} at ${
          proposedMeetingTime.Time
        }. You can join the meeting at the link here: ${senderJoiningUrl}  ${receiverJoiningUrl}`
        const msgObj = {
          sender: meeting.receiverId,
          meetingId: meeting._id,
          message: msg,
          receiver: { userId: meeting.senderId },
          conversationId: message.conversationId,
          updatedAt: message?.updatedAt
        }

        await MessageHelper.sendMessage(msgObj, meeting.receiverId)
        socket.emit('chat message', msgObj)
      }
    })

    socket.on('userConnected', userId => {
      onlineUsers[userId] = socket.id
      socket.userId = userId
      io.emit('updateOnlineUsers', onlineUsers)
    })

    socket.on('chat unread', async conversation => {
      const res = await conversations.findByIdAndUpdate(
        conversation.conversationId,
        {
          $set: {
            'participants.$[elem].unreadCount': 0
          }
        },
        {
          arrayFilters: [{ 'elem.userId': conversation.receiverId }],
          new: true
        }
      )
      const participantCount =
        res?.participants?.find(participant => participant?.userId?._id === conversation?.receiverId)?.unreadCount ?? 0

      socket.userId = conversation.receiverId
      if (res?._id) {
        socket.broadcast.to(onlineUsers[conversation.receiverId]).emit('chat unread', {
          conversationid: conversation.conversationId,
          receiverId: conversation.receiverId
        })

        io.emit('chat unread', {
          conversationid: conversation.conversationId,
          receiverId: conversation.receiverId
        })
      }
    })

    socket.on('chat message', async message => {
      try {
        const headers = {
          access_token: message?.access
        }
        const filesArray = []
        if (message?.attachment?.length) {
          for (const file of message.attachment) {
            const uploadFileResp = await CloudinaryManager.uploader.upload(file.file, {
              filename_override: file.name,
              folder: message?.sender?.userId,
              resource_type: file.type === 'application/pdf' ? 'raw' : 
               file.type.startsWith('image') ? 'image' : 'auto'
            })

            const newFile = await FileModel.create({
              name: uploadFileResp.original_filename,
              size: uploadFileResp.bytes,
              url: uploadFileResp.secure_url,
              cloudinaryId: uploadFileResp.public_id,
              userId: message?.sender?.userId,
              resource_type: uploadFileResp.resource_type,
              format: uploadFileResp.format,
              width: uploadFileResp.width,
              height: uploadFileResp.height
            })

            await UserModel.findOneAndUpdate(
                { _id: message?.sender?.userId },
                { $addToSet: { files:  newFile._id } },
                { new: true }
              )
            if (newFile) {
              filesArray.push({
                fileId: newFile._id,
                name: newFile.name,
                url: newFile.url,
                resourceType: newFile.resource_type,
                format: newFile.format,
                width: newFile.width,
                height: newFile.height
              })
            }
          }
        }

        const messageObj = { ...message, attachment: filesArray }
        const conversation = {
          ...messageObj,
          unreadCount: 1
        }

        socket.broadcast.to(onlineUsers[message?.receiver?.userId]).emit('chat message', conversation)
        socket.emit('chat message', conversation)
        await axios.post(`${keys.redirectDomain}/api/message/send`, messageObj, { headers })
      } catch (error) {
        socket.emit('chat message', error)
      }
    })

    socket.on('typing', message => {
      io.emit('typing', message)
    })

    socket.on('stop-typing', message => {
      socket.broadcast.to(onlineUsers[message?.receiverId]).emit('stop-typing', message)
    })

    socket.on('updateOnlineUsers', () => {
      onlineUsers[socket?.userId] = socket.id
      delete onlineUsers[socket?.userId]
      io.emit('updateOnlineUsers', Object.keys(onlineUsers))
    })

    socket.on('disconnect', () => {
      onlineUsers[socket?.userId] = socket.id
      if (onlineUsers[socket?.userId]) {
        delete onlineUsers[socket?.userId]
        io.emit('updateOnlineUsers', Object.keys(onlineUsers))
      }
    })

    socket.on('like', async payload => {
      const response = await FreelancerHelper.handleLike(payload)
      // socket.broadcast.to(onlineUsers[payload?.userId]).emit('like', response)

      io.emit('like', response)
    })

    socket.on('dislike', async payload => {
      const response = await FreelancerHelper.handleDisLike(payload)
      // socket.broadcast.to(onlineUsers[payload?.userId]).emit('dislike', response)

      io.emit('dislike', response)
    })
  })

  const getMonthByName = dateString => {
    const [YEAR, MONTH, DAY] = dateString.split('-')
    let monthNumber = parseInt(MONTH)
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ]

    if (monthNumber >= 1 && monthNumber <= 12) {
      return months[monthNumber - 1] + ' ' + (DAY.includes('T') ? DAY.split('T')[0] : DAY) + ', ' + YEAR
    }
  }
}
