const express = require('express')
const router = express.Router()
const businessHelper = require('../helpers/business')
const departmentHelper = require('../helpers/department')
const requireLogin = require('../middlewares/requireLogin')
const permissionCheckHelper = require('../middlewares/permissionCheck')
const upload = require('../middlewares/multer')

router.post('/create',
  requireLogin,
  permissionCheckHelper.hasPermission('createBusiness'),
  upload.array('images', 3),
  async (req, res) => {
    const id = req.body.id || req.user.sub
    // req.body.user = id
    try {
      const { projectDetails } = req.body;
      const createBusiness = await businessHelper.createBusiness(JSON.parse(projectDetails), id, req.files)
      if (!createBusiness) throw Error('business already exists')
      res.json(createBusiness)
    } catch (e) {
      res.status(400).json({ msg: e.message })
    }
  })

router.post(
  '/user/create',
  requireLogin,
  permissionCheckHelper.hasPermission('userCreateBusiness'),
  async (req, res) => {
    try {
      const createBusiness = await businessHelper.createBusiness(req.body, req.user.sub)
      if (!createBusiness) throw Error('failed to create business')
      res.json(createBusiness)
    } catch (e) {
      res.status(400).json({ msg: e.message })
    }
  }
)

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
    const listBusinesses = await businessHelper.listBusinesses(req.body)
    if (!listBusinesses) throw Error('could not find businesses')
    res.json(listBusinesses)
  } catch (e) {
    res.status(400).json({ msg: e.message })
  }
})

router.post('/list', requireLogin, async (req, res) => {
  try {
    const listBusinesses = await businessHelper.listBusinesses(req.body)
    if (!listBusinesses) throw Error('could not find businesses')
    res.json(listBusinesses)
  } catch (e) {
    res.status(400).json({ msg: e.message })
  }
})

router.get('/:id', requireLogin, permissionCheckHelper.hasPermission('getBusinessById'), async (req, res) => {
  try {
    const id = req.params.id
    const business = await businessHelper.getBusinessById(id, req.user)
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

// departments //

router.post(
  '/department/create',
  requireLogin,
  permissionCheckHelper.hasPermission('createDepartment'),
  async (req, res) => {
    try {
      const createDepartment = await departmentHelper.addDepartmentToBusiness(req.body, req.user.sub)
      if (!createDepartment) throw Error('failed to create department')
      res.json(createDepartment)
    } catch (e) {
      res.status(400).json({ msg: e.message })
    }
  }
)

router.put(
  '/department/update/:id',
  requireLogin,
  permissionCheckHelper.hasPermission('createDepartment'),
  async (req, res) => {
    const { id } = req.params
    try {
      const createDepartment = await departmentHelper.updateDepartment(id, req.body)
      if (!createDepartment) throw Error('failed to create department')
      res.json(createDepartment)
    } catch (e) {
      res.status(400).json({ msg: e.message })
    }
  }
)

router.get(
  '/department/:id',
  requireLogin,
  permissionCheckHelper.hasPermission('createDepartment'),
  async (req, res) => {
    try {
      const id = req.params.id
      const department = await departmentHelper.getDepartmentById(id)
      if (!department) throw Error('failed to get department')
      res.json(department)
    } catch (e) {
      res.status(400).json({ msg: e.message })
    }
  }
)

router.post(
  '/department/list',
  requireLogin,
  permissionCheckHelper.hasPermission('listDepartments'),
  async (req, res) => {
    try {
      const { filter = {}, take = 25, skip = 0 } = req.body
      const listDepartment = await departmentHelper.listDepartments({ filter, take, skip })
      if (!listDepartment) throw Error('failed to list departments')
      res.json(listDepartment)
    } catch (e) {
      res.status(400).json({ msg: e.message })
    }
  }
)

router.post('/current/tag/create', requireLogin, permissionCheckHelper.hasPermission('createTag'), async (req, res) => {
  try {
    const createTag = await departmentHelper.addTagToDepartment(req.body, req.user.sub)
    if (!createTag) throw Error('failed to create department')
    res.json(createTag)
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
  '/current/task/create',
  requireLogin,
  permissionCheckHelper.hasPermission('createTask'),
  async (req, res) => {
    try {
      req.body.userId = req.user.sub
      const createTask = await departmentHelper.addTaskToDepartment(req.body, req.user.sub)
      if (!createTask) throw Error('failed to create task')
      res.json(createTask)
    } catch (e) {
      res.status(400).json({ msg: e.message })
    }
  }
)

router.post(
  '/current/task/order',
  requireLogin,
  permissionCheckHelper.hasPermission('orderTasks'),
  async (req, res) => {
    try {
      const orderTasks = await departmentHelper.reorderTasks(req.body)
      if (!orderTasks) throw Error('failed to reorder tasks')
      res.json(orderTasks)
    } catch (e) {
      res.status(400).json({ msg: e.message })
    }
  }
)

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

router.post('/details',
  requireLogin,
  permissionCheckHelper.hasPermission('createBusinessDetails'),
  async (req, res) => {
    const id = req.body.userId || req.user.sub
    try {
      const businessDetails = await businessHelper.getBusinessDetailsByUserId(id)
      if (!businessDetails) throw Error('business details already exists')
      res.json(businessDetails)
    } catch (e) {
      res.status(400).json({ msg: e.message })
    }
})

router.post('/details/create',
  requireLogin,
  permissionCheckHelper.hasPermission('createBusinessDetails'),
  async (req, res) => {
    const id = req.body.userId || req.user.sub
    try {
      const businessDetails = await businessHelper.createBusinessDetails(req.body, id)
      if (!businessDetails) throw Error('business details already exists')
      res.json(businessDetails)
    } catch (e) {
      res.status(400).json({ msg: e.message })
    }
})

router.post('/details/update',
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
})

module.exports = router
