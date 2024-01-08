const mongoose = require('mongoose')
const cloudinary = require('../../services/cloudinary')
const upload = require('../middlewares/multer')
const FileModel = require('../../models/file')
const user = require('../../models/User')
const path = require('path')
// https://www.topcoder.com/thrive/articles/using-cloudinary-for-image-storage-with-express

const createFile = async (file, userId) => {
  try {
    let ext = path.extname(file.originalname)
    const isRaw = ['.xmls', '.xlsx', '.csv'].includes(ext)
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
    const userData = await user.findById(userId).select('files')

    if (userData?.files) {
      userData.files.push(newFile.id)
    } else {
      userData['files'] = [response.id]
    }
    await user.findByIdAndUpdate(userId, {
      files: userData.files
    })
    return newFile
  } catch (err) {
    console.log('failed to upload::', err)
  }
}

const listFilesForUser = async ({ filter = {}, take = 25, skip = 0 }, id) => {
  return
}

const listFilesForMessage = async (conversationId, id) => {
  return undefined
}

const deleteFile = async fileId => {
  return await cloudinary.uploader.destroy(fileId)
}

module.exports = {
  createFile,
  listFilesForUser,
  listFilesForMessage,
  deleteFile
}
