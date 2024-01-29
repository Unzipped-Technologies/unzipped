import React, { useState, useEffect, useRef } from 'react'
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import {
    DarkText,
    Span,
    WhiteCard,
    Absolute
} from './dashboard/style'
import Icon from '../ui/Icon'
import Button from '../ui/Button'
import FormField from '../ui/FormField'
import Image from '../ui/Image'
import AttachmentModal from './AttachmentModal'
import ProfileContainer from './ProfileContainer';
import { ValidationUtils } from '../../utils'
import theme from '../ui/theme'
import { useSelect } from '@mui/base';
import { useSelector } from 'react-redux';
import styled from "styled-components"
import MeetingTemplate from './MeetingTemplate';
import Link from 'next/link';
const Right = styled.div`
    display: grid;
    position: relative;
    grid-template-columns: ${({ isFullWidth }) => isFullWidth ? '1fr' : '3fr 1fr'};
    width: 100%;
    height: 100%;
`;

export const Message = styled.div`
    position: relative;
    width: 100%;
`;

export const Div = styled.div`
    width: 100%;
    z-index: 1;
    height: 75vh;
    z-index: 1;
    overflow: hidden auto;
      &::-webkit-scrollbar {
        width: 10px;
      }
    
      &::-webkit-scrollbar-track {
        background-color: transparent;
      }
    
      &::-webkit-scrollbar-thumb {
        background-color: ${() => theme.tint2};
        opacity: 0.5;
        transition: opacity 0.2s;
      }
    
      &::-webkit-scrollbar-thumb:hover {
        opacity: 1;
      }
    
    @media(max-height: 845px) {
        height: 67vh;
    }
    @media(max-height: 761px) {
        height: 65vh;
    }
    @media(max-height: 721px) {
        height: 63vh;
    }
    @media(max-height: 669px) {
        height: 60vh;
    }
`;

const Spacer = styled.div`
    height: 64px;
    width: 100%;
`;
// Message Box

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
  padding: 10px;
`
const ButtonContainer = styled.div`
    display: flex;
    background: transparent;
    width: 100%;
    justify-content: flex-end;
    padding: 10px;
`;

const ButtonStyled = styled.button`
    color: #fff;
    text-decoration: ${({ textDecoration }) => textDecoration ? textDecoration : 'none'};
    border: 0px;
    background: transparent;
    &:focus{
        background: transparent !important;
    }
`;

const ParagrapStyled = styled.p`
    margin: 0 !important;
    color: ${({ color }) => color ? color : '#fff'}
`
const DECLINE_MESSAGE_TEXT = 'The freelancer has proposed some additional times:';

const MessageContainer = ({
    data = {},
    userEmail,
    userId,
    messagesCount,
    messageLimit,
    handleChatMute,
    handleChatArchive,
    createTempFile,
    access,
    socket,
    onlineUsers,
    handleUnreadCount,
    handleMessagesOnScroll,
}) => {
    const [typing, setTyping] = useState({})
    const [messages, setMessages] = useState([])
    const [receiver, setReceiver] = useState(data?.participants && data?.participants.find(e => e?.userId?.email !== userEmail))
    const [sender, setSender] = useState(data?.participants && data?.participants.find(e => e?.userId?.email === userEmail))
    const [isProfile, setIsProfile] = useState(true)
    const [fileUploadModal, setFileUploadModal] = useState(false)
    const [top, setTop] = useState()
    const [form, setForm] = useState({
        senderId: sender?.userId?._id,
        receiverId: receiver?.userId?._id,
        message: '',
        attachment: '',
    })
    const messagesEndRef = useRef()
    const [userMessage, setUserMessage] = useState('');

    useEffect(() => {
        socket.on('chat message', message => {
            handleUnreadCount(message)
            setMessages(prevMessages => [
                ...prevMessages,
                {
                    message: message?.message,
                    attachment: "",
                    isAlert: false,
                    isRead: false,
                    isActive: true,
                    isArchived: false,
                    isSingle: true,
                    sender: message?.sender?.userId || message?.sender,
                    conversationId: message?.conversationId,
                    updatedAt: message?.updatedAt,
                    __v: 0
                }
            ]);

            console.log(messages, "inmeassagecontainer")
            socket.on('typing', typingData => {
                setTyping(typingData)
            })
            socket.on('stop-typing', typingData => {
                setTyping(typingData)
            })

        });
        return () => {
            socket.off('chat message');
        };
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'auto' });
    }, [typing])

    useEffect(() => {
        if (messages && messages.length > 0) {
            if (messages[messages.length - 1]?.isSingle === true) {
                messagesEndRef.current?.scrollIntoView({ behavior: 'auto' });
            } else if (messages.length < 11) {
                messagesEndRef.current?.scrollIntoView({ behavior: 'auto' });
            } else {
                const scroll = document.getElementById('topScroll');
                if (scroll) {
                    scroll.scrollTop = top;
                }
            }
        }
    }, [messages]);


    useEffect(() => {
        setMessages(data?.messages?.slice().reverse());
        setReceiver(data?.participants && data?.participants.find(e => e?.userId?.email !== userEmail))
        setSender(data?.participants && data?.participants.find(e => e?.userId?.email === userEmail))
    }, [data])

    useEffect(() => {
    }, [receiver])

    useEffect(() => {
        socket.on('refreshMessageList', () => {
            console.log('refreshMessageList',);
        });

        return () => {
            socket.off('refreshMessageList');
        };
    }, []);

    const handleLastMessageScroll = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'auto' });
    }

    const send = () => {
        if (form.message || form.attachment) {
            socket.emit('chat message', {
                sender: {
                    userId: form.senderId,
                    isInitiated: true
                },
                receiver: {
                    userId: form.receiverId
                },
                message: form.message,
                attachment: form.attachment,
                conversationId: data._id || null,
                updatedAt: new Date().toISOString(),
                access
            });
            socket.emit('stop-typing', {
                receiverId: form.receiverId,
                conversationId: data._id || null,
                isTyping: false,
            });
            handleLastMessageScroll()
            setForm({
                ...form,
                message: '',
                attachment: '',
            });

        }
    }

    const handleMute = (value) => {
        handleChatMute(value)
    }

    const handleArchive = (value) => {
        handleChatArchive(value)
    }

    const handleBlurTyping = () => {
        socket.emit('stop-typing', {
            receiverId: form.receiverId,
            conversationId: data._id || null,
            isTyping: false,
        });
    }

    const handleScroll = () => {
        const scroll = document.getElementById('topScroll');
        setTop(scroll.scrollHeight - scroll.clientHeight)
        if (scroll.scrollTop === 0) {
            if (messageLimit < messagesCount) {
                handleMessagesOnScroll()
            }
        }
    };

    const handleEnterKey = (e) => {
        if (e.keyCode === 13 && form.message.length > 0) {
            send()
        }
    }

    const handleMeetingOnAcceptOrDecline = (params) => {
        socket.emit('onMeetingAcceptOrDecline', { meeting, meetingStatus: params, message: userMessage })
    }
    const getApproveRejectButton = (params) => {
        return (
            <ButtonContainer>
                <div>
                    <ButtonStyled
                        textDecoration={"underline"}
                        onClick={() => handleMeetingOnAcceptOrDecline("DECLINE")}
                    >
                        Decline
                    </ButtonStyled>
                </div>
                <div>
                    <ButtonStyled
                        onClick={() => handleMeetingOnAcceptOrDecline("ACCEPTED")}
                    >
                        Approve
                    </ButtonStyled>
                </div>
            </ButtonContainer>
        )
    }
    return (
        <>
            {data ? (
                <WhiteCard noMargin height='100%' padding="0px">
                    <WhiteCard noMargin row padding="10px 40px">
                        <DarkText noMargin>
                            <p className='mb-0'>
                                {ValidationUtils.getFullNameFromUser(receiver?.userId)}
                            </p>
                            <p className={`mb-0 ${onlineUsers.includes(receiver?.userId?._id) ? 'text-primary' : 'text-warning'}`}>
                                {onlineUsers.includes(receiver?.userId?._id) ? 'Online' : 'Offline'}
                            </p>
                        </DarkText>
                        <Button type="transparent" noBorder onClick={() => setIsProfile(!isProfile)}><Icon name="actionIcon" color="#333" /></Button>
                    </WhiteCard>
                    <Right noMargin height="100%" isFullWidth={!isProfile}>
                        <WhiteCard noMargin height="100%" padding="0px 0px" overflow="hidden">
                            <Div onScroll={() => { handleScroll() }} id='topScroll'>
                                <div>
                                    {
                                        messages?.map((e, index) => {
                                            if (e?.sender === userId) {
                                                return (
                                                    <>
                                                        <WhiteCard autoFoucs half row borderColor="transparent" unset padding="10px" alignEnd justifyEnd>
                                                            <WhiteCard background="#007FED" noMargin maxWidth="50%" unset borderRadius="15px 15px 3px 15px" padding="10px 10px">
                                                                <DarkText small noMargin color="#fff">
                                                                    {e?.message?.includes('You can join the meeting at the link here:') ?
                                                                        <>
                                                                            {e?.message}
                                                                            <a
                                                                                href={e?.meetingId?.zoomMeeting.zoomJoiningUrl}
                                                                                target='_blank'
                                                                                style={{ color: "#fff", textDecoration: 'underline' }}
                                                                            >
                                                                                {e?.meetingId?.zoomMeeting.zoomJoiningUrl}
                                                                            </a>
                                                                        </>
                                                                        : e?.message}
                                                                </DarkText>
                                                                {e && e?.meetingId?.meetingStatus === "PENDING" && (
                                                                    <MeetingTemplate meeting={e?.meetingId} userDetails={sender?.userId} message={e} />
                                                                )}
                                                                <Absolute right="-35px" bottom="0px" width="100px"><DarkText noMargin color="#fff" fontSize="12px">{ValidationUtils.getTimeFormated(e?.updatedAt)}</DarkText></Absolute>
                                                            </WhiteCard>
                                                            <Span space unset>
                                                                <Image src={sender?.userId?.profileImage} height="54px" width="54px" radius="22%" />
                                                            </Span>
                                                        </WhiteCard>

                                                    </>
                                                )
                                            } else if (e?.conversationId === data?._id) {
                                                return (
                                                    <>
                                                        <WhiteCard half row borderColor="transparent" unset padding="10px" alignEnd>
                                                            <Span space unset>
                                                                <Image src={receiver?.userId?.profileImage} height="54px" width="54px" radius="22%" />
                                                            </Span>
                                                            <WhiteCard background="transparent" borderColor="transparent" noMargin maxWidth="50%" unset borderRadius="15px 15px 3px 15px" padding="10px 10px">
                                                                <DarkText small noMargin>
                                                                    {e?.message}
                                                                    {((e && e?.meetingId?.meetingStatus === "DECLINE") || (e?.message && e?.message?.includes(DECLINE_MESSAGE_TEXT))) && (
                                                                        <MeetingTemplate
                                                                            meeting={e?.meetingId}
                                                                            userDetails={sender?.userId}
                                                                            message={e}
                                                                            templateKey={(e?.message && e?.message.includes(DECLINE_MESSAGE_TEXT)) ? true : false} />
                                                                    )}
                                                                </DarkText>
                                                                <Absolute right="-35px" bottom="0px" width="100px"><DarkText noMargin color="#fff" fontSize="12px">{ValidationUtils.getTimeFormated(e?.updatedAt)}</DarkText></Absolute>
                                                            </WhiteCard>
                                                        </WhiteCard>

                                                    </>

                                                )
                                            }
                                        })}
                                    {typing?.isTyping && typing?.receiverId === form.senderId && typing?.conversationId === data?._id && <WhiteCard half row borderColor="transparent" unset padding="10px" alignEnd>
                                        <Span space unset>
                                            <Image src={receiver?.userId?.profileImage} height="54px" width="54px" radius="22%" />
                                        </Span>
                                        <WhiteCard background="transparent" borderColor="transparent" noMargin maxWidth="50%" unset borderRadius="15px 15px 3px 15px" padding="10px 10px">
                                            <DarkText small noMargin>Is typing...</DarkText>
                                        </WhiteCard>
                                    </WhiteCard>}
                                </div>
                                <div ref={messagesEndRef} />
                            </Div>
                            <Absolute bottom="10px" width="95%" right="2.5%">
                                <Message>
                                    <FormField value={form.message} onChange={e => {
                                        setForm({ ...form, message: e.target.value });
                                        socket.emit('typing', {
                                            receiverId: form.receiverId,
                                            conversationId: data._id || null,
                                            isTyping: true,
                                        });
                                    }} handleEnterKey={(e) => { handleEnterKey(e) }} onBlur={handleBlurTyping} message placeholder="type a message..." width="100%" fieldType="input" autosize></FormField>
                                </Message>
                                <Absolute zIndex={10} width="26px" right="25px"><Button disabled={!(form.message || form.attachment)} type="transparent" onClick={() => send()}><Icon name="send" /></Button></Absolute>
                                <Absolute width="13px" smallLeft zIndex={10}><Button type="transparent" onClick={() => setFileUploadModal(true)}><Icon name="paperClip" /></Button></Absolute>
                            </Absolute>
                            <Spacer></Spacer>
                        </WhiteCard>
                        {isProfile && <ProfileContainer data={receiver} sender={data} isArchived={data?.isArchived} isMute={data?.isMute} handleChatArchive={handleArchive} handleChatMute={handleMute} />}
                    </Right>
                </WhiteCard>
            ) : (
                <WhiteCard height='85vh' padding="0px" center>
                    Send a message?
                </WhiteCard>
            )}
            {fileUploadModal && (
                <AttachmentModal setFileUploadModal={setFileUploadModal} createTempFile={createTempFile} />
            )}
        </>
    )
}

export default MessageContainer