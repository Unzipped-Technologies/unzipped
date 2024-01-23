const Invoice = require('../models/Invoice')
const { currentPage, pageLimit, pick } = require('../../utils/pagination')

const createInvoice = async data => {
  try {
    const { getBusinessWithoutPopulate } = require('./business')
    // Check whether the business against businessId exist OR not
    const businessData = await getBusinessWithoutPopulate(data.businessId, 'businessCode userId')
    if (!businessData) throw new Error(`Business not exist.`)

    if (data.departmentId) {
      const { getDepartmentWithoutPopulate } = require('./department')
      // Check whether the department against departmentId exist OR not
      const departmentData = await getDepartmentWithoutPopulate({ _id: data.departmentId })
      if (!departmentData) throw new Error(`Department not exist.`)
    }

    data.clientId = businessData.userId

    if (!data?.tasks?.length) throw new Error(`Provide at least one task to create invoice.`)

    const { getTaskWithoutPopulate } = require('./task')
    const { getMultipleTaskHours } = require('./taskHours')

    for (var task of data.tasks) {
      const taskData = await getTaskWithoutPopulate({ _id: task }, 'assignee businessId taskName')
      if (taskData?.assignee?.toString() != data.freelancerId)
        throw new Error(`You can only create invoice of your own tasks.`)
      if (taskData?.businessId?.toString() != data.businessId)
        throw new Error(`${taskData?.taskName} not exist in this business.`)
    }

    const taskHours = await getMultipleTaskHours(
      {
        taskId: { $in: data.tasks }
      },
      'hours'
    )

    data.hoursWorked = taskHours.reduce((accumulator, currentTask) => {
      return accumulator + currentTask.hours
    }, 0)
    const newInvoice = await new Invoice(data)
    const response = await newInvoice.save()
    return response
  } catch (e) {
    throw new Error(`Something went wrong: ${e.message}`)
  }
}

const getInvoiceById = async id => {
  try {
    return await Invoice.findById(id).exec()
  } catch (e) {
    throw new Error(`Could not find invoice, error: ${e.message}`)
  }
}

const getAllInvoices = async query => {
  try {
    const filter = pick(query, ['businessId', 'freelancerId', 'departmentId', 'clientId'])

    const total = await countInvoices(filter)

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
          clientId: 1,
          freelancerId: 1,
          businessId: 1,
          hoursWorked: 1,
          hourlyRate: 1,
          status: 1,
          createdAt: 1,
          updatedAt: 1
        }
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
                userId: 1
              }
            }
          ],
          as: 'freelancer'
        }
      },
      {
        $unwind: '$freelancer'
      },
      {
        $lookup: {
          from: 'users',
          let: { userId: '$freelancer.userId' },
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
          as: 'freelancer.user'
        }
      },
      {
        $unwind: '$freelancer.user'
      },
      {
        $lookup: {
          from: 'contracts',
          let: { clientId: '$clientId', freelancerId: '$freelancerId', businessId: '$businessId' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$userId', '$$clientId'] },
                    { $eq: ['$freelancerId', '$$freelancerId'] },
                    { $eq: ['$businessId', '$$businessId'] }
                  ]
                }
              }
            },
            {
              $project: {
                isActive: 1,
                hourlyRate: 1,
                hoursLimit: 1,
                totalStoryPoints: 1,
                isOfferAccepted: 1,
                createdAt: 1,
                updatedAt: 1
              }
            }
          ],
          as: 'contract'
        }
      },
      {
        $unwind: '$contract'
      },
      {
        $lookup: {
          from: 'tasks',
          let: { businessId: '$businessId', assignee: '$freelancerId' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [{ $eq: ['$businessId', '$$businessId'] }, { $eq: ['$assignee', '$$assignee'] }]
                }
              }
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
                      taskId: 1,
                      createdAt: 1,
                      updatedAt: 1
                    }
                  },
                  {
                    $lookup: {
                      from: 'tasks',
                      let: { taskId: '$taskId' },
                      pipeline: [
                        {
                          $match: {
                            $expr: {
                              $and: [{ $eq: ['$_id', '$$taskId'] }]
                            }
                          }
                        },
                        {
                          $project: {
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
                  {
                    $unwind: '$task'
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
                // taskName: 1,
                // ticketCode: 1,
                // status: 1,
                // assignee: 1,
                taskHours: 1
              }
            }
          ],
          as: 'task'
        }
      },
      {
        $addFields: {
          tasks: {
            $map: {
              input: '$tasks',
              as: 'task',
              in: '$$task'
            }
          }
        }
      },
      { $skip: skip },
      { $limit: limit }
    ]
    const invoices = await Invoice.aggregate(aggregationPipeline).exec()
    const totalPages = Math.ceil(total / limit)

    const result = {
      data: invoices,
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
const updateInvoice = async (id, data) => {
  try {
    const updatedInvoice = await Invoice.findByIdAndUpdate(id, { $set: data }, { new: true })
    return updatedInvoice
  } catch (e) {
    throw new Error(`Could not update invoice, error: ${e.message}`)
  }
}
const deleteInvoice = async id => {
  try {
    await Invoice.softDelete({ _id: id })
  } catch (e) {
    throw new Error(`Could not delete invoice, error: ${e.message}`)
  }
}

const countInvoices = async filters => {
  try {
    const count = await Invoice.countDocuments(filters)
    return count
  } catch (e) {
    throw new Error(`Could not count applications, error: ${e.message}`)
  }
}

module.exports = {
  createInvoice,
  getInvoiceById,
  getAllInvoices,
  updateInvoice,
  deleteInvoice
}
