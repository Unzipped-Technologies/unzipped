const express = require("express");
const router = express.Router();
const taskHoursHelper = require('../helpers/taskHours');
const requireLogin = require('../middlewares/requireLogin');
const permissionCheckHelper = require('../middlewares/permissionCheck');

router.get('/', requireLogin, permissionCheckHelper.hasPermission('taskHours'), async (req, res) => {
    const id = req.body.id || req.user.sub
    try {
        const response = await taskHoursHelper.getAllTaskHours(id)
        if (!response) throw Error('Task hours not found!')
        res.json(response)
    } catch (e) {
        res.status(400).json({ msg: e.message })
    }
});

router.post('/create', requireLogin, permissionCheckHelper.hasPermission('taskHours') , async (req, res) => {
    try {
        const { body } = req;
        if (!body) throw Error('Task hours details cannot be empty!');
        const taskHours = await taskHoursHelper.createTaskHours(body)
        res.json(taskHours);
    } catch (e) {
        res.status(400).json({ msg: e.message })
    }
});

router.patch('/:_id', requireLogin, permissionCheckHelper.hasPermission('taskHours'), async (req, res) => {
    try {
        const { hours } = req.body;
        const {_id} = req.params
        if (!hours) throw Error('Task hours details cannot be empty!');
        const taskHours = await taskHoursHelper.updateTaskHours({hours:hours,_id})
        res.json(taskHours);
    } catch (e) {
        res.status(400).json({ msg: e.message })
    }
});

router.patch('/time/:_id', requireLogin, permissionCheckHelper.hasPermission('taskHours'), async (req, res) => {
    try {
        const { updatedAt } = req.body;
        const {_id} = req.params;
        if (!updatedAt) throw Error('Task hours details cannot be empty!');
        const taskHours = await taskHoursHelper.updateTaskTime({updatedAt:updatedAt,_id})
        res.json(taskHours);
    } catch (e) {
        res.status(400).json({ msg: e.message })
    }
});

router.patch('/status/:_id', requireLogin, permissionCheckHelper.hasPermission('taskHours'), async (req, res) => {
    try {
        const { tag } = req.body;
        const {_id} = req.params
        if (!tag) throw Error('Task hours details cannot be empty!');
        const taskHours = await taskHoursHelper.updateTaskStatus({tag:tag,_id})
        res.json(taskHours);
    } catch (e) {
        res.status(400).json({ msg: e.message })
    }
});

router.delete('/delete/:id', requireLogin, permissionCheckHelper.hasPermission('taskHours'), async (req, res) => {
    try {
        const taskHoursId = req.params.id;
        if (!taskHoursId) throw Error('Request cannot be processed without TaskHoursId');
        const result = await taskHoursHelper.deleteTaskHours(taskHoursId);
        res.json(result);

    } catch (e) {
        res.status(400).json({ msg: e.message })
    }
})

module.exports = router;