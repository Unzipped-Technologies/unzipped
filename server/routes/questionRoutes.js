const express = require('express')
const router = express.Router()
const questionHelper = require('../helpers/questions')
const requireLogin = require('../middlewares/requireLogin')
const permissionCheckHelper = require('../middlewares/permissionCheck')

router.post('/create', requireLogin, permissionCheckHelper.hasPermission('createQuestion'), async (req, res) => {
  try {
    const response = await questionHelper.createQuestion(req.body)
    if (!response) throw new Error('Question not created')
    res.json(response)
  } catch (e) {
    res.status(400).json({ msg: e.message })
  }
})

router.get('/:id', requireLogin, permissionCheckHelper.hasPermission('getQuestionById'), async (req, res) => {
  try {
    const response = await questionHelper.getQuestionById(req.params.id)
    if (!response) throw new Error('Question not found')
    res.json(response)
  } catch (e) {
    res.status(400).json({ msg: e.message })
  }
})

router.get('/', requireLogin, permissionCheckHelper.hasPermission('getAllQuestions'), async (req, res) => {
  try {
    const response = await questionHelper.getAllQuestions(req.query)
    res.json(response)
  } catch (e) {
    res.status(400).json({ msg: e.message })
  }
})

router.put('/update/:id', requireLogin, permissionCheckHelper.hasPermission('updateQuestion'), async (req, res) => {
  try {
    const response = await questionHelper.updateQuestion(req.params.id, req.body)
    if (!response) throw new Error('Question not found')

    res.json(response)
  } catch (e) {
    res.status(400).json({ msg: e.message })
  }
})

router.delete('/delete/:id', requireLogin, permissionCheckHelper.hasPermission('deleteQuestion'), async (req, res) => {
  try {
    const response = await questionHelper.deleteQuestion(req.params.id)
    if (response) res.json({ msg: 'Question successfully deleted' })
  } catch (e) {
    res.status(400).json({ msg: e.message })
  }
})

module.exports = router
