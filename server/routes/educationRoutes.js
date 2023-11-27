const express = require("express");
const router = express.Router();
const educationHelper = require('../helpers/education');

router.get('/', async (req, res) => {
    try {
        const response = await educationHelper.geAll()
        if (!response) throw Error('Education not found!')
        res.json(response)
    } catch (e) {
        res.status(400).json({ msg: e.message })
    }
});

router.post('/create', async (req, res) => {
    try {
        const { body } = req;
        if (!body) throw Error('Education details can not be empty!');
        const education = await educationHelper.create(body)
        res.json(education);
    } catch (e) {
        res.status(400).json({ msg: e.message })
    }
});

router.put('/edit', async (req, res) => {
    try {
        const { body } = req;
        if (!body) throw Error('Education details can not be empty!');
        const education = await educationHelper.update(body)
        res.json(education);
    } catch (e) {
        res.status(400).json({ msg: e.message })
    }
});

router.put('/delete/:id', async (req, res) => {
    try {
        const educationId = req.params.id;
        if (!educationId) throw Error('Request cannot be processed without educationId');
        const result = await educationHelper.deleteEducation(educationId);
        res.json(result);

    } catch (e) {
        res.status(400).json({ msg: e.message })
    }
})

module.exports = router;