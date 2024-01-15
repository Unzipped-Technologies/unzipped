const express = require("express");
const router = express.Router();
const projectHelper = require('../helpers/meeting');

router.get('/', async (req, res) => {
    try {
        const response = await projectHelper.getAllProjects()
        if (!response) throw Error('Meetings not found!')
        res.json(response)
    } catch (e) {
        res.status(400).json({ msg: e.message })
    }
});

router.post('/create', async (req, res) => {
    try {
        const { body } = req;
        if (!body) throw Error('Meeting details can not be empty!');
        const projects = await projectHelper.createProject(body)
        res.json(projects);
    } catch (e) {
        res.status(400).json({ msg: e.message })
    }
});

router.put('/edit', async (req, res) => {
    try {
        const { body } = req;
        if (!body) throw Error('Meeting details can not be empty!');
        const projects = await projectHelper.updateProject(body)
        res.json(projects);
    } catch (e) {
        res.status(400).json({ msg: e.message })
    }
});

router.put('/delete/:id', async (req, res) => {
    try {
        const projectId = req.params.id;
        if (!projectId) throw Error('Request cannot be processed without ProjectId');
        const result = await projectHelper.deleteProject(projectId);
        res.json(result);

    } catch (e) {
        res.status(400).json({ msg: e.message })
    }
})

module.exports = router;