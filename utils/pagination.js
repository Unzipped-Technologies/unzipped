const mongoose = require('mongoose')

const currentPage = options => {
  return options.page && parseInt(options.page, 10) > 0 ? parseInt(options.page, 10) : 1
}

const pageLimit = options => {
  return options.limit && parseInt(options.limit, 10) > 0 ? parseInt(options.limit, 10) : 10
}
const pick = (object, keys) => {
  return keys.reduce((obj, key) => {
    if (
      object &&
      object[key] !== '' &&
      object[key] !== undefined &&
      object[key] !== null &&
      Object.prototype.hasOwnProperty.call(object, key)
    ) {
      if (mongoose.Types.ObjectId.isValid(object[key])) {
        obj[key] = mongoose.Types.ObjectId(object[key])
      } else {
        obj[key] = object[key]
      }
    }
    return obj
  }, {})
}

module.exports = {
  currentPage,
  pageLimit,
  pick
}
