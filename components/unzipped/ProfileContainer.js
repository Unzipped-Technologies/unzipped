import React from 'react'
import {
    TitleText,
    DarkText,
    Underline,
    WhiteCard
} from './dashboard/style'
import Image from '../ui/Image'
import Toggle from '../ui/Toggle'
import { ValidationUtils } from '../../utils'

const ProfileContainer = ({
    data, 
    isArchived=false,
    isMute=false
}) => {
    // console.log(data)
    return (
        <WhiteCard height="100%">
            <Image src={data?.userId.profileImage} radius="3px"/>
            <DarkText center topMargin="15px">{ValidationUtils.getFullNameFromUser(data?.userId)}</DarkText>
            <DarkText topMargin="15px" color="blue" clickable>+ Hire?</DarkText>
            <Underline width="100%" margin="5px 0px 15px 0px"/>
            <Toggle toggled={isArchived} title="Archive" sideText="Hide chat from your active list."/>
            <Toggle toggled={isMute} title="Mute" sideText="Turn off this chat's notifications."/>
        </WhiteCard>
    )
}

export default ProfileContainer