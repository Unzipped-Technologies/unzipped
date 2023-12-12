const multer = require('multer')
const path = require('path')

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = [
    '.jpg',
    '.jpeg',
    '.png',
    '.doc',
    '.xls',
    '.csv',
    '.zip',
    '.bmp',
    '.gif',
    '.pdf',
    '.xlsx',
    '.xlsx'
  ]
  const ext = path.extname(file.originalname)

  if (allowedFileTypes.includes(ext)) {
    cb(null, true)
  } else {
    cb(new Error('Unsupported file type!'), false)
  }
}

const upload = multer({
  storage: multer.diskStorage({}),
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB file size limit
  },
  fileFilter: fileFilter
})
module.exports = upload
