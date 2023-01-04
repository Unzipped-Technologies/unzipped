import React from 'react'
import {
    TitleText,
    DarkText,
    Underline,
    WhiteCard
} from './dashboard/style'
import ProfileContainer from '../../components/unzipped/ProfileContainer';
{/* <ProfileContainer /> */}

const MessageContainer = ({message}) => {
    return (
        <WhiteCard height='86vh' padding="0px">
            <WhiteCard>
                <DarkText></DarkText>
            </WhiteCard>
        </WhiteCard>
    )
}

export default MessageContainer