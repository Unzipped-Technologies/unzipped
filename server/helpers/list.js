const list = require('../models/List')
const listItems = require('../models/ListItems')
const ListEntriesModel = require('../models/ListEntries')
const mongoose = require('mongoose')


const isDuplicateList = async (data) => {
  const listExists = await list.findOne({name: data.name, userId: data.userId});
  if (listExists) {
    throw Error(`List Name already Exist.`);
  }
  return listExists ? true : false;

}
const createLists = async data => {
  const listExists = await isDuplicateList(data);

  return await list.create(data)
}

const updateLists = async data => {
  const result = await list.find({ _id: data.listId })
  if (result && result.length > 0 && result[0].isDefault) {
    return { message: 'Default list can not be edited' }
  }

  const listObj = {
    listId: data.listId,
    userId: data.userId,
    name: data.name,
    ...(data.icon !== '' && { icon: data.icon })
  }
  
  const listExists = await isDuplicateList(data);

  return await list.findByIdAndUpdate(
    data.listId,
    {
      $set: { ...listObj }
    },
    { new: true }
  )
}

const deleteLists = async id => {
  const { isDefault } = await list.find({ _id: id })
  if (isDefault) {
    return { message: 'Default list can not be edited' }
  }
  await list.findByIdAndDelete(id)
  await listItems.deleteMany({ listId: id })
}

const addListItemToList = async (data, listId) => {
  try {
    const updateList = await list.findById(listId)
    const ids = []
    for (const item of data.items) {
      const id = await listItems.create({
        ...item
      })
      ids.push(id.id)
    }
    updateList.listItems.push(...ids.map(item => mongoose.Types.ObjectId(item.id)))
    updateList.save()
    return updateList
  } catch (e) {
    throw Error(`Something went wrong ${e}`)
  }
}

const addListEntriesToList = async (data, listId) => {
  try {
    const updateList = await list.findById(listId)

    const filter = {
      userId: data.userId,
      freelancerId: data.freelancerId,
      listId: data?.listId
    }

    const isListExist = await ListEntriesModel.findOne({
      ...filter
    })

    if (isListExist?._id) {
      throw new Error(`Freelancer already added in list!`)
    } else {
      const newEntry = await ListEntriesModel.create({
        ...data
      })
      if (updateList?.listEntries?.length) {
        updateList.listEntries.push(newEntry?._id)
      } else {
        updateList.listEntries = [newEntry?._id]
      }
      await updateList.save()
      return updateList
    }
  } catch (e) {
    throw Error(e ? e : `Something went wrong ${e}`)
  }
}

const getListById = async id => {
  try {
    return await list
      .findById(id)
      .populate({
        path: 'listItems',
        model: 'listItemss'
      })
      .exec()
  } catch (e) {
    throw Error(`Could not find user, error: ${e}`)
  }
}

// list lists
const listLists = async ({ filter, take, skip }) => {
  try {
    const lists = await list
      .find({ ...filter })
      .skip(skip)
      .limit(take)
      .populate({
        path: 'listItems',
        model: 'listItems'
      })
      .populate([
        {
          path: 'listEntries',
          model: 'listEntries',
          select: 'freelancerId name icon businessId',
          populate: [
            {
              path: 'freelancerId',
              model: 'freelancers',
              select: 'userId rate category likeTotal dislikeTotal freelancerSkills',
              populate: [
                {
                  path: 'userId',
                  model: 'users',
                  select: 'FirstName freelancerSkills LastName email profileImage AddressLineCountry'
                }
              ]
            },
            {
              path: 'businessId',
              model: 'businesses',
              select: 'name description projectImagesUrl budget likeTotal projectBudgetType requiredSkills'
            }
          ]
        }
      ])
      .exec()
    return lists
  } catch (e) {
    throw Error(`Could not find list, error: ${e}`)
  }
}

const getSingleList = async filter => {
  return await list.findOne({ ...filter })
}

const getListByUserId = async userId => await list.find({ userId, name: { $ne: 'Recently Viewed' } }).limit(10)

module.exports = {
  createLists,
  addListItemToList,
  listLists,
  getListById,
  updateLists,
  deleteLists,
  addListEntriesToList,
  getSingleList,
  getListByUserId
}
