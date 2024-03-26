const bcrypt = require('bcryptjs')
const UserModel = require('../models/User')
const EmailModel = require('../models/email')
const ThirdPartyApplicationModel = require('../models/ThirdPartyApplications')

const isExistingUser = async (params, isFindById) => {
  if (isFindById) {
    return await UserModel.findById(params).select('-password')
  }
  return await UserModel.findOne({ email: params }).select('-password')
}

const verifyUser = async id => {
  return UserModel.findByIdAndUpdate(id, { $set: { isEmailVerified: true } })
}

const modifyExistingUser = async (params, isSetEmail) => {
  if (isSetEmail) {
    return await UserModel.updateOne({ _id: params.id }, { $set: { email: params.mail } })
  }

  return await UserModel.updateOne({ email: params._doc.email }, { $set: { emailVerified: true } })
}

const isExistingMail = async params => {
  return await EmailModel.findOne({ email: params })
}

const createMail = async (email, firstName, lastName) => {
  return await EmailModel.create({ email, firstName, lastName })
}

const updateUsersGithubDetails = async id => {
  return await UserModel.findByIdAndUpdate(id, { $set: { isGithubConnected: true } })
}

const addThirdPartyAppDetails = async params => {
  const thirdPartyCredentials = await ThirdPartyApplicationModel.create(params)
  if (thirdPartyCredentials) {
    await UserModel.findByIdAndUpdate(params.userId, { $set: { thirdPartyCredentials: thirdPartyCredentials.id } })
  }
}

const bcryptAndHashing = async password => {
  const salt = await bcrypt.genSalt(10)
  if (!salt) throw Error('Something went wrong with bcrypt')

  const hash = await bcrypt.hash(password, salt)
  if (!hash) throw Error('Something went wrong hashing the password')
  return hash
}

const passwordComparing = async (email, password) => {
  const userEntity = await UserModel.findOne({ email: email })
  return await bcrypt.compare(password, userEntity.password)
}

module.exports = {
  isExistingUser,
  verifyUser,
  modifyExistingUser,
  isExistingMail,
  createMail,
  updateUsersGithubDetails,
  addThirdPartyAppDetails,
  bcryptAndHashing,
  passwordComparing
}
