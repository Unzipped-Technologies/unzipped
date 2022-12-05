import React from 'react'
import styled from 'styled-components'
import Notification from './Notification';

const Container = styled.div`
    display: grid;
    grid-template-columns: 3fr 1fr;
    padding: 40px 12.5%;
`;

const Notifications = styled.div`
    padding: 0px 10px;
`;

const Panel = styled.div``;

const NotificationsPanel = () => {
    return (
        <Container>
            <Notifications>
                <Notification type="plan"/>
                <Notification type="github"/>
                <Notification type="browse"/>
                <Notification type="dismiss"/>
                <Notification type="blue"/>
                <Notification type="createBusiness"/>
                <Notification type="faq"/>
                <Notification type="updateBusiness"/>
                <Notification type="explore"/>
            </Notifications>
            <Panel>
sdf
            </Panel>
        </Container>
    )
}

export default NotificationsPanel