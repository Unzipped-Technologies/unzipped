import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import SimpleBar from 'simplebar-react'
import { useRouter } from 'next/router'

import { DarkText } from '../style'
import Image from '../../../ui/Image'
import theme from '../../../ui/theme'
import BackHeader from '../../BackHeader'
import SearchBar from '../../../ui/SearchBar'
import IconComponent from '../../../ui/icons/IconComponent'
import { ValidationUtils, ConverterUtils } from '../../../../utils'

const Extra = styled.div`
  height: 150px;
`

const Scroll = styled(SimpleBar)`
  width: 100%;
  z-index: 1;
  .simplebar-track > .simplebar-scrollbar:before {
    background-color: ${() => theme.tint2};
    opacity: 0.1;
  }
  .simplebar-track > .simplebar-scrollbar.simplebar-visible:before {
    opacity: 0.3;
  }
  .simplebar-track[style] {
    background-color: transparent !important;
  }
  .simplebar-placeholder {
    width: auto !important;
  }
`

const WhiteCard = styled.div`
  display: ${({ display }) => (display ? display : 'flex')};
  flex-direction: row;
  align-items: ${({ alignEnd, alignStart }) => (alignEnd ? 'flex-end' : alignStart ? 'flex-start' : 'center')};
  justify-content: ${({ center, justifyEnd, justifyStart }) =>
    center ? 'center' : justifyEnd ? 'flex-end' : justifyStart ? 'flex-start' : 'normal'};

  background: ${({ background }) => (background ? background : '#FFFFFF')};
  border-bottom: ${({ borderBottom, noBorder }) => (noBorder ? '' : borderBottom ? borderBottom : '1px #d8d8d8 solid')};
  border-radius: ${({ borderRadius }) => (borderRadius ? borderRadius : '5px')};
  max-width: 20vw;
  width: 100%;
  min-width: 100%;
  gap: ${({ gap }) => (gap ? gap : '')};
  cursor: ${({ clickable }) => (clickable ? 'pointer' : 'default')};

  padding: ${({ padding }) => (padding ? padding : '10px')};
  position: relative;
  box-shadow: ${({ shadow }) => (shadow ? shadow : 'none')};

  overflow: ${({ overflow, overlayDesktop }) => (overflow ? overflow : overlayDesktop ? 'overlay' : 'visible')};
`

const MobileInbox = ({ conversations = [], userId, userEmail, openConversation, isMobile }) => {
  const router = useRouter()

  const [conversation, setConversation] = useState(conversations)
  const [archivedChatsShow, setArchivedChatsShow] = useState(false)

  useEffect(() => {
    setConversation(conversations)
  }, [])

  useEffect(() => {
    if (conversations.length) {
      const conversationId = conversations[0]?._id
      openConversation(conversationId)
    }
  }, [conversations])

  const handleSearch = e => {
    const filteredConversations = conversations.filter(convo => {
      const participants = convo.participants
      return participants.some(participant => {
        const fullName = `${participant.userId.FirstName} ${participant.userId.LastName}`
        const searchChars = e.split('')

        return participant.userId._id !== userId && searchChars.every(char => fullName.includes(char))
      })
    })

    setConversation(filteredConversations)
    if (e === '' || e === undefined || e === null || !e) {
      setConversation(conversations)
    }
  }

  const ConversationCard = ({ receiver, sender, index, item: { _id, messages, updatedAt } }) => (
    <WhiteCard
      key={index}
      noMargin
      minWidth="100%"
      padding="10px 5px 10px 5px"
      overflow="hidden"
      border="1px  solid #d8d8d8"
      height="63px"
      justifyStart
      alignStart
      onClick={() => {
        router.push(`/dashboard/chat/${_id}`)
      }}>
      <Image src={receiver?.userId?.profileImage} height="54px" width="54px" radius="22%" />
      <div>
        <span
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            padding: '0px !important',
            margin: '5px 0px 0px 0px',
            height: '23px'
          }}>
          <DarkText width="300px" fontSize="16px" marginLeft="75px" lineHeight="23px" color="#000000">
            {ConverterUtils.capitalize(`${ValidationUtils.getFullNameFromUser(receiver?.userId)}`)}
          </DarkText>
          <DarkText center fontSize="11px" lighter color="#000000" paddingLeft>
            {ValidationUtils.formatDateWithDate(updatedAt)}
          </DarkText>
        </span>
        <DarkText
          fontSize="11px"
          color="#000000"
          padding="5px 0px 0px 0px"
          marginLeft="100px"
          textOverflow="ellipsis"
          noMargin>
          {ValidationUtils.getMostRecentlyUpdated(messages)?.message}
        </DarkText>
      </div>
      {+sender?.unreadCount > 0 && (
        <span
          style={{
            color: 'white',
            background: 'green',
            padding: '3px 6px',
            marginTop: '5px',
            borderRadius: '10px',
            height: '20px',
            display: 'flex',
            alignItems: 'center',
            width: 'maxContent',
            fontSize: '14px'
          }}>
          {sender?.unreadCount}
        </span>
      )}
    </WhiteCard>
  )

  const RenderConversations = ({ type }) =>
    conversation
      .filter(item => item?.isArchived === (type === 'archived'))
      .map((item, index) => {
        const receiver = item?.participants?.find(e => e.userId?.email !== userEmail)
        const sender = item?.participants?.find(e => e.userId?.email === userEmail)
        return <ConversationCard receiver={receiver} sender={sender} item={item} index={index} />
      })

  return (
    <>
      <BackHeader title="Messages">
        <span
          onClick={() => {
            router.back()
          }}>
          <IconComponent name="navbarToggleIcon" width="39" height="39" viewBox="0 0 39 39" fill="#333333" />
        </span>
      </BackHeader>
      <SearchBar
        margin="10px 5px 10px 5px"
        height="50px"
        width="100%"
        setFilter={handleSearch}
        border="1px solid ##C4C4C4"
        borderRadius="5px"
      />
      <Scroll>
        <RenderConversations type="unarchived" />
        {conversation?.some(item => item?.isArchived === true) && (
          <div className="mt-3">
            <b className="text-dark" onClick={() => setArchivedChatsShow(!archivedChatsShow)}>
              {' '}
              <span className="fas fa-archive text-success ms-2"></span> Archived Chats
            </b>
          </div>
        )}
        {archivedChatsShow && <RenderConversations type="archived" />}
        <Extra></Extra>
      </Scroll>
    </>
  )
}
export default MobileInbox
