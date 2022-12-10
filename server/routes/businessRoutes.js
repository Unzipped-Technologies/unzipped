const express = require("express");
const router = express.Router();
const businessHelper = require('../helpers/business')
const departmentHelper = require('../helpers/department')
const requireLogin = require('../middlewares/requireLogin');
const permissionCheckHelper = require('../middlewares/permissionCheck');

router.post('/create', requireLogin, permissionCheckHelper.hasPermission('createBusiness'), async (req, res) => {
    const id = req.body.id || req.user.sub
    try {
      const createBusiness = await businessHelper.createBusiness(req.body, id)
      if(!createBusiness) throw Error('business already exists')
      res.json(createBusiness)
    } catch (e) {
      res.status(400).json({msg: e.message})
    }
});

router.post('/user/create', requireLogin, permissionCheckHelper.hasPermission('userCreateBusiness'), async (req, res) => {
    try {
      const createBusiness = await businessHelper.createBusiness(req.body, req.user.sub)
      if(!createBusiness) throw Error('failed to create business')
      res.json(createBusiness)
    } catch (e) {
      res.status(400).json({msg: e.message})
    }
});

router.post('/update', requireLogin, permissionCheckHelper.hasPermission('updateBusiness'), async (req, res) => {
    try {
      const existingBusiness = await businessHelper.updateBusiness(req.body)
      if(!existingBusiness) throw Error('business does not exist')
      res.json(existingBusiness)
    } catch (e) {
      res.status(400).json({msg: e.message})
    }
});

router.post('/user/update', requireLogin, permissionCheckHelper.hasPermission('userUpdateBusiness'), async (req, res) => {
    try {
      req.body.userId = req.user.sub
      const existingBusiness = await businessHelper.updateBusiness({ filter, take, skip })
      if(!existingBusiness) throw Error('business does not exist')
      res.json(existingBusiness)
    } catch (e) {
      res.status(400).json({msg: e.message})
    }
});

router.post('/user/list', requireLogin, permissionCheckHelper.hasPermission('userListBusinesses'), async (req, res) => {
    try {
      req.body.userId = req.user.sub
      console.log('////req.user.sub', req.user.sub)
      const { filter, take = 25, skip = 0 } = req.body;
      const listBusinesses = await businessHelper.listBusinesses({ filter, take, skip })
      if(!listBusinesses) throw Error('could not find businesses')
      res.json(listBusinesses)
    } catch (e) {
      res.status(400).json({msg: e.message})
    }
});

router.post('/list', requireLogin, permissionCheckHelper.hasPermission('listAllBusinesses'), async (req, res) => {
    try {
      const { filter, take = 25, skip = 0 } = req.body;
      const listBusinesses = await businessHelper.listBusinesses({ filter, take, skip })
      if(!listBusinesses) throw Error('could not find businesses')
      res.json(listBusinesses)
    } catch (e) {
      res.status(400).json({msg: e.message})
    }
});

router.post('/delete', requireLogin, permissionCheckHelper.hasPermission('deleteBusiness'), async (req, res) => {
    try {
      const deleteBusiness = await businessHelper.deleteBusiness(req.user.sub)
      res.json(deleteBusiness)
    } catch (e) {
      res.status(400).json({msg: e.message})
    }
});

// departments //

router.post('/department/create', requireLogin, permissionCheckHelper.hasPermission('createDepartment'), async (req, res) => {
    try {
      const createDepartment = await departmentHelper.addDepartmentToBusiness(req.body, req.user.sub)
      if(!createDepartment) throw Error('failed to create department')
      res.json(createDepartment)
    } catch (e) {
      res.status(400).json({msg: e.message})
    }
});

// TODO create an update department route


module.exports = router;