import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'

import Icon from '../ui/Icon'
import theme from '../ui/theme'
import Image from '../ui/Image'
import Button from '../ui/Button'
import FormField from '../ui/FormField'
import AttachmentModal from './AttachmentModal'
import ProfileContainer from './ProfileContainer'
import { ValidationUtils, ConverterUtils } from '../../utils'
import { DarkText, Span, WhiteCard, Absolute, TypingAnimation } from './dashboard/style'
import { useDispatch } from 'react-redux'
import ClearSharpIcon from '@material-ui/icons/ClearSharp';
import { inboxAttachments, resetInboxAttachments } from '../../../unzipped/redux/Messages/actions'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

const Right = styled.div`
  display: grid;
  position: relative;
  grid-template-columns: ${({ isFullWidth }) => (isFullWidth ? '1fr' : '3fr 1fr')};
  width: 100%;
  height: 100%;
`

const LoadingHistory = styled.span`
  padding-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: larger;
  color: darkgray;
  font-weight: 500;
`

export const Message = styled.div`
  position: relative;
  width: 100%;
`

export const Div = styled.div`
  width: 100%;
  z-index: 1;
  height: 73vh;
  overflow: hidden auto;
  &::-webkit-scrollbar {
    width: 6px;
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

  @media (max-height: 1049px) {
    height: 70vh;
  }
  @media (max-height: 944px) {
    height: 68vh;
  }
  @media (max-height: 885px) {
    height: 66vh;
  }
  @media (max-height: 832px) {
    height: 64vh;
  }
  @media (max-height: 788px) {
    height: 62vh;
  }
  @media (max-height: 746px) {
    height: 60vh;
  }
`

const Spacer = styled.div`
  height: 64px;
  width: 100%;
`
const AttachmentTag = styled.div`
  display: inline-flex;
  align-items: center;
  background-color: ${theme.tint2};
  color: #fff;
  padding: 5px 10px;
  border-radius: 15px;
  margin: 5px 5px 0 0;
  text-decoration: none;
  font-size: 12px;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${theme.primary};
  }

  svg {
    margin-left: 5px;
    fill: #fff;
  }
`;


const ContentContainer = styled.div`
  padding: 10px 20px;
  width: 90%;
  font-family: 'Roboto';
  line-height: 25px;
  font-size: 16px;
`;

const ContainedSpan = styled.span`
  display: inline-flex;
  align-items: center;
  border-radius: 15px;
  background-color: #d9d9d9;
  padding: 2px 10px;
  margin: 5px;
  font-size: 14px;
`;

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
  userRole,
  onlineUsers,
  handleUnreadCount,
  handleMessagesOnScroll,
  setUnreadToZero,
  userName,
  selectedConversationId
}) => {
  const messagesEndRef = useRef()
  const dispatch = useDispatch()
  const [typing, setTyping] = useState({})
  const [messages, setMessages] = useState([])
  const [receiver, setReceiver] = useState({})
  const [sender, setSender] = useState({})
  const [isProfile, setIsProfile] = useState(true)
  const [fileUploadModal, setFileUploadModal] = useState(false)
  const [form, setForm] = useState({
    senderId: null,
    receiverId: null,
    message: '',
    attachment: []
  })
  const [isMessagesLoading, setIsMessagesLoading] = useState(false)
  const [attachmentsInfo, setAttachmentsInfo] = useState([]);

  useEffect(() => {
    socket.on('typing', typingData => {
      setTyping(typingData)
    })
  })

  useEffect(() => {
    socket.on('stop-typing', typingData => {
      setTyping(typingData)
    })
  })

  useEffect(() => {
    if (data?.participants?.length) {

      const receiver = data.participants.find(e => e?.userId?._id !== userId) || {};
      const sender = data.participants.find(e => e?.userId?._id === userId) || {};

      setReceiver(receiver);
      setSender(sender);

      setForm(prevForm => ({
        ...prevForm,
        receiverId: receiver.userId ? receiver.userId._id : prevForm.receiverId,
        senderId: sender.userId ? sender.userId._id : prevForm.senderId
      }));
    }
  }, [data, userId]);


  const handleAttachmentUpload = (files) => {
    setForm(prevForm => ({
      ...prevForm,
      attachment: files.map(file => ({ name: file.name }))
    }));
  };


  useEffect(() => {
    socket.on('chat message', message => {
      handleUnreadCount(message);
      setMessages(prevMessages => [
        ...prevMessages,
        {
          _id: message?._id,
          message: message?.message,
          attachment: message?.attachment || [],
          isAlert: false,
          isRead: false,
          isActive: true,
          isArchived: false,
          isSingle: true,
          sender: message?.sender?.userId,
          conversationId: message?.conversationId,
          updatedAt: message?.updatedAt
        }
      ]);
      const scroll = document.getElementById('topScroll');
      if (scroll?.scrollTop + scroll.clientHeight >= scroll.scrollHeight) {
        setUnreadToZero(selectedConversationId, sender?.userId?._id);
      }
    });

    return () => {
      socket.off('chat message');
    };
  }, [socket, handleUnreadCount, setUnreadToZero, selectedConversationId]);


  const handleLastMessageScroll = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }

  useEffect(() => {
    dispatch(inboxAttachments(attachmentsInfo))
  }, [attachmentsInfo])

  const send = () => {
    if (form.message || form.attachment.length) {
    setForm({
        ...form, sender: { userId: form.senderId, isInitiated: true },
        receiver: { userId: form.receiverId },
        message: form.message,
        attachment: attachmentsInfo,
        conversationId: data._id || null,
        updatedAt: new Date().toISOString(),
        access
      })
      socket.emit('chat message', {
        sender: { userId: form.senderId, isInitiated: true },
        receiver: { userId: form.receiverId },
        message: form.message,
        attachment: attachmentsInfo,
        conversationId: data._id || null,
        updatedAt: new Date().toISOString(),
        access
      });

      handleLastMessageScroll();
      setForm({ ...form, message: '', attachment: [] });
      setAttachmentsInfo([]);
      dispatch(resetInboxAttachments())
    }
  }

  const handleMute = value => {
    handleChatMute(value)
  }

  const handleArchive = value => {
    handleChatArchive(value)
  }

  const handleBlurTyping = () => {
    socket.emit('stop-typing', {
      receiverId: form.receiverId,
      conversationId: data._id || null,
      name: null,
      isTyping: false
    })
  }

  const handleScroll = () => {
    const scroll = document.getElementById('topScroll')
    if (scroll.scrollTop === 0) {
      if (messageLimit < messagesCount) {
        setIsMessagesLoading(true)
        setTimeout(() => {
          setIsMessagesLoading(false)
        }, 1000)
        handleMessagesOnScroll()
      }
    }

    if (scroll.scrollHeight - scroll.scrollTop <= scroll.clientHeight + 1) {
      setUnreadToZero(selectedConversationId, sender?.userId?._id)
    }
  }

  const handleEnterKey = e => {
    if (e.keyCode === 13 && form.message.length > 0) {
      send()
    }
  }

  return (
    <>
      {data ? (
        <WhiteCard noMargin height="100%" padding="0px" id="message_container">
          <WhiteCard noMargin row padding="8px 40px" id="header">
            <DarkText noMargin>
              <DarkText className="mb-0" fontSize="16px" color="#000000" lineHeight="23px">
                {ConverterUtils.capitalize(`${ValidationUtils.getFullNameFromUser(receiver?.userId)}`)}
              </DarkText>
              {receiver?.userId?.freelancers?.category && (
                <DarkText fontSize="14px" lighter color="#808080" lineHeight="23px" className="mb-0">
                  {receiver?.userId?.freelancers?.category}
                </DarkText>
              )}
              <p className={`mb-0 ${onlineUsers.includes(receiver?.userId?._id) ? 'text-primary' : 'text-warning'}`}>
                {onlineUsers.includes(receiver?.userId?._id) ? 'Online' : 'Offline'}
              </p>
            </DarkText>
            <Button type="transparent" noBorder onClick={() => setIsProfile(!isProfile)} id="profile_action">
              <Icon name="actionIcon" color="#333" />
            </Button>
          </WhiteCard>
          <Right noMargin height="100%" isFullWidth={!isProfile}>
            <WhiteCard noMargin height="100%" padding="0px 0px" overflow="hidden">
              <Div
                onScroll={() => {
                  handleScroll()
                }}
                id="topScroll">
                {isMessagesLoading && <LoadingHistory>Loading history...</LoadingHistory>}
                <div>
                  {messages?.map((e, index) => {
                    const isSender = e?.sender === userId && e?._id;
                    return (
                      <WhiteCard
                      id={e?._id}
                       key={e?._id} autoFoucs half row borderColor="transparent" unset padding="10px" alignEnd={isSender} justifyEnd={isSender}>
                        <WhiteCard background={isSender ? "#007FED" : "#EDEDED"} noMargin maxWidth="50%" width="436px" unset borderRadius="15px 15px 3px 15px" padding="15px 15px" style={{ color: isSender ? "#fff" : "#333" }}>
                          <DarkText small noMargin color={isSender ? "#fff" : "#333"} >
                            <span dangerouslySetInnerHTML={{ __html: e?.message }}></span>
                          </DarkText>
                          <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", padding: 10, width: "100%", marginRight: "12px" }}>
                            <div style={{ display: "block" }}>
                              {e?.attachment.length > 0 && (<p style={{ display: "block", marginBlockStart: "1em", marginBlockEnd: "1em", marginInlineStart: "0px", marginInlineEnd: "0px" }}>Attachments:</p>)}
                            </div>
                            {e?.attachment?.map(att => (
                              <div style={{ display: "block" }} key={att.fileId}>
                                <FiberManualRecordIcon style={{ height: "10px", width: "10px" }} />
                                <a style={{ fontSize: "13px", textDecoration: "none", letterSpacing: "1px", paddingLeft: "5px", fontWeight: "600" }} href={att.url} target="_blank" rel="noopener noreferrer">{att.name}</a>
                              </div>
                            ))}
                          </div>
                          <Absolute bottom="5px" width="100px">
                            <DarkText noMargin color={isSender ? "#fff" : "#333"} fontSize="12px" right topPadding="15px" padding="0px 0px 0px 0px">
                              {ValidationUtils.getTimeFormated(e?.updatedAt)}
                            </DarkText>
                          </Absolute>
                        </WhiteCard>
                      </WhiteCard>
                    );
                  })}
                </div>
                <div ref={messagesEndRef} />
              </Div>
              {typing?.isTyping && typing?.receiverId === form.senderId && typing?.conversationId === data?._id && (
                <TypingAnimation style={{ paddingTop: '20px' }}>
                  {typing?.name?.substring(0, 20)} {'    '}
                  <span></span>
                  <span></span>
                  <span></span>
                </TypingAnimation>
              )}

              <Absolute bottom="6px" width="95%" right="2.5%">
                <Message style={{ paddingTop: form.attachment.length > 0 ? "0px" : "4px" }}>
                  <FormField
                    value={form.message}
                    onChange={e => {
                      setForm({ ...form, message: e.target.value });
                      socket.emit('typing', {
                        receiverId: form.receiverId,
                        conversationId: data._id || null,
                        name: userName,
                        isTyping: true
                      });
                    }}
                    handleEnterKey={e => {
                      handleEnterKey(e);
                    }}
                    onBlur={handleBlurTyping}
                    message
                    id="message"
                    placeholder="Type a message..."
                    width="100%"
                    fieldType="input"
                    autosize
                  />
                  {attachmentsInfo && attachmentsInfo?.map((att, index) => (
                    <>
                      <AttachmentTag key={index} >
                        <ClearSharpIcon
                          data-testid={`${att.name}_icon`}
                          style={{ fontSize: '12px', color: 'white', background: '#333', borderRadius: '50%', marginRight: '5px', cursor: 'pointer' }}
                          onClick={() => {
                            setAttachmentsInfo((prevAttachments) => prevAttachments.filter((_, i) => i !== index));
                          }}
                        />
                        {att.name}
                      </AttachmentTag>
                    </>
                  ))}

                </Message>
                <Absolute
                  zIndex={10}
                  width="26px"
                  right="25px"
                  top={form.attachment.length > 0 ? "25px" : "0px"}
                >
                  <Button
                                      id="send_message"

                    disabled={!(form.message || form.attachment.length) || !selectedConversationId}
                    type="transparent"
                    onClick={() => send()}>
                    <Icon name="send" />
                  </Button>
                </Absolute>
                <Absolute
                  width="13px"
                  smallLeft
                  zIndex={10}
                  top={form.attachment.length > 0 ? "25px" : "0px"}
                >
                  <Button type="transparent" onClick={() => setFileUploadModal(true)}>
                    <Icon name="paperClip" />
                  </Button>
                </Absolute>
              </Absolute>
              <Spacer></Spacer>
            </WhiteCard>
            {isProfile && selectedConversationId && (
              <ProfileContainer
                data={receiver}
                userRole={userRole}
                sender={data}
                isArchived={data?.isArchived}
                isMute={data?.isMute}
                handleChatArchive={handleArchive}
                handleChatMute={handleMute}
              />
            )}
          </Right>
        </WhiteCard>
      ) : (
        <WhiteCard height="85vh" padding="0px" center>
          Send a message?
        </WhiteCard>
      )}
      {fileUploadModal && <AttachmentModal
        setFileUploadModal={setFileUploadModal}
        userId={userId}
        onUpload={handleAttachmentUpload}
        setAttachmentsInfo={setAttachmentsInfo}
        attachmentsInfo={attachmentsInfo}
      />}
    </>
  )
}

export default MessageContainer
