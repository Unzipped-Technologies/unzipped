import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useRouter } from 'next/router'
import { bindActionCreators } from 'redux'
import { Dialog } from '@material-ui/core'
import { AiOutlinePlus } from 'react-icons/ai'
import styled, { css } from 'styled-components'
import Accordion from '@material-ui/core/Accordion'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import MuiDialogContent from '@material-ui/core/DialogContent'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import Nav from '../../header'
import { DarkText } from '../style'
import MobileTaskForm from './MobileTaskForm'
import { ConverterUtils, ValidationUtils } from '../../../../utils'
import {
  getDepartmentById,
  updateCreateStoryForm,
  createTask,
  updateTask,
  addCommentToStory,
  resetStoryForm,
  reorderStories
} from '../../../../redux/actions'

const Button = styled.button`
  width: 91px;
  height: 34px;
  color: #fff;
  text-align: center;
  font-family: Roboto;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 24.5px; /* 163.333% */
  letter-spacing: 0.4px;
  text-transform: uppercase;
  flex-shrink: 0;
  border-radius: 5px;
  background: #1976d2 !important;
  outline: none !important;
  border: none !important;
  ${({ active }) =>
    active &&
    css`
      outline: none !important;
      border: none !important;
    `};
`

const TaskDetailContainer = styled.div`
  width: 100%;
  border: 2px solid #bbbbbb;
`

// Define a styled AccordionDetails component
const CustomAccordionDetails = styled(AccordionDetails)`
  /* Add your custom styles here */
  display: flex !important;
  flex-direction: column !important;
  width: 100% !important;
  padding: 0px !important;
`

const Task = styled.div`
  border-bottom: 2px solid #bbbbbb;
  padding: 0px 20px 10px 20px;
  margin-bottom: 20px;
`

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  heading: {
    color: '#222',
    fontFamily: 'Roboto',
    fontSize: '16px',
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: '19.5px',
    letterSpacing: '0.15px',
    textAlign: 'center'
  }
}))

const MUIDialog = withStyles(theme => ({
  paper: {
    width: '100%',
    height: '100% !important',
    maxHeight: '100% !important',
    margin: '0px !important'
  },
  root: {}
}))(Dialog)

const DialogContent = withStyles(theme => ({
  root: {
    margin: '0px !important',
    padding: '0px !important'
  }
}))(MuiDialogContent)

const MobileTaskDetail = ({
  departmentData,
  getDepartmentById,
  resetStoryForm,
  updateCreateStoryForm,
  reorderStories,
  userRole
}) => {
  const router = useRouter()

  const { id } = router.query
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [expandedAccordian, setExpanded] = useState({})

  useEffect(() => {
    if (id) getDepartmentById(id)
  }, [id])

  const handleOpen = () => {
    resetStoryForm()
    updateCreateStoryForm({
      businessId: departmentData?.businessId,
      departmentId: departmentData?._id
    })
    setOpen(true)
  }

  const handleClose = async () => {
    setOpen(false)
    resetStoryForm()
    await getDepartmentById(id)
  }

  const handleAccordionToggle = panel => {
    setExpanded({
      ...expandedAccordian,
      [panel]: !expandedAccordian[panel]
    })
  }

  const handleOnDragEnd = async result => {
    if (!result.destination) return
    const { source, destination } = result
    handleAccordionToggle(destination?.droppableId)
    const allStories = []
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = departmentData?.departmentTags.find(e => source.droppableId === e._id)
      const destColumn = departmentData?.departmentTags.find(e => destination.droppableId === e._id)
      const sourceItems = sourceColumn.tasks
      const destItems = destColumn.tasks
      const [removed] = sourceItems.splice(source.index, 1)
      removed.tag = destColumn._id
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
      departmentData?.departmentTags.forEach(e => {
        if (e._id === sourceColumn._id) {
          allStories.push(...newSource)
        } else if (e._id === destColumn._id) {
          allStories.push(...newDestination)
        } else {
          allStories.push(...e.tasks)
        }
      })

      await reorderStories(allStories)
      if (id) await getDepartmentById(id)
    }
  }

  return (
    <>
      <Nav
        isSubMenu
        marginBottom={'85px'}
        isLogoHidden
        listName={departmentData?.name}
        setIsViewable={() => {}}
        setListName={() => {}}
        setIsLogoHidden={() => {}}
        onBackArrowClick={() => {
          router.back()
        }}
      />
      {userRole === 0 && (
        <div
          style={{
            margin: '10px',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'flex-end'
          }}>
          <Button
            mobile
            disabled={false}
            onClick={async () => {
              handleOpen()
            }}
            type="black"
            colors={{
              text: '#FFF',
              background: '#1976D2',
              border: '1px',
              wideBorder: '#1976D2',
              paddingBottom: '30px'
            }}>
            <AiOutlinePlus style={{ fontSize: '20px', fontWeight: 'bold' }} /> Add
          </Button>
        </div>
      )}

      <TaskDetailContainer>
        <DragDropContext onDragEnd={handleOnDragEnd} onDragStart={handleAccordionToggle}>
          <Droppable droppableId="droppable" type="COLUMN" direction="vertical" key="droppable">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{
                  background: snapshot.isDraggingOver ? 'lightblue' : 'white',
                  padding: '1px 0px 0px 0px',
                  borderRadius: '4px'
                }}>
                {departmentData?.departmentTags?.length
                  ? departmentData?.departmentTags.map(tag => {
                      return (
                        <Accordion key={tag?._id} expanded={expandedAccordian[`${tag?.id}`]}>
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header">
                            <Typography className={classes.heading}>
                              {ValidationUtils.truncate(tag?.tagName, 20)} ({tag?.tasks?.length})
                            </Typography>
                          </AccordionSummary>
                          <CustomAccordionDetails>
                            <Droppable droppableId={tag._id} type="COLUMN" direction="vertical" key="droppable">
                              {(provided, snapshot) => (
                                <div
                                  {...provided.droppableProps}
                                  ref={provided.innerRef}
                                  style={{
                                    background: snapshot.isDraggingOver ? 'lightblue' : 'white',
                                    padding: '1px 0px 0px 0px',
                                    borderRadius: '4px'
                                  }}>
                                  {tag?.tasks?.length
                                    ? tag?.tasks.map((task, index) => {
                                        return (
                                          <Task
                                            key={task?._id}
                                            onClick={() => {
                                              router.push(`/dashboard/ticket/${task._id}`)
                                            }}>
                                            <Draggable key={task._id} draggableId={task._id} index={index}>
                                              {(provided, snapshot) => (
                                                <div
                                                  ref={provided.innerRef}
                                                  {...provided.draggableProps}
                                                  {...provided.dragHandleProps}>
                                                  <DarkText>{task?.ticketCode}</DarkText>
                                                  <DarkText topMargin="5px">{task?.description}</DarkText>
                                                  <DarkText margin bold topMargin="10px">
                                                    <img
                                                      src={
                                                        task?.assignee?.user?.profileImage ||
                                                        'https://res.cloudinary.com/dghsmwkfq/image/upload/v1670086178/dinosaur_xzmzq3.png'
                                                      }
                                                      style={{
                                                        width: '24px',
                                                        height: '24px',
                                                        borderRadius: '50%',
                                                        marginRight: '6px'
                                                      }}
                                                    />
                                                    {ConverterUtils.capitalize(
                                                      `${
                                                        task?.assignee?.user?.FullName
                                                          ? task?.assignee?.user?.FullName
                                                          : task?.assignee?.user?.FirstName ||
                                                            task?.assignee?.user?.LastName
                                                          ? `${task?.assignee?.user?.FirstName} ${task?.assignee?.user?.LastName}`
                                                          : 'Unassigned'
                                                      }`
                                                    )}
                                                  </DarkText>
                                                  <DarkText bold topMargin="10px">
                                                    Story Points : {task?.storyPoints}
                                                  </DarkText>
                                                  <DarkText bold topMargin="10px">
                                                    Priority :
                                                    <span style={{ paddingLeft: '40px' }}>{task?.priority}</span>
                                                  </DarkText>
                                                </div>
                                              )}
                                            </Draggable>
                                          </Task>
                                        )
                                      })
                                    : ''}
                                  {provided.placeholder}
                                </div>
                              )}
                            </Droppable>
                          </CustomAccordionDetails>
                        </Accordion>
                      )
                    })
                  : ''}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </TaskDetailContainer>
      <MUIDialog
        onClose={handleClose}
        disableEscapeKeyDown
        open={open}
        maxWidth="md"
        aria-labelledby="story-preview-modal"
        aria-describedby="story-preview-modal-description">
        <DialogContent dividers>
          <MobileTaskForm
            isEditing={open}
            taskDetail={null}
            onCancel={handleClose}
            isCreating
            departmentData={departmentData}
          />
        </DialogContent>
      </MUIDialog>
    </>
  )
}

const mapStateToProps = state => {
  return {
    userRole: state.Auth.user?.role,

    departmentData: state.Departments.selectedDepartment,
    taskForm: state.Tasks.createStoryForm,
    currentDepartment: state.Tasks.currentDepartment
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateCreateStoryForm: bindActionCreators(updateCreateStoryForm, dispatch),
    getDepartmentById: bindActionCreators(getDepartmentById, dispatch),
    createTask: bindActionCreators(createTask, dispatch),
    updateTask: bindActionCreators(updateTask, dispatch),
    addCommentToStory: bindActionCreators(addCommentToStory, dispatch),
    resetStoryForm: bindActionCreators(resetStoryForm, dispatch),
    reorderStories: bindActionCreators(reorderStories, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MobileTaskDetail)
