import React from 'react';

import {Col} from 'react-bootstrap';

const Notifications = ({toggleMenu, notificationImage, alertsCount}) => {
    return (
        <>
            <Col xs={1} className="">
                <img
                    onClick={() => {
                        toggleMenu();
                    }}
                    src={notificationImage}
                    alt="notification-icon"
                    className="notification-icon"
                />
            </Col>
            <span style={{position: 'relative'}}>
                <span
                    className={'notification-count ' + (alertsCount >= 100 ? 'count3' : '')}
                    hidden={alertsCount === 0}>
                    {alertsCount}
                </span>
            </span>
        </>
    );
};

export default Notifications;
