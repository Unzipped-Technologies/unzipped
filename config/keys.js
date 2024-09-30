// keys.js - figure out what set of credentials to return
console.log('process.env.NEXT_PUBLIC_ENV', process.env.NEXT_PUBLIC_ENV)
console.log('process.env.NEXT_PUBLIC_ENV', process.env.NODE_ENV)
if (process.env.NODE_ENV === 'production') {
  // we are in production - return the prod set of keys
  module.exports = require('./prod');
} else {
  // we are in development - return the dev keys!!!
  module.exports = require('./dev');
}
