const express = require('express')
const router = express.Router()
const businessHelper = require('../helpers/business')
const departmentHelper = require('../helpers/department')
const requireLogin = require('../middlewares/requireLogin')
const permissionCheckHelper = require('../middlewares/permissionCheck')

router.post('/create', requireLogin, permissionCheckHelper.hasPermission('createBusiness'), async (req, res) => {
  req.body.userId = req.user.sub
  try {
    const createBusiness = await businessHelper.createBusiness(req.body)
    if (!createBusiness) throw Error('business already exists')
    res.json(createBusiness)
  } catch (e) {
    res.status(400).json({ msg: e.message })
  }
})

router.post('/update', requireLogin, permissionCheckHelper.hasPermission('updateBusiness'), async (req, res) => {
  try {
    const existingBusiness = await businessHelper.updateBusiness(req.body)
    if (!existingBusiness) throw Error('business does not exist')
    res.json(existingBusiness)
  } catch (e) {
    res.status(400).json({ msg: e.message })
  }
})

router.post(
  '/user/update',
  requireLogin,
  permissionCheckHelper.hasPermission('userUpdateBusiness'),
  async (req, res) => {
    try {
      req.body.userId = req.user.sub
      const existingBusiness = await businessHelper.updateBusiness({ filter, take, skip })
      if (!existingBusiness) throw Error('business does not exist')
      res.json(existingBusiness)
    } catch (e) {
      res.status(400).json({ msg: e.message })
    }
  }
)

router.post('/user/list', requireLogin, permissionCheckHelper.hasPermission('userListBusinesses'), async (req, res) => {
  try {
    const { filter = {}, take = 25, skip = 0 } = req.body
    filter.userId = req.user.sub
    const listBusinesses = await businessHelper.listBusinesses({ filter, take, skip })
    if (!listBusinesses) throw Error('could not find businesses')
    res.json(listBusinesses)
  } catch (e) {
    res.status(400).json({ msg: e.message })
  }
})

router.post('/list', requireLogin, async (req, res) => {
  try {
    const { filter, take, skip, maxRate, minRate, skill, type } = req.query
    const listBusinesses = await businessHelper.listBusinesses({ filter, take, skip, maxRate, minRate, skill, type })
    if (!listBusinesses) throw Error('could not find businesses')
    res.json(listBusinesses)
  } catch (e) {
    res.status(400).json({ msg: e.message })
  }
})

router.get('/:id', requireLogin, permissionCheckHelper.hasPermission('getBusinessById'), async (req, res) => {
  try {
    const id = req.params.id
    const business = await businessHelper.getBusinessById(id, req.user.sub)
    if (!business) throw Error('failed to get business')
    res.json(business)
  } catch (e) {
    res.status(400).json({ msg: e.message })
  }
})

router.delete('/delete/:id', requireLogin, permissionCheckHelper.hasPermission('deleteBusiness'), async (req, res) => {
  try {
    if (!req?.params?.id) throw Error('Provide business id.')
    const deleteBusiness = await businessHelper.deleteBusiness(req.params.id, req.user.sub)
    res.json(deleteBusiness)
  } catch (e) {
    res.status(400).json({ msg: e.message })
  }
})

router.post('/employee/create', requireLogin, permissionCheckHelper.hasPermission('createTag'), async (req, res) => {
  try {
    const createSubscription = await departmentHelper.addBusinessAssociateToBusiness(req.body)
    if (!createSubscription) throw Error('failed to create department')
    res.json(createSubscription)
  } catch (e) {
    res.status(400).json({ msg: e.message })
  }
})

router.post(
  '/current/comment/add',
  requireLogin,
  permissionCheckHelper.hasPermission('addComment'),
  async (req, res) => {
    try {
      const newComment = await departmentHelper.addCommentToTask(req.body)
      if (!newComment) throw Error('failed to add comment to story')
      res.json(newComment)
    } catch (e) {
      res.status(400).json({ msg: e.message })
    }
  }
)

router.post(
  '/current/comment/remove',
  requireLogin,
  permissionCheckHelper.hasPermission('removeComment'),
  async (req, res) => {
    try {
      const newComment = await departmentHelper.removeCommentToTask(req.body)
      if (!newComment) throw Error('failed to remove comment from story')
      res.json(newComment)
    } catch (e) {
      res.status(400).json({ msg: e.message })
    }
  }
)

router.get(
  '/investor/:id',
  requireLogin,
  permissionCheckHelper.hasPermission('getBusinessByInvestor'),
  async (req, res) => {
    try {
      id = req.user.sub
      const existingBusiness = await businessHelper.getAllBusinessByInvestor(id, req?.query)
      if (!existingBusiness) throw Error('business does not exist')
      res.json(existingBusiness)
    } catch (e) {
      console.log('e', e)
      res.status(400).json({ msg: e.message })
    }
  }
)

module.exports = router
