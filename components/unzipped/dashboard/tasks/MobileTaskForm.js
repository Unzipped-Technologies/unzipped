import React, { useEffect, useState, useMemo } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { AiOutlineClose } from 'react-icons/ai'
import styled, { css } from 'styled-components'

import Icon from '../../../ui/Icon'
import Image from '../../../ui/Image'
import Badge from '../../../ui/Badge'
import Chat from '../../../icons/chat'
import Plus from '../../../icons/plus'
import { FormField } from '../../../ui'
import ManIcon from '../../../icons/man'
import EditIcon from '../../../icons/edit'
import { ValidationUtils, ConverterUtils } from '../../../../utils'
import { TitleText, DarkText, WhiteCard, Span, Grid2, TEXT, DIV } from '../style'
import { TASK_PRIORITY, TASK_STATUS } from '../../../../utils/constants'
import {
  updateCreateStoryForm,
  createTask,
  updateTask,
  updateComment,
  addCommentToStory
} from '../../../../redux/actions'

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
  margin-left: 10px !important;
  margin-right: 10px !important;
  padding: 10px 0px 20px 0px;
`

const Task = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
`

const MobileTaskForm = ({
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
  const [editMode, setEditMode] = useState({
    taskName: false,
    storyPoints: false,
    priority: false,
    description: false,
    status: false,
    assignee: false,
    tag: false
  })
  const [commentId, setCommentId] = useState('')
  const [tag, setTag] = useState('')
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
          <div className="d-flex justify-content-start" style={{ overflow: 'scroll' }}>
            <div>
              <Image
                src={contract?.freelancer?.user?.profileImage}
                alt="Assignee Image"
                width={'25px'}
                height={'25px'}
                radius={'50%'}
                margin={'5px 5px  0px 0px'}
              />
            </div>
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
          </div>
        )
      })) || []
    assignee.push({
      value: departmentData?.client?._id,
      label: (
        <div className="d-flex justify-content-start">
          <div>
            <Image
              src={departmentData?.client?.profileImage}
              alt="Assignee Image"
              width={'25px'}
              height={'25px'}
              radius={'50%'}
              margin={'5px 5px  0px 0px'}
            />
          </div>
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
        </div>
      )
    })
    assignee.unshift({
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
    if (!taskForm?.assignee) {
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
    if (isCreating) {
      setEditMode(Object.fromEntries(Object.keys(editMode).map(key => [key, true])))
    } else {
      setEditMode(Object.fromEntries(Object.keys(editMode).map(key => [key, false])))
    }
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
    } else if (departmentData) {
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

  const enableEditMode = fieldName => {
    if (userRole !== 1 && !isCreating) {
      setEditMode(prevState => ({
        ...Object.fromEntries(Object.keys(prevState).map(key => [key, key === fieldName]))
      }))
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
    } else if (!taskForm?.priority) {
      setValidationErrors('Priority is required.')
      return false
    } else if (!taskForm?.status) {
      setValidationErrors('Status is required.')
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
        <TEXT fontSize="18px" textColor="#0057FF" lineHeight="normal">
          ISSUE {taskForm?.ticketCode?.toLowerCase()}
        </TEXT>
      )}
      <form>
        <Task>
          <FormField
            zIndexUnset
            fieldType="input"
            fontSize="14px"
            borderColor="red"
            placeholder={'Task Name'}
            disableBorder={!editMode.taskName}
            disabled={userRole === 1}
            noMargin
            width="100%"
            height="36px !important"
            onChange={e => updateForm('taskName', e?.target?.value)}
            value={taskForm?.taskName}
            clickType="taskName"
            onUpdate={() => {}}
            onClick={() => {
              enableEditMode('taskName')
            }}
            onBlur={() => {
              validateForm()
              enableEditMode('')
            }}></FormField>

          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              paddingTop: '20px'
            }}>
            <div className="d-flex">
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  paddingTop: '10px'
                }}>
                <ManIcon width="16px" height="16px" viewBox="0 0 20 18" fill="#979797" />
              </span>
              <FormField
                margin="0px 0px 0px 10px"
                mobile
                zIndex="1000"
                disableBorder={!editMode.assignee}
                disabled={userRole === 1}
                fieldType="searchField"
                isSearchable={true}
                name="select"
                options={assigneeOptions}
                fontSize="14px"
                width="160px"
                height={taskForm?.assignee ? '15px' : '36px'}
                onChange={value => {
                  updateForm('assignee', value?.value)
                }}
                value={assigneeOptions.find(assignee => assignee.value === taskForm?.assignee)}
                clickType="assignee"
                onUpdate={() => {}}
                onMenuOpen={() => {
                  enableEditMode('assignee')
                }}
                onBlur={() => {
                  validateForm()
                  enableEditMode('')
                }}
              />
            </div>
            {comments?.length ? (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  marginLeft: '10px',
                  marginTop: '10px'
                }}>
                <Chat width="18" height="18" />
                <TEXT fontSize="18px" textColor="#0057FF" lineHeight="normal" padding="0px 0px 0px 5px">
                  {comments?.length > 10 ? '10+' : comments?.length} {comments?.length > 10 ? 'Comments' : 'Comment'}
                </TEXT>
              </div>
            ) : (
              ''
            )}
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: '50px'
            }}>
            <div
              style={{
                display: 'flex'
              }}>
              <TEXT
                padding="5px 0px 0px 0px"
                textColor="#000000"
                fontSize="18px"
                lineHeight="21.09px"
                fontWeight="500"
                width="65px">
                Priority:
              </TEXT>
              <FormField
                zIndex="999"
                zIndexUnset={true}
                disableBorder={!editMode.priority}
                margin={!editMode.priority ? '2px 0px 0px 0px' : '0px 0px 0px 10px !important'}
                mobile
                required
                fieldType="searchField"
                isSearchable={true}
                name="select"
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
                onMenuOpen={() => {
                  enableEditMode('priority')
                }}
                onBlur={() => {
                  validateForm()
                  enableEditMode('')
                }}
              />
            </div>
            <div
              style={{
                display: 'flex'
              }}>
              <TEXT
                textColor="#000000"
                fontSize="18px"
                lineHeight="21.09px"
                fontWeight="500"
                width="80px"
                padding="5px 0px 0px 15px">
                Status:
              </TEXT>

              <FormField
                zIndex="999"
                zIndexUnset={true}
                disableBorder={!editMode.status}
                margin={!editMode.status ? '2px 0px 0px 0px' : '0px !important'}
                mobile
                required
                fieldType="searchField"
                isSearchable={true}
                name="select"
                disabled={userRole === 1}
                fontSize="14px"
                width="85px"
                overflow="scroll"
                height={taskForm?.status ? '10px' : '30px'}
                options={taskStatusOptions}
                dropdownList={taskStatusOptions}
                onChange={value => updateForm('status', value?.value)}
                value={{ label: taskStatusOptions?.find(status => status.value === taskForm?.status)?.label }}
                clickType="status"
                onUpdate={() => {}}
                onMenuOpen={() => {
                  enableEditMode('status')
                }}
                onBlur={() => {
                  enableEditMode('')
                }}
              />
            </div>
          </div>
          <div
            style={{
              marginTop: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start'
            }}>
            <TEXT textColor="#000000" fontSize="18px" lineHeight="21.09px" fontWeight="500" width="120px !important">
              Story Points:
            </TEXT>
            {editMode ? (
              <FormField
                zIndexUnset
                fieldType="input"
                disableBorder={!editMode.storyPoints}
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
                onUpdate={() => {}}
                onClick={() => {
                  enableEditMode('storyPoints')
                }}
                onBlur={() => {
                  enableEditMode('')
                }}></FormField>
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
              marginTop: '20px'
            }}>
            <TEXT textColor="#000000" fontSize="18px" lineHeight="21.09px" fontWeight="500" width="40px !important">
              Tags:
            </TEXT>
            {!editMode?.tag && (
              <span
                style={{
                  width: '17px',
                  height: '17px',
                  background: '#D9D9D9',
                  display: 'flex',
                  alignItems: 'center',
                  marginRight: '10px',
                  marginTop: '-2px',
                  marginLeft: '10px'
                }}
                id="add_tags_icon"
                onClick={() => {
                  enableEditMode('tag')
                  setTimeout(() => {
                    document.getElementById('tags').focus()
                  }, 1)
                }}>
                <Plus width="17" height="17" />
              </span>
            )}

            {editMode?.tag && (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <FormField
                  zIndexUnset
                  fieldType="input"
                  margin="0px 0px 0px 10px !important"
                  fontSize="14px"
                  name={'tags'}
                  id={'tags'}
                  disabled={userRole === 1}
                  width="200px"
                  height="30px  !important"
                  value={tag}
                  clickType="tags"
                  onChange={e => {
                    setTag(e?.target?.value)
                  }}
                  handleEnterKey={() => {}}
                />
                {editMode?.tag && taskForm?.tags?.length < 5 && (
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
                      setTimeout(() => {
                        document.getElementById('tags').focus()
                      }, 1)
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
              flexDirection: 'column',
              marginTop: '20px'
            }}>
            <TEXT textColor="#000000" fontSize="18px" lineHeight="21.09px" fontWeight="500" width="100px !important">
              Description:
            </TEXT>
            {editMode.description ? (
              <FormField
                zIndexUnset
                fieldType="input"
                textarea
                margin={'10px 0px 0px 0px'}
                fontSize="14px"
                borderColor="red"
                disableBorder={!editMode.description}
                disabled={userRole === 1}
                width="100%"
                onChange={e => updateForm('description', e?.target?.value)}
                value={taskForm?.description}
                clickType="description"
                onUpdate={() => {}}
                onClick={() => {
                  enableEditMode('description')
                }}
                onBlur={() => {
                  enableEditMode('')
                }}
              />
            ) : (
              <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column' }}>
                <div
                  style={{ paddingLeft: '10px' }}
                  onClick={() => {
                    enableEditMode('description')
                  }}>
                  {taskForm?.description}
                </div>
              </div>
            )}
          </div>

          {!isCreating && (
            <div style={{ marginTop: '20px', marginBottom: '10px' }}>
              <TEXT
                textColor="#000000"
                fontSize="18px"
                lineHeight="21.09px"
                fontWeight="500"
                margin="10px 0px 10px 0px"
                width="70px">
                Discussion:
              </TEXT>
              <FormField
                fieldType="input"
                fontSize="14px"
                height="auto"
                textarea
                width="100%"
                display="inline !important"
                onChange={e => setComment({ ...newComment, comment: e.target.value })}
                value={newComment.comment}></FormField>
            </div>
          )}

          {!isCreating &&
            comments &&
            comments.length > 0 &&
            comments.map((comment, index) => {
              const userData = getCommentUserData(comment)
              return (
                <WhiteCard
                  borderColor="1px solid #CED4DA"
                  borderRadius="4px"
                  unset
                  key={comment?._id}
                  half
                  padding="10px">
                  <Grid2 block margin="0px">
                    <div className="d-flex">
                      <Span margin="0px 0px 10px 0px">
                        {userData?.profilePic && (
                          <Image src={userData?.profilePic} width="24px" height="24px" radius="50%" />
                        )}
                        <Span space>
                          <DarkText fontSize="18px" color="#000000" lineHeight="21.09px" noMargin>
                            {userData?.name || ''}
                            <span
                              style={{
                                paddingLeft: '20px',
                                fontSize: '14px',
                                color: '#9B9B9B',
                                lineHeight: '16.41px'
                              }}>
                              <span>{ValidationUtils.formatDateWithDate(comment?.updatedAt)}</span>
                            </span>
                          </DarkText>
                        </Span>
                      </Span>
                      {comment?.userId === userId && (
                        <DIV
                          display="flex"
                          justifyContent="flex-end"
                          onClick={() => {
                            setCommentId(comment?._id)
                          }}>
                          <EditIcon width="12px" height="12px" color="#585858" />
                        </DIV>
                      )}
                    </div>
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
                    <DarkText
                      noMargin
                      paddingLeft
                      smallPadding="30px"
                      fontSize="14px"
                      lineHeight="16.41px"
                      color="#000000">
                      {comment?.comment}
                      {taskDetail?.comments?.find(com => com?._id === comment?._id)?.comment !== comment?.comment && (
                        <span
                          style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            paddingLeft: '20px',
                            fontSize: '14px',
                            color: '#9B9B9B',
                            lineHeight: '16.41px'
                          }}>
                          <span>Edited</span>
                        </span>
                      )}
                    </DarkText>
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

          {error && (
            <TEXT margin="20px 0px 0px 0px" textColor="red" fontSize="12px">
              {error}
            </TEXT>
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
