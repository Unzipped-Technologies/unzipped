const express = require('express')
const router = express.Router()
const tasks = require('../helpers/task')
const requireLogin = require('../middlewares/requireLogin')
const permissionCheckHelper = require('../middlewares/permissionCheck')

router.post('/', requireLogin, permissionCheckHelper.hasPermission('createTask'), async (req, res) => {
  try {
    const response = await tasks.createTask(req.body)
    if (!response) throw new Error('Task not created')
    res.json(response)
  } catch (e) {
    res.status(400).json({ msg: e.message })
  }
})

router.get('/:id', requireLogin, permissionCheckHelper.hasPermission('getTaskById'), async (req, res) => {
  try {
    const response = await tasks.getTaskById(req.params.id)
    if (!response) throw new Error('Task not found')
    res.json(response)
  } catch (e) {
    res.status(400).json({ msg: e.message })
  }
})

router.get('/', requireLogin, permissionCheckHelper.hasPermission('listTasks'), async (req, res) => {
  try {
    const response = await tasks.getAllTasks(req.query)
    res.json(response)
  } catch (e) {
    res.status(400).json({ msg: e.message })
  }
})

router.patch('/:id', requireLogin, permissionCheckHelper.hasPermission('updateTask'), async (req, res) => {
  try {
    let updateFields = {}
    for (let field in req.body) {
      updateFields[field] = req.body[field]
    }
    if (Object.keys(updateFields).length === 0) {
      throw new Error('No valid fields provided for update')
    }
    const response = await tasks.updateTask(req.params.id, updateFields)
    if (!response) throw new Error('Task not found')

    res.json(response)
  } catch (e) {
    res.status(400).json({ msg: e.message })
  }
})

router.patch('/status/:_id', requireLogin, permissionCheckHelper.hasPermission('taskHours'), async (req, res) => {
  try {
    const { tag } = req.body
    const { _id } = req.params
    if (!tag) throw Error('Task hours details cannot be empty!')
    const taskHours = await tasks.updateTaskStatus({ tag: tag, _id })
    res.json(taskHours)
  } catch (e) {
    res.status(400).json({ msg: e.message })
  }
})

router.delete('/:id', requireLogin, permissionCheckHelper.hasPermission('deleteTask'), async (req, res) => {
  try {
    const response = await tasks.deleteTask(req.params.id)
    if (response) res.json({ msg: 'Task deleted successfully.' })
  } catch (e) {
    res.status(400).json({ msg: e.message })
  }
})

module.exports = router
