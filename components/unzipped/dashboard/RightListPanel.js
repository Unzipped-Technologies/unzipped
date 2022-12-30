import React, {useEffect, useState, useRef} from 'react'
import styled from 'styled-components'
import {
    TitleText,
    DarkText,
    Absolute,
    WhiteCard,
    Underline,
    Grid3,
} from './style'
import {
    WorkIcon
} from '../../icons'
import FreelancerCard from './FreelancerCard'
import Icon from '../../ui/Icon'
import Button from '../../ui/Button'
import FormField from '../../ui/FormField'
import Modal from '../../ui/Modal'
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
            stories: stories.filter(e => item._id === (e?.tag?._id || e?.tag))
        }
    })
}

const Panel = ({
    list, 
    selectedList, 
    type, 
    projects=[], 
    tags = [], 
    stories = [], 
    updateTasksOrder, 
    onBack,
    dropdownList = [],
    loading,
    updateCreateStoryForm,
    createNewStory,
    form
}) => {
    const [menuOpen, setMenuOpen] = useState(false)
    const [storyList, setStoryList] = useState([])
    const [pointsDropdown, setPointsDropdown] = useState([1, 2, 3, 5, 8])
    const [searchDropdown, setSearchDropdown] = useState([1, 2, 3, 5, 8])
    const [tagsDropdown, setTagsDropdown] = useState(tags);
    const [createAStory, setCreateAStory] = useState(false)
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
        updateTasksOrder({
            
        })
        dragItem.current = null;
        dragOverItem.current = null;
        // setStoryList(copyListItems);
    };

    const menuItems = [
        {
            name: 'Create a story',
            onClick: () => {
                updateCreateStoryForm({ tagId: tags[0]._id })
                setCreateAStory(true)
            },
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

    const onSubmit = () => {
        createNewStory()
        setCreateAStory(false)
    }

    const updateAssigee = (e) => {
        updateCreateStoryForm({ 
            assignee: e.target.value, 
            assigneeId: searchDropdown.find(item => item?.FirstName.toLowerCase().includes(e.target?.value.toLowerCase().split(' ')[0]) && item.LastName.toLowerCase().includes(e.target?.value.toLowerCase()?.split(' ')[1]))?._id
        })
    }

    const updateTagName = (e) => {
        updateCreateStoryForm({ 
            tagName: e.target.value, 
            tagId: tagsDropdown.find(item => item.tagName.toLowerCase().includes(e.target.value.toLowerCase()))?._id
        })
    }

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

    useEffect(() => {
        setPointsDropdown([1, 2, 3, 5, 8].filter(element => {
            if (form?.storyPoints === '') {
                return false;
            }
            if (element > form?.storyPoints - 2 && element < form?.storyPoints + 2) {
              return true;
        }}))
    }, [form?.storyPoints])

    useEffect(() => {
        setSearchDropdown(
            dropdownList.filter(element => {
                if (form?.assignee === '') {
                    return false;
                }
                if (`${element?.FirstName} ${element?.LastName}`.toLowerCase().includes(form?.assignee.toLowerCase()) || element?.FirstName.toLowerCase().includes(form?.assignee.toLowerCase()) || element?.LastName.toLowerCase().includes(form?.assignee.toLowerCase())) {
                  return true;
            }})
        )
    }, [form?.assignee])

    useEffect(() => {
        setTagsDropdown(
            tags.filter(element => {
                if (form?.tagName === '') {
                    return false;
                }
                return true;
            })
        )
    }, [form?.tagName])

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
                    {tag.stories.length > 0 && tag.stories.sort((a, b) => a.order - b.order).map((item, index) => {
                        const employee = dropdownList.find(e => e._id === (item.assigneeId || item.assignee))
                        return (
                        <WhiteCard clickable noMargin value={item} borderRadius="0px" row onDragEnd={e => drop(e, item)} onDragEnter={(e) => dragEnter(e, item)} onDragStart={(e) => dragStart(e, item)} draggable key={index + item.tag}> 
                            <Absolute width="50%" left textOverflow="ellipsis"><DarkText clickable textOverflow="ellipsis" noMargin>{item?.taskName}</DarkText></Absolute>
                            <DarkText noMargin> </DarkText>
                            <DarkText noMargin> </DarkText>
                            <DarkText clickable noMargin center>{item?.storyPoints}</DarkText>
                            {/* <Image src={item.assignee.profilePic} radius="50%" width="34px"/> */}
                            <DarkText noMargin row center>{employee?.FirstName || 'Unassigned'} {employee?.LastName || ''}</DarkText>
                        </WhiteCard>
                    )})}
                    {tag.stories.length === 0 && (
                        <WhiteCard onClick={() => {
                            updateCreateStoryForm({ tagId: tag.tag._id })
                            setCreateAStory(true)
                        }} noMargin borderRadius="0px" height="24px" padding="10px 20px" row background="#FFF">
                            <DarkText noMargin center bold color="#2F76FF" clickable>+</DarkText>
                        </WhiteCard>
                    )}
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
            {createAStory && (
                <Modal onHide={() => setCreateAStory(false)} height="520px">
                    <FormField 
                        fieldType="input"
                        margin
                        fontSize='14px'
                        noMargin
                        width="95%"
                        onChange={(e) => updateCreateStoryForm({ taskName: e.target.value })}
                        value={form?.taskName}
                    >
                        TASK NAME(REQUIRED)
                    </FormField>
                    <Grid3 margin="0px" width="95%" grid="2fr 1fr 1fr">
                    <FormField 
                        fieldType="input"
                        margin
                        fontSize='14px'
                        noMargin
                        width="95%"
                        dropdownList={tagsDropdown}
                        onChange={e => updateTagName(e)}
                        value={form?.tagName}
                        clickType="tagName"
                        onUpdate={updateCreateStoryForm}
                    >
                        Tag
                    </FormField>
                    <FormField 
                        fieldType="input"
                        margin
                        fontSize='14px'
                        noMargin
                        width="90%"
                        onChange={(e) => updateCreateStoryForm({ priority: e.target.value })}
                        value={form?.priority}
                    >
                        PRIORITY
                    </FormField>
                    <FormField 
                        fieldType="input"
                        margin
                        fontSize='14px'
                        noMargin
                        width="100%"
                        onChange={(e) => updateCreateStoryForm({ storyPoints: e.target.value })}
                        value={form?.storyPoints}
                        dropdownList={pointsDropdown}
                        clickType="storyPoints"
                        onUpdate={updateCreateStoryForm}
                    >
                        STORY POINTS
                    </FormField>
                    </Grid3>
                    <FormField 
                        fieldType="input"
                        margin
                        fontSize='14px'
                        noMargin
                        width="95%"
                        dropdownList={searchDropdown}
                        onChange={e => updateAssigee(e)}
                        value={form?.assignee}
                        clickType="assignee"
                        onUpdate={updateCreateStoryForm}
                    >
                        ASSIGN TO
                    </FormField>
                    <FormField 
                        fieldType="input"
                        margin
                        fontSize='14px'
                        noMargin
                        height="150px"
                        textarea
                        onChange={(e) => updateCreateStoryForm({ description: e.target.value })}
                        value={form?.description}
                    >
                        DESCRIPTION
                    </FormField>
                    <Absolute bottom="20px"><Button oval extraWide type="outlineInverse" onClick={() => setCreateAStory(false)}>CANCEL</Button><Button disabled={false} onClick={() => onSubmit()} width="58.25px" oval extraWide margin="0px 37px 0px 20px" type="black">{!loading ? 'ADD TASK' : <CircularProgress size={18} />}</Button></Absolute>
                </Modal>
            )}
        </Container>
    )
}

export default Panel;