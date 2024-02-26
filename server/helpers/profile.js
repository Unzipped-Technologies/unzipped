const ProfileModel = require('../models/Profile')

const getAllProfiles = async () => {
  try {
    const result = await ProfileModel.find({ isDeleted: false })
      .populate({
        path: 'freelancerId',
        model: 'freelancers',
        select: '_id isActive category user',
        populate: {
          path: 'user',
          model: 'users',
          select: 'FirstName LastName email',
          populate: {
            path: 'freelancerSkills',
            model: 'freelancerSkills',
            select: '_id skill isActive yearsExperience'
          }
        }
      })
      .populate({ path: 'projects', model: 'projects', select: '-createdAt -updatedAt -__v' })
      .populate({ path: 'education', model: 'educations', select: '-createdAt -updatedAt -__v' })
      .select('-createdAt -updatedAt -__v')
      .exec()
    return result
  } catch (e) {
    throw Error(`Error: Failed to find profiles: ${e}`)
  }
}

const createProfile = async profile => {
  try {
    const result = await ProfileModel.create(profile)
    return result
  } catch (e) {
    throw Error(`Error: Failed to create profile: ${e}`)
  }
}

const updateProfile = async profile => {
  try {
    const result = await ProfileModel.findByIdAndUpdate(profile._id, { $set: { ...profile } }, { new: true })
    return result
  } catch (e) {
    throw Error(`Error: Failed to create profile: ${e}`)
  }
}

const deleteProfile = async profileId => {
  try {
    const isDeleted = await ProfileModel.findByIdAndUpdate(profileId, { $set: { isDeleted: true } }, { new: true })
    if (isDeleted) return { affected: 1, msg: 'Successfully deleted profile!' }
    return { affected: 0, msg: 'No profile found!' }
  } catch (e) {
    throw Error(`Error: Failed to delete profileId ${profileId}, ${e}`)
  }
}
module.exports = {
  getAllProfiles,
  createProfile,
  updateProfile,
  deleteProfile
}
