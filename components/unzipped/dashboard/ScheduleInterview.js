import { useState, useEffect } from 'react'
import { Dismiss, ScheduleInterviewContainer, ScheduleInterviewButtonContainer, CalanderParagraphStyled } from './style'

import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

import Button from '../../ui/Button'
import ScheduleMeetingModal from './ScheduleMeetingModal'
import { getCalenderSetting } from '../../../redux/actions'

const ScheduleInterview = () => {
  const dispatch = useDispatch()
  const isMobile = window.innerWidth > 680 ? false : true
  const [isModalOpen, setIsModalOpen] = useState(false)
  const isSuccess = useSelector(state => state.CalenderSetting.success)
  const calenderSetting = useSelector(state => state.CalenderSetting.calenderSetting)
  const { _id } = useSelector(state => state.Auth.user)

  useEffect(() => {
    if (_id !== calenderSetting?.userId || !calenderSetting) dispatch(getCalenderSetting())
  }, [])

  const handleMeetingModal = () => {
    setIsModalOpen(true)
  }

  return (
    <>
      {!calenderSetting?._id && (
        <ScheduleInterviewContainer>
          <CalanderParagraphStyled noMargin isMobile={isMobile}>
            You haven’t set up your calendar yet. Set it up now so clients can schedule interviews with you.
          </CalanderParagraphStyled>
          <ScheduleInterviewButtonContainer isMobile={isMobile}>
            <Button noBorder type="default" normal small onClick={handleMeetingModal}>
              UPDATE
            </Button>
            <ScheduleMeetingModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} isSmallWindow={false} />
          </ScheduleInterviewButtonContainer>
        </ScheduleInterviewContainer>
      )}
    </>
  )
}

export default ScheduleInterview
