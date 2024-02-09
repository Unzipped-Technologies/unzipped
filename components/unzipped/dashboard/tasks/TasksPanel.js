import React, { useEffect, useState, useRef, useMemo } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import TicketPreview from '../TicketPreview'

import { AiOutlinePlusCircle } from 'react-icons/ai'
import { FaRegCheckCircle } from 'react-icons/fa'
import { AiOutlinePlus } from 'react-icons/ai'
import { Dialog } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import MuiDialogContent from '@material-ui/core/DialogContent'
import { TASK_PRIORITY, TODO_STATUS, TASK_STATUS } from '../../../../utils/constants'
import { TitleText, DarkText, Absolute, WhiteCard, Grid3 } from '../style'
import Icon from '../../../ui/Icon'
import Button from '../../../ui/Button'
import FormField from '../../../ui/FormField'
import { DragDropContext } from 'react-beautiful-dnd'
import {
  getDepartmentById,
  updateCreateStoryForm,
  createTask,
  updateTask,
  addCommentToStory,
  resetStoryForm
} from '../../../../redux/actions'

const Container = styled.div`
  position: relative;
  display: flex;
  flex-flow: column;
  background: ${({ background }) => (background ? background : '#D9D9D930')};
  padding: 0px 20px 20px 0px;
  margin-left: 34px;
  border-radius: 10px;
`

const StoryTable = styled.div`
  border: 1px solid rgba(217, 217, 217, 0.25);
  border-radius: 0px 0px 15px 15px;
  background: rgba(217, 217, 217, 0.25);
  padding-bottom: 10px;
`

const SubmitButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: ${({ margin }) => (margin ? margin : '0px')};
`

const SubmitButton = styled.button`
  color: #fff;
  text-align: center;
  font-family: Roboto;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 24.5px; /* 163.333% */
  letter-spacing: 0.4px;
  text-transform: uppercase;
  width: 72px;
  height: 27px;
  background: #1976d2 !important;
  flex-shrink: 0;
  border-radius: 5px;
  outline: none !important;
  border: none !important;
  ${({ active }) =>
    active &&
    css`
      outline: none !important;
      border: none !important;
    `};
`

const MUIDialog = withStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  }
}))(Dialog)

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    paddingBottom: '0px !important'
  }
}))(MuiDialogContent)

const TasksPanel = ({
  updateCreateStoryForm,
  selectedDepartment,
  getDepartmentById,
  tags = [],
  reorderStories,
  access,
  taskForm,
  departmentData,
  createTask,
  updateTask,
  addCommentToStory,
  resetStoryForm,
  user
}) => {
  const dragItem = useRef()
  const dragOverItem = useRef()
  const [open, setOpen] = React.useState(false)
  const [storyModal, setStoryModal] = React.useState(false)
  const [storyList, setStoryList] = useState([])
  const [taskId, setTaskId] = useState('')
  const [content, setContent] = useState({})
  const [isEditing, setIsEditing] = useState(false)

  const tagOptions = useMemo(() => {
    return (
      departmentData?.departmentTags?.map(tag => ({
        value: tag?._id,
        label: tag?.tagName
      })) || []
    )
  }, [departmentData])

  const assigneeOptions = useMemo(() => {
    return (
      departmentData?.contracts?.map(contract => ({
        value: contract?.freelancerId,
        label: (
          <div>
            <div
              style={{
                color: '#000',
                textAlign: 'center',
                fontFamily: 'Roboto',
                fontSize: '14px',
                fontStyle: 'normal',
                fontWeight: 500,
                lineHeight: 'normal',
                letterSpacing: '0.4px',
                textTransform: 'capitalize'
              }}>
              {contract?.freelancer?.user?.FullName}
            </div>
            <div
              style={{
                color: '#787878',
                textAlign: 'center',
                fontSize: '10px',
                fontStyle: 'normal',
                fontWeight: 500,
                lineHeight: 'normal',
                letterSpacing: '0.4px'
              }}>
              {contract?.freelancer?.user?.email}
            </div>
          </div>
        )
      })) || []
    )
  }, [departmentData])

  const taskPriorityOptions = useMemo(() => {
    return (
      TASK_PRIORITY?.map(priority => ({
        value: priority,
        label: priority
      })) || []
    )
  }, [departmentData])

  const taskStatusOptions = useMemo(() => {
    return (
      TASK_STATUS?.map(status => ({
        value: status,
        label: status
      })) || []
    )
  }, [])

  useEffect(() => {
    if (selectedDepartment?._id) getDepartmentById(selectedDepartment._id)
  }, [selectedDepartment])

  useEffect(async () => {
    await updateCreateStoryForm({
      businessId: selectedDepartment.businessId,
      departmentId: selectedDepartment._id,
      status: TODO_STATUS
    })
  }, [open])

  const getStatusColor = task => {
    if (task?.status.includes('inprogress')) {
      return '#FFA500'
    } else if (task?.status.includes('done')) {
      return '#198754'
    } else {
      return '#D8D8D8'
    }
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

  const updateForm = (field, value) => {
    updateCreateStoryForm({
      [`${field}`]: value
    })
  }

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = async reason => {
    if (reason !== 'backdropClick') {
      setOpen(false)
      if (taskId) {
        await updateCreateStoryForm({
          taskName: '',
          storyPoints: 0,
          priority: '',
          order: 1,
          description: '',
          status: '',
          assignee: ''
        })
      }
      setTaskId('')
    }
  }

  const closeStoryModal = () => {
    setStoryModal(false)
    resetStoryForm()
    setTaskId('')
    setContent({})
  }

  const setTaskContent = (task, tag) => {
    const commentsContent = []
    if (task?.comments?.length) {
      for (var comment of task.comments) {
        const commentData = {
          _id: comment._id,
          profilePic: '',
          name: '',
          updatedAt: comment.updatedAt,
          comment: comment.comment,
          img: comment.img
        }
        if (comment.userId === departmentData?.clientId) {
          commentData.profilePic = departmentData?.client?.profileImage || ''
          commentData.name = departmentData?.client?.FullName || ''
        }
        commentsContent.push(commentData)
      }
    }
    const contentData = {
      ...task,
      tagName: tag?.tagName,
      department: selectedDepartment?.name,
      employee: {
        FirstName: task?.assignee?.user?.FirstName,
        LastName: task?.assignee?.user?.LastName,
        profileImage: task?.assignee?.user?.profileImage
      },
      comments: commentsContent
    }
    setIsEditing(true)
    setContent(contentData)
    setStoryModal(true)
    updateCreateStoryForm({
      taskName: task?.taskName,
      storyPoints: task?.storyPoints,
      priority: task?.priority,
      order: 1,
      description: task?.description,
      status: task?.status,
      businessId: selectedDepartment?.businessId,
      departmentId: selectedDepartment._id,
      assignee: task?.assignee?.user?.freelancers,
      tag: task?.tag
    })
  }

  const addCommentToTask = async data => {
    await addCommentToStory(data)
    setStoryModal(false)
    await getDepartmentById(selectedDepartment._id)
  }

  const onSubmit = async () => {
    if (taskId) {
      await updateTask(taskId, taskForm)
    } else {
      await createTask(taskForm)
    }
    setStoryModal(false)
    await getDepartmentById(selectedDepartment._id)
  }

  return (
    <Container background="#FDFDFD">
      <div
        className="d-flex align-items-center justify-content-between pb-3 px-3"
        style={{
          width: '100%',
          borderRadius: '5px',
          padding: '10px',
          borderRadius: '8px 8px 0px 0px',
          background: ' rgba(255, 255, 255, 0.64)',
          boxShadow: ' 0px 4px 8px 0px rgba(0, 0, 0, 0.10)'
        }}>
        <div className="d-flex align-items-center">
          <TitleText width="max-content" noMargin size="24px" paddingRight="20px">
            {selectedDepartment?.name}
          </TitleText>
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
        </div>
        <SubmitButtonContainer margin="0px 20px 0px 80px">
          <SubmitButton onClick={() => {}}>
            <AiOutlinePlus style={{ fontSize: '16px', fontWeight: 'bold' }} /> Add
          </SubmitButton>
        </SubmitButtonContainer>
      </div>

      <StoryTable>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <div>
            {departmentData?.departmentTags?.length
              ? departmentData?.departmentTags.map(tag => {
                  return (
                    <div key={tag._id}>
                      <WhiteCard padding="10px 40px" noMargin borderRadius="0px" row background="#F7F7F7">
                        <DarkText noMargin bold width="300px">
                          {tag.tagName} ({tag?.tasks?.length})
                        </DarkText>
                        <DarkText noMargin center bold width="120px" paddingLeft="50px">
                          STORY POINTS
                        </DarkText>
                        <DarkText noMargin center bold width="80px" paddingLeft="50px">
                          ASSIGNEE
                        </DarkText>
                      </WhiteCard>
                      {tag?.tasks?.length
                        ? tag?.tasks.map(task => {
                            return (
                              <WhiteCard
                                padding="10px 10px"
                                noMargin
                                borderRadius="0px"
                                row
                                background="#F7F7F7"
                                key={task._id}>
                                <DarkText
                                  noMargin
                                  bold
                                  width="300px"
                                  onClick={async () => {
                                    setTaskId(task._id)
                                    setTaskContent(task, tag)
                                  }}>
                                  <div
                                    style={{
                                      display: 'flex',
                                      flexDirection: 'row',
                                      alignItems: 'center'
                                    }}>
                                    <div
                                      style={{
                                        marginRight: '20px'
                                      }}>
                                      <FaRegCheckCircle color={getStatusColor(task)} />
                                    </div>
                                    {task.taskName}
                                  </div>
                                </DarkText>
                                <DarkText noMargin center bold width="120px" paddingLeft="70px">
                                  {task.storyPoints}
                                </DarkText>
                                <DarkText noMargin center bold width="50px" paddingLeft="70px">
                                  <img
                                    src={task?.assignee?.user?.profileImage}
                                    style={{
                                      width: '24px',
                                      height: '24px',
                                      borderRadius: '50%',
                                      marginRight: '6px'
                                    }}
                                  />
                                </DarkText>
                              </WhiteCard>
                            )
                          })
                        : ''}

                      <WhiteCard
                        onClick={() => {
                          setStoryModal(true)
                          setContent({
                            tag: tag._id,
                            businessId: selectedDepartment?.businessId,
                            departmentId: selectedDepartment?.departmentId
                          })
                          updateForm('tag', tag._id)
                          setIsEditing(false)
                        }}
                        noMargin
                        borderRadius="0px"
                        padding="10px 10px"
                        row
                        background="#FFF">
                        <DarkText className="d-flex align-items-center" noMargin bold color="#2F76FF" clickable>
                          <AiOutlinePlusCircle
                            style={{
                              fontSize: '18px',
                              marginRight: '20px'
                            }}
                          />
                          ADD TASK
                        </DarkText>
                      </WhiteCard>
                    </div>
                  )
                })
              : ''}
          </div>
        </DragDropContext>
      </StoryTable>
      {storyModal && (
        <TicketPreview
          open={storyModal}
          user={user}
          isEditing={isEditing}
          content={content}
          onSubmit={onSubmit}
          submitComments={addCommentToTask}
          updateForm={updateForm}
          assigneeOptions={assigneeOptions}
          taskStatusOptions={taskStatusOptions}
          tagOptions={tagOptions}
          taskPriorityOptions={taskPriorityOptions}
          addCommentToStory={addCommentToStory}
          taskForm={taskForm}
          onHide={() => {
            closeStoryModal()
          }}
        />
      )}

      <MUIDialog
        onClose={() => {
          handleClose('backdropClick')
        }}
        disableEscapeKeyDown
        open={open}
        maxWidth="md"
        style={{ minHeight: '50vh', maxHeight: '80vh' }} // Adjust the height as needed
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description">
        <DialogContent dividers>
          <FormField
            fieldType="input"
            margin
            fontSize="14px"
            noMargin
            width="100%"
            onChange={e => updateForm('taskName', e.target.value)}
            value={taskForm.taskName}>
            TASK NAME(REQUIRED)
          </FormField>
          <Grid3 margin="10px 0px 0px 0px" top="10px" width="100%" grid="2fr 2fr">
            <FormField
              zIndex
              mobile
              required
              fieldType="select"
              isSearchable={true}
              name="select"
              options={tagOptions}
              placeholder="Select tag"
              borderRadius="12px"
              fontSize="14px"
              noMargin
              width="95%"
              dropdownList={tagOptions}
              onChange={value => updateForm('tag', value?.value)}
              value={{ label: tagOptions?.find(tag => tag.value === taskForm.tag)?.label }}
              clickType="tag"
              onUpdate={updateCreateStoryForm}>
              Tag
            </FormField>
            <FormField
              mobile
              required
              fieldType="select"
              isSearchable={true}
              name="select"
              options={taskPriorityOptions}
              placeholder="Select priority"
              borderRadius="12px"
              fontSize="14px"
              noMargin
              width="95%"
              dropdownList={taskPriorityOptions}
              onChange={value => updateForm('priority', value?.value)}
              value={{
                label: taskForm.priority
              }}
              clickType="priority"
              onUpdate={updateCreateStoryForm}>
              PRIORITY
            </FormField>
          </Grid3>
          <Grid3 margin="10px 0px 0px 0px" width="100%" grid="2fr 2fr">
            <FormField
              zIndex
              mobile
              required
              fieldType="select"
              isSearchable={true}
              name="select"
              options={assigneeOptions}
              placeholder="Select Assignee"
              borderRadius="12px"
              fontSize="14px"
              noMargin
              width="95%"
              dropdownList={assigneeOptions}
              onChange={value => updateForm('assignee', value?.value)}
              value={{ label: assigneeOptions?.find(assignee => assignee.value === taskForm.assignee)?.label }}
              clickType="assignee"
              onUpdate={updateCreateStoryForm}>
              ASSIGN TO
            </FormField>
            <FormField
              zIndexUnset
              fieldType="input"
              margin
              fontSize="14px"
              noMargin
              width="100%"
              onChange={e => updateForm('storyPoints', e?.target?.value)}
              value={taskForm?.storyPoints}
              clickType="storyPoints"
              onUpdate={updateCreateStoryForm}>
              STORY POINTS
            </FormField>
          </Grid3>
          <div style={{ margin: '10px 0px 0px 0px' }}>
            <FormField
              zIndexUnset
              fieldType="input"
              margin
              fontSize="14px"
              textarea
              onChange={e => updateForm('description', e?.target?.value)}
              value={taskForm?.description}>
              DESCRIPTION
            </FormField>
          </div>
          <div
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'flex-end',
              marginTop: '15px',
              marginLeft: '35px'
            }}>
            <Button oval extraWide type="outlineInverse" onClick={handleClose}>
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
              Save
            </Button>
          </div>
        </DialogContent>
      </MUIDialog>
      {/* {!loading ? 'ADD TASK' : <CircularProgress size={18} />} */}
    </Container>
  )
}

const mapStateToProps = state => {
  return {
    user: state.Auth.user,
    departmentData: state.Departments.selectedDepartment,
    taskForm: state.Tasks.createStoryForm
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateCreateStoryForm: bindActionCreators(updateCreateStoryForm, dispatch),
    getDepartmentById: bindActionCreators(getDepartmentById, dispatch),
    createTask: bindActionCreators(createTask, dispatch),
    updateTask: bindActionCreators(updateTask, dispatch),
    addCommentToStory: bindActionCreators(addCommentToStory, dispatch),
    resetStoryForm: bindActionCreators(resetStoryForm, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TasksPanel)
