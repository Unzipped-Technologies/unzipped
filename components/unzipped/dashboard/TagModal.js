import React, { useEffect } from 'react'
import styled from 'styled-components'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Dialog } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import MuiDialogContent from '@material-ui/core/DialogContent'

import Button from '../../ui/Button'
import { FormField } from '../../ui'
import { TitleText } from './style'

import { updateCreateTagForm, resetTagForm, createTag } from '../../../redux/actions'

const StyledCheckboxInput = styled.input`
  display: none; /* Hide the default checkbox */
`

const StyledCustomCheckbox = styled.input`
  width: 20px;
  height: 20px;
  border: 2px solid #3f51b5 !important;
  border-radius: 4px;
  margin: ${({ margin }) => (margin ? margin : '0px')};
  background-color: ${props => (props.checked ? '#3f51b5 !important' : 'transparent')};
  outline: none;
  opacity: 1 !important; /* Override Materialize CSS opacity */
  transition: background-color 0.3s !important;

  ${StyledCheckboxInput}:checked + & {
    background-color: #3f51b5 !important;
  }

  &:hover {
    border-color: #303f9f !important;
  }
`

const MUIDialog = withStyles(theme => ({
  paper: {
    width: '100%' // Adjust the width as needed
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

const TagModal = ({ open, updateCreateTagForm, onHide, createTag, departmentId, tagForm }) => {
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

  const onSubmit = async () => {
    await createTag(tagForm)
    await onHide()
  }

  return (
    <MUIDialog
      onClose={() => onHide()}
      disableEscapeKeyDown
      open={open}
      aria-labelledby="story-preview-modal"
      aria-describedby="story-preview-modal-description">
      <DialogContent dividers>
        <div
          style={{
            flex: '0 0 auto',
            boxSizing: 'border-box'
          }}>
          <div
            style={{
              width: '100%',
              marginLeft: '24px',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'flex-end'
            }}>
            <div style={{}}>
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
                margin="0px 37px 0px 20px"
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
            </div>
          </div>
          <form>
            <div style={{ display: 'flex', marginTop: '5px', alignItems: 'center' }}>
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
                onChange={e => updateForm('tagName', e?.target?.value)}
                value={tagForm?.tagName}
                clickType="tagName"
                onUpdate={() => {}}
              />
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '10px',
                width: '100%'
              }}>
              <div style={{ width: '50%' }}>
                <label style={{ width: '200px', display: 'flex', alignItems: 'center' }} htmlFor="status-checkbox">
                  <TitleText
                    color="#000"
                    titleFontSize="16px"
                    width="50px"
                    lineHeight="normal"
                    light
                    marginTop="12px"
                    paddingRight="5px">
                    Status:
                  </TitleText>
                  <StyledCustomCheckbox
                    type="checkbox"
                    checked={tagForm?.isActive}
                    onChange={e => updateForm('isActive', e?.target?.checked)}
                    id="status-checkbox"
                    margin="0px 0px 0px 70px"
                  />
                </label>
              </div>
              <div
                style={{
                  width: '50%'
                }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end'
                  }}>
                  <label style={{ display: 'flex', alignItems: 'center' }} htmlFor="archived-checkbox">
                    <TitleText
                      color="#000"
                      titleFontSize="16px"
                      lineHeight="normal"
                      light
                      marginTop="12px"
                      marginRight="40px">
                      Archived:
                    </TitleText>
                    <StyledCustomCheckbox
                      type="checkbox"
                      checked={tagForm?.isArchived}
                      onChange={e => updateForm('isArchived', e?.target?.checked)}
                      id="archived-checkbox"
                      margin="0px 0px 0px 90px"
                    />
                  </label>
                </div>
              </div>
            </div>
          </form>
        </div>
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
    resetTagForm: bindActionCreators(resetTagForm, dispatch),
    createTag: bindActionCreators(createTag, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TagModal)
