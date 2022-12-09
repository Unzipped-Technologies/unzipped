const jwt = require('jsonwebtoken')
const keys = require('../config/keys');

module.exports = {
  signToken: (userID) => {
    return jwt.sign(
      {
        iss: 'Unzipped',
        sub: userID,
      },
      keys.cookieKey,
      { expiresIn: 30 * 24 * 60 * 60 * 1000 }
    )
  }
}

