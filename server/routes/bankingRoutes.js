const express = require("express");
const router = express.Router();
const requireLogin = require('../middlewares/requireLogin');
const billingHelper = require('../helpers/billingHelper');


router.post('/create-vban', requireLogin, async (req, res) => {
    try {
      const { customerId, bankAccountData } = req.body;
      const VbanAccount = billingHelper.createVbanAccount(customerId, bankAccountData);
  
      res.status(200).json(VbanAccount);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
});
  
// Route to link an external bank account to Stripe
router.post('/link-bank-account', requireLogin, async (req, res) => {
    try {
      const { customerId, bankAccountToken } = req.body;
      const bankAccount = await billingHelper.linkExternalBankAccount(customerId, bankAccountToken);
  
      res.status(200).json(bankAccount);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
});
  
// Route to remove a bank account from Stripe
router.delete('/remove-bank-account', requireLogin, async (req, res) => {
    try {
      const { customerId, bankAccountId } = req.body;
      const deletionConfirmation = await billingHelper.removeExternalBankAccount(customerId, bankAccountId)
  
      res.status(200).json(deletionConfirmation);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
});

router.post('/create-account', requireLogin, async (req, res) => {
  try {
    const userId = req.body.userId || req.user.sub

    // get user account
    let account = await billingHelper.getUserAccountById(userId)
    // Create a new Stripe Connected Account for the user
    if (!account) {
      account = await billingHelper.createAccountOnboarding(req.body.businessType, userId)
    }
    const accountLink = await billingHelper.getAccountOnboardingLink(account, req.body.url)

    // Send the account link URL to the frontend
    res.status(200).json({ url: accountLink.url });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post('/retrieve-account', requireLogin, async (req, res) => {
  try {
    
    const userId = req.user.sub
    let account = { id: '' };
    // get user account
    if (req.body.id) {
      account.id = req.body.id
    } else {
      account = await billingHelper.getUserAccountById(userId)
    }

    // retreive a Stripe Connected Account for the user
    const accountInfo = await billingHelper.retreiveAccountInfo(account.id)

    res.status(200).json(accountInfo);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post('/refresh-account-onboarding', requireLogin, async (req, res) => {
  try {
    console.log(req.body.businessType)
    // retreive a Stripe Connected Account for the user
    const account = await billingHelper.retreiveAccountInfo(req.body.id)
    const accountLink = await billingHelper.getAccountOnboardingLink(account, req.body.url)

    res.status(200).json({ url: accountLink.url });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post('/retrieve-external-bank-accounts', requireLogin, async (req, res) => {
  try {
    const userId = req.body.id || req.user.sub

    const account = await billingHelper.getUserAccountById(userId)
    // retreive a Stripe Connected Account for the user
    const externalBank = await billingHelper.retrieveExternalBankAccounts(account.id)

    res.status(200).json(externalBank);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post('/retrieve-account-balance', requireLogin, async (req, res) => {
  try {
    const userId = req.body.id || req.user.sub

    const account = await billingHelper.getUserAccountById(userId)

    const balance = await billingHelper.getFreelancerBalance(account.id)

    res.status(200).json(balance);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post('/load-test-funds', requireLogin, async (req, res) => {
  try {
    const account = await billingHelper.createTestCharge()

    res.status(200).json(account);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post('/retrieve-main-stripe-balance', requireLogin, async (req, res) => {
  try {
    const account = await billingHelper.retrieveStripeBalance()

    res.status(200).json(account);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;