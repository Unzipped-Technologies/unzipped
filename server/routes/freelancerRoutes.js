const express = require('express')
const router = express.Router()
const freelancerHelper = require('../helpers/freelancer')
const requireLogin = require('../middlewares/requireLogin')
const permissionCheckHelper = require('../middlewares/permissionCheck')

router.get('/:id', requireLogin, permissionCheckHelper.hasPermission('getApplicationById'), async (req, res) => {
  try {
    const response = await freelancerHelper.getFreelancerById(req.params.id)
    if (!response) throw new Error('Application not found')
    res.json(response)
  } catch (e) {
    res.status(400).json({ msg: e.message })
  }
})

router.get('/', requireLogin, permissionCheckHelper.hasPermission('getAllApplications'), async (req, res) => {
  try {
    const { filter, take, skip, sort, maxRate, minRate, skill } = req.query
    const response = await userHelper.getAllFreelancers({ filter, take, skip, sort, maxRate, minRate, skill })
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
    const response = await freelancerHelper.updateFreelancer(req.params.id, updateFields)
    if (!response) throw new Error('Freelancer not found')

    res.json(response)
  } catch (e) {
    res.status(400).json({ msg: e.message })
  }
})

router.post('/add/skill', requireLogin, permissionCheckHelper.hasPermission('addSkill'), async (req, res) => {
  try {
    const addedSkill = await freelancerHelper.addSkillsToFreelancer(req.body, req.user?.userInfo?.freelancers)
    if (!addedSkill) throw Error('freelancer does not exist')
    res.json(addedSkill)
  } catch (e) {
    res.status(400).json({ msg: e.message })
  }
})

router.post(
  '/delete/skill/:skillId',
  requireLogin,
  permissionCheckHelper.hasPermission('addSkill'),
  async (req, res) => {
    try {
      const addedSkill = await freelancerHelper.deleteSkillFromFreelancer(
        req.params.skillId.skillId,
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

module.exports = router
