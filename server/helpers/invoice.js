const Invoice = require('../../models/Invoice')
const mongoose = require('mongoose')
const { currentPage, pageLimit, pick } = require('../../utils/pagination')

const createInvoice = async data => {
  try {
    const newInvoice = new Invoice(data)
    const savedInvoice = await newInvoice.save()
    return savedInvoice
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
    let filters = {}
    if (query.businessId) {
      filters['businessId'] = mongoose.Types.ObjectId(query.businessId)
    }
    if (query.freelancerId) {
      filters['freelancerId'] = mongoose.Types.ObjectId(query.freelancerId)
    }
    if (query.clientId) {
      filters['clientId'] = mongoose.Types.ObjectId(query.clientId)
    }
    if (query.departmentId) {
      filters['departmentId'] = mongoose.Types.ObjectId(query.departmentId)
    }

    const total = await countInvoices(filters)

    let limit = query.limit === 'all' ? total : pageLimit(query)
    limit = limit == 0 ? 10 : limit

    const page = currentPage(query)
    const skip = (page - 1) * limit

    const aggregationPipeline = [
      {
        $match: { ...filters }
      },
      {
        $lookup: {
          from: 'businesses',
          localField: 'businessId',
          foreignField: '_id',
          as: 'businesses',
          pipeline: [
            {
              $project: {
                name: 1
              }
            }
          ]
        }
      },
      {
        $unwind: '$businesses'
      },
      {
        $lookup: {
          from: 'freelancers',
          localField: 'freelancerId',
          foreignField: '_id',
          as: 'freelancer',
          pipeline: [
            {
              $project: {
                name: 1,
                userId: 1
              }
            }
          ]
        }
      },
      {
        $unwind: '$freelancer'
      },
      {
        $lookup: {
          from: 'users',
          localField: 'freelancer.userId',
          foreignField: '_id',
          as: 'user',
          pipeline: [
            {
              $project: {
                FirstName: 1,
                LastName: 1,
                FullName: 1
              }
            }
          ]
        }
      },
      {
        $unwind: '$user'
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
                    { $eq: ['$$clientId', '$userId'] },
                    { $eq: ['$$freelancerId', '$freelancerId'] },
                    { $eq: ['$$businessId', '$businessId'] }
                  ]
                }
              }
            }
          ],
          as: 'contract'
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

const getUnpaidInvoices = async (query) => {
  try {
    let filters = {}
    if (query.businessId) {
      filters.businessId = mongoose.Types.ObjectId(query.businessId);
    }
    if (query.freelancerId) {
      filters.freelancerId = mongoose.Types.ObjectId(query.freelancerId);
    }
    if (query.clientId) {
      filters.clientId = mongoose.Types.ObjectId(query.clientId);
    }
    if (query.departmentId) {
      filters.departmentId = mongoose.Types.ObjectId(query.departmentId);
    }
    // const count = await Invoice.countDocuments(filters);
    // console.log('Count:', count);
    const completedInvoices = await Invoice.find();
    // console.log('Filtered Invoices:', completedInvoices);
    return completedInvoices.filter(item => item.clientId === filters.clientId.toString() && !item.isPaid);
  } catch (e) {
    throw new Error(`Could not get unpaid invoices, error: ${e.message}`);
  }
};

module.exports = {
  createInvoice,
  getInvoiceById,
  getUnpaidInvoices,
  getAllInvoices,
  updateInvoice,
  deleteInvoice
}
