const express = require("express");
const router = express.Router();
const keys = require('../../config/keys');
const axios = require('axios');
'use strict';
const bizSdk = require('facebook-nodejs-business-sdk');
const ServerEvent = bizSdk.ServerEvent;
const EventRequest = bizSdk.EventRequest;
const UserData = bizSdk.UserData;
const CustomData = bizSdk.CustomData;
const Content = bizSdk.Content;


router.get('/addtocart', async (req, res) => {
    // let {email, total} = req.body;
    try {
        const accessToken = keys.facebookAPI;
        const pixel_id = keys.facebookID;
        const api = bizSdk.FacebookAdsApi.init(accessToken);

        let current_timestamp = Math.floor(new Date() / 1000);

        const userData_0 = (new UserData())
            .setEmails(["7b17fb0bd173f625b58636fb796407c22b3d16fc78302d79f0fd30c2fc2fc068"]);
        const customData_0 = (new CustomData())
            .setValue(142.52)
            .setCurrency("USD");
        const serverEvent_0 = (new ServerEvent())
            .setEventName("AddToCart")
            .setEventTime(current_timestamp)
            .setUserData(userData_0)
            .setCustomData(customData_0)
            .setActionSource("email");

        const eventsData = [serverEvent_0];
        const eventRequest = (new EventRequest(accessToken, pixel_id))
            .setEvents(eventsData);
        eventRequest.execute();
        res.send('success')
    } catch {
        res.status(400).send('didnt work')
    }
})

module.exports = router;