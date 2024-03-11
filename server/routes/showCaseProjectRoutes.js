const express = require('express')
const router = express.Router()
const showCaseProjects = require('../helpers/showCaseProjects')
const requireLogin = require('../middlewares/requireLogin')
const permissionCheckHelper = require('../middlewares/permissionCheck')
const upload = require('../middlewares/multer')

router.post(
  '/',
  requireLogin,
  permissionCheckHelper.hasPermission('createShowCaseProject'),
  upload.array('projectImages'),
  async (req, res) => {
    try {
      if (req.files?.length > 3) throw new Error('You can only upload three images.')
      req.body['freelancerId'] = req?.user?.userInfo?.freelancers

      const response = await showCaseProjects.createProject(req.body, req.user.sub, req.files)
      if (!response) throw new Error('Project not created')
      res.json(response)
    } catch (e) {
      res.status(400).json({ msg: e.message })
    }
  }
)

router.get('/:id', requireLogin, permissionCheckHelper.hasPermission('getShowCaseProjectById'), async (req, res) => {
  try {
    const response = await showCaseProjects.getProjectById(req.params.id)
    if (!response) throw new Error('Project not found')
    res.json(response)
  } catch (e) {
    res.status(400).json({ msg: e.message })
  }
})

router.get('/', requireLogin, permissionCheckHelper.hasPermission('getAllShowCaseProjects'), async (req, res) => {
  try {
    const response = await showCaseProjects.getAllProjects(req.query)
    res.json(response)
  } catch (e) {
    res.status(400).json({ msg: e.message })
  }
})

router.patch('/:id', requireLogin, permissionCheckHelper.hasPermission('updateShowCaseProject'), async (req, res) => {
  try {
    let updateFields = {}
    for (let field in req.body) {
      updateFields[field] = req.body[field]
    }
    if (Object.keys(updateFields).length === 0) {
      throw new Error('No valid fields provided for update')
    }
    const response = await showCaseProjects.updateProject(req.params.id, updateFields)
    if (!response) throw new Error('Project not found')

    res.json(response)
  } catch (e) {
    res.status(400).json({ msg: e.message })
  }
})

router.delete('/:id', requireLogin, permissionCheckHelper.hasPermission('deleteShowCaseProject'), async (req, res) => {
  try {
    const response = await showCaseProjects.deleteProject(req.params.id)
    if (response) res.json({ msg: 'Project deleted successfully.' })
  } catch (e) {
    res.status(400).json({ msg: e.message })
  }
})

router.delete(
  '/:id/image/:imageId',
  requireLogin,
  permissionCheckHelper.hasPermission('deleteShowCaseProject'),
  async (req, res) => {
    try {
      const response = await showCaseProjects.deleteProjectImage(
        req.params.id,
        req.params?.imageId,
        req?.user?.userInfo?.freelancers
      )
      if (response) res.json({ msg: 'Project image deleted successfully.' })
    } catch (e) {
      res.status(400).json({ msg: e.message })
    }
  }
)

module.exports = router
