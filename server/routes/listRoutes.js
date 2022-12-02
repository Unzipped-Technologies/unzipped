const express = require("express");
const router = express.Router();
const listHelper = require('../helpers/list')
const userHelper = require('../helpers/user')
const requireLogin = require('../middlewares/requireLogin');
const permissionCheckHelper = require('../middlewares/permissionCheck');

// let admin create a list for any user
router.post('/create', requireLogin, permissionCheckHelper.hasPermission('createList'), async (req, res) => {
    try {
      const newList = await listHelper.createLists(req.body)
      if(!newList) throw Error('list not created')
      res.json(newList)
    } catch (e) {
      res.status(400).json({msg: e.message})
    }
});

// let user create a list
router.post('/user/create', requireLogin, permissionCheckHelper.hasPermission('userCreateList'), async (req, res) => {
    try {
      req.body.userId = req.user.sub
      const newList = await userHelper.addListsToFreelancer({list: [req.body]}, req.body.userId)
      if(!newList) throw Error('list not created')
      res.json(newList)
    } catch (e) {
      res.status(400).json({msg: e.message})
    }
});

// lets admin get any list
router.get('/:id', requireLogin, permissionCheckHelper.hasPermission('getList'), async (req, res) => {
    try {
      const getList = await listHelper.getListById(req.params.id)
      if(!getList) throw Error('list not found')
      res.json(getList)
    } catch (e) {
      res.status(400).json({msg: e.message})
    }
});

// lets users get their lists
router.post('/user/list', requireLogin, permissionCheckHelper.hasPermission('getUserLists'), async (req, res) => {
    try {
      req.body.filter.user = req.user.sub
      req.body.filter.isActive = true
      const getList = await listHelper.listLists(req.body)
      if(!getList) throw Error('list not found')
      res.json(getList)
    } catch (e) {
      res.status(400).json({msg: e.message})
    }
});

// lets admin get the lists of lists
router.post('/list', requireLogin, permissionCheckHelper.hasPermission('getLists'), async (req, res) => {
    // includes lists that are not active. Pass isActive true to get only existing lists
    try {
      const getList = await listHelper.listLists(req.body)
      if(!getList) throw Error('list not found')
      res.json(getList)
    } catch (e) {
      res.status(400).json({msg: e.message})
    }
});

// lets user update their lists
router.post('/update', requireLogin, permissionCheckHelper.hasPermission('updateLists'), async (req, res) => {
    // includes lists that are not active. Pass isActive true to get only existing lists
    try {
      const updateList = await listHelper.updateLists(req.body)
      if(!updateList) throw Error('list not found')
      res.json(updateList)
    } catch (e) {
      res.status(400).json({msg: e.message})
    }
});

// lets user delete their lists
router.post('/delete', requireLogin, permissionCheckHelper.hasPermission('deleteLists'), async (req, res) => {
    // includes lists that are not active. Pass isActive true to get only existing lists
    try {
      await listHelper.deleteLists(req.body.listId)
      res.json({msg: 'list successfully deleted'})
    } catch (e) {
      res.status(400).json({msg: e.message})
    }
});

module.exports = router;