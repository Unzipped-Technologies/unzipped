const planEnum = Object.freeze({
    UNSUBSCRIBED: 0,
    BASIC: 1,
    STANDARD: 2,
    ADVANCED: 3
  })

const paymentFrequencyEnum = Object.freeze({
  MONTHLY: 0,
  YEARLY: 1,
  BIYEARLY: 2,
  TRIYEARLY: 3
})
  
  module.exports = {
    planEnum,
    paymentFrequencyEnum
  }
  