import React from 'react';
import Nav from '../../components/unzipped/header';
import Icon from '../../components/ui/Icon'
import ListPanel from '../../components/unzipped/dashboard/ListPanel';

const Tasklist = ({business='My Business', selectedDepartment="Management"}) => {

    const Lists = [
        {
            text: 'Management',
            icon: <Icon name="selectedDepartment"/>,
            padding: true
        },
        {
            text: 'Other',
            icon: <Icon name="department"/>,
            padding: true
        },
    ]

    return (
        <React.Fragment>
            <Nav isSubMenu/>
            <ListPanel list={Lists} business={business} selectedList={selectedDepartment} type="department"/>
        </React.Fragment>
    )
}

export default Tasklist;