const mongoose = require('mongoose');
const { Schema } = mongoose;

const fileSchema = new Schema({
  name: String,
  url: String,
  userId: String,
  messageId: String,
  size: Number,
  cloudinaryId: String,
});

module.exports = mongoose.model('file', fileSchema);
