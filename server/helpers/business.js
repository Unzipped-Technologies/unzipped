const business = require('../models/Business')
const businessAudience = require('../models/BusinessAudience')
const listItems = require('../models/ListItems')
const likeHistory = require('../models/LikeHistory')
const department = require('../models/Department')
const departmentHelper = require('./department')
const tags = require('../models/tags')
const user = require('../models/User')
const mongoose = require('mongoose')
const { likeEnum } = require('../enum/likeEnum')
const Contracts = require('../models/Contract')
const Freelancer = require('../models/Freelancer')
const TaskHours = require('../models/TaskHours')
const questionHelper = require('./questions')
const { currentPage, pageLimit, pick } = require('../../utils/pagination')

const createBusiness = async data => {
  // create business
  const newBusiness = await business.create({ ...data, questionsToAsk: [], applicants: [] })

  // Create business audience
  const audience = await businessAudience.create({
    ...data,
    businessId: newBusiness._id
  })

  // Create questions and store their _ids in questions array
  let questions = []
  if (data?.questionsToAsk?.length) {
    let businessQuestions = []
    for (var question of data.questionsToAsk) {
      businessQuestions.push({
        businessId: newBusiness._id,
        userId: data.userId,
        question: question,
        answers: []
      })
    }
    questions = await questionHelper.createManyQuestion(businessQuestions)

    questions = questions?.map(question => question._id)
  }
  // create department management and assign main user to it
  await departmentHelper.createDepartment({
    name: 'Management',
    businessId: newBusiness._id,
    userId: data.userId
  })
  // associate department with business
  await business.findByIdAndUpdate(newBusiness._id, {
    questionsToAsk: questions,
    audience: await businessAudience.findById(audience._id)
  })
  return { msg: 'business created successfully' }
}

const updateBusiness = async data => {
  return await business.findByIdAndUpdate(data.listId, { $set: { ...data } })
}

const deleteBusiness = async (businessId, userId) => {
  // Delete business
  await business.findByIdAndDelete(businessId)
  // delete business audience
  await businessAudience.deleteOne({ businessId: businessId })
  // delete business department
  await departmentHelper.deleteBusinessDepartments(businessId)
  return {
    msg: 'Project delete successfully'
  }
}

const getBusinessById = async (id, user) => {
  try {
    let populateData = []
    if (user?.userInfo?.role === 1) {
      populateData = [
        {
          path: 'questionsToAsk',
          model: 'questions',
          select: 'question'
        },
        {
          path: 'userId',
          model: 'users',
          select: 'FirstName LastName profileImage  isIdentityVerified stripeId stripeSubscription createdAt'
        }
      ]
    } else {
      populateData = [
        {
          path: 'departments',
          model: 'departments',
          select: 'name tags',
          populate: [
            {
              path: 'tags',
              model: 'tags',
              select: 'tagName'
            }
          ]
        },
        {
          path: 'applicants',
          model: 'freelancers',
          select: 'userId rate category freelancerSkills likeTotal dislikeTotal',
          populate: [
            {
              path: 'userId',
              model: 'users',
              select: 'email FirstName LastName profileImage freelancers'
            }
          ]
        },
        {
          path: 'userId',
          model: 'users',
          select: 'email FirstName LastName profileImage  isIdentityVerified stripeId stripeSubscription createdAt'
        },
        {
          path: 'questionsToAsk',
          model: 'questions',
          select: 'question answers'
        }
      ]
    }
    const response = await business.findByIdAndUpdate(id, { $set: { isSelected: true } }).populate(populateData)

    return { getBusiness: response }
  } catch (e) {
    throw Error(`Could not find user, error: ${e}`)
  }
}

// list lists
const listBusinesses = async ({ filter, limit = 20, skip = 0, maxRate, minRate, skill, type }) => {
  try {
    const existingNameIndex = await business.collection.indexes()
    const nameIndexExists = existingNameIndex.some(index => index.name === 'name_1')

    if (!nameIndexExists) {
      await business.collection.createIndex({ name: 1 }, { name: 'name_1' })
      await business.collection.createIndex({ projectType: 1 }, { name: 'projectType_1' })
      await business.collection.createIndex({ budget: 1 }, { name: 'budget_1' })
      await business.collection.createIndex({ requiredSkills: 1 }, { name: 'requiredSkills_1' })
    }
    let filters = {} // Default query to retrieve all records

    if (filter?.isActive !== undefined) {
      filters.isActive = filter?.isActive
    }
    const regexQuery = new RegExp(filter?.searchKey, 'i')
    const regexType = new RegExp(type, 'i')
    const aggregationPipeline = [
      {
        $match: {
          name: { $regex: regexQuery },
          ...(skill?.length > 0
            ? {
                requiredSkills: {
                  $all: skill
                }
              }
            : {}),
          ...(type && {
            projectType: { $regex: regexType }
          }),
          ...(minRate && {
            budget: { $gte: +minRate }
          }),
          ...(maxRate && {
            budget: { $lte: +maxRate }
          }),
          ...filters
        }
      },
      {
        $project: {
          name: 1,
          budget: 1,
          equity: 1,
          businessAddressLineOne: 1,
          businessCountry: 1,
          businessCity: 1,
          businessState: 1,
          businessZip: 1,
          projectType: 1,
          applicants: 1,
          deadline: 1,
          createdAt: 1,
          updatedAt: 1,
          isActive: 1,
          valueEstimate: 1,
          userId: 1
        }
      },
      {
        $sort: {
          createdAt: -1
        }
      },
      {
        $lookup: {
          from: 'users',
          let: { userId: '$userId' },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ['$_id', '$$userId'] }
              }
            },
            {
              $project: {
                FirstName: 1,
                LastName: 1,
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
        $facet: {
          limitedRecords: [
            {
              $skip: +skip
            },
            {
              $limit: +limit
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

    const list = await business.aggregate(aggregationPipeline).exec()
    return list[0]
  } catch (e) {
    throw Error(`Could not find list, error: ${e}`)
  }
}

const getBusinessByInvestor = async ({ businessId, id }) => {
  try {
    // Find freelancer by user id
    const freelancerIds = await Freelancer.findOne({ userId: id }, '_id')
    const ContractRate = await Contracts.findOne(
      { freelancerId: freelancerIds._id, businessId: businessId },
      'hourlyRate businessId'
    ).populate({ path: 'businessId', model: 'businesses', select: 'name' })
    const dep = await department.aggregate([
      {
        $match: {
          businessId: businessId
        }
      },
      {
        $lookup: {
          from: 'contracts',
          localField: 'employees',
          foreignField: '_id',
          as: 'employeeDetails'
        }
      },
      {
        $match: {
          'employeeDetails.freelancerId': freelancerIds._id
        }
      },
      {
        $project: {
          _id: 1
        }
      }
    ])
    const taskHours = await TaskHours.find({ userId: id, departmentId: dep[0]._id })
      .populate({ path: 'userId', model: 'users', select: '_id FirstName LastName profileImage' })
      .populate({
        path: 'taskId',
        model: 'tasks',
        select: '_id taskName storyPoints tag',
        populate: {
          path: 'tag',
          model: 'tags',
          select: '_id tagName'
        }
      })
      .exec()
    const tag = await tags.find({ departmentId: dep[0]._id })
    return { count: taskHours.length, taskHours: taskHours, ContractRate: ContractRate, tags: tag }
  } catch (e) {
    throw Error(`Something went wrong ${e}`)
  }
}

const getBusinessWithoutPopulate = async (businessId, selectedFields) => {
  try {
    const businessData = await business.findOne({ _id: businessId }).select(selectedFields)
    return businessData
  } catch (e) {
    throw Error(`Something went wrong ${e}`)
  }
}

const getBusinessByFounder = async businessId => {
  try {
    const businessDetails = await business
      .findById(businessId)
      .populate({
        path: 'employees',
        model: 'contracts',
        select: 'departmentId hourlyRate',
        populate: { path: 'freelancerId', model: 'freelancers', select: 'userId' }
      })
      .select('name employees')
    const taskHoursPromises = businessDetails.employees.map(employee => {
      return TaskHours.find({ userId: employee.freelancerId.userId, departmentId: employee.departmentId })
        .populate({ path: 'userId', model: 'users', select: '_id FirstName LastName profileImage' })
        .populate({
          path: 'taskId',
          model: 'tasks',
          select: '_id taskName storyPoints tag',
          populate: {
            path: 'tag',
            model: 'tags',
            select: '_id tagName'
          }
        })
        .exec()
    })

    const results = await Promise.all(taskHoursPromises)
    return { businessDetails: businessDetails, results: [].concat(...results) }
  } catch (error) {}
}

const getAllBusinessByInvestor = async (id, query) => {
  try {
    const options = pick(query, ['limit', 'page'])
    const limit = pageLimit(options)

    const page = currentPage(options)
    const skip = (page - 1) * limit
    const freelancerIds = await Freelancer.findOne({ userId: id }, '_id')
    if (!freelancerIds) return 'No freelancer profile exist'
    const total = await countContracts({
      freelancerId: { $in: freelancerIds._id },
      isOfferAccepted: true
    })

    const contracts = await Contracts.find({
      freelancerId: { $in: freelancerIds._id },
      isOfferAccepted: true
    })
      .select('businessId _id')
      .skip(skip)
      .limit(limit)
      .exec()
    const idsToSearch = contracts.map(item => item.businessId)
    const businesses = await business
      .find({
        _id: { $in: idsToSearch }
      })
      .select('name budget equity valueEstimate deadline createdAt updatedAt')
    const totalPages = Math.ceil(total / limit)

    const result = {
      limitedRecords: businesses,
      currentPage: page,
      limit,
      totalPages,
      totalCount: total
    }
    return result
  } catch (e) {
    throw Error(`Something went wrong ${e}`)
  }
}

const countContracts = async filter => {
  return await Contracts.countDocuments(filter)
}

// add like to business
const addLikeToBusiness = async (data, id) => {
  try {
    if (data.likeType === likeEnum.BUSINESS_LIKES || data.likeType === likeEnum.BUSINESS_DISLIKES) {
      await likeHistory.findOneAndUpdate(
        { businessId: data.profileId, userId: id },
        {
          $set: {
            ...data,
            freelancer: await freelancer.findById(data.profileId),
            user: await user.findById(id)
          }
        },
        { upsert: true }
      )
      const ids = await likeHistory.find({ profileId: data.profileId })
      const likes = ids.filter(item => item.likeType === likeEnum.PROFILE_LIKES)
      const dislikes = ids.filter(item => item.likeType === likeEnum.PROFILE_DISLIKES)
      // update users to have skills
      await business.findByIdAndUpdate(data.profileId, {
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

module.exports = {
  createBusiness,
  listBusinesses,
  getBusinessById,
  updateBusiness,
  deleteBusiness,
  addLikeToBusiness,
  getAllBusinessByInvestor,
  getBusinessByInvestor,
  getBusinessByFounder,
  getBusinessWithoutPopulate
}
