const express = require('express')
const taskHoursHelper = require('../helpers/taskHours')
const requireLogin = require('../middlewares/requireLogin')
const permissionCheckHelper = require('../middlewares/permissionCheck')

const router = express.Router()

router.post('/create', requireLogin, permissionCheckHelper.hasPermission('taskHours'), async (req, res) => {
  try {
    const { body } = req
    if (!body) throw Error('Task hours details cannot be empty!')
    let response = null
    if (Array.isArray(body?.taskHours) && body?.taskHours.length) {
      for (var taskHour of body?.taskHours) {
        taskHour['freelancerId'] = req.user?.userInfo?.freelancers
      }
      response = await taskHoursHelper.createManyTaskHours(body.taskHours)
    } else {
      response = await taskHoursHelper.createTaskHours(body)
    }
    res.json(response)
  } catch (e) {
    res.status(400).json({ msg: e.message })
  }
})

router.get('/', requireLogin, permissionCheckHelper.hasPermission('taskHours'), async (req, res) => {
  try {
    const response = await taskHoursHelper.getAllTaskHours(req.query, req?.user?.userInfo)
    if (!response) throw Error('Task hours not found!')
    res.json(response)
  } catch (e) {
    res.status(400).json({ msg: e.message })
  }
})

router.patch('/:id', requireLogin, permissionCheckHelper.hasPermission('taskHours'), async (req, res) => {
  try {
    const { hours } = req.body
    const { id } = req.params
    if (!hours || hours < 1) throw Error('Task hours details cannot be empty!')
    const taskHours = await taskHoursHelper.updateTaskHours(hours, id)
    res.json(taskHours)
  } catch (e) {
    res.status(400).json({ msg: e.message })
  }
})

router.patch('/:_id', requireLogin, permissionCheckHelper.hasPermission('taskHours'), async (req, res) => {
  try {
    const { updatedAt } = req.body
    const { _id } = req.params
    if (!updatedAt) throw Error('Task hours details cannot be empty!')
    const taskHours = await taskHoursHelper.updateTaskTime({ updatedAt: updatedAt, _id })
    res.json(taskHours)
  } catch (e) {
    res.status(400).json({ msg: e.message })
  }
})

router.delete('/:id', requireLogin, permissionCheckHelper.hasPermission('taskHours'), async (req, res) => {
  try {
    const taskHoursId = req.params.id
    if (!taskHoursId) throw Error('Request cannot be processed without TaskHoursId')
    const result = await taskHoursHelper.deleteTaskHours(taskHoursId)
    res.json(result)
  } catch (e) {
    res.status(400).json({ msg: e.message })
  }
})

module.exports = router
