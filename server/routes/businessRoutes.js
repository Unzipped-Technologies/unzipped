const express = require("express");
const router = express.Router();
const businessHelper = require('../helpers/business')
const requireLogin = require('../middlewares/requireLogin');
const permissionCheckHelper = require('../middlewares/permissionCheck');

router.post('/create', requireLogin, permissionCheckHelper.hasPermission('createBusiness'), async (req, res) => {
    try {
      const createBusiness = await businessHelper.createBusiness(req.body)
      if(!createBusiness) throw Error('business already exists')
      res.json(createBusiness)
    } catch (e) {
      res.status(400).json({msg: e.message})
    }
});

router.post('/user/create', requireLogin, permissionCheckHelper.hasPermission('userCreateBusiness'), async (req, res) => {
    try {
      req.body.userId = req.user.sub
      const createBusiness = await userHelper.createBusiness(req.body)
      if(!createBusiness) throw Error('failed to create business')
      res.json(createBusiness)
    } catch (e) {
      res.status(400).json({msg: e.message})
    }
});

router.post('/update', requireLogin, permissionCheckHelper.hasPermission('updateBusiness'), async (req, res) => {
    try {
      const existingBusiness = await userHelper.updateBusiness(req.body)
      if(!existingBusiness) throw Error('business does not exist')
      res.json(existingBusiness)
    } catch (e) {
      res.status(400).json({msg: e.message})
    }
});

router.post('/user/update', requireLogin, permissionCheckHelper.hasPermission('userUpdateBusiness'), async (req, res) => {
    try {
      req.body.userId = req.user.sub
      const existingBusiness = await userHelper.updateBusiness({ filter, take, skip })
      if(!existingBusiness) throw Error('business does not exist')
      res.json(existingBusiness)
    } catch (e) {
      res.status(400).json({msg: e.message})
    }
});

router.post('/user/list', requireLogin, permissionCheckHelper.hasPermission('userListBusinesses'), async (req, res) => {
    try {
      req.body.userId = req.user.sub
      const { filter, take = 25, skip = 0 } = req.body;
      const listBusinesses = await userHelper.listBusinesses({ filter, take, skip })
      if(!listBusinesses) throw Error('could not find businesses')
      res.json(listBusinesses)
    } catch (e) {
      res.status(400).json({msg: e.message})
    }
});

router.post('/list', requireLogin, permissionCheckHelper.hasPermission('listAllBusinesses'), async (req, res) => {
    try {
      const { filter, take = 25, skip = 0 } = req.body;
      const listBusinesses = await userHelper.listBusinesses({ filter, take, skip })
      if(!listBusinesses) throw Error('could not find businesses')
      res.json(listBusinesses)
    } catch (e) {
      res.status(400).json({msg: e.message})
    }
});

router.post('/delete', requireLogin, permissionCheckHelper.hasPermission('deleteBusiness'), async (req, res) => {
    try {
      const deleteBusiness = await userHelper.deleteBusiness(req.user.sub)
      res.json(deleteBusiness)
    } catch (e) {
      res.status(400).json({msg: e.message})
    }
});

module.exports = router;