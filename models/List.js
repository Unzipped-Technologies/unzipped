const mongoose = require('mongoose');
const { Schema } = mongoose;

const listSchema = new Schema({
  name: String,
  icon: { type: String, default: '' }, // TODO update to be the default icon
  userId: String,
  isActive: { type: Boolean, default: true },
  user: { type: Schema.Types.ObjectId, ref: 'users' },
  freelancer: { type: Schema.Types.ObjectId, ref: 'freelancers' },
  listItems: { type: Schema.Types.Mixed, refs: 'listItems' },
  listEntries: [
    {
      type: Schema.Types.ObjectId,
      ref: 'listEntries'
    }
  ],
  isDefault: {
    type: Boolean
  },
  isPrivate: { type: Boolean }
}, {
  timestamps: true
});

module.exports = mongoose.model('lists', listSchema);
