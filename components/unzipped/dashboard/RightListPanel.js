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
    WorkIcon
} from '../../icons'
import FreelancerCard from './FreelancerCard'
import Icon from '../../ui/Icon'
import Button from '../../ui/Button'
import Image from '../../ui/Image'
import Dropdowns from '../../ui/Dropdowns'

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



const Panel = ({list, selectedList, type}) => {
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
            <TitleText paddingLeft>{selectedList}</TitleText>
            <Underline color="#333" noMargin={type === 'department'}/>   
            {<Absolute top="30px" right="25px" onClick={() => setDropdowns('profile')}><Icon name="actionIcon" color="#333" /></Absolute>}
            {menuOpen === 'profile' && <Dropdowns items={menuItems} onClose={() => setCloseDropdowns(0)} right top/>}
            {!freelancer && (
                <NoUsersInList>
                    <WorkIcon width={200} height={200}/>
                    <TitleText center noMargin>This list is empty</TitleText>
                    <DarkText center>Add investors to your list to quickly find them later. </DarkText>
                    <div><Button noBorder oval>BROWSE INVESTORS</Button></div>
                </NoUsersInList>
            )}
            <UserContainer>
                {type === 'list' && freelancer.map(user => (
                    <FreelancerCard user={user} />
                ))}
            </UserContainer>
            <StoryTable>
                {type === 'department' && tags.map(tag => (
                    <>
                    <WhiteCard noMargin borderRadius="0px" row background="#F7F7F7">
                        <DarkText noMargin bold>{tag} ({stories.filter(i => tag === i.tag).length})</DarkText>
                        <DarkText noMargin> </DarkText>
                        <DarkText noMargin center bold>STORY POINTS</DarkText>
                        <DarkText noMargin center bold>ASSIGNEE</DarkText>
                    </WhiteCard>
                    {stories.filter(i => tag === i.tag).map((item, index) => (
                        <WhiteCard noMargin borderRadius="0px" row>
                            <Absolute width="50%" left textOverflow="ellipsis"><DarkText textOverflow="ellipsis" noMargin>{item.name}</DarkText></Absolute>
                            <DarkText noMargin> </DarkText>
                            <DarkText noMargin> </DarkText>
                            <DarkText noMargin center>{item.points}</DarkText>
                            {/* <Image src={item.assignee.profilePic} radius="50%" width="34px"/> */}
                            <DarkText noMargin row center>{item.assignee.name}</DarkText>
                        </WhiteCard>
                    ))}
                    </>
                ))}
            </StoryTable>

        </Container>
    )
}

export default Panel;