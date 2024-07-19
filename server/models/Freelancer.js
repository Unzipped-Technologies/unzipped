const mongoose = require('mongoose')
const { softDeletePlugin } = require('soft-delete-plugin-mongoose')

const { Schema } = mongoose

const educationSchema = new Schema(
  {
    title: { type: String, required: true },
    institute: { type: String, required: true },
    startYear: { type: String, required: true },
    endYear: { type: String, required: true }
  },
  {
    timestamps: true
  }
)

const projectsSchema = new Schema(
  {
    role: { type: String, required: true },
    projectName: { type: String, required: true },
    images: { type: [Schema.Types.ObjectId], ref: 'file', default: [] },
    skills: { type: [String], default: [], required: true },
    isActive: { type: Boolean, default: true }
  },
  {
    timestamps: true
  }
)

const freelancerSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'users' },
    rate: { type: Number, default: 0, required: true },
    isActive: { type: Boolean, default: true },
    isArchived: { type: Boolean, default: false },
    isPreferedFreelancer: { type: Boolean, default: false },
    isAcceptEquity: { type: Boolean, default: false },
    category: { type: String, default: '' },
    freelancerSkills: { type: [Schema.Types.ObjectId], ref: 'freelancerskills' },
    lists: { type: Schema.Types.ObjectId, ref: 'lists' },
    invites: { type: Schema.Types.ObjectId, ref: 'invites' },
    cover: { type: String, default: null },
    likeTotal: { type: Number, default: 0 },
    dislikeTotal: { type: Number, default: 0 },
    likes: { type: Schema.Types.Mixed, ref: 'likeHistory' },
    dislikes: { type: Schema.Types.Mixed, ref: 'likeHistory' },
    education: { type: [educationSchema], default: [] },
    projects: { type: [projectsSchema], default: [] }
  },
  {
    timestamps: true
  }
)
freelancerSchema.plugin(softDeletePlugin)

module.exports = mongoose.model('freelancers', freelancerSchema)
