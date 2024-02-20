const express = require('express')
const router = express.Router()
const fileHelper = require('../helpers/file')
const requireLogin = require('../middlewares/requireLogin')
const permissionCheckHelper = require('../middlewares/permissionCheck')
const upload = require('../middlewares/multer')

// let admin create a list for any user
router.post('/create', requireLogin, upload.single('image'), async (req, res) => {
  try {
    if (req?.file?.path) {
      const newFile = await fileHelper.createFile(req?.file, req.user.sub)
      if (!newFile) throw Error('file not created')
      res.json(newFile)
    } else {
      throw Error('file not created')
    }
  } catch (e) {
    res.status(400).json({ msg: e.message })
  }
})

module.exports = router
