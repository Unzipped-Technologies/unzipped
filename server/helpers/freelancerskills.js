const FreelancerSkills = require('../models/FreelancerSkills')

const getAllFreelancerSkills = async () => {
  return await FreelancerSkills.aggregate([
    {
      $match: {
        skill: {
          $nin: [null, '']
        }
      }
    },
    {
      $group: {
        _id: '$skill'
      }
    },
    {
      $project: {
        _id: 1,
        skill: '$_id'
      }
    }
  ])
}

module.exports = {
  getAllFreelancerSkills
}
