const FreelancerModel = require('../models/Freelancer')
const InviteModel = require('../models/Invited')
const FreelancerSkillsModel = require('../models/FreelancerSkills')
const UserModel = require('../models/User')

const getFreelancerById = async id => {
  try {
    return await FreelancerModel.findById(id)
      .populate([
        {
          path: 'userId',
          select:
            'FirstName LastName FullName email updatedAt createdAt profileImage likeTotal dislikeTotal AddressLineCountry'
        },
        {
          path: 'freelancerSkills',
          model: 'freelancerskills',
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

const getAllFreelancers = async ({ filter, limit = 50, skip = 0, sort }) => {
  try {
    const regexQuery = new RegExp(filter?.searchKey, 'i')
    const existingIndexes = await FreelancerModel.collection.getIndexes()
    const existingFreelancerSkillsIndexes = await FreelancerSkillsModel.collection.getIndexes()
    const existingUserIndexes = await UserModel.collection.getIndexes()
    const indexExists = existingIndexes && 'user_1_rate_1' in existingIndexes
    const indexExistsFreelancerSkillsIndexes =
      existingFreelancerSkillsIndexes && 'skill_1' in existingFreelancerSkillsIndexes
    const indexExistsUserIndexes = existingUserIndexes && 'FullName_1' in existingUserIndexes
    if (!indexExists) {
      await FreelancerModel.collection.createIndex({ user: 1, rate: 1 })
    }
    if (!indexExistsFreelancerSkillsIndexes) {
      await FreelancerSkillsModel.collection.createIndex({ skill: 1 })
    }
    if (!indexExistsUserIndexes) {
      await UserModel.collection.createIndex({ FullName: 1 })
      await UserModel.collection.createIndex({ freelancerSkills: 1 })
    }

    const regexPatterns = filter?.skill?.map(skill => `.*${skill}.*`)
    const regexPattern = regexPatterns?.join('|')
    const limitValue = limit === 'all' ? await countFreelancers(filter) : Number(limit)
    const limitStage = limitValue > 0 ? { $limit: limitValue } : { $limit: 20 } // Ensure limit is positive

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
          from: 'freelancerskills',
          let: { freelancerSkills: '$freelancerSkills' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $in: [
                    '$_id',
                    { $cond: { if: { $isArray: '$$freelancerSkills' }, then: '$$freelancerSkills', else: [] } }
                  ]
                }
              }
            },
            {
              $project: {
                skill: 1
              }
            }
          ],
          as: 'freelancerSkills'
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

  return updateFreelancer
}

module.exports = {
  getFreelancerById,
  getAllFreelancers,
  updateFreelancer,
  deleteFreelancer,
  countFreelancers,
  addSkillsToFreelancer,
  createFreelancerInvite,
  deleteSkillFromFreelancer,
  getFreelancerWithoutPopulate
}
