const CalenderModel = require('../models/CalenderSettings')
const UserModel = require('../models/User')

const createCalender = async params => {
  const userData = await UserModel.findOne({ _id: params?.userId })
  if (!userData) throw new Error(`User Not Found`)

  let calendarData = await CalenderModel.findOne({ userId: params?.userId })
  if (calendarData) {
    calendarData = await CalenderModel.findByIdAndUpdate(calendarData?._id, { $set: params }, { new: true })
  } else {
    calendarData = await CalenderModel.create(params)
  }
  return calendarData
}

const getCalender = async userId => {
  try {
    const response = await CalenderModel.findOne({ userId: userId })
    return response
  } catch (e) {
    throw new Error(`Could not retrieve calender settings, error: ${e.message}`)
  }
}

module.exports = {
  createCalender,
  getCalender
}
