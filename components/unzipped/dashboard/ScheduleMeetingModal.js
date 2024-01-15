import React, { useState, useRef, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import styled from 'styled-components'
import { COLORS, getFontStyled, FONT_SIZE, LETTER_SPACING } from '../../ui/TextMaskInput/core/utilities'
import DownArrow from '../../../components/icons/downArrow'
import { SELECT_MEETING_TIME } from '../../../utils/constants'
import dayjs from 'dayjs'
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import { InputLabel, TextField } from '@material-ui/core'
import { Stack } from '@mui/material'
const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '0px',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(5, 5),
    borderRadius: '15px',
    width: '586px',
    height: 'auto'
  },
  focusedInput: {
    '& .MuiInputBase-root.Mui-focused': {
      // Your focused styles go here
      border: '2px solid red' // Example border color on focus
    }
  }
}))

const TextTitleStyled = styled.p`
  color: ${({ color }) => (color ? color : '#000')};
  font-family: Roboto;
  font-size: 20px;
  font-style: normal;
  font-weight: ${({ weight }) => (weight ? weight : 600)};
  line-height: 24.5px;
  letter-spacing: 0.4px;
  text-transform: capitalize;
`

const InputStyled = styled.input`
  border: 1px solid #d9d9d9;
  padding-left: 15px !important;
  border-radius: 5px;
  :focus {
    box-shadow: none !important;
  }
`

const Label = styled.span`
  display: block;
  ${({ color, fontSize, fontWeight }) =>
    getFontStyled({
      color: color || COLORS.black,
      fontSize: fontSize || FONT_SIZE.PX_12,
      fontWeight: fontWeight || 500,
      fontStyle: 'normal',
      lineHeight: FONT_SIZE.PX_16,
      letterSpacing: LETTER_SPACING
    })};
  margin-top: 0px;
  margin-bottom: 6px;
`

const CancelButtonStyled = styled.button`
  background: #fff;
  color: #1976d2;
  border: 1px solid #1976d2;
  text-transform: uppercase;
  font-size: 15px;
  letter-spacing: 0.4px;
  text-align: center;
  padding-left: 15px;
  padding-right: 15px;
  border-radius: 5px;
  font-family: Roboto;
  font-weight: 500;
  line-height: 24.5px;
`

const AddListButtonStyled = styled.button`
  background: #1976d2;
  color: #fff;
  text-transform: uppercase;
  font-size: 15px;
  letter-spacing: 0.4px;
  text-align: center;
  padding-left: 15px;
  padding-right: 15px;
  border-radius: 5px;
  font-family: Roboto;
  font-weight: 500;
  line-weight: 24.5px;
  border: 0;
  margin-left: 10px;
`

const ScheduleMeetingContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 20px;
`
const SelectionContainer = styled.div`
  position: relative;
  display: inline-block;
  border: 1px solid #d9d9d9;
  background: rgba(217, 217, 217, 0.28);
  border-radius: 3px;
  padding: 5px;
  width: 100px;
  margin-left: auto;
`

const SelectionButton = styled.div`
    border: none;
    padding: 10px;
    cursor: pointer;
    outline: none;
    border-radius: 3px;
    border: 0.25px solid #D9D9D947;
    background: #D9D9D9;
    
    // &::after{
    //     content : '\2304';
    //     display : block;
    // }

`

const DropdownContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  margin-top: 2px;
  height: 320px;
  overflow: auto;
`

const DropdownItems = styled.div`
  padding: 5px;
  cursor: pointer;
  font-size: 14px;
  line-height: 24.5px;
  text-transform: uppercase;
  font-wight: 500;
  margin-top: 5px;
`

const ScheduleMeetingModal = ({ isModalOpen, setIsModalOpen }) => {
  const classes = useStyles()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef()
  const [startMeetingTime, setStartMeetingTime] = useState('12.00 AM')
  const [endMeetingTime, setEndMeetingTime] = useState('12.30 AM')
  const [value, setValue] = React.useState(dayjs('2022-04-17T15:30'))
  const handleClose = () => {
    setIsModalOpen(false)
  }

  const toggleDropdown = e => {
    setIsOpen(!isOpen)
  }

  const handleClickOutside = event => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false)
    }
  }

  const handleMeetingScheduling = time => {
    setStartMeetingTime(time)
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [])

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={isModalOpen}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}>
        <Fade in={isModalOpen}>
          <div className={classes.paper}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 40
              }}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                <div>
                  <TextTitleStyled> Select Your Available Times </TextTitleStyled>
                </div>
                <div>
                  <Label fontSize="16px" fontWeight="360">
                    Select your working hours and the times you will likely be available for an interview. You will
                    always receive an optional request from the client for interviews.
                  </Label>
                </div>

                {/* <ScheduleMeetingContainer>
                                    <div><Label>Start Time</Label></div>
                                    <div><Label>End Time</Label></div>
                                </ScheduleMeetingContainer> */}

                <ScheduleMeetingContainer>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <div className='d-flex gap-5 mt-5'>
                      <div>
                      <Label fontSize="16px" htmlFor="start-time-1">Start Time</Label>
                        <TimePicker
                          id="start-time-1"
                          minutesStep={30}
                          renderInput={(params) => 
                            <input {...params} placeholder="Select start time" />
                          }
                          sx={{
                            width: 130,
                            input: {
                              borderBottom: '0px solid transparent !important',
                              margin: '0 0 0 6px !important'
                            },
                            button: { background: 'transparent !important' },
                            '&.MuiFocused': {
                            //   borderBottom: '2px solid #4CAF50 !important'
                            }
                          }}
                        />
                      </div>
                      <div>
                      <Label fontSize="16px" htmlFor="end-time">End Time</Label>
                        <TimePicker
                          id="end-time"
                          minutesStep={30}
                          sx={{
                            width: 130,
                            input: {
                              borderBottom: '0px solid transparent !important',
                              margin: '0 0 0 6px !important'
                            },
                            button: { background: 'transparent !important' },
                            '&.MuiFocused': {
                            //   borderBottom: '2px solid #4CAF50 !important'
                            }
                          }}
                        />
                      </div>
                      </div>
                  </LocalizationProvider>
                </ScheduleMeetingContainer>

                <div>
                  <Label>Who can schedule Interviews with you?</Label>
                </div>
                <div>
                  <InputStyled
                    placeholder="Only clients whose jobs I have applied to"
                    style={{
                      border: '1px solid #D9D9D9',
                      borderRadius: '5px'
                    }}
                  />
                </div>
                <div>
                  <TextTitleStyled weight={400} color="#1976D2">
                    Prefer to use Calendly?
                  </TextTitleStyled>
                </div>
                {/* <div>
                                    <SelectionContainer ref={dropdownRef}>
                                        <SelectionButton onClick={toggleDropdown}>
                                            <div style={{ display: 'flex' }}>
                                                <div> {startMeetingTime} </div>
                                                <div style={{ marginLeft: 'auto' }}>
                                                    <DownArrow color="#444444" />
                                                </div>
                                            </div>
                                        </SelectionButton>
                                        {isOpen && (
                                            <DropdownContainer >
                                                {SELECT_MEETING_TIME.map((time) => (
                                                    <DropdownItems onClick={() => handleMeetingScheduling(time)}>{time}</DropdownItems>
                                                ))}

                                            </DropdownContainer>
                                        )}
                                    </SelectionContainer>
                                </div> */}
              </div>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-end'
                }}>
                <CancelButtonStyled onClick={handleClose}>cancel</CancelButtonStyled>
                <AddListButtonStyled onClick={() => console.log('update_meeting_link')}>UPDATE</AddListButtonStyled>
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
    </>
  )
}

export default ScheduleMeetingModal
