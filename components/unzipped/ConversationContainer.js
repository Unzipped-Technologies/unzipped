import React, { useEffect, useState } from 'react'
import {
    DarkText,
    Absolute,
    Span
} from './dashboard/style'
import Image from '../../components/ui/Image'
import SearchBar from '../../components/ui/SearchBar'
import { ValidationUtils } from '../../utils'
import SimpleBar from 'simplebar-react';
import styled from 'styled-components'
import theme from '../ui/theme'

const Div = styled.div`
    width: 95%;
`;
const Extra = styled.div`
    height: 150px;
`;

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
`;

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
  @media(max-width: 1080px) {
    min-width: 270px;
  }
  @media(max-width: 840px) {
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
  @media(max-width: 600px) {
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
    justify-content: ${({ center, justifyEnd }) => (center ? 'center' : justifyEnd ? 'flex-end' : 'normal')};
    padding: ${({ padding }) => (padding ? padding : '20px 20px')};
    position: relative;
    box-shadow: ${({ shadow }) => (shadow ? shadow : 'none')};
    margin-bottom: ${({ noMargin, half }) => (noMargin ? '0px' : half ? '12px' : '24px')};
    @media(max-width: 600px) {
        padding: 10px 0px;
    }
`

const ConversationContainer = ({ conversations = [], userId, userEmail, openConversation, isMobile }) => {
    // const [conversation, setConversation] = useState([])
    const [selectedItem, setSelectedItem] = useState({})
    const [archivedChatsShow, setArchivedChatsShow] = useState(false)

    // useEffect(() => {
    //     setConversation(conversations)
    // }, [conversations])

    const handleSearch = (e) => {
        const filteredConversations = conversations.filter(convo => {
            const participants = convo.participants;
            return participants.some(participant => {
                const fullName = `${participant.userId.FirstName} ${participant.userId.LastName}`;
                return participant.userId._id !== userId && fullName.includes(e);
            });
        });
        setConversation(filteredConversations)
    }

    const ConversationCard = ({
        receiver,
        sender,
        index,
        item: {
            _id,
            messages,
            updatedAt
        } }) => (
        <WhiteCard key={index} background={_id === selectedItem ? '#F0F0F0' : '#fff'} noMargin padding="5px" overflow="hidden" unset onClick={() => { openConversation(_id); setSelectedItem(_id) }}>
            <Span>
                <Image src={receiver?.userId?.profileImage} height="54px" width="54px" radius="22%" />
                <ItemCard background={_id === selectedItem ? '#F0F0F0' : '#fff'} borderColor={'transparent'} noMargin padding="0px" maxWidth="80%" minWidth="150px" center>
                    <DarkText paddingLeft smallPadding="10px" bold noMargin>{ValidationUtils.getFullNameFromUser(receiver?.userId)}</DarkText>
                    <DarkText paddingLeft smallPadding="10px" small textOverflow="ellipsis" noMargin>{ValidationUtils.getMostRecentlyUpdated(messages)?.message}</DarkText>
                </ItemCard>
                {+sender?.unreadCount > 0 && <span style={{
                    color: "white",
                    background: "green",
                    padding: "3px 6px",
                    borderRadius: "10px",
                    height: "20px",
                    display: "flex",
                    alignItems: "center",
                    width: "maxContent",
                    fontSize: "14px",
                }}>{sender?.unreadCount}</span>}
            </Span>
            <Absolute width="80px" right="0px" hide={isMobile ? 0 : 1050} top="4px"><DarkText fontSize="12px" noMargin>{ValidationUtils.formatDateWithDate(updatedAt)}</DarkText></Absolute>
        </WhiteCard>
    )

    const RenderConversations = ({
        type
    }) =>
        conversations.filter((item) => item?.isArchived === (type === 'archived')).map((item, index) => {
            const receiver = item?.participants?.find(e => e.userId.email !== userEmail)
            const sender = item?.participants?.find(e => e.userId.email === userEmail)
            return (
                <ConversationCard receiver={receiver} sender={sender} item={item} index={index} />
            )
        })

    return (
        <WhiteCard padding="10px 0px 0px 0px" overflow="hidden" noMargin>
            <Div>
                <SearchBar margin="10px 0px 10px 0px" width="100%" setFilter={handleSearch} />
            </Div>
            <Scroll>
                <RenderConversations type='unarchived' />
                {conversations?.some(item => item?.isArchived === true) && <b className='text-dark' onClick={() => setArchivedChatsShow(!archivedChatsShow)}> <span className="fas fa-archive text-success ms-2"></span> Archived Chats</b>}
                {archivedChatsShow && <RenderConversations type='archived' />}
                <Extra></Extra>
            </Scroll>
        </WhiteCard>
    )
}

export default ConversationContainer