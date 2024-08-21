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

const MUIDialog = withStyles(theme => ({
  paper: {
    width: '100%', // Adjust the width as needed
    // height: '250px'
  },
  root: {
    padding: '0px !important'
  }
}))(Dialog)

const DialogContent = withStyles(theme => ({
  root: {
    margin: '0px !important',
    paddingBottom: '60px'
  }
}))(MuiDialogContent)

const TagModal = ({ open, updateCreateTagForm, onHide, createTag, departmentId, tagForm, getDepartmentById }) => {
  const [isTagOpAllowed, setIsTagOpAllowed] = useState(true)

  useEffect(() => {
    updateCreateTagForm({
      departmentId: departmentId,
      tagName: ' ',
      isActive: true,
      isArchived: false
    })
  }, [departmentId])

  useEffect(() => {
    if (!tagForm.tagName.trim()) {
      setIsTagOpAllowed(false);
    }
    else {
      setIsTagOpAllowed(true);
    }
  }, [tagForm.tagName])

  const updateForm = (field, value) => {
    updateCreateTagForm({
      [`${field}`]: value
    })
  }

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
      <DialogTitle id="tag-dialog-title">Create Tag</DialogTitle>

      <DialogContent dividers>
        <DIV flex="0 0 auto" boxSizing="border-box">
          <form>
            <DIV display="flex" margin="5px 0px 0px 0px" alignItems="center">
              <FormField
                zIndexUnset
                placeholder="Tag Name"
                fieldType="input"
                margin="5px 0px 0px 0px"
                name="tagName"
                fontSize="14px"
                borderColor="red"
                noMargin
                width="100%"
                height="36px !important"
                onChange={e => updateForm('tagName', e?.target?.value.trim())}
                value={tagForm?.tagName.trim()}
                clickType="tagName"
                onUpdate={() => {}}>
                Tag Name
              </FormField>
            </DIV>
          </form>
          <DIV width="100%" margin="70px 0px 0px 0px" display="flex" alignItems="flex-end" justifyContent="flex-end">
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
              disabled={!isTagOpAllowed}
              onClick={async () => {
                await onSubmit()
              }}
              width="58.25px"
              extraWide
              margin="0px 0px 0px 20px"
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
