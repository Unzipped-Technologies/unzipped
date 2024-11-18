const cloudinary = require('../../services/cloudinary')
const FileModel = require('../models/file')
const user = require('../models/User')
const path = require('path')

const listFilesForUser = async ({ filter = {}, take = 25, skip = 0 }, id) => {
  return
}

const listFilesForMessage = async (conversationId, id) => {
  return undefined
}

const getFile = async filter => {
  try {
    const file = await FileModel.findOne({ ...filter })
    return file
  } catch (error) {
    throw new Error('Failed to get file')
  }
}

const deletedLocalFile = async fileId => {
  try {
    const file = await FileModel.findByIdAndDelete(fileId)
    return file
  } catch (error) {
    throw new Error('Failed to get file')
  }
}

const deleteFile = async fileId => {
  try {
    return await cloudinary.uploader.destroy(fileId)
  } catch (error) {
    throw new Error('File not deleted')
  }
}

const createFile = async (fileOrFiles, userId) => {
  try {
    const filesArray = Array.isArray(fileOrFiles) ? fileOrFiles : [fileOrFiles]

    const createdFiles = []

    for (const file of filesArray) {
      let ext = path.extname(file.originalname)
      const isRaw = ['.xmls', '.xlsx', '.csv', '.pdf', '.txt'].includes(ext)
      const resourceType = isRaw ? 'auto' : 'image'
      const result = await cloudinary.uploader.upload(file.path, {
        filename_override: file.originalname,
        folder: userId,
        resource_type: resourceType
      })
      const newFile = await FileModel.create({
        name: file.originalname,
        size: file.size,
        url: result.secure_url,
        cloudinaryId: result.public_id,
        userId
      })
      createdFiles.push(newFile)
    }

    const userData = await user.findById(userId).select('files')

    if (userData?.files) {
      userData.files.push(...createdFiles.map(file => file.id))
    } else {
      userData['files'] = createdFiles.map(file => file.id)
    }

    await user.findByIdAndUpdate(userId, {
      files: userData.files
    })

    return createdFiles
  } catch (err) {
    console.log('Failed to upload:', err)
  }
}

module.exports = {
  createFile,
  listFilesForUser,
  listFilesForMessage,
  deleteFile,
  getFile,
  deletedLocalFile
}
