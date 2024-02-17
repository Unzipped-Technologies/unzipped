const Contracts = require('../../models/Contract')
const Business = require('../../models/Business')
const ThirdPartyApplications = require('../../models/ThirdPartyApplications')
const PaymentMethod = require('../../models/PaymentMethod')
const mongoose = require('mongoose')
const keys = require('../../config/keys')
const Department = require('../../models/Department')
const stripe = require('stripe')(`${keys.stripeSecretKey}`)
const { currentPage, pageLimit, pick } = require('../../utils/pagination')
const { accountTypeEnum } = require('../enum/accountTypeEnum')
const createContracts = async data => {
  const { businessId, freelancerId, userId } = data
  try {
    const existingPaymentMethod = await PaymentMethod.findOne({
      userId: userId
    })
    if (!existingPaymentMethod) {
      throw new Error('No payment method exists against user.')
    }
    const existingContract = await Contracts.findOne({
      businessId: businessId,
      freelancerId: freelancerId
    })

    if (existingContract) {
      throw new Error('Freelancer is already hired for this business.')
    }
    const newContract = new Contracts(data)
    const savedContract = await newContract.save()
    return savedContract
  } catch (e) {
    throw Error(`Something went wrong: ${e.message}`)
  }
}

const createStripeCustomer = async data => {
  const customer = await stripe.customers.create({
    email: data?.email || ''
  })
  const setupIntent = await stripe.setupIntents.create({
    customer: customer.id,
    payment_method_types: ['card'],
    usage: 'off_session',
    metadata: {
      customer: customer.id || '',
      businessId: data?.businessId || '',
      userId: data?.userId || '',
      githubId: data?.githubId || '',
      stripeId: customer.id || '',
      googleId: data?.googleId || '',
      calendlyId: data?.calendlyId || ''
    }
  })
  return setupIntent
}

const createPaymentMethod = async data => {
  let businessId = data?.businessId
  let userId = data?.userId
  const paymentMethod = data?.paymentMethod || ''
  if (businessId === '') {
    businessId = null
  }
  if (userId === '') {
    userId = null
  }

  try {
    const newThirdPartyApplication = new ThirdPartyApplications(data)
    const savedThirdPartyApplication = await newThirdPartyApplication.save()
    const newPaymentMethodData = { paymentMethod }
    if (businessId !== null) {
      newPaymentMethodData.businessId = businessId
    }
    if (userId !== null) {
      newPaymentMethodData.userId = userId
    }
    if (data?.lastFour) {
      newPaymentMethodData.lastFour = data.lastFour
    }
    if (data?.card) {
      newPaymentMethodData.card = data.card
    }
    if (data?.paymentType) {
      newPaymentMethodData.paymentType = data.paymentType
    }
    if (data?.isPrimary) {
      newPaymentMethodData.isRequired = data.isPrimary
    }
    const newPaymentMethod = new PaymentMethod(newPaymentMethodData)
    const savedPaymentMethod = await newPaymentMethod.save()
    return { savedThirdPartyApplication, savedPaymentMethod }
  } catch (e) {
    throw Error(`Something went wrong: ${e}`)
  }
}

const deletePaymentMethod = async (id) => {
  return await PaymentMethod.findByIdAndDelete(id);
}

const countContracts = async filter => {
  try {
    return await Contracts.countDocuments(filter)
  } catch (e) {}
}

const getContracts = async (query, user) => {
  try {
    if (user?.role === accountTypeEnum.FOUNDER || user?.role === accountTypeEnum.ADMIN) {
      query['userId'] = user.id
    } else if (user?.role === accountTypeEnum.INVESTOR) {
      query['freelancerId'] = user.freelancers
    }
    console.log(query)
    const filter = pick(query, ['businessId', 'departmentId', 'freelancerId', 'userId'])
    console.log('/////filter', filter)
    const options = pick(query, ['limit', 'page', 'count'])
    const total = await countContracts(filter)
    const limit = options.limit === 'all' ? total : pageLimit(options)

    const page = currentPage(options)
    const skip = (page - 1) * limit

    const applications = await Contracts.find(filter)
      .populate([
        {
          path: 'freelancerId',
          model: 'freelancers',
          select: 'userId user freelancerSkills rate category',
          populate: [
            {
              path: 'userId',
              model: 'users',
              select: 'FirstName LastName FullName'
            }
          ]
        },
        {
          path: 'departmentId',
          select: 'name'
        }
      ])
      .skip(skip)
      .limit(limit)

    const totalPages = Math.ceil(total / limit)
    const result = {
      data: applications,
      currentPage: page,
      limit,
      totalPages,
      totalResults: total
    }
    return result
  } catch (e) {
    throw new Error(`Could not retrieve contracts, error: ${e.message}`)
  }
}

const getContractById = async id => {
  try {
    return await Contracts.findById(id)
      .populate({
        path: 'businessId',
        model: 'businesses'
      })
      .populate({
        path: 'freelancerId',
        model: 'freelancers'
      })
      .populate({
        path: 'departmentId',
        model: 'departments'
      })
      .populate({
        path: 'userId',
        model: 'users'
      })
      .exec()
  } catch (e) {
    throw Error(`Could not find contract, error: ${e}`)
  }
}

const getContractByfreelacerId = async id => {
  try {
    return await Contracts.findOne({ freelancerId: id })
      .populate({
        path: 'businessId',
        model: 'businesses'
      })
      .populate({
        path: 'freelancerId',
        model: 'freelancers'
      })
      .populate({
        path: 'departmentId',
        model: 'departments'
      })
      .populate({
        path: 'userId',
        model: 'users'
      })
      .exec()
  } catch (e) {
    throw Error(`Could not find contract, error: ${e}`)
  }
}

const updateContract = async data => {
  try {
    const updatedContract = await Contracts.findByIdAndUpdate(data.contractId, { $set: { ...data } }, { new: true })
    return updatedContract
  } catch (e) {
    throw Error(`Could not update contract, error: ${e}`)
  }
}

const updateContractByFreelancer = async ({ _id, freelancerId, newIsOfferAcceptedValue }) => {
  try {
    const updatedContract = await Contracts.findOneAndUpdate(
      { _id, freelancerId },
      { $set: { isOfferAccepted: newIsOfferAcceptedValue } },
      { new: true }
    )
    const { departmentId, businessId } = updatedContract
    await Business.findOneAndUpdate(
      { _id: businessId },
      { $addToSet: { employees: updatedContract?._id } },
      { new: true }
    )

    await Department.findOneAndUpdate(
      { _id: departmentId },
      { $addToSet: { employees: updatedContract?._id } },
      { new: true }
    )

    if (!updatedContract) {
      throw Error('Contract not found')
    }
    return { updatedContract }
  } catch (e) {
    throw Error(`Could not update contract, error: ${e}`)
  }
}

const endContract = async id => {
  try {
    const updatedContract = await Contracts.findByIdAndUpdate(id, { $set: { isActive: false } }, { new: true })
    if (!updatedContract) {
      throw Error('Contract not found')
    }
    return updatedContract
  } catch (error) {
    throw Error(`Could not end contract, error: ${e}`)
  }
}

const deleteContract = async id => {
  try {
    await Contracts.findByIdAndDelete(id)
  } catch (e) {
    throw Error(`Could not delete contract, error: ${e}`)
  }
}

module.exports = {
  getContracts,
  createContracts,
  getContractById,
  updateContract,
  deleteContract,
  deletePaymentMethod,
  getContractByfreelacerId,
  updateContractByFreelancer,
  createStripeCustomer,
  createPaymentMethod,
  endContract
}
