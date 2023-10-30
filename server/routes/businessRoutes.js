const express = require("express");
const router = express.Router();
const businessHelper = require('../helpers/business')
const departmentHelper = require('../helpers/department')
const requireLogin = require('../middlewares/requireLogin');
const permissionCheckHelper = require('../middlewares/permissionCheck');

router.post('/user/list',requireLogin, permissionCheckHelper.hasPermission('userListBusinesses'), async (req, res) => {
  try {
    const { filter = {}, take = 25, skip = 0 } = req.body;
    filter.userId = req.user.sub
    const listBusinesses = await businessHelper.listBusinesses({ filter, take, skip })
    if(!listBusinesses) throw Error('could not find businesses')
    res.json(listBusinesses)
  } catch (e) {
    res.status(400).json({msg: e.message})
  }
});

router.post('/list', async (req, res) => {
  try {
    const { filter = {}, take = 25, skip = 0 } = req.body;
    const listBusinesses = await businessHelper.listBusinesses({ filter, take, skip })
    if(!listBusinesses) throw Error('could not find businesses')
    res.json(listBusinesses)
  } catch (e) {
    res.status(400).json({msg: e.message})
  }
});


module.exports = router;