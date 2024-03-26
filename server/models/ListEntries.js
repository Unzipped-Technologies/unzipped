const mongoose = require('mongoose');
const { Schema } = mongoose;
const { softDeletePlugin } = require('soft-delete-plugin-mongoose');

const listEntriesSchema = new Schema({
    name: String,
    icon: String,

    userId: {
        ref: 'users',
        type: mongoose.Schema.Types.ObjectId,
    },

    freelancerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'freelancers',
    },

    listId: {
        type: Schema.Types.ObjectId,
        ref: 'lists'
    },

    isPrivate: {
        type: Boolean,
        default: false,
    },

    isDefaultList: {
        type: Boolean,
        default: false,
    }

}, {
    timestamps: true
});

listEntriesSchema.plugin(softDeletePlugin);
module.exports = mongoose.model('listEntries', listEntriesSchema);
