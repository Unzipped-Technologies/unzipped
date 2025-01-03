const axios = require('axios')


const zoomAuthentication = async () => {
    const authToken = Buffer.from(`${process.env.ZOOM_CLIENT_ID}:${process.env.ZOOM_CLIENT_SECRET}`).toString('base64');

    const authResponse = await axios.post(
        process.env.ZOOM_GET_ACCESS_TOKEN_URL,
        {},
        {
            headers: {
                'Authorization': `Basic ${authToken}`,
                'Content-Type': 'application/json'
            }
        }
    );

    if (authResponse && authResponse?.data?.access_token) {
        return {
            isSuccessfull: true,
            token: authResponse?.data?.access_token,
            message: 'SUCCESS'
        }
    }

    return {
        isSuccessfull: false,
        token: null,
        message: "FAILED"
    };
}

const createMeetingAttendees = async ({ id }, meetingAttendees) => {
    try {
        const { isSuccessfull, message, token } = await zoomAuthentication();

        if (!isSuccessfull) {
            return { isVerified: false, message }
        }

        const meetingInvitesList = await axios.post(
            `${process.env.ZOOM_BASE_URL}/meetings/${id}/invite_links`,
            meetingAttendees,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
                      
        return meetingInvitesList;

    } catch (error) {
        console.log('Error on creating meeting attendees', error)
    }
}
const createZoomMeeting = async (meetingArgs, attendeesArgs) => {

    try {
        const { isSuccessfull, message, token } = await zoomAuthentication();

        if (!isSuccessfull) {
            return { isVerified: false, message }
        }

        const zoomAPIResp = await axios.post(
            `${process.env.ZOOM_BASE_URL}/users/me/meetings`,
            meetingArgs,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

        if (zoomAPIResp.status !== 201) {
            return 'Unable to generate meeting link'
        }

        const zoomRecordCreated = zoomAPIResp.data;
        const meetingAttendees = await createMeetingAttendees(zoomRecordCreated, attendeesArgs);
        const participants = meetingAttendees.data.attendees;
        let meetingObject = {
            zoomMeeting: {
                zoomJoiningUrl: zoomRecordCreated.join_url,
                zoomMeetingId: zoomRecordCreated.id,
                participants: participants,
            }
        };

        return meetingObject;
    } catch (error) {
        console.log('error on creating zoom meeting record', error)
    }

}

module.exports = {
    createZoomMeeting,
    zoomAuthentication
}