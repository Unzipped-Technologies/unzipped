const multer = require("multer");
const path = require("path");

const fileTypes = [
  ".jpg",
  ".jpeg",
  ".png",
  ".doc",
  ".xls",
  ".csv",
  ".zip",
  ".bmp",
  ".gif",
  ".pdf",
  ".xlsx",
  ".xlsx",
]
// Multer config
module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (!fileTypes.includes(ext)) {
      cb(new Error("Unsupported file type!"), false);
      return;
    }
    cb(null, true);
  },
});