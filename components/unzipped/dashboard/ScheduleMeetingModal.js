import React, { useState, useRef, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import styled from 'styled-components'
import { COLORS, getFontStyled, FONT_SIZE, LETTER_SPACING } from '../../ui/TextMaskInput/core/utilities'
import dayjs from 'dayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import TextField from '@mui/material/TextField'

import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import { useDispatch, useSelector } from 'react-redux'
import { createCalendarSetting } from '../../../redux/Auth/actions'
import SetupCalendlyModal from './SetupCalendlyModal'
dayjs.extend(timezone)
dayjs.extend(utc)

// Get the user's timezone
const userTimezone = dayjs.tz.guess()
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
      border: '2px solid red'
    }
  }
}))
const useStylesSM = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '0px',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 2),
    borderRadius: '10px',
    width: '350px',
    height: 'auto'
  },
  focusedInput: {
    '& .MuiInputBase-root.Mui-focused': {
      border: '2px solid red'
    }
  }
}))

const TimePickerStyled = {
  width: 130,
  input: {
    borderBottom: '0px solid transparent !important',
    margin: '0 0 0 6px !important'
  },
  button: { background: 'transparent !important' },
  '&.MuiFocused': {}
}

const TextTitleStyled = styled.p`
  color: ${({ color }) => (color ? color : '#000')};
  font-family: Roboto;
  font-size: 20px;
  font-style: normal;
  font-weight: ${({ weight }) => (weight ? weight : 600)};
  line-height: 24.5px;
  letter-spacing: 0.4px;
  text-transform: capitalize;
  cursor: pointer;
  @media screen and (max-width: 600px) {
    font-size: 18px;
    margin-top: 0px;
    maring-bottom: 0px;
  }
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
      lineHeight: FONT_SIZE.PX_20,
      letterSpacing: LETTER_SPACING
    })};
  margin-top: 0px;
  margin-bottom: 6px;
  font-family: Roboto;
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

// Dropdown for you can schedule meeting

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
`

const DropdownButton = styled.button`
  padding: 10px;
  border: 1px solid #ccc;
  background-color: #fff;
  cursor: pointer;
  width: 100%;
  border-radius: 4px;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  text-align: left;
  &:focus {
    background: #fff !important;
  }
  @media screen and (max-width: 600px) {
    font-size: 14px;
    padding: 8px;
  }
`

const DropdownList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 0;
  margin: 0;
  border: 1px solid #ccc;
  max-height: 200px;
  overflow-y: auto;
  border-radius: 4px;
  background: #fff;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`

const DropdownItem = styled.li`
  padding: 10px;
  list-style: none;
  cursor: pointer;
  background-color: ${({ backgroundColor }) => (backgroundColor ? backgroundColor : 'transparent')};
  &:hover {
    background-color: #dadada; /* Use a default or custom hover color */
  }
`

const options = [
  { label: 'Only clients whose projects I have applied to', value: 'APPLIED_TO_PROJECTS' },
  { label: 'Recruiters, and clients whose jobs I have not applied to', value: 'RECURITERS_OTHERS' },
  { label: 'I do not wish to schedule interviews through the unzipped platform', value: 'DONOT_SCHEDULE_WITH_UNZIPPED' }
]

const ScheduleMeetingModal = ({ isModalOpen, setIsModalOpen, isSmallWindow }) => {
  const classes = isSmallWindow ? useStylesSM() : useStyles()
  const dropdownRef = useRef()
  const textFieldRef = useRef(null)

  const dispatch = useDispatch()
  const { _id } = useSelector(state => state.Auth.user)

  const [isOpen, setIsOpen] = useState(false)
  const [availableFromTime, setAvailableFromTime] = useState(dayjs().hour(9).minute(0).second(0))
  const [availableEndTime, setAvailableEndTime] = useState(dayjs().hour(17).minute(0).second(0))
  const [selectedOption, setSelectedOption] = useState('APPLIED_TO_PROJECTS')
  const [isCalendlyModal, setIsCalendlyModal] = useState(false)

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

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [])

  const handleOptionClick = value => {
    setSelectedOption(value)
    setIsOpen(false)
  }

  const handleCalenderSettings = async () => {
    let calenderSettingObj = {
      startTime: availableFromTime,
      endTime: availableEndTime,
      timezone: userTimezone,
      interviewScheduler: selectedOption
    }

    setIsOpen(false)
    setIsModalOpen(false)
    setSelectedOption('APPLIED_TO_PROJECTS')
    await dispatch(createCalendarSetting(calenderSettingObj))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleCalendlyIntegration = () => {
    setIsModalOpen(false)
    setIsCalendlyModal(true)
  }

  return (
    <>
      <Modal
        data-testid="setup_calender"
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
                  <Label fontSize="16px" fontWeight="400">
                    Select your working hours and the times you will likely be available for an interview. You will
                    always receive an optional request from the client for interviews.
                  </Label>
                </div>

                <ScheduleMeetingContainer>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <div className="d-flex gap-5 mt-3">
                      <div data-testid="calender_start_time">
                        <Label fontSize="16px" fontWeight={600} htmlFor="start-time-1">
                          Start Time
                        </Label>
                        <TimePicker
                          value={availableFromTime}
                          onChange={e => {
                            setAvailableFromTime(dayjs(e))
                          }}
                          id="start-time-1"
                          minutesStep={30}
                          slots={{
                            textField: params => (
                              <TextField {...params} placeholder="Select start time" ref={textFieldRef} />
                            )
                          }}
                          sx={TimePickerStyled}
                          slotProps={{
                            popper: {
                              sx: {
                                '& .MuiList-root': {
                                  height: '200px',
                                  overflow: 'scroll'
                                }
                              }
                            }
                          }}
                        />
                      </div>
                      <div data-testid="calender_end_time">
                        <Label fontSize="16px" fontWeight={600} htmlFor="end-time">
                          End Time
                        </Label>
                        <TimePicker
                          id="end-time"
                          minutesStep={30}
                          sx={TimePickerStyled}
                          value={availableEndTime}
                          onChange={endTime => setAvailableEndTime(endTime)}
                          slots={{
                            textField: params => <TextField {...params} placeholder="Select start time" />
                          }}
                          slotProps={{
                            popper: {
                              sx: {
                                '& .MuiList-root': {
                                  height: '200px',
                                  overflow: 'scroll'
                                }
                              }
                            }
                          }}
                        />
                      </div>
                    </div>
                  </LocalizationProvider>
                </ScheduleMeetingContainer>

                <div style={{ marginTop: 10, marginBottom: 5 }}>
                  <Label fontSize="16px" fontWeight={600}>
                    Who can schedule Interviews with you?
                  </Label>
                </div>
                <div style={{ width: '100%' }}>
                  <DropdownContainer ref={dropdownRef}>
                    <DropdownButton onClick={toggleDropdown} data-testid="interviewer_options">
                      {selectedOption
                        ? options.find(option => option.value === selectedOption).label
                        : 'Select an option'}
                    </DropdownButton>
                    {isOpen && (
                      <DropdownList>
                        {options.map(option => (
                          <DropdownItem
                            key={option.value}
                            data-testid={option.value}
                            onClick={() => handleOptionClick(option.value)}
                            backgroundColor={selectedOption === option.value ? '#BABABA' : ''}>
                            {option.label}
                          </DropdownItem>
                        ))}
                      </DropdownList>
                    )}
                  </DropdownContainer>
                </div>
                <div className="mt-2">
                  <TextTitleStyled weight={400} color="#1976D2" onClick={handleCalendlyIntegration}>
                    {' '}
                    Prefer to use Calendly?{' '}
                  </TextTitleStyled>
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-end'
                }}>
                <CancelButtonStyled onClick={handleClose}>cancel</CancelButtonStyled>
                <AddListButtonStyled onClick={() => handleCalenderSettings()}>UPDATE</AddListButtonStyled>
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
      {isCalendlyModal && (
        <SetupCalendlyModal
          isCalendlyModal={isCalendlyModal}
          setIsCalendlyModal={setIsCalendlyModal}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </>
  )
}

export default ScheduleMeetingModal
