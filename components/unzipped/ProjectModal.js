import React, { useEffect, useState, useMemo, useRef } from 'react'
import { Dialog } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import MuiDialogContent from '@material-ui/core/DialogContent'
import ProgressBar from './../ui/ProgressBar'
import { FormField } from './../ui'
import Button from './../ui/Button'
import { TitleText, DarkText } from './dashboard/style'
import CircularProgress from '@material-ui/core/CircularProgress'
import UploadImage from './image-upload/UploadImage'
import CloseIcon from '../icons/close'
import { ConverterUtils } from '../../utils'
import { createShowCaseProject, getFreelancerById } from '../../redux/actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Image from './../ui/Image'
import Loading from '../loading'
import DialogActions from '@material-ui/core/DialogActions'
import { useRouter } from 'next/router'

const MUIDialog = withStyles(theme => ({
  paper: {
    width: 'auto',
    maxWidth: window.innerWidth > 680 ? '952px !important' : '100%',
    height: '611px !important',
    borderRadius: '25px',
    margin: '0px !important',
    padding: '0px !important'
  },
  root: {}
}))(Dialog)

const DialogContent = withStyles(theme => ({
  root: {
    display: 'flex !important',
    flexDirection: 'column !important',
    width: window.innerWidth > 680 ? '748px !important' : `${window.innerWidth}px`,
    padding: theme.spacing(2),
    border: '0px !important',

    marginLeft: window.innerWidth > 680 ? '98px !important' : '0px !important',
    marginRight: window.innerWidth > 680 ? '98px !important' : '0px !important'
  }
}))(MuiDialogContent)

const MUIDialogActions = withStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  }
}))(DialogActions)

const ProjectModal = ({ open = false, onHide, loading = false, createShowCaseProject, getFreelancerById }) => {
  const router = useRouter()
  const { id } = router.query

  const [stage, setStage] = useState(1)
  const [errors, setErrors] = useState({})

  const [progress, setProgress] = useState(3.34)
  const [files, setFiles] = useState([])
  const [skillName, setSkill] = useState('')
  const [data, setData] = useState({
    projectName: '',
    role: '',
    skills: []
  })

  const checkValidationn = () => {
    if (stage === 1) {
      return data.projectName && data.role
    } else if (stage === 2) {
      return data.skills?.length
    } else if (stage === 3) {
      return files?.length
    }
  }

  const nextStep = () => {
    setStage(preValue => (preValue += 1))
    setProgress(preValue => (preValue += 3.33))
  }

  const goBack = () => {
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
        } else if (Array.isArray(value)) {
          updatedData[field] = value
        }
      } else {
        updatedData[field] = value
      }
      return updatedData
    })
  }

  const deleteSkill = skillName => {
    const skills = data.skills.filter(skill => skill !== skillName)
    setValues('skills', skills)
  }

  const removeImage = imageIndex => {
    const images = files.filter((file, index) => index !== imageIndex)
    setFiles(images)
  }

  const handleSubmit = async () => {
    if (stage < 3) {
      nextStep()
    } else {
      const formData = new FormData()
      for (var field in data) {
        if (Array.isArray(data[field])) {
          for (var i = 0; i < data[field].length; i++) {
            formData.append(`skills[${i}]`, data[field][i])
          }
        } else {
          formData.append(field, data[field])
        }
      }
      if (files?.length) {
        for (var file in files) {
          formData.append(`projectImages`, files[file])
        }
      }
      await createShowCaseProject(formData)
      await onHide()
      await getFreelancerById(id)
    }
  }

  const stepContent = (mobile = false) => {
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
              width={mobile ? '100%' : '662px'}
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
              width={mobile ? '100%' : '662px'}
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
              {data?.skills?.length
                ? data?.skills?.map((skill, index) => {
                    return (
                      <div
                        key={`${skill}_${index}`}
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
                            marginTop: mobile ? '8px' : '8px',
                            marginLeft: '5px',
                            marginRight: mobile ? '0px' : '7px'
                          }}
                          onClick={() => {
                            deleteSkill(skill)
                          }}>
                          <CloseIcon width="7px" height="7px" color="#FFFFFF" />
                        </span>
                        <DarkText
                          fontSize="16px"
                          color="#000000"
                          lineHeight="24.5px"
                          topMargin={mobile ? '3px' : '0px !important'}>
                          {skill}
                        </DarkText>
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
                width={mobile ? '100%' : '630px'}
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
          <div style={{ marginTop: files?.length ? '0px' : '70px', marginBottom: '20px' }}>
            <TitleText fontSize="16px" lineHeight="18.75px" color="#333333">
              Upload a photo here to represent your project. This will display in the projects section of your profile.
            </TitleText>
            <UploadImage setFiles={setFiles} files={files} accept="image/*" />
            <div className="mt-3 d-flex mb-3">
              {files?.length
                ? files?.map((file, index) => (
                    <div
                      style={{ width: '151px', height: '120px', overflow: 'hidden', marginLeft: '10px' }}
                      key={`${file?.name}_${index}`}>
                      <div className="d-flex w-10 items-center" style={{ backgroundColor: '#F0F0F0', height: '24px' }}>
                        <TitleText fontSize="12px" lineHeight="10.09px" paddingTop={mobile ? '5px' : '5px'}>
                          {ConverterUtils.truncateString(file?.name, mobile ? 6 : 13)}
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
                            marginTop: mobile ? '5px' : '9px',
                            marginLeft: '5px',
                            marginRight: '7px'
                          }}
                          onClick={() => {
                            removeImage(index)
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
      <>
        {loading && <Loading />}
        <MUIDialog
          onClose={() => onHide()}
          disableEscapeKeyDown
          open={open}
          maxWidth="md"
          aria-labelledby="story-preview-modal"
          aria-describedby="story-preview-modal-description">
          <DialogContent>
            <Image src="/img/Unzipped-Primary-Logo.png" alt="logo" width="200px" />
            <ProgressBar value={progress} width={100} showValue bar="#37DEC5" />
            <div className="mt-3 ">
              <TitleText fontWeight="500" lineHeight="25.78px" fontSize="22px">
                Project {stage === 3 ? 'Images' : 'Details'}
              </TitleText>
              {stepContent(window.innerWidth > 680 ? false : true)}
            </div>
          </DialogContent>
          <MUIDialogActions>
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
              disabled={!checkValidationn() || loading}
              onClick={handleSubmit}
              width="120px !important"
              height="42px"
              extraWide
              oval
              type="black">
              {!loading ? stage === 3 ? 'SUBMIT' : 'Next' : <CircularProgress size={18} />}
            </Button>
          </MUIDialogActions>
        </MUIDialog>
      </>
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
    createShowCaseProject: bindActionCreators(createShowCaseProject, dispatch),
    getFreelancerById: bindActionCreators(getFreelancerById, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectModal)
