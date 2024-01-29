const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const meetingSchema = new Schema({
    primaryTime: {
        Date: Date,
        Time: String
    },
    secondaryTimes: [{
        Date: Date,
        Time: String
    }],
    senderId: {
        type: String
    },
    receiverId: {
        type: String
    },
    meetingStatus: {
        type: String,
        enum: ['DECLINED', 'PENDING', 'ACCEPTED', 'REJECTED'],
        default: 'PENDING'
    },
    isSecondaryTimeAccepted: {
        type: Boolean,
        default: false
    },
    calendlyLink: {
        type: String
    },
    zoomMeeting: {
        zoomJoiningUrl: { type: String },
        zoomMeetingId: { type: String }
    },
    createdAt: {
        type: Date,
    },
    isArchive: Boolean
},
    { timestamps: true }
);

const Meeting = mongoose.model('meetings', meetingSchema);

module.exports = Meeting;
