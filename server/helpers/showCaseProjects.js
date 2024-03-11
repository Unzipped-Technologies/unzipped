const ShowCaseProjectsModel = require('../models/ShowCaseProjects')
const { currentPage, pageLimit, pick } = require('../../utils/pagination')
const CloudinaryUploadHelper = require('./file')
const FileModel = require('../models/file')

const createProject = async (data, userId, files) => {
  try {
    const { getFreelancerWithoutPopulate } = require('./freelancer')

    const freelancerData = await getFreelancerWithoutPopulate({ _id: data?.freelancerId })
    if (!freelancerData) throw new Error('Invalid freelancer ID.')

    const freelancerProjects = await countProjects({ freelancerId: data.freelancerId })

    if (freelancerProjects === 3) throw new Error('You can only create three projects.')

    // upload file to cloudinary platform
    const uploadResult = await CloudinaryUploadHelper.createFile(files, userId)
    let cloudinaryIds = []
    if (uploadResult && uploadResult.length > 0) {
      cloudinaryIds = uploadResult.map(elem => elem._id)
      data['images'] = cloudinaryIds
    }

    const newProject = new ShowCaseProjectsModel(data)
    const response = await newProject.save()
    return response
  } catch (e) {
    throw new Error(`Something went wrong: ${e.message}`)
  }
}

const getProjectById = async id => {
  try {
    return await ShowCaseProjectsModel.findById(id)
      .populate([
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
    throw new Error(`Could not find project, error: ${e.message}`)
  }
}

const getProjectWithoutPopulate = async id => {
  try {
    return await ShowCaseProjectsModel.findById(id).exec()
  } catch (e) {
    throw new Error(`Could not find project, error: ${e.message}`)
  }
}

const getAllProjects = async query => {
  try {
    const filter = pick(query, ['freelancerId'])
    const options = pick(query, ['limit', 'page', 'count'])
    let result = {}
    const total = await countProjects(filter)

    const limit = options.limit === 'all' ? total : pageLimit(options)

    const page = currentPage(options)
    const skip = (page - 1) * limit

    const projects = await ShowCaseProjectsModel.find(filter)
      .populate([
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
              select: 'email FirstName LastName FullName profileImage AddressLineOne'
            }
          ]
        }
      ])
      .skip(skip)
      .limit(limit)
    const totalPages = Math.ceil(total / limit)

    result = {
      data: projects,
      currentPage: page,
      limit,
      totalPages,
      totalResults: total
    }
    return result
  } catch (e) {
    throw new Error(`Could not retrieve projects, error: ${e.message}`)
  }
}
const updateProject = async (id, data) => {
  try {
    const updatedProject = await ShowCaseProjectsModel.findByIdAndUpdate(id, { $set: data }, { new: true })
    return updatedProject
  } catch (e) {
    throw new Error(`Could not update project, error: ${e.message}`)
  }
}
const deleteProject = async id => {
  try {
    return await ShowCaseProjectsModel.softDelete({ _id: id })
  } catch (e) {
    throw new Error(`Could not delete project, error: ${e.message}`)
  }
}

const deleteProjectImage = async (projectId, imageId, freelancerId) => {
  try {
    const projectData = await getProjectWithoutPopulate(projectId)
    if (projectData?.freelancerId !== freelancerId) throw new Error(`You can only modify your ownn project.`)

    if (!projectData?.images.includes(imageId)) throw new Error(`Image not exist in this project.`)

    const imageData = await FileModel.findById(imageId)
    if (!imageData) throw new Error(`Image not exist.`)
    await CloudinaryUploadHelper.deleteFile(imageData?.cloudinaryId)

    await FileModel.findByIdAndDelete(imageId)

    projectData.images = projectData.images?.filter(image => image !== imageId)

    await projectData.save()

    return {
      msg: 'Image deleted successfully'
    }
  } catch (e) {
    throw new Error(`Could not delete image, error: ${e.message}`)
  }
}

const countProjects = async filters => {
  try {
    const count = await ShowCaseProjectsModel.countDocuments(filters)
    return count
  } catch (e) {
    throw new Error(`Could not count projects, error: ${e.message}`)
  }
}

module.exports = {
  createProject,
  getProjectById,
  getAllProjects,
  updateProject,
  deleteProject,
  countProjects,
  deleteProjectImage,
  getProjectWithoutPopulate
}
