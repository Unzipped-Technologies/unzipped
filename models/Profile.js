const mongoose = require('mongoose');

const { Schema } = mongoose;

const ProfileSchema = new Schema(
    {
        freelancerId: { type: Schema.Types.ObjectId, ref: 'freelancers' },
        projects: [{ type: Schema.Types.ObjectId, ref: 'projects' }],
        education: { type: Schema.Types.ObjectId, ref: 'educations' },
        isDeleted: { type: Boolean, default: false }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('profiles', ProfileSchema);