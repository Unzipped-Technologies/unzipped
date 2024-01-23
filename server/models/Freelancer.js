const mongoose = require('mongoose')
const { softDeletePlugin } = require('soft-delete-plugin-mongoose')

const { Schema } = mongoose

const freelancerSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'users' },
    rate: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    isArchived: { type: Boolean, default: false },
    isPreferedFreelancer: { type: Boolean, default: false },
    isAcceptEquity: { type: Boolean, default: false },
    category: { type: String, default: '' },
    freelancerSkills: [{ type: Schema.Types.ObjectId, refs: 'freelancerskills' }],
    lists: { type: Schema.Types.ObjectId, ref: 'lists' },
    invites: { type: Schema.Types.Mixed, ref: 'invites' },
    cover: String,
    likeTotal: { type: Number, default: 0 },
    dislikeTotal: { type: Number, default: 0 },
    likes: { type: Schema.Types.Mixed, ref: 'likeHistory' },
    dislikes: { type: Schema.Types.Mixed, ref: 'likeHistory' }
  },
  {
    timestamps: true
  }
)
freelancerSchema.plugin(softDeletePlugin)

module.exports = mongoose.model('freelancers', freelancerSchema)
