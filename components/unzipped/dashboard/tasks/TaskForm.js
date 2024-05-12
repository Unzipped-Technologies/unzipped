import React, { useEffect, useState, useMemo } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { AiOutlineClose } from 'react-icons/ai'

import Icon from '../../../ui/Icon'
import Image from '../../../ui/Image'
import Badge from '../../../ui/Badge'
import Chat from '../../../icons/chat'
import Plus from '../../../icons/plus'
import Button from '../../../ui/Button'
import { FormField } from '../../../ui'
import ManIcon from '../../../icons/man'
import EditIcon from '../../../icons/edit'
import { ValidationUtils, ConverterUtils } from '../../../../utils'
import { TASK_PRIORITY, TASK_STATUS } from '../../../../utils/constants'
import { TitleText, DarkText, WhiteCard, Span, Grid2, DIV, TEXT } from '../style'

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
  taskForm,
  selectedTaskId = null,
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
  const [editMode, setEditMode] = useState({
    taskName: false,
    storyPoints: false,
    priority: false,
    description: false,
    status: false,
    assignee: false,
    tag: false
  })
  const [comments, setComments] = useState([])
  const [tag, setTag] = useState('')
  const [newComment, setComment] = useState({
    comment: '',
    img: '',
    taskId: taskDetail?._id
  })
  const [commentId, setCommentId] = useState('')
  const [hoverCommentId, setHoverCommentId] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    setComments(taskDetail?.comments)
  }, [taskDetail])

  useEffect(() => {
    if (selectedTaskId) {
      setEditMode(Object.fromEntries(Object.keys(editMode).map(key => [key, false])))
      getTaskById(selectedTaskId)
    } else {
      setEditMode(Object.fromEntries(Object.keys(editMode).map(key => [key, true])))
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
        tags: taskDetail?.tags,
        tag: taskDetail?.tag,
        ticketCode: taskDetail?.ticketCode
      })
    }
  }, [taskDetail])

  const assigneeOptions = useMemo(() => {
    let assignee = []
    assignee = departmentData?.contracts?.map(contract => ({
      value: contract?.freelancer?.userId,
      label: (
        <div className="d-flex justify-content-start">
          <div>
            <Image
              src={contract?.freelancer?.user?.profileImage}
              alt="Assignee Image"
              width={'25px'}
              height={'25px'}
              radius={'50%'}
              margin={'0px 5px  0px 0px'}
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
    }))
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
              margin={'0px 5px  0px 0px'}
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

  const enableEditMode = fieldName => {
    if (userRole !== 1 && selectedTaskId) {
      setEditMode(prevState => ({
        ...Object.fromEntries(Object.keys(prevState).map(key => [key, key === fieldName]))
      }))
    }
  }

  const updateForm = (field, value) => {
    updateCreateStoryForm({
      [`${field}`]: value
    })
  }
  const validateForm = () => {
    if (!taskForm?.taskName) {
      setValidationErrors('Task Name is required.')
      return false
    }
    setValidationErrors('')
    return true
  }
  const onSubmit = async () => {
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
      if (selectedTaskId) {
        const response = await updateTask(selectedTaskId, taskForm)
        if (response?.status === 200) {
          await onHide()
          await getDepartmentById(departmentData?._id)
        } else {
          setValidationErrors(response?.data?.message ?? 'Something went wrong')
        }
      } else {
        const response = await createTask(taskForm)
        if (response?.status === 200) {
          await onHide()
          await getDepartmentById(departmentData?._id)
        } else {
          setValidationErrors(response?.data?.message ?? 'Something went wrong')
        }
      }
    }
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

  const removeTag = async tagName => {
    let filteredTags = taskForm?.tags.filter(tag => tag !== tagName)
    updateForm('tags', filteredTags)
    taskDetail.tags = filteredTags
    if (selectedTaskId && taskDetail.tags?.includes(tagName)) await updateTask(selectedTaskId, taskDetail)
  }

  const setValidationErrors = error => {
    setError(error)
  }

  return (
    <>
      <DarkText fontSize="18px" color="#0057FF" lineHeight="normal">
        ISSUE {taskDetail?.ticketCode?.toLowerCase()}
      </DarkText>
      <form>
        <DIV
          width="97%"
          display="flex"
          overflow="hidden"
          alignItems="flex-end"
          justifyContent="flex-end"
          margin="-25px 0px 0px 35px"
          onClick={() => {
            enableEditMode('')
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
        </DIV>
        {error && (
          <TitleText color="red" titleFontSize="12px">
            {error}
          </TitleText>
        )}
        <DIV display="flex" margin="5px 0px 0px 0px" alignItems="center">
          {taskDetail?.ticketCode && (
            <TitleText color="#000" titleFontSize="18px" lineHeight="normal" light width="85px" marginTop="20px">
              {taskDetail?.ticketCode?.toLowerCase()}
            </TitleText>
          )}
          <div>
            <FormField
              zIndexUnset
              placeholder="Task Name"
              fieldType="input"
              name="taskName"
              fontSize="14px"
              disableBorder={!editMode.taskName}
              disabled={userRole === 1}
              noMargin
              width="500px"
              height="36px !important"
              onChange={e => updateForm('taskName', e?.target?.value)}
              value={taskForm?.taskName}
              clickType="taskName"
              onClick={() => {
                enableEditMode('taskName')
              }}
              onBlur={() => {
                validateForm()
                enableEditMode('')
              }}
              onUpdate={() => {}}
            />
          </div>
        </DIV>
        <DIV display="flex" alignItems="center" margin="10px 0px 0px 0px">
          <DIV display="flex" width="40%">
            <DIV
              paddingRight="10px"
              padding={editMode ? '10px 0px 0px 0px' : '20px  0px 0px 0px'}
              display="flex"
              margin="0px 0px 0px 10%"
              justifyContent="flex-end">
              <ManIcon width="16px" height="16px" viewBox="0 0 20 18" fill="#979797" />
            </DIV>
            {editMode ? (
              <span>
                <FormField
                  mobile
                  zIndex="10000"
                  disableBorder={!editMode.assignee}
                  fieldType="searchField"
                  isSearchable={true}
                  name="assignee"
                  disabled={userRole === 1}
                  options={assigneeOptions}
                  placeholder="assignee"
                  fontSize="14px"
                  margin="0px 0px 0px 30px"
                  width="160px"
                  height={taskForm?.assignee ? '15px' : '36px'}
                  dropdownList={assigneeOptions}
                  onChange={value => {
                    updateForm('assignee', value?.value)
                  }}
                  value={{
                    label: assigneeOptions?.find(assignee => assignee.value === taskForm?.assignee)?.label
                  }}
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
              </span>
            ) : (
              <DarkText fontSize="18px" color="#000" lineHeight="normal" topMargin="20px" marginRight="100px">
                {assigneeOptions?.find(assignee => assignee.value === taskDetail?.assignee)?.label || 'assignee'}
              </DarkText>
            )}
          </DIV>
          <DIV display="flex" justifyContent="center" alignItems="center" width="20%" margin="20px 0px 0px 0px">
            {taskDetail?.comments?.length ? (
              <>
                <Chat width="18" height="18" />
                <DarkText
                  fontSize="18px"
                  color="#0057FF"
                  lineHeight="normal"
                  paddingLeft="5px"
                  padding="10px 0px 0px 0px">
                  {taskDetail?.comments?.length > 10 ? '10+' : taskDetail?.comments?.length} Comment
                </DarkText>
              </>
            ) : (
              ''
            )}
          </DIV>
          <DIV display="flex" alignItems="center" padding="0px 0px 0px 0px" width="40%">
            <DIV display="flex" alignItems="center">
              <TitleText
                color="#000"
                titleFontSize="16px"
                width="50px"
                lineHeight="normal"
                light
                paddingTop="20px"
                paddingRight="5px">
                Tags:
              </TitleText>

              {!editMode?.tag && userRole !== 1 && (
                <div
                  style={{
                    width: '17px',
                    height: '17px',
                    background: '#D9D9D9',
                    display: 'flex',
                    alignItems: 'center',
                    marginRight: '10px',
                    marginTop: '5px'
                  }}
                  onClick={() => {
                    enableEditMode('tag')
                    setTimeout(() => {
                      document.getElementById('tags').focus()
                    }, 1)
                  }}>
                  <Plus width="17" height="17" id="add_task_icon" />
                </div>
              )}
              {editMode?.tag && (
                <FormField
                  zIndexUnset
                  fieldType="input"
                  placeholder="Tags"
                  fontSize="14px"
                  name="tags"
                  disabled={userRole === 1}
                  width="160px"
                  margin="0px 0px 0px 20px"
                  height="30px  !important"
                  value={tag}
                  maxLength="30"
                  onBlur={() => {
                    enableEditMode('')
                  }}
                  onChange={e => {
                    setTag(e?.target?.value)
                  }}
                  handleEnterKey={e => {
                    if (e.keyCode === 13 && e.shiftKey === false && taskForm?.tags?.length < 5) {
                      updateForm('tags', [...taskForm?.tags, e?.target?.value])
                      setTag('')
                    }
                  }}
                  onUpdate={() => {}}
                />
              )}
            </DIV>
            <DIV
              display="flex"
              alignItems="center"
              margin="10px 0px 0px 10px"
              overflow="scroll"
              width={editMode.tag ? '40%' : '100%'}>
              {taskForm.tags.map(tag => {
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
              })}
            </DIV>
          </DIV>
        </DIV>

        <DIV display="flex" alignItems="center" margin="10px 0px 0px 0px">
          <DIV width="50%" display="flex" margin="0px 50px 0px 0px">
            <TitleText
              color="#000"
              titleFontSize="16px"
              lineHeight="normal"
              light
              marginTop="10px"
              width="50px"
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
                color="#000000"
                disabled={userRole === 1}
                disableBorder={!editMode.priority}
                placeholder="Select Priority"
                fontSize="14px"
                width="160px"
                height={taskForm?.priority ? '15px' : '36px'}
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
                  enableEditMode('')
                }}
              />
            ) : (
              <DarkText fontSize="18px" lineHeight="21.09px" color="#000000" topMargin="10px" f>
                {taskPriorityOptions?.find(priority => priority.value === taskDetail?.priority)?.label || 'priority'}
              </DarkText>
            )}
          </DIV>
          <DIV width="50%" display="flex" alignItems="center" padding="0px 0px 0px 90px">
            <TitleText color="#000" titleFontSize="16px" lineHeight="normal" light width="100px" paddingTop="15px">
              Story Points:
            </TitleText>
            <FormField
              zIndexUnset
              fieldType="input"
              fontSize="18px"
              lineHeight="21.09px"
              color="#000000"
              name="storyPoints"
              noMargin
              disableBorder={!editMode.storyPoints}
              disabled={userRole === 1}
              width="160px"
              height="30px  !important"
              onChange={e => updateForm('storyPoints', e?.target?.value)}
              value={taskForm?.storyPoints}
              onUpdate={() => {}}
              onClick={() => {
                enableEditMode('storyPoints')
              }}
              onBlur={() => {
                enableEditMode('')
              }}
              style={{ color: '#000000' }}
            />
          </DIV>
        </DIV>
        <DIV display="flex" alignItems="center" margin="10px 0px 0px 0px">
          <DIV width="50%" display="flex">
            <TitleText
              color="#000"
              titleFontSize="16px"
              lineHeight="normal"
              light
              marginTop="10px"
              width="50px"
              paddingRight="30px">
              Status:
            </TitleText>
            {editMode || userRole === 1 ? (
              <FormField
                zIndex="1"
                mobile
                required
                fieldType="searchField"
                disableBorder={!editMode.status}
                isSearchable={true}
                name="status"
                placeholder="Select Status"
                fontSize="14px"
                width="160px"
                height={taskForm?.status ? '15px' : '36px'}
                options={taskStatusOptions}
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
            ) : (
              <DarkText fontSize="18px" lineHeight="21.09px" color="##000000" topMargin="10px">
                {taskStatusOptions?.find(status => status.value === taskDetail?.status)?.label}
              </DarkText>
            )}
          </DIV>
        </DIV>
        <DIV display="flex" flexDirection="column" flexFlow="column" margin="20px 0px 0px 0px">
          <TEXT color="#000" titleFontSize="16px" lineHeight="normal" light marginTop="10px" width="100px">
            Description:
          </TEXT>
          {editMode?.description || !taskForm?.description ? (
            <FormField
              disableBorder={!editMode.description && taskForm?.description}
              fieldType="input"
              margin="10px 0px 0px 0px"
              fontSize="14px"
              width="100%"
              name="description"
              placeholder="Description"
              display="inline !important"
              textarea
              onChange={e => updateForm('description', e?.target?.value)}
              value={taskForm?.description}
              onBlur={() => {
                enableEditMode('')
              }}
            />
          ) : (
            <DarkText
              fontSize="18px"
              lineHeight="21.09px"
              color="#000000"
              topMargin="10px"
              style={{ paddingLeft: '10px' }}
              onClick={() => {
                enableEditMode('description')
              }}>
              {taskForm?.description}
            </DarkText>
          )}
        </DIV>
        {selectedTaskId && (
          <DIV margin="20px 0px 20px 0px" alignItems="flex-end" justifyContent="flex-end" width="100%">
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
          </DIV>
        )}
        {selectedTaskId &&
          comments &&
          comments.length > 0 &&
          comments.map(comment => {
            const userData = getCommentUserData(comment)
            return (
              <WhiteCard
                borderColor="#CED4DA"
                borderRadius="4px"
                unset
                key={comment?._id}
                half
                padding={'10px'}
                onMouseOver={() => {
                  if (hoverCommentId !== comment?._id) setHoverCommentId(comment?._id)
                }}
                onMouseOut={() => {
                  if (hoverCommentId !== comment?._id) setHoverCommentId(null)
                }}>
                <Grid2 block margin="0px">
                  <Span margin="0px 0px 10px 0px">
                    {userData?.profilePic && (
                      <Image src={userData?.profilePic} width="24px" height="24px" radius="50%" />
                    )}
                    <Span space>
                      <DarkText
                        noMargin
                        fontSize="18px"
                        color="#000000"
                        lineHeight="21.09px"
                        paddingLeft
                        smallPadding="10px">
                        {userData?.name || ''}
                        <span
                          style={{ fontSize: '14px', color: '#9B9B9B', lineHeight: '16.41px', paddingLeft: '20px' }}>
                          {ValidationUtils.formatDateWithDate(comment?.updatedAt)} -{' '}
                          {ValidationUtils.getTimeFormated(comment?.updatedAt)}
                        </span>
                      </DarkText>
                    </Span>
                  </Span>
                  {hoverCommentId === comment?._id && comment?.userId === userId && (
                    <DIV
                      width="100%"
                      display="flex"
                      justifyContent="flex-end"
                      onClick={() => {
                        setCommentId(comment?._id)
                      }}>
                      <EditIcon width="12px" height="12px" color="#585858" />
                    </DIV>
                  )}
                </Grid2>
                {commentId === comment?._id ? (
                  <DIV width="100%" display="flex" flexDirection="column" alignItems="flex-end">
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

                    <DIV
                      onClick={async e => {
                        e?.preventDefault()
                        await updateComment(taskDetail?._id, comment._id, comment)
                        setCommentId('')
                      }}>
                      <Icon name="send" color="#173B7F" width="24" height="24" />
                    </DIV>
                  </DIV>
                ) : (
                  <DarkText marginLeft="40px" fontSize="14px" lineHeight="16.41px" color="#000000">
                    {comment?.comment}
                  </DarkText>
                )}
                {comment?.img && <Image src={comment?.img} />}
              </WhiteCard>
            )
          })}
      </form>
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
