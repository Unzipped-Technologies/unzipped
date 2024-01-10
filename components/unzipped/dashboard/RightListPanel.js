import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import { TitleText, DarkText, Absolute, WhiteCard, Underline, Grid3 } from './style'
import StoryModal from './StoryModal'
import { WorkIcon } from '../../icons'
import FreelancerCard from './FreelancerCard'
import Icon from '../../ui/Icon'
import Button from '../../ui/Button'
import FormField from '../../ui/FormField'
import Modal from '../../ui/Modal'
import Image from '../../ui/Image'
import Dropdowns from '../../ui/Dropdowns'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import Projects from '../../../pages/dashboard/projects'
import { ValidationUtils } from '../../../utils'

const Container = styled.div`
  position: relative;
  display: flex;
  flex-flow: column;
  background: ${({ background }) => (background ? background : '#D9D9D930')};
  padding: 20px 0px;
  margin-left: 34px;
  border-radius: 10px;
`

const NoUsersInList = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
  justify-content: center;
  align-items: center;
`

const UserContainer = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column;
`

const Row = styled.div`
  display: flex;
  flex-flow: row;
  align-items: center;
  position: relative;
`
const ButtonComp = styled.button`
  border: 0;
  background: #1976d2;
  border-radius: 5px;
  color: white;
  font-weight: 500;
  padding: 4px 12px;
`
const Sign = styled.span`
  margin-right: 15px;
  font-size: 14px;
  border: 1px solid;
  padding: 4px 0px 3px 3.5px;
  border-radius: 50%;
  height: 16px;
  display: flex;
  width: 17px;
  align-items: center;
`

const StoryTable = styled.div`
  border: 1px solid rgba(217, 217, 217, 0.25);
  border-radius: 0px 0px 15px 15px;
  background: rgba(217, 217, 217, 0.25);
  padding-bottom: 10px;
`

const freelancer = [
  {
    name: 'James Cameron',
    type: 'Full Stack Web Developer',
    country: 'United States',
    skills: ['React', 'Node.js', 'Web 3', 'AWS', 'UI/UX'],
    cover: `I have been a developer for over 20 years. I have worked on many
        large projects and I have contributed superior quality features and improved
        ROI for many developers.`,
    profilePic: 'https://res.cloudinary.com/dghsmwkfq/image/upload/v1670086178/dinosaur_xzmzq3.png',
    isInvited: true
  },
  {
    name: 'Stefano Campagna',
    type: 'Tutor',
    country: 'United States',
    skills: ['React', 'Taking Calls', 'Web 3', 'AWS', 'UI/UX'],
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
    skills: ['React', 'Node.js', 'Web 3', 'AWS', 'UI/UX'],
    cover: `I have been a developer for over 20 years. I have worked on many
        large projects and I have contributed superior quality features and improved
        ROI for many developers.`,
    profilePic: '/img/testimonial_12.jpg',
    isInvited: false
  }
]

const setTagsAndStories = ({ tags = [], stories = [] }) => {
  const storyOrder = []
  const story = tags.map(item => {
    const orderStories = stories
      .filter(e => item._id === (e?.tag?._id || e?.tag))
      .sort((a, b) => a.order - b.order)
      .map((e, index) => {
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
  return story
}

const Panel = ({
  list,
  selectedList,
  type,
  projects = [],
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
  addCommentToStory,
  createNewStory,
  form
}) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [storyList, setStoryList] = useState([])
  const [pointsDropdown, setPointsDropdown] = useState([1, 2, 3, 5, 8])
  const [searchDropdown, setSearchDropdown] = useState([1, 2, 3, 5, 8])
  const [tagsDropdown, setTagsDropdown] = useState(tags)
  const [createAStory, setCreateAStory] = useState(false)
  const [storyModal, setStoryModal] = useState(false)
  const [selectedStory, setSelectedStory] = useState(null)
  const dragItem = useRef()
  const dragOverItem = useRef()
  const setDropdowns = item => {
    setTimeout(function () {
      setMenuOpen(item)
    }, 500)
  }

  const setCloseDropdowns = time => {
    setTimeout(function () {
      setMenuOpen(false)
    }, time || 500)
  }

  const handleOnDragEnd = result => {
    if (!result.destination) return
    const { source, destination } = result
    const allStories = []
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = storyList.find(e => source.droppableId === e.tag._id)
      const destColumn = storyList.find(e => destination.droppableId === e.tag._id)
      const sourceItems = sourceColumn.stories
      const destItems = destColumn.stories
      const [removed] = sourceItems.splice(source.index, 1)
      removed.tag = destColumn.tag._id
      destItems.splice(destination.index, 0, removed).map((e, index) => {
        return {
          ...e,
          order: index
        }
      })
      const newSource = sourceItems.map((e, index) => {
        return {
          ...e,
          order: index
        }
      })
      const newDestination = destItems.map((e, index) => {
        return {
          ...e,
          order: index
        }
      })
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
      const column = storyList.find(e => source.droppableId === e.tag._id)
      const copiedItems = [...column.stories]
      const [removed] = copiedItems.splice(source.index, 1)
      copiedItems.splice(destination.index, 0, removed)
      const newSource = copiedItems.map((e, index) => {
        return {
          ...e,
          order: index
        }
      })
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
      icon: <Icon name="contacts" width={27} height={27} style={{ marginLeft: '8px' }} />
    },
    {
      name: 'Create Department',
      link: '/',
      icon: <Icon name="contacts" width={27} height={27} style={{ marginLeft: '8px' }} />
    },
    {
      name: 'Remove Department',
      link: '/',
      icon: <Icon name="contacts" width={27} height={27} style={{ marginLeft: '8px' }} />
    }
  ]

  const onSubmit = () => {
    createNewStory()
    setCreateAStory(false)
  }

  const updateAssigee = e => {
    updateCreateStoryForm({
      assignee: e.target.value,
      assigneeId: searchDropdown.find(
        item =>
          item?.FirstName.toLowerCase().includes(e.target?.value.toLowerCase().split(' ')[0]) &&
          item.LastName.toLowerCase().includes(e.target?.value.toLowerCase()?.split(' ')[1])
      )?._id
    })
  }

  const updateTagName = e => {
    updateCreateStoryForm({
      tagName: e.target.value,
      tagId: tagsDropdown.find(item => item.tagName.toLowerCase().includes(e.target.value.toLowerCase()))?._id
    })
  }

  const openAStory = data => {
    setSelectedStory(data)
    setStoryModal(true)
  }

  const submitComments = form => {
    addCommentToStory(
      {
        taskId: form.taskId,
        text: form?.comment,
        profilePic: user?.profileImage,
        userId: user._id,
        name: ValidationUtils.getFullNameFromUser(user),
        img: form?.img
      },
      access
    )
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
    if (selectedStory) {
      const story = stories.find(e => selectedStory._id === e._id)
      if (story) {
        const employee = dropdownList.find(e => e._id === (story?.assigneeId || story?.assignee))
        setSelectedStory({ ...story, employee })
      }
    }
  }, [stories])

  useEffect(() => {
    setStoryList(setTagsAndStories({ tags, stories }))
  }, [tags, stories])

  useEffect(() => {
    setPointsDropdown(
      [1, 2, 3, 5, 8].filter(element => {
        if (form?.storyPoints === '') {
          return false
        }
        if (element > form?.storyPoints - 2 && element < form?.storyPoints + 2) {
          return true
        }
      })
    )
  }, [form?.storyPoints])

  useEffect(() => {
    if (dropdownList?.length) {
      setSearchDropdown(
        dropdownList.filter(element => {
          if (form?.assignee === '') {
            return false
          }
          if (
            `${element?.FirstName} ${element?.LastName}`.toLowerCase().includes(`${form?.assignee}`.toLowerCase()) ||
            `${element?.FirstName}`.toLowerCase().includes(`${form?.assignee}`.toLowerCase()) ||
            `${element?.LastName}`.toLowerCase().includes(`${form?.assignee}`.toLowerCase())
          ) {
            return true
          }
        })
      )
    }
  }, [form?.assignee])

  useEffect(() => {
    setTagsDropdown(
      tags.filter(element => {
        if (form?.tagName === '') {
          return false
        }
        return true
      })
    )
  }, [form?.tagName])

  return (
    <Container background={type === 'department' ? '#FDFDFD' : ''}>
      <div className="d-flex align-items-center justify-content-between pb-3 px-3">
        <div className="d-flex align-items-center ">
          <TitleText width="max-content" noMargin size="24px" paddingRight="20px">
            {selectedList}
          </TitleText>
          {type === 'department' && (
            <Button
              className="bg-transparent text-dark"
              popoutWidth="150px"
              dropDownRight="-130px"
              noBorder
              block
              fontSize="13px"
              popout={[
                {
                  text: 'update Statuses',
                  onClick: () => console.log('ITEM 1')
                },
                {
                  text: 'Create Department',
                  onClick: () => console.log('ITEM 1')
                },
                {
                  text: 'Edit',
                  onClick: () => console.log('ITEM 2')
                },
                {
                  text: 'Delete',
                  onClick: () => console.log('ITEM 3')
                }
              ]}>
              <Icon name="actionIcon" color="#333" />
            </Button>
          )}
        </div>
        <ButtonComp>+ADD</ButtonComp>
      </div>
      <Underline color="#333" noMargin={type === 'department'} />
      {menuOpen === 'profile' && <Dropdowns items={menuItems} onClose={() => setCloseDropdowns(0)} right top />}
      {!freelancer && (
        <NoUsersInList>
          <WorkIcon width={200} height={200} />
          <TitleText center noMargin size="24px">
            This list is empty
          </TitleText>
          <DarkText center>Add investors to your list to quickly find them later. </DarkText>
          <div>
            <Button noBorder oval style={{ color: 'black' }}>
              BROWSE INVESTORS
            </Button>
          </div>
        </NoUsersInList>
      )}
      <UserContainer>
        {type === 'list' && freelancer.map(user => <FreelancerCard user={user} width={'650px'} />)}
      </UserContainer>
      <StoryTable>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          {type === 'department' &&
            storyList
              .sort((a, b) => a.tag.order - b.tag.order)
              .map((tag, count) => {
                return (
                  <div key={count}>
                    <WhiteCard padding="10px 40px" noMargin borderRadius="0px" row background="#F7F7F7">
                      <DarkText noMargin bold>
                        {tag?.tag?.tagName} ({tag.stories.length})
                      </DarkText>
                      <DarkText noMargin> </DarkText>
                      <DarkText noMargin center bold>
                        STORY POINTS
                      </DarkText>
                      <DarkText noMargin center bold>
                        ASSIGNEE
                      </DarkText>
                    </WhiteCard>
                    {tag?.tag?.tagName.includes('To') && (
                      <WhiteCard
                        onClick={() => {
                          updateCreateStoryForm({ tagId: tag.tag._id })
                          setCreateAStory(true)
                        }}
                        noMargin
                        borderRadius="0px"
                        padding="10px 10px"
                        row
                        background="#FFF">
                        <DarkText className="d-flex align-items-center" noMargin bold color="#2F76FF" clickable>
                          <Sign className="text-primary pe-3">+</Sign>ADD TASK
                        </DarkText>
                      </WhiteCard>
                    )}
                    <Droppable droppableId={tag.tag._id} type="COLUMN" direction="vertical" key={tag.tag._id}>
                      {(provided, snapshot) => (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={{
                            background: snapshot.isDraggingOver ? 'lightblue' : 'white',
                            padding: '1px 0px 0px 0px',
                            borderRadius: '4px'
                          }}>
                          {tag.stories.length > 0 &&
                            tag.stories
                              .sort((a, b) => a.order - b.order)
                              .map((item, index) => {
                                const employee = dropdownList.find(e => e._id === (item.assigneeId || item.assignee))
                                return (
                                  <Draggable draggableId={item._id} key={item._id} index={index}>
                                    {(provided, snapshot) => {
                                      if (typeof provided.draggableProps.onTransitionEnd === 'function') {
                                        queueMicrotask(() =>
                                          provided.draggableProps.onTransitionEnd?.({
                                            propertyName: 'transform'
                                          })
                                        )
                                      }
                                      const tagName = tag?.tag?.tagName
                                      return (
                                        <WhiteCard
                                          padding="20px 40px"
                                          onClick={() => openAStory({ ...item, employee, tagName: tagName })}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                          ref={provided.innerRef}
                                          clickable
                                          noMargin
                                          value={item}
                                          borderRadius="0px"
                                          row
                                          style={{
                                            ...provided.draggableProps.style,
                                            background: snapshot.isDragging ? '#eee' : 'white'
                                          }}>
                                          <Absolute width="50%" left textOverflow="ellipsis">
                                            <i
                                              className="fa-thin fa-check"
                                              style={{
                                                color: tagName.includes('To')
                                                  ? '#D9D9D9'
                                                  : tagName.includes('Done')
                                                  ? 'white'
                                                  : 'white',
                                                border: tagName.includes('To') ? '1px solid #D9D9D9' : '',
                                                backgroundColor: tagName.includes('Done')
                                                  ? '#5DC26A'
                                                  : tagName.includes('Progress')
                                                  ? '#FFC24E'
                                                  : '',
                                                borderRadius: '50%',
                                                height: '16px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                padding: '3px 3px 1.7px 0',
                                                fontSize: 'smaller',
                                                marginRight: '15px'
                                              }}></i>
                                            <DarkText clickable textOverflow="ellipsis" noMargin>
                                              {item?.taskName}
                                            </DarkText>
                                          </Absolute>
                                          <DarkText noMargin> </DarkText>
                                          <DarkText noMargin> </DarkText>
                                          <DarkText clickable noMargin center>
                                            {item?.storyPoints}
                                          </DarkText>
                                          <DarkText noMargin row center>
                                            {employee?.FirstName || 'Unassigned'} {employee?.LastName || ''}
                                          </DarkText>
                                        </WhiteCard>
                                      )
                                    }}
                                  </Draggable>
                                )
                              })}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </div>
                )
              })}
        </DragDropContext>
        {type === 'projects' && (
          <>
            <WhiteCard noMargin borderRadius="0px" row background="#F7F7F7">
              <DarkText noMargin bold>
                Project Name
              </DarkText>
              <DarkText noMargin> </DarkText>
              <DarkText noMargin center bold>
                Budget
              </DarkText>
              <DarkText noMargin center bold>
                Equity
              </DarkText>
              <DarkText noMargin center bold>
                Points
              </DarkText>
              <DarkText noMargin center bold>
                Value Estimate
              </DarkText>
              <DarkText noMargin center bold>
                Deadline
              </DarkText>
              <DarkText noMargin center bold>
                Actions
              </DarkText>
            </WhiteCard>
            {projects.map(project => (
              <></>
            ))}
          </>
        )}
      </StoryTable>
      {storyModal && (
        <StoryModal
          user={user}
          content={{ ...selectedStory, department: selectedList }}
          submitComments={submitComments}
          onHide={setStoryModal}
        />
      )}
      {createAStory && (
        <Modal onHide={() => setCreateAStory(false)} height="520px" background="#D9D9D9">
          <FormField
            fieldType="input"
            margin
            fontSize="14px"
            noMargin
            width="95%"
            onChange={e => updateCreateStoryForm({ taskName: e.target.value })}
            value={form?.taskName}>
            TASK NAME(REQUIRED)
          </FormField>
          <Grid3 margin="0px" width="95%" grid="2fr 2fr">
            <FormField
              fieldType="input"
              margin
              fontSize="14px"
              noMargin
              width="95%"
              dropdownList={tagsDropdown}
              onChange={e => updateTagName(e)}
              value={form?.tagName}
              clickType="tagName"
              onUpdate={updateCreateStoryForm}>
              Tag
            </FormField>
            <FormField
              fieldType="input"
              margin
              fontSize="14px"
              noMargin
              width="100%"
              onChange={e => updateCreateStoryForm({ priority: e.target.value })}
              value={form?.priority}>
              PRIORITY
            </FormField>
          </Grid3>
          <Grid3 margin="0px" width="95%" grid="2fr 2fr">
            <FormField
              fieldType="input"
              margin
              fontSize="14px"
              noMargin
              width="95%"
              dropdownList={searchDropdown}
              onChange={e => updateAssigee(e)}
              value={form?.assignee}
              clickType="assignee"
              onUpdate={updateCreateStoryForm}>
              ASSIGN TO
            </FormField>
            <FormField
              fieldType="input"
              margin
              fontSize="14px"
              noMargin
              width="100%"
              onChange={e => updateCreateStoryForm({ storyPoints: e.target.value })}
              value={form?.storyPoints}
              dropdownList={pointsDropdown}
              clickType="storyPoints"
              onUpdate={updateCreateStoryForm}>
              STORY POINTS
            </FormField>
          </Grid3>
          <FormField
            fieldType="input"
            margin
            fontSize="14px"
            noMargin
            height="150px"
            textarea
            onChange={e => updateCreateStoryForm({ description: e.target.value })}
            value={form?.description}>
            DESCRIPTION
          </FormField>
          <Absolute bottom="20px">
            <Button oval extraWide type="outlineInverse" onClick={() => setCreateAStory(false)}>
              CANCEL
            </Button>
            <Button
              disabled={false}
              onClick={() => onSubmit()}
              width="58.25px"
              oval
              extraWide
              margin="0px 37px 0px 20px"
              type="black">
              {!loading ? 'ADD TASK' : <CircularProgress size={18} />}
            </Button>
          </Absolute>
        </Modal>
      )}
    </Container>
  )
}

export default Panel
