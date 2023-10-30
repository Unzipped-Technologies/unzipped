const mongoose = require('mongoose');

const { Schema } = mongoose;

const ProjectSchema = new Schema(
    {
        title: { type: String },
        role: { type: Number },
        country: { type: String },
        skills: [{ type: String }],
        images: [{ type: String }],
        isDeleted: { type: Boolean, default: false }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('projects', ProjectSchema);