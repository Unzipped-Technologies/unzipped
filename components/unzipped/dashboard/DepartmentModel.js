import React, { useEffect } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Dialog } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import MuiDialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { DIV } from './style'

import Button from '../../ui/Button'
import { FormField } from '../../ui'

import { updateDepartmentForm, resetDepartmentForm, createDepartment, getProjectsList, updateDepartment } from '../../../redux/actions'

const MUIDialog = withStyles(theme => ({
  paper: {
    width: '100%', // Adjust the width as needed
    height: 'auto'
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

const DepartmentModel = ({
  open,
  updateDepartmentForm,
  onHide,
  createDepartment,
  departmentForm,
  currentBusinessId,
  getProjectsList,
  selectedDepartment,
  isDepartmentEditMode,
  updateDepartment
}) => {

  useEffect(() => {
    updateDepartmentForm({
      businessId: currentBusinessId,
      name: isDepartmentEditMode ? selectedDepartment?.name ?? '' : ''
    })
  }, [currentBusinessId, isDepartmentEditMode])


  const updateForm = (field, value) => {
    updateDepartmentForm({
      [`${field}`]: value
    })
  }


  const onSubmit = async () => {
    if (isDepartmentEditMode) {
      await updateDepartment({ name: departmentForm?.name }, selectedDepartment?._id, true)
    } else {

      await createDepartment(departmentForm)
    }
    await onHide()
  }

  return (
    <MUIDialog
      onClose={() => onHide()}
      disableEscapeKeyDown
      open={open}
      aria-labelledby="story-preview-modal"
      aria-describedby="story-preview-modal-description">
      <DialogTitle id="department-dialog-title">{isDepartmentEditMode ? selectedDepartment?.name : 'Create Department'}</DialogTitle>

      <DialogContent dividers>
        <DIV flex="0 0 auto" boxSizing="border-box">
          <form>
            <DIV display="flex" margin="5px 0px 0px 0px" alignItems="center">
              <FormField
                zIndexUnset
                placeholder="Department Name"
                fieldType="input"
                margin="5px 0px 0px 0px"
                name="name"
                fontSize="14px"
                borderColor="red"
                noMargin
                width="100%"
                height="36px !important"
                onChange={e => updateForm('name', e?.target?.value)}
                value={departmentForm?.name}
                clickType="name"
                onUpdate={() => {}}>
                Name
              </FormField>
            </DIV>
          </form>
          <DIV width="100%" margin="70px 0px 0px 0px" display="flex" alignItems="flex-end" justifyContent="flex-end">
            <DIV>
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
                disabled={false}
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
        </DIV>
      </DialogContent>
    </MUIDialog>
  )
}

const mapStateToProps = state => {
  return {
    departmentForm: state.Departments.createDepartmentForm
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateDepartmentForm: bindActionCreators(updateDepartmentForm, dispatch),
    resetDepartmentForm: bindActionCreators(resetDepartmentForm, dispatch),
    createDepartment: bindActionCreators(createDepartment, dispatch),
    getProjectsList: bindActionCreators(getProjectsList, dispatch),
    updateDepartment: bindActionCreators(updateDepartment, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DepartmentModel)
