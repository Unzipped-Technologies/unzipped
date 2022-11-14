/** @format */
const keys = require('../../config/keys');
const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  // console.log(req.header)
  const token = req.header('access_token')
  
  if (!token) return res.status(401).json({msg: 'Please log in to continue'});
  try {
    //verify token
    const decoded = jwt.verify(token, keys.cookieKey);
    // console.log(decoded)
    //Add user from payload
    req.user = decoded
    next();
  } catch(e) {
    res.status(400).json({msg: 'Please log in to continue'})
  }
}