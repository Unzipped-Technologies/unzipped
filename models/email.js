const mongoose = require('mongoose');
const { Schema } = mongoose;

const emailSchema = new Schema({
  email: String,
  firstName: String,
  lastName: String
});

module.exports = mongoose.model('email', emailSchema);
