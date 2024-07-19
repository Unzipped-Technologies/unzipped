const mongoose = require('mongoose')
const departmentModel = require('../models/Department')
const business = require('../models/Business')
const tags = require('../models/tags')
const tasks = require('../models/Task')
const contracts = require('../models/Contract')
const user = require('../models/User')
const taskHelper = require('./task')
const { currentPage, pageLimit, pick } = require('../../utils/pagination')

// add a department to a business
const createDepartment = async data => {
  try {
    // Below we are importing function due to circular dependency problem
    const { getBusinessWithoutPopulate } = require('./business')

    const businessData = await getBusinessWithoutPopulate(data.businessId, 'departments userId')
    if (!businessData) throw Error(`Invalid business Id.`)
    if (data.parentDepartmentId) {
      const parentDepartment = await getDepartmentWithoutPopulate({ _id: data.parentDepartmentId })
      if (!parentDepartment) throw Error(`Invalid parent department Id.`)
    }

    // Create department with empty tags, tasks and employees
    const item = {
      ...data,
      clientId: businessData?.userId,
      tags: [],
      tasks: [],
      employees: []
    }
    const Dept = await departmentModel.create(item)

    // create initial tags for department
    const initTags = [
      {
        departmentId: Dept.id,
        tagName: 'To Do',
        department: await departmentModel.findById(Dept.id)
      },
      {
        departmentId: Dept.id,
        tagName: 'In Progress',
        department: await departmentModel.findById(Dept.id)
      },
      {
        departmentId: Dept.id,
        tagName: 'Done',
        department: await departmentModel.findById(Dept.id)
      }
    ]

    const newCreatedTags = await tags.insertMany(initTags)

    // update department with new tags
    await departmentModel.findByIdAndUpdate(Dept.id, {
      tags: newCreatedTags?.map(tag => tag._id)
    })

    await businessData.departments.push(Dept.id)
    await businessData.save()

    return { msg: `department created for ${data.businessId}` }
  } catch (e) {
    throw Error(`Something went wrong ${e}`)
  }
}

const getDepartmentById = async (id, filters) => {
  try {
    const aggregate = [
      {
        $match: {
          _id: mongoose.Types.ObjectId(id)
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
            },
            {
              $lookup: {
                from: 'tasks',
                let: { tagId: '$_id' },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $and: [{ $eq: ['$tag', '$$tagId'] }, { ...filters.assignee }]
                      }
                    }
                  },
                  {
                    $project: {
                      taskName: 1,
                      status: 1,
                      assignee: 1,
                      tag: 1,
                      storyPoints: 1,
                      priority: 1,
                      description: 1,
                      ticketCode: 1,
                      comments: 1
                    }
                  },
                  {
                    $lookup: {
                      from: 'users',
                      let: { assignee: '$assignee' },

                      pipeline: [
                        {
                          $match: {
                            $expr: { $eq: [{ $toString: '$_id' }, '$$assignee'] }
                          }
                        },
                        {
                          $project: {
                            FirstName: 1,
                            LastName: 1,
                            email: 1,
                            FullName: 1,
                            profileImage: 1,
                            freelancers: 1
                          }
                        }
                      ],
                      as: 'assignee.user'
                    }
                  },
                  {
                    $unwind: {
                      path: '$assignee.user', // Unwind the user array
                      preserveNullAndEmptyArrays: true // Keep empty object for "unassigned"
                    }
                  },
                  {
                    $project: {
                      assignee: {
                        user: { $ifNull: ['$assignee.user', {}] } // Nested user object
                      },
                      taskName: 1,
                      status: 1,
                      tag: 1,
                      storyPoints: 1,
                      priority: 1,
                      description: 1,
                      ticketCode: 1,
                      comments: 1
                      // ... other fields to project
                    }
                  }
                ],
                as: 'tasks'
              }
            }
          ],
          as: 'departmentTags'
        }
      },
      {
        $lookup: {
          from: 'contracts',
          let: { businessId: '$businessId' },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ['$businessId', '$$businessId'] }
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
    ]
    const response = await departmentModel.aggregate(aggregate).exec()
    if (response) {
      return response[0]
    } else {
      throw Error(`Department not found`)
    }
  } catch (e) {
    throw Error(`Could not find department, error: ${e}`)
  }
}

// list departments
const listDepartments = async query => {
  try {
    const filter = pick(query, ['businessId', 'freelancerId', 'departmentId', 'clientId'])

    const total = await countDepartments(filter)

    let limit = query.limit === 'all' ? total : pageLimit(query)
    limit = limit == 0 ? 10 : limit

    const page = currentPage(query)
    const skip = (page - 1) * limit

    const aggregationPipeline = [
      {
        $match: { ...filter }
      },
      {
        $project: {
          name: 1,
          clientId: 1,
          tags: 1,
          tasks: 1,
          parentDepartmentId: 1,
          businessId: 1,
          employees: 1
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
                lastName: 1,
                FullName: 1
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
          from: 'businesses',
          let: { businessId: '$businessId' },
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
      // {
      //   $lookup: {
      //     from: 'contracts',
      //     let: { contractId: '$employees' },
      //     pipeline: [
      //       {
      //         $match: {
      //           $expr: { $in: ['$_id', '$$contractId'] }
      //         }
      //       },
      //       {
      //         $project: {
      //           freelancerId: 1
      //         }
      //       }
      //     ],
      //     as: 'employees'
      //   }
      // },
      // {
      //   $unwind: '$employees'
      // },
      {
        $lookup: {
          from: 'tasks',
          let: { businessId: '$businessId', departmentId: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [{ $eq: ['$businessId', '$$businessId'] }, { $eq: ['$departmentId', '$$departmentId'] }]
                }
              }
            },
            {
              $lookup: {
                from: 'taskhours',
                let: { taskId: '$taskId' },
                pipeline: [
                  {
                    $match: {
                      $expr: { $eq: ['$taskId', '$$taskId'] }
                    }
                  },
                  {
                    $project: {
                      hours: 1,
                      taskId: 1,
                      createdAt: 1,
                      updatedAt: 1
                    }
                  },
                  {
                    $sort: { createdAt: 1 } // 1 for ascending, -1 for descending
                  }
                ],
                as: 'taskHours'
              }
            },
            {
              $project: {
                _id: 1,
                taskName: 1,
                ticketCode: 1,
                status: 1,
                assignee: 1,
                taskHours: 1
              }
            }
          ],
          as: 'task'
        }
      },

      { $skip: skip },
      { $limit: limit }
    ]
    const employees = await departmentModel.aggregate(aggregationPipeline).exec()
    const totalPages = Math.ceil(total / limit)

    const result = {
      data: employees,
      currentPage: page,
      limit: limit,
      totalPages: totalPages,
      totalResults: total
    }
    return result
  } catch (e) {
    throw new Error(`Could not retrieve invoices, error: ${e.message}`)
  }
}

const updateDepartment = async (id, data, isEditingDepartment, filters = {}) => {
  try {

    const updatedDepartment = await departmentModel.findByIdAndUpdate(id, { $set: { ...data } }, { new: true })
    if(isEditingDepartment){
      const updatedResp = await getDepartmentById(id, filters);
      return updatedResp 
    }
    return  updatedDepartment;
  } catch (err) {
    throw new Error(`Could not update department, error: ${err.message}`)
  }
}

const deleteDepartment = async id => {
  try {
    // Here we also have to delete department from business, contract, parentDepartment, invoice, tags, task
    return await departmentModel.softDelete({ _id: id })
  } catch (e) {
    throw new Error(`Could not delete department, error: ${e.message}`)
  }
}

const addTaskToDepartment = async (taskId, departmentId) => {
  const departmentData = await getDepartmentWithoutPopulate({ _id: departmentId }, 'tasks')

  if (!departmentData) throw Error(`Department not found`)

  const taskData = await taskHelper.getTaskById(taskId)
  if (!taskData) throw Error(`Task not found`)

  if (departmentData?.tasks) {
    if (departmentData?.tasks.includes(taskId)) {
      throw Error(`Task is already added to department.`)
    } else {
      departmentData.tasks.push(taskId)
      await departmentData.save()
    }
  } else {
    departmentData.tasks = [taskId]
    await departmentData.save()
    return { msg: `Task added to department.` }
  }
}

const removeTaskFromDepartment = async (taskId, departmentId) => {
  const departmentData = await getDepartmentWithoutPopulate({ _id: departmentId }, 'tasks')

  if (!departmentData) throw Error(`Department not found`)

  const taskData = await taskHelper.getTaskById(taskId)
  if (!taskData) throw Error(`Task not found`)

  if (departmentData?.tasks?.length) {
    if (departmentData?.tasks.includes(taskId)) {
      departmentData.tasks = departmentData?.tasks.filter(task => task !== taskId)
      await departmentData.save()
    }
  }
}

const getDepartmentWithoutPopulate = async (filter, selectedFields = '') => {
  try {
    return await departmentModel.findOne(filter).select(selectedFields)
  } catch (e) {
    throw new Error(`Could not retrieve department, error: ${e.message}`)
  }
}

const addCommentToTask = async data => {
  const task = await tasks.findById(data.taskId)

  if (!task) return undefined
  if (!task?.comments) task.comments = []

  const idNumber = task?.comments.length + 1
  task?.comments.push({ id: idNumber, ...data })
  await task.save()
  await departmentModel.findByIdAndUpdate(task.departmentId, {
    tasks: await tasks.find({ departmentId: task.departmentId })
  })
  return task
}

const removeCommentToTask = async data => {
  const task = await tasks.findById(data.taskId)
  task.comments.filter(e => e.id !== data.commentId)
  await task.save()
  await departmentModel.findByIdAndUpdate(task.departmentId, {
    tasks: await tasks.find({ departmentId: task.departmentId })
  })
  return task
}

const deleteBusinessDepartments = async businessId => {
  await departmentModel.deleteMany({ businessId: businessId })
  await contracts.deleteMany({ listId: businessId })
}

const addBusinessAssociateToBusiness = async data => {
  try {
    const [success] = await Promise.all([
      contracts.create({
        ...data,
        userId: await user.findById(data.profileId).select('email FirstName LastName profileImage freelancers')
      }),
      departmentModel.findByIdAndUpdate(data.departmentId, {
        employees: await contracts.find({ departmentId: data.departmentId })
      }),
      business.findByIdAndUpdate(data.businessId, {
        employees: await contracts.find({ businessId: data.businessId })
      })
    ])
    return success
  } catch (e) {
    throw Error(`Something went wrong ${e}`)
  }
}

const countDepartments = async filters => {
  try {
    const count = await departmentModel.countDocuments(filters)
    return count
  } catch (e) {
    throw new Error(`Could not count departments, error: ${e.message}`)
  }
}

module.exports = {
  createDepartment,
  listDepartments,
  getDepartmentById,
  updateDepartment,
  addCommentToTask,
  removeCommentToTask,
  countDepartments,
  deleteDepartment,
  addBusinessAssociateToBusiness,
  addTaskToDepartment,
  deleteBusinessDepartments,
  getDepartmentWithoutPopulate
}
