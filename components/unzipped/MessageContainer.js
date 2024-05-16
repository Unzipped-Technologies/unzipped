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

const Right = styled.div`
  display: grid;
  position: relative;
  grid-template-columns: ${({ isFullWidth }) => (isFullWidth ? '1fr' : '3fr 1fr')};
  width: 100%;
  height: 100%;
`

export const Message = styled.div`
  position: relative;
  width: 100%;
`

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

  @media (max-height: 845px) {
    height: 67vh;
  }
  @media (max-height: 761px) {
    height: 65vh;
  }
  @media (max-height: 721px) {
    height: 63vh;
  }
  @media (max-height: 669px) {
    height: 60vh;
  }
`

const Spacer = styled.div`
  height: 64px;
  width: 100%;
`
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
    attachment: ''
  })

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
    socket.on('chat message', message => {
      handleUnreadCount(message)
      setMessages(prevMessages => [
        ...prevMessages,
        {
          _id: message?._id,
          message: message?.message,
          attachment: '',
          isAlert: false,
          isRead: false,
          isActive: true,
          isArchived: false,
          isSingle: true,
          sender: message?.sender?.userId,
          conversationId: message?.conversationId,
          updatedAt: message?.updatedAt,
          __v: 0
        }
      ])
      const scroll = document.getElementById('topScroll')

      if (scroll?.scrollTop + scroll.clientHeight >= scroll.scrollHeight) {
        setUnreadToZero(selectedConversationId, sender?.userId?._id)
      }
    })

    return () => {
      socket.off('chat message')
    }
  })

  useEffect(() => {
    setMessages(data?.messages?.slice().reverse())
    if (data?.participants?.length) {
      const receiver = data?.participants?.length && data?.participants?.find(e => e?.userId?.email !== userEmail)
      const sender = data?.participants?.length && data?.participants?.find(e => e?.userId?.email === userEmail)
      setReceiver(receiver)
      setSender(sender)
      setForm({
        ...form,
        receiverId: receiver?.userId?._id ?? null,
        senderId: sender?.userId?._id ?? null
      })
    }
  }, [data])

  useEffect(() => {
    socket.on('refreshMessageList', () => {})

    return () => {
      socket.off('refreshMessageList')
    }
  }, [])

  const handleLastMessageScroll = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'auto' })
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
      })
      socket.emit('stop-typing', {
        receiverId: form.receiverId,
        conversationId: data._id || null,
        isTyping: false
      })
      handleLastMessageScroll()
      setForm({
        ...form,
        message: '',
        attachment: ''
      })
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
        <WhiteCard noMargin height="100%" padding="0px">
          <WhiteCard noMargin row padding="10px 40px">
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
            <Button type="transparent" noBorder onClick={() => setIsProfile(!isProfile)}>
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
                <div>
                  {messages?.map((e, index) => {
                    if (e?.sender === userId && e?._id) {
                      return (
                        <WhiteCard
                          key={e?._id}
                          autoFoucs
                          half
                          row
                          borderColor="transparent"
                          unset
                          padding="10px"
                          alignEnd
                          justifyEnd>
                          <WhiteCard
                            background="#007FED"
                            noMargin
                            maxWidth="50%"
                            width="436px"
                            unset
                            borderRadius="15px 15px 3px 15px"
                            padding="10px 10px"
                            style={{ width: '20px !important' }}>
                            <DarkText small noMargin color="#fff">
                              {e?.message}
                            </DarkText>
                            <Absolute bottom="5px" width="100px">
                              <DarkText
                                noMargin
                                color="#fff"
                                fontSize="12px"
                                right
                                topPadding="15px"
                                padding="0px 0px 0px 0px">
                                {ValidationUtils.getTimeFormated(e?.updatedAt)}
                              </DarkText>
                            </Absolute>
                          </WhiteCard>
                          <Span space unset>
                            <Image src={sender?.userId?.profileImage} height="54px" width="54px" radius="22%" />
                          </Span>
                        </WhiteCard>
                      )
                    } else if (e?.conversationId === data?._id && e?._id) {
                      return (
                        <WhiteCard half row borderColor="transparent" unset padding="10px" alignEnd>
                          <Span space unset>
                            <Image src={receiver?.userId?.profileImage} height="54px" width="54px" radius="22%" />
                          </Span>
                          <WhiteCard
                            background="transparent"
                            borderColor="transparent"
                            noMargin
                            maxWidth="50%"
                            width="306px"
                            unset
                            borderRadius="15px 15px 3px 15px"
                            padding="10px 10px">
                            <DarkText small noMargin>
                              {e?.message}
                            </DarkText>
                            <Absolute right="48px" bottom="0px" width="100px">
                              <DarkText noMargin fontSize="12px">
                                {ValidationUtils.getTimeFormated(e?.updatedAt)}
                              </DarkText>
                            </Absolute>
                          </WhiteCard>
                        </WhiteCard>
                      )
                    }
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

              <Absolute bottom="10px" width="95%" right="2.5%">
                <Message>
                  <FormField
                    value={form.message}
                    onChange={e => {
                      setForm({ ...form, message: e.target.value })
                      socket.emit('typing', {
                        receiverId: form.receiverId,
                        conversationId: data._id || null,
                        name: userName,
                        isTyping: true
                      })
                    }}
                    handleEnterKey={e => {
                      handleEnterKey(e)
                    }}
                    onBlur={handleBlurTyping}
                    message
                    placeholder="Type a message..."
                    width="100%"
                    fieldType="input"
                    autosize></FormField>
                </Message>
                <Absolute zIndex={10} width="26px" right="25px">
                  <Button
                    disabled={!(form.message || form.attachment) || !selectedConversationId}
                    type="transparent"
                    onClick={() => send()}>
                    <Icon name="send" />
                  </Button>
                </Absolute>
                <Absolute width="13px" smallLeft zIndex={10}>
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
      {fileUploadModal && <AttachmentModal setFileUploadModal={setFileUploadModal} createTempFile={createTempFile} />}
    </>
  )
}

export default MessageContainer
