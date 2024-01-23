const FreelancerModel = require('../models/Freelancer')
const FreelancerSkillsModel = require('../models/FreelancerSkills')
const { currentPage, pageLimit, pick } = require('../../utils/pagination')

const getFreelancerById = async id => {
  try {
    return await FreelancerModel.findById(id)
      .populate([
        {
          path: 'userId',
          select: 'FirstName LastName FullName email'
        },
        {
          path: 'freelancerSkills',
          select: 'skill isActive yearsExperience'
        }
      ])
      .exec()
  } catch (e) {
    throw new Error(`Could not find freelancer, error: ${e.message}`)
  }
}

const getFreelancerWithoutPopulate = async filter => {
  try {
    return await FreelancerModel.findById(filter).exec()
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

module.exports = {
  getFreelancerById,
  getAllFreelancers,
  updateFreelancer,
  deleteFreelancer,
  countFreelancers,
  addSkillsToFreelancer,
  deleteSkillFromFreelancer,
  getFreelancerWithoutPopulate
}
