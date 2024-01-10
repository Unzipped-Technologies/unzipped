const express = require('express')
const router = express.Router()
const projectApplications = require('../helpers/projectApplications')
const requireLogin = require('../middlewares/requireLogin')
const permissionCheckHelper = require('../middlewares/permissionCheck')
const upload = require('../middlewares/multer')

router.post(
  '/',
  requireLogin,
  permissionCheckHelper.hasPermission('createApplication'),
  upload.array('resume'),
  async (req, res) => {
    try {
      console.log('req.body', req.body?.projectId)
      const response = await projectApplications.createApplication(req.body, req?.files[0] || null, req.user.sub)
      if (!response) throw new Error('Application not created')
      res.json(response)
    } catch (e) {
      res.status(400).json({ msg: e.message })
    }
  }
)

router.get('/:id', requireLogin, permissionCheckHelper.hasPermission('getApplicationById'), async (req, res) => {
  try {
    const response = await projectApplications.getApplicationById(req.params.id)
    if (!response) throw new Error('Application not found')
    res.json(response)
  } catch (e) {
    res.status(400).json({ msg: e.message })
  }
})

router.get('/', requireLogin, permissionCheckHelper.hasPermission('getAllApplications'), async (req, res) => {
  try {
    const response = await projectApplications.getAllApplications(req.query)
    res.json(response)
  } catch (e) {
    res.status(400).json({ msg: e.message })
  }
})

router.patch('/:id', requireLogin, permissionCheckHelper.hasPermission('updateApplication'), async (req, res) => {
  try {
    let updateFields = {}
    for (let field in req.body) {
      updateFields[field] = req.body[field]
    }
    if (Object.keys(updateFields).length === 0) {
      throw new Error('No valid fields provided for update')
    }
    const response = await projectApplications.updateApplication(req.params.id, updateFields)
    if (!response) throw new Error('Application not found')

    res.json(response)
  } catch (e) {
    res.status(400).json({ msg: e.message })
  }
})

router.delete('/:id', requireLogin, permissionCheckHelper.hasPermission('deleteApplication'), async (req, res) => {
  try {
    const response = await projectApplications.deleteApplication(req.params.id)
    if (response) res.json({ msg: 'Application deleted successfully.' })
  } catch (e) {
    res.status(400).json({ msg: e.message })
  }
})

module.exports = router
