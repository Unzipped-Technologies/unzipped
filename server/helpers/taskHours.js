const TaskHoursModel = require('../models/TaskHours')
const { currentPage, pageLimit, pick } = require('../../utils/pagination')

const createTaskHours = async taskHours => {
  try {
    const result = await TaskHoursModel.create(taskHours)
    return result
  } catch (e) {
    throw Error(`Error: Failed to create task hours: ${e}`)
  }
}

const createManyTaskHours = async taskHours => {
  try {
    const result = await TaskHoursModel.insertMany(taskHours)
    return { data: result }
  } catch (e) {
    throw Error(`Error: Failed to create task hours: ${e}`)
  }
}

const getAllTaskHours = async (query, user) => {
  try {
    if (user?.role === 1) req.query['userId'] = user.freelancers
    const filter = pick(query, ['userId', 'taskId'])
    const options = pick(query, ['limit', 'page', 'count'])
    let result = {}
    const total = await countTaskHours(filter)

    const limit = options.limit === 'all' ? total : pageLimit(options)

    const page = currentPage(options)
    const skip = (page - 1) * limit

    const aggregationPipeline = [
      {
        $match: { ...filter }
      },
      {
        $project: {
          taskId: 1,
          hours: 1
        }
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
                taskName: 1,
                ticketCode: 1,
                storyPoints: 1,
                priority: 1,
                description: 1,
                Status: 1,
                assignee: 1
              }
            }
          ],
          as: 'task'
        }
      },
      {
        $unwind: '$task'
      },
      {
        $lookup: {
          from: 'users',
          let: { assigneeId: '$task.assignee' },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ['$_id', '$$assigneeId'] }
              }
            },
            {
              $project: {
                FirstName: 1,
                LastName: 1,
                FullName: 1
              }
            }
          ],
          as: 'assignee.user'
        }
      },
      {
        $unwind: '$assignee.user'
      },
      { $skip: skip },
      { $limit: limit }
    ]

    const tasks = await TaskHoursModel.aggregate(aggregationPipeline).exec()
    const totalPages = Math.ceil(total / limit)

    result = {
      data: tasks,
      currentPage: page,
      limit: limit,
      totalPages: totalPages,
      totalResults: total
    }
    return result
  } catch (e) {
    throw new Error(`Could not retrieve task hours, error: ${e.message}`)
  }
}

const countTaskHours = async filter => {
  try {
    // Count tasks against provided filter and return
    return await TaskHoursModel.countDocuments(filter)
  } catch (err) {
    throw Error(`Could not count task hours, error: ${err}`)
  }
}

const updateTaskHours = async (hours, _id) => {
  try {
    const { getInvoiceWithoutPopulate } = require('./invoice')
    const taskHourData = await getTaskHoursById(_id)
    if (!taskHourData) throw Error(`Task hour not found.`)

    const invoiceData = await getInvoiceWithoutPopulate({ tasks: { $in: [_id] } })
    if (!invoiceData) throw Error(`Invoice against task hour not found.`)
    invoiceData.hoursWorked = +invoiceData?.hoursWorked + +hours

    taskHourData.hours = +hours

    await invoiceData.save()
    const result = await taskHourData.save()
    return result
  } catch (e) {
    throw Error(`Error: Failed to update task hours: ${e}`)
  }
}

const updateTaskTime = async ({ updatedAt, _id }) => {
  try {
    // Here we should last updated
    const result = await TaskHoursModel.findByIdAndUpdate(_id, { $set: { updatedAt: updatedAt } }, { new: true })
    return result
  } catch (error) {
    throw Error(`Error: Failed to update task time: ${e}`)
  }
}

const deleteTaskHours = async taskHoursId => {
  try {
    const result = await TaskHoursModel.softDelete({ _id: taskHoursId })
    if (result) return { affected: 1, msg: 'Successfully deleted!', record: result }
    return { affected: 0, msg: 'No record found!' }
  } catch (e) {
    throw Error(`Error: Failed to delete taskHoursId ${taskHoursId}, ${e}`)
  }
}

const getMultipleTaskHours = async (filter, selectedFields) => {
  try {
    const result = await TaskHoursModel.find(filter).select(selectedFields)
    return result
  } catch (e) {
    throw Error(`Error: Failed to retrieve taskHours ${taskHoursId}, ${e}`)
  }
}

const getTaskHoursById = async (id, populate = [], selectedFields = '') => {
  try {
    return await TaskHoursModel.findById(id).select(selectedFields).populate(populate).exec()
  } catch (e) {
    throw new Error(`Could not find task hours, error: ${e.message}`)
  }
}

module.exports = {
  getAllTaskHours,
  createManyTaskHours,
  createTaskHours,
  updateTaskHours,
  deleteTaskHours,
  updateTaskTime,
  getMultipleTaskHours,
  getTaskHoursById
}
