const express = require('express')
const router = express.Router()
const taskHelper = require('../helpers/task')
const upload = require('../middlewares/multer')
const requireLogin = require('../middlewares/requireLogin')
const permissionCheckHelper = require('../middlewares/permissionCheck')

router.post('/', requireLogin, permissionCheckHelper.hasPermission('createTask'), async (req, res) => {
  try {
    const response = await taskHelper.createTask(req.body)
    if (!response) throw new Error('Task not created')
    res.json(response)
  } catch (e) {
    res.status(400).json({ msg: e.message })
  }
})

router.get('/:id', requireLogin, permissionCheckHelper.hasPermission('getTaskById'), async (req, res) => {
  try {
    const response = await taskHelper.getTaskById(req.params.id)
    if (!response) throw new Error('Task not found')
    res.json(response)
  } catch (e) {
    res.status(400).json({ msg: e.message })
  }
})

router.get('/', requireLogin, permissionCheckHelper.hasPermission('listTasks'), async (req, res) => {
  try {
    const response = await taskHelper.getAllTasks(req.query)
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
    if (req.body.comments?.length) {
      req.body.comments = req.body.comments.map(comment => (comment['userId'] = req.user?.sub))
    }
    const response = await taskHelper.updateTask(req.params.id, updateFields)
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
    const taskHours = await taskHelper.updateTaskStatus({ tag: tag, _id })
    res.json(taskHours)
  } catch (e) {
    res.status(400).json({ msg: e.message })
  }
})

router.delete('/:id', requireLogin, permissionCheckHelper.hasPermission('deleteTask'), async (req, res) => {
  try {
    const response = await taskHelper.deleteTask(req.params.id)
    if (response) res.json({ msg: 'Task deleted successfully.' })
  } catch (e) {
    res.status(400).json({ msg: e.message })
  }
})

router.post(
  '/comment/add',
  requireLogin,
  permissionCheckHelper.hasPermission('addComment'),
  upload.array('img'),
  async (req, res) => {
    try {
      req.body['userId'] = req.user.sub
      const newComment = await taskHelper.addCommentToTask(req.body, req?.files?.[0] || null)
      if (!newComment) throw Error('failed to add comment to story')
      res.json(newComment)
    } catch (e) {
      res.status(400).json({ msg: e.message })
    }
  }
)

router.patch(
  '/:taskId/comment/:id',
  requireLogin,
  permissionCheckHelper.hasPermission('addComment'),
  upload.array('img'),
  async (req, res) => {
    try {
      req.body['userId'] = req.user.sub
      const newComment = await taskHelper.updateTaskComment(
        req.params?.taskId,
        req.params?.id,
        req.body,
        req?.files?.[0] || null
      )
      if (!newComment) throw Error('failed to add comment to story')
      res.json(newComment)
    } catch (e) {
      res.status(400).json({ msg: e.message })
    }
  }
)

router.delete(
  '/comment/delete/:commentId',
  requireLogin,
  permissionCheckHelper.hasPermission('removeComment'),
  async (req, res) => {
    try {
      const newComment = await taskHelper.removeCommentFromTask(req.params?.commentId)
      if (!newComment) throw Error('failed to remove comment from story')
      res.json(newComment)
    } catch (e) {
      res.status(400).json({ msg: e.message })
    }
  }
)

module.exports = router
