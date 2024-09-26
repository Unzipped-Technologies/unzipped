const express = require('express')
const router = express.Router()
const freelancerHelper = require('../helpers/freelancer')
const requireLogin = require('../middlewares/requireLogin')
const permissionCheckHelper = require('../middlewares/permissionCheck')
const upload = require('../middlewares/multer')

router.get('/:id', async (req, res) => {
  try {
    const response = await freelancerHelper.getFreelancerById(req.params.id)
    if (!response) throw new Error('Freelancer not found')
    res.json(response)
  } catch (e) {
    res.status(400).json({ msg: e.message })
  }
})

router.get('/list', requireLogin, permissionCheckHelper.hasPermission('getAllApplications'), async (req, res) => {
  try {
    const { filter, take, skip, sort, maxRate, minRate, skill } = req.query
    const response = await userHelper.getAllFreelancers({ filter, take, skip, sort, maxRate, minRate, skill })
    res.json(response)
  } catch (e) {
    res.status(400).json({ msg: e.message })
  }
})

router.patch('/update', requireLogin, permissionCheckHelper.hasPermission('updateApplication'), async (req, res) => {
  try {
    let updateFields = {}
    for (let field in req.body) {
      updateFields[field] = req.body[field]
    }
    if (Object.keys(updateFields).length === 0) {
      throw new Error('No valid fields provided for update')
    }
    const response = await freelancerHelper.updateFreelancer(req.user?.userInfo?.freelancers, updateFields)
    if (!response) throw new Error('Freelancer not found')

    res.json(response)
  } catch (e) {
    res.status(400).json({ msg: e.message })
  }
})

router.post('/update-skills', requireLogin, permissionCheckHelper.hasPermission('addSkill'), async (req, res) => {
  try {
    const addedSkill = await freelancerHelper.updateFreelancerSkills(req.body?.skills, req.user?.userInfo?.freelancers)
    if (!addedSkill) throw Error('freelancer does not exist')
    res.json(addedSkill)
  } catch (e) {
    res.status(400).json({ msg: e.message })
  }
})

router.delete(
  '/delete-skill/:skillId',
  requireLogin,
  permissionCheckHelper.hasPermission('addSkill'),
  async (req, res) => {
    try {
      const addedSkill = await freelancerHelper.deleteSkillFromFreelancer(
        req.params.skillId,
        req.user?.userInfo?.freelancers
      )
      if (!addedSkill) throw Error('freelancer does not exist')
      res.json(addedSkill)
    } catch (e) {
      res.status(400).json({ msg: e.message })
    }
  }
)

router.delete('/:id', requireLogin, permissionCheckHelper.hasPermission('deleteApplication'), async (req, res) => {
  try {
    const response = await freelancerHelper.deleteFreelancer(req.params.id)
    if (response) res.json({ msg: 'Freelancer deleted successfully.' })
  } catch (e) {
    res.status(400).json({ msg: e.message })
  }
})

router.post('/public/list', async (req, res) => {
  try {
    const { take, skip } = req.body
    const freelancers = await freelancerHelper.getAllFreelancers(req.body, take, skip)
    res.json(freelancers)
  } catch (e) {
    res.status(400).json({ msg: e.message })
  }
})
router.post('/add-education', requireLogin, permissionCheckHelper.hasPermission('addSkill'), async (req, res) => {
  try {
    const addedEducation = await freelancerHelper.addEducation(req.body, req.user?.userInfo?.freelancers)
    if (!addedEducation) throw Error('freelancer does not exist')
    res.json(addedEducation)
  } catch (e) {
    res.status(400).json({ msg: e.message })
  }
})
router.delete(
  '/delete-education/:educationId',
  requireLogin,
  permissionCheckHelper.hasPermission('addSkill'),
  async (req, res) => {
    try {
      const removeEducation = await freelancerHelper.deleteEducation(
        req.params.educationId,
        req.user?.userInfo?.freelancers
      )
      if (!removeEducation) throw Error('freelancer does not exist')
      res.json(removeEducation)
    } catch (e) {
      res.status(400).json({ msg: e.message })
    }
  }
)

router.post(
  '/add-project',
  requireLogin,
  permissionCheckHelper.hasPermission('createShowCaseProject'),
  upload.array('projectImages'),

  async (req, res) => {
    try {
      const addedEducation = await freelancerHelper.createShowCaseProject(
        req.body,
        req.user?.userInfo?.freelancers,
        req.user.sub,
        req.files
      )
      if (!addedEducation) throw Error('freelancer does not exist')
      res.json(addedEducation)
    } catch (e) {
      res.status(400).json({ msg: e.message })
    }
  }
)

router.delete(
  '/delete-project/:id',
  requireLogin,
  permissionCheckHelper.hasPermission('deleteShowCaseProject'),
  async (req, res) => {
    try {
      const response = await freelancerHelper.deleteShowCaseProject(req.user?.userInfo?.freelancers, req.params.id)
      if (response) res.json({ msg: 'Project deleted successfully.' })
    } catch (e) {
      res.status(400).json({ msg: e.message })
    }
  }
)

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
router.post('/create-invite', async (req, res) => {
  try {
    const freelancers = await freelancerHelper.createFreelancerInvite(req.body)
    res.json(freelancers)
  } catch (e) {
    res.status(400).json({ msg: e.message })
  }
})
module.exports = router
