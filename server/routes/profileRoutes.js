const express = require("express");
const router = express.Router();
const profileHelper = require('../helpers/profile');

router.get('/', async (req, res) => {
    try {
        const response = await profileHelper.getAllProfiles()
        if (!response) throw Error('Profiles not found!')
        res.json(response)
    } catch (e) {
        res.status(400).json({ msg: e.message })
    }
});

router.post('/create', async (req, res) => {
    try {
        const { body } = req;
        if (!body) throw Error('Profile can not be empty!');
        const profile = await profileHelper.createProfile(body)
        res.json(profile);
    } catch (e) {
        res.status(400).json({ msg: e.message })
    }
})

router.put('/delete/:id', async (req, res) => {
    try {
        const profileId = req.params.id;
        if (!profileId) throw Error('Request cannot be processed without ProfileId!');
        const profile = await profileHelper.deleteProfile(profileId)
        res.json(profile);
    } catch (e) {
        res.status(400).json({ msg: e.message })
    }
})
module.exports = router;