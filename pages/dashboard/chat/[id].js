import React, { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import theme from '../../../components/ui/theme'
import Icon from '../../../components/ui/Icon'
import { ValidationUtils } from '../../../utils'
import Image from '../../../components/ui/Image'
import Button from '../../../components/ui/Button'
import socket from '../../../components/sockets/index'
import FormField from '../../../components/ui/FormField'
import { parseCookies } from '../../../services/cookieHelper'
import BackHeader from '../../../components/unzipped/BackHeader'
import IconComponent from '../../../components/ui/icons/IconComponent'
import AttachmentModal from '../../../components/unzipped/AttachmentModal'
import MobileChatMenu from '../../../components/unzipped/dashboard/mobile/MobileChatMenu'
import { DarkText, WhiteCard, Absolute, TypingAnimation } from '../../../components/unzipped/dashboard/style'
import {
  getConversationList,
  selectConversation,
  getFreelancerById,
  createTempFile,
  updateChatStatus,
  handleUnreadMessages
} from '../../../redux/actions'

const Box = styled.div`
  @media (min-width: 680px) {
    display: none;
  }
`

export const Div = styled.div`
  width: 100%;
  z-index: 1;
  height: ${({ isTyping }) => (isTyping ? '82vh' : '82vh')};
  margin: ${({ margin }) => (margin ? margin : '10px 0px 0px 0px')};
  z-index: 1;
  overflow: scroll;
  position: relative;
  padding-bottom: 10px;
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
`

export const Message = styled.div`
  width: 100%;
  position: absolute;
  z-index: 1;
`

const Container = styled.div`
  display: ${({ display }) => (display ? display : 'block')};
  align-items: ${({ alignItems }) => (alignItems ? alignItems : 'stretch')};
  justify-content: ${({ justifyContent }) => (justifyContent ? justifyContent : 'flex-start')};
  flex-direction: ${({ flexDirection }) => (flexDirection ? flexDirection : 'row')};
  flex-flow: ${({ position }) => (position ? position : 'row nowrap')};
  flex: ${({ flex }) => (flex ? flex : '0 1 auto')};
  box-sizing: ${({ boxSizing }) => (boxSizing ? boxSizing : 'content-box')};
  // Style

  width: ${({ width }) => (width ? width : 'auto')};
  min-width: ${({ minWidth }) => (minWidth ? minWidth : 'auto')};
  height: ${({ height }) => (height ? height : 'auto')};
  position: ${({ position }) => (position ? position : 'static')};
  background: ${({ background }) => (background ? background : 'transparent')};
  border: ${({ border }) => (border ? border : '#d8d8d8')};
  border-radius: ${({ borderRadius }) => (borderRadius ? borderRadius : '0px')};
  padding: ${({ padding }) => (padding ? padding : '0px')};
  margin: ${({ margin }) => (margin ? margin : '0px')};
  word-break: ${({ wordBreak }) => (wordBreak ? wordBreak : 'normal')};
  cursor: ${({ cursor }) => (cursor ? cursor : 'default')};
  letter-spacing: ${({ letterSpacing }) => (letterSpacing ? letterSpacing : '0.15008px')};
  text-overflow: ${({ textOverflow }) => (textOverflow ? textOverflow : 'unset')};
  white-space: ${({ whiteSpace }) => (whiteSpace ? whiteSpace : 'normal')};
  overflow: ${({ overflow }) => (overflow ? overflow : 'visible')};
  box-shadow: ${({ boxShadow }) => (boxShadow ? boxShadow : 'none')};
  z-index: ${({ zIndex }) => (zIndex ? zIndex : 'auto')};
`

const Chat = ({
  token,
  cookie,
  user,
  selectedConversationId,
  selectedConversation,
  messagesCount,
  selectConversation,
  createTempFile,
  updateChatStatus,
  handleUnreadMessages
}) => {
  const router = useRouter()
  const { id } = router.query
  const [typing, setTyping] = useState({})
  const access = token.access_token || cookie

  const messagesEndRef = useRef()
  const [conversationId, setConversationId] = useState(selectedConversationId)
  const [messageLimit, setMessageLimit] = useState(0)
  const [receiver, setReceiver] = useState(null)
  const [sender, setSender] = useState(null)
  const [messages, setMessages] = useState([])
  const [fileUploadModal, setFileUploadModal] = useState(false)
  const [showSubMenu, setSubMenu] = useState(false)
  const [top, setTop] = useState()

  const [form, setForm] = useState({
    senderId: null,
    receiverId: null,
    message: '',
    attachment: ''
  })

  const openConversation = () => {
    setConversationId(id)
    setMessageLimit(10)
    selectConversation(id, 10)
  }

  useEffect(async () => {
    if (id) await openConversation()
    handleLastMessageScroll()
  }, [])

  useEffect(() => {
    setMessages(selectedConversation?.messages?.slice().reverse()) || []
    const receiver = selectedConversation?.participants.find(e => e?.userId?.email !== user.email)
    const sender = selectedConversation?.participants.find(e => e?.userId?.email === user.email)
    setReceiver(receiver)
    setSender(sender)
    setForm({
      ...form,
      senderId: sender?.userId?._id,
      receiverId: receiver?.userId?._id
    })
  }, [selectedConversation])

  // Sockets

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
          message: message?.message,
          attachment: '',
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
      ])
      const scroll = document.getElementById('topScroll')

      if (scroll?.scrollTop + scroll.clientHeight >= scroll.scrollHeight) {
        setUnreadToZero(selectedConversationId, sender?.userId?._id)
      }
    })

    return () => {
      socket.off('chat message')
      // socket.off('typing')
      // socket.off('stop-typing')
    }
  })

  useEffect(() => {
    socket.on('refreshMessageList', () => {})

    return () => {
      socket.off('refreshMessageList')
    }
  }, [])

  // End Sockets

  const setUnreadToZero = (conversationId, receiverId) => {
    socket.emit('chat unread', {
      conversationId: conversationId,
      receiverId: receiverId
    })
  }

  const handleUnreadCount = selectedConversation => {
    handleUnreadMessages(selectedConversation)
  }

  const handleLastMessageScroll = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' })
  }

  const handleEnterKey = e => {
    if (e.keyCode === 13 && form.message?.length) {
      send()
    }
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
        conversationId: selectedConversation._id || null,
        updatedAt: new Date().toISOString(),
        access
      })
      socket.emit('stop-typing', {
        receiverId: form.receiverId,
        conversationId: selectedConversation._id || null,
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

  const handleBlurTyping = () => {
    socket.emit('stop-typing', {
      receiverId: form.receiverId,
      conversationId: selectedConversationId || null,
      name: null,
      isTyping: false
    })
  }

  const handleMessagesOnScroll = () => {
    setMessageLimit(prevLimit => prevLimit + 10)
    selectConversation(conversationId, +messageLimit + 10)
  }

  const handleScroll = () => {
    const scroll = document.getElementById('topScroll')
    setTop(scroll.scrollHeight - scroll.clientHeight)
    if (scroll.scrollTop === 0) {
      if (messageLimit < messagesCount) {
        handleMessagesOnScroll()
      }
    }
  }

  const openMenu = () => {
    setSubMenu(true)
  }
  const closeMenu = () => {
    setSubMenu(false)
  }

  const handleArchive = async status => {
    updateChatStatus('isArchived', status, selectedConversation._id, access)
  }

  const handleMute = status => {
    updateChatStatus('isMute', status, selectedConversation._id, access)
  }
  return (
    <Box>
      {showSubMenu ? (
        <MobileChatMenu
          handleFilterOpenClose={closeMenu}
          role={user}
          isArchived={selectedConversation?.isArchived}
          isMute={selectedConversation?.isMute}
          handleChatArchive={handleArchive}
          handleChatMute={handleMute}
          data={receiver}
        />
      ) : (
        <>
          <BackHeader title="Messages">
            <span onClick={openMenu}>
              <IconComponent name="navbarToggleIcon" width="39" height="39" viewBox="0 0 39 39" fill="#333333" />
            </span>
          </BackHeader>
          <WhiteCard noMargin height="100%" style={{ position: 'static' }}>
            <Div
              margin="0px 0px 0px 0px"
              onScroll={() => {
                handleScroll()
              }}
              id="topScroll"
              isTyping={
                typing?.isTyping &&
                typing?.receiverId === form.senderId &&
                typing?.conversationId === selectedConversation?._id
              }>
              {messages?.map((e, index) => {
                if (e?.sender === user._id) {
                  return (
                    <Container key={`message_${index}`} display="flex" justifyContent="flex-end" padding="10px">
                      <Container width="auto" minWidth="auto" padding="5px 10px 10px 10px">
                        <Container background="#007FED" borderRadius="8px 8px 0px 8px" padding="20px 20px 10px 20px">
                          <DarkText small noMargin fontSize="16px" lineHeight="23px" color={'#fff'}>
                            {e?.message}
                          </DarkText>
                        </Container>

                        <DarkText noMargin color="black" fontSize="12px" topPadding="15px" right>
                          {ValidationUtils.getTimeFormated(e?.updatedAt)}
                        </DarkText>
                      </Container>

                      <Image src={sender?.userId?.profileImage} height="44px" width="44px" radius="15px" />
                    </Container>
                  )
                } else {
                  return (
                    <Container
                      key={`message_${index}`}
                      display="flex"
                      justifyContent="flex-start"
                      margin="20px 0px 0px 0px"
                      padding="10px">
                      <Image src={sender?.userId?.profileImage} height="44px" width="44px" radius="15px" />
                      <Container width="auto" minWidth="auto" padding="5px 10px 10px 5px">
                        <Container borderRadius="15px 15px 3px 15px">
                          <DarkText small noMargin justify fontSize="16px" lineHeight="23px">
                            {e?.message}
                          </DarkText>
                        </Container>

                        <DarkText noMargin color="black" fontSize="12px" topPadding="10px" right>
                          {ValidationUtils.getTimeFormated(e?.updatedAt)}
                        </DarkText>
                      </Container>
                    </Container>
                  )
                }
              })}
              <div ref={messagesEndRef} />
            </Div>
            {typing?.isTyping &&
              typing?.receiverId === form.senderId &&
              typing?.conversationId === selectedConversation?._id && (
                <TypingAnimation>
                  {typing?.name?.substring(0, 20)}
                  {'   '}
                  <span></span>
                  <span></span>
                  <span></span>
                </TypingAnimation>
              )}
            <Absolute bottom="19px" width="100%" right="0">
              <Message>
                <FormField
                  value={form.message}
                  onChange={e => {
                    setForm({ ...form, message: e.target.value })
                    socket.emit('typing', {
                      receiverId: form.receiverId,
                      conversationId: selectedConversation._id || null,
                      name: `${user.FirstName} ${user.LastName}` ?? user?.FullName,
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
                  border="1px solid #C4C4C4"
                  borderRadius="5px"
                  fieldType="input"
                  autosize></FormField>
              </Message>
              <Absolute zIndex={10} width="26px" right="25px">
                <Button type="transparent" disabled={!(form.message || form.attachment)} onClick={() => send()}>
                  <Icon name="send" />
                </Button>
              </Absolute>
              <Absolute width="13px" smallLeft zIndex={10}>
                <Button type="transparent" onClick={() => setFileUploadModal(true)}>
                  <Icon name="paperClip" />
                </Button>
              </Absolute>
            </Absolute>
            {fileUploadModal && (
              <AttachmentModal setFileUploadModal={setFileUploadModal} createTempFile={createTempFile} />
            )}
          </WhiteCard>
        </>
      )}
    </Box>
  )
}

Chat.getInitialProps = async ({ req, res }) => {
  const token = parseCookies(req)
  return {
    token: token && token
  }
}

const mapStateToProps = state => {
  return {
    cookie: state.Auth.token,
    user: state.Auth?.user,
    conversations: state.Messages?.conversations,
    selectedConversation: state.Messages?.selectedConversation,
    messagesCount: state.Messages?.messagesCount,
    selectedConversationId: state.Messages?.conversationId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getConversationList: bindActionCreators(getConversationList, dispatch),
    selectConversation: bindActionCreators(selectConversation, dispatch),
    getFreelancerById: bindActionCreators(getFreelancerById, dispatch),
    createTempFile: bindActionCreators(createTempFile, dispatch),
    updateChatStatus: bindActionCreators(updateChatStatus, dispatch),
    handleUnreadMessages: bindActionCreators(handleUnreadMessages, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat)
