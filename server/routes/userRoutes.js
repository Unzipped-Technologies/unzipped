const express = require("express");
const router = express.Router();
const userHelper = require('../helpers/user')
const newsletterHelper = require('../helpers/newsletter')
const requireLogin = require('../middlewares/requireLogin');
const permissionCheckHelper = require('../middlewares/permissionCheck');
const sgMail = require('@sendgrid/mail')
const keys = require('../../config/keys');
const newsletterTemplate = require('../../services/emailTemplates/newsletterIntro');

sgMail.setApiKey(keys.sendGridKey)

router.post('/list', requireLogin, permissionCheckHelper.hasPermission('listAllUsers'), async (req, res) => {
    try {
      const { filter, take = 25, skip = 0 } = req.body;
      const listUsers = await userHelper.listUsers({ filter, take, skip })
      if(!listUsers) throw Error('user does not exist')
      res.json(listUsers)
    } catch (e) {
      res.status(400).json({msg: e.message})
    }
});

router.post('/freelancer/list', requireLogin, permissionCheckHelper.hasPermission('listFreelancers'), async (req, res) => {
    try {
      const { filter, take = 25, skip = 0 } = req.body;
      const listUsers = await userHelper.listFreelancers({ filter, take, skip })
      if(!listUsers) throw Error('could not find freelancers')
      res.json(listUsers)
    } catch (e) {
      res.status(400).json({msg: e.message})
    }
});

router.get('/freelancer/:id', requireLogin, permissionCheckHelper.hasPermission('getFreelancerById'), async (req, res) => {
    try {
      const id = req.params.id;
      const User = await userHelper.getFreelancerById(id)
      if(!User) throw Error('freelancer does not exist')
      res.json(User)
    } catch (e) {
      res.status(400).json({msg: e.message})
    }
});

router.post('/update', requireLogin, permissionCheckHelper.hasPermission('updateAllUsers'), async (req, res) => {
    try {
      const updatedUser = await userHelper.updateUserByid(req.body.id, req.body)
      if(!updatedUser) throw Error('user does not exist')
      res.json(updatedUser)
    } catch (e) {
      res.status(400).json({msg: e.message})
    }
});

router.post('/current/update', requireLogin, permissionCheckHelper.hasPermission('updateCurrentUsers'), async (req, res) => {
    try {
      const updatedUser = await userHelper.updateUserByid(req.user.sub, req.body)
      await userHelper.updateTaxDataByid(req.user.sub, req.body)
      if(!updatedUser) throw Error('user not updated')
      res.json(updatedUser)
    } catch (e) {
      res.status(400).json({msg: e.message + 'asdf'})
    }
});

router.post('/current/delete', requireLogin, permissionCheckHelper.hasPermission('deleteUser'), async (req, res) => {
    try {
      const deletedUser = await userHelper.deleteUser(req.body.id)
      if(!deletedUser) throw Error('user does not exist')
      res.json(deletedUser)
    } catch (e) {
      res.status(400).json({msg: e.message})
    }
});

router.post('/current/add/skill', requireLogin, permissionCheckHelper.hasPermission('addSkill'), async (req, res) => {
    try {
      console.log(req.user)
      const addedSkill = await userHelper.addSkillsToFreelancer(req.body, req.user.sub)
      if(!addedSkill) throw Error('user does not exist')
      res.json(addedSkill)
    } catch (e) {
      res.status(400).json({msg: e.message})
    }
});

router.post('/newsletter/add', async (req, res) => {
    try {
      await userHelper.addToNewsletter(req.body.email)
      await newsletterHelper.sendIntro(req.body.email)
      res.json({msg: 'success', email: req.body.email})
    } catch (e) {
      res.status(400).json({msg: e.message})
    }
});

router.post('/newsletter/send', async (req, res) => {
    try {
      const msg = {
        to: 'jaymaynard84@gmail.com', // Change to your recipient
        from: 'jason@unzipped.io', // Change to your verified sender
        subject: 'Welcome to the unzipped newsletter',
        template_id: 'd-ee82a3f6fd1f4b56aa1aa648435046ba'
      }
      sgMail
        .send(msg)
        .then(() => {
          console.log('Email sent')
          res.json({msg: 'Email sent'})
        })
        .catch((error) => {
          console.error(error)
        })
    } catch (e) {
      res.status(400).json({msg: e.message})
    }
});

module.exports = router;