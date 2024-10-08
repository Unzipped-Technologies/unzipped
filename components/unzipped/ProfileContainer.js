import React, { useState } from 'react'
import { DarkText, Underline, WhiteCard } from './dashboard/style'
import { useRouter } from 'next/router'

import Image from '../ui/Image'
import Toggle from '../ui/Toggle'
import { ValidationUtils, ConverterUtils } from '../../utils'
import IconComponent from '../ui/icons/IconComponent'
import styled from 'styled-components'
import ScheduleMeetingModal from '../modals/scheduleMeeting'

const P = styled.p`
  font-size: ${({ fontSize }) => (fontSize ? fontSize : '')};
  font-weight: ${({ fontWeight }) => (fontWeight ? fontWeight : '')};
  color: ${({ color }) => (color ? color : 'black')};
  background: ${({ background }) => (background ? background : '#fff')};
  padding: ${({ padding }) => (padding ? padding : '')};
  margin: ${({ margin }) => (margin ? margin : '')};
  text-align: ${({ align }) => (align ? align : '')};
  border-bottom: ${({ borderBottom }) => (borderBottom ? borderBottom : '')};
  right: ${({ right }) => (right ? right : '')};
  line-height: ${({ lineHeight }) => (lineHeight ? lineHeight : '')};
  cursor: ${({ cursor }) => (cursor ? cursor : '')};
`

const DropDown = styled.div`
  display: ${({ display }) => (display ? display : '')};
  position: absolute;
  top: 100%;
  background-color: white;
  z-index: 1;
  width: 100%; /* Adjust the width as needed */
  border: 0.5px solid #ccc;
`
const ProfileContainer = ({ data, isArchived, isMute, handleChatArchive, handleChatMute, userRole }) => {
  const router = useRouter()

  const [scheduleInterviewModal, setScheduleInterviewModal] = useState(false)
  const handleMute = value => {
    handleChatMute(value)
  }

  const handleArchive = value => {
    handleChatArchive(value)
  }
  const handleScheduleInterviewModal = () => {
    setScheduleInterviewModal(!scheduleInterviewModal)
  }
  const [openList, setOpenList] = useState(false)
  return (
    <div
      style={{
        overflow: 'auto',
        width: '333px'
      }}
      id="profile_container">
      <WhiteCard padding="10px 10px" noMargin style={{ height: '100%' }}>
        <Image
          src={data?.userId?.profileImage}
          radius="15px"
          width="146.75px"
          height="146.75px
"
        />
        <DarkText center topMargin="15px" fontSize="28px" lineHeight="23px" color="#000000">
          {ConverterUtils.capitalize(`${ValidationUtils.getFullNameFromUser(data?.userId)}`)}
        </DarkText>

        <div className="w-100">
          {userRole === 2 || userRole === 0 ? (
            <P
              fontSize="14px"
              fontWeight="600"
              lineHeight="19.5px"
              color="#000000"
              padding="25px 0 18px 0"
              margin="7px 0 0 0"
              cursor="pointer"
              borderBottom="3px solid #EFF1F4"
              className="px-1"
              onClick={() => {
                router.push('/hire')
              }}>
              Make An Offer
            </P>
          ) : (
            <P
              fontSize="14px"
              fontWeight="600"
              lineHeight="19.5px"
              color="#000000"
              padding="25px 0 18px 0"
              margin="7px 0 0 0"
              borderBottom="3px solid #EFF1F4"
              className="px-1"
              onClick={() => {
                router.push('/projects')
              }}>
              Apply for Position
            </P>
          )}
          {userRole === 2 ||
            (userRole === 0 && (
              <P
                fontSize="14px"
                fontWeight="600"
                lineHeight="19.5px"
                color="#000000"
                padding="12px 0 18px 0"
                borderBottom="3px solid #EFF1F4"
                margin="0"
                className="px-1"
                onClick={handleScheduleInterviewModal}>
                Schedule an Interview
              </P>
            ))}
          <div
            onClick={() => setOpenList(!openList)}
            className="d-flex justify-content-between align-items-center pt-4"
            style={{
              padding: '12px 0 18px 0',
              border: '1px solid #ccc',
              borderBottom: '3px solid #EFF1F4',
              position: 'relative'
            }}>
            <P
              fontSize="14px"
              fontWeight="600"
              lineHeight="19.5px"
              color="#000000"
              margin="0 0 0 5px"
              padding="0px 0px 0px 5px">
              Add User To A List
            </P>
            <span style={{ position: 'absolute', right: '23px', marginRight: '5px', top: '4px' }} className=" pt-4">
              <IconComponent name="downArrow" width="20" height="20" viewBox="0 0 20 20" fill="black" />
            </span>
            <DropDown display={openList ? 'block' : 'none'}>
              <div
                className="d-flex mx-2"
                style={{ gap: '15px', borderBottom: '3px solid #EFF1F4', padding: '5px 24px' }}>
                <div>
                  <img src="/img/heart.png" />
                </div>
                <div>
                  <P fontSize="16px" margin="0">
                    Favourites
                  </P>
                  <div className="d-flex align-items-center">
                    <IconComponent
                      name="closedLock"
                      width="4.47"
                      height="5.11"
                      viewBox="0 0 4.47 5.11"
                      fill="#B2B9C5"
                    />
                    <P fontSize="7px" margin="0" padding="0 0 0 3px">
                      Private
                    </P>
                    <P fontSize="7px" margin="0">
                      .
                    </P>
                    <P fontSize="7px" margin="0">
                      1 member
                    </P>
                  </div>
                </div>
              </div>
              <div
                className="d-flex mx-2"
                style={{ gap: '15px', borderBottom: '3px solid #EFF1F4', padding: '5px 24px' }}>
                <div>
                  <IconComponent name="eye" width="20" height="13" viewBox="0 0 20 13" fill="#8EDE64" />
                </div>
                <div>
                  <P fontSize="16px" margin="0">
                    Recently Viewed
                  </P>
                  <div className="d-flex align-items-center">
                    <IconComponent
                      name="closedLock"
                      width="4.47"
                      height="5.11"
                      viewBox="0 0 4.47 5.11"
                      fill="#B2B9C5"
                    />
                    <P fontSize="7px" margin="0" padding="0 0 0 3px">
                      Private
                    </P>
                    <P fontSize="7px" margin="0">
                      .
                    </P>
                    <P fontSize="7px" margin="0">
                      1 member
                    </P>
                  </div>
                </div>
              </div>
              <div
                className="d-flex mx-2"
                style={{ gap: '15px', borderBottom: '3px solid #EFF1F4', padding: '5px 24px' }}>
                <div>
                  <IconComponent name="team" width="18" height="15" viewBox="0 0 18 15" fill="#FFC24E" />
                </div>
                <div>
                  <P fontSize="16px" margin="0">
                    My Team
                  </P>
                  <div className="d-flex align-items-center">
                    <IconComponent
                      name="closedLock"
                      width="4.47"
                      height="5.11"
                      viewBox="0 0 4.47 5.11"
                      fill="#B2B9C5"
                    />
                    <P fontSize="7px" margin="0" padding="0 0 0 3px">
                      Private
                    </P>
                    <P fontSize="7px" margin="0">
                      .
                    </P>
                    <P fontSize="7px" margin="0">
                      1 member
                    </P>
                  </div>
                </div>
              </div>
              <div className="d-flex mx-2" style={{ gap: '15px', padding: '5px 24px' }}>
                <div>
                  <IconComponent name="team" width="18" height="15" viewBox="0 0 18 15" fill="#FFC24E" />
                </div>
                <div>
                  <P fontSize="16px" margin="0">
                    My Team
                  </P>
                  <div className="d-flex align-items-center">
                    <IconComponent name="openLock" width="4.47" height="5.11" viewBox="0 0 4.47 5.11" fill="#B2B9C5" />
                    <P fontSize="7px" margin="0" padding="0 0 0 3px">
                      Public
                    </P>
                    <P fontSize="7px" margin="0">
                      .
                    </P>
                    <P fontSize="7px" margin="0">
                      1 member
                    </P>
                  </div>
                </div>
              </div>
            </DropDown>
          </div>
        </div>

        <Toggle
          className="mt-3"
          toggled={isArchived}
          handleSetToggle={handleArchive}
          title="Archive"
          id="archive_chat"
          sideText="Hide chat from your active list."
        />
        <Toggle
          toggled={isMute}
          id="mute"
          handleSetToggle={handleMute}
          title="Mute"
          sideText="Turn off this chat's notifications."
        />
        <ScheduleMeetingModal
          scheduleInterviewModal={scheduleInterviewModal}
          handleScheduleInterviewModal={handleScheduleInterviewModal}
          receiver={data}
          setScheduleInterviewModal={setScheduleInterviewModal}
        />
      </WhiteCard>
    </div>
  )
}

export default ProfileContainer
