import { useState } from 'react';
import {
    Dismiss,
    ScheduleInterviewContainer,
} from './style'
import Button from '../../ui/Button'
import ScheduleMeetingModal from './ScheduleMeetingModal';
import SetupCalendlyModal from './SetupCalendlyModal';
import styled from 'styled-components'

const NotificationContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 5px;
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const NotificationDismissalContainer = styled.div`
  display: flex;
`;

const DismissTextStyled = styled.div`
 display: flex;
 flex-direction: column;
 align-items: center;
 justify-content: center
`;

const ScheduleInterview = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleMeetingModal = () => {
        setIsModalOpen(true);
    }

    return (
        <ScheduleInterviewContainer>
            <NotificationContainer>
                <div style={{ padding: 5 }}>
                    <p>You haven’t set up your calendar yet. Set it up now so clients can schedule interviews with you. </p>
                </div>
                <NotificationDismissalContainer>
                    <DismissTextStyled s>
                        <Dismiss>Dismiss</Dismiss>
                    </DismissTextStyled>
                    <Button noBorder type="default" normal small onClick={handleMeetingModal}>
                        UPDATE
                    </Button>
                </NotificationDismissalContainer>
                <ScheduleMeetingModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} isSmallWindow={false} />

            </NotificationContainer>


        </ScheduleInterviewContainer>
    )
}

export default ScheduleInterview;