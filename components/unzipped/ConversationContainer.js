import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import SimpleBar from 'simplebar-react'

import theme from '../ui/theme'
import Image from '../../components/ui/Image'
import SearchBar from '../../components/ui/SearchBar'
import { ValidationUtils, ConverterUtils } from '../../utils'
import { DarkText, Span, TypingAnimation } from './dashboard/style'

const Div = styled.div`
  width: 95%;
`
const Extra = styled.div`
  height: 150px;
`

const Scroll = styled(SimpleBar)`
  width: 100%;
  z-index: 1;
  height: calc(100% - 20px);
  overflow: hidden auto;
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
    height: 1px !important;
  }
`

const WhiteCard = styled.div`
  @media (min-width: 681px) {
    padding-left: ${({ paddingLeft }) => (paddingLeft ? `${paddingLeft} !important` : '0px')};
    border-left: ${({ borderLeft }) => (borderLeft ? `4px solid ${borderLeft} !important` : '0px')};
    overflow: visible hidden;
    background: ${({ background }) => (background ? background : '#fff')};
    border: 1px ${({ borderColor }) => (borderColor ? borderColor : '#d8d8d8')} solid;
    border-radius: ${({ borderRadius }) => (borderRadius ? borderRadius : '5px')};
    max-width: ${({ maxWidth }) => (maxWidth ? maxWidth : '20vw')};
    width: ${({ width }) => (width ? width : '20vw')};
    min-width: ${({ minWidth }) => (minWidth ? minWidth : '300px')};
    display: flex;
    cursor: ${({ clickable }) => (clickable ? 'pointer' : 'default')};
    flex-flow: ${({ row }) => (row ? 'row' : 'column')};

    min-height: ${({ size, unset, height, cardHeightDesktop }) =>
      size === 'large'
        ? '151px'
        : size === 'extraLarge'
        ? '370px'
        : unset
        ? 'unset'
        : cardHeightDesktop
        ? '262px'
        : height
        ? height
        : '63px'};
    align-items: ${({ alignEnd }) => (alignEnd ? 'flex-end' : 'center')};
    justify-content: ${({ center, justifyEnd }) => (center ? 'center' : justifyEnd ? 'flex-end' : 'normal')};
    padding: ${({ padding }) => (padding ? padding : '20px 20px')};
    position: relative;
    box-shadow: ${({ shadow }) => (shadow ? shadow : 'none')};
    margin-bottom: ${({ noMargin, half }) => (noMargin ? '0px' : half ? '12px' : '24px')};
    overflow: ${({ overflow, overlayDesktop }) => (overflow ? overflow : overlayDesktop ? 'overlay' : 'visible')};
  }
  @media (max-width: 1080px) {
    min-width: 270px;
  }
  @media (max-width: 840px) {
    min-width: 240px;
  }
  @media (max-width: 681px) {
    background: ${({ background }) => (background ? background : '#fff')};
    border: ${({ borderColor, noBorder }) => (noBorder ? '' : borderColor ? borderColor : '1px #d8d8d8 solid')};
    border-radius: ${({ borderRadius }) => (borderRadius ? borderRadius : '5px')};
    max-width: 20vw;
    width: 100%;
    display: ${({ display }) => (display ? display : 'flex')};
    gap: ${({ gap }) => (gap ? gap : '')};
    cursor: ${({ clickable }) => (clickable ? 'pointer' : 'default')};
    flex-flow: ${({ row }) => (row ? 'row' : 'column')};
    min-height: ${({ size, unset, height, cardHeightDesktop }) =>
      size === 'large'
        ? '151px'
        : size === 'extraLarge'
        ? '370px'
        : unset
        ? 'unset'
        : cardHeightDesktop
        ? '262px'
        : height
        ? height
        : '63px'};

    align-items: ${({ alignEnd }) => (alignEnd ? 'flex-end' : 'center')};
    justify-content: ${({ center, justifyEnd }) => (center ? 'center' : justifyEnd ? 'flex-end' : 'normal')};
    padding: 0px;
    position: relative;
    box-shadow: ${({ shadow }) => (shadow ? shadow : 'none')};
    margin-bottom: ${({ noMargin, half, marginBottom }) =>
      noMargin ? '0px' : half ? '12px' : marginBottom ? marginBottom : '24px'};
    overflow: ${({ overflow, overlayDesktop }) => (overflow ? overflow : overlayDesktop ? 'overlay' : 'visible')};
  }
  @media (max-width: 600px) {
    display: flex;
    width: 100%;
    min-width: 100%;
    justify-content: space-between;
  }
`

const ItemCard = styled.div`
  padding-left: ${({ paddingLeft }) => (paddingLeft ? `${paddingLeft} !important` : '0px')};
  border-left: ${({ borderLeft }) => (borderLeft ? `4px solid ${borderLeft} !important` : '0px')};
  background: ${({ background }) => (background ? background : '#fff')};
  border: 1px ${({ borderColor }) => (borderColor ? borderColor : '#d8d8d8')} solid;
  border-radius: ${({ borderRadius }) => (borderRadius ? borderRadius : '5px')};
  max-width: ${({ maxWidth }) => (maxWidth ? maxWidth : '20vw')};
  width: ${({ width }) => (width ? width : '20vw')};
  min-width: ${({ minWidth }) => (minWidth ? minWidth : '275px')};
  display: flex;
  cursor: ${({ clickable }) => (clickable ? 'pointer' : 'default')};
  flex-flow: ${({ row }) => (row ? 'row' : 'column')};
  min-height: ${({ size, unset, height, cardHeightDesktop }) =>
    size === 'large'
      ? '151px'
      : size === 'extraLarge'
      ? '370px'
      : unset
      ? 'unset'
      : cardHeightDesktop
      ? '262px'
      : height
      ? height
      : '63px'};
  align-items: ${({ alignEnd }) => (alignEnd ? 'flex-end' : 'center')};
  justify-content: ${({ center, justifyEnd, justifyStart }) =>
    center ? 'center' : justifyEnd ? 'flex-end' : justifyStart ? 'flex-start' : 'normal'};
  padding: ${({ padding }) => (padding ? padding : '20px 20px')};
  position: relative;
  box-shadow: ${({ shadow }) => (shadow ? shadow : 'none')};
  margin-bottom: ${({ noMargin, half }) => (noMargin ? '0px' : half ? '12px' : '24px')};
  @media (max-width: 600px) {
    padding: 10px 0px;
  }
`

const ConversationContainer = ({
  conversations = [],
  userId,
  userEmail,
  openConversation,
  isMobile,
  selectedConversation,
  socket
}) => {
  const [conversation, setConversation] = useState(conversations)
  const [selectedItem, setSelectedItem] = useState(null)
  const [archivedChatsShow, setArchivedChatsShow] = useState(false)
  const [typing, setTyping] = useState({})

  useEffect(() => {
    setConversation(conversations)
  }, [conversations])

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
    if (conversations.length && !selectedConversation) {
      const conversationId = conversations[0]?._id
      openConversation(conversationId)
      setSelectedItem(conversationId)
    } else if (selectedConversation?._id) {
      const conversationId = conversations?.find(conversation => conversation?._id === selectedConversation?._id)?._id
      openConversation(conversationId)
      setSelectedItem(conversationId)
    }
  }, [])

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
      background={_id === selectedItem ? '#F0F0F0' : '#fff'}
      noMargin
      minWidth="100%"
      padding="5px"
      overflow="hidden"
      height="63px"
      onClick={() => {
        openConversation(_id)
        setSelectedItem(_id)
      }}>
      <Span>
        <Image src={receiver?.userId?.profileImage} height="54px" width="54px" radius="22%" />
        <ItemCard
          background={_id === selectedItem ? '#F0F0F0' : '#fff'}
          borderColor={'transparent'}
          noMargin
          padding="0px"
          maxWidth="80%"
          minWidth="150px"
          justifyStart>
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
            <DarkText padding="5px 10px 0px 0px" center fontSize="11px" lighter noMargin color="#000000">
              {ValidationUtils.formatDateWithDate(updatedAt)}
            </DarkText>
          </span>
          <span
            style={{
              display: 'flex',
              justifyContent: 'flex-start',
              width: '100%',
              alignItems: 'flex-start',
              padding: '0px !important',
              margin: '15px 0px 0px 10px',
              height: '23px',
              float: 'left'
            }}>
            <DarkText width="200px" fontSize="11px" color="#000000" noMargin>
              {ValidationUtils.truncate(ValidationUtils.getMostRecentlyUpdated(messages)?.message, 58)}
            </DarkText>

            {typing?.isTyping &&
              typing?.receiverId === sender?.userId?._id &&
              typing?.conversationId === _id &&
              selectedConversation?._id !== typing?.conversationId && (
                <DarkText center noMargin width="55px">
                  <TypingAnimation>
                    <span></span>
                    <span></span>
                    <span></span>
                  </TypingAnimation>
                </DarkText>
              )}
          </span>
        </ItemCard>
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
      </Span>
    </WhiteCard>
  )

  const RenderConversations = ({ type }) =>
    conversation
      .filter(item => item?.isArchived === (type === 'archived'))
      .map((item, index) => {
        const receiver = item?.participants?.find(e => e?.userId?.email !== userEmail)
        const sender = item?.participants?.find(e => e?.userId?.email === userEmail)
        return <ConversationCard receiver={receiver} sender={sender} item={item} index={index} />
      })

  return (
    <WhiteCard minWidth="341px" padding="10px 0px 0px 0px" overflow="hidden" noMargin>
      <Div>
        <SearchBar margin="10px 0px 10px 0px" width="100%" setFilter={handleSearch} />
      </Div>
      <Scroll>
        <RenderConversations type="unarchived" />
        {conversation?.some(item => item?.isArchived === true) && (
          <b className="text-dark" onClick={() => setArchivedChatsShow(!archivedChatsShow)}>
            {' '}
            <span className="fas fa-archive text-success ms-2"></span> Archived Chats
          </b>
        )}
        {archivedChatsShow && <RenderConversations type="archived" />}

        <Extra></Extra>
      </Scroll>
    </WhiteCard>
  )
}

export default ConversationContainer
