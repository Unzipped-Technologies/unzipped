import React, { useEffect, useState, useMemo } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import styled, { css } from 'styled-components'
import { FormField } from '../../../ui'
import ManIcon from '../../../icons/man'
import Icon from '../../../ui/Icon'
import { TASK_PRIORITY, TODO_STATUS, TASK_STATUS } from '../../../../utils/constants'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { TitleText, DarkText, WhiteCard, Span, Grid2 } from '../style'
import Dropdowns from '../../../ui/Dropdown'
import {
  getDepartmentById,
  updateCreateStoryForm,
  createTask,
  updateTask,
  updateComment,
  addCommentToStory
} from '../../../../redux/actions'
import Image from '../../../ui/Image'
import { ValidationUtils, ConverterUtils } from '../../../../utils'
import Badge from '../../../ui/Badge'
import EditIcon from '../../../icons/edit'
import Chat from '../../../icons/chat'
import Plus from '../../../icons/plus'

const Button = styled.button`
  text-align: center;
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  line-height: 24.5px; /* 163.333% */
  letter-spacing: 0.4px;
  text-transform: uppercase;
  flex-shrink: 0;
  border-radius: 5px;
  font-size: ${({ fontSize }) => (fontSize ? fontSize : '15px')};
  width: ${({ width }) => (width ? width : '100px')};
  height: ${({ height }) => (height ? height : '34px')};
  color: ${({ color }) => (color ? color : '#fff !important')};
  background: ${({ backgroundColor }) => (backgroundColor ? backgroundColor : '#1976d2 !important')};
  outline: ${({ outline }) => (outline ? outline : 'none !important')};
  border: ${({ border }) => (border ? border : 'none !important')};
  ${({ active }) =>
    active &&
    css`
      outline: none !important;
      border: none !important;
    `};
`

const TaskFormContainer = styled.div`
  margin-left: 20px !important;
  margin-right: 10px !important;
  padding: 20px 0px 20px 0px;
`

const Task = styled.div`
  margin-bottom: 20px;
`

const MobileTaskForm = ({
  isEditing = false,
  isCreating = false,
  departmentData,
  taskDetail,
  updateComment,
  taskForm,
  updateCreateStoryForm,
  onCancel,
  createTask,
  updateTask,
  userId,
  userRole
}) => {
  const [editMode, setEditMode] = useState(isEditing)
  const [commentId, setCommentId] = useState('')
  const [tag, setTag] = useState('')
  const [tagShow, setTagShow] = useState(false)
  const [error, setError] = useState('')

  const [comments, setComments] = useState([])
  const [newComment, setComment] = useState({
    comment: '',
    img: '',
    taskId: taskDetail?._id
  })

  const assigneeOptions = useMemo(() => {
    let assignee = []
    assignee =
      departmentData?.contracts?.map(contract => ({
        value: contract?.freelancer?.userId,
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
              {contract?.freelancer?.user?.FullName ?? 'Name'}
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
    assignee.push({
      value: departmentData?.client?._id,
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
            {departmentData?.client?.FullName || 'Client'}
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
            {departmentData?.client?.email}
          </div>
        </div>
      )
    })
    if (!taskForm?.assignee) {
      assignee.push({
        value: 'unassigned',
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
              Unassigned
            </div>
          </div>
        )
      })
      updateCreateStoryForm({
        [`assignee`]: 'unassigned'
      })
    }
    return assignee
  }, [departmentData])

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

  useEffect(() => {
    if (taskDetail) {
      updateCreateStoryForm({
        taskName: taskDetail?.taskName,
        storyPoints: taskDetail?.storyPoints,
        priority: taskDetail?.priority,
        order: 1,
        description: taskDetail?.description,
        status: taskDetail?.status,
        businessId: taskDetail?.businessId || departmentData?.businessId,
        departmentId: taskDetail?.departmentId || departmentData?.departmentId,
        assignee: taskDetail?.assignee,
        tags: taskDetail?.tags,
        tag: taskDetail?.tag,
        ticketCode: taskDetail?.ticketCode
      })
    }
  }, [taskDetail])

  useEffect(() => {
    if (taskDetail) {
      setComments(taskDetail?.comments)
    }
  }, [taskDetail])

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

  const updateForm = (field, value) => {
    updateCreateStoryForm({
      [`${field}`]: value
    })
  }

  const enableEditMode = () => {
    setEditMode(true)
  }

  const disableEditMode = () => {
    if (document.activeElement?.tagName?.toLowerCase() === 'div' && !isCreating) {
      setEditMode(false)
    }
  }

  const handleSubmit = async () => {
    if (validateForm()) {
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

      if (isCreating) {
        const response = await createTask(taskForm)
        if (response?.status === 200) {
          resetState()
          onCancel && onCancel()
        } else {
          setValidationErrors(response?.data?.message ?? 'Something went wrong')
        }
      } else {
        const response = await updateTask(taskDetail?._id, taskForm)

        if (response?.status === 200) {
          resetState()
          onCancel && onCancel()
        } else {
          setValidationErrors(response?.data?.message ?? 'Something went wrong')
        }
      }
    }
  }

  const resetState = () => {
    setComment({
      comment: '',
      img: '',
      taskId: taskDetail?._id
    })
  }

  const removeTag = async tagName => {
    let filteredTags = taskForm?.tags.filter(tag => tag !== tagName)
    updateForm('tags', filteredTags)
    taskDetail.tags = filteredTags
    if (taskDetail?._id && taskDetail.tags?.includes(tagName)) await updateTask(taskDetail?._id, taskDetail)
  }

  const validateForm = () => {
    if (!taskForm?.taskName) {
      setValidationErrors('Task Name is required.')
      return false
    }
    if (!taskForm?.assignee || taskForm?.assignee === 'unassigned') {
      setValidationErrors('Assignee is required.')
      return false
    }
    setValidationErrors('')
    return true
  }

  const setValidationErrors = error => {
    setError(error)
  }

  return (
    <TaskFormContainer>
      {taskForm?.ticketCode && (
        <DarkText fontSize="18px" color="#0057FF" lineHeight="normal" topMargin="40px">
          ISSUE {taskForm?.ticketCode?.toLowerCase()}
        </DarkText>
      )}
      <form onFocus={enableEditMode} onClick={e => disableEditMode(e)}>
        <Task>
          {editMode ? (
            <FormField
              zIndexUnset
              fieldType="input"
              margin
              fontSize="14px"
              borderColor="red"
              placeholder="Task Name"
              disableBorder={!editMode}
              disabled={userRole === 1}
              noMargin
              width="100%"
              height="36px !important"
              onChange={e => updateForm('taskName', e?.target?.value)}
              value={taskForm?.taskName}
              clickType="taskName"
              onBlur={validateForm}
              onUpdate={() => {}}>
              <TitleText color="#000" titleFontSize="16px" lineHeight="normal" light width="20px" paddingRight="10px">
                Task:
              </TitleText>
            </FormField>
          ) : (
            <DarkText paddingLeft="0px !important" padding="0px !important" onClick={enableEditMode}>
              {taskForm?.taskName}
            </DarkText>
          )}

          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              marginTop: editMode ? '50px' : '0px !important'
            }}>
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end'
              }}>
              <ManIcon width="16px" height="16px" viewBox="0 0 20 18" fill="#979797" />
            </span>
            {editMode ? (
              <FormField
                margin="0px 0px 0px 20px"
                mobile
                zIndex="1000"
                disabled={userRole === 1}
                fieldType="searchField"
                isSearchable={true}
                name="select"
                options={assigneeOptions}
                placeholder="assignee"
                fontSize="14px"
                width="160px"
                height={taskForm?.assignee ? '10px' : '30px'}
                onChange={value => {
                  updateForm('assignee', value?.value)
                }}
                value={assigneeOptions.find(assignee => assignee.value === taskForm?.assignee)}
                clickType="assignee"
                onUpdate={() => {}}
                onBlur={validateForm}
              />
            ) : (
              <DarkText fontSize="18px" color="#000" lineHeight="normal" width="150px" paddingLeft="20px">
                {assigneeOptions?.find(assignee => assignee.value === taskForm?.assignee)?.label}
              </DarkText>
            )}
            {comments?.length ? (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  marginLeft: '10px'
                }}>
                <Chat width="18" height="18" />
                <DarkText fontSize="18px" color="#0057FF" lineHeight="normal" paddingLeft="0px" topPadding>
                  {comments.length} Comment
                </DarkText>
              </div>
            ) : (
              ''
            )}
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginTop: editMode ? '10px' : '0px !important',
              flexDirection: 'row'
            }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center'
              }}>
              <TitleText color="#000" titleFontSize="16px" lineHeight="normal" light width="65px" marginTop="10px">
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
                  name="select"
                  placeholder=" priority"
                  disabled={userRole === 1}
                  fontSize="14px"
                  width="100px"
                  height={taskForm?.priority ? '10px' : '30px'}
                  options={taskPriorityOptions}
                  dropdownList={taskPriorityOptions}
                  onChange={value => updateForm('priority', value?.value)}
                  value={{ label: taskPriorityOptions?.find(priority => priority.value === taskForm?.priority)?.label }}
                  clickType="priority"
                  onUpdate={() => {}}
                />
              ) : (
                <DarkText fontSize="18px" color="#000" lineHeight="normal" width="60px" topMargin="15px">
                  {taskPriorityOptions?.find(priority => priority.value === taskForm?.priority)?.label}
                </DarkText>
              )}
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                marginLeft: editMode ? '0px !important' : '150px !important'
              }}>
              <TitleText
                color="#000"
                titleFontSize="16px"
                lineHeight="normal"
                light
                width="55px"
                paddingLeft={editMode ? '5px' : '10px'}
                marginTop="10px">
                Status:
              </TitleText>
              {editMode ? (
                <FormField
                  zIndex="100"
                  mobile
                  required
                  margin="0px 0px 0px 5px !important"
                  fieldType="searchField"
                  isSearchable={true}
                  name="status"
                  placeholder=" status"
                  fontSize="14px"
                  width="100px"
                  height={taskForm?.status ? '10px' : '30px'}
                  options={taskStatusOptions}
                  onChange={value => updateForm('status', value?.value)}
                  value={{ label: taskStatusOptions?.find(status => status.value === taskForm?.status)?.label }}
                  clickType="status"
                  onUpdate={() => {}}
                />
              ) : (
                <DarkText
                  fontSize="18px"
                  color="#000"
                  lineHeight="normal"
                  topMargin="10px"
                  width="100px"
                  paddingLeft="10px">
                  {taskStatusOptions?.find(status => status.value === taskForm?.status)?.label}
                </DarkText>
              )}
            </div>
          </div>
          <div
            style={{
              marginTop: editMode ? '10px' : '0px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start'
            }}>
            <TitleText
              color="#000"
              titleFontSize="16px"
              lineHeight="normal"
              light
              marginTop="10px"
              width="100px !important">
              Story Points:
            </TitleText>
            {editMode ? (
              <FormField
                zIndexUnset
                fieldType="input"
                disableBorder={!editMode}
                borderRadius="0px"
                border="1px solid #ccc"
                margin="0px 0px 0px 0px !important"
                fontSize="14px"
                disabled={userRole === 1}
                width="100px"
                height="30px  !important"
                onChange={e => updateForm('storyPoints', e?.target?.value)}
                value={taskForm?.storyPoints}
                clickType="storyPoints"
                onUpdate={() => {}}></FormField>
            ) : (
              <DarkText fontSize="18px" color="#000" lineHeight="normal" topMargin="10px" width="100px">
                {taskForm?.storyPoints}
              </DarkText>
            )}
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginTop: editMode ? '10px' : '0px'
            }}>
            <TitleText
              color="#000"
              titleFontSize="16px"
              lineHeight="normal"
              light
              marginTop="10px"
              width="40px !important">
              tags:
            </TitleText>
            {!tagShow && editMode && (
              <span
                style={{
                  width: '17px',
                  height: '17px',
                  background: '#D9D9D9',
                  display: 'flex',
                  alignItems: 'center',
                  marginRight: '10px',
                  marginTop: '-2px'
                }}
                id="add_tags_icon"
                onClick={() => {
                  setTagShow(true)
                }}>
                <Plus width="17" height="17" />
              </span>
            )}

            {editMode && tagShow && (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <FormField
                  zIndexUnset
                  fieldType="input"
                  disableBorder={!editMode}
                  borderRadius="0px"
                  border="1px solid #ccc"
                  placeholder="Tags"
                  margin="0px 0px 0px 0px !important"
                  fontSize="14px"
                  disabled={userRole === 1}
                  width="200px"
                  height="30px  !important"
                  value={tag}
                  clickType="tags"
                  onChange={e => {
                    setTag(e?.target?.value)
                  }}
                />
                {editMode && taskForm?.tags?.length < 5 && (
                  <span
                    style={{
                      width: '17px',
                      height: '17px',
                      background: '#D9D9D9',
                      display: 'flex',
                      alignItems: 'center',
                      marginLeft: '5px'
                    }}
                    id="add_tags_icon"
                    onClick={async e => {
                      e?.preventDefault()
                      updateForm('tags', [...taskForm?.tags, tag])
                      setTag('')
                    }}>
                    <Plus width="17" height="17" />
                  </span>
                )}
              </div>
            )}
          </div>
          <div
            style={{
              width: '100%',
              marginTop: '10px'
            }}>
            {taskForm?.tags?.length
              ? taskForm.tags.map(tag => {
                  return (
                    <Badge key={tag} small>
                      {ConverterUtils.capitalize(`${tag}`)}
                      <AiOutlineClose
                        style={{ width: '14px', height: '14px', marginLeft: '10px' }}
                        onClick={() => {
                          removeTag(tag)
                        }}
                      />
                    </Badge>
                  )
                })
              : ''}
          </div>
          <div
            style={{
              display: 'flex',
              marginTop: editMode ? '10px' : '0px'
            }}>
            {!editMode && (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <TitleText color="#000" titleFontSize="16px" lineHeight="normal" light marginTop="10px" width="70px">
                  Description:
                </TitleText>
                <div style={{ paddingLeft: '10px' }}>{taskForm?.description}</div>
              </div>
            )}
            {editMode && (
              <FormField
                zIndexUnset
                fieldType="input"
                textarea
                margin
                fontSize="14px"
                borderColor="red"
                disableBorder={!editMode}
                disabled={userRole === 1}
                noMargin
                width="100%"
                onChange={e => updateForm('description', e?.target?.value)}
                value={taskForm?.description}
                clickType="description"
                onUpdate={() => {}}>
                Description
              </FormField>
            )}
          </div>

          <div style={{ marginTop: '10px', marginBottom: '10px' }}>
            <TitleText color="#000" titleFontSize="16px" lineHeight="normal" light marginTop="10px" width="70px">
              Discussion:
            </TitleText>
            <FormField
              fieldType="input"
              fontSize="14px"
              placeholder="Leave a comment..."
              noMargin
              height="auto"
              textarea
              width="100%"
              display="inline !important"
              onChange={e => setComment({ ...newComment, comment: e.target.value })}
              value={newComment.comment}></FormField>
          </div>
          {error && (
            <TitleText color="red" titleFontSize="12px">
              {error}
            </TitleText>
          )}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'flex-end',
              marginTop: '10px'
            }}>
            <Button
              type="outlineInverse"
              color="#1976D2"
              outline="#1976d2"
              border="1px solid #1976d2"
              backgroundColor="white"
              style={{
                marginRight: '10px'
              }}
              onClick={e => {
                e?.preventDefault()
                if (onCancel) onCancel()
              }}>
              CANCEL
            </Button>
            <Button
              onClick={async e => {
                e?.preventDefault()
                await handleSubmit()
              }}
              width="58.25px"
              extraWide
              margin="0px 37px 0px 20px"
              type="black"
              buttonHeight="25px"
              fontSize="15px">
              Save
            </Button>
          </div>
          {comments &&
            comments.length > 0 &&
            comments.map((comment, index) => {
              const userData = getCommentUserData(comment)

              return (
                <WhiteCard borderColor="1px solid #F5F6F8" unset key={comment?._id} half padding="10px">
                  <Grid2 block margin="0px">
                    <Span margin="0px 0px 10px 0px">
                      {userData?.profilePic && (
                        <Image src={userData?.profilePic} width="24px" height="24px" radius="50%" />
                      )}
                      <Span space>
                        <DarkText noMargin>
                          {userData?.name || ''}
                          <span style={{ paddingLeft: '20px' }}>
                            <span>{ValidationUtils.formatDateWithDate(comment?.updatedAt)}</span>
                            {comment?.userId === userId && (
                              <span
                                style={{
                                  paddingLeft: '15px'
                                }}
                                onClick={() => {
                                  setCommentId(comment?._id)
                                }}>
                                <EditIcon width="12px" height="12px" color="#585858" />
                              </span>
                            )}
                          </span>
                        </DarkText>
                      </Span>
                    </Span>
                  </Grid2>
                  {commentId === comment?._id ? (
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
                  ) : (
                    <DarkText marginLeft="80px">{comment?.comment}</DarkText>
                  )}
                  {commentId === comment?._id && (
                    <div
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end'
                      }}>
                      <Button
                        disabled={false}
                        onClick={async e => {
                          e?.preventDefault()
                          await updateComment(taskDetail?._id, comment._id, comment)
                          setCommentId('')
                        }}
                        width="40px"
                        fontSize="12px"
                        margin="0px 37px 0px 20px">
                        <Icon name="send" color="white" width="18" height="18" />
                      </Button>
                    </div>
                  )}
                </WhiteCard>
              )
            })}
        </Task>
      </form>
    </TaskFormContainer>
  )
}

const mapStateToProps = state => {
  return {
    userId: state.Auth.user?._id,
    userRole: state.Auth.user?.role,
    taskForm: state.Tasks.createStoryForm
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createTask: bindActionCreators(createTask, dispatch),
    updateTask: bindActionCreators(updateTask, dispatch),
    updateCreateStoryForm: bindActionCreators(updateCreateStoryForm, dispatch),
    addCommentToStory: bindActionCreators(addCommentToStory, dispatch),
    updateComment: bindActionCreators(updateComment, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MobileTaskForm)
