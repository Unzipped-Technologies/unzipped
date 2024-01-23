const express = require('express')
const router = express.Router()
const invoiceHelper = require('../helpers/invoice')
const requireLogin = require('../middlewares/requireLogin')
const permissionCheckHelper = require('../middlewares/permissionCheck')

router.post('/create', requireLogin, permissionCheckHelper.hasPermission('invoice'), async (req, res) => {
  try {
    req.body.freelancerId = req?.user?.userInfo?.freelancers
    const newInvoice = await invoiceHelper.createInvoice(req.body)
    if (!newInvoice) throw new Error('Invoice not created')
    res.json(newInvoice)
  } catch (e) {
    res.status(400).json({ msg: e.message })
  }
})

router.get('/:id', requireLogin, permissionCheckHelper.hasPermission('invoice'), async (req, res) => {
  try {
    const invoice = await invoiceHelper.getInvoiceById(req.params.id)
    if (!invoice) throw new Error('Invoice not found')
    res.json(invoice)
  } catch (e) {
    res.status(400).json({ msg: e.message })
  }
})

router.get('/', requireLogin, permissionCheckHelper.hasPermission('invoice'), async (req, res) => {
  try {
    const { userInfo } = req.user
    if (userInfo.role === 0) {
      req.query['clientId'] = userInfo._id
    } else if (userInfo.role === 1) {
      req.query['freelancerId'] = userInfo.freelancers
    }
    const invoices = await invoiceHelper.getAllInvoices(req.query)
    res.json(invoices)
  } catch (e) {
    res.status(400).json({ msg: e.message })
  }
})

router.put('/update/:id', requireLogin, permissionCheckHelper.hasPermission('invoice'), async (req, res) => {
  try {
    let updateFields = {}
    for (let field in req.body) {
      updateFields[field] = req.body[field]
    }
    if (Object.keys(updateFields).length === 0) {
      throw new Error('No valid fields provided for update')
    }
    const updatedInvoice = await invoiceHelper.updateInvoice(req.params.id, updateFields)
    if (!updatedInvoice) throw new Error('Invoice not found')

    res.json(updatedInvoice)
  } catch (e) {
    res.status(400).json({ msg: e.message })
  }
})

router.delete('/delete/:id', requireLogin, permissionCheckHelper.hasPermission('invoice'), async (req, res) => {
  try {
    await invoiceHelper.deleteInvoice(req.params.id)
    res.json({ msg: 'Invoice successfully deleted' })
  } catch (e) {
    res.status(400).json({ msg: e.message })
  }
})

module.exports = router
