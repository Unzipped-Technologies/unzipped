const mongoose = require('mongoose')
const ListModel = require('../models/List')
const ContractModel = require('../models/Contract')
const ListEntriesModel = require('../models/ListEntries')
const FreelancerModel = require('../models/Freelancer')
const ListHelper = require('../helpers/list')
const { filter } = require('lodash')

const getAllListEntries = async (id, filters) => {
  let page = 1
  let pageSize = 10

  if (filters?.page) {
    page = parseInt(filters.page)
  }
  if (filters?.pageSize) {
    pageSize = parseInt(filters.pageSize)
  }

  const totalCounts = await ListEntriesModel.countDocuments()

  const listEntries = await ListEntriesModel.find({ userId: id })
    .populate({
      path: 'freelancerId',
      model: 'freelancers'
    })
    .populate({
      path: 'userId',
      model: 'users'
    })
    .populate({
      path: 'listId',
      model: 'lists'
    })
    .skip((page - 1) * pageSize)
    .limit(pageSize)

  return { totalCounts, listEntries }

  return { totalCounts, listEntries }
}

const createListEntries = async params => await ListEntriesModel.create(params)

const editListEntries = async (listEntryId, listObj) => {
  const { isDefault } = await isDefaultList(listObj.listId)
  if (isDefault) {
    return { message: 'Default list can not be edited' }
  } else {
    return await ListEntriesModel.findByIdAndUpdate(
      listEntryId,
      {
        $set: {
          ...listObj
        }
      },
      { new: true }
    )
  }
}

const deleteListEntry = async listId => {
  const result = await isDefaultList(listId)
  if (result && result.length > 0 && result[0].isDefault) {
    return { message: 'Default list can not be deleted' }
  } else {
    await ListHelper.deleteLists(listId)
    const listIds = await ListEntriesModel.find({ listId })
    if (listIds) {
      const ids = listIds.map(list => list._id)
      const affectedRows = await ListEntriesModel.deleteMany({ listId: { $in: ids } })
      return affectedRows
    }
  }
}

const updateUserLists = async params => {
  const listItems = await ListModel.find({ userId: params }).sort({ createdAt: -1 })
  const priorityNames = ['favorites', 'my team', 'recently viewed']

  const transformedListItems = listItems.sort((a, b) => {
    const aPriority = priorityNames.indexOf(a.name.toLowerCase())
    const bPriority = priorityNames.indexOf(b.name.toLowerCase())

    if (aPriority > -1 && bPriority > -1) {
      return aPriority - bPriority
    } else if (aPriority > -1) {
      return -1
    } else if (bPriority > -1) {
      return 1
    }

    return 0
  })
  return transformedListItems
}

const isDefaultList = async params => {
  return await ListModel.find({ _id: params })
}

const findListEntriesById = async id => {
  let entries = await ListEntriesModel.find({ listId: id })
    .populate({
      path: 'freelancerId',
      model: 'freelancers',
      select: 'category rate likeTotal freelancerSkills',
      populate: [
        {
          path: 'userId',
          model: 'users',
          select: 'FirstName freelancerSkills LastName profileImage AddressLineCountry',
          match: {
            $or: [{ FirstName: { $ne: null, $ne: '' } }, { LastName: { $ne: null, $ne: '' } }]
          }
        }
      ]
    })
    .sort({ createdAt: -1 })

  return entries
}

const getAllteamMembers = async id => {
  return await ContractModel.find({
    userId: mongoose.Types.ObjectId(id),
    isOfferAccepted: true
  }).populate({
    path: 'freelancerId',
    model: 'freelancers',
    select: 'category rate _id likeTotal',
    populate: [
      {
        path: 'user',
        model: 'users',
        select: 'FirstName freelancerSkills LastName profileImage AddressLineCountry _id'
      }
    ]
  })
}

const getRecentlyViewedProfile = async params => {
  const userList = await ListModel.find()
  return userList
}

const createRecentlyViewdRecod = async params => {
  const isExistingRecord = await ListEntriesModel.find({
    listId: params.listId,
    freelancerId: params.freelancerId
  })
  if (isExistingRecord && isExistingRecord.length > 0) {
    return { message: 'Record Already Exists' }
  }
  const freelancer = await FreelancerModel.find({
    _id: mongoose.Types.ObjectId(params.freelancerId)
  })
  if (freelancer && freelancer.length > 0) {
    let listEntryObj = {
      userId: freelancer[0].userId,
      freelancerId: params.freelancerId,
      listId: params.listId
    }
    const listEntity = await ListEntriesModel.create(listEntryObj)
    return listEntity
  }
}

const getUserListEntries = async ({ filter }) => {
  try {
    const response = await ListEntriesModel.find({ ...filter })
      .populate([
        {
          path: 'businessId',
          model: 'businesses',
          select: 'name description projectImagesUrl budgetRange likeTotal projectBudgetType requiredSkills',
          populate: {
            path: 'projectImagesUrl',
            model: 'file',
            select: 'url'
          }
        }
      ])
      .exec()
    return response
  } catch (err) {
    throw Error(`Could not find list, error: ${err}`)
  }
}

const getSingleListEntry = async filter => {
  try {
    const response = await ListEntriesModel.findOne({ ...filter })
    return response
  } catch (err) {
    throw Error(`Could not find list entry, error: ${err}`)
  }
}

module.exports = {
  createListEntries,
  deleteListEntry,
  getAllListEntries,
  editListEntries,
  updateUserLists,
  findListEntriesById,
  getAllteamMembers,
  getUserListEntries,
  getRecentlyViewedProfile,
  createRecentlyViewdRecod,
  getSingleListEntry
}
