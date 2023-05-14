const express = require("express")
const router = express.Router()
const contractHelper = require('../helpers/contract')
const requireLogin = require('../middlewares/requireLogin');
const permissionCheckHelper = require('../middlewares/permissionCheck')

// let user create an Contract
router.post('/create', requireLogin, permissionCheckHelper.hasPermission('createContract'), async (req, res) => {
    try {
        const newContract = await contractHelper.createContract(req.body, req.user.sub)
        if(!newContract) throw Error('Contract not created')
        res.json(newContract)

    } catch (e) {
      res.status(400).json({msg: e.message})
    }
});

// let user get a list
router.post('/list', requireLogin, permissionCheckHelper.hasPermission('listContracts'), async (req, res) => {
    try {
        const { filter = {}, take = 25, skip = 0 } = req.body;
      const contract = await contractHelper.listContract({ filter, take, skip, clientId: req.user.sub })
      if(!contract) throw Error('list not created')
      res.json(contract)
    } catch (e) {
      res.status(400).json({msg: e.message})
    }
});

// let user get an Contract
router.post('/:userId', requireLogin, permissionCheckHelper.hasPermission('getContractByUserId'), async (req, res) => {
    try {
        const userId = req.params.userId;
        const { startDate, endDate } = req.body;
      const contract = await contractHelper.getContractByUserId({ startDate, endDate, userId, clientId: req.user.sub })
      if(!contract) throw Error('Contract not found')
      res.json(contract)
    } catch (e) {
      res.status(400).json({msg: e.message})
    }
});

// let user update an Contract
router.post('/update/:clientId', requireLogin, permissionCheckHelper.hasPermission('updateContract'), async (req, res) => {
    try {
      const clientId = req.params.clientId;
      const contract = await contractHelper.updateContract({ ...req.body, userId, userId: req.user.sub, clientId })
      if(!contract) throw Error('Contract not found')
      res.json(contract)
    } catch (e) {
      res.status(400).json({msg: e.message})
    }
});

// let user disable an Contract
router.post('/delete/:clientId', requireLogin, permissionCheckHelper.hasPermission('disableContract'), async (req, res) => {
    try {
        const { clientId } = req.params;
        const contractDelete = await contractHelper.disableContract(clientId, req.user.sub)
        res.json(contractDelete)

    } catch (e) {
      res.status(400).json({msg: e.message})
    }
});

module.exports = router;