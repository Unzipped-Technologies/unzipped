const jwt = require('jsonwebtoken')
const keys = require('../config/keys');

module.exports = {
  signToken: (userID) => {
    return jwt.sign(
      {
        iss: 'Vohnt',
        sub: userID,
      },
      keys.cookieKey,
      { expiresIn: 1 }
    )
  }
}

