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

const TagModal = ({ open, updateCreateTagForm, onHide, createTag, departmentId, tagForm, getDepartmentById }) => {
  const [isButtonEnabled, setIsButtonEnabled] = useState(true)

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
            color: ' blue !important',
            fontWeight: 700
          },
          '& .MuiTypography-h6': {
            color: ' blue !important',
            fontWeight: 700
          }
        }}>
        CREATE TAG
      </StyledDiagTitle>

      <DialogContent>
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
          </form>
          <DIV width="100%" margin="48px 0px 0px 0px" display="flex" alignItems="flex-end" justifyContent="flex-end">
            <Button
              width="125px"
              type="outlineInverse"
              fontSize="15px"
              contentMargin="0px !important"
              boxShadow="0px 4px 6px rgba(0, 0, 0, 0.1)"
              borderRadius
              colors={{
                text: '#1976D2',
                background: 'white',
                border: '1px',
                wideBorder: '#1976D2'
              }}
              style={{
                borderRadius: '5px',
                padding: '8px'
              }}
              onClick={() => {
                onHide()
              }}>
              CANCEL
            </Button>

            <Button
              disabled={!isButtonEnabled}
              onClick={async () => {
                await onSubmit()
              }}
              margin="0px 0px 0px 20px"
              width="125px"
              contentMargin="0px !important"
              type="black"
              fontSize="15px"
              boxShadow="0px 4px 6px rgba(0, 0, 0, 0.1)"
              style={{
                borderRadius: '5px',
                padding: '8px'
              }}
              colors={{
                text: '#FFF',
                background: '#1976D2',
                border: '1px',
                wideBorder: '#1976D2'
              }}>
              Save
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
    tagForm: state.Tags.createTagForm
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
