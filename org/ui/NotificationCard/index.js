import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Card from '../Card';
import Text from '../Text';
import {NavigationUtils} from 'utils';

const SingleNotificationCard = styled(Card)`
    background-color: ${props => props.theme.tint4};
    width: 100%;
    max-width: 450px;
    height: fit-content;
    padding: 20px;
    margin-top: 0px;
    border: none;
`;

const CardHeader = styled.div`
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
`;

const DateTime = styled.time`
    font-size: ${props => props.theme.fontSizeS};
    line-height: ${props => props.theme.lineHeightS};
    color: ${props => props.theme.textSecondary};
`;

const Dismiss = styled.button`
    cursor: pointer;
    color: ${props => props.theme.secondary};
    background-color: ${props => props.theme.tint4};
    font-weight: bold;
    font-size: ${props => props.theme.fontSizeXS};
    line-height: ${props => props.theme.lineHeightXS};
    border: none;
`;

// Using !important to override bootstrap.
const NotificationText = styled(Text)`
    display: block;
    color: ${props => props.theme.text};
    & > a {
        color: ${props => props.theme.secondary} !important;
        text-decoration: underline !important;
    }
    & > a:hover {
        color: ${props => props.theme.secondary} !important;
    }
`;

/**
 * NotificationCard component that contains a individual notification
 */
const NotificationCard = ({dismissAlert, card, notificationText, dateTime}) => {
    return (
        <SingleNotificationCard testId="single-notification-card">
            <CardHeader>
                <DateTime datetime={dateTime} data-testid="single-notification-card-date">
                    {dateTime}
                </DateTime>
                <Dismiss onClick={() => dismissAlert(card?.id)} data-testid="single-notification-card-dismiss-btn">
                    Dismiss
                </Dismiss>
            </CardHeader>
            <NotificationText
                onClick={() => NavigationUtils.generateNotificationLink(card)}
                fontWeight="normal"
                data-testid="single-notification-card-text">
                {notificationText}
            </NotificationText>
        </SingleNotificationCard>
    );
};

NotificationCard.propTypes = {
    /** An array of notification objects */
    notifications: PropTypes.array.isRequired,
    /** individual notification data record*/
    card: PropTypes.object.isRequired,
    /** Notification text that goes in the notification card */
    notificationText: PropTypes.node.isRequired,
    /** Date and time for the notification card */
    dateTime: PropTypes.string.isRequired,
};

NotificationCard.defaultProps = {
    notifications: [],
    dateTime: '',
    notificationText: '',
};

export default NotificationCard;
