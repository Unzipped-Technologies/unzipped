const QuestionModel = require('../models/Question')
const BusinessModel = require('../models/Business')
const { currentPage, pageLimit, pick } = require('../../utils/pagination')

const createQuestion = async question => {
  try {
    const result = await QuestionModel.create(question)
    const previousQuestions = await BusinessModel.findById(question.businessId).select('questionsToAsk')
    if (previousQuestions?.questionsToAsk) {
      previousQuestions.questionsToAsk.push(result._id)
    } else {
      previousQuestions['questionsToAsk'] = [result._id]
    }
    const updatedBusiness = await BusinessModel.findByIdAndUpdate(question.businessId, {
      listId: question.businessId,
      questionsToAsk: previousQuestions.questionsToAsk
    })
    return result
  } catch (e) {
    throw Error(`Error: Failed to create question: ${e}`)
  }
}

const createManyQuestion = async questions => {
  try {
    const result = await QuestionModel.insertMany(questions)
    return result
  } catch (e) {
    throw Error(`Error: Failed to create question: ${e}`)
  }
}

const getQuestionById = async questionId => {
  try {
    const response = await QuestionModel.findById(questionId).exec()
    return response
  } catch (e) {
    throw Error(`Error: Failed to load question ${questionId}: ${e}`)
  }
}

const getAllQuestions = async query => {
  try {
    const filter = pick(query, ['businessId', 'userId', 'question'])
    const options = pick(query, ['limit', 'page', 'count'])
    let result = {}
    const total = await countQuestions(filter)

    const limit = options.limit === 'all' ? total : pageLimit(options)

    const page = currentPage(options)
    const skip = (page - 1) * limit

    const applications = await QuestionModel.find(filter)
      .populate([
        {
          path: 'businessId',
          select: 'name'
        },
        {
          path: 'userId',
          model: 'users',
          select:
            'email FirstName LastName FullName profileImage AddressLineOne AddressLineTwo AddressLineCountry AddressCity AddressState AddressZip'
        }
      ])
      .skip(skip)
      .limit(limit)
    const totalPages = Math.ceil(total / limit)

    result = {
      data: applications,
      currentPage: page,
      limit,
      totalPages,
      totalResults: total
    }
    return result
  } catch (e) {
    throw Error(`Error: Failed to load questions ${userId}: ${e}`)
  }
}

const updateQuestion = async ({ questionId, payload }) => {
  try {
    const result = await QuestionModel.findByIdAndUpdate(questionId, { $set: payload }, { new: true })
    return result
  } catch (e) {
    throw Error(`Error: Failed to update question: ${e}`)
  }
}

const deleteQuestion = async questionId => {
  try {
    const question = await getQuestionById(questionId)

    const projectQuestions = await BusinessModel.findById(question.businessId).select('questionsToAsk')
    if (projectQuestions?.questionsToAsk?.length) {
      projectQuestions.questionsToAsk = projectQuestions.questionsToAsk.filter(
        question => question?.toString() !== questionId
      )
    }
    const updatedBusiness = await BusinessModel.findByIdAndUpdate(question.businessId, {
      listId: question.businessId,
      questionsToAsk: projectQuestions.questionsToAsk
    })
    const result = await QuestionModel.softDelete({ _id: questionId })
    if (result) return { affected: 1, msg: 'Successfully deleted!', record: result }
    return { affected: 0, msg: 'No record found!' }
  } catch (e) {
    throw Error(`Error: Failed to delete questionId ${questionId}, ${e}`)
  }
}

const countQuestions = async filter => {
  try {
    return await QuestionModel.countDocuments({ ...filter })
  } catch (e) {
    throw Error(`Error: Failed to count question, ${e}`)
  }
}

module.exports = {
  createQuestion,
  createManyQuestion,
  getQuestionById,
  getAllQuestions,
  updateQuestion,
  deleteQuestion
}
