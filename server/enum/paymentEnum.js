const paymentTypeEnum = Object.freeze({
    SUBSCRIPTION: 0,
    PAYROLL: 1,
    INTERNAL: 2,
  })

const paymentStatusEnum = Object.freeze({
  INITIATED: 0,
  SUCCESSFUL: 1,
  DECLINED: 2
})
  
  module.exports = {
    paymentTypeEnum,
    paymentStatusEnum
  }
  