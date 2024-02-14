import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { FaRegCheckCircle } from 'react-icons/fa'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import TagModal from '../TagModal'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { TODO_STATUS } from '../../../../utils/constants'
import TicketPreview from '../TicketPreview'
import { AiOutlinePlus } from 'react-icons/ai'
import { TitleText, DarkText, WhiteCard } from '../style'
import Icon from '../../../ui/Icon'
import Button from '../../../ui/Button'
import { getDepartmentById, updateCreateStoryForm, resetStoryForm, reorderStories } from '../../../../redux/actions'

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

const TasksPanel = ({
  updateCreateStoryForm,
  selectedDepartment,
  getDepartmentById,
  reorderStories,
  access,
  userRole,
  departmentData,
  resetStoryForm
}) => {
  const [tagModal, setTagModal] = React.useState(false)
  const [storyModal, setStoryModal] = React.useState(false)
  const [taskId, setTaskId] = useState('')
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    if (selectedDepartment?._id) getDepartmentById(selectedDepartment._id)
  }, [selectedDepartment])

  const getStatusColor = task => {
    if (task?.status.includes('inprogress')) {
      return '#FFA500'
    } else if (task?.status.includes('done')) {
      return '#198754'
    } else {
      return '#D8D8D8'
    }
  }

  const handleOnDragEnd = async result => {
    if (!result.destination) return
    const { source, destination } = result
    const allStories = []
    if (source.droppableId !== destination.droppableId && destination.droppableId !== 'droppable') {
      const sourceColumn = departmentData?.departmentTags.find(e => source.droppableId === e._id)
      const destColumn = departmentData?.departmentTags.find(e => destination.droppableId === e._id)
      const sourceItems = sourceColumn.tasks
      const destItems = destColumn?.tasks || []
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
      if (selectedDepartment?._id) await getDepartmentById(selectedDepartment._id)
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
    getDepartmentById(selectedDepartment._id)
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
          {userRole === 0 && (
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
        {userRole === 0 && (
          <SubmitButtonContainer margin="0px 20px 0px 80px">
            <SubmitButton
              onClick={() => {
                openTagModal()
              }}>
              <AiOutlinePlus style={{ fontSize: '16px', fontWeight: 'bold' }} /> Add
            </SubmitButton>
          </SubmitButtonContainer>
        )}
      </div>

      <StoryTable>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          {/* <Droppable droppableId="droppable" type="COLUMN" direction="vertical" key="droppable">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{
                  background: snapshot.isDraggingOver ? 'lightblue' : 'white',
                  padding: '1px 0px 0px 0px',
                  borderRadius: '4px'
                }}> */}
          <div>
            {departmentData?.departmentTags?.length
              ? departmentData?.departmentTags.map(tag => {
                  return (
                    <div key={tag._id}>
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
                            <WhiteCard padding="10px 40px" noMargin borderRadius="0px" row background="#F7F7F7">
                              <DarkText noMargin bold width="300px">
                                {tag.tagName} ({tag?.tasks?.length})
                              </DarkText>
                              <DarkText noMargin center bold width="200px">
                                STORY POINTS
                              </DarkText>
                              <DarkText noMargin center bold width="100px">
                                ASSIGNEE
                              </DarkText>
                            </WhiteCard>

                            {tag?.tasks?.length
                              ? tag?.tasks.map((task, index) => {
                                  return (
                                    <div key={task._id}>
                                      <Draggable key={task._id} draggableId={task._id} index={index}>
                                        {(provided, snapshot) => (
                                          <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}>
                                            <WhiteCard
                                              padding="10px 10px"
                                              noMargin
                                              borderRadius="0px"
                                              row
                                              background="#F7F7F7">
                                              <DarkText
                                                noMargin
                                                bold
                                                width="300px"
                                                onClick={async () => {
                                                  setTaskId(task._id)
                                                  openStoryModal()
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
                                              <DarkText noMargin center bold width="200px" marginLeft="30px">
                                                {task.storyPoints}
                                              </DarkText>
                                              <DarkText noMargin center bold width="100px" paddingLeft="50px">
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
                                          </div>
                                        )}
                                      </Draggable>
                                    </div>
                                  )
                                })
                              : ''}
                            {userRole === 0 && (
                              <WhiteCard
                                onClick={() => {
                                  updateCreateStoryForm({
                                    businessId: selectedDepartment.businessId,
                                    departmentId: selectedDepartment._id,
                                    tag: tag._id,
                                    status: TODO_STATUS
                                  })
                                  setIsEditing(false)
                                  setStoryModal(true)
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
                            )}

                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </div>
                  )
                })
              : ''}
          </div>
          {/* {provided.placeholder}
              </div> */}
          {/* )}
          </Droppable> */}
        </DragDropContext>
      </StoryTable>

      {storyModal && (
        <TicketPreview
          open={storyModal}
          selectedTaskId={taskId}
          isEditing={isEditing}
          onHide={() => {
            closeStoryModal()
          }}
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
    </Container>
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
    getDepartmentById: bindActionCreators(getDepartmentById, dispatch),
    updateCreateStoryForm: bindActionCreators(updateCreateStoryForm, dispatch),
    resetStoryForm: bindActionCreators(resetStoryForm, dispatch),
    reorderStories: bindActionCreators(reorderStories, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TasksPanel)
