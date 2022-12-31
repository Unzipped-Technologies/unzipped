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
import StoryModal from './StoryModal'
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
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
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

// sets stories to correct tags and updates any missing orders in redux
const setTagsAndStories = ({tags = [], stories = []}) => {
    const storyOrder = []
    const story = tags.map(item => {
        const orderStories = stories.filter(e => item._id === (e?.tag?._id || e?.tag)).sort((a, b) => a.order - b.order).map((e, index) => {
            return {
                ...e,
                order: index
            }
        })
        storyOrder.push(orderStories)
        return {
            tag: item,
            stories: orderStories
        }
    })
    // reorderStories(storyOrder)
    return story
}

const Panel = ({
    list, 
    selectedList, 
    type, 
    projects=[], 
    tags = [], 
    stories = [], 
    reorderStories,
    access,
    updateTasksOrder, 
    onBack,
    dropdownList = [],
    loading,
    user,
    updateCreateStoryForm,
    createNewStory,
    form
}) => {
    const [menuOpen, setMenuOpen] = useState(false)
    const [storyList, setStoryList] = useState([])
    const [pointsDropdown, setPointsDropdown] = useState([1, 2, 3, 5, 8])
    const [searchDropdown, setSearchDropdown] = useState([1, 2, 3, 5, 8])
    const [tagsDropdown, setTagsDropdown] = useState(tags);
    const [createAStory, setCreateAStory] = useState(false);
    const [storyModal, setStoryModal] = useState(false);
    const [selectedStory, setSelectedStory] = useState(null);
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

    const handleOnDragEnd = (result) => {
        if (!result.destination) return;
        const { source, destination } = result;
        const allStories = []

        if (source.droppableId !== destination.droppableId) {
            const sourceColumn = storyList.find(e => source.droppableId === e.tag._id);
            const destColumn = storyList.find(e => destination.droppableId === e.tag._id);
            const sourceItems = sourceColumn.stories;
            const destItems = destColumn.stories;
            const [removed] = sourceItems.splice(source.index, 1);
            removed.tag = destColumn.tag._id
            destItems.splice(destination.index, 0, removed).map((e, index) => {
                    return {
                        ...e,
                        order: index
                    }
                });
            const newSource = sourceItems.map((e, index) => {
                return {
                    ...e,
                    order: index
                }
            });
            const newDestination = destItems.map((e, index) => {
                return {
                    ...e,
                    order: index
                }
            });
            storyList.forEach(e => {
                if (e.tag._id === sourceColumn.tag._id) {
                    allStories.push(...newSource)
                } else if (e.tag._id === destColumn.tag._id) {
                    allStories.push(...newDestination)
                } else {
                    allStories.push(...e.stories)
                }
            })
            reorderStories(allStories, access)
        } else {
            const column = storyList.find(e => source.droppableId === e.tag._id);
            const copiedItems = [...column.stories];
            const [removed] = copiedItems.splice(source.index, 1);
            copiedItems.splice(destination.index, 0, removed);
            const newSource = copiedItems.map((e, index) => {
                return {
                    ...e,
                    order: index
                }
            });
            storyList.forEach(e => {
                if (e.tag._id === column.tag._id) {
                    allStories.push(...newSource)
                } else {
                    allStories.push(...e.stories)
                }
            })
            reorderStories(allStories, access)
        }
    }

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

    const openAStory = (data) => {
        setSelectedStory(data)
        setStoryModal(true)
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
                <DragDropContext onDragEnd={handleOnDragEnd}>
                    {type === 'department' && storyList.sort((a, b) => a.tag.order - b.tag.order).map((tag, count) => (
                        <div key={count}>
                            <WhiteCard noMargin borderRadius="0px" row background="#F7F7F7">
                                <DarkText noMargin bold>{tag?.tag?.tagName} ({tag.stories.length})</DarkText>
                                <DarkText noMargin> </DarkText>
                                <DarkText noMargin center bold>STORY POINTS</DarkText>
                                <DarkText noMargin center bold>ASSIGNEE</DarkText>
                            </WhiteCard>
                            <Droppable 
                                droppableId={tag.tag._id}
                                type="COLUMN" 
                                direction="vertical"
                                key={tag.tag._id}
                            >
                                {(provided) => (
                                    <div {...provided.droppableProps} ref={provided.innerRef}>
                                        {tag.stories.length > 0 && tag.stories.sort((a, b) => a.order - b.order).map((item, index) => {
                                            const employee = dropdownList.find(e => e._id === (item.assigneeId || item.assignee))
                                            return (
                                                <Draggable draggableId={item._id} key={item._id} index={index} >
                                                    {(provided) => {
                                                        if (typeof provided.draggableProps.onTransitionEnd === "function") {
                                                            queueMicrotask(() => 
                                                                provided.draggableProps.onTransitionEnd?.({
                                                                    propertyName: "transform"
                                                                })
                                                            );
                                                         } 
                                                        return (
                                                            <WhiteCard onClick={() => openAStory({...item, employee, tagName: tag?.tag?.tagName})} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} clickable noMargin value={item} borderRadius="0px" row > 
                                                                <Absolute width="50%" left textOverflow="ellipsis"><DarkText clickable textOverflow="ellipsis" noMargin>{item?.taskName}</DarkText></Absolute>
                                                                <DarkText noMargin> </DarkText>
                                                                <DarkText noMargin> </DarkText>
                                                                <DarkText clickable noMargin center>{item?.storyPoints}</DarkText>
                                                                {/* <Image src={item.assignee.profilePic} radius="50%" width="34px"/> */}
                                                                <DarkText noMargin row center>{employee?.FirstName || 'Unassigned'} {employee?.LastName || ''}</DarkText>
                                                            </WhiteCard>
                                                        )
                                                    }}
                                                </Draggable>
                                            )}
                                        )}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                            {tag.stories.length === 0 && (
                                <WhiteCard onClick={() => {
                                    updateCreateStoryForm({ tagId: tag.tag._id })
                                    setCreateAStory(true)
                                }} noMargin borderRadius="0px" height="24px" padding="10px 20px" row background="#FFF">
                                    <DarkText noMargin center bold color="#2F76FF" clickable>+</DarkText>
                                </WhiteCard>
                            )}
                        </div>
                    ))}
                </DragDropContext>
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
            {storyModal && (
                <StoryModal user={user} content={{...selectedStory, department: selectedList, comments: [
                    {
                        text: 'safdfds dsfosai dnsofnds ndosiafnidsaf n oashfisajf ndsiafnosadi dsaofj',
                        profilePic: 'https://res.cloudinary.com/dghsmwkfq/image/upload/v1671914234/testimonial_5_tksguz.jpg',
                        img: 'https://res.cloudinary.com/dghsmwkfq/image/upload/v1670047049/cld-sample-3.jpg',
                        name: 'Andrew Hill'
                    },
                    {
                        text: 'safdfds dssdaffosai dnsofnds afnosadi dsaofj',
                        profilePic: 'https://res.cloudinary.com/dghsmwkfq/image/upload/v1671914234/testimonial_8_qce67b.jpg',
                        img: 'https://res.cloudinary.com/dghsmwkfq/image/upload/v1670047048/cld-sample.jpg',
                        name: 'Jessica Maynard'
                    },
                ]}} onHide={setStoryModal}/>
            )}
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