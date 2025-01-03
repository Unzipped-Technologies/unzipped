const express = require('express')
const mongoose = require('mongoose')

const router = express.Router()
const businessHelper = require('../helpers/business')
const departmentHelper = require('../helpers/department')
const requireLogin = require('../middlewares/requireLogin')
const permissionCheckHelper = require('../middlewares/permissionCheck')
const upload = require('../middlewares/multer')

router.post(
  '/create',
  requireLogin,
  permissionCheckHelper.hasPermission('createBusiness'),
  upload.array('images', 3),
  async (req, res) => {
    try {
      req.body['userId'] = req.user.sub
      const businessDetails = JSON.parse(req.body?.projectDetails)
      if (!businessDetails) throw Error('can not process without business details')
      const createBusiness = await businessHelper.createBusiness(businessDetails, req.user.sub, req.files)
      if (!createBusiness) throw Error('business already exists')
      res.json(createBusiness)
    } catch (e) {
      res.status(400).json({ msg: e.message })
    }
  }
)

router.post(
  '/update',
  requireLogin,
  permissionCheckHelper.hasPermission('updateBusiness'),
  upload.array('images', 3),
  async (req, res) => {
    try {
      const businessDetails = JSON.parse(req.body?.projectDetails)

      const existingBusiness = await businessHelper.updateBusiness(businessDetails, req.user.sub, req.files)
      console.log('existingBusiness', existingBusiness)
      if (!existingBusiness) throw Error('business does not exist')
      res.json(existingBusiness)
    } catch (e) {
      res.status(400).json({ msg: e.message })
    }
  }
)

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

router.post('/list', requireLogin, permissionCheckHelper.hasPermission('userListBusinesses'), async (req, res) => {
  try {
    if (req.user?.userInfo) {
      if (req.user?.userInfo?.role === 1 && req.user?.userInfo?.freelancers) {
        req.body['filter'] = Object.assign({}, req.body?.['filter'], {
          applicants: { $in: [mongoose.Types.ObjectId(req.user?.userInfo?.freelancers)] }
        })
      } else if (req.user?.userInfo?.role === 0) {
        req.body['filter'] = Object.assign({}, req.body?.['filter'], {
          userId: req.user.sub,
          ...(req.body?.searchKey && { searchKey: req.body.searchKey })
        })
      }
    }

    const listBusinesses = await businessHelper.listBusinesses(req.body)
    if (!listBusinesses) throw Error('could not find businesses')
    res.json(listBusinesses)
  } catch (e) {
    res.status(400).json({ msg: e.message })
  }
})

router.post('/public/list', async (req, res) => {
  try {
    req.body['filter'] = Object.assign({}, req.body?.['filter'], {
      isActive: true
    })
    const listBusinesses = await businessHelper.listBusinesses(req.body)
    if (!listBusinesses) throw Error('could not find businesses')
    res.json(listBusinesses)
  } catch (e) {
    res.status(400).json({ msg: e.message })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const business = await businessHelper.getBusinessById(req.params.id, req.user)
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
      res.status(400).json({ msg: e.message })
    }
  }
)

router.get(
  '/investor/task/:businessId',
  requireLogin,
  permissionCheckHelper.hasPermission('removeComment'),
  async (req, res) => {
    try {
      businessId = req.params.businessId
      id = req.user.sub
      const existingBusiness = await businessHelper.getBusinessByInvestor({ businessId, id })
      if (!existingBusiness) throw Error('business does not exist')
      res.json(existingBusiness)
    } catch (e) {
      res.status(400).json({ msg: e.message })
    }
  }
)

router.get(
  '/founder/task/:businessId',
  requireLogin,
  permissionCheckHelper.hasPermission('removeComment'),
  async (req, res) => {
    try {
      businessId = req.params.businessId
      const existingBusiness = await businessHelper.getBusinessByFounder(businessId)
      if (!existingBusiness) throw Error('business does not exist')
      res.json(existingBusiness)
    } catch (e) {
      res.status(400).json({ msg: e.message })
    }
  }
)

router.post(
  '/details',
  requireLogin,
  permissionCheckHelper.hasPermission('createBusinessDetails'),
  async (req, res) => {
    const id = req.body.userId || req.user.sub
    try {
      const businessDetails = await businessHelper.getBusinessDetailsByUserId(id)
      if (!businessDetails) throw Error('business details does not exists')
      res.json(businessDetails)
    } catch (e) {
      res.status(400).json({ msg: e.message })
    }
  }
)

router.post(
  '/details/create',
  requireLogin,
  permissionCheckHelper.hasPermission('createBusinessDetails'),
  async (req, res) => {
    req.body.userId = req.user.sub
    const id = req.body.userId || req.user.sub
    try {
      const businessDetails = await businessHelper.createBusinessDetails(req.body, id)
      if (!businessDetails) throw Error('business details already exists')
      res.json(businessDetails)
    } catch (e) {
      res.status(400).json({ msg: e.message })
    }
  }
)

router.post(
  '/details/update',
  requireLogin,
  permissionCheckHelper.hasPermission('createBusinessDetails'),
  async (req, res) => {
    const id = req.body.userId || req.user.sub
    try {
      const businessDetails = await businessHelper.updateBusinessDetails(req.body, id)
      if (!businessDetails) throw Error('business details could not be updated')
      res.json(businessDetails)
    } catch (e) {
      res.status(400).json({ msg: e.message })
    }
  }
)

router.get('/user-owned-business/:userId', async (req, res) => {
  try {
    const businesses = await businessHelper.getBusinessCreatedByUser(req.params.userId)
    res.json(businesses)
  } catch (e) {
    res.status(400).json({ msg: e.message })
  }
})

router.get('/get-business-employees/:id', async (req, res) => {
  try {
    const isSelectedBusiness = req.query?.isSelectedBusiness === 'true' ? true : false
    const businesses = await businessHelper.getBusinessEmployees(req.params.id, isSelectedBusiness)
    res.json(businesses)
  } catch (e) {
    res.status(400).json({ msg: e.message })
  }
})

router.get('/fetch-all-biz-tasks/:businessId', async (req, res) => {
  try {
    const params = req.params.businessId == 'null' ? null : req.params.businessId
    const tasks = await businessHelper.fetchAllBizTasks(
      params,
      req.query?.departmentId,
      req.query?.isDepartmentRelatedTasks,
      req.query?.userId
    )

    res.json(tasks)
  } catch (e) {
    res.status(400).json({ msg: e.message })
  }
})

router.delete('/delete-business-records/:businessId', async (req, res) => {
  try {
    const tasks = await businessHelper.deleteBusiness(req.params?.businessId)
    if (!tasks) throw Error('Failed to delete business departments')
    res.json(tasks)
  } catch (e) {
    res.status(400).json({ msg: e.message })
  }
})

router.delete(
  '/:businessId/delete-image/:imageId',
  requireLogin,
  permissionCheckHelper.hasPermission('updateBusiness'),
  async (req, res) => {
    try {
      const tasks = await businessHelper.deleteBusinessImage(req.params?.businessId, req.params?.imageId, req.user.sub)
      if (!tasks) throw Error('Failed to delete business image')
      res.json(tasks)
    } catch (e) {
      res.status(400).json({ msg: e.message })
    }
  }
)

module.exports = router
