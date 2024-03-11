import React, { useEffect, useState, useMemo, useRef } from 'react'
import { Dialog } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import MuiDialogContent from '@material-ui/core/DialogContent'
import styled from 'styled-components'
import ProgressBar from './../ui/ProgressBar'
import { FormField } from './../ui'
import Button from './../ui/Button'
import { TitleText, DarkText, Absolute, HeadingText } from './dashboard/style'
import CircularProgress from '@material-ui/core/CircularProgress'
import UploadImage from './image-upload/UploadImage'
import CloseIcon from '../icons/close'
import { ConverterUtils } from '../../utils'
import { createShowCaseProject } from '../../redux/actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Image from './../ui/Image'

const MUIDialog = withStyles(theme => ({
  paper: {
    width: '100%',
    height: '1071px !important',
    margin: '0px !important',
    borderRadius: '25px'
  },
  root: {}
}))(Dialog)

const DialogContent = withStyles(theme => ({
  root: {
    display: 'flex !important',
    flexDirection: 'column  !important',
    flexWrap: 'wrap !important', // Enable wrapping
    maxWidth: 'unset !important', // Remove default max-width
    width: '85% !important', // Fill remaining dialog space
    padding: theme.spacing(2),
    margin: '0px auto'
  }
}))(MuiDialogContent)
const ProjectModal = ({
  open = false,
  onHide,
  loading = false,
  createShowCaseProject,
  getTasks,
  businessId,
  freelancerId,
  projectTasks,
  createTask,
  newCreatedTasks
}) => {
  const [stage, setStage] = useState(1)
  const [progress, setProgress] = useState(3.34)
  const [files, setFiles] = useState([])
  const [skillName, setSkill] = useState('')
  const [data, setData] = useState({
    projectName: '',
    role: '',
    skills: []
  })
  const nextStep = () => {
    setStage(preValue => (preValue += 1))
    setProgress(preValue => (preValue += 3.33))
  }

  const goBack = step => {
    if (stage > 1) {
      setStage(preValue => (preValue -= 1))
      setProgress(preValue => (preValue -= 3.33))
    } else {
      router.push('/dashboard')
    }
  }

  const setValues = (field, value) => {
    setData(prevFilter => {
      const updatedData = { ...prevFilter }

      if (Array.isArray(updatedData[field])) {
        if (!Array.isArray(value) && !updatedData[field].includes(value)) {
          updatedData[field].push(value)
        } else {
          updatedData[field] = value
        }
      } else {
        updatedData[field] = value
      }

      return updatedData
    })
  }

  const handleSubmit = async () => {
    if (stage < 3) {
      nextStep()
    } else {
      const formData = new FormData()
      for (var field in data) {
        formData.append(field, data[field])
      }
      if (files?.length) {
        for (var file in files) {
          formData.append(`projectImages`, files[file])
        }
      }
      await createShowCaseProject(formData)
    }
  }

  const stepContent = () => {
    switch (stage) {
      case 1:
        return (
          <div className="mt-5">
            <FormField
              zIndexUnset
              fieldType="input"
              type="text"
              placeholder="Describe your project here..."
              fontSize="14px"
              name="projectName"
              width="662px"
              height="47px  !important"
              borderRadius="10px"
              border="2px solid #CED4DA"
              value={data.projectName}
              maxLength="30"
              min={0}
              onChange={e => {
                setValues('projectName', e.target.value)
              }}
              onUpdate={() => {}}>
              Project Name
            </FormField>
            <FormField
              zIndexUnset
              fieldType="input"
              type="text"
              placeholder="Enter your role here..."
              fontSize="14px"
              name="projectRole"
              margin="70px 0px 0px 0px"
              width="662px"
              height="47px  !important"
              borderRadius="10px"
              border="2px solid #CED4DA"
              value={data.role}
              maxLength="30"
              min={0}
              onChange={e => {
                setValues('role', e.target.value)
              }}
              onUpdate={() => {}}>
              Role On Project
            </FormField>
          </div>
        )
      case 2:
        return (
          <div style={{ marginTop: '70px' }}>
            <div className="d-flex flex-wrap overflow-scroll">
              {data.skills?.length
                ? data.skills.map(skill => {
                    return (
                      <div
                        style={{
                          width: '66px',
                          height: '25px',
                          borderRadius: '4px',
                          backgroundColor: '#D9D9D9',
                          display: 'flex',
                          flexDirection: 'row',
                          marginBottom: '20px',
                          marginLeft: '10px',
                          overflow: 'scroll'
                        }}>
                        <span
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'black',
                            paddingRight: '1px !important',
                            width: '13px',
                            height: '10px',
                            marginTop: '9px',
                            marginLeft: '5px',
                            marginRight: '7px'
                          }}>
                          <CloseIcon width="7px" height="7px" color="#FFFFFF" />
                        </span>
                        <TitleText fontSize="16px" color="#000000" lineHeight="24.5px">
                          {skill}
                        </TitleText>
                      </div>
                    )
                  })
                : ''}
            </div>
            <div className="d-flex">
              <FormField
                zIndexUnset
                fieldType="input"
                type="text"
                placeholder="Type a skill and hit enter..."
                fontSize="14px"
                name="skills"
                width="662px"
                height="47px  !important"
                borderRadius="10px"
                border="2px solid #CED4DA"
                value={skillName}
                maxLength="30"
                min={0}
                onChange={e => {
                  setSkill(e.target.value)
                }}
                onKeyDown={e => {
                  if (e?.keyCode === 13 && e.target.value && data.skills?.length < 20) {
                    setValues('skills', e.target.value)
                    setSkill('')
                  }
                }}
                onUpdate={() => {}}
              />
              <Button
                width="74px"
                height="47px"
                noBorder
                margin="0px 0px 0px 10px"
                colors={{
                  background: '#BA68C8',
                  text: '#FFFFFF'
                }}
                onClick={() => {
                  if (skillName && data.skills?.length < 20) {
                    setValues('skills', skillName)
                    setSkill('')
                  }
                }}>
                Add
              </Button>
            </div>
          </div>
        )
      case 3:
        return (
          <div style={{ marginTop: files?.length ? '0px' : '70px' }}>
            <TitleText fontSize="16px" lineHeight="18.75px" color="#333333">
              Upload a photo here to represent your project. This will display in the projects section of your profile.
            </TitleText>
            <UploadImage setFiles={setFiles} files={files} accept="image/*" />
            <div className="mt-3 d-flex mb-3">
              {files?.length
                ? files.map(file => (
                    <div style={{ width: '151px', height: '120px', overflow: 'hidden', marginLeft: '10px' }}>
                      <div className="d-flex w-10 items-center" style={{ backgroundColor: '#F0F0F0', height: '24px' }}>
                        <TitleText fontSize="18px" lineHeight="21.09px">
                          {ConverterUtils.truncateString(file?.name, '13')}
                        </TitleText>
                        <span
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'black',
                            paddingRight: '1px !important',
                            width: '13px',
                            height: '10px',
                            marginTop: '9px',
                            marginLeft: '5px',
                            marginRight: '7px'
                          }}>
                          <CloseIcon width="7px" height="7px" color="#FFFFFF" />
                        </span>
                      </div>
                      <img
                        src={URL.createObjectURL(file)}
                        alt="logo"
                        className="w-100 h-100"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'fill'
                        }}
                      />
                    </div>
                  ))
                : ''}
            </div>
          </div>
        )
    }
  }
  return (
    <>
      {window.innerWidth > 680 ? (
        <>
          {loading && <Loading />}
          <MUIDialog
            onClose={() => onHide()}
            disableEscapeKeyDown
            open={open}
            maxWidth="md"
            aria-labelledby="story-preview-modal"
            aria-describedby="story-preview-modal-description">
            <DialogContent dividers>
              <Image src="/img/Unzipped-Primary-Logo.png" alt="logo" width="200px" />
              <ProgressBar value={progress} width={100} showValue bar="#37DEC5" />
              <div className="mt-3">
                <TitleText fontWeight="500" lineHeight="25.78px" fontSize="22px">
                  Project {stage === 3 ? 'Image' : 'Details'}
                </TitleText>
                {stepContent()}
              </div>
              <Absolute bottom={'50px'} right={'50px'} gap="10px">
                {stage > 1 ? (
                  <>
                    <Button oval type="outlineInverse2" width="220px !important" extraWide onClick={goBack}>
                      BACK
                    </Button>
                  </>
                ) : (
                  <Button width="120px !important" oval type="outlineInverse" height="42px" extraWide onClick={onHide}>
                    Cancel
                  </Button>
                )}
                <Button
                  disabled={loading}
                  onClick={handleSubmit}
                  width="120px !important"
                  height="42px"
                  extraWide
                  oval
                  type="black">
                  {stage === 3 ? 'SUBMIT' : 'Next'}
                </Button>
              </Absolute>
              {/* <div style={{ marginTop: '20px' }}>
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
              </div> */}
            </DialogContent>
          </MUIDialog>
        </>
      ) : (
        <>
          {/* <MUIDialog
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
          </MUIDialog> */}
        </>
      )}
    </>
  )
}

const mapStateToProps = state => {
  return {
    loading: state.Loading?.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createShowCaseProject: bindActionCreators(createShowCaseProject, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectModal)
