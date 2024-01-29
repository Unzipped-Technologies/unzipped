import React, { useEffect, useState } from 'react'
import {
    DarkText,
    Absolute,
    Span,
    WhiteCard
} from './dashboard/style'
import Image from '../../components/ui/Image'
import SearchBar from '../../components/ui/SearchBar'
import { ValidationUtils } from '../../utils'
import SimpleBar from 'simplebar-react';
import styled from 'styled-components'
import theme from '../ui/theme'

const Div = styled.div``;
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

const ConversationContainer = ({ conversations = [], userId, userEmail, openConversation }) => {
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
        <WhiteCard key={index} background={_id === selectedItem ? '#F0F0F0' : '#fff'} noMargin padding="5px" overflow="hidden" unset maxWidth="20vw" onClick={() => { openConversation(_id); setSelectedItem(_id) }}>
            <Span>
                <Image src={receiver?.userId?.profileImage} height="54px" width="54px" radius="22%" />
                <WhiteCard background={_id === selectedItem ? '#F0F0F0' : '#fff'} borderColor={'transparent'} noMargin padding="0px" maxWidth="80%" center>
                    <DarkText paddingLeft bold noMargin>{ValidationUtils.getFullNameFromUser(receiver?.userId)}</DarkText>
                    <DarkText paddingLeft small textOverflow="ellipsis" noMargin>{ValidationUtils.getMostRecentlyUpdated(messages)?.message}</DarkText>
                </WhiteCard>
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
            <Absolute width="80px" right="-5px" hide={1250} top="0px"><DarkText fontSize="12px" noMargin>{ValidationUtils.formatDateWithDate(updatedAt)}</DarkText></Absolute>
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
        <WhiteCard height="100%" padding="10px 0px 0px 0px" maxWidth="20vw" overflow="hidden" noMargin>
            <Div>
                <SearchBar margin="0px 0px 15px 0px" width="100%" setFilter={handleSearch} />
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