const express = require("express");
const router = express.Router();
const contractHelper = require('../helpers/contract'); // Import your contract helper functions here
const requireLogin = require('../middlewares/requireLogin');

// Create a new contract (POST)
router.post('/create', requireLogin, async (req, res) => {
    try {
        const newContract = await contractHelper.createContracts(req.body);
        if (!newContract) throw Error('Contract not created');
        res.json(newContract);
    } catch (e) {
        res.status(400).json({ msg: e.message });
    }
});

// Get a contract by ID (GET)
router.get('/:id', requireLogin, async (req, res) => {
    try {
        const getContract = await contractHelper.getContractById(req.params.id);
        if (!getContract) throw Error('Contract not found');
        res.json(getContract);
    } catch (e) {
        res.status(400).json({ msg: e.message });
    }
});

router.get('/freelancer/:id', requireLogin, async (req, res) => {
    console.log(req.params.id, req.params)
    try {
        const getContract = await contractHelper.getContractByfreelacerId(req.params.id);
        if (!getContract) throw Error('Contract not found');
        res.json(getContract);
    } catch (e) {
        res.status(400).json({ msg: e.message });
    }
});

// Update a contract (PUT)
router.put('/update', requireLogin, async (req, res) => {
    try {
        const updatedContract = await contractHelper.updateContract(req.body);
        if (!updatedContract) throw Error('Contract not found');
        res.json(updatedContract);
    } catch (e) {
        res.status(400).json({ msg: e.message });
    }
});

router.put('/freelancer', requireLogin, async (req, res) => {
    const { _id, freelancerId, newIsOfferAcceptedValue } = req.body;
    try {
        const updatedContract = await contractHelper.updateContractByFreelancer({ _id, freelancerId, newIsOfferAcceptedValue });
        if (!updatedContract) throw Error('Contract not found');
        res.json(updatedContract);
    } catch (e) {
        res.status(400).json({ msg: e.message });
    }
});

// Delete a contract by ID (DELETE)
router.delete('/delete/:id', requireLogin, async (req, res) => {
    try {
        await contractHelper.deleteContract(req.params.id);
        res.json({ msg: 'Contract successfully deleted' });
    } catch (e) {
        res.status(400).json({ msg: e.message });
    }
});

router.post('/create-stripe-customer', requireLogin, async (req, res) => {
    const { businessId, userId, email, githubId, googleId, calendlyId } = req.body;
    try {
        const customer = await contractHelper.createStripeCustomer({ businessId, userId, email, githubId, googleId, calendlyId });
        res.status(200).json({ clientSecret: customer.client_secret, intent: customer });
    } catch (e) {
        res.status(400).json({ msg: e.message });
    }
});


router.post('/create-payment-method', requireLogin, async (req, res) => {
    const { businessId, userId, githubId, stripeId, googleId, calendlyId } = req.body.data.metadata;
    const paymentMethod = req.body
    try {
        const customer = await contractHelper.createPaymentMethod({ businessId, userId, githubId, stripeId, googleId, calendlyId, paymentMethod });
        if (customer?.savedPaymentMethod && customer?.savedThirdPartyApplication) {
            res.json({ msg: 'payment method created successfully' });
        }
        else {
            res.status(400).json({ msg: 'Payment method not created' });
        }
    } catch (e) {
        res.status(400).json({ msg: e.message });
    }
});

module.exports = router;
