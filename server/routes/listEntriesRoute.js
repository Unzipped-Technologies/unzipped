const express = require("express");
const router = express.Router();
const requireLogin = require('../middlewares/requireLogin');
const ListEntriesHelper = require('../helpers/listEntriesHelper');


router.post('/', async (req, res) => {
    try {
        const { body } = req;
        if (Object.keys(body).length === 0) {
            throw new Error("Request body can not be empty!")
        }
        const listEntries = await ListEntriesHelper.createRecentlyViewdRecod(body);
        res.send(listEntries);
    } catch (error) {
        res.status(400).send(error.message)
    }
});

router.get("/team-member/:id", async (req, res) => {
    try {
        const teamList = await ListEntriesHelper.getAllteamMembers(req.params.id);
        res.send(teamList)
    } catch (error) {

    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { key } = req.query;
        const listEntries = await ListEntriesHelper.getAllListEntries(id, req.query);
        res.send(listEntries);
    } catch (error) {
        res.status(400).send(error.message)
    }
});


router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { body } = req;
        if (!id) {
            throw new Error("ListEntryId can not be empty!")
        }
        if (Object.keys(body).length === 0) {
            throw new Error("Request body can not be empty!")
        }
        const updatedRecord = await ListEntriesHelper.editListEntries(id, body);
        res.send(updatedRecord);
    } catch (error) {
        res.status(400).send(error.message)
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            throw new Error("ListEntryId can not be empty!")
        }
        const deletedRecord = await ListEntriesHelper.deleteListEntry(id);
        res.send(deletedRecord);
    } catch (error) {
        res.status(400).send(error.message)
    }
});

router.get('/users-list/:id', async (req, res) => {
    try {
        const updateLists = await ListEntriesHelper.updateUserLists(req.params.id)
        res.send(updateLists);
    } catch (error) {
        console.log('Error on update users lists'.error)
        res.status(500).send(error)
    }
});

router.get('/find-by-id/:id', async (req, res) => {
    try {
        const updateLists = await ListEntriesHelper.findListEntriesById(req.params.id)
        res.send(updateLists);
    } catch (error) {
        console.log('Error on update users lists'.error)
        res.status(500).send(error)
    }
});

router.post('/recently-viewed', async (req, res) => {
    try {
        const updateLists = await ListEntriesHelper.createRecentlyViewdRecod(req.body)
        res.send(updateLists);
    } catch (error) {
        console.log('Error on update users lists'.error)
        res.status(500).send(error)
    }
});


module.exports = router;