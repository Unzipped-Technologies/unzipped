import React, { useState } from 'react'
import dayjs from 'dayjs'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { DateCalendar } from '@mui/x-date-pickers'
import { useSelector } from 'react-redux'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
const utc = require('dayjs/plugin/utc')
const timezone = require('dayjs/plugin/timezone')

import socket from '../../components/sockets/index'

dayjs.extend(utc)
dayjs.extend(timezone)

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '8px',
  padding: '32px',
  '@media (max-width: 680px)': {
    height: '95%',
    width: '95%',
    overflow: 'scroll'
  }
}
export default function ScheduleMeetingModal({
  scheduleInterviewModal,
  handleScheduleInterviewModal,
  receiver,
  setScheduleInterviewModal,
  setScheduleInterview,
  isMobileViewPanel = false
}) {
  const { Auth } = useSelector(state => state)

  const [selectedDate, setSelectedDate] = useState(dayjs(new Date()))
  const [selectedTime, setSelectedTime] = useState([])

  const updatedSelectedTime = new Set(selectedTime)

  const generateTimeSlots = date => {
    const dayStart = dayjs(date).startOf('day')
    const timeSlots = []

    for (let i = 0; i < 24 * 2; i++) {
      const time = dayStart.add(i * 30, 'minute').format('YYYY:MM:DD hh:mm:ss A')
      timeSlots.push(time)
    }

    return timeSlots
  }

  const dayTime = generateTimeSlots(selectedDate)

  const handleSelectedTime = time => {
    if (updatedSelectedTime.has(time)) {
      updatedSelectedTime.delete(time)
    } else {
      updatedSelectedTime.add(time)
    }
    setSelectedTime(Array.from(updatedSelectedTime))
  }

  const handleDateChange = date => {
    setSelectedDate(date)
    generateTimeSlots(date)
  }

  const handleScheduleMeeting = () => {
    let meetingSlots = Array.from(updatedSelectedTime).map(time => {
      return {
        Date: getDate(time),
        Time: getTime(time)
      }
    })

    const scheduleMeetingObj = {
      primaryTime: {
        Date: getDate(Array.from(updatedSelectedTime)[0]),
        Time: getTime(Array.from(updatedSelectedTime)[0])
      },
      secondaryTimes: meetingSlots.slice(1),
      senderId: Auth?.user?._id,
      receiverId: receiver?.userId?._id
    }
    socket.emit('createMeeting', scheduleMeetingObj)
    setScheduleInterviewModal(false)

    if (isMobileViewPanel) {
      setScheduleInterview(false)
    }
  }

  const getDate = val => {
    if (val) {
      const [datePart] = val.split(' ')
      const slpitDateString = datePart.replace(/:/g, '-') // + 'T' + timePart + 'Z';
      return slpitDateString //formattedDate
    }
  }

  const getTime = time => {
    if (time) {
      const [timePart, hoursPart] = time.split(' ')
      const timeFormat = timePart + ' ' + hoursPart
      return timeFormat
    }
  }
  return (
    <div data-testid="schedule_meeting_modal">
      <Modal
        open={scheduleInterviewModal}
        onClose={handleScheduleInterviewModal}
        aria-labelledby="meeting_modal_title"
        id="schedule_meeting_modal"
        aria-describedby="meeting_modal_description">
        <Box
          sx={style}
          style={{
            overflowY: 'auto', // Enable vertical scrolling
            maxHeight: '80vh' // Limit the maximum height
          }}>
          <Grid container paddingLeft={2} spacing={2}>
            <Grid item sm={12} md={12}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Request a meeting
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Select a time for a meeting based on the client's available schedule. They will receive a notification
                to accept the request. Select up to 5 times for maximum flexibility.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar
                  value={selectedDate}
                  onChange={handleDateChange}
                  style={{ width: '100%' }}
                  minDate={dayjs(new Date())}
                />
              </LocalizationProvider>
            </Grid>
            <Grid container item xs={12} md={6} gap={2} justifyContent={{ xs: 'center', md: 'space-between' }}>
              {dayTime.map((time, index) => (
                <Button
                  key={index}
                  variant={updatedSelectedTime.has(time) ? 'contained' : 'outlined'}
                  disabled={updatedSelectedTime.size > 4 && !updatedSelectedTime.has(time)}
                  onClick={() => handleSelectedTime(time)}>
                  {dayjs(time, 'YYYY:MM:DD hh:mm A').format('hh:mm A')}
                </Button>
              ))}
              <>
                {Array.from(updatedSelectedTime).map((time, index) => (
                  <Button key={index} variant="contained" style={{ marginRight: '10px' }}>
                    {dayjs(time, 'YYYY:MM:DD hh:mm A').format('hh:mm A')}
                  </Button>
                ))}
              </>

              <Box display={'flex'} justifyContent={{ md: 'end', xs: 'center' }} gap={2} width={'100%'}>
                <Button variant="outlined" onClick={handleScheduleInterviewModal}>
                  CANCEL
                </Button>
                <Button variant="contained" disabled={!updatedSelectedTime.size} onClick={handleScheduleMeeting}>
                  SCHEDULE
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  )
}
