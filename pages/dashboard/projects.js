import React from 'react';
import Nav from '../../components/unzipped/header';
import Image from '../../components/ui/Image'
import NotificationsPanel from '../../components/unzipped/dashboard/NotificationsPanel';

const notifications = [
    { type:"plan"},
    { type:"github"},
    { type:"browse"},
    { type:"dismiss"},
    { type:"blue"},
    { type:"createBusiness"},
    { type:"faq"},
    { type:"updateBusiness"},
    { type:"explore"},
]

const user = [
    {
        text: 'Upload a profile picture',
        icon: <Image radius="50%" width="34px" src="https://res.cloudinary.com/dghsmwkfq/image/upload/v1670086178/dinosaur_xzmzq3.png" />,
        padding: true
    },
    {
        text: 'Select a plan for your account',
        icon: <></>,
        padding: false
    },
]

const Projects = () => {
    return (
        <React.Fragment>
            <Nav isSubMenu/>
        </React.Fragment>
    )
}

export default Projects;