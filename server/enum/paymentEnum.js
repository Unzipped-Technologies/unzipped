const paymentTypeEnum = Object.freeze({
    SUBSCRIPTION: 0,
    PAYROLL: 1,
    INTERNAL: 2,
    FREELANCER_PAYMENT: 3,
})

const paymentStatusEnum = Object.freeze({
  INITIATED: 0,
  SUCCESSFUL: 1,
  DECLINED: 2
})

const stripeBrandsEnum = Object.freeze({
  AMERICAN_EXPRESS: 'amex',
  CARTES_BANCAIRES: 'cartes_bancaires',
  DINERS: 'diners',
  DISCOVER: 'discover',
  JCB: 'jcb',
  MASTERCARD: 'mastercard',
  VISA: 'visa',
  UNION: 'unionpay'
})
  

const stripeLogoEnum = Object.freeze({
  AMERICAN_EXPRESS: 'https://res.cloudinary.com/dghsmwkfq/image/upload/v1707941601/amex_vfksq0.jpg',
  CARTES_BANCAIRES: 'https://res.cloudinary.com/dghsmwkfq/image/upload/v1707941600/cartes_etzz4i.png',
  DINERS: 'https://res.cloudinary.com/dghsmwkfq/image/upload/v1707941600/diners_s3gusk.png',
  DISCOVER: 'https://res.cloudinary.com/dghsmwkfq/image/upload/v1707941600/discover_keq0jq.jpg',
  JCB: 'https://res.cloudinary.com/dghsmwkfq/image/upload/v1707941600/jcb_lgrhge.jpg',
  MASTERCARD: 'https://res.cloudinary.com/dghsmwkfq/image/upload/v1707941600/mastercard_wtakhw.png',
  VISA: 'https://res.cloudinary.com/dghsmwkfq/image/upload/v1707941600/visa_s1tpjo.png',
  UNION: 'https://res.cloudinary.com/dghsmwkfq/image/upload/v1707941600/union_tqebyg.png'
})
  
module.exports = {
    paymentTypeEnum,
    paymentStatusEnum,
    stripeBrandsEnum,
    stripeLogoEnum
}
  