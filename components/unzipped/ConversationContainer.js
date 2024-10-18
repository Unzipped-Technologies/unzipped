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

  @media (max-width: 1080px) {
    width: 101%;
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
    min-width: 290px;
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

const DIV = styled.div`
  // Display
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

const UnreadCount = styled.span`
  color: white;
  background: green;
  padding: 3px 6px;
  margin-top: 5px;
  border-radius: 10px;
  height: 16px;
  display: flex;
  align-items: center;
  width: maxContent;
  min-width: maxContent;
  font-size: 14px;
  position: absolute;
  float: left;
  top: 50%;
  right: 4%;
  transform: translate(50%, -50%);
`

const UsernameDiv = styled.div`
  color: #000000;
  font-size: 16px;
  font-weight: 100;
  font-family: system-ui;

  @media (max-width: 1080px) {
    display: none;
  }
`

const ConversationContainer = ({
  conversations = [],
  userId,
  userEmail,
  openConversation,
  selectedConversation,
  socket
}) => {
  const [conversation, setConversation] = useState(conversations)
  const [selectedItem, setSelectedItem] = useState(null)
  const [archivedChatsShow, setArchivedChatsShow] = useState(false)
  const [typing, setTyping] = useState({})
  const [filter, setFilter] = useState({ searchKey: '' }); 

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

  const handleSearch = () => {
    const { searchKey } = filter;
    if (!searchKey) {
      setConversation(conversations);
      return;
    }
  
    const filteredConversations = conversations.filter(convo => {
      const participants = convo.participants
      return participants.some(participant => {
        const fullName = `${participant.userId?.FirstName} ${participant.userId?.LastName}`
        const searchChars = searchKey.split('')
      return (
          participant.userId?._id !== userId &&
          searchChars.every(char => fullName.toLocaleLowerCase().includes(char.toLocaleLowerCase()))
       )
      })
    })
  
    setConversation(filteredConversations)
  }
  
  const ConversationCard = ({ receiver, sender, index, item: { _id, messages, updatedAt } }) =>
    receiver?.userId ? (
      <WhiteCard
        key={index}
        background={_id === selectedConversation?._id ? '#BABABA' : '#fff'}
        noMargin
        id={`conversation_${_id}`}
        minWidth="100%"
        padding="8px"
        overflow="hidden"
        height="63px"
        style={{
          border: '0.25px solid #000000'
        }}
        onClick={() => {
          openConversation(_id)
        }}>
        <Span style={{ lineHeight: '16px' }}>
          <Image src={receiver?.userId?.profileImage} height="48px" width="48px" radius="22%" />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
              width: '100%'
            }}>
            <DIV display="flex" justifyContent="space-between">
              <DIV>
                <DarkText
                  fontSize="16px"
                  style={{ minWidth: '135px' }}
                  lineHeight="18px"
                  bold
                  marginLeft="6px"
                  noMargin
                  color="#000000">
                  {ConverterUtils.capitalize(`${ValidationUtils.getFullNameFromUser(receiver?.userId)}`)}
                </DarkText>
              </DIV>
              <UsernameDiv>@{ValidationUtils.truncate(receiver.userId.email.split('@')[0], 10)}</UsernameDiv>
              <div style={{ minWidth: '80px' }}>
                <DarkText
                  width="auto"
                  center
                  fontSize="14px"
                  noMargin
                  color="#000000"
                  style={{ fontFamily: 'system-ui' }}>
                  {ValidationUtils.formatDateWithDate(updatedAt)}
                </DarkText>
              </div>
              {+sender?.unreadCount > 0 && (
                <UnreadCount>{sender?.unreadCount > 100 ? `${sender?.unreadCount}+` : sender?.unreadCount}</UnreadCount>
              )}
            </DIV>
            <div style={{ display: 'flex' }}>
              <DarkText fontSize="12px" color="#000000" marginLeft="6px" noMargin>
                {ValidationUtils.truncate(ValidationUtils.getMostRecentlyUpdated(messages)?.message, 34)}
              </DarkText>
              {typing?.isTyping &&
                typing?.receiverId === sender?.userId?._id &&
                typing?.conversationId === _id &&
                selectedConversation?._id !== typing?.conversationId && (
                  <DarkText noMargin width="74px">
                    <TypingAnimation>
                      <span></span>
                      <span></span>
                      <span></span>
                    </TypingAnimation>
                  </DarkText>
                )}
            </div>
          </div>
        </Span>
      </WhiteCard>
    ) : (
      <></>
    )

  const RenderConversations = ({ type }) => {
    const filteredConversations = conversation.filter(item => item?.isArchived === (type === 'archived'));

    if (filteredConversations.length === 0) {
      return (
        <Div style={{ padding: '20px', textAlign: 'center', color: '#888' }}>
          No results found
        </Div>
      );
    }

    return filteredConversations.map((item, index) => {
      const receiver = item?.participants?.find(e => e?.userId?.email !== userEmail)
      const sender = item?.participants?.find(e => e?.userId?.email === userEmail)
      return (
        <ConversationCard receiver={receiver} sender={sender} item={item} index={index} key={item?._id ?? index} />
      )
    });
  }

  return (
    <WhiteCard minWidth="420px" padding="10px 0px 0px 0px" overflow="hidden" noMargin>
      <Div>
        <SearchBar margin="10px 0px 10px 0px" width="100%"   setFilter={setFilter}
         handleSearch={handleSearch} />
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
      </Scroll>
    </WhiteCard>
  )
}

export default ConversationContainer
