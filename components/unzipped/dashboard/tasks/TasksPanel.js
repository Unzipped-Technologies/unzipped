import React, { useEffect, useState, useRef, useMemo } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import TicketPreview from '../TicketPreview'
import { TODO_STATUS } from '../../../../utils/constants'

import { AiOutlinePlusCircle } from 'react-icons/ai'
import { FaRegCheckCircle } from 'react-icons/fa'
import { AiOutlinePlus } from 'react-icons/ai'
import { Dialog } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import MuiDialogContent from '@material-ui/core/DialogContent'
import { TitleText, DarkText, Absolute, WhiteCard, Grid3 } from '../style'
import Icon from '../../../ui/Icon'
import Button from '../../../ui/Button'
import FormField from '../../../ui/FormField'
import { DragDropContext } from 'react-beautiful-dnd'
import { getDepartmentById, updateCreateStoryForm, resetStoryForm } from '../../../../redux/actions'

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
  departmentData,
  resetStoryForm
}) => {
  const dragItem = useRef()
  const dragOverItem = useRef()
  const [storyModal, setStoryModal] = React.useState(false)
  const [storyList, setStoryList] = useState([])
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

  const openStoryModal = () => {
    setStoryModal(true)
  }

  const closeStoryModal = () => {
    setStoryModal(false)
    resetStoryForm()
    setTaskId('')
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
                        <DarkText noMargin center bold width="200px">
                          STORY POINTS
                        </DarkText>
                        <DarkText noMargin center bold width="100px">
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
                            )
                          })
                        : ''}

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
          selectedTaskId={taskId}
          isEditing={isEditing}
          onHide={() => {
            closeStoryModal()
          }}
        />
      )}
      {/* {!loading ? 'ADD TASK' : <CircularProgress size={18} />} */}
    </Container>
  )
}

const mapStateToProps = state => {
  return {
    departmentData: state.Departments.selectedDepartment,
    taskForm: state.Tasks.createStoryForm
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getDepartmentById: bindActionCreators(getDepartmentById, dispatch),
    updateCreateStoryForm: bindActionCreators(updateCreateStoryForm, dispatch),
    resetStoryForm: bindActionCreators(resetStoryForm, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TasksPanel)
