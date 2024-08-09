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
import { DarkText, WhiteCard, Span, Grid2, TEXT, DIV } from '../style'
import { TASK_PRIORITY, TASK_STATUS } from '../../../../utils/constants'
import {
  updateCreateStoryForm,
  createTask,
  updateTask,
  updateComment,
  addCommentToStory,
  restTagsList
} from '../../../../redux/actions'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useRouter } from 'next/router';

const PRIORITY_OPTIONS_ARR = ['lowest', 'low', 'medium', 'high', 'highest'];
const STATUS_OPTIONS_ARR = ['Todo', 'In progress', 'Done', 'Doing'];

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
  display: flex;
  width: 100%;
  flex-direction: column;

  padding: 10px;
`

const Task = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
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
  const [disableBtn, setButtonDisable] = useState(true)
  const router = useRouter();
  const [commentId, setCommentId] = useState('')
  const [tag, setTag] = useState('')
  const [error, setError] = useState('')

  const [comments, setComments] = useState([])
  const [newComment, setComment] = useState({
    comment: '',
    img: '',
    taskId: taskDetail?._id
  })
  const [selectedTags, setSelectedTags] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const [editSelectedTags, setEditSelectedTags] = useState([]);
  const [editInputValue, setEditInputValue] = useState('');
  const [inputStatus, setInputStatus] = useState('');
  const [taskPriority, setTaskPriority] = useState('');

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
      setButtonDisable(false)
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

  useEffect(() => {
    setInputStatus(taskDetail?.status)
    setTaskPriority(taskDetail?.priority)
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
    } else {
      setButtonDisable(true)
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
    setValidationErrors('')
    setButtonDisable(false)
    return true
  }

  const setValidationErrors = error => {
    setError(error)
  }

  const handleInputChange = (event, newInputValue) => {
    setInputValue(newInputValue);
  };

  const handleAddTag = () => {
    if (inputValue.trim() !== '' && !selectedTags.includes(inputValue)) {
      setSelectedTags([...selectedTags, inputValue.trim()]);
      setInputValue('');

    }
  };

  const handleEditInputTags = () => {
    if (editInputValue.trim() !== '' && !editSelectedTags.includes(editInputValue)) {
      updateForm('tags', [])
      setEditSelectedTags([...editSelectedTags, editInputValue.trim()]);
      setEditInputValue('');

    }
  };

  const handleEditInputChange = (event, newInputValue) => {
    setEditInputValue(newInputValue);
  };

  useEffect(() => {
    restTagsList()
    if (router.pathname.includes("department")) {
      updateForm('tags', [...taskForm?.tags, ...selectedTags])
    }
  }, [selectedTags])

  useEffect(() => {
    if (router.pathname.includes("ticket")) {
      restTagsList()
      updateForm('tags', [...taskForm?.tags, ...editSelectedTags])
    }
  }, [editSelectedTags])

  useEffect(() => {
    if (router.pathname.includes("ticket") && taskDetail?.tags?.length > 0) {
      setEditSelectedTags([])
      setEditSelectedTags([...editSelectedTags, ...taskDetail?.tags])
    }
  }, [])

  return (
    <TaskFormContainer>
      <div>
        {taskForm?.ticketCode && (
          <TEXT fontSize="18px" textColor="#0057FF" lineHeight="normal">
            ISSUE {taskForm?.ticketCode?.toLowerCase()}
          </TEXT>
        )}
      </div>
      <div>
        <div>
          {editMode.taskName ? (
            <FormField
              autoFocus
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
              onUpdate={() => { }}
              onBlur={() => {
                validateForm()
                enableEditMode('')
              }}
            />
          ) : (
            <TEXT
              textColor="#000000"
              fontSize="18px"
              lineHeight="21.09px"
              fontWeight="400"
              onClick={() => {
                enableEditMode('taskName')
              }}>
              {taskForm?.taskName}
            </TEXT>
          )}
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          paddingTop: '20px',
          width: '100%'
        }}>
        <div className="d-flex" style={{ width: '70%' }}>
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
            width="100%"
            height={taskForm?.assignee ? '15px' : '36px'}
            onChange={value => {
              updateForm('assignee', value?.value)
            }}
            value={assigneeOptions.find(assignee => assignee.value === taskForm?.assignee)}
            clickType="assignee"
            onUpdate={() => { }}
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
            }}>
            <div>
              <Chat width="18" height="18" />
            </div>
            <div>
              <TEXT fontSize="16px" textColor="#0057FF" lineHeight="normal" padding="0px 0px 0px 0px" margin="0px 0px 0px 5px">
                {comments?.length > 10 ? '10+' : comments?.length} {comments?.length > 10 ? 'Comments' : 'Comment'}
              </TEXT>
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
      <div style={{ marginTop: '10px' }}>
        <TEXT
          padding="5px 0px 0px 0px"
          textColor="#000000"
          fontSize="16px"
          lineHeight="21.09px"
          fontWeight="500"
          width="65px">
          Priority:
        </TEXT>
      </div>
      <div>
        <Autocomplete
          value={taskPriority}
          disablePortal
          id="combo-box-demo"
          options={PRIORITY_OPTIONS_ARR}
          onChange={(event, value) => {
            setTaskPriority(value)
            updateForm('priority', value)
          }}
          sx={{
            width: '100%',
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
              border: '0px !important',
            },
            '& svg': { display: 'none' }
          }}

          renderInput={(params) => <TextField {...params} />}
        />

      </div>

      <div>
        <div>
          <TEXT
            textColor="#000000"
            fontSize="16px"
            lineHeight="21.09px"
            fontWeight="500"
            width="80px"
            padding="0px">
            Status:
          </TEXT>
        </div>
      </div>

      <div>
        <Autocomplete
          value={inputStatus}
          disablePortal
          id="combo-box-demo"
          options={STATUS_OPTIONS_ARR}
          onChange={(event, value) => {
            setInputStatus(value)
            updateForm('status', value)
          }}
          sx={{
            width: '100%',
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
              border: '0px !important',
            },
            '& svg': { display: 'none' }
          }}

          renderInput={(params) => <TextField {...params} />}
        />

      </div>
      <div>

        <TEXT textColor="#000000" fontSize="16px" lineHeight="21.09px" fontWeight="500" width="120px !important">
          Story Points:
        </TEXT>
      </div>
      <div
        style={{
          marginTop: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start'
        }}>

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
            width="100%"
            height="30px  !important"
            onChange={e => updateForm('storyPoints', e?.target?.value)}
            value={taskForm?.storyPoints}
            clickType="storyPoints"
            onUpdate={() => { }}
            onClick={() => {
              enableEditMode('storyPoints')
            }}
            onBlur={() => {
              validateForm()
              enableEditMode('')
            }}
            style={{ color: '#000000' }}
          />
        ) : (
          <DarkText fontSize="18px" color="#000" lineHeight="normal" topMargin="10px" width="100px">
            {taskForm?.storyPoints}
          </DarkText>
        )}
      </div>
      <div>
        <TEXT textColor="#000000" fontSize="16px" lineHeight="21.09px" fontWeight="500" width="40px !important">
          Tags:
        </TEXT>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
        }}>

        {!editMode?.tag && userRole !== 1 && (
          <Autocomplete
            multiple
            id="tags-standard"
            value={editSelectedTags}
            onChange={(event, newValue) => setEditSelectedTags(newValue)}
            inputValue={editInputValue}
            onInputChange={handleEditInputChange}
            options={editSelectedTags}
            getOptionLabel={(option) => option}
            sx={{
              width: 300,
              '& .Mui-focused': {
                border: '0px !important',
              },
              '& .Mui-focused:after': {
                border: '0px !important',
              },
              '& .MuiInputBase-root': {
                maxHeight: 200,
                overflowY: "scroll",
                overflowX: "hidden",
                '::-webkit-scrollbar': {
                  width: 5,
                  height: 0,
                },

                '::-webkit-scrollbar-track': {
                  background: 'transparent'
                },

                '::-webkit-scrollbar-thumb': {
                  background: 'transparent'
                }
              },
              '& input': {
                border: "0px !important",
                boxShadow: 'none !important',
              },
              '& input:focus': {
                border: '0px !important',
                boxShadow: 'none !important',
              },
              '& .MuiAutocomplete-root': {
                borderRadius: '8px !important',
                padding: '10px !important',
                border: '1px solid purple !important',
              },
              '& .MuiInputBase-root-MuiInput-root:after': {
                border: '0px !important',
                width: "100%"
              }
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                placeholder="Tags"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleEditInputTags();
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
            getOptionLabel={(option) => option}
            sx={{
              width: 300,
              '& .Mui-focused': {
                border: '0px !important',
              },
              '& .Mui-focused:after': {
                border: '0px !important',
              },
              '& .MuiInputBase-root': {
                maxHeight: 200,
                overflowY: "scroll",
                overflowX: "hidden",
                '::-webkit-scrollbar': {
                  width: 5,
                  height: 0,
                },

                '::-webkit-scrollbar-track': {
                  background: 'transparent'
                },

                '::-webkit-scrollbar-thumb': {
                  background: 'transparent'
                }
              },
              '& input': {
                border: "0px !important",
                boxShadow: 'none !important',
              },
              '& input:focus': {
                border: '0px !important',
                boxShadow: 'none !important',
              },
              '& .MuiAutocomplete-root': {
                borderRadius: '8px !important',
                padding: '10px !important',
                border: '1px solid purple !important',
              },
              '& .MuiInputBase-root-MuiInput-root:after': {
                border: '0px !important',
                width: "100%"
              }
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                placeholder="Tags"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
              />
            )}
            noOptionsText="Add Tag"
          />
        )}
      </div>


      <div>
        <TEXT textColor="#000000" fontSize="16px" lineHeight="21.09px" fontWeight="500" width="100px !important">
          Description:
        </TEXT>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}>

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
            onUpdate={() => { }}
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

      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
          marginTop: '10px',
          width: '100%'
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
          disabled={disableBtn}
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

      <div>
        {error && (
          <TEXT margin="20px 0px 0px 0px" textColor="red" fontSize="12px">
            {error}
          </TEXT>
        )}
      </div>

      <div>
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

      </div>
      <div>
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
      </div>
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
    updateComment: bindActionCreators(updateComment, dispatch),
    restTagsList: bindActionCreators(restTagsList, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MobileTaskForm)
