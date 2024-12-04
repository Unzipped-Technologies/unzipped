const departmentHelper = require('./department')
const tagHelper = require('./task')
const TagModel = require('../models/tags')
const DepartmentModel = require('../models/Department')
const TaskModel = require('../models/Task')

const { currentPage, pageLimit, pick } = require('../../utils/pagination')

const createTag = async data => {
  try {
    // Check whether the department against departmentId exist OR not
    const departmentData = await departmentHelper.getDepartmentWithoutPopulate({ _id: data.departmentId })
    if (!departmentData) throw new Error(`Department not exist.`)

    // Create new tag
    const tagExits = await TagModel.findOne({ tagName: data.tagName, departmentId: data.departmentId });
    if (tagExits) {
      throw Error(`Tag Name already Exists.`);
    }
    const tagEntity = await TagModel.create(data)
    await DepartmentModel.findByIdAndUpdate({_id: data.departmentId}, {$push: { tags: tagEntity._id }})
    return { message: 'Tag created successfully.' }
  } catch (err) {
    throw Error(`Could not create tag, error: ${err}`)
  }
}

// list tags
const getAllTags = async query => {
  try {
    const filter = pick(query, ['taskId', 'tagName', 'departmentId'])
    const options = pick(query, ['limit', 'page', 'count'])
    let result = {}
    const total = await countTags(filter)

    const limit = options.limit === 'all' ? total : pageLimit(options)

    const page = currentPage(options)
    const skip = (page - 1) * limit
    const aggregationPipeline = [
      {
        $match: { ...filter }
      },
      {
        $lookup: {
          from: 'departments',
          let: { departmentId: '$departmentId' },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ['$_id', '$$departmentId'] }
              }
            },
            {
              $project: {
                name: 1,
                businessId: 1
              }
            }
          ],
          as: 'department'
        }
      },
      {
        $unwind: '$department'
      },
      {
        $lookup: {
          from: 'tasks',
          let: { taskId: '$taskId' },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ['$_id', '$$taskId'] }
              }
            },
            {
              $project: {
                taskName: 1
              }
            }
          ],
          as: 'task'
        }
      },
      {
        $unwind: '$task'
      },
      { $skip: skip },
      { $limit: limit }
    ]

    const tags = await TagModel.aggregate(aggregationPipeline).exec()
    const totalPages = Math.ceil(total / limit)

    result = {
      data: tags,
      currentPage: page,
      limit: limit,
      totalPages: totalPages,
      totalResults: total
    }
    return result
  } catch (e) {
    throw new Error(`Could not retrieve tags, error: ${e.message}`)
  }
}

const countTags = async filter => {
  try {
    // Count tags against provided filter and return
    return await TagModel.countDocuments(filter)
  } catch (err) {
    throw Error(`Could not count tags, error: ${err}`)
  }
}

const updateTag = async (data, tagId) => {
  try {
    //   Update the task against tagId and return updated document
    const updatedTag = await TagModel.findByIdAndUpdate(tagId, { $set: { ...data } },{ new: true })
    await TaskModel.updateMany({ tag: tagId }, { $set: { status: data.tagName } });
    return updatedTag
  } catch (err) {
    throw Error(`Could not update tag, error: ${err}`)
  }
}

const getTagById = async tagId => {
  try {
    //   Get task against tag ID and return
    const task = await TagModel.findByIdAndUpdate(tagId, { $set: { isSelected: true } }).populate([
      {
        path: 'departmentId',
        select: 'name'
      },
      {
        path: 'taskId',
        select: 'taskName'
      }
    ])
    return task
  } catch (e) {
    throw Error(`Could not find tag, error: ${e}`)
  }
}

const deleteTag = async tagId => {
  try {
    const deptId = await TagModel.findById(tagId).select('departmentId')
    const todoTag = await TagModel.findOne({ tagName: 'To Do', departmentId: deptId.departmentId })
    const deletedTag = await TagModel.findByIdAndDelete({ _id: tagId })
    await TaskModel.updateMany({ tag: tagId }, { $set: { status: "To Do" ,tag: todoTag._id} });
    await DepartmentModel.updateMany({ tags: tagId }, { $pull: { tags: tagId } });
    return deletedTag
  } catch (e) {
    throw new Error(`Could not delete tag, error: ${e.message}`)
  }
}

const getTagsWithoutPopulate = async (filter, selectedFields = '') => {
  try {
    return await TagModel.findOne(filter).select(selectedFields)
  } catch (e) {
    throw new Error(`Could not retrieve contracts, error: ${e.message}`)
  }
}

module.exports = {
  createTag,
  getAllTags,
  countTags,
  updateTag,
  getTagById,
  deleteTag,
  getTagsWithoutPopulate
}
