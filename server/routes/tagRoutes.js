const express = require('express')
const router = express.Router()
const tagHelper = require('../helpers/tags')
const requireLogin = require('../middlewares/requireLogin')
const permissionCheckHelper = require('../middlewares/permissionCheck')

router.post('/', requireLogin, permissionCheckHelper.hasPermission('createTag'), async (req, res) => {
  try {
    const response = await tagHelper.createTag(req.body)
    if (!response) throw new Error('Tag not created')
    res.json(response)
  } catch (e) {
    res.status(400).json({ msg: e.message })
  }
})

router.get('/:id', requireLogin, permissionCheckHelper.hasPermission('getTagById'), async (req, res) => {
  try {
    const response = await tagHelper.getTagById(req.params.id)
    if (!response) throw new Error('Tag not found')
    res.json(response)
  } catch (e) {
    res.status(400).json({ msg: e.message })
  }
})

router.get('/', requireLogin, permissionCheckHelper.hasPermission('listTags'), async (req, res) => {
  try {
    const response = await tagHelper.getAllTags(req.query)
    res.json(response)
  } catch (e) {
    res.status(400).json({ msg: e.message })
  }
})

router.patch('/:id', requireLogin, permissionCheckHelper.hasPermission('updateTag'), async (req, res) => {
  try {
    let updateFields = {}
    for (let field in req.body) {
      updateFields[field] = req.body[field]
    }
    if (Object.keys(updateFields).length === 0) {
      throw new Error('No valid fields provided for update')
    }
    const response = await tagHelper.updateTag(updateFields, req.params.id)
    if (!response) throw new Error('Tag not found')

    res.json(response)
  } catch (e) {
    res.status(400).json({ msg: e.message })
  }
})

router.delete('/:id', requireLogin, permissionCheckHelper.hasPermission('deleteTag'), async (req, res) => {
  try {
    const response = await tagHelper.deleteTag(req.params.id)
    if (response) res.json({ msg: 'Tag deleted successfully.' })
  } catch (e) {
    res.status(400).json({ msg: e.message })
  }
})

module.exports = router
