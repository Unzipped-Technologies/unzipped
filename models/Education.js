const mongoose = require('mongoose');

const { Schema } = mongoose;

const EducationSchema = new Schema(
    {
        school: { type: String },
        yearsAttended: { type: String },
        location: { type: String },
        maxLevelAttended: { type: String },
        year: { type: String },
        isDeleted: { type: Boolean, default: false }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('educations', EducationSchema);