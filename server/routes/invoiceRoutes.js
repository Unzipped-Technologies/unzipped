const express = require("express")
const router = express.Router()
const invoiceHelper = require('../helpers/invoice')
const requireLogin = require('../middlewares/requireLogin');
const permissionCheckHelper = require('../middlewares/permissionCheck')

// let user create an invoice
router.post('/create', requireLogin, permissionCheckHelper.hasPermission('createInvoice'), async (req, res) => {
    try {
        const newInvoice = await invoiceHelper.createInvoice(req.body, req.user.sub)
        if(!newInvoice) throw Error('invoice not created')
        res.json(newInvoice)

    } catch (e) {
      res.status(400).json({msg: e.message})
    }
});

// let user get a list
router.post('/list', requireLogin, permissionCheckHelper.hasPermission('listInvoices'), async (req, res) => {
    try {
        const { filter = {}, take = 25, skip = 0 } = req.body;
      const invoice = await invoiceHelper.listInvoice({ filter, take, skip, clientId: req.user.sub })
      if(!invoice) throw Error('list not created')
      res.json(invoice)
    } catch (e) {
      res.status(400).json({msg: e.message})
    }
});

// let user get an invoice
router.post('/:userId', requireLogin, permissionCheckHelper.hasPermission('getInvoiceByUserId'), async (req, res) => {
    try {
        const userId = req.params.userId;
        const { startDate, endDate } = req.body;
      const invoice = await invoiceHelper.getInvoiceByUserId({ startDate, endDate, userId, clientId: req.user.sub })
      if(!invoice) throw Error('invoice not found')
      res.json(invoice)
    } catch (e) {
      res.status(400).json({msg: e.message})
    }
});

// let user update an invoice
router.post('/update/:clientId', requireLogin, permissionCheckHelper.hasPermission('updateInvoice'), async (req, res) => {
    try {
      const clientId = req.params.clientId;
      const invoice = await invoiceHelper.updateInvoice({ ...req.body, userId, userId: req.user.sub, clientId })
      if(!invoice) throw Error('invoice not found')
      res.json(invoice)
    } catch (e) {
      res.status(400).json({msg: e.message})
    }
});

// let user disable an invoice
router.post('/delete/:clientId', requireLogin, permissionCheckHelper.hasPermission('disableInvoice'), async (req, res) => {
    try {
        const { clientId } = req.params;
        const invoiceDelete = await invoiceHelper.disableInvoice(clientId, req.user.sub)
        res.json(invoiceDelete)

    } catch (e) {
      res.status(400).json({msg: e.message})
    }
});

module.exports = router;