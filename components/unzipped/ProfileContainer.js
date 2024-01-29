import React, { useState } from 'react'
import {
    DarkText,
    Underline,
    WhiteCard
} from './dashboard/style'

import Image from '../ui/Image'
import Toggle from '../ui/Toggle'
import { ValidationUtils } from '../../utils'
import IconComponent from '../ui/icons/IconComponent';
import styled from 'styled-components'
import { useRouter } from 'next/router';
import ScheduleMeetingModal from '../modals/scheduleMeeting'

const P = styled.p`
font-size: ${({ fontSize }) => fontSize ? fontSize : ''};
font-weight: ${({ fontWeight }) => fontWeight ? fontWeight : ''};
color: ${({ color }) => color ? color : 'black'};
background: ${({ background }) => background ? background : '#fff'};
padding: ${({ padding }) => padding ? padding : ''};
margin: ${({ margin }) => margin ? margin : ''};
text-align: ${({ align }) => align ? align : ''};
border-bottom: ${({ borderBottom }) => borderBottom ? borderBottom : ''};
right: ${({ right }) => right ? right : ''}
`

const DropDown = styled.div`
    display: ${({ display }) => display ? display : ''};
    background-color: white;
    z-index: 1;
    width: 100%; /* Adjust the width as needed */
    border: 0.5px solid #ccc;
    border-top: 0px;
`
const ProfileContainer = ({
    data,
    isArchived,
    isMute,
    handleChatArchive,
    handleChatMute,
}) => {
    const [scheduleInterviewModal, setScheduleInterviewModal] = useState(false)
    const handleMute = (value) => {
        handleChatMute(value)
    }

    const handleArchive = (value) => {
        handleChatArchive(value)
    }
    const handleScheduleInterviewModal = () => {
        setScheduleInterviewModal(!scheduleInterviewModal)
    }
    const [openList, setOpenList] = useState(false);
    const navigate = useRouter()
    return (
        <WhiteCard height="100%">
            <Image src={data?.userId.profileImage} radius="3px" />
            <DarkText center topMargin="15px">{ValidationUtils.getFullNameFromUser(data?.userId)}</DarkText>
            <DarkText topMargin="15px" color="blue" clickable>+ Hire?</DarkText>
            <Underline width="100%" margin="5px 0px 15px 0px" />

            <div className='w-100'>
                <P padding="25px 0 18px 0" margin="7px 0 0 0" borderBottom="3px solid #EFF1F4" fontWeight="600" className='px-1' onClick={() => { navigate.push('/hire') }} >Make An Offer</P>
                <P padding="12px 0 18px 0" borderBottom="3px solid #EFF1F4" margin="0" fontWeight="600" className='px-1' onClick={handleScheduleInterviewModal} >Schedule an Interview</P>
                <div onClick={() => setOpenList(!openList)} className='d-flex justify-content-between' style={{ padding: "12px 0 18px 0", border: '1px solid #ccc', borderBottom: "3px solid #EFF1F4" }}>
                    <P fontWeight="600" margin="0 0 0 5px"  >Add User To A List</P>
                    <span style={{ position: "absolute", right: "23px", marginRight: '5px' }} ><IconComponent name='downArrow' width="20" height="20" viewBox="0 0 20 20" fill="black" /></span>
                </div>
            </div >

            <DropDown display={openList ? 'block' : 'none'} >
                <div className='d-flex px-4 py-2 mx-2' style={{ gap: "15px", borderBottom: "3px solid #EFF1F4" }} >
                    <div>
                        <img src='/img/heart.png' />
                    </div>
                    <div >
                        <P fontSize="16px" margin="0">Favourites</P>
                        <div className='d-flex align-items-center'>
                            <IconComponent name='closedLock' width="4.47" height="5.11" viewBox="0 0 4.47 5.11" fill="#B2B9C5" />
                            <P fontSize="7px" margin="0" padding="0 0 0 3px" >Private</P>
                            <P fontSize="7px" margin="0" >.</P>
                            <P fontSize="7px" margin="0" >1 member</P>
                        </div>
                    </div>
                </div>
                <div className='d-flex px-4 py-2 mx-2' style={{ gap: "15px", borderBottom: "3px solid #EFF1F4" }}>
                    <div>
                        <IconComponent name='eye' width="20" height="13" viewBox="0 0 20 13" fill="#8EDE64" />
                    </div>
                    <div >
                        <P fontSize="16px" margin="0">Recently Viewed</P>
                        <div className='d-flex align-items-center'>
                            <IconComponent name='closedLock' width="4.47" height="5.11" viewBox="0 0 4.47 5.11" fill="#B2B9C5" />
                            <P fontSize="7px" margin="0" padding="0 0 0 3px" >Private</P>
                            <P fontSize="7px" margin="0" >.</P>
                            <P fontSize="7px" margin="0" >1 member</P>
                        </div>
                    </div>
                </div>
                <div className='d-flex px-4 py-2 mx-2' style={{ gap: "15px", borderBottom: "3px solid #EFF1F4" }}>
                    <div>
                        <IconComponent name='team' width="18" height="15" viewBox="0 0 18 15" fill="#FFC24E" />
                    </div>
                    <div >
                        <P fontSize="16px" margin="0">My Team</P>
                        <div className='d-flex align-items-center'>
                            <IconComponent name='closedLock' width="4.47" height="5.11" viewBox="0 0 4.47 5.11" fill="#B2B9C5" />
                            <P fontSize="7px" margin="0" padding="0 0 0 3px" >Private</P>
                            <P fontSize="7px" margin="0" >.</P>
                            <P fontSize="7px" margin="0" >1 member</P>
                        </div>
                    </div>
                </div>
                <div className='d-flex px-4 py-2 mx-2' style={{ gap: "15px" }}>
                    <div>
                        <IconComponent name='team' width="18" height="15" viewBox="0 0 18 15" fill="#FFC24E" />
                    </div>
                    <div >
                        <P fontSize="16px" margin="0">My Team</P>
                        <div className='d-flex align-items-center'>
                            <IconComponent name='openLock' width="4.47" height="5.11" viewBox="0 0 4.47 5.11" fill="#B2B9C5" />
                            <P fontSize="7px" margin="0" padding="0 0 0 3px" >Public</P>
                            <P fontSize="7px" margin="0" >.</P>
                            <P fontSize="7px" margin="0" >1 member</P>
                        </div>
                    </div>
                </div>
            </DropDown>

            <Toggle toggled={isArchived} handleSetToggle={handleArchive} title="Archive" sideText="Hide chat from your active list." />
            <Toggle toggled={isMute} handleSetToggle={handleMute} title="Mute" sideText="Turn off this chat's notifications." />
            <ScheduleMeetingModal
                scheduleInterviewModal={scheduleInterviewModal}
                handleScheduleInterviewModal={handleScheduleInterviewModal}
                receiver={data}
                setScheduleInterviewModal={setScheduleInterviewModal}
            />
        </WhiteCard>
    )
}

export default ProfileContainer