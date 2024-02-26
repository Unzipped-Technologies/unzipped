const EducationModel = require('../models/Education')

const geAll = async () => {
  try {
    const result = await EducationModel.find({ isDeleted: false }).exec()
    return result
  } catch (e) {
    throw Error(`Error: Failed to load education list: ${e}`)
  }
}

const create = async education => {
  try {
    const result = await EducationModel.create(education)
    return result
  } catch (e) {
    throw Error(`Error: Failed to create education: ${e}`)
  }
}

const update = async education => {
  try {
    const result = await EducationModel.findByIdAndUpdate(education._id, { $set: { ...education } }, { new: true })
    return result
  } catch (e) {
    throw Error(`Error: Failed to create education: ${e}`)
  }
}

const deleteEducation = async educationId => {
  try {
    const result = await EducationModel.findByIdAndUpdate(educationId, { $set: { isDeleted: true } })
    if (result) return { affected: 1, msg: 'Successfully deleted!' }
    return { affected: 0, msg: 'No record found!' }
  } catch (e) {
    throw Error(`Error: Failed to delete educationId ${educationId}, ${e}`)
  }
}
module.exports = {
  geAll,
  create,
  update,
  deleteEducation
}
