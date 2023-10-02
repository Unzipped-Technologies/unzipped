const express = require("express");
const router = express.Router();
const freelancerSkills = require('../../models/FreelancerSkills');

router.get('/', async (req, res) => {
    try {
      const FreelancerSkills = await freelancerSkills.find()
      if(!FreelancerSkills) throw Error('FreelancerSkills not created')
      res.json(FreelancerSkills)
    } catch (e) {
      res.status(400).json({msg: e.message})
    }
});

module.exports = router;