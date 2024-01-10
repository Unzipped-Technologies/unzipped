/** @format */
const keys = require('../../config/keys')
const jwt = require('jsonwebtoken')

module.exports = async (req, res, next) => {
  const token = req.header('access_token')
  if (!token) return res.status(401).json({ msg: 'Please log in to continue' })
  try {
    //verify token
    const decoded = jwt.verify(token, keys.cookieKey)
    req.user = decoded
    next()
  } catch (e) {
    console.error('error', e)
    res.status(400).json({ msg: 'Please log in to continue' })
  }
}
