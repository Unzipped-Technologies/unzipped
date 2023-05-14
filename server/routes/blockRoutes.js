const express = require("express")
const router = express.Router()
const blockHelper = require('../helpers/block')
const requireLogin = require('../middlewares/requireLogin');
const permissionCheckHelper = require('../middlewares/permissionCheck')

// let user create an Block
router.post('/create', requireLogin, permissionCheckHelper.hasPermission('createBlock'), async (req, res) => {
    try {
        const newBlock = await blockHelper.createBlock(req.body, req.user.sub)
        if(!newBlock) throw Error('Block not created')
        res.json(newBlock)

    } catch (e) {
      res.status(400).json({msg: e.message})
    }
});

// let user get a list
router.post('/list', requireLogin, permissionCheckHelper.hasPermission('listBlocks'), async (req, res) => {
    try {
        const { filter = {}, take = 25, skip = 0 } = req.body;
      const block = await blockHelper.listBlock({ filter, take, skip, clientId: req.user.sub })
      if(!block) throw Error('list not created')
      res.json(block)
    } catch (e) {
      res.status(400).json({msg: e.message})
    }
});

// let user get an Block
router.post('/:userId', requireLogin, permissionCheckHelper.hasPermission('getBlockByUserId'), async (req, res) => {
    try {
        const userId = req.params.userId;
        const { startDate, endDate } = req.body;
      const block = await blockHelper.getBlockByUserId({ startDate, endDate, userId, clientId: req.user.sub })
      if(!block) throw Error('Block not found')
      res.json(block)
    } catch (e) {
      res.status(400).json({msg: e.message})
    }
});

// let user update an Block
router.post('/update/:clientId', requireLogin, permissionCheckHelper.hasPermission('updateBlock'), async (req, res) => {
    try {
      const clientId = req.params.clientId;
      const block = await blockHelper.updateBlock({ ...req.body, userId, userId: req.user.sub, clientId })
      if(!block) throw Error('Block not found')
      res.json(block)
    } catch (e) {
      res.status(400).json({msg: e.message})
    }
});

// let user disable an Block
router.post('/delete/:clientId', requireLogin, permissionCheckHelper.hasPermission('disableBlock'), async (req, res) => {
    try {
        const { clientId } = req.params;
        const BlockDelete = await blockHelper.disableBlock(clientId, req.user.sub)
        res.json(BlockDelete)

    } catch (e) {
      res.status(400).json({msg: e.message})
    }
});

module.exports = router;