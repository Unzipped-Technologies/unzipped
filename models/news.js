const mongoose = require('mongoose');
const { string } = require('prop-types');
const { Schema } = mongoose;

const newsSchema = new Schema({
  title: String,
  link: String,
  creator: [String],
  description: String,
  content: String,
  pubDate: String,
  image_url: String,
  source_id: String,
}, {
  timestamps: true
});

module.exports = mongoose.model('news', newsSchema);
