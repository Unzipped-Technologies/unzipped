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
  user,
  isEditing,
  onSubmit,
  submitComments,
  addCommentToStory,
  updateForm,
  assigneeOptions,
  tagOptions,
  taskForm,
  taskPriorityOptions,
  taskStatusOptions
}) => {
  return (
    <MUIDialog
      onClose={onHide}
      disableEscapeKeyDown
      open={open}
      maxWidth="md"
      aria-labelledby="story-preview-modal"
      aria-describedby="story-preview-modal-description">
      <DialogContent dividers>
        <TaskForm
          onHide={onHide}
          content={content}
          user={user}
          taskForm={taskForm}
          isEditing={isEditing}
          onSubmit={onSubmit}
          submitComments={submitComments}
          updateForm={updateForm}
          assigneeOptions={assigneeOptions}
          tagOptions={tagOptions}
          addCommentToStory={addCommentToStory}
          taskPriorityOptions={taskPriorityOptions}
          taskStatusOptions={taskStatusOptions}
        />
      </DialogContent>
    </MUIDialog>
  )
}

export default TicketPreview
