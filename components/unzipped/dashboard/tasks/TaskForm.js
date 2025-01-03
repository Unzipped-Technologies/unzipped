import React, { useEffect, useState, useMemo } from 'react'
import { connect, useSelector } from 'react-redux'
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
  updateComment,
  restTagsList
} from '../../../../redux/actions'

import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import SaveIcon from '@mui/icons-material/Save'

const PRIORITY_OPTIONS_ARR = ['lowest', 'low', 'medium', 'high', 'highest']
const STATUS_OPTIONS_ARR = ['Todo', 'In Progress', 'Done', 'Doing']

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
  userRole,
  resetStoryForm,
  restTagsList,
  isEditable
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
  const [disableBtn, setButtonDisable] = useState(true)
  const [tag, setTag] = useState('')
  const [newComment, setComment] = useState({
    comment: '',
    img: '',
    taskId: taskDetail?._id
  })
  const [commentId, setCommentId] = useState('')
  const [hoverCommentId, setHoverCommentId] = useState('')
  const [error, setError] = useState('')
  const [selectedTags, setSelectedTags] = useState([])
  const [inputValue, setInputValue] = useState('')

  const [editSelectedTags, setEditSelectedTags] = useState([])
  const [editInputValue, setEditInputValue] = useState('')
  const statusList = departmentData?.departmentTags?.map(tag => tag.tagName)
  const [isCommentEditable, setIsCommentEditable] = useState(false)
  const filteredAssigneeList =  departmentData?.contracts?.length > 0 ? 
  departmentData?.contracts?.filter(contract => contract.departmentId === departmentData._id) : []
  
  useEffect(() => {
    setComments(taskDetail?.comments)
  }, [taskDetail])

  useEffect(() => {
    if (selectedTaskId) {
      setEditMode(Object.fromEntries(Object.keys(editMode).map(key => [key, false])))
      getTaskById(selectedTaskId)
      setButtonDisable(false)
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
    assignee = filteredAssigneeList?.map(contract => ({
      value: contract?.freelancer?.userId,
      label: (
        <div className="d-flex justify-content-start">
          <div>
            <Image
              src={contract?.freelancer?.user?.profileImage}
              alt="Assignee Image"
              width={'30px'}
              height={'30px'}
              radius={'50%'}
              margin={'0px 5px  0px 0px'}
            />
          </div>
          <div>
            <div
              style={{
                color: 'grey',
                textAlign: 'center',
                fontFamily: 'Roboto',
                fontSize: '14px',
                fontStyle: 'normal',
                fontWeight: 600,
                lineHeight: 'normal',
                letterSpacing: '0.4px',
                textTransform: 'capitalize'
              }}>
              {contract?.freelancer?.user?.FirstName + ' ' + contract?.freelancer?.user?.LastName ?? 'Name'}
            </div>
            <div
              style={{
                color: '#787878',
                textAlign: 'center',
                fontSize: '11px',
                fontStyle: 'normal',
                fontWeight: 500,
                lineHeight: 'normal',
                letterSpacing: '0.4px',
                paddingLeft: '12px'
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
              width={'30px'}
              height={'30px'}
              radius={'50%'}
              margin={'0px 5px  0px 0px'}
            />
          </div>
          <div>
            <div
              style={{
                color: 'grey',
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
                fontSize: '11px',
                fontStyle: 'normal',
                fontWeight: 500,
                lineHeight: 'normal',
                letterSpacing: '0.4px',
                paddingLeft: '12px'
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
      statusList?.map(status => ({
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
    } else if (!taskForm?.storyPoints) {
      setValidationErrors('Story points are required.')
      return false
    } else if (!taskForm?.priority) {
      setValidationErrors('Priority are required.')
      return false
    } else if (!taskForm?.status) {
      setValidationErrors('Status are required.')
      return false
    }
    else if (taskForm?.storyPoints < 0) {
      setValidationErrors('Story Points should not be a negative number.')
      return false
    }
    setValidationErrors('')
    setButtonDisable(false)
    return true
  }
  const onSubmit = async () => {
    if (validateForm()) {
      if (taskForm?.assignee === 'unassigned') {
        taskForm.assignee = userId
      }

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
          setSelectedTags([])
        } else {
          setValidationErrors(response?.data?.message ?? 'Something went wrong')
        }
      }
    } else {
      setButtonDisable(true)
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

  const handleInputChange = (event, newInputValue) => {
    setInputValue(newInputValue)
  }

  const handleAddTag = () => {
    if (inputValue.trim() !== '' && !selectedTags.includes(inputValue)) {
      setSelectedTags([...selectedTags, inputValue.trim()])
      setInputValue('')
    }
  }

  const handleEditInputTags = () => {
    if (editInputValue.trim() !== '' && !editSelectedTags.includes(editInputValue)) {
      setEditSelectedTags([...editSelectedTags, editInputValue.trim()])
      setEditInputValue('')
    }
  }

  const handleEditInputChange = (event, newInputValue) => setEditInputValue(newInputValue)

  useEffect(() => {
    restTagsList()
    updateForm('tags', [...taskForm?.tags, ...selectedTags])
  }, [selectedTags])

  useEffect(() => {
    restTagsList()
    updateForm('tags', [...taskForm?.tags, ...editSelectedTags])
  }, [editSelectedTags])

  useEffect(() => {
    if (taskDetail?.tags?.length > 0) {
      setEditSelectedTags([...editSelectedTags, ...taskDetail?.tags])
    }
  }, [taskDetail?.tags])

  const handleRestForm = () => resetStoryForm()

  const handleUserCommments = comment => {
    if (!isCommentEditable) {
      if (commentId === comment?._id) {
        onHide()
      } else {
        setCommentId(comment?._id)
        setIsCommentEditable(true)
      }
    }
  }

  return (
    <>
      <DarkText fontSize="18px" color="#0057FF" lineHeight="normal" fontWeight="bold" paddingLeft="82px">
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
              border: '1px ',
              wideBorder: '#1976D2',
              borderRadius: '8px'
            }}
            onClick={() => {
              onHide()
              handleRestForm()
            }}>
            CANCEL
          </Button>

          <Button
            disabled={disableBtn}
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
              wideBorder: '#1976D2',
              borderRadius: '8px'
            }}>
            Save
          </Button>
        </DIV>
        {error && (
          <TitleText color="red" titleFontSize="12px">
            {error}
          </TitleText>
        )}
        <DIV display="flex" margin="5px 0px 0px 80px" alignItems="center">
          <div>
            <FormField
              zIndexUnset
              placeholder="Task Name"
              fieldType="input"
              name="taskName"
              id="taskName"
              fontSize="14px"
              disableBorder={!editMode.taskName}
              disabled={userRole === 1}
              width="300px"
              height="36px !important"
              borderRadius="4px"
              onChange={e => updateForm('taskName', e?.target?.value)}
              value={taskForm?.taskName}
              clickType="taskName"
              maxLength={'250'}
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
          <DIV display="flex" width="40%" overflow={'none'} margin="15px  0px 0px 0px">
            <DIV
              paddingRight="10px"
              padding={editMode ? '10px 0px 0px 0px' : '20px  0px 0px 0px'}
              display="flex"
              margin="0px 0px 0px 10%"
              justifyContent="flex-end">
              <ManIcon width="16px" height="16px" viewBox="0 0 20 18" fill="#979797" />
            </DIV>
            {editMode.assignee ? (
              <span style={{ width: '300px', height: '50px' }}>
                <FormField
                  mobile
                  zIndex="10000"
                  display="flex"
                  disableBorder={!editMode.assignee}
                  fieldType="searchField"
                  isSearchable={true}
                  name="assignee"
                  id="assignee"
                  disabled={userRole === 1}
                  options={assigneeOptions}
                  placeholder="assignee"
                  fontSize="12px"
                  margin="0px 0px 0px 28px"
                  width="300px"
                  height={taskForm?.assignee ? '15px' : '36px'}
                  dropdownList={assigneeOptions}
                  borderRadius="5px"
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
              <DarkText
                id="assignee"
                onClick={() => {
                  enableEditMode('assignee')
                }}
                fontSize="18px"
                color="grey"
                lineHeight="normal"
                topMargin="20px"
                marginRight="100px">
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
          <DIV display="flex" alignItems="center" padding="0px 0px 0px 0px" width="40%" overflow={'none'}>
            <DIV display="flex" alignItems="center" gap="19px">
              <TitleText
                color="grey"
                titleFontSize="16px"
                width="50px"
                lineHeight="normal"
                light
                paddingTop="20px"
                paddingRight="5px">
                Tags:
              </TitleText>

              {!editMode?.tag && userRole !== 1 && (
                <Autocomplete
                  multiple
                  id="tags-standard"
                  value={editSelectedTags}
                  onChange={(event, newValue) => setEditSelectedTags(newValue)}
                  inputValue={editInputValue}
                  onInputChange={handleEditInputChange}
                  options={editSelectedTags}
                  getOptionLabel={option => option}
                  sx={{
                    width: 225,
                    padding: '4px 0px 0px 20px',
                    '& .Mui-focused': {
                      border: '0px !important'
                    },
                    '& .Mui-focused:after': {
                      border: '0px !important'
                    },
                    '& .MuiInputBase-root': {
                      maxHeight: 200,
                      overflowY: 'scroll',
                      overflowX: 'hidden',
                      '::-webkit-scrollbar': {
                        width: 5,
                        height: 0
                      },

                      '::-webkit-scrollbar-track': {
                        background: 'transparent'
                      },

                      '::-webkit-scrollbar-thumb': {
                        background: 'transparent'
                      }
                    },
                    '& input': {
                      border: '0px !important',
                      boxShadow: 'none !important'
                    },
                    '& input:focus': {
                      border: '0px !important',
                      boxShadow: 'none !important'
                    },
                    '& .MuiAutocomplete-root': {
                      borderRadius: '8px !important',
                      padding: '10px !important',
                      border: '1px solid purple !important'
                    },
                    '& .MuiInputBase-root-MuiInput-root:after': {
                      border: '0px !important',
                      width: '100%'
                    }
                  }}
                  renderInput={params => (
                    <TextField
                      {...params}
                      variant="standard"
                      placeholder="Tags"
                      onKeyDown={e => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                          handleEditInputTags()
                        }
                      }}
                    />
                  )}
                  noOptionsText="Add Tag"
                />
              )}
              {editMode?.tag && (
                <Autocomplete
                  multiple
                  id="tags-standard"
                  value={selectedTags}
                  onChange={(event, newValue) => setSelectedTags(newValue)}
                  inputValue={inputValue}
                  onInputChange={handleInputChange}
                  options={selectedTags}
                  getOptionLabel={option => option}
                  sx={{
                    width: 225,
                    padding: '0px 0px 0px 20px',
                    '& .Mui-focused': {
                      border: '0px !important'
                    },
                    '& .Mui-focused:after': {
                      border: '0px !important'
                    },
                    '& .MuiInputBase-root': {
                      maxHeight: 200,
                      overflowY: 'scroll',
                      overflowX: 'hidden',
                      '::-webkit-scrollbar': {
                        width: 5,
                        height: 0
                      },

                      '::-webkit-scrollbar-track': {
                        background: 'transparent'
                      },

                      '::-webkit-scrollbar-thumb': {
                        background: 'transparent'
                      }
                    },
                    '& input': {
                      border: '0px !important',
                      boxShadow: 'none !important'
                    },
                    '& input:focus': {
                      border: '0px !important',
                      boxShadow: 'none !important'
                    },
                    '& .MuiAutocomplete-root': {
                      borderRadius: '8px !important',
                      padding: '10px !important',
                      border: '1px solid purple !important'
                    },
                    '& .MuiInputBase-root-MuiInput-root:after': {
                      border: '0px !important',
                      width: '100%'
                    }
                  }}
                  renderInput={params => (
                    <TextField
                      {...params}
                      variant="standard"
                      placeholder="Tags"
                      inputProps={{
                        ...params.inputProps,
                        maxLength: 10
                      }}
                      onKeyDown={e => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                          handleAddTag()
                        }
                      }}
                    />
                  )}
                  noOptionsText="Add Tag"
                />
              )}
            </DIV>
          </DIV>
        </DIV>

        <DIV display="flex" alignItems="center" margin="10px 0px 0px 0px">
          <DIV width="50%" display="flex" margin="0px 50px 0px 0px">
            <TitleText
              color="grey"
              titleFontSize="16px"
              lineHeight="normal"
              light
              marginTop="10px"
              width="50px"
              paddingRight="30px">
              Priority:
            </TitleText>
            <>
              <Autocomplete
                disablePortal
                value={
                  selectedTaskId
                    ? PRIORITY_OPTIONS_ARR.filter(elem => elem == taskDetail?.priority)
                    : taskForm?.priority
                }
                id="priority_autocomplete"
                options={PRIORITY_OPTIONS_ARR}
                onChange={(event, value) => {
                  updateForm('priority', value)
                }}
                sx={{
                  width: 300,
                  '& input': {
                    bgcolor: 'background.paper',
                    border: '0px !important',
                    borderRadius: '0px !important',
                    margin: '0px !important',
                    padding: '0px !important',
                    fontSize: '16px',
                    boxShadow: 'none',
                    height: '20px !important',
                    boxShadow: 'none !important',

                    color: theme => theme.palette.getContrastText(theme.palette.background.paper)
                  },
                  '& input:focus': {
                    border: '0px !important'
                  },
                  '& svg': { display: 'none' }
                }}
                renderInput={params => <TextField {...params} />}
              />
            </>
          </DIV>
          <DIV width="50%" display="flex" alignItems="center" padding="0px 0px 0px 90px">
            <TitleText color="grey" titleFontSize="16px" lineHeight="normal" light width="100px" paddingTop="15px">
              Story Points:
            </TitleText>
            <FormField
              zIndexUnset
              fieldType="input"
              fontSize="18px"
              lineHeight="21.09px"
              color="#000000"
              name="storyPoints"
              id="storyPoints"
              noMargin
              disableBorder={!editMode.storyPoints}
              disabled={userRole === 1}
              width="245px"
              height="35px  !important"
              borderRadius="5px"
              type="number"
              maxLength={'3'}
              onChange={e => updateForm('storyPoints', e?.target?.value)}
              value={taskForm?.storyPoints}
              onUpdate={() => {}}
              onClick={() => {
                enableEditMode('storyPoints')
              }}
              onBlur={() => {
                validateForm()
                enableEditMode('')
              }}
            />
          </DIV>
        </DIV>
        <DIV display="flex" alignItems="center" margin="10px 0px 0px 0px">
          <DIV width="50%" display="flex">
            <TitleText
              color="grey"
              titleFontSize="16px"
              lineHeight="normal"
              light
              marginTop="10px"
              width="50px"
              paddingRight="30px">
              Status:
            </TitleText>
            {editMode || userRole === 1 ? (
              <Autocomplete
                value={
                  selectedTaskId
                    ? statusList.filter(elem => elem?.toLowerCase() == taskForm?.status?.toLowerCase())
                    : taskForm?.status
                }
                disablePortal
                id="status_autocomplete"
                options={statusList}
                onChange={(event, value) => {
                  const tag = departmentData?.departmentTags.find(item => item.tagName === value)
                  updateForm('status', tag.tagName)
                  updateForm('tag', tag._id)
                }}
                sx={{
                  width: 300,
                  '& input': {
                    bgcolor: 'background.paper',
                    border: '0px !important',
                    borderRadius: '0px !important',
                    margin: '0px !important',
                    padding: '0px !important',
                    fontSize: '16px',
                    boxShadow: 'none',
                    height: '20px !important',
                    boxShadow: 'none !important',

                    color: theme => theme.palette.getContrastText(theme.palette.background.paper)
                  },
                  '& input:focus': {
                    border: '0px !important'
                  },
                  '& svg': { display: 'none' }
                }}
                onBlur={() => {
                  validateForm()
                }}
                renderInput={params => <TextField {...params} />}
              />
            ) : (
              <DarkText fontSize="18px" lineHeight="21.09px" color="##000000" topMargin="10px">
                {taskStatusOptions?.find(status => status.value === taskDetail?.status)?.label}
              </DarkText>
            )}
          </DIV>
        </DIV>
        <DIV display="flex" flexDirection="column" flexFlow="column" margin="20px 0px 0px 0px">
          <TEXT textColor="grey" titleFontSize="16px" lineHeight="normal" light marginTop="10px" width="100px">
            Description:
          </TEXT>
          {editMode?.description || !taskForm?.description ? (
            <FormField
              disableBorder={!editMode.description && !taskForm?.description}
              fieldType="input"
              margin="5px 0px 0px 0px"
              fontSize="14px"
              width="95%"
              name="description"
              id="description"
              placeholder="Description"
              display="inline !important"
              borderRadius="5px"
              maxLength={'1000'}
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
              id="description"
              topMargin="10px"
              padding="0px 0px 0px 10px"
              onClick={() => {
                enableEditMode('description')
              }}>
              {taskForm?.description}
            </DarkText>
          )}
        </DIV>
        {selectedTaskId && (
          <DIV margin="20px 0px 20px 5px" alignItems="flex-end" justifyContent="flex-end" width="95%">
            <FormField
              fieldType="input"
              fontSize="14px"
              placeholder="Leave a comment..."
              noMargin
              height="auto"
              name="comment"
              id="comment"
              textarea
              width="95%"
              maxLength={'1000'}
              display="inline !important"
              onChange={e => setComment({ ...newComment, comment: e.target.value })}
              value={newComment.comment}>
              <TEXT textColor="grey" titleFontSize="16px" lineHeight="normal" light marginTop="10px" width="100px">
                Discussion:
              </TEXT>
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
                id={comment?._id}
                half
                padding="10px"
                width="95%"
                margin="20px 0px 20px 8px"
                background="#fbfbfb"
                border="none"
                onMouseOver={() => {
                  if (hoverCommentId !== comment?._id) setHoverCommentId(comment?._id)
                }}
                onMouseOut={() => {
                  if (hoverCommentId !== comment?._id) setHoverCommentId(null)
                }}>
                <Grid2 block margin="0px">
                  <Span margin="0px 0px 10px 0px">
                    {userData?.profilePic && (
                      <Image
                        src={userData?.profilePic}
                        width="24px"
                        height="24px"
                        radius="50%"
                        id={`comment_${comment?._id}_image`}
                      />
                    )}
                    <Span space>
                      <DarkText
                        noMargin
                        fontSize="18px"
                        color="#000000"
                        lineHeight="21.09px"
                        paddingLeft
                        id={`comment_${comment?._id}_user_info`}
                        smallPadding="10px">
                        {userData?.name || ''}
                        <span
                          style={{ fontSize: '14px', color: '#9B9B9B', lineHeight: '16.41px', paddingLeft: '20px' }}>
                          {`${ValidationUtils.formatDateWithDate(
                            comment?.updatedAt
                          )} - ${ValidationUtils.getTimeFormated(comment?.updatedAt)}`}
                        </span>
                      </DarkText>
                    </Span>
                  </Span>
                  {hoverCommentId === comment?._id && comment?.userId === userId && (
                    <DIV
                      width="100%"
                      display="flex"
                      justifyContent="flex-end"
                      gap="8px"
                      id={`edit_${comment?._id}_comment`}
                      onClick={() => handleUserCommments(comment)}>
                      <EditIcon width="12px" height="12px" color="#585858" />
                      {isCommentEditable && commentId === comment?._id && (
                        <SaveIcon
                          sx={{
                            width: '16px',
                            height: '16px',
                            color: '#585858'
                          }}
                          onClick={async e => {
                            e.preventDefault()
                            await updateComment(taskDetail?._id, comment._id, comment)
                            setCommentId('')
                            setIsCommentEditable(false)
                          }}
                        />
                      )}
                    </DIV>
                  )}
                </Grid2>
                {commentId === comment?._id ? (
                  <DIV
                    width="100%"
                    display="flex"
                    flexDirection="column"
                    alignItems="flex-end"
                    justifyContent="space-around">
                    <FormField
                      fieldType="input"
                      fontSize="14px"
                      placeholder="Leave a comment..."
                      noMargin
                      height="auto"
                      id={`comment_${comment?._id}`}
                      textarea
                      maxLength={'1000'}
                      width="95%"
                      display="inline !important"
                      onChange={e => {
                        setComments(prevArray =>
                          prevArray.map(item =>
                            item._id === comment?._id ? { ...item, comment: e?.target.value } : item
                          )
                        )
                      }}
                      value={comment?.comment}></FormField>
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
    updateComment: bindActionCreators(updateComment, dispatch),
    resetStoryForm: bindActionCreators(resetStoryForm, dispatch),
    restTagsList: bindActionCreators(restTagsList, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm)
