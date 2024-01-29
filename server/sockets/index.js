const socketIO = require('socket.io');
const keys = require('../../config/keys');
const axios = require('axios')
const conversations = require('../../models/Conversation');
const MeetingHelper = require('./../helpers/meeting');
const MessageHelper = require('./../helpers/message');
const UserModel = require('./../../models/User');
const ZoomHelper = require('./../helpers/ZoomHelper');
module.exports = createSocket = (server) => {

    const io = socketIO(server);
    const onlineUsers = {};

    io.on('connection', socket => {

        socket.on("createMeeting", async (params) => {
            const meetingCreated = await MeetingHelper.createMeeting(params)
            const user = await UserModel.findById(params.senderId);
            const msg = `${user._doc.FirstName} ${user._doc.LastName} is trying to schedule a meeting with you for ${getMonthByName(params.primaryTime.Date)} at ${params.primaryTime.Time}. Please review if this time will work for you, and approve.`
            const msgObj = {
                sender: params.senderId,
                meetingId: meetingCreated._id,
                message: msg,
                receiver: { userId: params.receiverId }
            }
            await MessageHelper.sendMessage(msgObj, params.senderId);
            socket.emit("refreshConversationList");
        })

        socket.on('onMeetingAcceptOrDecline', async (
            {
                meeting,
                meetingStatus: meetingStatus,
                message
            }
        ) => {
            let msg = '';
            if (meetingStatus === "DECLINE") {
                const user = await UserModel.findById(meeting.senderId);
                const isExistingMeetingRecord = await MeetingHelper.findMeetingById(meeting._id);
                if (isExistingMeetingRecord?._doc.meetingStatus === "DECLINE") {
                    await MeetingHelper.updateMeeting({ _id: meeting._id, meetingStatus: "REJECTED" });
                    msg = `You have declined meeting with ${user._doc.FirstName} ${user._doc.LastName}`
                }
                else {
                    await MeetingHelper.updateMeeting({ _id: meeting._id, meetingStatus: meetingStatus });
                    msg = "The freelancer has proposed some additional times:";
                }
            }
            if (meetingStatus === "ACCEPTED") {
                const user = await UserModel.findById(meeting.receiverId);

                const zoomRecord = await ZoomHelper.createZoomMeeting(
                    {
                        "topic": 'Scheduled Interview',
                        "type": 2,
                        "start_time": "2023-08-30",
                        "duration": 60,
                        "agenda": "Interview",
                        "default_password": false,
                        "close_registration": true,
                        "settings": {
                            "host_video": false,
                            "participant_video": false,
                            "join_before_host": true
                        },
                    },
                    {
                        attendees: [
                            {
                                name: `${user._doc.FirstName || ''} ${user._doc.LastName || ''}`
                            }
                        ],
                        ttl: 36000

                    }
                );
                await MeetingHelper.updateMeeting(
                    {
                        _id: meeting._id,
                        meetingStatus: meetingStatus,
                        zoomMeeting: zoomRecord?.zoomMeeting ?? null
                    }
                );

                msg = `${user._doc.FirstName || ''}   ${user._doc.LastName || ''} has accepted your invitation for a meeting on ${getMonthByName(meeting.primaryTime.Date)} at ${meeting.primaryTime.Time}. You can join the meeting at the link here: ${zoomRecord?.zoomMeeting?.zoomJoiningUrl}`

            }

            const msgObj = {
                sender: meeting.receiverId,
                meetingId: meeting._id,
                message: msg,
                receiver: { userId: meeting.senderId },
                conversationId: message.conversationId
            }
            await MessageHelper.sendMessage(msgObj, meeting.receiverId);
        })

        socket.on('onProposedMeetingTime', async (params, updateMeetingStatus) => {
            const { meeting, message, proposedMeetingTime, index } = params;
            const existingMeetingRecord = await MeetingHelper.findMeetingById(meeting._id);
            if (updateMeetingStatus == "DECLINE") {
                await MeetingHelper.updateMeeting(
                    {
                        _id: existingMeetingRecord._doc._id,
                        meetingStatus: updateMeetingStatus
                    }
                )
            }
            if (
                existingMeetingRecord &&
                existingMeetingRecord?.secondaryTimes &&
                existingMeetingRecord.secondaryTimes.length > 0 &&
                updateMeetingStatus == "ACCEPTED"
            ) {
                const user = await UserModel.findById(meeting.receiverId);
                let secondaryTimes = existingMeetingRecord._doc.secondaryTimes;

                secondaryTimes[index]._doc.Date = existingMeetingRecord._doc.primaryTime.Date;
                secondaryTimes[index]._doc.Time = existingMeetingRecord._doc.primaryTime.Time;

                const zoomRecord = await ZoomHelper.createZoomMeeting(
                    {
                        "topic": 'Scheduled Interview',
                        "type": 2,
                        "start_time": "2023-08-30",
                        "duration": 60,
                        "agenda": "Interview",
                        "default_password": false,
                        "close_registration": true,
                        "settings": {
                            "host_video": false,
                            "participant_video": false,
                            "join_before_host": true
                        },
                    },
                    {
                        attendees: [
                            {
                                name: `${user._doc.FirstName || ''} ${user._doc.LastName || ''}`
                            }
                        ],
                        ttl: 36000

                    }
                );

                let updateMeetingDetails = {
                    _id: existingMeetingRecord._doc._id,
                    primaryTime: {
                        Date: proposedMeetingTime.Date,
                        Time: proposedMeetingTime.Time
                    },
                    secondaryTimes: secondaryTimes,
                    meetingStatus: "ACCEPTED",
                    zoomMeeting: zoomRecord?.zoomMeeting ?? null
                };

                await MeetingHelper.updateMeeting(updateMeetingDetails);

                msg = `${user?.FirstName || ''}   ${user?.LastName || ''} has accepted your invitation for a meeting on ${getMonthByName(meeting.primaryTime.Date)} at ${meeting.primaryTime.Time}. You can join the meeting at the link here: ${zoomRecord?.zoomMeeting?.zoomJoiningUrl}`
                const msgObj = {
                    sender: meeting.senderId,
                    meetingId: meeting._id,
                    message: msg,
                    receiver: { userId: meeting.receiverId },
                    conversationId: message.conversationId
                }

                await MessageHelper.sendMessage(msgObj, meeting.senderId);
            }

        })

        socket.on('userConnected', (userId) => {
            onlineUsers[userId] = socket.id;
            socket.userId = userId;
            io.emit('updateOnlineUsers', onlineUsers);
        });

        socket.on('chat message', async (message) => {
            const conversation = {
                ...message,
            };
            socket.broadcast.to(onlineUsers[message?.receiver?.userId]).emit('chat message', conversation);
            socket.emit('chat message', conversation);

            try {
                const headers = {
                    access_token: message?.access
                };
                await axios.post(`${keys.redirectDomain}/api/message/send`, message, { headers })
                await conversations.findByIdAndUpdate(
                    conversation.conversationId,
                    {
                        $inc: {
                            'participants.$[elem].unreadCount': 1
                        }
                    },
                    {
                        arrayFilters: [{ 'elem.userId': conversation.receiver.userId }],
                        new: true
                    }
                )
                await conversations.findByIdAndUpdate(
                    conversation.conversationId,
                    {
                        $set: {
                            'participants.$[elem].unreadCount': 0
                        }
                    },
                    {
                        arrayFilters: [{ 'elem.userId': conversation.sender.userId }],
                        new: true
                    }
                )

            } catch (error) {
                socket.emit('chat message', error);
            }
        });

        socket.on('typing', message => {
            io.emit('typing', message);
        })

        socket.on('stop-typing', message => {
            console.log(message, onlineUsers, onlineUsers[message?.receiverId])
            socket.broadcast.to(onlineUsers[message?.receiverId]).emit('stop-typing', message);
        })

        socket.on('updateOnlineUsers', () => {
            onlineUsers[socket?.userId] = socket.id;
            delete onlineUsers[socket?.userId];
            io.emit('updateOnlineUsers', Object.keys(onlineUsers));
        })

        socket.on('disconnect', () => {
            onlineUsers[socket?.userId] = socket.id;
            if (onlineUsers[socket?.userId]) {
                delete onlineUsers[socket?.userId];
                io.emit('updateOnlineUsers', Object.keys(onlineUsers));
            }
        });

    });

    const getMonthByName = (dateString) => {
        const [YEAR, MONTH, DAY] = dateString.split('-');
        let monthNumber = parseInt(MONTH);
        const months = [
            "January", "February", "March", "April",
            "May", "June", "July", "August",
            "September", "October", "November", "December"
        ];

        if (monthNumber >= 1 && monthNumber <= 12) {
            return months[monthNumber - 1] + ' ' + (DAY.includes("T") ? DAY.split("T")[0] : DAY) + ', ' + YEAR;
        }

    }
}