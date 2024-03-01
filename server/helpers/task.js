const mongoose = require('mongoose')

const file = require('../helpers/file')
const TaskModel = require('../models/Task')
const DepartmentModel = require('../models/Department')
const contractHelper = require('./contract')
const { currentPage, pageLimit, pick } = require('../../utils/pagination')

const createTask = async data => {
  try {
    const { getBusinessWithoutPopulate } = require('./business')
    const { getDepartmentWithoutPopulate } = require('./department')
    const { getTagsWithoutPopulate } = require('./tags')
    // Check whether the department against departmentId exist OR not
    const departmentData = await getDepartmentWithoutPopulate({ _id: data.departmentId }, '')
    if (!departmentData) throw new Error(`Department not exist.`)

    // Check whether the business against businessId exist OR not
    const businessData = await getBusinessWithoutPopulate(departmentData.businessId, 'businessCode')
    if (!businessData) throw new Error(`Business not exist.`)

    const tagData = await getTagsWithoutPopulate({ _id: data.tag }, '')
    if (!tagData) throw new Error(`Invalid tag Id.`)

    if (data?.tags?.length > 5) throw new Error(`Tags cannot have more than 5 elements.`)

    if (data.assignee) {
      // Check whether the assigne has a contract or not
      const contractData = await contractHelper.getContractWithoutPopulate({
        businessId: departmentData.businessId,
        freelancerId: data.assignee
      })
      if (!contractData) {
        throw new Error(`Selected assignee has not any contract in this business.`)
      }
    }

    // Get count of current business tasks
    const totalBusinessTasks = await countTasks({ businessId: departmentData.businessId })
    data.ticketCode = `${businessData.businessCode.replace(' ', '')}-${totalBusinessTasks + 1}`

    // Create new tasks
    const newTask = await TaskModel.create(data)

    // Push tasks to tasks array of department model
    if (departmentData.tasks) {
      departmentData?.tasks.push(newTask._id)
    } else {
      departmentData['tasks'] = newTask._id
    }

    // Save department model after made changes
    await departmentData.save()
    return { message: 'Task created successfully.' }
  } catch (err) {
    throw Error(`Could not create task, error: ${err}`)
  }
}

const createManyTask = async (tasks, freelancerId = null) => {
  try {
    const { getBusinessWithoutPopulate } = require('./business')
    const { getDepartmentWithoutPopulate } = require('./department')
    const { getContractWithoutPopulate } = require('./contract')
    const { getTagsWithoutPopulate } = require('./tags')
    // Check whether the department against departmentId exist OR not
    const freelancerContracts = await getContractWithoutPopulate(
      { businessId: tasks[0].businessId, freelancerId: freelancerId },
      ''
    )
    if (freelancerContracts) {
      // Check whether the department against departmentId exist OR not
      const departmentData = await getDepartmentWithoutPopulate({ _id: freelancerContracts?.departmentId }, '')
      const tagData = await getTagsWithoutPopulate(
        { departmentId: freelancerContracts?.departmentId, tagName: 'To Do' },
        ''
      )
      // Get count of current business tasks
      const totalBusinessTasks = await countTasks({ businessId: tasks[0].businessId })
      let count = 0
      for (var task of tasks) {
        count = count + 1
        // Check whether the business against businessId exist OR not
        const businessData = await getBusinessWithoutPopulate(task.businessId, 'businessCode')
        if (!businessData) throw new Error(`Business not exist.`)
        task['assignee'] = freelancerId
        task['departmentId'] = freelancerContracts?.departmentId
        task['tag'] = tagData?._id
        task['ticketCode'] = `${businessData.businessCode.replace(' ', '')}-${totalBusinessTasks + count}`
      }
      // Create new tasks
      const newTasks = await TaskModel.insertMany(tasks)

      const newTasksIds = newTasks.map(task => task?._id)
      // Push tasks to tasks array of department model
      if (departmentData?.tasks?.length) {
        departmentData.tasks = [...departmentData?.tasks, ...newTasksIds]
      } else {
        departmentData['tasks'] = newTasksIds
      }
      // Save department model after made changes
      await departmentData.save()
      return { message: 'Tasks created successfully.', data: newTasks }
    } else {
      throw Error(`You do not have any contract against this business.`)
    }
  } catch (err) {
    throw Error(`Could not create task, error: ${err}`)
  }
}

// list tasks
const getAllTasks = async query => {
  try {
    const filter = pick(query, ['businessId', 'ticketCode', 'taskName', 'assignee', 'departmentId'])
    const options = pick(query, ['limit', 'page', 'count'])
    let result = {}
    const total = await countTasks(filter)

    let limit = options.limit === 'all' ? total : pageLimit(options)
    limit = limit == 0 ? 10 : limit

    const page = currentPage(options)
    const skip = (page - 1) * limit
    const aggregationPipeline = [
      {
        $match: { ...filter }
      },
      {
        $project: {
          _id: 1,
          taskName: 1,
          departmentId: 1,
          assignee: 1,
          storyPoints: 1
        }
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
          from: 'freelancers',
          let: { assignee: '$assignee' },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ['$_id', '$$assignee'] }
              }
            },
            {
              $project: {
                userId: 1
              }
            }
          ],
          as: 'assigneeData'
        }
      },
      {
        $unwind: '$assigneeData'
      },
      {
        $lookup: {
          from: 'users',
          let: { userId: '$assigneeData.userId' },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ['$_id', '$$userId'] }
              }
            },
            {
              $project: {
                FirstName: 1,
                LastName: 1,
                FullName: 1,
                profileImage: 1
              }
            }
          ],
          as: 'assigneeData.user'
        }
      },
      {
        $unwind: '$assigneeData.user'
      },
      {
        $lookup: {
          from: 'businesses',
          let: { businessId: '$department.businessId' },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ['$_id', '$$businessId'] }
              }
            },
            {
              $project: {
                name: 1
              }
            }
          ],
          as: 'business'
        }
      },
      {
        $unwind: '$business'
      },
      {
        $lookup: {
          from: 'taskhours',
          let: { taskId: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ['$taskId', '$$taskId'] }
              }
            },
            {
              $project: {
                hours: 1,
                taskId: 1
              }
            }
          ],
          as: 'taskHours'
        }
      },
      { $skip: skip },
      { $limit: limit }
    ]

    const tasks = await TaskModel.aggregate(aggregationPipeline).exec()
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
    throw new Error(`Could not retrieve tasks, error: ${e.message}`)
  }
}

const countTasks = async filter => {
  try {
    // Count tasks against provided filter and return
    return await TaskModel.countDocuments(filter)
  } catch (err) {
    throw Error(`Could not count tasks, error: ${err}`)
  }
}

const updateTask = async (taskId, data) => {
  try {
    const { getTagsWithoutPopulate } = require('./tags')

    if (data?.tags?.length > 5) throw new Error(`Tags cannot have more than 5 elements.`)

    const tagData = await getTagsWithoutPopulate({ _id: data.tag }, '')
    if (!tagData) throw new Error(`Invalid tag Id.`)

    const taskData = await getTaskWithoutPopulate({ _id: taskId })
    if (!taskData) throw Error(`Error: Failed to add comment`)
    let ticketComments = taskData.comments || []
    if (data?.comments?.length) {
      ticketComments = [...taskData.comments, ...data.comments]
    }
    await Object.assign(taskData, data)
    taskData.comments = ticketComments
    await taskData.save()
    return { message: 'Task updated successfully.' }
  } catch (err) {
    throw Error(`Could not update task, error: ${err}`)
  }
}

const getTaskById = async taskId => {
  try {
    const aggregate = [
      {
        $match: {
          _id: mongoose.Types.ObjectId(taskId)
        }
      },
      {
        $project: {
          __v: 0
        }
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
                tags: 1,
                name: 1,
                clientId: 1,
                businessId: 1
              }
            },
            {
              $lookup: {
                from: 'users',
                let: { clientId: '$clientId' },
                pipeline: [
                  {
                    $match: {
                      $expr: { $eq: ['$_id', '$$clientId'] }
                    }
                  },
                  {
                    $project: {
                      FirstName: 1,
                      LastName: 1,
                      FullName: 1,
                      email: 1,
                      profileImage: 1
                    }
                  }
                ],
                as: 'client'
              }
            },
            {
              $unwind: '$client'
            },

            {
              $lookup: {
                from: 'tags',
                let: { departmentId: '$_id' },
                pipeline: [
                  {
                    $match: {
                      $expr: { $eq: ['$departmentId', '$$departmentId'] }
                    }
                  },
                  {
                    $project: {
                      tagName: 1
                    }
                  }
                ],
                as: 'departmentTags'
              }
            },
            {
              $lookup: {
                from: 'contracts',
                let: { businessId: '$businessId', departmentId: '$_id' },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $and: [{ $eq: ['$departmentId', '$$departmentId'] }, { $eq: ['$businessId', '$$businessId'] }]
                      }
                    }
                  },
                  {
                    $lookup: {
                      from: 'freelancers',
                      let: { freelancerId: '$freelancerId' },
                      pipeline: [
                        {
                          $match: {
                            $expr: { $eq: ['$_id', '$$freelancerId'] }
                          }
                        },
                        {
                          $project: {
                            _id: 1,
                            userId: 1
                          }
                        },
                        {
                          $lookup: {
                            from: 'users',
                            let: { userId: '$userId' },
                            pipeline: [
                              {
                                $match: {
                                  $expr: { $eq: ['$_id', '$$userId'] }
                                }
                              },
                              {
                                $project: {
                                  _id: 1,
                                  FirstName: 1,
                                  LastName: 1,
                                  FullName: 1,
                                  email: 1,
                                  profileImage: 1
                                }
                              }
                            ],
                            as: 'user'
                          }
                        },
                        {
                          $addFields: {
                            user: { $arrayElemAt: ['$user', 0] }
                          }
                        }
                      ],
                      as: 'freelancer'
                    }
                  },
                  {
                    $unwind: '$freelancer'
                  }
                ],
                as: 'contracts'
              }
            }
          ],
          as: 'department'
        }
      },
      {
        $unwind: '$department'
      }
    ]
    const response = await TaskModel.aggregate(aggregate).exec()
    if (response) {
      return response[0]
    } else {
      throw Error(`Task not found`)
    }
  } catch (e) {
    throw Error(`Could not find task, error: ${e}`)
  }
}

const deleteTask = async taskId => {
  try {
    //   Get task against task ID to check task exists or not.
    const taskData = await getTaskById(taskId)
    if (!taskData) throw new Error(`Task not exist.`)

    //   Get department data to remove task from department.
    const departmentData = await DepartmentModel.findById(taskData.departmentId)
    if (!departmentData) throw new Error(`Department not exist.`)

    if (departmentData?.tasks?.length) {
      //   Filter tasks and remove current deleted task.
      departmentData.tasks = departmentData.tasks.filter(task => task?.toString() !== taskId)

      // Save changes after department updated
      await departmentData.save()
    }

    return await TaskModel.softDelete({ _id: taskId })
  } catch (e) {
    throw new Error(`Could not delete task, error: ${e.message}`)
  }
}

const reorderTasks = async lists => {
  await Promise.all(
    lists.map(async task => {
      await TaskModel.findByIdAndUpdate(task._id, {
        $set: {
          order: task.order,
          tag: task.tag
        }
      })
    })
  )

  return { msg: 'Tasks updated successfully' }
}

const updateTaskStatus = async (tag, taskId) => {
  try {
    const updatedTask = await TaskModel.findByIdAndUpdate(
      taskId,
      {
        $set: {
          tag: tag
        }
      },
      { new: true }
    )
    return updatedTask
  } catch (e) {
    throw Error(`Error: Failed to update task status: ${e}`)
  }
}

const getTaskWithoutPopulate = async (filter, selectedFields = '') => {
  try {
    return await TaskModel.findOne(filter).select(selectedFields)
  } catch (e) {
    throw new Error(`Could not retrieve task, error: ${e.message}`)
  }
}

const addCommentToTask = async (data, image) => {
  try {
    const taskData = await getTaskWithoutPopulate({ _id: data.taskId })
    if (!taskData) throw Error(`Error: Failed to add comment`)

    if (image && data?.userId) {
      const resumeUrl = await file.createFile(image, data?.userId)
      data['img'] = resumeUrl?.url
    }
    await taskData.comments.push(data)

    await updateTask(data.taskId, taskData)

    return { message: 'Comment added successfully.' }
  } catch (e) {
    throw new Error(`Could not add comment, error: ${e.message}`)
  }
}

const updateTaskComment = async (taskId, commentId, data, image) => {
  try {
    const taskData = await getTaskWithoutPopulate({ _id: taskId })
    if (!taskData) throw Error(`Error: Failed to updated comment`)

    if (image && typeof image !== 'string' && data?.userId) {
      const resumeUrl = await file.createFile(image, data?.userId)
      data['img'] = resumeUrl?.url
    }
    const commentIndex = taskData.comments.findIndex(comment => comment?._id?.toString() === commentId)
    if (commentIndex !== -1) {
      taskData.comments[commentIndex] = Object.assign(taskData.comments[commentIndex], data)
      await taskData.save()
    } else {
      throw new Error(`Could not update comment`)
    }
    return { message: 'Comment added successfully.' }
  } catch (e) {
    throw new Error(`Could not add comment, error: ${e.message}`)
  }
}

const removeCommentFromTask = async commentId => {
  try {
    const taskData = await getTaskWithoutPopulate({
      'comments._id': commentId
    })
    if (!taskData) throw Error(`Error: Failed to delete comment`)

    taskData.comments = taskData.comments.filter(comment => comment._id?.toString() !== commentId)

    await taskData.save()
    return { message: 'Comment deleted successfully.' }
  } catch (e) {
    throw new Error(`Could not remove comment, error: ${e.message}`)
  }
}

module.exports = {
  createTask,
  createManyTask,
  getAllTasks,
  getTaskById,
  updateTask,
  countTasks,
  deleteTask,
  reorderTasks,
  updateTaskComment,
  removeCommentFromTask,
  addCommentToTask,
  updateTaskStatus,
  getTaskWithoutPopulate
}
