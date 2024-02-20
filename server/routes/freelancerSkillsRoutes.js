const express = require("express");
const router = express.Router();
const FreelancerSkillsHelper = require("../helpers/freelancerskills")

router.get('/', async (req, res) => {
  try {
    const FreelancerSkills = await FreelancerSkillsHelper.getAllFreelancerSkills();
    if (!FreelancerSkills) throw Error('FreelancerSkills not created')
    res.json(FreelancerSkills)
  } catch (e) {
    res.status(400).json({ msg: e.message })
  }
});

module.exports = router;