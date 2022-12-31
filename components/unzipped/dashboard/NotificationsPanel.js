import React from 'react'
import styled from 'styled-components'
import Notification from './Notification';
import Panel from './UserSetupPanel'

const Container = styled.div`
    display: grid;
    grid-template-columns: 3fr 1fr;
    padding: 40px 12.5%;
`;

const Notifications = styled.div`
    padding: 0px 10px;
`;

const NotificationsPanel = ({notifications, user}) => {
    return (
        <Container>
            <Notifications>
                {notifications.map(item => (
                    <Notification type={item.type}>
                        {item.text}
                    </Notification>
                ))}
            </Notifications>
            <div><Panel user={user}/></div>
        </Container>
    )
}

export default NotificationsPanel