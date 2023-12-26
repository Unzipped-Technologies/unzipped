import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import MuiDialogContent from '@material-ui/core/DialogContent'
import MuiDialogActions from '@material-ui/core/DialogActions'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Typography from '@material-ui/core/Typography'
import styled, { css } from 'styled-components'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import { TIME_OPTIONS, WHO_CAN_SCHEDULE } from '../../constants/schedule'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
const DialogDescription = styled.div`
  color: #000;
  font-size: 16px;
  font-style: normal;
  line-height: normal;
  font-weight: 300;
  margin-bottom: 30px;
  text-align: justify;
`

const StartTime = styled.div`
  display: flex;
  flex-direction: column;
  width: 178px;
  height: 50px;
`
const EndTime = styled.div`
  display: flex;
  flex-direction: column;
  width: 178px;
  height: 50px;
  margin-left: 40px;
`

const ChooseField = styled.div`
  display: flex;
  flex-direction: column;
  width: 700px;
  display: flex;
  height: 50px;
  margin-top: 30px;
`

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    fontWeight: 'bold'
  },
  formControl: {},
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
})

const CustomDialog = styled(Dialog)`
  /* Your custom styles here */
  .MuiDialog-paperWidthMd {
    /* Override styles for the Paper component inside the Dialog */
    width: 831px;
    height: 515px;
    flex-shrink: 0;
    padding: 20px 20px 20px 20px;
  }
`

// Custom styles for the Dialog component
const StyledDialog = withStyles({
  root: {
    // Your custom styles go here
    // For example, you can set a custom width or other styles
    height: '1200'
  }
})(CustomDialog)

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other} style={{ paddingBottom: '0px' }}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  )
})

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    border: 'none'
  }
}))(MuiDialogContent)

const DialogActions = withStyles(theme => ({
  root: {
    marginBottom: 30,
    marginTop: 10,
    padding: theme.spacing(1)
  }
}))(MuiDialogActions)

export default function AvailabilitySchedule({ isModalOpen, closeModal }) {
  const handleClose = () => {
    closeModal()
  }

  return (
    <StyledDialog
      maxWidth="md"
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={isModalOpen}
      style={{
        padding: '20px',
        height: '800px'
      }}>
      <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        Select Your Available Times
      </DialogTitle>
      <DialogContent dividers>
        <DialogDescription>
          Select your working hours and the times you will likely be available for an interview. You will always receive
          an optional request fromthe client for interviews.
        </DialogDescription>
        <div style={{ display: 'flex', flexDirection: 'row', zIndex: 0 }}>
          <FormControl>
            <StartTime>
              <label
                htmlFor="startTime"
                style={{
                  color: '#000',
                  fontFamily: 'Roboto',
                  fontSize: '18px',
                  fontStyle: 'normal',
                  fontWeight: '500',
                  lineHeight: 'normal'
                }}>
                Start Time
              </label>
              <Select
                native
                value={'12:00 AM'}
                onChange={() => {}}
                inputProps={{
                  name: 'startTime',
                  id: 'startTime'
                }}
                style={{
                  flex: 1,
                  height: '100%',
                  borderRadius: '4px',
                  border: '1px solid #ced4da',
                  padding: '10.8px 26.8px 10.8px 14.8px'
                }}>
                {TIME_OPTIONS?.map((time, index) => (
                  <option value={time} key={`start_${time}_${index}`}>
                    {time}
                  </option>
                ))}
              </Select>
            </StartTime>
          </FormControl>
          <FormControl>
            <EndTime>
              <label
                htmlFor="endTime"
                style={{
                  color: '#000',
                  fontFamily: 'Roboto',
                  fontSize: '18px',
                  fontStyle: 'normal',
                  fontWeight: '500',
                  lineHeight: 'normal'
                }}>
                End Time
              </label>
              <Select
                native
                value={'1:00 AM'}
                onChange={() => {}}
                inputProps={{
                  name: 'endTime',
                  id: 'endTime'
                }}
                style={{
                  flex: 1,
                  height: '100%',
                  borderRadius: '4px',
                  border: '1px solid #ced4da',
                  padding: '10.8px 26.8px 10.8px 14.8px'
                }}>
                {TIME_OPTIONS?.map((time, index) => (
                  <option value={time} key={`${time}_${index}`}>
                    {time}
                  </option>
                ))}
              </Select>
            </EndTime>
          </FormControl>
        </div>
        <FormControl>
          <ChooseField>
            <label
              htmlFor="endTime"
              style={{
                color: '#000',
                fontFamily: 'Roboto',
                fontSize: '18px',
                fontStyle: 'normal',
                fontWeight: '500',
                lineHeight: 'normal',
                margin: '25px 0px 0px 0px'
              }}>
              Who can schedule Interviews with you?
            </label>
            <Select
              native
              value={'Only clients whose projects I have applied to'}
              onChange={() => {}}
              inputProps={{
                name: 'endTime',
                id: 'endTime'
              }}
              style={{
                flex: 1,
                height: '100%',
                borderRadius: '4px',
                border: '1px solid #ced4da',
                padding: '10.8px 26.8px 10.8px 14.8px'
              }}>
              {WHO_CAN_SCHEDULE?.map((item, index) => (
                <option value={item} key={`${item}_${index}`}>
                  {item}
                </option>
              ))}
            </Select>
          </ChooseField>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          onClick={handleClose}
          color="primary"
          style={{
            color: '#1976D2',
            textAlign: 'center',
            fontFamily: 'Roboto',
            fontSize: '15px',
            fontStyle: 'normal',
            fontWeight: 500,
            lineHeight: '24.5px' /* 163.333% */,
            letterSpacing: '0.4px',
            textTransform: 'uppercase',
            borderRadius: '5px',
            border: '1px solid #1976D2',
            background: 'rgba(255, 255, 255, 0.00)'
          }}>
          Cancel
        </Button>
        <Button
          autoFocus
          onClick={handleClose}
          color="primary"
          style={{
            borderRadius: '5px',
            background: '#1976D2',
            color: '#FFF',
            textAlign: 'center',
            fontFamily: 'Roboto',
            fontSize: '15px',
            fontStyle: 'normal',
            fontWeight: 500,
            lineHeight: '24.5px' /* 163.333% */,
            letterSpacing: '0.4px',
            textTransform: 'uppercase'
          }}>
          Update
        </Button>
      </DialogActions>
    </StyledDialog>
  )
}
