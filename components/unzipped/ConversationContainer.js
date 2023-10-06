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

const ConversationContainer = ({ conversations = [], userEmail, openConversation }) => {
    return (
        <WhiteCard height="100%" padding="10px 0px 0px 0px" maxWidth="20vw" overflow="hidden" noMargin>
            <Div>
                <SearchBar margin="0px 0px 15px 0px" width="100%" />
            </Div>
            <Scroll>
                {conversations.map((item, index) => {
                    const receiver = item.participants.find(e => e.userId.email !== userEmail)
                    return (
                        <WhiteCard key={index} background={item?.isSelected ? '#F0F0F0' : '#fff'} noMargin padding="5px" overflow="overlay" unset maxWidth="20vw" onClick={() => openConversation(item?._id)}>
                            <Span>
                                <Image src={receiver.userId.profileImage} height="54px" width="54px" radius="22%" />
                                <WhiteCard background={item?.isSelected ? '#F0F0F0' : '#fff'} borderColor={'transparent'} noMargin padding="0px" maxWidth="100%" center>
                                    <div style={{ width: "-webkit-fill-available" }} className='d-flex align-items-baseline'>
                                        <DarkText paddingLeft bold noMargin>{ValidationUtils.getFullNameFromUser(receiver?.userId)}asd</DarkText>
                                        <div className='gap-1 d-flex  '>
                                            <DarkText marginRight={'4px'} textAlignLast={'end'} fontSize="12px" noMargin>@Alien4hire</DarkText>
                                            <DarkText textAlignLast={'end'} textOverflow fontSize="11px" noMargin>{ValidationUtils.formatDateWithDate(item?.updatedAt)}</DarkText>
                                        </div>
                                    </div>
                                    <DarkText paddingLeft small textOverflow="ellipsis" noMargin>{ValidationUtils.getMostRecentlyUpdated(item?.messages)?.message.slice(0, 40)}{ValidationUtils.getMostRecentlyUpdated(item?.messages)?.message.length > 40 && '...'}</DarkText>
                                </WhiteCard>
                            </Span>

                        </WhiteCard>
                    )
                })}
                <Extra></Extra>
            </Scroll>
        </WhiteCard>
    )
}

export default ConversationContainer