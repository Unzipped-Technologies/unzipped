const MeetingModel = require('../models/Meeting')

const getAllMeetings = async () => {
  try {
    const result = await MeetingModel.find().exec()
    return result
  } catch (e) {
    throw Error(`Error: Failed to load meetings: ${e}`)
  }
}

const createMeeting = async meeting => {
  try {
    const result = await MeetingModel.create(meeting)
    return result
  } catch (e) {
    throw Error(`Error: Failed to create meeting: ${e}`)
  }
}

const updateMeeting = async meeting => {
  try {
    const result = await MeetingModel.findByIdAndUpdate(meeting._id, { $set: { ...meeting } }, { new: true })
    return result
  } catch (e) {
    throw Error(`Error: Failed to create meeting: ${e}`)
  }
}

const deleteMeeting = async meetingId => {
  try {
    const result = await MeetingModel.softDelete({ _id: meetingId })
    if (result) return { affected: 1, msg: 'Successfully deleted!' }
    return { affected: 0, msg: 'No record found!' }
  } catch (e) {
    throw Error(`Error: Failed to delete meetingId ${meetingId}, ${e}`)
  }
}

const findMeetingById = async meetingId => {
  try {
    const result = await MeetingModel.findById({ _id: meetingId })
    if (result) return result
    return { status: false, msg: 'No record found!' }
  } catch (e) {
    throw Error(`Error: Failed to delete meetingId ${meetingId}, ${e}`)
  }
}

module.exports = {
  getAllMeetings,
  createMeeting,
  updateMeeting,
  deleteMeeting,
  findMeetingById
}
