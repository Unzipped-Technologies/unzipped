import { useState } from 'react';
import {
    BlackCard,
    WhiteText,
    TitleText,
    DarkText,
    Absolute,
    WhiteCard,
    Dismiss,
    ScheduleInterviewContainer,
    ScheduleInterviewButtonContainer
} from './style'

import Button from '../../ui/Button'
import ScheduleMeetingModal from './ScheduleMeetingModal';
import SetupCalendlyModal from './SetupCalendlyModal';

const ScheduleInterview = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const handleMeetingModal = () => {
        setIsModalOpen(true);
    }

    return (
        <ScheduleInterviewContainer>
            <div>
                <DarkText noMargin>You haven’t set up your calendar yet. Set it up now so clients can schedule interviews with you.</DarkText>
            </div>
            <ScheduleInterviewButtonContainer>
                <Dismiss>Dismiss</Dismiss>
                <Button noBorder type="default" normal small onClick={handleMeetingModal}>
                    UPDATE
                </Button>
                <ScheduleMeetingModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
                {/* <SetupCalendlyModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} /> */}
            </ScheduleInterviewButtonContainer>
        </ScheduleInterviewContainer>
    )
}

export default ScheduleInterview;