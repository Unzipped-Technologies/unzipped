import React from 'react'

import { Dialog } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import MuiDialogContent from '@material-ui/core/DialogContent'
import TaskForm from './tasks/TaskForm'

const MUIDialog = withStyles(theme => ({
  paper: {
    width: '100%' // Adjust the width as needed
  },
  root: {
    padding: theme.spacing(2)
  }
}))(Dialog)

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    paddingBottom: '60px'
  }
}))(MuiDialogContent)

const TicketPreview = ({
  open,
  content,
  onHide,
  selectedTaskId,
  isEditing,
  onSubmit,
  submitComments,
  addCommentToStory,
  updateForm,
  assigneeOptions,
  tagOptions,
  taskForm,
  taskPriorityOptions,
  taskStatusOptions,
  isEditable
}) => {
  return (
    <MUIDialog
      onClose={() => onHide()}
      disableEscapeKeyDown
      open={open}
      maxWidth="md"
      aria-labelledby="story-preview-modal"
      id="task_form_modal"
      aria-describedby="story-preview-modal-description">
      <DialogContent dividers>
        <TaskForm
          onHide={onHide}
          content={content}
          taskForm={taskForm}
          isEditing={isEditing}
          onSubmit={onSubmit}
          selectedTaskId={selectedTaskId}
          isEditable={isEditable}
        />
      </DialogContent>
    </MUIDialog>
  )
}

export default TicketPreview
