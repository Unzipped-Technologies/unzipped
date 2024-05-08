const keys = require('../../config/keys')
const stripe = require('stripe')(`${keys.stripeSecretKey}`)
const UserModel = require('../models/User')
const OrderModel = require('../models/Orders')
const PromoModel = require('../models/Promo')
const ProductModel = require('../models/Product')
const SubscriptionModel = require('../models/Subscription')
const PaymentHistoryModel = require('../models/PaymentHistory')
const InvoiceModel = require('../models/Invoice')
const PaymentMethodModel = require('../models/PaymentMethod')
const InvoiceRecordModel = require('../models/InvoiceRecord')
const Mailer = require('../../services/Mailer')
const receiptTemplate = require('../../services/emailTemplates/receipt')
const { paymentStatusEnum, paymentTypeEnum } = require('../enum/paymentEnum')
const ThirdPartyApplicationModel = require('../models/ThirdPartyApplications')
const { ObjectId } = require('mongoose').Types

const stripePayment = async (obj, user) => {
  let amount = obj.total * 100
  let id = obj.orderDetails.id
  let name = obj.orderDetails.billing_details.name
  let card = obj.orderDetails.card.last4
  let phone = obj.orderDetails.billing_details.phone
  let splitName = name.split(' ')
  let promoCount
  let orderNum = obj.order
  let { total, email, promo, time, date, transmission } = obj
  var month = new Array(12)
  month[0] = 'Jan.'
  month[1] = 'Feb.'
  month[2] = 'March'
  month[3] = 'April'
  month[4] = 'May'
  month[5] = 'June'
  month[6] = 'July'
  month[7] = 'Aug.'
  month[8] = 'Sept.'
  month[9] = 'Oct.'
  month[10] = 'Nov.'
  month[11] = 'Dec.'
  let orderDate = `${month[new Date().getMonth()]} ${new Date().getDate()} ${new Date().getFullYear()}`

  const existinguser = await UserModel.findById(user).select('-password')
  if (!existinguser.stripeId) {
    const customer = await stripe.customers.create({
      name: name,
      email: email
    })
    await UserModel.updateOne(
      { _id: user },
      { $set: { stripeId: customer.id, phone: phone, firstName: splitName[0], lastName: splitName[1] } }
    )
  }

  const existinguser2 = await UserModel.findById(user).select('-password')
  if (existinguser2.promo) {
    promoCount = existinguser2.promo
  } else {
    promoCount = 0
  }

  const paymentMethod = await stripe.paymentMethods.attach(id, { customer: existinguser2.stripeId })
  if (promo) {
    promoCount += 1
  }
  await UserModel.updateOne(
    { _id: user },
    {
      $set: {
        phone: phone,
        firstName: splitName[0],
        lastName: splitName[1],
        paymentMethod: { card: card, id: id },
        promo: promoCount
      }
    }
  )

  const payment = await stripe.paymentIntents.create({
    amount: amount,
    currency: 'USD',
    description: 'Unzipped payment',
    customer: existinguser2.stripeId,
    payment_method: id,
    confirm: true
  })
  await OrderModel.create({
    user: user,
    name: name,
    email: email,
    total: total,
    orderNumber: orderNum,
    refundId: payment.charges.data[0].id,
    phone: phone,
    time: time,
    transmission: transmission,
    date: date,
    orderDate: orderDate,
    promo: promo
  })
  const Orders = await OrderModel.find({ user: user })
  return Orders
}

const createPromo = async obj => {
  const { id, code, description, userType, discount } = obj
  const existingPromo = await PromoModel.findOne({ code })
  if (!existingPromo) {
    await PromoModel.create({ id, code, description, userType, discount })
    return 'success'
  } else {
    return 'promo already exists'
  }
}

const getPromo = async obj => {
  const { code, userType } = obj
  const existingPromo = await PromoModel.findOne({ code })
  console.log(existingPromo)
  if (existingPromo) {
    if (userType === existingPromo.userType) {
      return { ...existingPromo._doc }
    } else {
      if (existingPromo.userType == 'Customer') {
        return { ...existingPromo._doc }
      } else {
        return { error: 'promo not valid' }
      }
    }
  } else {
    return { error: 'promo not valid' }
  }
}

const receiptMail = async (obj, user) => {
  let today = new Date()
  let currentDate = `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`
  console.log(currentDate)
  let order = obj.order
  let date = obj.date
  let time = obj.time
  let price = obj.price
  let quantity = obj.quantity
  let total = obj.total
  const existinguser = await UserModel.findById(user).select('-password')
  console.log(existinguser)
  const msg = {
    id: existinguser._id,
    recipients: [{ email }],
    name: existinguser.email,
    currentDate: currentDate,
    quantity: quantity,
    order: order,
    date: date,
    time: time,
    price: price,
    total: total,
    // recipients: [{email: "noreplyvohnt@gmail.com"}],
    from: 'schedule@vohnt.com',
    subject: `Your Unzipped Order receipt from ${currentDate}`
  }
  const mailer = new Mailer(msg, receiptTemplate(msg))
  mailer.send()
  return 'success'
}

const createSubscription = async (req, obj, user) => {
  // calculate date for free trial end
  const trialEnd = new Date().setDate(new Date().getDate() + 7)

  // get users ip address
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || null
  const [existinguser, subscriptionType] = await Promise.all([
    UserModel.findByIdAndUpdate(user, { $set: { ...obj } }).select('-password'),
    ProductModel.findOne({ subscriptionType: obj.selectedPlan, paymentFrequency: obj.paymentFrequency })
  ])
  let customerId = existinguser.stripeId

  // if no customer Id then create customer
  if (!existinguser.stripeId) {
    const customer = await stripe.customers.create({
      name: obj.paymentMethod.card.billing_details.name,
      email: existinguser.email,
      payment_method: obj.paymentMethod.card.id
    })
    customerId = customer.id
    await UserModel.updateOne({ _id: user }, { $set: { stripeId: customer.id, isUserSubscribed: true } })
  }

  // create user subscription, and a payment history entry
  const [newSubscription] = await Promise.all([
    stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: subscriptionType?.stripePriceId }],
      trial_end: new Date(trialEnd),
      default_payment_method: obj.paymentMethod.card.id,
      metadata: {
        userId: user,
        stripeId: customerId,
        email: existinguser.email
      }
    }),
    SubscriptionModel.create({
      ...obj,
      userId: user,
      stripeId: customerId,
      plan: obj.selectedPlan,
      isBusiness: true,
      paymentMethod: {
        card: obj.paymentMethod.card.card.brand,
        stripeId: obj.paymentMethod.card.id,
        lastFour: obj.paymentMethod.card.card.last4
      }
    }),
    PaymentHistoryModel.create({
      userId: user,
      ipAddress: ip,
      paymentStatus: paymentStatusEnum.INITIATED,
      paymentType: paymentTypeEnum.SUBSCRIPTION_CHARGE,
      paymentAmount: subscriptionType.price
    })
  ])
  await Promise.all([
    UserModel.findByIdAndUpdate(user, {
      $set: {
        trialEndDate: new Date(trialEnd),
        phoneNumber: obj.BusinessAddressPhone,
        stripeSubscription: newSubscription.id
      }
    }),
    SubscriptionModel.findOneAndUpdate(
      { userId: user },
      {
        $set: {
          product: await ProductModel.findOne({
            subscriptionType: obj.selectedPlan,
            paymentFrequency: obj.paymentFrequency
          }),
          payments: await PaymentHistoryModel.find({ userId: user })
        }
      }
    )
  ])
  return 'success'
}

const subscriptionPayment = async (obj, user) => {
  const [current_user, UserSubscription] = await Promise.all([
    UserModel.findById(obj.userId),
    SubscriptionModel.findOne({ userId: obj.id })
      .populate({
        path: 'product',
        model: 'product'
      })
      .exec()
  ])
  await Promise.all([
    PaymentHistoryModel.create({
      userId: current_user.id,
      ipAddress: ip,
      paymentStatus: paymentStatusEnum.SUCCESSFUL,
      paymentType: paymentTypeEnum.SUBSCRIPTION_CHARGE,
      paymentAmount: UserSubscription.product.price
    })
  ])
  await SubscriptionModel.findOneAndUpdate(
    { userId: user },
    {
      $set: {
        payments: await PaymentHistoryModel.find({ userId: user })
      }
    }
  )
  return
}

async function handleSuccessfulPayment(paymentIntent) {
  const invoiceRecord = await InvoiceRecordModel.findOne({ _id: paymentIntent.metadata.invoiceRecord })

  await PaymentHistoryModel.updateMany(
    { _id: { $in: invoiceRecord.paymentHistoryIds } },
    { $set: { isPaymentSuccessful: true } }
  )
  const updatedPaymentHistories = await PaymentHistoryModel.find({ _id: { $in: invoiceRecord.paymentHistoryIds } })
    .populate({
      path: 'invoiceId',
      model: 'invoices',
      select: 'freelancerId'
    })
    .select('paymentAmount createdAt')
    .exec()

  const data = updatedPaymentHistories.map(async element => {
    return await UserModel.findByIdAndUpdate(
      element.invoiceId.freelancerId,
      { $inc: { totalBalance: element.paymentAmount } },
      { new: true }
    )
  })

  const threeDaysAgo = new Date()
  threeDaysAgo.setDate(threeDaysAgo.getDate() - 3)
  const threeDaysAgoISO = threeDaysAgo.toISOString()

  await Promise.all(
    updatedPaymentHistories.map(async element => {
      const elementDate = new Date(element.createdAt)
      if (elementDate > threeDaysAgo) {
        return await UserModel.findByIdAndUpdate(
          element.invoiceId.freelancerId,
          {
            $inc: { totalBalance: -element.paymentAmount, totalPending: element.paymentAmount }
          },
          { new: true }
        )
      }
    })
  )
}

async function handleFailedPayment(paymentIntent) {
  const invoiceRecord = await InvoiceRecordModel.findOne({ _id: paymentIntent.metadata.invoiceRecord })

  await PaymentHistoryModel.updateMany(
    { _id: { $in: invoiceRecord.paymentHistoryIds } },
    { $set: { isPaymentDeclined: true } }
  )
}

async function cronJob() {
  const Invoices = await InvoiceModel.aggregate([
    {
      $match: { isApproved: true, isPaid: false }
    },
    {
      $group: {
        _id: '$clientId',
        invoices: { $push: '$$ROOT' },
        totalAmount: { $sum: { $multiply: ['$hourlyRate', '$hoursWorked'] } }
      }
    },
    {
      $project: {
        _id: 1,
        totalAmount: 1,
        invoices: {
          $map: {
            input: '$invoices',
            as: 'invoice',
            in: {
              _id: '$$invoice._id',
              hoursWorked: '$$invoice.hoursWorked',
              hourlyRate: '$$invoice.hourlyRate'
            }
          }
        }
      }
    }
  ])

  const paymentHistories = []
  Invoices.forEach(entry => {
    const userId = entry._id
    entry.invoices.forEach(invoice => {
      const paymentHistory = {
        userId: userId,
        invoiceId: invoice._id,
        paymentStatus: paymentStatusEnum.INITIATED,
        paymentType: paymentTypeEnum.ACCOUNT_WITHDRAW,
        paymentAmount: invoice.hoursWorked * invoice.hourlyRate,
        paymentCurrency: 'USD'
      }
      paymentHistories.push(paymentHistory)
    })
  })

  const paymentHistory = paymentHistories.map(async ph => {
    const newPaymentHistory = new PaymentHistoryModel(ph)
    const savedHistory = await newPaymentHistory.save()
    return { _id: savedHistory._id, userId: savedHistory.userId }
  })
  const savedIds = await Promise.all(paymentHistory)

  const groupedByIds = savedIds.reduce((acc, { _id, userId }) => {
    if (acc[userId]) {
      acc[userId].push(_id)
    } else {
      acc[userId] = [_id]
    }
    return acc
  }, {})

  const invoiceRecordsData = Object.keys(groupedByIds).map(userId => ({
    userId,
    paymentHistoryIds: groupedByIds[userId]
  }))

  const invoiceRecords = await Promise.all(
    invoiceRecordsData.map(async record => {
      const newInvoiceRecord = new InvoiceRecordModel(record)
      const savedRecord = await newInvoiceRecord.save()
      return savedRecord._id
    })
  )

  const PaymentMethods = await Promise.all(
    Invoices.map(async entry => {
      if (!entry || !entry._id || !ObjectId.isValid(entry._id)) {
        return
      }

      const paymentMethod = await PaymentMethodModel.findOne({ userId: ObjectId(entry._id) })
      const records = await InvoiceRecordModel.findOne({
        _id: { $in: invoiceRecords },
        userId: entry?._id
      })
      if (!paymentMethod || !records) {
        return
      }

      return {
        userId: paymentMethod.userId,
        customerId: paymentMethod.paymentMethod?.customer,
        paymentMethod: paymentMethod.paymentMethod?.payment_method,
        totalAmount: entry.totalAmount,
        invoiceRecord: records._id
      }
    })
  )

  const transactionPromises = PaymentMethods.map(paymentMethod => {
    if (paymentMethod?.totalAmount) {
      const amountInCents = paymentMethod.totalAmount * 100
      return stripe.paymentIntents.create({
        amount: amountInCents,
        currency: 'usd',
        payment_method: paymentMethod.paymentMethod,
        customer: paymentMethod.customerId,
        metadata: { invoiceRecord: paymentMethod?.invoiceRecord?.toString() },
        confirm: true
      })
    } else {
      return Promise.resolve(null)
    }
  })

  Promise.allSettled(transactionPromises).then(results => {
    results.forEach((result, index) => {
      if (result.status === 'rejected') {
        console.error(`Transaction ${index + 1} failed:`, result.reason)
      }
    })
  })
}

const handleWebhookEvent = event => {
  switch (event.type) {
    case 'customer.created':
      const customerCreated = event.data.object
      console.log('Customer created:', customerCreated)
      break

    case 'setup_intent.succeeded':
      const setupIntentSucceeded = event.data.object
      console.log('SetupIntent succeeded:', setupIntentSucceeded)
      break

    case 'payment_intent.succeeded':
      const paymentIntentSucceeded = event.data.object
      handleSuccessfulPayment(paymentIntentSucceeded)
      console.log('PaymentIntent succeeded:', paymentIntentSucceeded)
      break

    case 'payment_intent.failed':
      const paymentIntentFailed = event.data.object
      handleFailedPayment(paymentIntentFailed)
      console.log('PaymentIntent failed:', paymentIntentFailed)
      break

    case 'payment_intent.canceled':
      const paymentIntentCanceled = event.data.object
      console.log('PaymentIntent canceled:', paymentIntentCanceled)
      break

    case 'issuing_card.created':
      const issuingCardCreated = event.data.object
      console.log('Issuing Card created:', issuingCardCreated)
      break

    default:
      console.log(`Unhandled event type ${event.type}`)
  }
}

const linkExternalBankAccount = async (customerId, bankAccountToken) => {
  return await stripe.customers.createSource(customerId, {
    source: bankAccountToken
  })
}

const removeExternalBankAccount = async (customerId, bankAccountId) => {
  return await stripe.customers.deleteSource(customerId, bankAccountId)
}

const getUserAccountById = async userId => {
  const user = await UserModel.findById(userId)

  if (user && user.stripeAccountId) {
    return await retreiveAccountInfo(user.stripeAccountId)
  }
  throw new Error(`Account not exist.`)
}

const getUserByAccountId = async accountId => {
  return await UserModel.findOne({ stripeAccountId: accountId })
}

const createAccountOnboarding = async (type, userId) => {
  // Create a new Stripe Connected Account for the user
  const account = await stripe.accounts.create({
    type: 'express',
    country: 'US',
    business_type: type
  })

  if (account) {
    // associate the accoutn with the user
    await UserModel.updateOne({ _id: userId }, { $set: { stripeAccountId: account.id } })

    // Create or update the document in the third-party application collection
    // Ensure userId and stripeAccountId are correctly mapped to your third-party model schema
    await ThirdPartyApplicationModel.updateOne(
      { userId },
      { $set: { userId, stripeAccountId: account.id } },
      { upsert: true }
    )
  }

  return account
}

const retreiveAccountInfo = async id => {
  // Create a new Stripe Connected Account for the user
  const account = await stripe.accounts.retrieve(id)
  return account
}

const getAccountOnboardingLink = async (account, url) => {
  const redirect = url || '/kyc'
  // Create an account link for the onboarding process
  const accountLink = await stripe.accountLinks.create({
    account: account.id,
    refresh_url: `${keys.redirectDomain}${redirect}`, // Your URL for re-onboarding
    return_url: `${keys.redirectDomain}${redirect}`, // Your URL for successful onboarding
    type: 'account_onboarding'
  })

  return accountLink
}

const retrieveExternalBankAccounts = async userStripeAccountId => {
  // List all bank accounts associated with the Stripe account
  const bankAccounts = await stripe.accounts.listExternalAccounts(userStripeAccountId, { object: 'bank_account' })

  return bankAccounts
}

// charge client
async function createPaymentAndTransfer(clientPaymentMethodId, amountToCharge) {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountToCharge,
      currency: 'usd',
      customer: customerId,
      payment_method: paymentMethodId,
      off_session: true, // Assuming the customer is not present
      confirm: true // Automatically confirm the payment intent
      // Add any other necessary parameters here
    })

    // step 3: create a payment history in the db

    // payment history for client
    await PaymentHistoryModel.create({
      chargeId: id,
      userId: current_user.id,
      ipAddress: ip,
      paymentStatus: paymentStatusEnum.SUCCESSFUL,
      paymentType: paymentTypeEnum.PAYROLL_CHARGE,
      paymentAmount: UserSubscription.product.price,

      invoiceId: invoice.id, // get invoices
      description: `Payment to ${freelanceUser.firstName} ${freelanceUser.lastName}`,
      cardLastFour: String,
      card: String,
      payPeriod: String,
      subtotal: String,
      paymentAmount: Number
    })

    // get user by freelancer id
    const freelanceUser = {}

    // payment history for freelancer
    await PaymentHistoryModel.create({
      chargeId: id,
      userId: freelanceUser.id,
      ipAddress: ip,
      paymentStatus: paymentStatusEnum.SUCCESSFUL,
      paymentType: paymentTypeEnum.PAYROLL_RECIEPT,
      paymentAmount: UserSubscription.product.price,

      invoiceId: invoice.id, // get invoices
      description: `Payment to ${freelanceUser.firstName} ${freelanceUser.lastName}`,
      cardLastFour: String,
      card: String,
      payPeriod: String,
      subtotal: String,
      paymentAmount: Number
    })
    console.log('Charge created:', charge.id)
    console.log('payment history created:', payment)
    console.log('Transfer created:', transfer.id)

    return { charge }
  } catch (error) {
    console.error('Error creating payment and transfer:', error)
    throw error // Rethrow or handle as appropriate for your application
  }
}

const transferPaymentToFreelancers = async data => {
  const { amount_captured, id } = data.data.object
  const amountToFreelancer = amount_captured * 0.9
  // step 1: retrieve invoices that are being paid and figure which freelancers are to be paid
  // const Invoices = await InvoiceModel.aggregate([
  //   {
  //     $match: { isApproved: true, isPaid: false }
  //   },
  //   {
  //     $group: {
  //       _id: '$clientId',
  //       invoices: { $push: '$$ROOT' },
  //       totalAmount: { $sum: { $multiply: ['$hourlyRate', '$hoursWorked'] } }
  //     }
  //   },
  //   {
  //     $project: {
  //       _id: 1,
  //       totalAmount: 1,
  //       invoices: {
  //         $map: {
  //           input: '$invoices',
  //           as: 'invoice',
  //           in: {
  //             _id: '$$invoice._id',
  //             hoursWorked: '$$invoice.hoursWorked',
  //             hourlyRate: '$$invoice.hourlyRate'
  //           }
  //         }
  //       }
  //     }
  //   }
  // ])
  // you will need to retrieve this info from the transaction history created for this event
  const accountId = 'acct_1OtzJDQmnBKiGech'
  // step 2: get charge from db
  // const charge = await PaymentHistoryModel.findOne({chargeId: id})
  // Step 2: Transfer a portion to the freelancer
  const transfer = await stripe.transfers.create({
    amount: 2000, // Amount to transfer to freelancer in cents
    currency: 'usd',
    destination: accountId, // Freelancer's Stripe account ID
    transfer_group: data.id // Group the transfer with the charge for easy reconciliation
  })

  return transfer
}

const getFreelancerBalance = async stripeAccountId => {
  try {
    const balance = await stripe.balance.retrieve({
      stripeAccount: stripeAccountId // The ID of the connected Stripe account
    })

    // The balance object contains amounts in different categories
    // For example, balance.available and balance.pending
    console.log(balance)

    return balance
  } catch (error) {
    console.error('Error retrieving balance:', error)
    throw error
  }
}

const createTestCharge = async () => {
  try {
    const charge = await stripe.charges.create({
      amount: 20000000,
      currency: 'usd',
      source: 'tok_visa',
      description: 'Test charge for $200000.00'
    })

    console.log('Charge successful:', charge)
    return charge
  } catch (error) {
    console.error('Charge failed:', error)
    throw error
  }
}

const retrieveStripeBalance = async () => {
  try {
    const balance = await stripe.balance.retrieve()
    console.log(balance) // Logs the entire balance object to the console
    return balance
  } catch (error) {
    console.error('Error retrieving Stripe balance:', error)
  }
}

const withdrawFundsToBankAccount = async (account, amount, currency = 'usd', userId) => {
  try {
    // Create a payout to the connected account's external bank account
    const payout = await stripe.payouts.create(
      {
        amount: amount,
        currency: currency
      },
      {
        stripeAccount: accountId // Specify the connected account ID
      }
    )

    console.log('Payout successful:', payout)
    return payout
  } catch (error) {
    console.error('Payout failed:', error)
    throw error
  }
}

const listTransactions = async (accountId = null, lastObjectId = null, limit = 25) => {
  try {
    const params = {
      limit: limit
    }

    if (lastObjectId) {
      params.starting_after = lastObjectId
    }

    // If retrieving transactions for a connected account, use the `stripeAccount` option
    const options = accountId ? { stripeAccount: accountId } : {}

    const transactions = await stripe.balanceTransactions.list(params, options)

    return transactions
  } catch (error) {
    console.error('Error retrieving transactions:', error)
    throw error
  }
}

// verfify identity session
const createVerificationSession = async customerId => {
  const verificationSession = await stripe.identity.verificationSessions.create({
    type: 'document',
    metadata: {
      customer: customerId
    },
    options: {
      document: {
        require_matching_selfie: true
      }
    }
  })

  return verificationSession
}

const confirmVerificationSession = async (userId, status) => {
  try {
    if (userId && status && status === 'verified') {
      const user = await UserModel.findById(userId)
      if (user && user.isIdentityVerified !== 'SUCCESS') {
        const updateUser = await UserModel.updateOne(
          { _id: userId },
          { $set: { isIdentityVerified: 'SUCCESS' } },
          { new: true }
        )
        if (updateUser) {
          return true
        } else {
          const updateUser = await UserModel.updateOne(
            { _id: userId },
            { $set: { isIdentityVerified: 'REJECTED' } },
            { new: true }
          )
        }
      }
      return false
    }
  } catch (err) {
    console.log(`Error on verification session: ${err.message}`)
    return false
  }
}

module.exports = {
  stripePayment,
  createPromo,
  getPromo,
  listTransactions,
  receiptMail,
  withdrawFundsToBankAccount,
  createTestCharge,
  getFreelancerBalance,
  createSubscription,
  subscriptionPayment,
  cronJob,
  retrieveStripeBalance,
  getUserAccountById,
  getUserByAccountId,
  retrieveExternalBankAccounts,
  retreiveAccountInfo,
  handleWebhookEvent,
  linkExternalBankAccount,
  removeExternalBankAccount,
  getAccountOnboardingLink,
  createAccountOnboarding,
  transferPaymentToFreelancers,
  createVerificationSession,
  createPaymentAndTransfer,
  confirmVerificationSession
}
