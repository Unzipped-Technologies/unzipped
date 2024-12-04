import React, { useState } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Dialog } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import MuiDialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

import Button from '../../ui/Button'
import { DIV, TitleText } from './style'
import { deleteTag, getDepartmentById, updateTag } from '../../../redux/actions'
import { styled } from '@mui/material/styles'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import { IoMdArrowRoundBack } from 'react-icons/io'

const MUIDialog = withStyles(theme => ({
  paper: {
    width: '100%',
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    color: 'blue',
    border: '2px solid  #ffff',
    borderRadius: '12px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.4)'
  },
  root: {
    padding: '0px !important'
  }
}))(Dialog)

const StyledDiagTitle = styled(DialogTitle)(({ theme }) => ({
  '& h2': {
    fontSize: '1.2rem',
    color: 'blue'
  }
}))

const DialogContent = withStyles(theme => ({
  root: {
    margin: '0px !important',
    paddingBottom: '30px',
    fontFamily: 'Roboto',
    fontWeight: '400'
  }
}))(MuiDialogContent)

const STATUS_OPTIONS_ARR = ['To Do', 'In Progress', 'Done', 'Doing']

const UpdateTagModal = ({ open, onHide, departmentData, getDepartmentById,deleteTag,updateTag }) => {
  const isMobileView = window.innerWidth <= 680
  const [selectedTag, setSelectedTag] = useState(null)
  const [isDeleteButtonEnabled, setisDeleteButtonEnabled] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [error,setError] = useState('')
  
  const tagsList = departmentData?.departmentTags.filter(item => !STATUS_OPTIONS_ARR.includes(item.tagName))
  const tagsOptions = tagsList ? tagsList.map(item => item.tagName) : []
  
  const updateTags = async tag => {
    if (tagsOptions.includes(tag.tagName) || STATUS_OPTIONS_ARR.includes(tag.tagName)) {
      setError("Tag name already exists");
      return;
    }
    setError('');
    await  updateTag(tag._id, tag)
    await  onHide()
    await  getDepartmentById(departmentData?._id) 
  }

  const deleteTags = async tag => {
    await deleteTag(tag._id)
    await onHide()
    await getDepartmentById(departmentData?._id)   
  }

  return (
    <MUIDialog
      onClose={() => onHide()}
      disableEscapeKeyDown
      open={open}
      aria-labelledby="story-preview-modal"
      aria-describedby="story-preview-modal-description">
      <StyledDiagTitle
        id="tag-dialog-title"
        sx={{
          display: 'flex',
          alignItems: 'center',
          padding:isMobileView ? '16px 24px 16px 24px' : '25px 24px 25px 24px',
          '& .MuiDialogTitle-root > .MuiTypography-h6': {
            color: '#1976D2 !important',
            fontWeight: isMobileView ? 600 : 700,
          },
          '& .MuiTypography-h6': {
            color: '#1976D2 !important',
            fontWeight: isMobileView ? 600 : 700
          }
        }}>
        <DIV display="flex" alignItems="center" justifyContent="center" gap="12px">
          <IoMdArrowRoundBack
            fontSize="25px"
            onClick={() => {
              onHide()
            }}
          />
          EDIT/DELETE TAG
        </DIV>
      </StyledDiagTitle>

      <DialogContent
        sx={{
          '& .MuiDialogContent-root': {
            paddingBottom: isMobileView ? '20px' : '30px',
            padding: isMobileView ? '8px 18px' : 'initial'
          }
        }}>
        <DIV flex="0 0 auto" boxSizing="border-box">
          <form>
            <DIV width="100%" display={isMobileView ? 'block' : 'flex'}>
              <TitleText
                color="grey"
                titleFontSize="16px"
                lineHeight="normal"
                light
                marginTop="10px"
                width="50px"
                paddingRight="30px">
                Tags:
              </TitleText>

              <DIV display="block" flexDirection="column">
                <Autocomplete
                  value={selectedTag ? selectedTag?.tagName : ''}
                  disablePortal
                  id="status_autocomplete"
                  noOptionsText={isEditing ? ' ' : 'No options'}
                  options={tagsOptions}
                  onChange={(event, value) => {
                    const tags = departmentData?.departmentTags?.find(tag => tag.tagName === value)
                    // setSelectedTag(tags)
                    setSelectedTag(tags || { tagName: value, _id: selectedTag?._id })
                    setIsEditing(true)
                    tags ? setisDeleteButtonEnabled(true) :  setisDeleteButtonEnabled(false)
                  }}
                  sx={{
                    width: isMobileView ? '300px' : '445px',
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
                  renderInput={params => (
                    <TextField
                      {...params}
                      onChange={e => {
                        setSelectedTag(prev => ({
                          ...prev,
                          tagName: e.target.value
                        }))
                        setisDeleteButtonEnabled(false)
                      }}
                    />
                  )}
                />
                {error && (
                  <DIV
                    style={{
                      color: 'red',
                      textAlign: 'left',
                      fontSize: '12px',
                      padding:'5px',
                    }}
                  >
                    {error}
                  </DIV>
            )}
              </DIV>
            </DIV>
          </form>

          <DIV
            width={isMobileView ? '70%' : '96%'}
            margin={isMobileView ? '30px 0px 10px 85px' : '25px 0px 0px 0px'}
            display="flex"
            justifyContent={isMobileView ? 'center' : 'flex-end'}
            alignItems={isMobileView ? 'center' : 'flex-end'}
            gap={isMobileView ? '10px' : '0px'}>
            <Button
              disabled={!isDeleteButtonEnabled}
              onClick={() => {
                if (selectedTag) {
                  deleteTags(selectedTag)
                }
              }}
              margin={isMobileView ? '0px 0px 7px 0px' : '0px 0px 0px 20px'}
              contentMargin="0px !important"
              type="black"
              fontSize={isMobileView ? "15px" :"12px"}
              boxShadow="0px 1px 3px rgba(0, 0, 0, 0.1)"
              style={{
                borderRadius: '5px',
                padding: isMobileView ? '8px' : '10px'
              }}
              colors={{
                text: '#FFF',
                background: '#E80022',
                border: '1px',
                wideBorder: '#E80022'
              }}
              width={isMobileView ? '100%' : '100px'}>
              Delete
            </Button>
            <Button
              disabled={!isEditing}
              type="outlineInverse"
              fontSize={isMobileView ? "15px" :"12px"}
              contentMargin="0px !important"
              boxShadow="0px 1px 3px rgba(0, 0, 0, 0.1)"
              margin={isMobileView ? '0px 0px 7px 0px' : '0px 0px 0px 8px'}
              borderRadius
              colors={{
                text: '#fff',
                background: '#1976D2',
                border: '1px',
                wideBorder: '#1976D2'
              }}
              style={{
                borderRadius: '5px',
                padding: isMobileView ? '8px' : '10px'
              }}
              width={isMobileView ? '100%' : '100px'}
              onClick={() => {
                updateTags(selectedTag)
              }}>
              Edit
            </Button>
          </DIV>
        </DIV>
      </DialogContent>
    </MUIDialog>
  )
}

const mapStateToProps = state => {
  return {
    departmentData: state.Departments.selectedDepartment
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getDepartmentById: bindActionCreators(getDepartmentById, dispatch),
    deleteTag: bindActionCreators(deleteTag, dispatch),
    updateTag: bindActionCreators(updateTag, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateTagModal)
