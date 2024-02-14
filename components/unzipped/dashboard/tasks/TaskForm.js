import React, { useEffect, useState, useMemo } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { TASK_PRIORITY, TODO_STATUS, TASK_STATUS } from '../../../../utils/constants'
import Icon from '../../../ui/Icon'

import { TitleText, DarkText, WhiteCard, Span, Grid2 } from '../style'

import Button from '../../../ui/Button'
import Image from '../../../ui/Image'
import { FormField } from '../../../ui'
import { ValidationUtils } from '../../../../utils'
import Badge from '../../../ui/Badge'
import ManIcon from '../../../icons/man'
import EditIcon from '../../../icons/edit'
import Chat from '../../../icons/chat'
import Plus from '../../../icons/plus'
import {
  getTaskById,
  updateCreateStoryForm,
  getDepartmentById,
  createTask,
  updateTask,
  addCommentToStory,
  resetStoryForm,
  updateComment
} from '../../../../redux/actions'

const TaskForm = ({
  onHide,
  isEditing,
  taskForm,
  selectedTaskId = null,
  addCommentToStory,
  updateCreateStoryForm,
  getDepartmentById,
  taskDetail,
  getTaskById,
  createTask,
  updateTask,
  updateComment,
  userId,
  departmentData,
  userRole
}) => {
  const [editMode, setEditMode] = useState(false)
  const [comments, setComments] = useState([])
  const [newComment, setComment] = useState({
    comment: '',
    img: '',
    taskId: taskDetail?._id
  })
  const [commentId, setCommentId] = useState('')

  useEffect(() => {
    setComments(taskDetail?.comments)
  }, [taskDetail])

  useEffect(() => {
    if (selectedTaskId) {
      setEditMode(false)
      getTaskById(selectedTaskId)
    } else {
      setEditMode(true)
    }
  }, [selectedTaskId])

  useEffect(() => {
    if (taskDetail && Object.entries(taskDetail)?.length) {
      updateCreateStoryForm({
        taskName: taskDetail?.taskName || '',
        storyPoints: taskDetail?.storyPoints,
        priority: taskDetail?.priority,
        order: 1,
        description: taskDetail?.description,
        status: taskDetail?.status,
        businessId: taskDetail?.businessId || departmentData?.businessId,
        departmentId: taskDetail?.departmentId || departmentData?._id,
        assignee: taskDetail?.assignee,
        tag: taskDetail?.tag,
        ticketCode: taskDetail?.ticketCode
      })
    }
  }, [taskDetail])

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
  }, [taskDetail])

  const taskPriorityOptions = useMemo(() => {
    return (
      TASK_PRIORITY?.map(priority => ({
        value: priority,
        label: priority
      })) || []
    )
  }, [])

  const taskStatusOptions = useMemo(() => {
    return (
      TASK_STATUS?.map(status => ({
        value: status,
        label: status
      })) || []
    )
  }, [])

  const enableEditMode = () => {
    if (userRole !== 1) setEditMode(true)
  }
  const disableEditMode = () => {
    if (document.activeElement?.tagName?.toLowerCase() === 'div' && selectedTaskId) {
      setEditMode(false)
    }
  }

  const updateForm = (field, value) => {
    updateCreateStoryForm({
      [`${field}`]: value
    })
  }

  const onSubmit = async () => {
    if (newComment?.comment) {
      const comments = [
        {
          comment: newComment.comment,
          userId: userId
        }
      ]

      await updateCreateStoryForm({
        comments: comments
      })
    }
    if (selectedTaskId) {
      await updateTask(selectedTaskId, taskForm)
    } else {
      await createTask(taskForm)
    }
    await onHide()
    await getDepartmentById(departmentData?._id)
  }

  const getCommentUserData = comment => {
    let userData = {
      profilePic: '',
      name: ''
    }
    if (taskDetail?.department?.client?._id === comment?.userId) {
      userData.profilePic = taskDetail?.department?.client?.profileImage
      userData.name =
        taskDetail?.department?.client?.FullName ||
        `${taskDetail?.department?.client?.FirstName} ${taskDetail?.department?.client?.LastName}`
    } else {
      for (var contract of departmentData?.contracts) {
        if (contract?.freelancer?.user?._id === comment?.userId) {
          userData.profilePic = contract?.freelancer?.user?.profileImage
          userData.name =
            contract?.freelancer?.user?.FullName ||
            `${contract?.freelancer?.user?.FirstName} ${contract?.freelancer?.user?.LastName}`
        }
        break
      }
    }
    return userData
  }

  return (
    <>
      <DarkText fontSize="18px" color="#0057FF" lineHeight="normal">
        ISSUE {taskDetail?.ticketCode?.toLowerCase()}
      </DarkText>
      <form onClick={e => disableEditMode(e)}>
        <div
          style={{
            width: '97%',
            display: 'flex',
            overflow: 'hidden',
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
            marginLeft: '35px',
            marginTop: '-25px'
          }}>
          <Button
            extraWid
            type="outlineInverse"
            buttonHeight="25px"
            fontSize="15px"
            contentMargin="0px !important"
            colors={{
              text: '#1976D2',
              background: 'white',
              border: '1px',
              wideBorder: '#1976D2'
            }}
            onClick={() => {
              onHide()
            }}>
            CANCEL
          </Button>

          <Button
            disabled={false}
            onClick={async () => {
              await onSubmit()
            }}
            width="58.25px"
            extraWide
            margin="0px 37px 0px 20px"
            contentMargin="0px !important"
            type="black"
            buttonHeight="25px"
            fontSize="15px"
            colors={{
              text: '#FFF',
              background: '#1976D2',
              border: '1px',
              wideBorder: '#1976D2'
            }}>
            Save
          </Button>
        </div>
        <div style={{ display: 'flex', marginTop: '5px', alignItems: 'center' }}>
          {taskDetail?.ticketCode && (
            <TitleText color="#000" titleFontSize="18px" lineHeight="normal" light width="120px" marginTop="20px">
              {taskDetail?.ticketCode?.toLowerCase()}
            </TitleText>
          )}

          <FormField
            zIndexUnset
            placeholder="Task Name"
            fieldType="input"
            margin
            name="taskName"
            fontSize="14px"
            borderColor="red"
            disableBorder={!editMode}
            disabled={userRole === 1}
            noMargin
            width="500px"
            height="36px !important"
            onChange={e => updateForm('taskName', e?.target?.value)}
            value={taskForm?.taskName}
            clickType="taskName"
            onClick={enableEditMode}
            onUpdate={() => {}}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
          <div style={{ display: 'flex', width: '27%' }}>
            <span
              style={{
                paddingRight: '10px',
                paddingTop: editMode ? '10px' : '20px',
                display: 'flex',
                marginLeft: '15%',
                justifyContent: 'flex-end'
              }}>
              <ManIcon width="16px" height="16px" viewBox="0 0 20 18" fill="#979797" />
            </span>
            {editMode ? (
              <FormField
                mobile
                zIndex="10000"
                disableBorder={!editMode}
                fieldType="searchField"
                isSearchable={true}
                name="assignee"
                disabled={userRole === 1}
                options={assigneeOptions}
                placeholder="assignee"
                fontSize="14px"
                margin="0px 0px 0px 10px"
                width="160px"
                height={taskDetail?.assignee ? '15px' : '15px'}
                dropdownList={assigneeOptions}
                onChange={value => {
                  updateForm('assignee', value?.value)
                }}
                value={{
                  label: assigneeOptions?.find(assignee => assignee.value === taskForm?.assignee)?.label
                }}
                clickType="assignee"
                onUpdate={() => {}}
              />
            ) : (
              <DarkText fontSize="18px" color="#000" lineHeight="normal" topMargin="20px">
                {assigneeOptions?.find(assignee => assignee.value === taskDetail?.assignee)?.label || 'assignee'}
              </DarkText>
            )}
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '20%',
              marginLeft: '50px'
            }}>
            {taskDetail?.comments?.length ? (
              <>
                <Chat width="18" height="18" />
                <DarkText fontSize="18px" color="#0057FF" lineHeight="normal" paddingLeft="5px" topPadding>
                  {taskDetail?.comments?.length} Comment
                </DarkText>
              </>
            ) : (
              ''
            )}
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '47%'
            }}>
            <TitleText
              color="#000"
              titleFontSize="16px"
              width="50px"
              lineHeight="normal"
              light
              marginTop="10px"
              paddingRight="5px">
              tags:
            </TitleText>
            <Badge small>{tagOptions?.find(tag => tag.value === taskForm?.tag)?.label}</Badge>
            <div
              style={{
                width: '17px',
                height: '17px',
                background: '#D9D9D9',
                display: 'flex',
                alignItems: 'center',
                marginRight: '10px',
                marginTop: '5px'
              }}>
              <Plus width="17" height="17" />
            </div>
            {editMode && (
              <FormField
                zIndex="1000"
                mobile
                required
                fieldType="searchField"
                isSearchable={true}
                name="tags"
                placeholder="Select tag"
                fontSize="14px"
                width="160px"
                height="10px"
                options={tagOptions}
                dropdownList={tagOptions}
                onChange={value => updateForm('tag', value?.value)}
                value={{
                  label: tagOptions?.find(tag => tag.value === taskForm?.tag)?.label
                }}
                clickType="tag"
                onUpdate={() => {}}
              />
            )}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
          <div style={{ width: '40%', display: 'flex', marginRight: '50px' }}>
            <TitleText
              color="#000"
              titleFontSize="16px"
              lineHeight="normal"
              light
              marginTop="10px"
              width="70px"
              paddingRight="30px">
              Priority:
            </TitleText>
            {editMode ? (
              <FormField
                zIndex="999"
                zIndexUnset={true}
                mobile
                required
                fieldType="searchField"
                isSearchable={true}
                name="priority"
                disabled={userRole === 1}
                placeholder="Select priority"
                fontSize="14px"
                width="160px"
                height={taskForm?.priority ? '10px' : '30px'}
                options={taskPriorityOptions}
                dropdownList={taskPriorityOptions}
                onChange={value => updateForm('priority', value?.value)}
                value={{ label: taskPriorityOptions?.find(priority => priority.value === taskForm?.priority)?.label }}
                clickType="priority"
                onUpdate={() => {}}
              />
            ) : (
              <DarkText fontSize="18px" color="#000" lineHeight="normal" topMargin="10px">
                {taskPriorityOptions?.find(priority => priority.value === taskDetail?.priority)?.label || 'priority'}
              </DarkText>
            )}
          </div>
          <div
            style={{
              width: '50%',
              display: 'flex',
              marginLeft: '80px'
            }}>
            <TitleText color="#000" titleFontSize="16px" lineHeight="normal" marginTop="7px" light width="120px">
              Story Points:
            </TitleText>
            {editMode ? (
              <FormField
                zIndexUnset
                fieldType="input"
                borderRadius="0px"
                border="1px solid #ccc"
                fontSize="14px"
                name="storyPoints"
                disabled={userRole === 1}
                width="160px"
                margin="0px 0px 0px 0px"
                height="30px  !important"
                onChange={e => updateForm('storyPoints', e?.target?.value)}
                value={taskForm?.storyPoints}
                onUpdate={() => {}}></FormField>
            ) : (
              <DarkText fontSize="18px" color="#000" lineHeight="normal" topMargin="7px">
                {taskDetail?.storyPoints || 0}
              </DarkText>
            )}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
          <div style={{ width: '40%', display: 'flex' }}>
            <TitleText
              color="#000"
              titleFontSize="16px"
              lineHeight="normal"
              light
              marginTop="10px"
              width="70px"
              paddingRight="30px">
              Status:
            </TitleText>
            {editMode || userRole === 1 ? (
              <FormField
                zIndex="1"
                mobile
                required
                fieldType="searchField"
                isSearchable={true}
                name="status"
                placeholder="Select priority"
                fontSize="14px"
                width="160px"
                height={taskForm?.status ? '10px' : '30px'}
                options={taskStatusOptions}
                onChange={value => updateForm('status', value?.value)}
                value={{ label: taskStatusOptions?.find(status => status.value === taskForm?.status)?.label }}
                clickType="status"
                onUpdate={() => {}}
              />
            ) : (
              <DarkText fontSize="18px" color="#000" lineHeight="normal" topMargin="10px">
                {taskStatusOptions?.find(status => status.value === taskDetail?.status)?.label}
              </DarkText>
            )}
          </div>
        </div>
        <div style={{ display: 'flex', marginTop: '20px' }}>
          {!editMode && (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <TitleText color="#000" titleFontSize="16px" lineHeight="normal" light marginTop="10px" width="70px">
                Description:
              </TitleText>
              <div style={{ paddingLeft: '10px' }}>{taskDetail?.description}</div>
            </div>
          )}
          {editMode && (
            <FormField
              disableBorder={!editMode}
              fieldType="input"
              margin
              fontSize="14px"
              width="100%"
              name="description"
              placeholder="Description"
              display="inline !important"
              textarea
              onChange={e => updateForm('description', e?.target?.value)}
              value={taskForm?.description}>
              Description
            </FormField>
          )}
        </div>
        <div
          style={{
            marginTop: '20px',
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
            width: '100%'
          }}>
          <FormField
            fieldType="input"
            fontSize="14px"
            placeholder="Leave a comment..."
            noMargin
            height="auto"
            name="comment"
            textarea
            width="100%"
            display="inline !important"
            onChange={e => setComment({ ...newComment, comment: e.target.value })}
            value={newComment.comment}>
            Discussion
          </FormField>
        </div>
      </form>
      {comments &&
        comments.length > 0 &&
        comments.map((comment, index) => {
          const userData = getCommentUserData(comment)
          return (
            <WhiteCard
              borderColor="transparent"
              unset
              key={comment?._id}
              noMargin
              padding={index === 0 ? '30px 0px 0px 0px' : '0px'}>
              <Grid2 block margin="0px">
                <Span margin="0px 0px 10px 0px">
                  {userData?.profilePic && <Image src={userData?.profilePic} width="24px" height="24px" radius="50%" />}
                  <Span space>
                    <DarkText noMargin>
                      {userData?.name || ''}
                      <span style={{ paddingLeft: '20px' }}>
                        {ValidationUtils.formatDateWithDate(comment?.updatedAt)} -{' '}
                        {ValidationUtils.getTimeFormated(comment?.updatedAt)}
                      </span>
                    </DarkText>
                  </Span>
                </Span>
                {comment?.userId === userId && (
                  <div
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'flex-end',
                      justifyContent: 'flex-end',
                      marginTop: '20px'
                    }}
                    onClick={() => {
                      setCommentId(comment?._id)
                    }}>
                    <EditIcon width="12px" height="12px" color="#585858" />
                  </div>
                )}
              </Grid2>
              {commentId === comment?._id ? (
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end'
                  }}>
                  <FormField
                    fieldType="input"
                    fontSize="14px"
                    placeholder="Leave a comment..."
                    noMargin
                    height="auto"
                    textarea
                    width="100%"
                    display="inline !important"
                    onChange={e => {
                      setComments(prevArray =>
                        prevArray.map(item =>
                          item._id === comment?._id ? { ...item, comment: e?.target.value } : item
                        )
                      )
                    }}
                    value={comment?.comment}></FormField>

                  <div
                    onClick={async e => {
                      e?.preventDefault()
                      await updateComment(taskDetail?._id, comment._id, comment)
                      setCommentId('')
                    }}>
                    <Icon name="send" color="#173B7F" width="24" height="24" />
                  </div>
                </div>
              ) : (
                <DarkText marginLeft="30px">{comment?.comment}</DarkText>
              )}
              {comment?.img && <Image src={comment?.img} />}
            </WhiteCard>
          )
        })}
    </>
  )
}
const mapStateToProps = state => {
  return {
    userId: state.Auth.user?._id,
    userRole: state.Auth.user?.role,
    departmentData: state.Departments.selectedDepartment,
    taskDetail: state.Tasks.selectedTask,
    taskForm: state.Tasks.createStoryForm
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getTaskById: bindActionCreators(getTaskById, dispatch),
    updateCreateStoryForm: bindActionCreators(updateCreateStoryForm, dispatch),
    createTask: bindActionCreators(createTask, dispatch),
    updateTask: bindActionCreators(updateTask, dispatch),
    addCommentToStory: bindActionCreators(addCommentToStory, dispatch),
    resetStoryForm: bindActionCreators(resetStoryForm, dispatch),
    getDepartmentById: bindActionCreators(getDepartmentById, dispatch),
    updateComment: bindActionCreators(updateComment, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm)
