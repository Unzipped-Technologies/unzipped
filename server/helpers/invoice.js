const mongoose = require('mongoose')
const Invoice = require('../models/Invoice')
const { currentPage, pageLimit, pick } = require('../../utils/pagination')
const PaymentHistoriesModel = require('../models/PaymentHistory')
const BusinessModel = require('../models/Business')
const ContractModel = require('../models/Contract')
const Mailer = require('../../services/Mailer')
const keys = require('../../config/keys')

const createInvoice = async data => {
  try {
    const { getBusinessWithoutPopulate } = require('./business')
    // Check whether the business against businessId exist OR not
    const businessData = await getBusinessWithoutPopulate(data.businessId, 'businessCode userId')
    if (!businessData) throw new Error(`Business not exist.`)

    data.clientId = businessData.userId
    data['hoursWorked'] = 0

    const { getTaskWithoutPopulate } = require('./task')
    const { createManyTaskHours } = require('./taskHours')

    for (var task of data.tasksHours) {
      const taskData = await getTaskWithoutPopulate({ _id: task?.taskId }, 'assignee businessId taskName')
      if (taskData?.businessId?.toString() != data.businessId)
        throw new Error(`${taskData?.taskName} not exist in this business.`)
    }

    const newInvoice = await new Invoice(data)
    let response = await newInvoice.save()

    const newTaskHours = await createManyTaskHours(
      data?.tasksHours.map(taskHour => {
        return {
          ...taskHour,
          hours: 0,
          invoiceId: response._id,
          freelancerId: data?.freelancerId
        }
      })
    )
    newInvoice['tasks'] = await newTaskHours?.data?.map(taskHour => taskHour?._id)
    response = await newInvoice.save()

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
    const filter = pick(query, ['businessId', 'freelancerId', 'departmentId', 'clientId', '_id'])

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
          tasks: 1,
          createdAt: 1,
          updatedAt: 1
        }
      },
      {
        $sort: {
          createdAt: -1
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
          from: 'taskhours',
          let: { invoiceId: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [{ $eq: ['$invoiceId', '$$invoiceId'] }]
                }
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
                      status: 1,
                      assignee: 1,
                      storyPoints: 1,
                      tag: 1
                    }
                  },
                  {
                    $sort: { createdAt: 1 } // 1 for ascending, -1 for descending
                  },
                  {
                    $lookup: {
                      from: 'tags',
                      let: { tagId: '$tag' },
                      pipeline: [
                        {
                          $match: {
                            $expr: { $eq: ['$_id', '$$tagId'] }
                          }
                        },
                        {
                          $project: {
                            tagName: 1
                          }
                        },
                        {
                          $sort: { createdAt: 1 } // 1 for ascending, -1 for descending
                        }
                      ],
                      as: 'tag'
                    }
                  },
                  {
                    $unwind: '$tag'
                  }
                ],
                as: 'task'
              }
            },
            {
              $unwind: '$task'
            }
          ],
          as: 'tasks'
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
    if (updatedInvoice && (updatedInvoice.status === 'paid' || updatedInvoice.status === 'approved')) {
      await notifyUpdateInvoices(updatedInvoice)
    }

    return updatedInvoice
  } catch (e) {
    throw new Error(`Could not update invoice, error: ${e.message}`)
  }
}

const notifyUpdateInvoices = async updatedInvoice => {
  const invoiceRecord = await Invoice.findById({ _id: updatedInvoice._id })
    .populate([
      {
        path: 'clientId',
        model: 'users',
        select: 'FirstName LastName email'
      },
      {
        path: 'freelancerId',
        model: 'freelancers',
        populate: {
          path: 'userId',
          model: 'users',
          select: 'FirstName LastName email'
        }
      },
      {
        path: 'businessId',
        model: 'businesses',
        select: 'name employees',
        populate: {
          path: 'employees',
          model: 'contracts',
          select: 'freelancerId',
          populate: {
            path: 'freelancerId',
            model: 'freelancers',
            select: 'userId',
            populate: {
              path: 'userId',
              model: 'users',
              select: 'FirstName LastName email _id profileImage '
            }
          }
        }
      }
    ])
    .select('clientId businessId status hoursWorked createdAt')

  const paymentSummary = await PaymentHistoriesModel.find({ invoiceId: updatedInvoice._id })
    .select('invoiceId userId paymentAmount paymentDate')
    .populate([
      {
        path: 'userId',
        model: 'users',
        select: 'FirstName LastName'
      },
      {
        path: 'invoiceId',
        model: 'invoices',
        select: 'hoursWorked'
      }
    ])

  const paymentDetails = []
  const activeTeamMembers = []

  if (paymentSummary) {
    paymentSummary.forEach(item => {
      paymentDetails.push({
        name: item.userId.FirstName + ' ' + item.userId.LastName,
        hoursWorked: item.invoiceId.hoursWorked,
        paymentAmount: item.paymentAmount
      })
    })
  }

  if (invoiceRecord) {
    activeTeamMembers.push({
      name: invoiceRecord.freelancerId.userId.FirstName + ' ' + invoiceRecord.freelancerId.userId.LastName,
      status: invoiceRecord.status
    })
  }

  await notifyEmails(invoiceRecord, paymentDetails, activeTeamMembers, paymentSummary)
}

const notifyEmails = async (invoiceRecord, paymentDetails, activeTeamMembers, paymentSummary) => {
  const freelancerHourlyRate = await ContractModel.find({
    businessId: invoiceRecord.businessId,
    freelancerId: invoiceRecord.freelancerId
  }).select('hourlyRate')
  const paymentAmount = (invoiceRecord?.hoursWorked ?? 0) * (freelancerHourlyRate[0]?.hourlyRate ?? 0)

  const clientMailOpts = {
    to: invoiceRecord?.clientId?.email,
    subject: `✔️ Weekly Invoice Payment Summary for ${invoiceRecord?.businessId?.name}`,
    templateId: 'd-84b47273c99842ee8f43f85db0c48dc0',
    dynamicTemplateData: {
      dashboardLink: `${keys.redirectDomain}/dashboard`,
      invoiceLink: '',
      firstName: invoiceRecord?.clientId?.FirstName ?? '',
      lastName: invoiceRecord?.clientId?.LastName ?? '',
      projectName: invoiceRecord?.businessId?.name ?? '',
      paymentSummary: paymentDetails,
      activeTeamMembers: activeTeamMembers
    }
  }

  const freelancerMailOpts = {
    to: invoiceRecord.freelancerId.userId.email,
    templateId: 'd-ce3fe25352034b8694a5ecb6902a1b6f',
    dynamicTemplateData: {
      withdrawWikiLink: '',
      invoiceId: invoiceRecord._id ?? '',
      projectName: invoiceRecord?.businessId?.name ?? '',
      amount: paymentAmount,
      paymentDate: invoiceRecord?.createdAt ?? new Date.now(),
      profileLink: `${keys.redirectDomain}/freelancers/${invoiceRecord.freelancerId._id}`,
      currentYear: new Date().getFullYear()
    }
  }
  await Mailer.sendInviteMail(clientMailOpts)
  await Mailer.sendInviteMail(freelancerMailOpts)
}
const addInvoiceTasks = async (invoiceId, data) => {
  try {
    const invoiceData = await getInvoiceById(invoiceId)
    if (!invoiceData) throw new Error(`Invoice not found`)

    const { createManyTaskHours } = require('./taskHours')

    const newTaskHours = await createManyTaskHours(
      data?.tasksHours.map(taskHour => {
        return {
          ...taskHour,
          freelancerId: data?.freelancerId
        }
      })
    )
    if (invoiceData?.tasks?.length) {
      invoiceData.tasks = [...invoiceData.tasks, ...newTaskHours?.data?.map(taskHour => taskHour?._id)]
    } else {
      invoiceData.tasks = newTaskHours?.data?.map(taskHour => taskHour?._id)
    }
    await invoiceData.save()
    return invoiceData
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

const getUnpaidInvoices = async query => {
  try {
    let filters = {}
    if (query.businessId) {
      filters.businessId = mongoose.Types.ObjectId(query.businessId)
    }
    if (query.freelancerId) {
      filters.freelancerId = mongoose.Types.ObjectId(query.freelancerId)
    }
    if (query.clientId) {
      filters.clientId = mongoose.Types.ObjectId(query.clientId)
    }
    if (query.departmentId) {
      filters.departmentId = mongoose.Types.ObjectId(query.departmentId)
    }
    const completedInvoices = await Invoice.find()
    return completedInvoices.filter(
      item => item.clientId.toString() === filters.clientId.toString() && item.status !== 'paid'
    )
  } catch (e) {
    throw new Error(`Could not get unpaid invoices, error: ${e.message}`)
  }
}

const getInvoiceWithoutPopulate = async (filter, selectedFields = '') => {
  try {
    return await Invoice.findOne(filter).select(selectedFields)
  } catch (e) {
    throw new Error(`Could not retrieve invoice, error: ${e.message}`)
  }
}

module.exports = {
  createInvoice,
  getInvoiceById,
  getUnpaidInvoices,
  getAllInvoices,
  updateInvoice,
  deleteInvoice,
  addInvoiceTasks,
  getInvoiceWithoutPopulate
}
