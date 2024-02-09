import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Icon from '../Icon';
import Text from '../Text';

const NotificationsContainer = styled.div`
    cursor: pointer;
    position: relative;
    display: flex;
    flex-flow: row nowrap;
    & .expanded-container {
        width: 26px;
        height: 26px;
        padding-top: 1px;
    }
    @media (max-width: ${({theme}) => theme.reducedWidth}px) {
        padding: 20px 0 20px 3px;
    }
`;

const NotificationCount = styled(Text)`
    font-size: ${props => props.theme.fontSizeXS};
    position: absolute;
    width: 23px;
    height: 23px;
    top: -25px;
    left: 10px;
    background-color: ${props => props.theme.accent3};
    text-align: center;
    border-radius: 50%;
    @media (max-width: ${({theme}) => theme.reducedWidth}px) {
        top: -5px;
    }
`;
const NotificationText = styled(Text)`
    margin-left: 40px;
    font-size: ${props => props.theme.fontSizeM};
    color: ${props => props.theme.primary};
    &:hover {
        text-decoration: underline;
    }
    @media (min-width: ${({theme}) => theme.reducedWidth}px) {
        display: none;
    }
`;

/**
 * Notifications component that acts as a parent container for the bell icon,
 * NotificationsSidePanel, and NotificationCard(s)
 */
const Notifications = ({notificationsAmount, setToggleMenu}) => {
    return (
        <NotificationsContainer onClick={setToggleMenu} data-testid="notification-count">
            <Icon name="notificationFilled" data-testid="notification-filled-icon" />
            <NotificationCount type="span" fontWeight="bold" hidden={notificationsAmount === 0}>
                {notificationsAmount > 999 ? ':)' : notificationsAmount}
            </NotificationCount>
            <NotificationText>Notifications</NotificationText>
        </NotificationsContainer>
    );
};

Notifications.propTypes = {
    /** Notifications in side panel */
    notifications: PropTypes.array,
};

Notifications.defaultProps = {
    notifications: [],
};

export default Notifications;
