import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import socket from '../../components/sockets/index'
import { useSelector } from 'react-redux';

const MessageTemplateContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  align-items: end;
`;

const MessageContentTemplate = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  width: 450px;
  height: auto;
  letter-spacing: 0.15px;
  color: ${({ color }) => (color ? color : '#fff')};
  border-radius: 8px 8px 0px 8px;
  background: ${({ bgColor }) => bgColor ? bgColor : '#007FED'};
  padding: ${({ padding }) => padding ? padding : '10px'};
`
const ButtonContainer = styled.div`
    display: flex;
    flex-direction: ${({ flexDirection }) => (flexDirection ? flexDirection : 'row')};
    background: transparent;
    width: 100%;
    justify-content: flex-end;
    padding: 10px;
    gap: ${({ gap }) => (gap ? gap : '0px')};
`;

const ButtonStyled = styled.button`
    color: ${({ color }) => color ? color : '#fff'};
    text-decoration: ${({ textDecoration }) => textDecoration ? textDecoration : 'none'};
    border: ${({ border }) => border ? border : '0px'};
    background: ${({ bgColor }) => bgColor ? bgColor : '#fff'};
    &:focus{
        background: transparent !important;
        color: #000;
        border: 1px solid #000 !important;
        border-radius: 4px;  
    }
    padding: ${({ padding }) => (padding ? padding : '0px')};
    border-radius: ${({ borderRadius }) => (borderRadius ? borderRadius : '0px')};
`;

const ParagrapStyled = styled.p`
    margin: 0 !important;
    color: ${({ color }) => (color ? color : '#fff')};
    text-decoration: ${({ textDecoration }) => (textDecoration ? textDecoration : 'none')};
    background: ${({ bgColor }) => (bgColor ? bgColor : 'none')};
`;

const AdditionalMeetingTimeContainer = styled.div`
    display: flex;
    padding: 10px 10px 10px 0px;
    width: 100%;
    background: ${({ bgColor }) => (bgColor ? bgColor : 'transparent')};
`;

const AdditionalMeetingTimeContent = styled.div`
    width: 100%;
`
const AdditionalTimeButton = styled.button`
    background: #fff !important;
    border: 1px solid #0069FF !important;
    border-radius: 4px;
    color:  #0069FF;
    padding: 5px;
    width: 130px;
    text-align: center;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: 0.4px;
    margin-right: 10px;
    cursor: ${({ cursor }) => (cursor ? cursor: 'pointer !important')};
    &:focus{
        background: transparent !important;
        color: #000;
        border: 1px solid #000 !important;
        border-radius: 4px;  
    }
`;

const DeclineOrApproveButton = styled.button`
    color: ${({ color }) => color ? color : '#1976D2'};
    background: ${({ bgColor }) => bgColor ? bgColor : '#fff'};
    width: ${({ width }) => width ? width : '130px'};
    border: ${({ border }) => border ? border : '1px solid #1976D2'};
    padding:${({ padding }) => padding ? padding : '10px'};
    font-size:${({ fontSize }) => fontSize ? fontSize : '15px'};
    font-weight: ${({ fontWeight }) => fontWeight ? fontWeight : '500'};
    margin-right: 10px;
    border-radius: 5px;
    &:focus{
      background: transparent !important;
      color: #000;
      border: 1px solid #000 !important;
      border-radius: 4px;  
    }
`

const MeetingTemplate = ({ meeting, userDetails, message, templateKey }) => {

    const { user } = useSelector(state => state.Auth);
    const [additionalTime, setAdditionalTime] = useState([]);
    const [isProposedTime, setIsProposedTime] = useState(false);
    const [proposedMeetingDetails, setProposedMeetingDetails] = useState(null);
    const [error, setError] = useState('');
    const isMobile = window.innerWidth > 680 ? false : true

    const handleMeetingOnAcceptOrDecline = (params) => {
        let updateMeetingStatus = params;
      
        if (isProposedTime && proposedMeetingDetails) {
            socket.emit('onProposedMeetingTime', proposedMeetingDetails, updateMeetingStatus)
            return;
        }

        socket.emit('onMeetingAcceptOrDecline', { meeting, meetingStatus: params, message })
        if (!(meeting && meeting.senderId == user?._id) && !isProposedTime) {
        }
        console.log('onProposedMeetingTime', proposedMeetingDetails)
  }

  const handleError = () => {
    setError('Please select any proposed time to schedule an interview');
  }

    useEffect(() => {
        if (meeting?.secondaryTimes && meeting?.secondaryTimes?.length > 0) {
            formatDateTime(meeting)
        }
    }, [])

    const getApproveRejectButton = (params = {}) => {
      return (
        <ButtonContainer gap={"10px"} >
          <div>
            <ButtonStyled
              textDecoration={"underline"}
              color={"#1976D2"}
              bgColor={"#fff"}
              border={"1px solid #1976D2"}
              padding={'10px'}
              borderRadius={'5px'}

              onClick={() => handleMeetingOnAcceptOrDecline("DECLINE")}
              >
              Decline
            </ButtonStyled>
          </div>
          <div>
            <ButtonStyled
              textDecoration={'underline'}
              color={'#fff'}
              bgColor={'#1976D2'}
              border={'1px solid #1976D2'}
              padding={'10px'}
              borderRadius={'5px'}
              onClick={() => handleMeetingOnAcceptOrDecline('ACCEPTED')}
              >
              Approve
            </ButtonStyled>
          </div>
        </ButtonContainer>
      )
    }

    const formatDateTime = ({ secondaryTimes }) => {
        let time = secondaryTimes.slice(0, 1).map((elem) => (
            elem.Time
        ))
        setAdditionalTime(time);
    }

    const getMonthAndDateFormatted = (dateString) => {
        const [DATE] = dateString.split('T');
        const [YEAR, MONTH, DAY] = DATE.split("-")
        let monthNumber = parseInt(MONTH);
        const months = [
            "January", "February", "March", "April",
            "May", "June", "July", "August",
            "September", "October", "November", "December"
        ];

        if (monthNumber >= 1 && monthNumber <= 12) {
            return months[monthNumber - 1] + ' ' + DAY;
        }

    }

  const handleOnProposedMeetingTime = (updatedProposedMeetingTime, index) => {
    setIsProposedTime(true);
    setProposedMeetingDetails({ proposedMeetingTime: updatedProposedMeetingTime, meeting, message, index })
    setError('')
  }

  return (
    <>
      {meeting && meeting?.meetingStatus === "PENDING" && (
        <MessageTemplateContainer>
          <MessageContentTemplate bgColor={'transparent'}>
            <ParagrapStyled> {getApproveRejectButton()}</ParagrapStyled>
          </MessageContentTemplate>

        </MessageTemplateContainer>
      )}

    {((meeting && meeting?.meetingStatus) && !(templateKey)) === "ACCEPTED" && (
        <MessageTemplateContainer >
            <MessageContentTemplate bgColor={"#fff"}>
                <ParagrapStyled style={{ color: '#000' }}>
                    {userDetails?.FirstName || ''}   {userDetails?.LastName || ''} has accepted your invitation for a meeting on November 22, 2023 at 4:30pm. You can join the meeting at the link here:  
                    </ParagrapStyled>
            </MessageContentTemplate>
        </MessageTemplateContainer >
      )}

      {meeting && meeting?.meetingStatus === 'DECLINE' && message?.message.includes('has proposed some additional times:') && (
          <MessageTemplateContainer>
            <MessageContentTemplate bgColor={'transparent'} padding={'10px 10px 10px 0px'}>
              {meeting && meeting.secondaryTimes &&
                meeting.secondaryTimes.length > 0 &&
                meeting.secondaryTimes.map((item, index) => (
                  <>
                    <ParagrapStyled  key={index} style={{ color: '#000' }} bgColor={'transparent'}> {getMonthAndDateFormatted(item.Date)} </ParagrapStyled>
                    <AdditionalMeetingTimeContainer >
                      <AdditionalMeetingTimeContent>
                        <AdditionalTimeButton 
                          onClick={() => handleOnProposedMeetingTime({ Time: item.Time, Date: item.Date }, index)}
                          >
                          {item.Time}
                        </AdditionalTimeButton>
                      </AdditionalMeetingTimeContent>
                    </AdditionalMeetingTimeContainer>
                  </>
                ))}
                {error && <ParagrapStyled style={{ color: '#000',fontWeight:'bold',padding:'5px' ,fontSize: isMobile ? '12px' : '16px'}} bgColor={'transparent'}> {error} </ParagrapStyled>}
              {user.role !== 0 && (
                 <ParagrapStyled>
                  <DeclineOrApproveButton width={isMobile ? '60px' : '130px'} 
                  padding={ isMobile ? '7px' : '10px'} 
                  fontWeight={isMobile ? '400' : '500'} fontSize={isMobile ? '12px' : '15px'}
                   onClick={() => handleMeetingOnAcceptOrDecline('DECLINE')}>
                    Decline
                  </DeclineOrApproveButton>
                  <DeclineOrApproveButton
                    width={isMobile ? '60px' : '130px'}
                    bgColor={'#1976D2'}
                    color={'#fff'}
                    border={'1px solid #1976D2'}
                    padding={ isMobile ? '7px' : '10px'}
                    fontWeight={isMobile ? '400' : '500'}
                    fontSize={isMobile ? '12px' : '15px'}
                    onClick={() => {
                    isProposedTime ? handleMeetingOnAcceptOrDecline('ACCEPTED') : handleError()
                    }}>
                    Approve
                  </DeclineOrApproveButton>
                 </ParagrapStyled>
              )}
            </MessageContentTemplate>
          </MessageTemplateContainer>
        )}

      {meeting && meeting.meetingStatus === 'REJECTED' && templateKey && (
        <MessageTemplateContainer>
          <MessageContentTemplate bgColor={'transparent'}>
            {meeting &&
              meeting?.secondaryTimes &&
              meeting?.secondaryTimes?.length > 0 &&
              meeting?.secondaryTimes.map(item => (
                <>
                  <ParagrapStyled style={{ color: '#000' }}> {getMonthAndDateFormatted(item.Date)} </ParagrapStyled>
                  <AdditionalMeetingTimeContainer>
                    <AdditionalMeetingTimeContent>
                      <AdditionalTimeButton>{item.Time}</AdditionalTimeButton>
                    </AdditionalMeetingTimeContent>
                  </AdditionalMeetingTimeContainer>
                </>
              ))}
          </MessageContentTemplate>
        </MessageTemplateContainer >
      )}
      {meeting && meeting.meetingStatus === 'ACCEPTED' && templateKey && (
        <MessageTemplateContainer>
          <MessageContentTemplate bgColor={'transparent'}>
            {meeting &&
              meeting?.secondaryTimes &&
              meeting?.secondaryTimes?.length > 0 &&
              meeting?.secondaryTimes.map(item => (
                <>
                  <ParagrapStyled style={{ color: '#000' }}> {getMonthAndDateFormatted(item.Date)} </ParagrapStyled>
                  <AdditionalMeetingTimeContainer>
                    <AdditionalMeetingTimeContent>
                                        <AdditionalTimeButton>
                                            {item.Time}
                                        </AdditionalTimeButton>
                    </AdditionalMeetingTimeContent>
                  </AdditionalMeetingTimeContainer>
                </>
              ))}
          </MessageContentTemplate>
        </MessageTemplateContainer >
      )}
    </>
  )
}

export default MeetingTemplate;