const FreelancerModel = require('../models/Freelancer')
const InviteModel = require('../models/Invited')
const CloudinaryUploadHelper = require('./file')
const FileModel = require('../models/file')
const UserModel = require('../models/User')
const Mailer = require('../../services/Mailer')
const keys = require('../../config/keys')
const listHelper = require('./list')
const listEntriesHelper = require('./listEntriesHelper')
const mongoose = require('mongoose')

const getFreelancerById = async id => {
  try {
    return await FreelancerModel.findById(id).populate([
      {
        path: 'projects',
        populate: {
          path: 'images',
          select: ''
        }
      },
      {
        path: 'userId',
        select:
          'FirstName LastName FullName calendarSettings email updatedAt createdAt profileImage likeTotal dislikeTotal AddressLineCountry role isIdentityVerified isEmailVerified isPhoneVerified'
      }
    ])
  } catch (e) {
    throw new Error(`Could not find freelancer, error: ${e.message}`)
  }
}

const getFreelancerWithoutPopulate = async filter => {
  try {
    return await FreelancerModel.findOne(filter).exec()
  } catch (e) {
    throw new Error(`Could not find freelancer, error: ${e.message}`)
  }
}

const getAllFreelancers = async ({ filter, sort }, limit = 20, skip = 0) => {
  try {
    const regexQuery = new RegExp(filter?.searchKey, 'i')
    const existingIndexes = await FreelancerModel.collection.getIndexes()

    const existingUserIndexes = await UserModel?.collection?.getIndexes()

    const indexExists = existingIndexes && 'user_1_rate_1' in existingIndexes

    const indexExistsUserIndexes = existingUserIndexes && 'FullName_1' in existingUserIndexes
    if (!indexExists) {
      await FreelancerModel.collection.createIndex({ user: 1, rate: 1 })
    }

    if (!indexExistsUserIndexes) {
      await UserModel.collection.createIndex({ FullName: 1 })
      await UserModel.collection.createIndex({ freelancerSkills: 1 })
    }

    const regexPatterns = Array.isArray(filter?.skill)
      ? filter?.skill?.map(skill => `.*${skill}.*`)
      : [`.*${filter?.skill}.*`]
    const regexPattern = regexPatterns?.join('|')
    const limitValue = limit === 'all' ? await countFreelancers(filter) : Number(limit)
    const limitStage = limitValue > 0 ? { $limit: limitValue } : { $limit: 20 }
    const ID = mongoose.Types.ObjectId(filter.businessId)

    const aggregationPipeline = [
      {
        $project: {
          userId: 1,
          rate: 1,
          category: 1,
          cover: 1,
          isPreferedFreelancer: 1,
          freelancerSkills: 1,
          likeTotal: 1,
          dislikeTotal: 1,
          invites: 1
        }
      },
      {
        $lookup: {
          from: 'contracts',
          let: { freelancerId: '$_id', businessId: ID },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [{ $eq: ['$freelancerId', '$$freelancerId'] }, { $eq: ['$businessId', '$$businessId'] }]
                }
              }
            }
          ],
          as: 'contracts'
        }
      },
      {
        $match: {
          contracts: { $eq: [] } // Filter freelancers with no contracts
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
                profileImage: 1,
                AddressLineCountry: 1
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
          from: 'invites',
          let: { invites: '$invites' },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ['$_id', '$$invites'] }
              }
            },
            {
              $project: {
                business: 1
              }
            }
          ],
          as: 'invites'
        }
      },
      {
        $unwind: {
          path: '$invites',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $match: {
          ...(filter?.minRate &&
            +filter?.minRate > 0 && {
              rate: { $gte: +filter?.minRate }
            }),
          ...(filter?.maxRate &&
            +filter?.maxRate > 0 && {
              rate: { $lte: +filter?.maxRate }
            }),
          ...(filter?.skill?.length > 0
            ? {
                freelancerSkills: {
                  $elemMatch: {
                    skill: { $regex: new RegExp(regexPattern, 'i') }
                  }
                }
              }
            : {}),
          'user.FullName': { $regex: regexQuery }
        }
      },
      {
        $sort: {
          ...(filter?.sort &&
            filter?.sort === 'highest_hourly_rate' && {
              rate: -1
            }),
          ...(filter?.sort &&
            filter?.sort === 'lowest_hourly_rate' && {
              rate: 1
            }),
          ...(filter?.sort &&
            filter?.sort === 'most_reviews' && {
              likeTotal: -1
            }),
          ...(filter?.sort &&
            filter?.sort === 'recomended' && {
              isPreferedFreelancer: -1
            }),
          ...(filter?.sort &&
            filter?.sort === 'most_relavent' && {
              isPreferedFreelancer: -1
            }),
          createdAt: 1
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
      },
      {
        $addFields: {
          totalCount: { $arrayElemAt: ['$totalCount.count', 0] }
        }
      }
    ]

    const list = await FreelancerModel.aggregate(aggregationPipeline).exec()
    return list[0]
  } catch (e) {
    throw Error(`Could not find user, error: ${e}`)
  }
}

const updateFreelancer = async (id, data) => {
  try {
    const updatedFreelancer = await FreelancerModel.findByIdAndUpdate(id, { $set: data }, { new: true })
    return updatedFreelancer
  } catch (e) {
    throw new Error(`Could not update freelancer, error: ${e.message}`)
  }
}

const deleteFreelancer = async id => {
  try {
    return await FreelancerModel.softDelete({ _id: id })
  } catch (e) {
    throw new Error(`Could not delete freelancer, error: ${e.message}`)
  }
}

const countFreelancers = async filters => {
  try {
    const count = await FreelancerModel.countDocuments(filters)
    return count
  } catch (e) {
    throw new Error(`Could not count freelancers, error: ${e.message}`)
  }
}

// add skills to freelancer
const updateFreelancerSkills = async (skills, freelancerId) => {
  try {
    const freelancerData = await getFreelancerWithoutPopulate({ _id: freelancerId })

    if (skills?.length) {
      if (freelancerData?.freelancerSkills?.length) {
        freelancerData.freelancerSkills = [...freelancerData.freelancerSkills, ...skills]
      } else {
        freelancerData['freelancerSkills'] = [...skills]
      }
    }
    await freelancerData.save()
    return freelancerData
  } catch (e) {
    throw Error(`Something went wrong ${e}`)
  }
}

// delete skill from freelancer
const deleteSkillFromFreelancer = async (skillId, freelancerId) => {
  try {
    const freelancerData = await getFreelancerWithoutPopulate({ _id: freelancerId })
    if (!freelancerData) throw Error(`Freelancer not found.`)

    if (freelancerData?.freelancerSkills?.length) {
      freelancerData.freelancerSkills = freelancerData?.freelancerSkills.filter(
        skill => skill?._id?.toString() !== skillId
      )

      await freelancerData.save()
    }

    return freelancerData
  } catch (e) {
    throw Error(`Something went wrong ${e}`)
  }
}

const addEducation = async (data, freelancerId) => {
  try {
    const freelancerData = await getFreelancerWithoutPopulate({ _id: freelancerId })

    if (freelancerData?.education?.length >= 3) throw new Error('You can only create three degrees.')

    if (freelancerData?.education?.length) {
      if (data?.educationId) {
        const EduIndex = freelancerData?.education.findIndex(
          education => education?._id?.toString() === data.educationId
        )
        if (EduIndex !== -1 && freelancerData.education[EduIndex]) {
          delete data['educationId']
          freelancerData.education[EduIndex] = { ...data }
        } else {
          throw new Error('No education record found.')
        }
      } else {
        freelancerData.education = [...freelancerData.education, data]
      }
    } else {
      if (!data?.educationId) {
        freelancerData['education'] = [data]
      }
    }
    await freelancerData.save()
    return freelancerData
  } catch (e) {
    throw Error(`Something went wrong ${e}`)
  }
}

const deleteEducation = async (educationId, freelancerId) => {
  try {
    const freelancerData = await getFreelancerWithoutPopulate({ _id: freelancerId })
    if (!freelancerData) throw Error(`Freelancer not found.`)

    if (freelancerData?.education?.length) {
      freelancerData.education = freelancerData?.education.filter(
        education => education?._id?.toString() !== educationId
      )
      await freelancerData.save()
    }
    return freelancerData
  } catch (e) {
    throw Error(`Something went wrong ${e}`)
  }
}

const createShowCaseProject = async (data, freelancerId, userId, files) => {
  try {
    const { getFreelancerWithoutPopulate } = require('./freelancer')

    const freelancerData = await getFreelancerWithoutPopulate({ _id: freelancerId })
    if (!freelancerData) throw new Error('Invalid freelancer ID.')

    if (freelancerData?.projects?.length >= 3) throw new Error('You can only create three projects.')

    // upload file to cloudinary platform
    const uploadResult = await CloudinaryUploadHelper.createFile(files, userId)
    let cloudinaryIds = []
    if (uploadResult && uploadResult.length > 0) {
      cloudinaryIds = uploadResult.map(elem => elem._id)
      data['images'] = cloudinaryIds
    }

    if (freelancerData?.projects?.length) {
      if (data?.projectId) {
        const ProIndex = freelancerData?.projects.findIndex(project => project?._id?.toString() === data.projectId)
        if (ProIndex !== -1 && freelancerData.projects[ProIndex]) {
          delete data['projectId']
          freelancerData.projects[ProIndex] = { ...data }
        } else {
          throw new Error('No Project found.')
        }
      } else {
        freelancerData.projects = [...freelancerData.projects, data]
      }
    } else {
      if (!data?.projectId) {
        freelancerData['projects'] = [data]
      }
    }
    await freelancerData.save()

    return freelancerData
  } catch (e) {
    throw new Error(`Something went wrong: ${e.message}`)
  }
}

const deleteShowCaseProject = async (freelancerId, projectId) => {
  try {
    const freelancerData = await getFreelancerWithoutPopulate({ _id: freelancerId })
    if (!freelancerData) throw Error(`Freelancer not found.`)

    if (freelancerData?.projects?.length) {
      freelancerData.projects = freelancerData?.projects.filter(project => project?._id?.toString() !== projectId)
      await freelancerData.save()
    }
    return freelancerData
  } catch (e) {
    throw new Error(`Could not delete project, error: ${e.message}`)
  }
}

const deleteProjectImage = async (projectId, imageId, freelancerId) => {
  try {
    const freelancerData = await getFreelancerWithoutPopulate({ _id: freelancerId })
    const projectIndex = freelancerData?.projects?.findIndex(project => project._id !== projectId)
    if (projectIndex === -1) throw new Error(`Project not exist.`)

    if (!freelancerData?.projects[projectIndex]?.images.includes(imageId))
      throw new Error(`Image not exist in this project.`)

    const imageData = await FileModel.findById(imageId)
    if (!imageData) throw new Error(`Image not exist.`)
    await CloudinaryUploadHelper.deleteFile(imageData?.cloudinaryId)

    await FileModel.findByIdAndDelete(imageId)

    freelancerData.projects[projectIndex].images = freelancerData?.projects[projectIndex]?.images.filter(
      image => image !== imageId
    )

    await freelancerData.save()

    return {
      msg: 'Image deleted successfully'
    }
  } catch (e) {
    throw new Error(`Could not delete image, error: ${e.message}`)
  }
}

const createFreelancerInvite = async params => {
  const createInvite = await InviteModel.create(params)
  const updateFreelancer = await FreelancerModel.findByIdAndUpdate(
    params.freelancer,
    {
      $set: {
        invites: createInvite._doc._id
      }
    },
    { new: true }
  )
  if (updateFreelancer) {
    sendProjectInvitationEmail(createInvite._id)
  }
  const listData = await listHelper.getSingleList({
    name: 'Invites',
    user: params.userInvited
  })
  const ListEntry = {
    name: 'Invites',
    icon: 'TeamOutlined',
    listId: null,
    userId: params?.userInvited,
    freelancerId: params?.freelancer,
    businessId: params?.business,
    isPrivate: true,
    isDefaultList: false
  }
  if (!listData) {
    const newList = await listHelper.createLists({
      name: 'Invites',
      icon: 'TeamOutlined',
      userId: params.userInvited,
      user: params.userInvited,
      isDefault: false,
      listEntries: [],
      isPrivate: true
    })
    ListEntry.listId = newList?._id
    const listEntry = await listEntriesHelper.createListEntries(ListEntry)
    newList['listEntries'] = [listEntry?._id]
    await newList.save()
  } else {
    ListEntry.listId = listData?._id

    const listEntry = await listEntriesHelper.createListEntries(ListEntry)
    listData['listEntries'] = [...listData['listEntries'], listEntry?._id]
    await listData.save()
  }

  return updateFreelancer
}

const sendProjectInvitationEmail = async inviteId => {
  const inviteInfo = await InviteModel.findById(inviteId).populate([
    {
      path: 'business',
      model: 'businesses',
      select: 'name requiredSkills'
    },
    {
      path: 'userInvited',
      model: 'users',
      select: 'FirstName LastName email'
    },
    {
      path: 'freelancer',
      model: 'freelancers',
      populate: {
        path: 'userId',
        model: 'users',
        select: 'FirstName LastName email'
      },
      select: 'userId'
    }
  ])

  const inviteEmailObj = {
    to: inviteInfo?.freelancer?.userId?.email,
    templateId: 'd-ab58179c407a4e17be18ffbe81ef0fce',
    dynamicTemplateData: {
      firstName: inviteInfo?.freelancer?.userId?.FirstName ?? '',
      lastName: inviteInfo?.freelancer?.userId?.LastName ?? '',
      loginLink: `${keys.redirectDomain}/login`,
      supportLink: `${keys.redirectDomain}/wiki/getting-started`,
      projectName: inviteInfo?.business?.name,
      clientName: inviteInfo?.userInvited?.FirstName + ' ' + inviteInfo?.userInvited?.LastName,
      duration: inviteInfo?.duration ?? '-',
      skills: inviteInfo?.business?.requiredSkills
    }
  }

  await Mailer.sendInviteMail(inviteEmailObj)
  return inviteEmailObj
}

const handleLike = async payload => {
  const UserID = mongoose.Types.ObjectId(payload.userId)

  const UserData = await UserModel.findById(payload.userId)
  if (!UserData && UserData?.role !== 1) throw new Error(`Unauthorized!`)

  const FreelancerData = await FreelancerModel.findById(payload.freelancerId)
  if (!FreelancerData) throw new Error(`Freelancer not found!`)

  if (FreelancerData?.dislikes?.includes(UserID)) {
    FreelancerData.dislikes = FreelancerData?.dislikes?.filter(like => like?.toString() !== payload.userId) ?? []
  }

  if (!FreelancerData?.likes?.includes(UserID)) {
    if (Array.isArray(FreelancerData?.likes) && FreelancerData?.likes?.length) {
      FreelancerData.likes = [...FreelancerData?.likes, payload.userId]
    } else {
      FreelancerData['likes'] = [payload.userId]
    }
  }

  await FreelancerData.save()
  return { likes: FreelancerData.likes, dislikes: FreelancerData.dislikes }
}

const handleDisLike = async payload => {
  const UserID = mongoose.Types.ObjectId(payload.userId)

  const UserData = await UserModel.findById(payload.userId)
  if (!UserData && UserData?.role !== 1) throw new Error(`Unauthorized!`)

  const FreelancerData = await FreelancerModel.findById(payload.freelancerId)
  if (!FreelancerData) throw new Error(`Freelancer not found!`)

  if (FreelancerData?.likes?.includes(UserID)) {
    FreelancerData.likes = FreelancerData?.likes?.filter(like => like?.toString() !== payload.userId) ?? []
  }
  if (!FreelancerData?.dislikes?.includes(UserID)) {
    if (Array.isArray(FreelancerData?.dislikes) && FreelancerData?.dislikes?.length) {
      FreelancerData.dislikes = [...FreelancerData?.dislikes, payload.userId]
    } else {
      FreelancerData['dislikes'] = [payload.userId]
    }
  }

  await FreelancerData.save()
  return { likes: FreelancerData.likes, dislikes: FreelancerData.dislikes }
}

module.exports = {
  getFreelancerById,
  getAllFreelancers,
  updateFreelancer,
  deleteFreelancer,
  countFreelancers,
  addEducation,
  createShowCaseProject,
  deleteShowCaseProject,
  deleteProjectImage,
  deleteEducation,
  updateFreelancerSkills,
  createFreelancerInvite,
  deleteSkillFromFreelancer,
  getFreelancerWithoutPopulate,
  sendProjectInvitationEmail,
  handleLike,
  handleDisLike
}
