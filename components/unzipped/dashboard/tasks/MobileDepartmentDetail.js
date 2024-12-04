import React, { useEffect, useState } from 'react'
import { connect, useDispatch } from 'react-redux'
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
import AccordionActions from '@mui/material/AccordionActions';
import Swal from 'sweetalert2'


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
  reorderStories,
  deleteDepartment
} from '../../../../redux/actions'
import TagModal from '../TagModal'
import UpdateTagModal from '../UpdateTagModal'
import DepartmentModel from '../DepartmentModel'


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
  background: #1976d2;
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
  padding:15px;
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
  padding: 0px 12px 10px 12px;
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
  const dispatch = useDispatch()
  

  const { id } = router.query
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [isAccordianExpanded, setIsAccordianExpanded] = useState(false)
  const [isTagModalOpen, setIsTagModalOpen] = useState(false)
  const [expandedAccordian, setExpandedAccordian] = useState({})
  const [isUpdateTagModalOpen, setIsUpdateTagModalOpen] = useState(false)
  const [isDeptModalOpen, setIsDeptModalOpen] = useState(false)
  const [isDepartmentEditMode, setIsDepartmentEditMode] = useState(false)
  
  const tagsAction = [
    { name : "ADD TAGS", action: () => handleAccordianOptChange('ADD TAGS')},
    { name : "EDIT/DELETE TAGS", action : () => handleAccordianOptChange('EDIT/DEL TAGS')}
  ]
  
  const departmentAction = [
    { name : "Add Department", action: () => handleAccordianOptChange('Add Department')},
    { name : "Edit Department", action : () => handleAccordianOptChange('Edit Department')},
    { name : "Delete Department", action : () => handleDepartmentDel()}
  ]
  useEffect(() => {
    if (id) getDepartmentById(id)
  }, [id])

  const handleTaskForm = () => {
    resetStoryForm()
    updateCreateStoryForm({
      businessId: departmentData?.businessId,
      departmentId: departmentData?._id
    })
    setOpen(true)
    setIsAccordianExpanded(false)
  }

  const handleClose = async () => {
    setOpen(false)
    resetStoryForm()
    await getDepartmentById(id)
  }

  const handleAccordionToggle = panel => {
    setExpandedAccordian({
      ...expandedAccordian,
      [panel]: !expandedAccordian[panel]
    })
  }

  const openTagModal = () => {
    setIsTagModalOpen(true)
    setIsAccordianExpanded(false)
  }

  const closeTagModal = () => {
    setIsTagModalOpen(false)
    if (departmentData?._id) getDepartmentById(departmentData._id)
  }

  const openUpdateTagModal = () => {
    setIsUpdateTagModalOpen(true)
    setIsAccordianExpanded(false)
  }

  const closeUpdateTagModal = () => {
    setIsUpdateTagModalOpen(false)
    if (departmentData?._id) getDepartmentById(departmentData._id)
  }


  const toggleDropdown = () => {
    setIsAccordianExpanded(!isAccordianExpanded)
  }

  const openDepartmentModal = () => {
    setIsDeptModalOpen(true)
    setIsAccordianExpanded(false)
  }

  const closeDepartmentModal = () => {
    setIsDeptModalOpen(false)
    if (departmentData?._id) getDepartmentById(departmentData._id)
  }

  const handleAccordianOptChange = value => {
    if (value == 'ADD TAGS') {
      openTagModal()
    }
    if (value == 'ADD TASKS') {
      handleTaskForm()
    }
    if(value == "EDIT/DEL TAGS"){
      openUpdateTagModal()
    }
    if(value == "Add Department"){
      openDepartmentModal()
    }
    if (value == 'Edit Department'){
      setIsDepartmentEditMode(true)
      openDepartmentModal()  
    }
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

  const handleDepartmentDel =  () => {
     Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Delete'
    }).then(result => {
      if (result.isConfirmed) {
        dispatch(deleteDepartment(departmentData?._id))
      }
      router.push(`/dashboard/tasklist`);
    })
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
      <div style={{
        margin: '10px',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-end'
      }}>
        {userRole === 0 && (
          <Accordion style={{ width: '100%' }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              onClick={toggleDropdown}
              style={{ fontWeight: "600", fontSize: "16px" }}
            >
              Select
            </AccordionSummary>
            <AccordionActions
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                marginBottom: "5px",
                padding: "4px",
                marginLeft :"0px"
              }}
            >
             <Accordion  style={{ width: '100%'}}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                onClick={toggleDropdown}
                style={{ fontWeight: "600", fontSize: "16px" }}
              >
                Tags Actions
              </AccordionSummary>
              <AccordionActions  
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                marginBottom: "5px",
                marginLeft: "5px"
              }}>
                {tagsAction.map((tag,key) => {
                  return (
                  <Button
                  key={key}
                  onClick={tag.action}
                  style={{
                    color: "#000",
                    backgroundColor: "#fff",
                    marginBottom: "6px",
                    fontWeight: "500",
                    fontSize: "14px",
                    width:"fit-content",
                    marginLeft:"0px"
                  }}
                >
                  {tag.name}
                </Button>
                  )
                })}
              </AccordionActions>
              </Accordion>

             <Accordion  style={{ width: '100%' ,marginLeft: "0px"}} >
             <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                onClick={toggleDropdown}
                style={{ fontWeight: "600", fontSize: "16px" }}
              >
                Task Actions
              </AccordionSummary>
              <AccordionActions  
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                marginBottom: "5px",
                padding: "4px",
                marginLeft:"5px"
              }}>
              <Button
                onClick={() => handleAccordianOptChange('ADD TASKS')}
                style={{
                  color: "#000",
                  background: "#fff",
                  fontWeight: "500",
                  fontSize: "14px",
                  marginLeft: "0px",
                }}
              >
                ADD TASKS
              </Button>
              </AccordionActions>
             </Accordion >

              <Accordion style={{ width: '100%', marginLeft: "0px" }} >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                onClick={toggleDropdown}
                style={{ fontWeight: "600", fontSize: "16px" }}
              >
                Department Actions
              </AccordionSummary>
              <AccordionActions   
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                marginBottom: "5px",
                marginLeft: "5px",
              }}>
              {departmentAction.map((dept,key) => {
                return (
                <Button
                key={key}
                onClick={dept.action}
                style={{
                  color: "#000",
                  background: "#fff",
                  fontWeight: "500",
                  fontSize: "14px",
                  marginLeft: "0px",
                  width:"fit-content"
                }}
              >
                {dept.name}
              </Button>
                )} )}
              </AccordionActions>
              </Accordion>

            </AccordionActions>
          </Accordion>
        )}
      </div>

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
                        <Accordion key={tag?._id} id={`tag_${tag?._id}`} expanded={expandedAccordian[`${tag?.id}`]}>
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
                                            id={`task_${task?._id}`}
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
                                                  <DarkText topMargin="5px">{task?.taskName}</DarkText>
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

      {isTagModalOpen && (
        <TagModal
          open={isTagModalOpen}
          onHide={() => {
            closeTagModal()
          }}
        />
      )}

    {isUpdateTagModalOpen && (
        <UpdateTagModal
          open={isUpdateTagModalOpen}
          onHide={() => {
            closeUpdateTagModal()
          }}
        />
      )}

      {
        isDeptModalOpen && (
        <DepartmentModel 
          open={isDeptModalOpen}
          currentBusinessId={departmentData?.businessId}
          selectedDepartment={departmentData}
          isDepartmentEditMode={isDepartmentEditMode}
          onHide={() => {
            closeDepartmentModal()
          }}
          />
        )
      }
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
