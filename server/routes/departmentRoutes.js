const express = require('express')
const mongoose = require('mongoose')

const router = express.Router()
const departmentHelper = require('../helpers/department')
const requireLogin = require('../middlewares/requireLogin')
const permissionCheckHelper = require('../middlewares/permissionCheck')

router.post('/', requireLogin, permissionCheckHelper.hasPermission('createDepartment'), async (req, res) => {
  try {
    req.body.clientId = req.user.sub
    const response = await departmentHelper.createDepartment(req.body)
    if (!response) throw new Error('Department not created')
    res.json(response)
  } catch (e) {
    res.status(400).json({ msg: e.message })
  }
})

router.get('/:id', requireLogin, permissionCheckHelper.hasPermission('getDepartmentById'), async (req, res) => {
  try {
    let filters = {}
    let currentUser = req?.user?.userInfo
    console.log('currentUser?.role', currentUser?.role)

    if (currentUser) {
      if (currentUser?.role === 1) {
        console.log('if')
        filters['assignee'] = {
          $eq: ['$assignee', mongoose.Types.ObjectId(req?.user?.sub)]
        }
      }
    }
    const response = await departmentHelper.getDepartmentById(req.params.id, filters)
    if (!response) throw new Error('Department not found')
    res.json(response)
  } catch (e) {
    res.status(400).json({ msg: e.message })
  }
})

router.get('/', requireLogin, permissionCheckHelper.hasPermission('listDepartments'), async (req, res) => {
  try {
    const response = await departmentHelper.listDepartments(req.query)
    res.json(response)
  } catch (e) {
    res.status(400).json({ msg: e.message })
  }
})

router.patch('/:id', requireLogin, permissionCheckHelper.hasPermission('updateDepartment'), async (req, res) => {
  try {
    let updateFields = {}
    for (let field in req.body) {
      updateFields[field] = req.body[field]
    }
    if (Object.keys(updateFields).length === 0) {
      throw new Error('No valid fields provided for update')
    }
    const response = await departmentHelper.updateDepartment(updateFields, req.params.id)
    if (!response) throw new Error('Department not found')

    res.json(response)
  } catch (e) {
    res.status(400).json({ msg: e.message })
  }
})

router.patch(
  '/:departmentId/add-task/:taskId',
  requireLogin,
  permissionCheckHelper.hasPermission('updateDepartment'),
  async (req, res) => {
    try {
      const response = await departmentHelper.addTaskToDepartment(req.params.taskId, req.params.departmentId)
      if (!response) throw new Error('Department not found')

      res.json(response)
    } catch (e) {
      res.status(400).json({ msg: e.message })
    }
  }
)

router.delete('/:id', requireLogin, permissionCheckHelper.hasPermission('deleteDepartment'), async (req, res) => {
  try {
    const response = await departmentHelper.deleteDepartment(req.params.id)
    if (response) res.json({ msg: 'Department deleted successfully.' })
  } catch (e) {
    res.status(400).json({ msg: e.message })
  }
})

module.exports = router
