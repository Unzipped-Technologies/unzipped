import React, { useEffect, useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { FaRegCheckCircle } from 'react-icons/fa'
import { AiOutlinePlus } from 'react-icons/ai'
import { AiOutlinePlusCircle } from 'react-icons/ai'

import TagModal from '../TagModal'
import Icon from '../../../ui/Icon'
import Button from '../../../ui/Button'
import TicketPreview from '../TicketPreview'
import { WhiteCard, DIV, TEXT } from '../style'
import DepartmentModel from '../DepartmentModel'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { TODO_STATUS, DONE, IN_PROGRESS } from '../../../../utils/constants'
import {
  getProjectsList,
  getDepartmentById,
  updateCreateStoryForm,
  resetStoryForm,
  reorderStories,
  updateStatusOnDrag,
  deleteDepartment
} from '../../../../redux/actions'
import ProjectUsers from '../Kanban/ProjectusersDropdown'

const TasksPanel = ({
  getProjectsList,
  updateCreateStoryForm,
  selectedDepartment,
  getDepartmentById,
  reorderStories,
  access,
  userRole,
  departmentData,
  resetStoryForm,
  currentBusiness,
  isEditable,
  taskForm
}) => {
  const [departmentModel, setDepartmentModel] = React.useState(false)
  const [isDepartmentEditMode, setIsDepartmentEditMode] = React.useState(false)
  const [tagModal, setTagModal] = React.useState(false)
  const [storyModal, setStoryModal] = React.useState(false)
  const [taskId, setTaskId] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [editDeptInfo, setEditDeptInfo] = useState({});
  const dispatch = useDispatch()

  useEffect(() => {
    if (selectedDepartment?._id) getDepartmentById(selectedDepartment._id)
  }, [selectedDepartment, currentBusiness])

  const getStatusColor = task => {
    if (task?.status.includes('inprogress')) {
      return '#FFA500'
    } else if (task?.status.includes('done')) {
      return '#198754'
    } else {
      return '#D8D8D8'
    }
  }

  useEffect(() => {
    if (selectedDepartment) {
      setEditDeptInfo(selectedDepartment)
    }
  }, [selectedDepartment])

  const handleOnDragEnd = async result => {
    if (!result.destination) return
    const { source, destination } = result
    const allStories = []

    if (source.droppableId !== destination.droppableId && destination.droppableId !== 'droppable') {
      const sourceColumn = departmentData?.departmentTags.find(e => source.droppableId === e._id)
      const destColumn = departmentData?.departmentTags.find(e => destination.droppableId === e._id)
      const sourceItems = sourceColumn.tasks
      const destItems = destColumn?.tasks || []
      const sourcedObj = sourceItems[source.index];
      sourcedObj.status = destColumn?.tagName;
      let ticketStatus = sourcedObj.status;
      if (!ticketStatus.includes('In Progress') || !ticketStatus.includes('In progress')) {
        ticketStatus = ticketStatus.replace(/ (.)/g, (match, expr) => expr.toLowerCase());
      }

      dispatch(updateStatusOnDrag(sourcedObj._id, { status: ticketStatus }))
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

      await reorderStories(allStories, access)
      if (departmentData?._id) await getDepartmentById(selectedDepartment._id)
    }
  }

  const openStoryModal = () => {
    setStoryModal(true)
  }

  const closeStoryModal = () => {
    setStoryModal(false)
    resetStoryForm()
    setTaskId('')
  }

  const openTagModal = () => {
    setTagModal(true)
  }

  const closeTagModal = () => {
    setTagModal(false)
    if (selectedDepartment?._id) getDepartmentById(selectedDepartment._id)
  }

  const openDepartmentModal = () => {
    setDepartmentModel(true)
  }

  const closeDepartmentModal = async () => {
    setIsDepartmentEditMode(false)
    setDepartmentModel(false)
    await getProjectsList({
      take: 'all',
      skip: 0,
      populate: false
    })
  }

  const handleDepartmentDel = async () => {
    dispatch(deleteDepartment(departmentData?._id))
    await getProjectsList({
      take: 'all',
      skip: 0,
      populate: false
    })
    setEditDeptInfo({})
  }

  const addNewTask = async (tagId, tagName) => {
    updateCreateStoryForm({
      businessId: selectedDepartment.businessId,
      departmentId: selectedDepartment?._id,
      tag: tagId,
      priority: '',
      status: tagName?.toLowerCase().includes('to')
        ? TODO_STATUS
        : tagName?.toLowerCase().includes('in')
          ? IN_PROGRESS
          : tagName?.toLowerCase().includes('done')
            ? DONE
            : TODO_STATUS
    })
    setIsEditing(false)
    setStoryModal(true)
  }

  return (
    <DIV
      position="relative"
      display="flex"
      flexDirection="column"
      flexFlow="column"
      background="#FDFDFD"
      padding="0px 20px 20px 0px"
      borderRadius="10px"
      margin="0px 0px 0px 34px">
      <DIV
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        width="100%"
        padding="10px"
        borderRadius="8px 8px 0px 0px"
        background="rgba(255, 255, 255, 0.64)"
        boxShadow="0px 4px 8px 0px rgba(0, 0, 0, 0.10)">
        <DIV display="fle" alignItems="center">
          <TEXT width="max-content" fontSize="24px" padding="0px 20px 0px 0px">
            {editDeptInfo?.name ?? 'Create Department'}
          </TEXT>
          {userRole === 0 && (
            <Button
              zIndex="auto"
              className="bg-transparent text-dark"
              popoutWidth="200px"
              dropDownRight="-130px"
              noBorder
              block
              fontSize="13px"
              popout={[
                {
                  text: 'Create',
                  onClick: () => {
                    openDepartmentModal()
                  }
                },
                {
                  text: 'Edit',
                  onClick: () => {
                    openDepartmentModal()
                    setIsDepartmentEditMode(true)
                  }
                },
                {
                  text: 'Delete',
                  onClick: async () => await handleDepartmentDel()
                }
              ]}>
              <Icon name="actionIcon" color="#333" />
            </Button>
          )}
        </DIV>
        {selectedDepartment?._id && userRole === 0 && (
          <DIV width="72px" margin="0px 20px 0px 80px" display="flex" justifyContent="flex-end">
            <Button
              small
              block
              buttonHeight="27px"
              colors={{
                background: '#1976d2',
                text: '#fff'
              }}
              noBorder
              onClick={() => {
                openTagModal()
              }}>
              <AiOutlinePlus style={{ fontSize: '16px', fontWeight: 'bold' }} /> Add
            </Button>
          </DIV>
        )}
      </DIV>

      <DIV
        border="1px solid rgba(217, 217, 217, 0.25)"
        borderRadius="0px 0px 15px 15px"
        background="rgba(217, 217, 217, 0.25)"
        paddingBottom="10px"
        zIndex="auto">
        <DragDropContext onDragEnd={handleOnDragEnd} >
          <DIV>
            {selectedDepartment?._id && departmentData?.departmentTags?.length ? (
              departmentData?.departmentTags.map(tag => {
                return (
                  <DIV key={tag._id}>
                    <Droppable droppableId={tag._id} type="COLUMN" direction="vertical" key="droppable" >
                      {(provided, snapshot) => (
                        <DIV
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          droppableRef={provided.innerRef}
                          background={snapshot.isDraggingOver ? 'lightblue' : 'white'}
                          padding="1px 0px 0px 0px"
                          borderRadius="4px">
                          <DIV
                            width="100%"
                            padding="10px 40px"
                            borderRadius="0px"
                            display="flex"
                            flexFlow="row"
                            border="1px solid rgba(217, 217, 217, 0.25)"
                            background="#F7F7F7">
                            <TEXT fontWeight="bold" width="300px">
                              {tag.tagName} ({tag?.tasks?.length})
                            </TEXT>
                            <TEXT textAlign="center" fontWeight="bold" width="200px">
                              STORY POINTS
                            </TEXT>
                            <TEXT textAlign="right" fontWeight="bold" width="100px">
                              ASSIGNEE
                            </TEXT>
                          </DIV>

                          {tag?.tasks?.length
                            ? tag?.tasks.map((task, index) => {
                              return (
                                <DIV key={task._id}>
                                  <Draggable key={task._id} draggableId={task._id} index={index}>
                                    {(provided, snapshot) => (
                                      <DIV
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}>
                                        <WhiteCard
                                          padding="0px 10px"
                                          noMargin
                                          borderRadius="0px"
                                          row
                                          background="#F7F7F7">
                                          <TEXT
                                            fontWeight="bold"
                                            width="300px"
                                            onClick={async () => {
                                              setTaskId(task._id)
                                              openStoryModal()
                                            }}>
                                            <DIV display="flex" flexDirection="row" alignItems="center">
                                              <DIV padding="0px 10px 0px 0px">
                                                <FaRegCheckCircle color={getStatusColor(task)} />
                                              </DIV>
                                              {task.taskName}
                                            </DIV>
                                          </TEXT>
                                          <TEXT
                                            textAlign="center"
                                            fontWeight="bold"
                                            width="200px"
                                            margin="0px 0px 0px 30px">
                                            {task.storyPoints}
                                          </TEXT>
                                          <DIV width="auto" display="flex" justifyContent="center">
                                            <>

                                              {task?.assignee?.user ? (
                                                <ProjectUsers
                                                  isEmailRequired={false}
                                                  selectedDepartment={selectedDepartment}
                                                  assignee={task?.assignee?.user}
                                                  task={task}
                                                  isListingPanel={true}
                                                />

                                              ) : (
                                                <TEXT fontWeight="bold" width="100px" padding="0px 0px 0px 20px">
                                                  Unassigned
                                                </TEXT>
                                              )}
                                            </>
                                          </DIV>


                                        </WhiteCard>
                                      </DIV>
                                    )}
                                  </Draggable>
                                </DIV>
                              )
                            })
                            : ''}
                          {userRole === 0 && (
                            <WhiteCard
                              onClick={() => {
                                addNewTask(tag._id, tag?.tagName)
                              }}
                              noMargin
                              borderRadius="0px"
                              padding="0px 10px"
                              row
                              background="#FFF">
                              <DIV display="flex" alignItems="center" cursor="pointer">
                                <AiOutlinePlusCircle
                                  style={{
                                    fontSize: '18px',
                                    marginRight: '20px',
                                    color: '#2F76FF'
                                  }}
                                />
                                <TEXT fontWeight="bold" textColor="#2F76FF">
                                  ADD TASK
                                </TEXT>
                              </DIV>
                            </WhiteCard>
                          )}

                          {provided.placeholder}
                        </DIV>
                      )}
                    </Droppable>
                  </DIV>
                )
              })
            ) : (
              <TEXT position="fixed" fontSize="16px" margin="200px 20px 0px 15% !important" textAlign="center">
                Create the Department and tags to add tasks.
              </TEXT>
            )}
          </DIV>
        </DragDropContext>
      </DIV>

      {storyModal && (
        <TicketPreview
          open={storyModal}
          selectedTaskId={taskId}
          isEditing={isEditing}
          isEditable={isEditable}
          onHide={() => {
            closeStoryModal()
          }}
          taskForm={taskForm}
        />
      )}

      {tagModal && (
        <TagModal
          open={tagModal}
          isEditing={isEditing}
          onHide={() => {
            closeTagModal()
          }}
        />
      )}
      {departmentModel && (
        <DepartmentModel
          open={departmentModel}
          currentBusinessId={currentBusiness?._id}
          isEditing={isEditing}
          selectedDepartment={editDeptInfo}
          isDepartmentEditMode={isDepartmentEditMode}
          onHide={() => {
            closeDepartmentModal()
          }}
        />
      )}
    </DIV>
  )
}

const mapStateToProps = state => {
  return {
    userRole: state.Auth.user.role,
    departmentData: state.Departments.selectedDepartment,
    taskForm: state.Tasks.createStoryForm
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProjectsList: bindActionCreators(getProjectsList, dispatch),
    getDepartmentById: bindActionCreators(getDepartmentById, dispatch),
    updateCreateStoryForm: bindActionCreators(updateCreateStoryForm, dispatch),
    resetStoryForm: bindActionCreators(resetStoryForm, dispatch),
    reorderStories: bindActionCreators(reorderStories, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TasksPanel)
