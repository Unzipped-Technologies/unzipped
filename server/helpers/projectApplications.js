const ProjectApplications = require('../models/ProjectApplications')
const { currentPage, pageLimit, pick } = require('../../utils/pagination')
const business = require('./business')
const questions = require('./questions')
const keys = require('../../config/keys')
const Mailer = require('../../services/Mailer')
const FreelancerModel = require('../models/Freelancer')

const createApplication = async params => {
  try {

    const FREELANCER_ID = await FreelancerModel.find( { userId: params.userId});
    let {userId, ...data} = params;
    data.freelancerId = FREELANCER_ID[0]._id;
    if (!FREELANCER_ID) throw new Error('Freelancer not found!')
    const isAlreadyApplied = await countApplications({
      projectId: data.projectId,
      freelancerId: data.freelancerId
    })
    if (isAlreadyApplied) throw new Error('You have already applied for this project.')
    const projectData = await business.getBusinessWithoutPopulate(data.projectId, 'applicants questionsToAsk')

    if (data?.questions?.length && projectData?.questionsToAsk?.length) {
      for (var question of data.questions) {
        if (projectData?.questionsToAsk?.includes(question.question)) {
          const questionAnswer = {
            userId: data.freelancerId,
            answer: question?.answer
          }
          const updatedQuestion = await questions.getQuestionById(question.question)
          updatedQuestion.answers.push(questionAnswer)
          const res = await updatedQuestion.save()
        }
      }
    }
    const projectApplication = new ProjectApplications(data)
    const response = await projectApplication.save()
    if (projectData?.applicants) {
      projectData.applicants.push(data.freelancerId)
    } else {
      projectData['applicants'] = [data.freelancerId]
    }
    const updatedBusiness = await business.updateBusiness({
      listId: data.projectId,
      applicants: projectData.applicants
    })
    if(!updatedBusiness) throw new Error('Could not update business');
    const mailOptions = {
      to: updatedBusiness.userId.email,
      templateId: "d-7a6cfc5885764014a2ef24371af0ef55",
      dynamicTemplateData:{
        firstName: updatedBusiness?.userId?.FirstName ? updatedBusiness.userId.FirstName: updatedBusiness.userId.email.split('@')[0],
        lastName: updatedBusiness?.userId?.LastName ? updatedBusiness.userId.LastName: '',
        reviewApplicationLink: `${keys.redirectDomain}/projects/${updatedBusiness._id}`,
        supportLink: `${keys.redirectDomain}/wiki/getting-started`,
        projectName: updatedBusiness?.name,
      }
    }
    await Mailer.sendInviteMail(mailOptions);
    return response
  } catch (e) {
    throw new Error(`Something went wrong: ${e.message}`)
  }
}
const getApplicationById = async id => {
  try {
    return await ProjectApplications.findById(id)
      .populate([
        {
          path: 'projectId',
          select: 'name'
        },
        {
          path: 'freelancerId',
          select: 'userId user freelancerSkills likeTotal dislikeTotal cover rate'
        },
        {
          path: 'freelancerId',
          populate: [
            {
              path: 'user',
              model: 'users',
              select: 'email FirstName LastName FullName profileImage AddressLineCountry'
            },
            {
              path: 'freelancerSkills',
              model: 'freelancerskills',
              select: 'skill isActive yearsExperience'
            }
          ]
        }
      ])
      .exec()
  } catch (e) {
    throw new Error(`Could not find application, error: ${e.message}`)
  }
}

const getAllApplications = async query => {
  try {
    const filter = pick(query, ['projectId', 'freelancerId'])
    const options = pick(query, ['limit', 'page', 'count'])
    let result = {}
    const total = await countApplications(filter)

    const limit = options.limit === 'all' ? total : pageLimit(options)

    const page = currentPage(options)
    const skip = (page - 1) * limit

    const applications = await ProjectApplications.find(filter)
      .populate([
        {
          path: 'projectId',
          select: 'name'
        },
        {
          path: 'freelancerId',
          select: 'userId freelancerSkills likeTotal dislikeTotal cover rate category'
        },
        {
          path: 'freelancerId',
          populate: [
            {
              path: 'userId',
              model: 'users',
              select:
                'email FirstName LastName FullName profileImage AddressLineOne AddressLineTwo AddressLineCountry AddressCity AddressState AddressZip'
            },
            {
              path: 'freelancerSkills',
              model: 'freelancerskills',
              select: 'skill isActive yearsExperience'
            }
          ]
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
    throw new Error(`Could not retrieve application, error: ${e.message}`)
  }
}
const updateApplication = async (id, data) => {
  try {
    const updatedApplication = await ProjectApplications.findByIdAndUpdate(id, { $set: data }, { new: true })
    return updatedApplication
  } catch (e) {
    throw new Error(`Could not update application, error: ${e.message}`)
  }
}
const deleteApplication = async id => {
  try {
    return await ProjectApplications.softDelete({ _id: id })
  } catch (e) {
    throw new Error(`Could not delete application, error: ${e.message}`)
  }
}

const countApplications = async filters => {
  try {
    const count = await ProjectApplications.countDocuments(filters)
    return count
  } catch (e) {
    throw new Error(`Could not count applications, error: ${e.message}`)
  }
}
module.exports = {
  createApplication,
  getApplicationById,
  getAllApplications,
  updateApplication,
  deleteApplication
}
