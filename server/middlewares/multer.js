const multer = require('multer');
const path = require('path');

const fileFilter = (req, file, cb) => {
  try {
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
      '.xlsx'
    ];
    const ext = path.extname(file.originalname).toLowerCase();

    if (allowedFileTypes.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Unsupported file type!'), false);
    }
  } catch (error) {
    console.log('Error on multer', error);
    cb(error);
  }
};

const upload = multer({
  storage: multer.diskStorage({}),
  limits: {
    fileSize: 500 * 1024 * 1024 // 500MB file size limit
  },
  fileFilter: fileFilter
});

module.exports = upload;
