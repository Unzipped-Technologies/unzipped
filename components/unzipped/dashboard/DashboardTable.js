import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import {
    TitleText,
    DarkText,
    Absolute,
    WhiteCard,
    Underline,
} from './style'
import {
    TableTitle
} from './tableStyle'
import {
    WorkIcon
} from '../../icons'
import FreelancerCard from './FreelancerCard'
import Icon from '../../ui/Icon'
import Button from '../../ui/Button'
import Image from '../../ui/Image'
import Dropdowns from '../../ui/Dropdowns'
import Projects from '../../../pages/dashboard/projects'
import { ValidationUtils } from '../../../utils'

const Container = styled.div`
    position: relative;
    display: flex;
    flex-flow: column;
    border: 1px solid #D9D9D9;
    background: ${({background}) => background ? background : '#D9D9D9'};
    width: 95%;
    max-height: 900px;
    padding: 20px 0px;
    margin-left: 34px;
    border-radius: 10px;
`;

const NoUsersInList = styled.div`
    display: flex;
    flex-flow: column;
    width: 100%;
    justify-content: center;
    align-items: center;
`;

const UserContainer = styled.div`
    width: 100%;
    display: flex;
    flex-flow: column;
`;

const Row = styled.div`
    display: flex;
    flex-flow: row;
    align-items: center;
    position: relative;
`;

const StoryTable = styled.div``;

const freelancer = [
    {
        name: 'James Cameron',
        type: 'Full Stack Web Developer',
        country: 'United States',
        skills: [
            'React',
            'Node.js',
            'Web 3',
            'AWS',
            'UI/UX'
        ],
        cover: `I have been a developer for over 20 years. I have worked on many
        large projects and I have contributed superior quality features and improved
        ROI for many developers.`,
        profilePic: 'https://res.cloudinary.com/dghsmwkfq/image/upload/v1670086178/dinosaur_xzmzq3.png',
        isInvited: true,
    },
    {
        name: 'Stefano Campagna',
        type: 'Fake Web Developer',
        country: 'United States',
        skills: [
            'React',
            'Taking Calls',
            'Web 3',
            'AWS',
            'UI/UX'
        ],
        cover: `I have been a developer for over 20 years. I have worked on many
        large projects and I have contributed superior quality features and improved
        ROI for many developers.`,
        profilePic: '/img/testimonial_1.jpg',
        isInvited: false
    },
    {
        name: 'James Cameron',
        type: 'Full Stack Web Developer',
        country: 'United States',
        skills: [
            'React',
            'Node.js',
            'Web 3',
            'AWS',
            'UI/UX'
        ],
        cover: `I have been a developer for over 20 years. I have worked on many
        large projects and I have contributed superior quality features and improved
        ROI for many developers.`,
        profilePic: '/img/testimonial_12.jpg',
        isInvited: false
    },
]

const tags = [
    'To Do',
    'In Progress',
    'Done'
]

const stories = [
    {
        tag: 'To Do',
        name: 'Build Home Page',
        points: 3,
        assignee: {
            name: 'Jason Maynard',
            profilePic: 'https://res.cloudinary.com/dghsmwkfq/image/upload/v1670086178/dinosaur_xzmzq3.png'
        }
    },
    {
        tag: 'To Do',
        name: 'Build Update Icons',
        points: 2,
        assignee: {
            name: 'Jason Maynard',
            profilePic: 'https://res.cloudinary.com/dghsmwkfq/image/upload/v1670086178/dinosaur_xzmzq3.png'
        }
    },
    {
        tag: 'In Progress',
        name: 'Build Update Icons',
        points: 3,
        assignee: {
            name: 'Jason Maynard',
            profilePic: 'https://res.cloudinary.com/dghsmwkfq/image/upload/v1670086178/dinosaur_xzmzq3.png'
        }
    },
    {
        tag: 'Done',
        name: 'Build notification component',
        points: 5,
        assignee: {
            name: 'Jason Maynard',
            profilePic: 'https://res.cloudinary.com/dghsmwkfq/image/upload/v1670086178/dinosaur_xzmzq3.png'
        }
    },
    {
        tag: 'Done',
        name: 'Build notification component with a really long story name',
        points: 5,
        assignee: {
            name: 'Jason Maynard',
            profilePic: 'https://res.cloudinary.com/dghsmwkfq/image/upload/v1670086178/dinosaur_xzmzq3.png'
        }
    },
]



const Panel = ({list, selectedList, type, projects=[], businesses}) => {
    const [menuOpen, setMenuOpen] = useState(false)
    const [storyList, setStoryList] = useState([])

    const setDropdowns = (item) => {
        setTimeout(function() { 
            setMenuOpen(item)
        }, 500);
    }

    const setCloseDropdowns = (time) => {
        setTimeout(function() { 
            setMenuOpen(false)
        }, (time || 500));
    }

    const menuItems = [
        {
            name: 'Create a story',
            link: '/dashboard',
            icon: <Icon name="contacts" width={27} height={27} style={{marginLeft: '8px'}} />
        },
        {
            name: 'Create Department',
            link: '/',
            icon: <Icon name="contacts" width={27} height={27} style={{marginLeft: '8px'}} />
        },
        {
            name: 'Remove Department',
            link: '/',
            icon: <Icon name="contacts" width={27} height={27} style={{marginLeft: '8px'}} />
        },
    ]

    useEffect(() => {
        const storyList = []
        for (const tag of tags) {
            storyList.push({
                name: tag,
                points: 'STORY POINTS',
                assignee: {
                    name: 'ASSIGNEE'
                }
            })
            storyList.push(...stories.filter(item => item.tag === tag))
        }
    }, [stories])

    return (
        <Container background={type === 'department' ? '#FDFDFD' : ''}>
            <TableTitle paddingLeft half row>
                <DarkText noMargin bold>Project Name</DarkText>
                <DarkText noMargin> </DarkText>
                <DarkText noMargin center bold>Budget</DarkText>
                <DarkText noMargin center bold>Equity</DarkText>
                <DarkText noMargin center bold>Points</DarkText>
                <DarkText noMargin center bold>Value Estimate</DarkText>
                <DarkText noMargin center bold>Deadline</DarkText>
                <DarkText noMargin center bold>Actions</DarkText>
            </TableTitle>
            <Underline color="#333" noMargin/>   
            <StoryTable>
                {businesses.map((item, index) => (
                    <WhiteCard noMargin borderRadius="0px" row background={!ValidationUtils.checkNumberEven(index) ? "#F7F7F7" : "#fff"}>
                            <Absolute width="45%" wideLeft textOverflow="ellipsis"><DarkText textOverflow="ellipsis" noMargin>{item.name}</DarkText></Absolute>
                            <DarkText noMargin> </DarkText>
                            <DarkText noMargin> </DarkText>
                        <DarkText noMargin center>${(item.budget || 0).toLocaleString()}</DarkText>
                        <DarkText noMargin center>{item?.equity || 0}%</DarkText>
                        <DarkText noMargin center>27</DarkText>
                        <DarkText noMargin center>{item?.valueEstimate || 'N/A'}</DarkText>
                        <DarkText noMargin center>{(item?.deadline && ValidationUtils.formatDate(item?.deadline)) || ValidationUtils.formatDate(item?.updatedAt || item?.createdAt)}</DarkText>
                        <DarkText noMargin center></DarkText>
                        <Absolute>
                        <Button
                            icon="largeExpand"
                            popoutWidth="150px"
                            noBorder
                            block
                            type="lightgrey"
                            fontSize="13px"
                            popout={[
                                {
                                    text: 'Details',
                                    onClick: () => console.log('ITEM 1'),
                                },
                                {
                                    text: 'Delete Job',
                                    onClick: () => console.log('ITEM 2'),
                                },
                                {
                                    text: 'Assign department',
                                    onClick: () => console.log('ITEM 3'),
                                },
                            ]}
                            iconRight>
                            Details
                        </Button>
                        </Absolute>
                    </WhiteCard>
                ))}
            </StoryTable>

        </Container>
    )
}

export default Panel;