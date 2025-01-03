import React, { useEffect, useState } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Dialog } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import MuiDialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

import Button from '../../ui/Button'
import { FormField } from '../../ui'
import { DIV } from './style'

import { updateCreateTagForm, resetTagForm, createTag, getDepartmentById } from '../../../redux/actions'
import { styled } from '@mui/material/styles'

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

const TagModal = ({ open, updateCreateTagForm, onHide, createTag, departmentId, tagForm, getDepartmentById , departmentData}) => {
  const [isButtonEnabled, setIsButtonEnabled] = useState(true)
  const isMobileView = window.innerWidth <= 680
  const [error,setError] = useState('')
  const tagsList = departmentData?.departmentTags?.map(tag => tag.tagName)
  
  useEffect(() => {
    updateCreateTagForm({
      departmentId: departmentId,
      tagName: ' ',
      isActive: true,
      isArchived: false
    })
  }, [departmentId])

  const updateForm = (field, value) => {
    updateCreateTagForm({
      [`${field}`]: value
    })
  }

  useEffect(() => {
    if (!tagForm.tagName.trim()) {
      setIsButtonEnabled(false)
    } else {
      setIsButtonEnabled(true)
    }
  }, [tagForm.tagName])

  const onSubmit = async () => {
    if (!tagForm.tagName.trim()) return
    if (tagsList.includes(tagForm.tagName)) {
      setError("Tag name already exists");
      return;
    }
    setError('');
    await createTag(tagForm)
    await getDepartmentById(departmentId)
    await onHide()
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
          '& .MuiDialogTitle-root > .MuiTypography-h6': {
            color: 'blue !important',
            fontWeight: isMobileView ? 600 : 700
          },
          '& .MuiTypography-h6': {
            color: 'blue !important',
            fontWeight: isMobileView ? 600 : 700
          }
        }}>
        CREATE TAG
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
            <DIV display="flex" margin="5px 0px 15px 0px" alignItems="center">
              <FormField
                zIndexUnset
                placeholder="Tag Name"
                fontFamily="Roboto"
                fieldType="input"
                margin="5px 0px 6px 0px"
                name="tagName"
                id="tagName"
                fontSize="14px"
                borderColor="red"
                noMargin
                width="100%"
                maxLength={'20'}
                height="36px !important"
                onChange={e => updateForm('tagName', e?.target?.value.trim())}
                value={tagForm?.tagName.trim()}
                clickType="tagName"
                fontWeight="12px"
                onUpdate={() => {}}>
                Tag Name
              </FormField>
            </DIV>

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

          </form>

          <DIV
            width="100%"
            margin={isMobileView ? "40px 0px 10px 0px" : "48px 0px 0px 0px"}
            display={isMobileView ? "block" : "flex"}
            justifyContent={isMobileView ? "center" : "flex-end"}
            flexDirection={isMobileView ? "column" : "row"}
            alignItems={isMobileView? "center" : "flex-end"}
            gap={isMobileView? '0px' :'5px'}
          >
            <Button
              disabled={!isButtonEnabled}
              onClick={async () => {
                await onSubmit()
              }}
              margin={isMobileView ? "0px 0px 7px 0px" : "0px 0px 0px 20px"}
              contentMargin="0px !important"
              type="black"
              fontSize="15px"
              boxShadow="0px 1px 3px rgba(0, 0, 0, 0.1)"
              style={{
                borderRadius: '5px',
                padding: isMobileView ? '6px' : '8px'
              }}
              colors={{
                text: '#FFF',
                background: '#1976D2',
                border: '1px',
                wideBorder: '#1976D2'
              }}
              width={isMobileView ?'100%' : '125px'}
            >
              Save
            </Button>

            <Button
              type="outlineInverse"
              fontSize="15px"
              contentMargin="0px !important"
              boxShadow="0px 1px 3px rgba(0, 0, 0, 0.1)"
              borderRadius
              colors={{
                text: '#1976D2',
                background: 'white',
                border: '1px',
                wideBorder: '#1976D2'
              }}
              style={{
                borderRadius: '5px',
                padding: isMobileView ? '6px' : '8px'
              }}
              width={isMobileView ?'100%' : '125px'}
              onClick={() => {
                onHide()
              }}
            >
              Cancel
            </Button>
          </DIV>
        </DIV>
      </DialogContent>
    </MUIDialog>
  )
}

const mapStateToProps = state => {
  return {
    departmentId: state.Departments.selectedDepartment?._id,
    tagForm: state.Tags.createTagForm,
    departmentData: state.Departments.selectedDepartment,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateCreateTagForm: bindActionCreators(updateCreateTagForm, dispatch),
    getDepartmentById: bindActionCreators(getDepartmentById, dispatch),
    resetTagForm: bindActionCreators(resetTagForm, dispatch),
    createTag: bindActionCreators(createTag, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TagModal)
