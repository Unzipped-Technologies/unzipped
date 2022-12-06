import React from 'react';
import Nav from '../../components/unzipped/header';
import Icon from '../../components/ui/Icon'
import ListPanel from '../../components/unzipped/dashboard/ListPanel';

const Lists = [
    {
        text: 'Favorites',
        icon: <Icon name="heart"/>,
        padding: true
    },
    {
        text: 'Recently Viewed',
        icon: <Icon name="eye"/>,
        padding: false
    },
    {
        text: 'My Team',
        icon: <Icon name="suitcase"/>,
        padding: false
    },
]

const Dashboard = ({business='My Business', selectedList="Favorites"}) => {
    return (
        <React.Fragment>
            <Nav isSubMenu/>
            <ListPanel list={Lists} business={business} selectedList={selectedList} type="list"/>
        </React.Fragment>
    )
}

export default Dashboard;