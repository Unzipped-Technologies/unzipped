import React from 'react';
import Admin from '../../components/Dashboard/AdminPanel';
import Nav from '../../components/Dashboard/AdminNav';

const Dashboard = () => {
    return (
        <React.Fragment>
            <div className="main-dashboard">
                <Admin page={0} />
                <div className="right-dashboard">
                    <Nav/>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Dashboard;