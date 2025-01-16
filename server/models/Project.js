const mongoose = require('mongoose');

const { Schema } = mongoose;

const ProjectSchema = new Schema(
    {
        projectName: { type: String, required: true },
        role: { type: String, required: true },
        country: { type: String },
        skills: { type: [String], default: [], required: true },
        images: { type: [Schema.Types.ObjectId], ref: 'file', default: [] },
        isDeleted: { type: Boolean, default: false },
        isActive: { type: Boolean, default: true },
        freelancerId: { type: Schema.Types.ObjectId, ref: 'freelancers' },
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('projects', ProjectSchema);