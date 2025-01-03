const mongoose = require('mongoose')
const user = require('../models/User')
const taxDataTables = require('../models/TaxDataTable')
const thirdPartyApplications = require('../models/ThirdPartyApplications')
const list = require('../models/List')
const freelancer = require('../models/Freelancer')
const notifications = require('../models/Notifications')
const emailList = require('../models/EmailList')
const Subscriptions = require('../models/Subscription')
const PaymentMethods = require('../models/PaymentMethod')
const listHelper = require('./list')
const { accountTypeEnum } = require('../enum/accountTypeEnum')
const { planEnum } = require('../enum/planEnum')
const { notificationEnum } = require('../enum/notificationEnum')
const { likeEnum } = require('../enum/likeEnum')
const User = require('../models/User')
const InviteModel = require('../models/Invited')
const BusinessModel = require('../models/Business')
const AuthService = require('./authentication')
const Mailer = require('../../services/Mailer')
const CloudinaryUploadHelper = require('./file')
const BusinessDetailsModel = require('../models/BusinessDetails')
// create user
const createUser = async (data, hash) => {
  // create User
  data.FullName = (data.FirstName || '') + (data.FirstName && data.LastName ? ' ' : '') + (data.LastName || '')
  const newUser = await user.create({
    ...data,
    password: hash,
    plan: planEnum.UNSUBSCRIBED
  })
  // create favorites and recently viewed list
  const listsToCreate = [
    {
      name: 'Favorites',
      icon: 'HeartOutlined'
    },
    {
      name: 'Recently Viewed',
      icon: 'EyeOutlined'
    },
    {
      name: 'My Team',
      icon: 'TeamOutlined'
    }
  ]
  for (const item of listsToCreate) {
    const list = {
      name: item.name,
      icon: item.icon,
      userId: newUser.id,
      isDefault: true,
      user: await user.findById(newUser.id)
    }
    await listHelper.createLists(list)
  }
  const ids = await list.find({ userId: newUser.id })
  // update users to have skills
  await user.findByIdAndUpdate(newUser.id, {
    lists: ids.map(item => mongoose.Types.ObjectId(item.id))
  })
  // create 3rd party application row with googleId if have it
  thirdPartyApplications.create({ _id: newUser.id, userId: newUser.id })
  if (accountTypeEnum.INVESTOR === data?.role) {
    const response = await createFreelanceAccount({
      isAcceptEquity: data.isAcceptEquity,
      rate: data.rate,
      category: data.category,
      userId: newUser.id
    })
    if (data?.skills?.length) {
      // update users to have skills
      await user.findByIdAndUpdate(newUser.id, {
        freelancerSkills: data.skills,
        freelancers: response.id
      })
      newUser.freelancers = response.id
    } else {
      await updateUserByid(newUser.id, {
        freelancers: response.id
      })
      newUser.freelancers = response.id
    }
  }
  return newUser
}

// update User
const updateUserByid = async (id, data) => {
  try {
    const userData = await getSingleUser({ _id: id }, '-password')

    for (var field in data) {
      userData[field] = data[field]
    }
    if (userData?.role === 1 && !userData?.freelancers) {
      const freelancerEntity = await freelancer.create({ userId: id })
      if (freelancerEntity) {
        userData['freelancers'] = freelancerEntity._id
      }
    }

    if (data?.businessPhone && data?.taxId && data?.businessType) {
      const isExistingRecord = await BusinessDetailsModel.findOne({ userId: id })
      if (isExistingRecord) {
        let businessDetailRecord = {}
        if (isExistingRecord?.name !== data.businessName) businessDetailRecord['name'] = data.businessName
        if (isExistingRecord?.businessPhone !== data.businessPhone)
          businessDetailRecord['businessPhone'] = data.businessPhone
        if (isExistingRecord?.taxId !== data.taxId) businessDetailRecord['taxId'] = data.taxId
        if (isExistingRecord?.type !== data.businessType) businessDetailRecord['type'] = data.businessType
        await BusinessDetailsModel.findOneAndUpdate({ _id: isExistingRecord._id }, { $set: businessDetailRecord })
      }
    }

    const updatedUserEntity = await userData.save()
    return updatedUserEntity
  } catch (e) {
    throw new Error(`${e}`)
  }
}

// update tax data
const updateTaxDataByid = async (id, data) => {
  try {
    return await taxDataTables.findByIdAndUpdate(id, { $set: { ...data } })
  } catch (e) {
    throw Error(`Something went wrong ${e}`)
  }
}

// update User
const updateUserByEmail = async (email, data) => {
  try {
    return await user.updateOne({ email }, { $set: { ...data } })
  } catch (e) {
    throw Error(`Something went wrong ${e}`)
  }
}

// get User By Id
const getUserById = async id => {
  try {
    const userData = await user
      .findById(id)
      .populate([
        { path: 'thirdPartyCredentials', model: 'thirdPartyApplications' },
        { path: 'freelancers', model: 'freelancers' }
      ])
      .select('-password')

    if (userData?.role === 0) {
      const userTotalBusiness = await BusinessModel.countDocuments({ userId: id })

      userData._doc['totalBusiness'] = userTotalBusiness
    }
    return userData
  } catch (e) {
    throw Error(`Could not find user, error: ${e}`)
  }
}

// list users
const listUsers = async ({ filter, take, skip }) => {
  try {
    return await user
      .find({ ...filter })
      .skip(skip)
      .limit(take)
  } catch (e) {
    throw Error(`Could not find user, error: ${e}`)
  }
}

const listFreelancers = async ({ filter, take, skip, sort, minRate, maxRate, skill }) => {
  try {
    const regexQuery = new RegExp(filter, 'i')
    const existingIndexes = await freelancer.collection.getIndexes()
    const existingUserIndexes = await User.collection.getIndexes()
    const indexExists = existingIndexes && 'user_1_rate_1' in existingIndexes

    const indexExistsUserIndexes = existingUserIndexes && 'FullName_1' in existingUserIndexes
    if (!indexExists) {
      await freelancer.createIndex({ user: 1, rate: 1 })
    }

    if (!indexExistsUserIndexes) {
      await User.createIndex({ FullName: 1 })
      await User.createIndex({ freelancerSkills: 1 })
    }

    const aggregationPipeline = [
      {
        $lookup: {
          from: 'users',
          let: { userId: '$user' },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ['$_id', '$$userId'] }
              }
            },
            {
              $project: {
                AddressLineCountry: 1,
                freelancerSkills: 1,
                FirstName: 1,
                LastName: 1,
                profileImage: 1,
                FullName: 1
              }
            }
          ],
          as: 'user'
        }
      },
      {
        $unwind: '$user'
      },
      {
        $match: {
          $or: [{ 'user.FullName': { $regex: regexQuery } }, { 'user.freelancerSkills.skill': { $regex: regexQuery } }],
          ...(skill?.length > 0
            ? {
                'user.freelancerSkills.skill': {
                  $in: skill
                }
              }
            : {}),
          ...(minRate && {
            rate: { $gte: +minRate }
          }),
          ...(maxRate && {
            rate: { $lte: +maxRate }
          })
        }
      },
      ...(sort === 'lowest hourly rate' || sort === 'highest hourly rate'
        ? [
            {
              $sort: {
                rate: sort === 'lowest hourly rate' ? 1 : -1
              }
            }
          ]
        : []),
      {
        $facet: {
          limitedRecords: [
            {
              $skip: +skip
            },
            {
              $limit: +take
            }
          ],
          totalCount: [
            {
              $count: 'count'
            }
          ]
        }
      }
    ]

    const list = await freelancer.aggregate(aggregationPipeline).exec()
    return list[0]
  } catch (e) {
    throw Error(`Could not find user, error: ${e}`)
  }
}

const getFreelancerById = async id => {
  try {
    return await freelancer
      .findById(id)
      .populate([
        {
          path: 'userId',
          model: 'users'
        }
      ])
      .exec()
  } catch (e) {
    throw Error(`Could not find user, error: ${e}`)
  }
}

// delete users
const deleteUser = async id => {
  // set inactive, dont actually delete
  try {
    return await user.findByIdAndUpdate(id, { $set: { isActive: false } })
  } catch (e) {
    throw Error(`Something went wrong ${e}`)
  }
}

// create freelancer account
const createFreelanceAccount = async data => {
  // create this when a user is created that is freelancer
  return await freelancer.create({
    ...data,
    user: await user.findById(data.userId)
  })
}
// add list to freelancer

const addListsToFreelancer = async (data, id) => {
  try {
    for (const item of data.list) {
      const list = {
        name: item.name,
        icon: item.icon,
        userId: item.userId,
        user: await user.findById(item.userId)
      }
      await listHelper.createLists(list)
    }
    const ids = await list.find({ userId: id })
    // update users to have skills
    await user.findByIdAndUpdate(id, {
      lists: ids.map(item => mongoose.Types.ObjectId(item.id))
    })

    return { msg: 'success' }
  } catch (e) {
    throw Error(`Something went wrong ${e}`)
  }
}

// list likes for user
const addToNewsletter = async data => {
  return await emailList.findOneAndUpdate({ email: data }, { $set: { email: data, isActive: true } }, { upsert: true })
}

const retrieveSubscriptions = async id => {
  return await Subscriptions.findById(id)
}

const retrievePaymentMethods = async id => {
  const payment = await PaymentMethods.find({ userId: id })
  return await PaymentMethods.find({ userId: id })
}

const setUpNotificationsForUser = async id => {
  const userNotifications = [
    notificationEnum.IS_GITHUB,
    notificationEnum.PICK_A_PLAN,
    notificationEnum.SELECT_TYPE_OF_TALENT,
    notificationEnum.CREATE_FIRST_BUSINESS,
    // complete account
    notificationEnum.UPDATE_ACCOUNT_DETAILS,
    notificationEnum.UPLOAD_PROFILE_PIC,
    // business notifications
    notificationEnum.HIRE_A_FREELANCER,
    notificationEnum.VIEW_FIRST_INVOICE,
    // freelancer
    notificationEnum.FIND_FIRST_JOB
  ]
  try {
    for (const notification of userNotifications) {
      await notifications.create({
        type: notification,
        userId: id,
        user: await user.findById(id)
      })
    }

    await user.findByIdAndUpdate(id, {
      notifications: await notifications.find({ userId: id })
    })
  } catch (e) {
    throw Error(`Something went wrong ${e}`)
  }
}

const getAllFreelancers = async (skip, take, minRate, maxRate, skill = [], name, sort) => {
  try {
    const queryFilters = buildQueryFilters(+minRate, +maxRate, skill, name)
    let sortStage = buildSortStageFilters(sort)
    const PROJECTION = {
      $project: {
        _id: 1,
        category: 1,
        rate: 1,
        likeTotal: 1,
        dislikeTotal: 1,
        'userId._id': 1,
        'userId.FirstName': 1,
        'userId.LastName': 1,
        'userId.AddressLineCountry': 1,
        'userId.profileImage': 1,
        freelancerSkills: 1,
        'invites._id': '$invites._id',
        'invites.userInvited': '$invites.userInvited'
      }
    }

    const lookup = [
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'userId'
        }
      },
      {
        $lookup: {
          from: 'invites',
          localField: 'invites',
          foreignField: '_id',
          as: 'invites'
        }
      },

      { $unwind: '$userId' },
      {
        $project: {
          _id: 1,
          category: 1,
          rate: 1,
          likeTotal: 1,
          dislikeTotal: 1,
          'userId._id': 1,
          'userId.FirstName': 1,
          'userId.LastName': 1,
          'userId.AddressLineCountry': 1,
          'userId.profileImage': 1,
          'userId.FullName': 1,

          freelancerSkills: {
            $map: {
              input: '$freelancerSkills',
              as: 'skill',
              in: {
                _id: '$$skill._id',
                yearsExperience: '$$skill.yearsExperience',
                skill: '$$skill.skill'
              }
            }
          },
          invites: {
            $arrayElemAt: ['$invites', 0]
          }
        }
      },
      {
        $match: {
          $or: [queryFilters]
        }
      },
      ...(Object.keys(sortStage).length > 0 && sortStage.rate !== 0 ? [{ $sort: sortStage }] : []),
      PROJECTION,
      {
        $facet: {
          freelancers: [{ $skip: +skip }, { $limit: +take }],
          totalCount: [{ $count: 'count' }]
        }
      }
    ]

    const result = await freelancer.aggregate(lookup)
    return {
      freelancers: result[0].freelancers,
      totalCount: result[0].totalCount[0]?.count || 0
    }
  } catch (error) {}
}

const buildSortStageFilters = sort => {
  let sortStage = {}
  if (sort === 'Most reviews' || sort === 'recomended') {
    sortStage = {
      likeTotal: -1
    }
  }
  if (sort == 'lowest hourly rate' || sort == 'highest hourly rate') {
    sortStage = {
      rate: sort === 'lowest hourly rate' ? 1 : -1
    }
  }
  return sortStage
}

const buildQueryFilters = (minRate, maxRate, skills, name) => {
  let filter = {}

  if (minRate) filter.rate = { $gte: minRate }

  if (maxRate) filter.rate = { ...filter.rate, $lte: maxRate }

  if (skills && skills?.length > 0 && !skills?.includes('undefined')) {
    if (skills.includes(',')) {
      let skillsArray
      skillsArray = skills.split(',')
      filter['freelancerSkills.skill'] = {
        $in: skillsArray.map(skill => new RegExp(skill, 'i'))
      }
    }
  }

  if (name && !name.includes('undefined')) {
    filter['$or'] = [
      { 'userId.FirstName': { $regex: name, $options: 'i' } },
      { 'userId.LastName': { $regex: name, $options: 'i' } }
    ]
  }

  return filter
}

const createFreelancerInvite = async params => {
  const createInvite = await InviteModel.create(params)
  const updateFreelancer = await freelancer.findByIdAndUpdate(
    params.freelancer,
    {
      $set: {
        invites: createInvite._doc._id
      }
    },
    { new: true }
  )

  return updateFreelancer
}

const changeEmail = async (userId, data) => {
  const userData = await user.findById(userId)
  if (!userData) throw Error(`User not exist`)
  if (userData.email !== data.currentEmail) throw Error(`User with this email not exist.`)

  const newEmailUser = await user.findOne({ email: data.email })
  if (newEmailUser) throw Error(`New email already registered.`)

  userData.email = data.email
  await userData.save()
  return userData
}

const getSingleUser = async (filter, fields) => {
  try {
    return await User.findOne(filter).select(fields)
  } catch (e) {
    throw Error(`Something went wrong ${e}`)
  }
}

const registerUser = async ({ email, password }) => {
  const hash = await AuthService.bcryptAndHashing(password)
  const newuser = await createUser({ email, password }, hash)
  try {
    if (newuser) {
      // create business_details for new user
      await BusinessDetailsModel.create({ userId: newuser.id })
      const result = await Mailer.sendMailWithSG({ email, templateName: 'VERIFY_EMAIL_ADDRESS' })
      if (result && result.isLoginWithGoogle) {
        return result
      }
      return newuser
    }
  } catch (error) {
    await User.findByIdAndDelete(newuser.id)
    throw new Error(`Something went wrong ${error}`)
  }
}

const updateUser = async (id, data) => {
  try {
    return await User.findByIdAndUpdate(id, { $set: { ...data } })
  } catch (e) {
    throw Error(`Something went wrong ${e}`)
  }
}

const createCalendar = async (params, userId) => {
  const userData = await User.findOne({ _id: userId })
  if (!userData) throw new Error(`User Not Found`)

  userData['calendarSettings'] = params
  await userData.save()
  return userData['calendarSettings']
}

const updateProfileImage = async (user, files) => {
  const file = await CloudinaryUploadHelper.getFile({ url: user?.userInfo?.profileImage })
  let isDeleted = null
  let isLocalDeleted = null
  if (file) {
    isLocalDeleted = await CloudinaryUploadHelper.deletedLocalFile(file?._id)
    isDeleted = await CloudinaryUploadHelper.deleteFile(file?.cloudinaryId)
  }
  if (!file || (isDeleted?.result === 'ok' && isLocalDeleted?._id)) {
    const uploadResult = await CloudinaryUploadHelper.createFile(files, user?.sub)
    if (uploadResult && uploadResult.length > 0 && uploadResult[0].url) {
      return await User.findByIdAndUpdate(user?.sub, { $set: { profileImage: uploadResult[0].url } })
    }
  }
  return null
}

module.exports = {
  changeEmail,
  createUser,
  updateUserByEmail,
  getUserById,
  listUsers,
  deleteUser,
  createFreelanceAccount,
  updateUserByid,
  retrieveSubscriptions,
  listFreelancers,
  getFreelancerById,
  addListsToFreelancer,
  setUpNotificationsForUser,
  updateTaxDataByid,
  addToNewsletter,
  getAllFreelancers,
  getSingleUser,
  retrievePaymentMethods,
  registerUser,
  updateUser,
  createCalendar,
  updateProfileImage
}
