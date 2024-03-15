const FreelancerModel = require('../models/Freelancer')
const FreelancerSkillsModel = require('../models/FreelancerSkills')
const mongoose = require('mongoose')
const CloudinaryUploadHelper = require('./file')
const FileModel = require('../models/file')

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
          'FirstName LastName FullName email updatedAt createdAt profileImage likeTotal dislikeTotal AddressLineCountry role'
      },
      {
        path: 'freelancerSkills',
        select: 'skill isActive yearsExperience'
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

const getAllFreelancers = async ({ filter, take, skip, sort, minRate, maxRate, skill }) => {
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
const addSkillsToFreelancer = async (data, freelancerId) => {
  try {
    const freelancerData = await getFreelancerWithoutPopulate({ _id: freelancerId })
    if (data?.skills?.length) {
      const newSkillIds = []
      for (const item of data.skills) {
        item['freelancerId'] = freelancerId
        const id = await FreelancerSkillsModel.create({
          ...item
        })
        newSkillIds.push(id.id)
      }
      freelancerData.freelancerSkills = [...freelancerData.freelancerSkills, ...newSkillIds]
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
    const skillData = await FreelancerSkillsModel.findById(skillId)
    if (!skillData || !freelancerData?.skills?.include(skillId)) throw Error(`Skill not exist`)

    if (freelancerData?.skills?.length) {
      freelancerData.skills = freelancerData?.skills.filter(skill => skill !== skillId)
      await FreelancerSkillsModel.softDelete({ _id: skillId })
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
      freelancerData.education = [...freelancerData.education, data]
    } else {
      freelancerData['education'] = [data]
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
      freelancerData.education = freelancerData?.education.filter(education => education !== educationId)
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
      freelancerData.projects = [...freelancerData.projects, data]
    } else {
      freelancerData['projects'] = [data]
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
      freelancerData.projects = freelancerData?.projects.filter(project => project !== projectId)
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
  addSkillsToFreelancer,
  deleteSkillFromFreelancer,
  getFreelancerWithoutPopulate
}
