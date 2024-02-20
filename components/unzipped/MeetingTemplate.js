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
  color: white;
  border-radius: 8px 8px 0px 8px;
  background: ${({ bgColor }) => bgColor ? bgColor : '#007FED'};
  padding: ${({ padding }) => padding ? padding : '10px'};
`
const ButtonContainer = styled.div`
    display: flex;
    background: transparent;
    width: 100%;
    justify-content: flex-end;
    padding: 10px;
`;

const ButtonStyled = styled.button`
    color: ${({ color }) => color ? color : '#fff'};
    text-decoration: ${({ textDecoration }) => textDecoration ? textDecoration : 'none'};
    border: ${({ border }) => border ? border : '0px'};
    background: ${({ bgColor }) => bgColor ? bgColor : '#fff'};
    &:focus{
        background: transparent !important;
    }
`;

const ParagrapStyled = styled.p`
    margin: 0 !important;
    color: ${({ color }) => color ? color : '#fff'}
`;

const AdditionalMeetingTimeContainer = styled.div`
    display: flex;
    padding: 10px 10px 10px 0px;
    width: 100%;
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
    color: #0069FF;
    text-align: center;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: 0.4px;
    margin-right: 10px;
    &:focus{
        background: transparent !important;
    }
`;

const DeclineOrApproveButton = styled.button`
    color: ${({ color }) => color ? color : '#1976D2'};
    background: ${({ bgColor }) => bgColor ? bgColor : '#fff'};
    width: 130px;
    border: ${({ border }) => border ? border : '1px solid #1976D2'};
    padding: 10px;
    font-size: 15px;
    font-weight: 500;
    margin-right: 10px;
    border-radius: 5px;
    &:focus{
        background: ${({ bgColor }) => (bgColor == '#1976D2') ? bgColor : 'transparent !important'};
    }
`

const MeetingTemplate = ({ meeting, userDetails, message, templateKey }) => {
    const { user } = useSelector(state => state.Auth);
    const [additionalTime, setAdditionalTime] = useState([]);
    const [isProposedTime, setIsProposedTime] = useState(false);
    const [proposedMeetingDetails, setProposedMeetingDetails] = useState(null);

    const handleMeetingOnAcceptOrDecline = (params) => {
        let updateMeetingStatus = params;
        console.log('updateMeetingStatus', updateMeetingStatus)
        socket.emit('onMeetingAcceptOrDecline', { meeting, meetingStatus: params, message })
        if (!(meeting && meeting.senderId == user?._id) && !isProposedTime) {
        }
        console.log('onProposedMeetingTime', proposedMeetingDetails)
        if (isProposedTime) {
            socket.emit('onProposedMeetingTime', proposedMeetingDetails, updateMeetingStatus)
        }
    }

    useEffect(() => {
        if (meeting.secondaryTimes && meeting.secondaryTimes?.length > 0) {
            formatDateTime(meeting)
        }
    }, [])

    const getApproveRejectButton = (params = {}) => {
        return (
            <ButtonContainer>
                <div>
                    <ButtonStyled
                        textDecoration={"underline"}
                        color={"#fff"}
                        bgColor={"transparent"}
                        border={'none'}
                        onClick={() => handleMeetingOnAcceptOrDecline("DECLINE")}
                    >
                        Decline
                    </ButtonStyled>
                </div>
                <div>
                    <ButtonStyled
                        color={'#fff'}
                        bgColor={'transparent'}
                        border={'none'}
                        onClick={() => handleMeetingOnAcceptOrDecline("ACCEPTED")}
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
        console.log(updatedProposedMeetingTime, 'indexindexindexindexindex')
        setIsProposedTime(true);
        setProposedMeetingDetails({ proposedMeetingTime: updatedProposedMeetingTime, meeting, message, index, status })
    }

    return (
        <>
            {meeting && meeting?.meetingStatus === "PENDING" && (
                <MessageTemplateContainer>
                    <MessageContentTemplate>
                        <ParagrapStyled> {getApproveRejectButton()}</ParagrapStyled>
                    </MessageContentTemplate>

                </MessageTemplateContainer>
            )}

            {((meeting && meeting?.meetingStatus) && !(templateKey)) === "ACCEPTED" && (
                <MessageTemplateContainer >
                    <MessageContentTemplate bgColor={"#fff"}>
                        <ParagrapStyled style={{ color: '#000' }}>
                            {userDetails?.FirstName || ''}   {userDetails?.LastName || ''} has accepted your invitation for a meeting on November 22, 2023 at 4:30pm. You can join the meeting at the link here:

                            zoom.meetinglink.com/will-generate-a-link
                        </ParagrapStyled>
                    </MessageContentTemplate>
                </MessageTemplateContainer >
            )}

            {meeting && meeting?.meetingStatus === "DECLINE" && (
                <MessageTemplateContainer>
                    <MessageContentTemplate bgColor={"#fff"} padding={'10px 10px 10px 0px'}>
                        {meeting && meeting.secondaryTimes && meeting.secondaryTimes.length > 0 && meeting.secondaryTimes.map((item, index) => (
                            <>
                                <ParagrapStyled style={{ color: '#000' }}> {getMonthAndDateFormatted(item.Date)} </ParagrapStyled>
                                <AdditionalMeetingTimeContainer>
                                    <AdditionalMeetingTimeContent>
                                        <AdditionalTimeButton onClick={() => handleOnProposedMeetingTime({ Time: item.Time, Date: item.Date }, index)}>
                                            {item.Time}
                                        </AdditionalTimeButton>
                                    </AdditionalMeetingTimeContent>
                                </AdditionalMeetingTimeContainer>
                            </>
                        ))}

                        <ParagrapStyled>
                            <DeclineOrApproveButton onClick={() => handleMeetingOnAcceptOrDecline("DECLINE")}>Decline</DeclineOrApproveButton>
                            <DeclineOrApproveButton
                                bgColor={'#1976D2'}
                                color={'#fff'}
                                border={'1px solid #1976D2'}
                                onClick={() => handleMeetingOnAcceptOrDecline("ACCEPTED")}
                            >Approve</DeclineOrApproveButton>


                        </ParagrapStyled>
                    </MessageContentTemplate>
                </MessageTemplateContainer >
            )}

            {meeting && (meeting.meetingStatus === "REJECTED") && templateKey && (
                <MessageTemplateContainer>
                    <MessageContentTemplate bgColor={"#fff"}>
                        {meeting && meeting.secondaryTimes && meeting.secondaryTimes.length > 0 && meeting.secondaryTimes.map((item) => (
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
            {meeting && (meeting.meetingStatus === "ACCEPTED") && templateKey && (
                <MessageTemplateContainer>
                    <MessageContentTemplate bgColor={"#fff"}>
                        {meeting && meeting.secondaryTimes && meeting.secondaryTimes.length > 0 && meeting.secondaryTimes.map((item) => (
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