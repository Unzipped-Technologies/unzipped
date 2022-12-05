import React from 'react';
import Nav from '../../components/unzipped/header';
import NotificationsPanel from '../../components/unzipped/dashboard/NotificationsPanel';

const Dashboard = () => {
    return (
        <React.Fragment>
            <Nav isSubMenu/>
            <NotificationsPanel />
        </React.Fragment>
    )
}

export default Dashboard;