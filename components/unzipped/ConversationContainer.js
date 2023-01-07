import React from 'react'
import {
    TitleText,
    DarkText,
    Underline,
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

const ConversationContainer = ({conversations = [], userEmail, openConversation}) => {
    return (
        <WhiteCard height="100%" padding="10px 0px 0px 0px" maxWidth="20vw" overflow="hidden" noMargin>
            <Div>
                <SearchBar margin="0px 0px 15px 0px" width="100%"/>                
            </Div>
            <Scroll>
            {conversations.map((item, index) => {
                const receiver = item.participants.find(e => e.userId.email !== userEmail)
                return (
                    <WhiteCard key={index} background={item?.isSelected ? '#F0F0F0' : '#fff'}  noMargin padding="5px" overflow="hidden" unset maxWidth="20vw" onClick={() => openConversation(item?._id)}>
                        <Span>
                            <Image src={receiver.userId.profileImage} height="54px" width="54px" radius="22%"/>
                            <WhiteCard background={item?.isSelected ? '#F0F0F0' : '#fff'} borderColor={'transparent'} noMargin padding="0px" maxWidth="80%" center>
                                <DarkText paddingLeft bold noMargin>{ValidationUtils.getFullNameFromUser(receiver?.userId)}</DarkText>
                                <DarkText paddingLeft small textOverflow="ellipsis" noMargin>{ValidationUtils.getMostRecentlyUpdated(item?.messages)?.message}</DarkText>
                            </WhiteCard>
                        </Span>
                        <Absolute width="80px" right="-5px" hide={1250} top="0px"><DarkText fontSize="12px" noMargin>{ValidationUtils.formatDateWithDate(item?.updatedAt)}</DarkText></Absolute>
                    </WhiteCard>
                )
            })}
            <Extra></Extra>
            </Scroll>
        </WhiteCard>
    )
}

export default ConversationContainer