import React, {useEffect, useState, useRef} from 'react'
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
import Projects from '../../../pages/dashboard/projects'

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
        type: 'Tutor',
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

const setTagsAndStories = ({tags = [], stories = []}) => {
    return tags.map(item => {
        return {
            tag: item,
            stories: stories.filter(e => item._id === e.tag)
        }
    })
}

const Panel = ({list, selectedList, type, projects=[], tags, stories, updateTasksOrder}) => {
    const [menuOpen, setMenuOpen] = useState(false)
    const [storyList, setStoryList] = useState([])
    const dragItem = useRef();
    const dragOverItem = useRef();

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

    const dragStart = (e, position) => {
        dragItem.current = position;
        // console.log(e.target.innerHTML);
      };

    const dragEnter = (e, position) => {
    dragOverItem.current = position;
    // console.log(e.target.innerHTML);
    };

    const drop = (e, item) => {
        const copyListItems = [...stories];
        const dragItemContent = item
        dragItemContent.order = dragOverItem.current.order + 0.5
        dragItemContent.tag = dragOverItem.current.tag
        console.log('///contnet', dragItemContent)
        console.log('///drop', dragOverItem.current)
        copyListItems.splice(dragItem.current, 1);
        copyListItems.splice(dragOverItem.current, 0, dragItemContent);
        updateTasksOrder()
        dragItem.current = null;
        dragOverItem.current = null;
        // setStoryList(copyListItems);
    };

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

    useEffect(() => {
        setStoryList(setTagsAndStories({tags, stories}))
    }, [tags, stories])
    console.log(storyList)
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
                {type === 'department' && storyList.sort((a, b) => a.tag.order - b.tag.order).map((tag, count) => (
                    <>
                    <WhiteCard noMargin borderRadius="0px" row background="#F7F7F7">
                        <DarkText noMargin bold>{tag?.tag?.tagName} ({tag.stories.length})</DarkText>
                        <DarkText noMargin> </DarkText>
                        <DarkText noMargin center bold>STORY POINTS</DarkText>
                        <DarkText noMargin center bold>ASSIGNEE</DarkText>
                    </WhiteCard>
                    {tag.stories.sort((a, b) => a.order - b.order).map((item, index) => (
                        <WhiteCard noMargin value={item} borderRadius="0px" row onDragEnd={e => drop(e, item)} onDragEnter={(e) => dragEnter(e, item)} onDragStart={(e) => dragStart(e, item)} draggable key={index + item.tag}> 
                            <Absolute width="50%" left textOverflow="ellipsis"><DarkText textOverflow="ellipsis" noMargin>{item?.taskName}</DarkText></Absolute>
                            <DarkText noMargin> </DarkText>
                            <DarkText noMargin> </DarkText>
                            <DarkText noMargin center>{item?.storyPoints}</DarkText>
                            {/* <Image src={item.assignee.profilePic} radius="50%" width="34px"/> */}
                            <DarkText noMargin row center>{item?.assignee?.name}</DarkText>
                        </WhiteCard>
                    ))}
                    </>
                ))}
                {type === 'projects' && (
                    <>
                        <WhiteCard noMargin borderRadius="0px" row background="#F7F7F7">
                            <DarkText noMargin bold>Project Name</DarkText>
                            <DarkText noMargin> </DarkText>
                            <DarkText noMargin center bold>Budget</DarkText>
                            <DarkText noMargin center bold>Equity</DarkText>
                            <DarkText noMargin center bold>Points</DarkText>
                            <DarkText noMargin center bold>Value Estimate</DarkText>
                            <DarkText noMargin center bold>Deadline</DarkText>
                            <DarkText noMargin center bold>Actions</DarkText>
                        </WhiteCard>
                        {projects.map(project => (
                            <></>
                        ))}
                    </>
                    

                )}
            </StoryTable>

        </Container>
    )
}

export default Panel;