const mongoose = require('mongoose');

const { Schema } = mongoose;

const CalenderSetting = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'users' },
        fromDate: { type: Date },
        toDate: { type: Date },
        startTime: { type: String },
        endTime: { type: String },
        timezone: { type: String },
        calendlyLink: { type: String }

    },
    {
        timestamps: true
    }
);



module.exports = mongoose.model('calenderSettings', CalenderSetting);