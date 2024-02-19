const express = require('express')
const router = express.Router()
const contractHelper = require('../helpers/contract')
const requireLogin = require('../middlewares/requireLogin')
const permissionCheckHelper = require('../middlewares/permissionCheck')

// Create a new contract (POST)
router.post('/create', requireLogin, async (req, res) => {
  try {
    const newContract = await contractHelper.createContracts(req.body)
    if (!newContract) throw Error('Contract not created')
    res.json(newContract)
  } catch (e) {
    res.status(400).json({ msg: e.message })
  }
})

// Get a contract by ID (GET)
router.get('/', requireLogin, permissionCheckHelper.hasPermission('getAllContracts'), async (req, res) => {
  try {
    const getContract = await contractHelper.getContracts(req.query, req?.user?.userInfo)
    if (!getContract) throw Error('Contract not found')
    res.json(getContract)
  } catch (e) {
    res.status(400).json({ msg: e.message })
  }
})

// Get a contract for current user only
router.get('/current', requireLogin, permissionCheckHelper.hasPermission('getAllContracts'), async (req, res) => {
  try {
    const getContract = await contractHelper.getUserContracts(req.query, req?.user?.userInfo)
    if (!getContract) throw Error('Contract not found')
    res.json(getContract)
  } catch (e) {
    res.status(400).json({ msg: e.message })
  }
})

// Get a contract by ID (GET)
router.get('/:id', requireLogin, async (req, res) => {
  try {
    const getContract = await contractHelper.getContractById(req.params.id)
    if (!getContract) throw Error('Contract not found')
    res.json(getContract)
  } catch (e) {
    res.status(400).json({ msg: e.message })
  }
})

router.get('/freelancer/:id', requireLogin, async (req, res) => {
  try {
    const getContract = await contractHelper.getContractByfreelacerId(req.params.id)
    if (!getContract) throw Error('Contract not found')
    res.json(getContract)
  } catch (e) {
    res.status(400).json({ msg: e.message })
  }
})

// Update a contract (PUT)
router.put('/update/:id', requireLogin, async (req, res) => {
  try {
    const updatedContract = await contractHelper.updateContract(req.params?.id, req.body)
    if (!updatedContract) throw Error('Contract not found')
    res.json(updatedContract)
  } catch (e) {
    res.status(400).json({ msg: e.message })
  }
})

router.put('/freelancer', requireLogin, async (req, res) => {
  const { _id, freelancerId, newIsOfferAcceptedValue } = req.body
  try {
    const updatedContract = await contractHelper.updateContractByFreelancer({
      _id,
      freelancerId,
      newIsOfferAcceptedValue
    })
    if (!updatedContract) throw Error('Contract not found')
    res.json(updatedContract)
  } catch (e) {
    res.status(400).json({ msg: e.message })
  }
})

// Delete a contract by ID (DELETE)
router.delete('/delete/:id', requireLogin, async (req, res) => {
  try {
    await contractHelper.deleteContract(req.params.id)
    res.json({ msg: 'Contract successfully deleted' })
  } catch (e) {
    res.status(400).json({ msg: e.message })
  }
})

// End a contract by ID (END)
router.patch('/end-contract/:id', requireLogin, async (req, res) => {
  try {
    await contractHelper.deleteContract(req.params.id)
    res.json({ msg: 'Contract ends successfully' })
  } catch (e) {
    res.status(400).json({ msg: e.message })
  }
})

router.post('/create-stripe-intent', requireLogin, async (req, res) => {
  try {
    const customer = await contractHelper.createStripeCustomer(req.body)
    res.status(200).json({ clientSecret: customer.client_secret, intent: customer })
  } catch (e) {
    res.status(400).json({ msg: e.message })
  }
})

router.post('/create-payment-method', requireLogin, async (req, res) => {
  try {
    const customer = await contractHelper.createPaymentMethod(req.body)
    if (customer?.savedPaymentMethod && customer?.savedThirdPartyApplication) {
      res.json({ msg: 'payment method created successfully' })
    } else {
      res.status(400).json({ msg: 'Payment method not created' })
    }
  } catch (e) {
    res.status(400).json({ msg: e.message })
  }
})

router.post('/payment-method/delete', requireLogin, async (req, res) => {
  try {
    await contractHelper.deletePaymentMethod(req.body.id)
    res.json({ id: req.body.id })
  } catch (e) {
    res.status(400).json({ msg: e.message })
  }
})

module.exports = router
