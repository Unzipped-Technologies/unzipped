const business = require('../models/Business')
const businessAudience = require('../models/BusinessAudience')
const listItems = require('../models/ListItems')
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
const QuestionsModel = require('../models/Question')
const { currentPage, pageLimit, pick } = require('../../utils/pagination')
const CloudinaryUploadHelper = require('./file')
const businessDetail = require('../models/BusinessDetails')
const TaskModel = require('../models/Task')

const createBusiness = async (data, id, files = []) => {
  // upload file to cloudinary platform
  const uploadResult = await CloudinaryUploadHelper.createFile(files, id)
  let cloudinaryIds = []
  if (uploadResult && uploadResult.length > 0) {
    cloudinaryIds = uploadResult.map(elem => elem._id)
  }
  // create business
  const newBusiness = await business.create({
    ...data,
    userId: id,
    questionsToAsk: [],
    applicants: [],
    projectImagesUrl: cloudinaryIds
  })

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

  return { msg: 'business created successfully', business: newBusiness }
}

const updateBusiness = async (data, id, files = []) => {
  try {
    const businessData = await business.findById(data?.listId).populate('questionsToAsk')
    if (!businessData) throw Error('Business not found')
    let cloudinaryIds = []
    if (files?.length) {
      const uploadResult = await CloudinaryUploadHelper.createFile(files, id)
      if (uploadResult && uploadResult.length > 0) {
        cloudinaryIds = uploadResult.map(elem => elem._id)
        businessData['projectImagesUrl'] = [...businessData?.projectImagesUrl, ...cloudinaryIds]
      }
    }

    let questions = []
    if (data?.questionsToAsk?.length) {
      const dataQuestions = data?.questionsToAsk || []
      const businessQuestions = businessData?.questionsToAsk || []

      const unmatchedIds = businessQuestions
        .filter(businessQuestion => !dataQuestions.includes(businessQuestion.question))
        .map(businessQuestion => businessQuestion._id)

      let matchedIds = []
      if (unmatchedIds.length > 0) {
        matchedIds = businessData.questionsToAsk
          .filter(businessQuestion => !unmatchedIds.includes(businessQuestion._id))
          .map(businessQuestion => businessQuestion._id)
      } else {
        matchedIds = businessData?.questionsToAsk.map(elem => elem._id)
      }

      const businessQuestionsText = businessQuestions.map(q => q.question)

      const newQuestions = dataQuestions.filter(question => !businessQuestionsText.includes(question))

      if (unmatchedIds.length > 0) {
        const deleteQuestions = await QuestionsModel.deleteMany({ _id: { $in: unmatchedIds } })
        if (deleteQuestions?.deletedCount !== unmatchedIds.length) throw Error('Could not update business')
      }
      if (newQuestions.length > 0 || matchedIds.length > 0) {
        if (newQuestions.length > 0) {
          let businessQuestions = []
          for (var question of newQuestions) {
            businessQuestions.push({
              businessId: data?.listId,
              userId: id,
              question: question,
              answers: []
            })
          }
          questions = await questionHelper.createManyQuestion(businessQuestions)

          questions = questions?.map(question => question._id)
        }
        businessData['questionsToAsk'] = [...matchedIds, ...questions]
      } else {
        businessData['questionsToAsk'] = []
      }
    }
        
    Object.keys(data).forEach(key => {
      if (key !== 'listId' && key !== 'questionsToAsk' && key !== 'projectImagesUrl'){ 
      businessData[key] = data[key]}
    })

    return await businessData.save()

    // return await business.findByIdAndUpdate(data?.listId, { $set: { ...data } }).populate('userId')
  } catch (error) {
    throw Error(`Could not update business, error: ${error}`)
  }
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
        },
        {
          path: 'projectImagesUrl',
          model: 'file',
          select: 'url'
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
        },
        {
          path: 'projectImagesUrl',
          model: 'file',
          select: 'url'
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
const listBusinesses = async ({ filter, limit = 20, skip = 0 }) => {
  try {
    const db = mongoose.connection.db
    const collections = await db.listCollections({ name: 'businesses' }).toArray()
    if (collections.length > 0) {
      const existingNameIndex = await business?.collection?.indexes()
      const nameIndexExists = existingNameIndex.some(index => index.name === 'name_1')

      if (!nameIndexExists) {
        await business.collection.createIndex({ name: 1 }, { name: 'name_1' })
        await business.collection.createIndex({ projectType: 1 }, { name: 'projectType_1' })
        await business.collection.createIndex({ budget: 1 }, { name: 'budget_1' })
        await business.collection.createIndex({ requiredSkills: 1 }, { name: 'requiredSkills_1' })
      }
      const filters = pick(filter, ['userId', 'isActive', 'applicants'])
      const regexQuery = new RegExp(filter?.searchKey, 'i')
      const regexType = new RegExp(filter?.projectBudgetType, 'i')

      const limitValue = limit === 'all' ? await countBusiness(filters) : Number(limit)
      const limitStage = +limitValue > 0 ? { $limit: +limitValue } : { $limit: 20 } // Ensure limit is positive
      const regexPatterns = filter?.skill?.map(skill => `.*${skill}.*`)
      const regexPattern = regexPatterns?.join('|')
      const aggregationPipeline = [
        {
          $match: {
            name: { $regex: regexQuery },
            ...(filter?.skill?.length > 0
              ? {
                  requiredSkills: {
                    $elemMatch: {
                      $regex: new RegExp(regexPattern, 'i')
                    }
                  }
                }
              : {}),
            ...(filter?.projectBudgetType && {
              projectBudgetType: { $regex: regexType }
            }),
            ...(filter?.minRate &&
              +filter?.minRate > 0 && {
                budget: { $gte: +filter?.minRate }
              }),
            ...(filter?.maxRate &&
              +filter?.maxRate > 0 && {
                budget: { $lte: +filter?.maxRate }
              }),
            ...filters
          }
        },
        {
          $project: {
            name: 1,
            budget: 1,
            equity: 1,
            description: 1,
            likeTotal: 1,
            businessAddressLineOne: 1,
            businessCountry: 1,
            businessCity: 1,
            businessState: 1,
            businessZip: 1,
            budgetRange: 1,
            projectType: 1,
            applicants: 1,
            deadline: 1,
            createdAt: 1,
            updatedAt: 1,
            isActive: 1,
            valueEstimate: 1,
            userId: 1,
            departments: 1,
            projectImagesUrl: 1,
            questionsToAsk: 1,
            objectives: 1,
            goals: 1,
            requiredSkills: 1,
            projectBudgetType: 1,
            isArchived: 1
          }
        },
        {
          $sort: {
            createdAt: -1
          }
        },
        {
          $lookup: {
            from: 'files',
            let: { projectImagesUrl: '$projectImagesUrl' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $in: [
                      '$_id',
                      { $cond: { if: { $isArray: '$$projectImagesUrl' }, then: '$$projectImagesUrl', else: [] } }
                    ]
                  }
                }
              },
              {
                $project: {
                  name: 1,
                  url: 1
                }
              }
            ],
            as: 'projectImages'
          }
        },
        {
          $lookup: {
            from: 'questions',
            let: { questionId: '$questionsToAsk' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $in: ['$_id', { $cond: { if: { $isArray: '$$questionId' }, then: '$$questionId', else: [] } }]
                  }
                }
              },
              {
                $project: {
                  question: 1
                }
              }
            ],
            as: 'questions'
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
                  FullName: 1,
                  email: 1
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
            from: 'departments',
            let: { departments: '$departments' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [{ $eq: ['$isDeleted', false] }, { $in: ['$_id', '$$departments'] }]
                  }
                }
              },
              {
                $project: {
                  name: 1,
                  tags: 1,
                  businessId: 1
                }
              }
            ],
            as: 'businessDepartments'
          }
        },

        {
          $lookup: {
            from: 'file',
            let: { projectImagesUrl: '$projectImagesUrl' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [{ $in: ['$_id', '$$projectImagesUrl'] }]
                  }
                }
              },
              {
                $project: {
                  url: 1
                }
              }
            ],
            as: 'projectImagesUrl'
          }
        },
        {
          $facet: {
            limitedRecords: [
              {
                $skip: +skip
              },
              limitStage
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
    } else {
      return {
        limitedRecords: [],
        totalCount: [{ count: 0 }]
      }
      throw Error(`Collection "businesses" does not exist.`)
    }
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

const countBusiness = async filter => {
  const totalDocuments = await business.countDocuments(filter)
  return Number(totalDocuments)
}

const createBusinessDetails = async (data, id) => {
  return await businessDetail.create({
    ...data,
    userId: id
  })
}

const getBusinessDetailsByUserId = async id => {
  return await businessDetail.findOne({ userId: id }).select('name type businessPhone taxId userId _id')
}

const updateBusinessDetails = async (data, id) => {
  return await businessDetail.findOneAndUpdate(
    { userId: id },
    {
      ...data
    },
    { new: true }
  )
}

const getBusinessCreatedByUser = async userId => {
  return await business.find({ userId: userId }).select('name _id')
}

const getBusinessEmployees = async (id, isSelectedBusiness = false) => {
  const query = isSelectedBusiness ? { _id: id } : { userId: id }
  const businessEmployees = await business
    .find(query)
    .populate({
      path: 'employees',
      model: 'contracts',
      select: 'freelancerId departmentId',
      populate: {
        path: 'freelancerId',
        model: 'freelancers',
        select: 'userId',
        populate: {
          path: 'userId',
          model: 'users',
          select: 'FirstName LastName email _id profileImage '
        }
      }
    })
    .select('employees')

  const empLists = businessEmployees.map(elem => {
    
    const hiredEmployees = elem.employees.length  > 0 ?  elem.employees.map((employee) => ({
      businessId: elem._id,
      contractId: employee._id ?? null,
      departmentId: employee.departmentId ?? null,
      FirstName: employee.freelancerId?.userId?.FirstName ?? '',
      LastName: employee.freelancerId?.userId?.LastName ?? '',
      userId: employee.freelancerId?.userId?._id ?? null,
      email: employee.freelancerId?.userId?.email ?? '',
      profileImage: employee.freelancerId?.userId?.profileImage ?? '',
    })) : []

    return hiredEmployees
 })

  const mergeEmpLists = empLists.flat()
  return mergeEmpLists
}

const fetchAllBizTasks = async (businessId, departmentId, isDepartmentRelatedTasks = false, userId) => {
  const query = businessId ? { _id: businessId } : { userId }
  const list = await business
    .find(query)
    .populate([
      {
        path: 'departments',
        model: 'departments',
        select: 'name tags',
        populate: [
          {
            path: 'tags',
            model: 'tags',
            select: '_id tagName'
          },
          {
            path: 'tasks',
            model: 'tasks',
            populate: [
              {
                path: 'assignee',
                model: 'users',
                select: '_id FirstName LastName profileImage email'
              }
            ],
            select: '_id taskName storyPoints tag description businessId assignee order status departmentId'
          }
        ]
      }
    ])
    .select('_id name')

  return constructBoardObject(list)
}

const normalizeStatus = status => {
  switch (status) {
    case 'Todo':
      return 'To Do'
    case 'Done':
      return 'Done'
    case 'In Progress':
      return 'In Progress'
    default:
      return status
  }
}

const constructBoardObject = arr => {
  const tagsArray = arr.flatMap(item =>
    item.departments.flatMap(department => department.tags.filter(tag => Object.keys(tag).length > 0))
  )

  const tagMap = new Map()

  tagsArray.forEach(tag => {
    if (!tagMap.has(tag.tagName)) {
      tagMap.set(tag.tagName, { tagName: tag.tagName, tasks: [] })
    }
  })

  const resultObject = {}

  const tasksArray = arr.flatMap(item => item.departments.flatMap(department => department.tasks))
  tagMap.forEach((value, key) => {
    const tagWithId = tagsArray.find(tag => tag.tagName === key)
    if (tagWithId) {
      resultObject[tagWithId._id] = value
    }
  })

  tasksArray.forEach(task => {
    const normalizedStatus = normalizeStatus(task.status)
    for (const [id, tagObj] of Object.entries(resultObject)) {
      if (tagObj.tagName === normalizedStatus && tagObj.tagName === normalizeStatus(task.status)) {
        tagObj.tasks.push(task)
      }
    }
  })
  return resultObject
}

const deleteBusinessImage = async (businessId, imageId, userId) => {
  try {
    const businessData = await business.findOne({ _id: businessId })
    if (businessData?.userId?.toString() !== userId) throw Error('You are not authorized to view this business')
    if (!businessData?.projectImagesUrl?.includes(imageId))
      throw Error('Selected image does not exist in this business')

    const isLocalDeleted = await CloudinaryUploadHelper.deletedLocalFile(imageId)
    const isDeleted = await CloudinaryUploadHelper.deleteFile(isLocalDeleted?.cloudinaryId)

    businessData['projectImagesUrl'] = businessData?.projectImagesUrl.filter(image => image?.toString() !== imageId)
    await businessData.save()
    return businessData
  } catch (e) {
    throw Error(`Could not delete business image, error: ${e}`)
  }
}

module.exports = {
  createBusiness,
  listBusinesses,
  getBusinessById,
  updateBusiness,
  deleteBusiness,
  countBusiness,
  getAllBusinessByInvestor,
  getBusinessByInvestor,
  getBusinessByFounder,
  getBusinessWithoutPopulate,
  createBusinessDetails,
  updateBusinessDetails,
  getBusinessDetailsByUserId,
  getBusinessCreatedByUser,
  getBusinessEmployees,
  fetchAllBizTasks,
  deleteBusinessImage
}
