import React, { useEffect, useState, useMemo, useRef } from 'react'
import styled from 'styled-components'
import Loading from '../../../loading'
import Autocomplete from '@mui/material/Autocomplete'

import { Dialog } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import MuiDialogContent from '@material-ui/core/DialogContent'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Modal from '../../../ui/Modal'
import Button from '../../../ui/Button'
import { FormField } from '../../../ui'
import SearchField from '../../../ui/SearchField'
import { TitleText, DarkText, Absolute, Grid3 } from '../style'
import CloseIcon from '../../../icons/close'
import { getTasks, createTask } from '../../../../redux/actions'
const List = styled.ul`
  position: relative;
  flex-flow: column nowrap;
  list-style-type: circle !important; /* or any other value like disc, square, etc. */
  justify-items: center;
  min-width: ${({ $containOverFlow }) => ($containOverFlow ? '112px' : '120px')};
  padding-right: ${props => (props.$NoPadding ? '0px' : '20px')};
  padding-left: ${props => (props.$NoPadding ? '10px' : 'auto')};
  flex-wrap: wrap;
`

const Item = styled.li`
  font-family: Roboto;
  font-style: normal;
  display: flex;
  flex-direction: row;
  letter-spacing: 0.39998000860214233px;
  color: ${({ color }) => (color ? color : '#000000')};
  font-size: ${({ fontSize }) => (fontSize ? fontSize : '16px')};
  font-weight: ${({ fontWeight }) => (fontWeight ? fontWeight : '500')};
  line-height: ${({ lineHeight }) => (lineHeight ? lineHeight : '25px')};
  align-items: center;
`

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
    display: 'flex !important',
    flexDirection: 'column  !important',
    flexWrap: 'wrap !important', // Enable wrapping
    maxWidth: 'unset !important', // Remove default max-width
    width: '100% !important', // Fill remaining dialog space
    padding: theme.spacing(2)
  }
}))(MuiDialogContent)

const AddTasksModal = ({
  onHide,
  onAdd,
  open = false,
  loading,
  getTasks,
  businessId,
  freelancerId,
  projectTasks,
  createTask,
  newCreatedTasks
}) => {
  const [taskOptions, setTaskOptions] = useState([])
  const [detailIndex, setDetailIndex] = useState(null)
  const [tasks, setTasks] = useState([])
  const [newTasksModal, setNewTasksModal] = useState(false)
  const [newTasks, setNewTasks] = useState([])
  const [taskName, setTaskName] = useState('')

  useEffect(() => {
    getTasks({ businessId: businessId, limit: 'all', freelancerId: null })
  }, [])

  useEffect(() => {
    const options = projectTasks.map(task => {
      return {
        label: task?.taskName,
        taskName: task?.taskName,
        id: task?._id
      }
    })
    setTaskOptions(options)
  }, [projectTasks])

  const addTasks = value => {
    if (value && tasks.findIndex(task => task.taskName === value) === -1) {
      const option = projectTasks.find(task => task.taskName === value)
      setTasks([...tasks, { value: option?._id || null, taskName: value }])
    }
    setTaskName('')
  }

  const openNewTasksModal = () => {
    setNewTasksModal(true)
  }

  const HideNewTasksModal = () => {
    setNewTasksModal(false)
  }

  const addTasksToInvoice = async () => {
    if (tasks?.some(task => task?.value === null || task?.value === undefined || task?.value === '')) {
      const newTasksList = []
      for (var task of tasks) {
        if (task?.value === null || task?.value === undefined || task?.value === '') {
          newTasksList.push({
            taskName: task.taskName,
            storyPoints: 0,
            description: '',
            businessId: businessId
          })
        }
        setNewTasks(newTasksList)
      }
      openNewTasksModal()
    } else {
      onAdd && (await onAdd(tasks?.map(task => task.value)))
      await HideNewTasksModal()
      await onHide()
    }
  }

  const handleSubmit = async () => {
    const response = await createTask({
      tasks: newTasks
    })
    if (response?.status === 200) {
      let taskIds = []
      for (var task of tasks) {
        if (task?.value !== null && task?.value !== undefined && task?.value !== '') taskIds.push(task?.value)
      }
      taskIds = [...taskIds, ...response?.data?.data?.map(task => task._id)]
      onAdd && (await onAdd(taskIds))
      await HideNewTasksModal()
      await onHide()
    }
  }

  return (
    <>
      {window.innerWidth > 680 ? (
        <>
          {loading && <Loading />}
          <Modal onHide={HideNewTasksModal} background="#D9D9D9 " width="600px" hasHiddenIcon={false}>
            <div style={{ marginTop: '-10px' }}>
              <TitleText mobile color="#222222">
                <b>Select a ticket</b>
              </TitleText>
              <TitleText color="#333333" paddingTop="10px">
                Start typing to select an assigned task
              </TitleText>
              <div
                style={{
                  display: 'flex'
                }}>
                <label>
                  <Autocomplete
                    sx={{
                      display: 'inline-block',
                      '& input': {
                        width: '470px !important',
                        bgcolor: 'background.paper',
                        border: '1px solid #ced4da !important',
                        borderRadius: '5px !important',
                        margin: '0px !important',
                        paddingLeft: '10px !important',
                        fontSize: '16px',
                        boxShadow: 'none',

                        color: theme => theme.palette.getContrastText(theme.palette.background.paper)
                      }
                    }}
                    id="task_name"
                    options={taskOptions}
                    renderInput={params => (
                      <div ref={params.InputProps.ref}>
                        <input type="text" {...params.inputProps} />
                      </div>
                    )}
                    freeSolo
                    autoComplete
                    onChange={(event, newValue) => {
                      if (typeof newValue === 'string') {
                      } else if (newValue && newValue.inputValue) {
                      } else {
                        addTasks(newValue?.label)
                      }
                    }}
                    onKeyDown={e => {
                      if (e?.keyCode === 13) {
                        addTasks(e?.target.value)
                      }
                    }}
                  />
                </label>

                <Button
                  width="74px"
                  height="47px"
                  noBorder
                  margin="0px 0px 0px 10px"
                  colors={{
                    background: '#BA68C8',
                    text: '#FFFFFF'
                  }}>
                  Add
                </Button>
              </div>
              <div style={{ marginTop: '20px' }}>
                <List>
                  {tasks?.length
                    ? tasks.map((task, index) => {
                        return (
                          <div
                            style={{ display: 'flex', flexDirection: 'row' }}
                            key={task?.value || `${task?.taskName}_${index}`}>
                            <span
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                verticalAlign: 'middle',
                                backgroundColor: 'black',
                                paddingRight: '1px !important',
                                width: '7px',
                                height: '7px',
                                margin: '10px 5px 0px 0px',
                                padding: '0px !important'
                              }}>
                              <CloseIcon width="7px" height="7px" color="#FFFFFF" />
                            </span>
                            <Item>
                              <p>{task?.taskName}</p>
                            </Item>
                          </div>
                        )
                      })
                    : ''}
                </List>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '30px' }}>
                <Button width="63px" buttonHeight="25px" oval type="outlineInverse" onClick={onHide}>
                  CANCEL
                </Button>
                <Button
                  disabled={false}
                  onClick={addTasksToInvoice}
                  width="63px"
                  buttonHeight="25px"
                  oval
                  type="black"
                  margin="0px 0px 0px 20px">
                  ADD TASK
                </Button>
              </div>
            </div>
          </Modal>
          {newTasksModal && (
            <Modal onHide={onHide} background="#D9D9D9 " width="900px" hasHiddenIcon={false}>
              <div style={{ marginTop: '-10px', marginRight: '100px' }}>
                <TitleText mobile color="#222222">
                  <b>Create new tasks</b>
                </TitleText>
                <TitleText color="#333333" paddingTop="10px" width="60%">
                  A few of the tasks you are adding are not assigned to you. Please add more details to create them.
                </TitleText>
                {newTasks?.length
                  ? newTasks.map((task, taskIndex) => {
                      return (
                        <div key={`${task?.taskName}`} style={{ marginBottom: '20px' }}>
                          <div
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              flexWrap: 'wrap'
                            }}>
                            <div style={{ width: '60%' }}>
                              <TitleText color="#333333" paddingTop="30px" fontSize="15px" paddingLeft="10px">
                                {task?.taskName}
                              </TitleText>
                            </div>
                            <FormField
                              zIndexUnset
                              fieldType="input"
                              type="number"
                              placeholder="Story Points"
                              fontSize="14px"
                              name="story points"
                              width="130px"
                              margin="-6px 0px 0px 10px"
                              height="30px  !important"
                              borderRadius="4px"
                              border="1px solid #A5A0A0"
                              value={task?.storyPoints}
                              maxLength="30"
                              min={0}
                              onChange={e => {
                                setNewTasks(prevArray =>
                                  prevArray.map((item, index) =>
                                    index === taskIndex ? { ...item, storyPoints: e?.target.value } : item
                                  )
                                )
                              }}
                              onUpdate={() => {}}>
                              Story Points
                            </FormField>

                            <div
                              style={{ padding: '25px 0px 0px 20px', textDecoration: 'underline' }}
                              onClick={() => {
                                if (detailIndex === taskIndex) {
                                  setDetailIndex(null)
                                } else {
                                  setDetailIndex(taskIndex)
                                }
                              }}>
                              <TitleText color="#1976D2" fontSize="12px" width="100px">
                                {detailIndex === taskIndex ? 'COLLAPSE' : 'ADD DETAILS'}
                              </TitleText>
                            </div>
                          </div>
                          {detailIndex === taskIndex ? (
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
                                placeholder="Description..."
                                noMargin
                                height="auto"
                                name="description"
                                textarea
                                width="100%"
                                display="inline !important"
                                value={task?.description}
                                onChange={e => {
                                  setNewTasks(prevArray =>
                                    prevArray.map((item, index) =>
                                      index === taskIndex ? { ...item, description: e?.target.value } : item
                                    )
                                  )
                                }}
                              />
                            </div>
                          ) : (
                            <DarkText color="#333333" fontSize="15px" paddingLeft="10px">
                              {task?.description}
                            </DarkText>
                          )}
                        </div>
                      )
                    })
                  : ''}

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '30px' }}>
                  <Button width="63px" buttonHeight="25px" oval type="outlineInverse" onClick={HideNewTasksModal}>
                    CANCEL
                  </Button>
                  <Button
                    disabled={false}
                    onClick={handleSubmit}
                    width="63px"
                    buttonHeight="25px"
                    oval
                    type="black"
                    margin="0px 0px 0px 20px">
                    ADD TASK(S)
                  </Button>
                </div>
              </div>
            </Modal>
          )}
        </>
      ) : (
        <>
          <MUIDialog
            onClose={() => onHide()}
            disableEscapeKeyDown
            open={open}
            maxWidth="md"
            aria-labelledby="story-preview-modal"
            aria-describedby="story-preview-modal-description">
            <DialogContent dividers>
              <div style={{ marginTop: '20px' }}>
                <TitleText mobile color="#000000" fontSize="16px" lineHeight="18.75px">
                  <b>Select a ticket</b>
                </TitleText>
                <TitleText light color="#333333" paddingTop="10px" fontSize="16px" lineHeight="18.75px">
                  Start typing to select an assigned task
                </TitleText>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column'
                  }}>
                  <label>
                    <Autocomplete
                      sx={{
                        display: 'inline-block',
                        '& input': {
                          width: `${window.innerWidth - 50}px !important`,
                          bgcolor: 'background.paper',
                          border: '1px solid #ced4da !important',
                          borderRadius: '5px !important',
                          margin: '0px !important',
                          paddingLeft: '10px !important',
                          fontSize: '16px',
                          boxShadow: 'none',

                          color: theme => theme.palette.getContrastText(theme.palette.background.paper)
                        }
                      }}
                      id="task_name"
                      options={taskOptions}
                      renderInput={params => (
                        <div ref={params.InputProps.ref}>
                          <input type="text" {...params.inputProps} placeholder="Type a task and hit enter..." />
                        </div>
                      )}
                      freeSolo
                      autoComplete
                      onInputChange={e => {
                        setTaskName(e?.target.value)
                      }}
                      inputValue={taskName}
                      onChange={(event, newValue) => {
                        if (typeof newValue === 'string') {
                        } else if (newValue && newValue.inputValue) {
                        } else {
                          addTasks(newValue?.label)
                          setTaskName(newValue?.label)
                        }
                      }}
                      onKeyDown={e => {
                        if (e?.keyCode === 13) {
                          addTasks(e?.target.value)
                          setTaskName(e?.target.value)
                        }
                      }}
                    />
                  </label>

                  <Button
                    width={`${window.innerWidth - 50}px !important`}
                    height="47px"
                    margin="10px 0px"
                    noBorder
                    noUppercase
                    colors={{
                      background: '#BA68C8',
                      text: '#FFFFFF'
                    }}
                    onClick={() => {
                      addTasks(taskName)
                    }}>
                    Add
                  </Button>
                </div>
                <div>
                  <List>
                    {tasks?.length ? (
                      tasks.map((task, index) => {
                        return (
                          <div
                            style={{ display: 'flex', flexDirection: 'row', marginLeft: '10px' }}
                            key={task?.value || `${task?.taskName}_${index}`}>
                            <span
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                verticalAlign: 'middle',
                                backgroundColor: 'black',
                                paddingRight: '1px !important',
                                width: '7px',
                                height: '7px',
                                margin: '6px 5px 0px 0px',
                                padding: '0px !important'
                              }}>
                              <CloseIcon width="8px" height="8px" color="#FFFFFF" />
                            </span>
                            <Item fontSize="16px" fontWeight="400" lineHeight="20.5px">
                              {task?.taskName}
                            </Item>
                          </div>
                        )
                      })
                    ) : (
                      <TitleText color="#000000" paddingTop="10px" fontSize="16px" lineHeight="20.5px">
                        Create a new task and click add and it will display here
                      </TitleText>
                    )}
                  </List>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', marginTop: '30px' }}>
                  <Button width="63px" buttonHeight="25px" oval type="outlineInverse" onClick={onHide}>
                    BACK
                  </Button>
                  <Button
                    disabled={false}
                    onClick={addTasksToInvoice}
                    width="63px"
                    buttonHeight="25px"
                    oval
                    type="black"
                    margin="0px 0px 0px 10px">
                    SAVE
                  </Button>
                </div>
              </div>
            </DialogContent>
          </MUIDialog>
          <MUIDialog
            onClose={() => onHide()}
            disableEscapeKeyDown
            open={newTasksModal}
            maxWidth="md"
            aria-labelledby="story-preview-modal"
            aria-describedby="story-preview-modal-description">
            <DialogContent dividers>
              <div>
                <TitleText mobile color="#000000" fontSize="16px" lineHeight="18.75px">
                  Create new tasks
                </TitleText>
                <TitleText color="#333333" paddingTop="10px" width="100%" fontSize="16px" lineHeight="18.75px" light>
                  A few of the tasks you are adding are not assigned to you. Please add more details to create them.
                </TitleText>
                {newTasks?.length
                  ? newTasks.map((task, taskIndex) => {
                      return (
                        <div
                          key={`${task?.taskName}`}
                          style={{
                            marginBottom: '20px',
                            borderBottom: '1px solid #CACACA'
                          }}>
                          <div style={{ width: '100%' }}>
                            <TitleText
                              color="#333333"
                              paddingTop="30px"
                              fontSize="14px"
                              lineHeight="24.5px"
                              paddingLeft="10px">
                              {task?.taskName}
                            </TitleText>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <FormField
                              zIndexUnset
                              fieldType="input"
                              type="number"
                              placeholder="Story Points"
                              fontSize="14px"
                              name="story points"
                              width="90px"
                              margin="0px 0px 0px 15px"
                              height="30px  !important"
                              borderRadius="4px"
                              border="1px solid #A5A0A0"
                              value={task?.storyPoints}
                              maxLength="30"
                              min={0}
                              onChange={e => {
                                setNewTasks(prevArray =>
                                  prevArray.map((item, index) =>
                                    index === taskIndex ? { ...item, storyPoints: e?.target.value } : item
                                  )
                                )
                              }}
                              onUpdate={() => {}}>
                              <label
                                style={{
                                  fontFamily: 'Roboto',
                                  fontSize: '14px',
                                  fontWeight: 400,
                                  lineHeight: '25px',
                                  letterSpacing: '0.39998000860214233px',
                                  textAlign: 'center',
                                  color: '#000000'
                                }}>
                                Story Points
                              </label>
                            </FormField>

                            <div
                              style={{ padding: '25px 0px 0px 20px', textDecoration: 'underline' }}
                              onClick={() => {
                                if (detailIndex === taskIndex) {
                                  setDetailIndex(null)
                                } else {
                                  setDetailIndex(taskIndex)
                                }
                              }}>
                              <TitleText
                                color="#1976D2"
                                fontSize="12px"
                                width="100px"
                                lineHeight="24.5px"
                                paddingTop="20px">
                                {detailIndex === taskIndex ? 'COLLAPSE' : 'ADD DETAILS'}
                              </TitleText>
                            </div>
                          </div>
                          {detailIndex === taskIndex ? (
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
                                placeholder="Description..."
                                noMargin
                                height="auto"
                                name="description"
                                textarea
                                width="100%"
                                display="inline !important"
                                value={task?.description}
                                onChange={e => {
                                  setNewTasks(prevArray =>
                                    prevArray.map((item, index) =>
                                      index === taskIndex ? { ...item, description: e?.target.value } : item
                                    )
                                  )
                                }}
                              />
                            </div>
                          ) : (
                            <DarkText color="#333333" fontSize="15px" paddingLeft="10px">
                              {task?.description}
                            </DarkText>
                          )}
                        </div>
                      )
                    })
                  : ''}

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '30px' }}>
                  <Button
                    width="63px"
                    buttonHeight="25px"
                    background="#FFFFFF"
                    colors={{
                      text: '#1976D2',
                      border: '#1976D2'
                    }}
                    onClick={HideNewTasksModal}>
                    CANCEL
                  </Button>
                  <Button
                    disabled={false}
                    onClick={handleSubmit}
                    background="#1976D2"
                    colors={{
                      text: '#FFFFFF',
                      border: '#FFFFFF'
                    }}
                    width="63px"
                    buttonHeight="25px"
                    margin="0px 0px 0px 20px">
                    ADD TASK(S)
                  </Button>
                </div>
              </div>
            </DialogContent>
          </MUIDialog>
        </>
      )}
    </>
  )
}

const mapStateToProps = state => {
  return {
    businessId: state.Business.selectedBusiness?._id,
    freelancerId: state.Auth.user.freelancers,
    projectTasks: state.Tasks.tasks,
    newCreatedTasks: state.Tasks.newCreatedTasks,
    loading: state.Loading.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getTasks: bindActionCreators(getTasks, dispatch),
    createTask: bindActionCreators(createTask, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTasksModal)
