const Contracts = require('../models/Contract')
const Business = require('../models/Business')
const Department = require('../models/Department')
const PaymentMethod = require('../models/PaymentMethod')
const ListModel = require('../models/List')
const ListEntriesModel = require('../models/ListEntries')
const UserModel = require('../models/User');
const FreelancerModel = require('../models/Freelancer');
const TaskModel = require('../models/Task');
const TagModel = require('../models/tags');

const ThirdPartyApplications = require('../models/ThirdPartyApplications')
const mongoose = require('mongoose')
const keys = require('../../config/keys')
const stripe = require('stripe')(`${keys.stripeSecretKey}`)
const { currentPage, pageLimit, pick } = require('../../utils/pagination')
const { accountTypeEnum } = require('../enum/accountTypeEnum')
const Mailer = require('../../services/Mailer')

const createContracts = async data => {
  const { businessId, freelancerId, departmentId, userId } = data
  try {
    const { getBusinessWithoutPopulate } = require('./business')
    const { getDepartmentWithoutPopulate } = require('./department')
    // Check whether the business against businessId exist OR not
    const businessData = await getBusinessWithoutPopulate(businessId, '')
    if (!businessData) throw new Error(`Business not exist.`)

    let departmentData = null
    // Check whether the department against departmentId exist OR not
    if (departmentId) {
      departmentData = await getDepartmentWithoutPopulate({ _id: departmentId }, '')
      if (!departmentData) throw new Error(`Department not exist.`)
    } else {
      departmentData = await getDepartmentWithoutPopulate({
        businessId: businessId,
        name: 'Management',
        clientId: userId
      })
      if (!departmentData) throw new Error(`Department not exist.`)
      data['departmentId'] = departmentData?._id
    }

    if (!businessData.departments?.includes(departmentData?._id))
      throw new Error(`Department not exist in this business.`)

    const existingPaymentMethod = await PaymentMethod.findOne({
      userId: userId
    })
    if (!existingPaymentMethod) {
      throw new Error('No payment method exists against user.')
    }
    const existingContract = await Contracts.findOne({
      businessId: businessId,
      departmentId: departmentData?._id,
      freelancerId: freelancerId
    })

    if (existingContract) {
      throw new Error('Freelancer is already hired for this business.')
    }
    const newContract = new Contracts(data)
    const savedContract = await newContract.save()
    if (departmentData?.employees?.length) {
      departmentData.employees.push(newContract?._id)
    } else {
      departmentData.employees = [newContract?._id]
    }
    if (businessData?.employees?.length) {
      businessData.employees.push(newContract?._id)
    } else {
      businessData.employees = [newContract?._id]
    }
    await departmentData.save()
    await businessData.save()

    const NewListEntry = {
      name: 'My Team',
      userId: data?.userId,
      user: data?.userId,
      freelancerId: data?.freelancerId,
      businessId: data?.businessId,
      listId: null,
      isPrivate: false,
      isDefaultList: false
    }
    const userList = await ListModel.findOne({ user: data?.userId, name: 'My Team' })
    if (userList) {
      NewListEntry.listId = userList?._id
      const ListEntry = await ListEntriesModel.create({
        ...NewListEntry
      })
      if (userList?.listEntries?.length) {
        userList.listEntries = [...userList.listEntries, ListEntry?._id]
      } else {
        userList['listEntries'] = [ListEntry?._id]
      }
      await userList.save()
    } else {
      const newList = await ListModel.create({
        userId: data?.userId,
        user: data?.userId,
        name: 'My Team',
        isActive: true,
        freelancer: data?.freelancerId,
        listEntries: [],
        isDefault: false,
        isPrivate: false
      })
      NewListEntry.listId = newList?._id
      const ListEntry = await ListEntriesModel.create({
        ...NewListEntry
      })
      newList.listEntries = [ListEntry?._id]
      await newList.save()
    }
    await handleHiringMailNotification(data, newContract?._id)
    return savedContract
  } catch (e) {
    throw Error(`${e?.message ?? 'Something went wrong'}`)
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

const deletePaymentMethod = async id => {
  return await PaymentMethod.findByIdAndDelete(id)
}

const countContracts = async filter => {
  try {
    return await Contracts.countDocuments(filter)
  } catch (e) {}
}

const countUserContracts = async userId => {
  try {
    const aggregation = [
      {
        $match: {
          // Filter based on userId
          userId: mongoose.Types.ObjectId(userId)
        }
      },
      {
        $group: {
          _id: '$businessId', // Group by businessId
          userId: { $first: '$userId' } // Take the userId of the first document in each group
        }
      },
      {
        $group: {
          _id: null,
          totalCount: { $sum: 1 } // Count the unique businessIds
        }
      },
      {
        $project: {
          _id: 0, // Exclude the default _id field
          count: '$totalCount' // Concatenating "count: " with the totalCount field
        }
      }
    ]
    const results = await Contracts.aggregate(aggregation)
    return results?.length ? results[0] : { count: 0 }
  } catch (e) {}
}

const getContracts = async (query, user) => {
  try {
    if (user?.role === accountTypeEnum.FOUNDER) {
      query['userId'] = user._id
    } else if (user?.role === accountTypeEnum.INVESTOR) {
      query['freelancerId'] = user.freelancers
      if (!query.freelancerId) {
        throw new Error(`User does not have access to this!`)
      }
    }

    const filter = pick(query, ['businessId', 'departmentId', 'freelancerId', 'userId'])

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

const getUserContracts = async (query, user) => {
  try {
    if (user?.role === accountTypeEnum.FOUNDER || user?.role === accountTypeEnum.ADMIN) {
      query['userId'] = user._id
    } else if (user?.role === accountTypeEnum.INVESTOR) {
      query['freelancerId'] = user.freelancers
      if (!query.freelancerId) {
        throw new Error(`User does not have access to this!`)
      }
    }

    const filter = pick(query, ['businessId', 'departmentId', 'freelancerId', 'userId', 'isActive'])

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

const getContractWithoutPopulate = async (filter, selectedFields = '') => {
  try {
    return await Contracts.findOne(filter).select(selectedFields)
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

const updateContract = async (contractId, data) => {
  try {
    const updatedContract = await Contracts.findByIdAndUpdate(contractId, { $set: { ...data } }, { new: true })
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
    await Business.findOneAndUpdate({ employees: { $in: [mongoose.Types.ObjectId(id)] } }, { $pull: { employees: id } })
    await Department.findOneAndUpdate(
      { employees: { $in: [mongoose.Types.ObjectId(id)] } },
      { $pull: { employees: id } }
    )
    const response = await Contracts.findByIdAndDelete(id)
    return response
  } catch (e) {
    throw Error(`Could not delete contract, error: ${e}`)
  }
}

const handleHiringMailNotification = async ({ userId, businessId, freelancerId }, contractId) => {

  const businessEntity = await Business
    .findById({ _id: businessId })
    .select('name');

  const freelancerEntity = await FreelancerModel
    .findById({ _id: freelancerId })
    .populate(
      {
        model: 'users',
        path: 'userId'
      }
    );

  const userEntity = await UserModel.findById({ _id: userId });
  const contractEntity = await Contracts.findById({ _id: contractId });
  const currentBusinessContracts = await Contracts.find({ businessId, userId })
    .populate([
      {
        model: 'users',
        path: 'userId',
      },
      {
        model: 'freelancers',
        path: 'freelancerId',
        populate: {
          model: 'users',
          path: 'userId',
        }
      }
    ])

  if (freelancerEntity && userEntity && contractEntity && currentBusinessContracts && businessEntity) {
    const freelancerMailOpts = getNotificationMailOpts(freelancerEntity, userEntity, contractEntity, currentBusinessContracts, businessEntity, false)
    const clientMailOpts = getNotificationMailOpts(freelancerEntity, userEntity, contractEntity, currentBusinessContracts, businessEntity, true)
    await Mailer.sendInviteMail(freelancerMailOpts);
    await Mailer.sendInviteMail(clientMailOpts);
  }
}

const getNotificationMailOpts = (freelancerEntity, userEntity, contractEntity, currentBusinessContracts, businessEntity, isClient) => {
  const dynamicTemplateData = {
    firstName: '',
    lastName: '',
    projectName: '',
    rate: 0,
    clientName: '',
    supportLink: `${keys.redirectDomain}/wiki/getting-started`,
    currentYear: new Date().getFullYear(),
    currentTeam: [],
    freelancerName: ''
  };


  if (isClient) {
    dynamicTemplateData['firstName'] = userEntity?.FirstName ?? '';
    dynamicTemplateData['lastName'] = userEntity?.LastName ?? '';
    dynamicTemplateData['freelancerName'] = freelancerEntity?.userId?.FirstName ?? '' + ' ' + freelancerEntity?.userId?.LastName ?? '';
  } else {
    dynamicTemplateData['firstName'] = freelancerEntity?.userId?.FirstName ?? '';
    dynamicTemplateData['lastName'] = freelancerEntity?.userId?.LastName ?? '';
    dynamicTemplateData['clientName'] = userEntity?.FirstName ?? '' + ' ' + userEntity?.LastName ?? '';
  }

  if (currentBusinessContracts) {
    const projectTeams = currentBusinessContracts.map(({ freelancerId }) => {
      return {
        name: freelancerId?.userId?.FirstName ?? '' + ' ' + freelancerId?.userId?.LastName ?? '',
        role: freelancerId?.category ?? ''
      }
    });


    dynamicTemplateData['rate'] = contractEntity?.hourlyRate ?? 0;
    dynamicTemplateData['currentTeam'] = projectTeams ?? [];
    dynamicTemplateData['projectName'] = businessEntity?.name ?? '';

    const to = isClient ? userEntity?.email : freelancerEntity?.userId?.email;
    const subject = isClient ? ' Update: New Team Member Added to ' + businessEntity?.name : "You're Hired! Welcome to " + businessEntity?.name;
    const templateId = isClient ? 'd-1093fd560e874140afa6400e250f58ea' : 'd-2c0cc93195e149109d032d0c65cab3ba';

    const mailOpts = {
      to,
      subject,
      templateId,
      dynamicTemplateData
    }
    return mailOpts;
  }
}

const revokeAccess = async (contractId) => {
  const contract = await Contracts.findById(contractId).populate(
    [
      {
        path: 'userId',
        model: 'users',
        select: 'email FirstName LastName'
      },
      {
        path: 'businessId',
        model: 'businesses',
        select: 'name'
      }
    ]
  );

  if (!contract) throw new Error('Contract not found');
  await Business.updateMany({ employees: contractId }, { $pull: { employees: contractId } });
  await Department.updateMany({ employees: contractId }, { $pull: { employees: contractId } });
  const userData = await FreelancerModel.findById(contract?.freelancerId);
  const user = await UserModel.findById(userData.userId);
  const freelancerId = user._id.toString();
  const clientId = contract?.userId?._id.toString();
  const todoTag = await TagModel.findOne({ tagName: 'To Do', departmentId: contract?.departmentId });

  await TaskModel.updateMany(
    { 
      departmentId: contract?.departmentId,
      assignee: freelancerId
    },
    {
      $set: {
        assignee: clientId, 
        status: 'To Do', 
        tag: todoTag._id,
      },
    }
  );
  await Contracts.findByIdAndDelete(contractId);

  await Mailer.sendInviteMail({
    to: contract?.userId?.email,
    subject: 'Confirmation: Removal of Team Member from ' + contract?.businessId?.name,
    templateId: 'd-1093fd560e874140afa6400e250f58ea',
    dynamicTemplateData: {
      firstName: contract?.userId?.FirstName,
      lastName: contract?.userId?.LastName,
      supportLink: `${keys.redirectDomain}/wiki/getting-started`,
      loginLink: `${keys.redirectDomain}/login`,
      prjectName: contract?.businessId?.name
    }
  });
  return 'Access revoked successfully';
}

module.exports = {
  getContracts,
  createContracts,
  getContractById,
  updateContract,
  deleteContract,
  deletePaymentMethod,
  getContractByfreelacerId,
  getUserContracts,
  updateContractByFreelancer,
  createStripeCustomer,
  createPaymentMethod,
  endContract,
  countUserContracts,
  getContractWithoutPopulate,
  revokeAccess
}
