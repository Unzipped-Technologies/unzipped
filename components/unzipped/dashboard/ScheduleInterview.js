import { useState } from 'react'
import { ScheduleInterviewContainer, ScheduleInterviewButtonContainer, CalanderParagraphStyled } from './style'

import { useSelector } from 'react-redux'

import Button from '../../ui/Button'
import ScheduleMeetingModal from './ScheduleMeetingModal'

const ScheduleInterview = () => {
  const isMobile = window.innerWidth > 680 ? false : true
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { _id, calendarSettings } = useSelector(state => state.Auth.user)
  const handleMeetingModal = () => {
    setIsModalOpen(true)
  }

  return (
    <>
      <ScheduleInterviewContainer data-testid="calendar_setting_notification" id="calendar_setting_notification">
        <CalanderParagraphStyled noMargin isMobile={isMobile}>
          {!calendarSettings?.startTime
            ? 'You haven’t set up your calendar yet. Set it up now so clients can schedule interviews with you.'
            : 'Update calendar settings.'}
        </CalanderParagraphStyled>
        <ScheduleInterviewButtonContainer isMobile={isMobile}>
          <Button noBorder type="default" normal small onClick={handleMeetingModal}>
            UPDATE
          </Button>
          <ScheduleMeetingModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} isSmallWindow={false} />
        </ScheduleInterviewButtonContainer>
      </ScheduleInterviewContainer>
    </>
  )
}

export default ScheduleInterview
