const accountTypeEnum = Object.freeze({
    FOUNDER: 0,
    INVESTOR: 1,
    ADMIN: 2
  })

const accountVerificationEnum = Object.freeze({
  INCOMPLETE: 'INCOMPLETE',
  SUCCESS: 'SUCCESS',
  REJECTED: 'REJECTED'
})
  
  module.exports = {
    accountTypeEnum,
    accountVerificationEnum
  }
  