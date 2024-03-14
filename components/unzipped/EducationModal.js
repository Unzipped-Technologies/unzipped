import React, { useEffect, useState, useMemo, useRef } from 'react'
import { Dialog } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import MuiDialogContent from '@material-ui/core/DialogContent'
import ProgressBar from '../ui/ProgressBar'
import { FormField } from '../ui'
import Button from '../ui/Button'
import { TitleText, DarkText } from './dashboard/style'
import CircularProgress from '@material-ui/core/CircularProgress'
import UploadImage from './image-upload/UploadImage'
import CloseIcon from '../icons/close'
import { ConverterUtils } from '../../utils'
import { getFreelancerById, addEducation } from '../../redux/actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Image from '../ui/Image'
import Loading from '../loading'
import DialogActions from '@material-ui/core/DialogActions'
import { DatePicker } from '@mui/x-date-pickers'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import TextField from '@mui/material/TextField'
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

const ProjectModal = ({ open = false, onHide, loading = false, getFreelancerById, addEducation }) => {
  const router = useRouter()
  const { id } = router.query
  const isMobile = window.innerWidth > 680 ? false : true
  const [stage, setStage] = useState(1)
  const [error, setError] = useState({ startYear: '', institute: '', title: '' })

  const [progress, setProgress] = useState(3.34)
  const [files, setFiles] = useState([])
  const [data, setData] = useState({
    title: '',
    institute: '',
    startYear: null,
    endYear: null
  })

  const setValues = (field, value) => {
    setData(prevFilter => {
      const updatedData = { ...prevFilter }

      updatedData[field] = value
      return updatedData
    })
  }

  const handleSubmit = async () => {
    if (data?.title === '' || data?.title === undefined || data?.title === null) {
      setError(prev => ({
        ...prev,
        title: 'Degree title is required.'
      }))
      return false
    } else {
      setError(prev => ({
        ...prev,
        title: ''
      }))
    }
    if (!data?.institute) {
      setError(prev => ({
        ...prev,
        institute: 'Institute is required.'
      }))
      return false
    } else {
      setError(prev => ({
        ...prev,
        institute: ''
      }))
    }
    if (+new Date(data.startYear).getFullYear() >= +new Date(data.endYear).getFullYear()) {
      setError(prev => ({
        ...prev,
        startYear: 'Start year should be less than the end year.'
      }))
      return false
    } else {
      setError(prev => ({
        ...prev,
        startYear: ''
      }))
    }
    const educationData = { ...data }
    educationData.startYear = new Date(data.startYear).getFullYear()
    educationData.endYear = new Date(data.endYear).getFullYear()
    await addEducation(educationData)
    await onHide()
    await getFreelancerById(id)
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
                Education Detail
              </TitleText>
              <div className="mt-2">
                <FormField
                  zIndexUnset
                  fieldType="input"
                  type="text"
                  placeholder="Degree title..."
                  fontSize="14px"
                  name="title"
                  width={isMobile ? '100%' : '662px'}
                  height="47px  !important"
                  borderRadius="10px"
                  border="2px solid #CED4DA"
                  value={data.title}
                  maxLength="30"
                  min={0}
                  onChange={e => {
                    setValues('title', e.target.value)
                  }}
                  onUpdate={() => {}}>
                  Degree Title
                </FormField>
                {error?.title && (
                  <TitleText fontSize="10px" lineHeight="10.5px" color="red" margin="40px 0px 0px 0px">
                    {error?.title}
                  </TitleText>
                )}
                <FormField
                  zIndexUnset
                  fieldType="input"
                  type="text"
                  placeholder="Institute..."
                  fontSize="14px"
                  name="institute"
                  margin={`${error?.title ? '10px' : '50px'} 0px 0px 0px`}
                  width={isMobile ? '100%' : '662px'}
                  height="47px  !important"
                  borderRadius="10px"
                  border="2px solid #CED4DA"
                  value={data.institute}
                  maxLength="30"
                  min={0}
                  onChange={e => {
                    setValues('institute', e.target.value)
                  }}
                  onUpdate={() => {}}>
                  Institute
                </FormField>
                {error?.institute && (
                  <TitleText fontSize="10px" lineHeight="10.5px" color="red" margin="40px 0px 0px 0px">
                    {error?.institute}
                  </TitleText>
                )}
                <div
                  style={{
                    width: isMobile ? '100%' : '662px',
                    marginTop: error?.institute ? '10px' : '50px',
                    display: 'flex',
                    justifyContent: 'space-between'
                  }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <div className="inline-flex flex-direction-column">
                      <TitleText fontSize="14px" lineHeight="24.5px" margin="0px 0px 5px 0px">
                        Start Year
                      </TitleText>
                      <DatePicker
                        openTo="year"
                        views={['year']}
                        name="startYear"
                        disableFuture
                        className="custom-input"
                        value={data.startYear}
                        maxDate={data.endYear}
                        onChange={newValue => {
                          setValues('startYear', newValue)
                        }}
                      />
                      {error?.startYear && (
                        <TitleText fontSize="14px" lineHeight="24.5px" color="red" margin="0px 0px 5px 0px">
                          {error?.startYear}
                        </TitleText>
                      )}
                    </div>
                  </LocalizationProvider>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <div className="inline-flex flex-direction-column">
                      <TitleText fontSize="14px" lineHeight="24.5px" margin="0px 0px 5px 0px">
                        End Year
                      </TitleText>
                      <DatePicker
                        openTo="year"
                        views={['year']}
                        name="endYear"
                        disableFuture
                        className="custom-input"
                        value={data.endYear}
                        minDate={data.startYear}
                        onChange={newValue => {
                          setValues('endYear', newValue)
                        }}
                      />
                    </div>
                  </LocalizationProvider>
                </div>

                {/* <FormField
                  zIndexUnset
                  fieldType="input"
                  type="text"
                  placeholder="Years..."
                  fontSize="14px"
                  name="projectRole"
                  margin="50px 0px 0px 0px"
                  width={isMobile ? '100%' : '662px'}
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
                </FormField> */}
              </div>
            </div>
          </DialogContent>
          <MUIDialogActions>
            <Button oval type="outlineInverse2" width="220px !important" extraWide onClick={onHide}>
              Cancel
            </Button>

            <Button width="120px !important" oval type="black" height="42px" extraWide onClick={handleSubmit}>
              SAVE
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
    getFreelancerById: bindActionCreators(getFreelancerById, dispatch),
    addEducation: bindActionCreators(addEducation, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectModal)
