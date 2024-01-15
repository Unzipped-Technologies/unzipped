const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const meetingSchema = new Schema({
    PrimaryTime: {
        Date: Date,
        Time: String
    },
    secondaryTimes: [{
        Date: Date,
        Time: String
    }],
    senderId: String,
    receiverId: String,
    isAccepted: {
        type: Boolean,
        default: false
    },
    isSecondaryTimeAccepted: {
        type: Boolean,
        default: false
    },
    calendlyLink: String,
    meetingLink: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    isArchive: Boolean
});

const Meeting = mongoose.model('meetings', meetingSchema);

module.exports = Meeting;
