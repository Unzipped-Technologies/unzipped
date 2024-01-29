const express = require("express");
const router = express.Router();
const MeetingHelper = require('../helpers/meeting');
const ZoomMeetingHelper = require('../helpers/ZoomHelper');

router.get('/', async (req, res) => {
    try {
        const response = await MeetingHelper.getAllMeetings()
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
        const projects = await MeetingHelper.createMeeting(body)
        res.json(projects);
    } catch (e) {
        res.status(400).json({ msg: e.message })
    }
});

router.put('/edit', async (req, res) => {
    try {
        const { body } = req;
        if (!body) throw Error('Meeting details can not be empty!');
        const projects = await MeetingHelper.updateMeeting(body)
        res.json(projects);
    } catch (e) {
        res.status(400).json({ msg: e.message })
    }
});

router.put('/delete/:id', async (req, res) => {
    try {
        const projectId = req.params.id;
        if (!projectId) throw Error('Request cannot be processed without ProjectId');
        const result = await MeetingHelper.deleteMeeting(projectId);
        res.json(result);

    } catch (e) {
        res.status(400).json({ msg: e.message })
    }
})


router.post('/zoom', async (req, res) => {
    try {
        const zoomLinkGenerated = await ZoomMeetingHelper.createZoomMeeting({})
        res.json(zoomLinkGenerated);
    } catch (e) {
        res.status(400).json({ msg: e.message })
    }
});

module.exports = router;