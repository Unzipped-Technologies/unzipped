const cloudinary = require("cloudinary").v2;
const keys = require('../config/keys');

cloudinary.config({
  cloud_name: keys.CloudName,
  api_key: keys.CloudinaryAPIKey,
  api_secret: keys.CloudinarySecretKey,
});

module.exports = cloudinary;