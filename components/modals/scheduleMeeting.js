import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { DateCalendar } from '@mui/x-date-pickers'
import { useState } from 'react'
// import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles'
// import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import dayjs from 'dayjs'
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');

dayjs.extend(utc);
dayjs.extend(timezone);
import { useDispatch, useSelector } from 'react-redux'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary
}))

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  //   width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '8px',
  padding: '32px'
}
export default function ScheduleMeetingModal({ scheduleInterviewModal, handleScheduleInterviewModal, receiver }) {
  const dispatch = useDispatch()
  const { Auth, Loading } = useSelector(state => state)
  console.log(Auth, receiver)
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

  const convertToUserTimeZone = dateString => {
    console.log(dateString, typeof dateString);

    // Use dayjs to parse the input date string with the correct format
    const userDate = dayjs(dateString, { format: 'YYYY-MM-DD HH:mm:ss A' });
    console.log('userDate:', userDate.format()); // Log the parsed date for debugging

    // Specify the user's time zone explicitly
    const userTimeZone = 'Asia/Karachi'; // Replace with the actual time zone
    const convertedDate = userDate.tz(userTimeZone);

    return convertedDate.toDate();
}

  
console.log(dayjs.tz.guess())
  const handleScheduleMeeting = () => {
    const body = {
      PrimaryTime: {
        Date: convertToUserTimeZone(Array.from(updatedSelectedTime)[0]),
        Time: dayjs(Array.from(updatedSelectedTime)[0], 'YYYY:MM:DD hh:mm A').format('YYYY:MM:DD hh:mm:ss A')
      },
      secondaryTimes: Array.from(updatedSelectedTime)
        .slice(1)
        .map(time => {
          return {
            Date: convertToUserTimeZone(time),
            Time: dayjs(time, 'YYYY:MM:DD hh:mm A').format('YYYY:MM:DD hh:mm:ss A') // Extract time part
          }
        }),
      senderId: Auth?.user?._id,
      receiverId: receiver?.userId?._id
    }
    console.log(body, "body")
    // dispatch(createMeeting(updatedSelectedTime, Auth.token))
  }
  // console.log(updatedSelectedTime, Array.from(updatedSelectedTime)[0])
  return (
    <div>
      <Modal
        open={scheduleInterviewModal}
        onClose={handleScheduleInterviewModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Grid container paddingLeft={2} spacing={2}>
            <Grid sm={12} md={12}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Request a meeting
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Select a time for a meeting based on the client's available schedule. They will receive a notification
                to accept the request. Select up to 5 times for maximum flexibility.
              </Typography>
            </Grid>
            <Grid xs={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar
                  value={selectedDate}
                  onChange={handleDateChange}
                  style={{ width: '100%' }}
                  minDate={dayjs(new Date())}
                />
              </LocalizationProvider>
            </Grid>
            <Grid container xs={12} md={6} gap={2} justifyContent={{ xs: 'center', md: 'space-between' }}>
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
