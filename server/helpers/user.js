const mongoose = require('mongoose')
const user = require('../models/User')
const taxDataTables = require('../models/TaxDataTable')
const thirdPartyApplications = require('../models/ThirdPartyApplications')
const freelancerSkills = require('../models/FreelancerSkills')
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
const likeHistory = require('../models/LikeHistory')
const { likeEnum } = require('../enum/likeEnum')
const FreelancerSkills = require('../models/FreelancerSkills')
const User = require('../models/User')
const InviteModel = require('../models/Invited')

// create user
const createUser = async (data, hash) => {
  // create User
  const newUser = await user.create({
    ...data,
    // TODO: needs to be removed once email is back online
    isEmailVerified: true,
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
  if (accountTypeEnum.INVESTOR === data.role) {
    const response = await createFreelanceAccount({
      isAcceptEquity: data.isAcceptEquity,
      rate: data.rate,
      category: data.category,
      userId: newUser.id
    })
    if (data.skills && data.skills.length > 0) {
      for (const skill of data.skills) {
        await freelancerSkills.create({
          ...skill,
          profileId: newUser.id,
          user: await user.findById(newUser.id)
        })
      }
      const ids = await freelancerSkills.find({ profileId: newUser.id })
      // update users to have skills
      await user.findByIdAndUpdate(newUser.id, {
        freelancerSkills: ids.map(item => mongoose.Types.ObjectId(item.id)),
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
    return await user.updateOne({ _id: id }, { $set: { ...data } })
  } catch (e) {
    throw Error(`Something went wrong ${e}`)
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
    return await user
      .findById(id)
      .populate({ path: 'thirdPartyCredentials', model: 'thirdPartyApplications' })
      .select('-password')
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
    const existingFreelancerSkillsIndexes = await FreelancerSkills.collection.getIndexes()
    const existingUserIndexes = await User.collection.getIndexes()
    const indexExists = existingIndexes && 'user_1_rate_1' in existingIndexes
    const indexExistsFreelancerSkillsIndexes =
      existingFreelancerSkillsIndexes && 'skill_1' in existingFreelancerSkillsIndexes
    const indexExistsUserIndexes = existingUserIndexes && 'FullName_1' in existingUserIndexes
    if (!indexExists) {
      await freelancer.createIndex({ user: 1, rate: 1 })
    }
    if (!indexExistsFreelancerSkillsIndexes) {
      await FreelancerSkills.createIndex({ skill: 1 })
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
        $lookup: {
          from: 'freelancerskills',
          let: { freelancerSkills: '$user.freelancerSkills' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $in: ['$_id', '$$freelancerSkills']
                }
              }
            },
            {
              $project: {
                skill: 1
              }
            }
          ],
          as: 'user.freelancerSkills'
        }
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
        },
        {
          path: 'freelancerSkills',
          model: 'freelancerskills',
          select: 'yearsExperience skill isActive'
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

// add like to freelancer

const addLikeToFreelancer = async (data, id) => {
  try {
    if (data.likeType === likeEnum.PROFILE_LIKES || data.likeType === likeEnum.PROFILE_DISLIKES) {
      await likeHistory.findOneAndUpdate(
        { profileId: data.profileId, userId: id },
        {
          $set: {
            ...data,
            freelancers: await freelancer.findById(data.profileId),
            user: await user.findById(id)
          }
        },
        { upsert: true }
      )
      const ids = await likeHistory.find({ profileId: data.profileId })
      const likes = ids.filter(item => item.likeType === likeEnum.PROFILE_LIKES)
      const dislikes = ids.filter(item => item.likeType === likeEnum.PROFILE_DISLIKES)
      // update users to have skills
      await freelancer.findByIdAndUpdate(data.profileId, {
        likes: likes.map(item => mongoose.Types.ObjectId(item.id)),
        dislikes: dislikes.map(item => mongoose.Types.ObjectId(item.id)),
        likeTotal: likes.length,
        dislikeTotal: dislikes.length
      })
      await user.findByIdAndUpdate(id, {
        likes: likes.map(item => mongoose.Types.ObjectId(item.id)),
        dislikes: dislikes.map(item => mongoose.Types.ObjectId(item.id)),
        likeTotal: likes.length,
        dislikeTotal: dislikes.length
      })
      return { likes: ids.length, msg: 'success' }
    }
  } catch (e) {
    throw Error(`Something went wrong ${e}`)
  }
}

// remove like from freelancer

const removeLikeToFreelancer = async (data, id) => {
  try {
    if (data.likeType === likeEnum.PROFILE_LIKES || data.likeType === likeEnum.PROFILE_DISLIKES) {
      await likeHistory.findOneAndDelete({ profileId: data.profileId, userId: id })
      const ids = await likeHistory.find({ profileId: data.profileId })
      const likes = ids.filter(item => item.likeType === likeEnum.PROFILE_LIKES)
      const dislikes = ids.filter(item => item.likeType === likeEnum.PROFILE_DISLIKES)
      // update users to have skills
      await freelancer.findByIdAndUpdate(data.profileId, {
        likes: likes.map(item => mongoose.Types.ObjectId(item.id)),
        dislikes: dislikes.map(item => mongoose.Types.ObjectId(item.id)),
        likeTotal: likes.length,
        dislikeTotal: dislikes.length
      })
      await user.findByIdAndUpdate(id, {
        likes: likes.map(item => mongoose.Types.ObjectId(item.id)),
        dislikes: dislikes.map(item => mongoose.Types.ObjectId(item.id)),
        likeTotal: likes.length,
        dislikeTotal: dislikes.length
      })
      return { likes: ids.length, msg: 'success' }
    }
  } catch (e) {
    throw Error(`Something went wrong ${e}`)
  }
}

// list likes for user
const listLikes = async id => {
  return user.findById(id).populate({
    path: 'likes',
    model: 'likeHistorys',
    populate: { path: 'freelancers', model: 'freelancers' }
  })
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
      {
        $lookup: {
          from: 'freelancerskills',
          localField: 'freelancerSkills',
          foreignField: '_id',
          as: 'freelancerSkills'
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

  if (skills && skills.length > 0 && !skills.includes('undefined')) {
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
  addLikeToFreelancer,
  removeLikeToFreelancer,
  listLikes,
  addToNewsletter,
  getAllFreelancers,
  getSingleUser,
  retrievePaymentMethods
}
