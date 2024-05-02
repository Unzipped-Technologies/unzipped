import React, { useEffect, useState } from 'react'
import router from 'next/router'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { bindActionCreators } from 'redux'

import Nav from '../../components/unzipped/header'
import socket from '../../components/sockets/index'
import { parseCookies } from '../../services/cookieHelper'
import MessageContainer from '../../components/unzipped/MessageContainer'
import MobileInbox from '../../components/unzipped/dashboard/mobile/MobileInbox'
import ConversationContainer from '../../components/unzipped/ConversationContainer'
import MobileFreelancerFooter from '../../components/unzipped/MobileFreelancerFooter'
import {
  getConversationList,
  selectConversation,
  getFreelancerById,
  createTempFile,
  updateChatStatus,
  handleUnreadMessages,
  setCountToZero
} from '../../redux/actions'

const MobileDisplayBox = styled.div`
  position: relative;
  @media (min-width: 680px) {
    display: none;
  }
`

const Page = styled.div`
  display: flex;
  height: 10vh;
  top: 0px;
  flex-flow: column nowrap;
`

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr;
  height: calc(100% - 127px);
  max-height: 100%;
  @media (max-width: 600px) {
    height: calc(100% - 140px);
  }
`

const MobileContainer = styled.div`
  @media (max-width: 600px) {
    display: none;
  }
`

const Inbox = ({
  token,
  cookie,
  user,
  conversations,
  selectedConversationId,
  selectedConversation,
  messagesCount,
  getConversationList,
  selectConversation,
  createTempFile,
  updateChatStatus,
  handleUnreadMessages,
  setCountToZero
}) => {
  const [onlineUsers, setOnlineUsers] = useState([])
  const access = token.access_token || cookie
  const [form, setForm] = useState({
    filter: {},
    skip: 0,
    take: 25
  })
  const [messageLimit, setMessageLimit] = useState(0)
  const [conversationId, setConversationId] = useState(selectedConversationId)
  const [windowSize, setWindowsize] = useState('126px')
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    if (!access) {
      router.push('/login')
    }
    getConversationList(form, access)
    socket.emit('userConnected', user._id)
    socket.on('updateOnlineUsers', onlineUsers => {
      setOnlineUsers(Object.keys(onlineUsers))
    })
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        socket.emit('userConnected', user._id)
      } else {
        socket.emit('updateOnlineUsers')
      }
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  useEffect(() => {
    socket.on('refreshConversationList', () => {
      getConversationList(form, access)
    })

    return () => {
      socket.off('refreshConversationList')
    }
  }, [])

  useEffect(() => {
    socket.on('chat unread', response => {
      setCountToZero(response)
    })

    return () => {
      socket.off('chat unread')
    }
  }, [])

  useEffect(() => {
    if (conversations.length && !selectedConversation) {
      const conversationId = conversations[0]?._id

      openConversation(conversationId)
    } else {
      openConversation(selectedConversation?._id)
    }
  }, [conversations])

  const createNewFile = data => {
    createTempFile(data, access)
  }

  const openConversation = async id => {
    setConversationId(id)
    setMessageLimit(10)
    await selectConversation(id, 10)
  }

  const handleMute = status => {
    updateChatStatus('isMute', status, selectedConversation._id, access)
  }
  const handleArchive = async status => {
    updateChatStatus('isArchived', status, selectedConversation._id, access)
  }

  const handleUnreadCount = selectedConversation => {
    handleUnreadMessages(selectedConversation)
  }

  const handleMessagesOnScroll = () => {
    setMessageLimit(prevLimit => prevLimit + 10)
    selectConversation(conversationId, +messageLimit + 10)
  }

  const handleResize = () => {
    let windowSize = window.innerWidth <= 600 ? '85px' : '125px'
    setWindowsize(windowSize)
    if (window.innerWidth <= 600) {
      setIsMobile(true)
    } else {
      setIsMobile(false)
    }
  }

  useEffect(() => {
    handleResize()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const setUnreadToZero = (conversationId, receiverId) => {
    socket.emit('chat unread', {
      conversationId: conversationId,
      receiverId: receiverId
    })
  }
  return (
    <Page>
      {window.innerWidth >= 680 ? (
        <>
          <Nav isSubMenu marginBottom={windowSize} />

          <Container>
            <ConversationContainer
              isMobile={isMobile}
              selectedConversation={selectedConversation}
              conversations={conversations}
              userEmail={user.email}
              userId={user._id}
              openConversation={openConversation}
              socket={socket}
            />
            <MobileContainer>
              <MessageContainer
                selectedConversationId={conversationId}
                data={selectedConversation}
                setUnreadToZero={setUnreadToZero}
                userEmail={user.email}
                userName={`${user.FirstName} ${user.LastName}` ?? user?.FullName}
                userId={user._id}
                userRole={user?.role}
                createTempFile={createNewFile}
                handleChatArchive={handleArchive}
                handleChatMute={handleMute}
                access={access}
                socket={socket}
                onlineUsers={onlineUsers}
                handleUnreadCount={handleUnreadCount}
                messagesCount={messagesCount}
                messageLimit={messageLimit}
                handleMessagesOnScroll={handleMessagesOnScroll}
                isMobile={isMobile}
              />
            </MobileContainer>
          </Container>
        </>
      ) : (
        <MobileInbox
          conversations={conversations}
          userId={user._id}
          userEmail={user.email}
          openConversation={openConversation}
          handleUnreadCount={handleUnreadCount}
        />
      )}
      <MobileDisplayBox>
        <MobileFreelancerFooter defaultSelected="Messages" />
      </MobileDisplayBox>
    </Page>
  )
}

Inbox.getInitialProps = async ({ req, res }) => {
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
    handleUnreadMessages: bindActionCreators(handleUnreadMessages, dispatch),
    setCountToZero: bindActionCreators(setCountToZero, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Inbox)
