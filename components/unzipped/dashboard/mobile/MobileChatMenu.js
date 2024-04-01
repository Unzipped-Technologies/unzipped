import React, { useState } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'

import Toggle from '../../../ui/Toggle'
import IconComponent from '../../../ui/icons/IconComponent'
import ScheduleMeetingModal from '../../../modals/scheduleMeeting'

const P = styled.p`
  font-size: ${({ fontSize }) => (fontSize ? fontSize : '')};
  font-weight: ${({ fontWeight }) => (fontWeight ? fontWeight : '')};
  color: ${({ color }) => (color ? color : 'black')};
  padding: ${({ padding }) => (padding ? padding : '')};
  margin: ${({ margin }) => (margin ? margin : '')};
  text-align: ${({ align }) => (align ? align : '')};
  border-bottom: ${({ borderBottom }) => (borderBottom ? borderBottom : '')};
  right: ${({ right }) => (right ? right : '')};
  line-height: ${({ lineHeight }) => (lineHeight ? lineHeight : '')};
`

const DropDown = styled.div`
  display: ${({ display }) => (display ? display : '')};
  background-color: white;
  z-index: 1;
  width: 100%; /* Adjust the width as needed */
  border: 0.5px solid #ccc;
  border-top: 0px;
`

function MobileChatMenu({ data, handleFilterOpenClose, role, isArchived, isMute, handleChatArchive, handleChatMute }) {
  const router = useRouter()

  const [openList, setOpenList] = useState(false)
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

  return (
    <div style={{ backgroundColor: 'white', color: 'black' }}>
      <div
        className="py-3 px-2 d-flex align-items-center"
        style={{
          boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.25)',
          gap: '11px',
          background: 'white',
          width: '-webkit-fill-available',
          zIndex: '100'
        }}>
        <span
          onClick={() => {
            handleFilterOpenClose(false)
          }}
          style={{ cursor: 'pointer' }}>
          <IconComponent name="backArrow" width="20" height="20" viewBox="0 0 20 20" fill="black" />
        </span>
        <span style={{ fontWeight: '500', fontSize: '18px' }}>Messages</span>
      </div>
      <div style={{ padding: '5px' }}>
        <div className="w-100">
          {role === 2 || role === 0 ? (
            <P
              fontSize="14px"
              fontWeight="600"
              lineHeight="19.5px"
              color="#000000"
              padding="25px 0px 18px 10px"
              margin="7px 0 0 0"
              borderBottom="2px solid #EFF1F4"
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
              padding="25px 0px 18px 10px"
              margin="7px 0 0 0"
              borderBottom="2px solid #EFF1F4"
              className="px-1"
              onClick={() => {
                router.push('/projects')
              }}>
              Apply for Position
            </P>
          )}
          {role === 2 ||
            (role === 0 && (
              <P
                fontSize="14px"
                fontWeight="600"
                lineHeight="19.5px"
                color="#000000"
                padding="25px 0px 18px 10px"
                borderBottom="2px solid #EFF1F4"
                margin="0"
                className="px-1"
                onClick={handleScheduleInterviewModal}>
                Schedule an Interview
              </P>
            ))}
          <div
            onClick={() => setOpenList(!openList)}
            className="d-flex justify-content-between align-items-center pt-4"
            style={{ padding: '12px 0 18px 0', borderBottom: '3px solid #EFF1F4' }}>
            <P
              fontSize="14px"
              fontWeight="600"
              lineHeight="19.5px"
              color="#000000"
              margin="0 0 0 5px"
              padding="0px 0px 0px 5px">
              Add User To A List
            </P>
            <span style={{ position: 'absolute', right: '23px', marginRight: '5px' }} className=" pt-4">
              <IconComponent name="downArrow" width="20" height="20" viewBox="0 0 20 20" fill="black" />
            </span>
          </div>
        </div>

        <DropDown display={openList ? 'block' : 'none'}>
          <div className="d-flex px-4 py-2 mx-2" style={{ gap: '15px', borderBottom: '3px solid #EFF1F4' }}>
            <div>
              <img src="/img/heart.png" />
            </div>
            <div>
              <P fontSize="16px" margin="0">
                Favourites
              </P>
              <div className="d-flex align-items-center">
                <IconComponent name="closedLock" width="4.47" height="5.11" viewBox="0 0 4.47 5.11" fill="#B2B9C5" />
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
          <div className="d-flex px-4 py-2 mx-2" style={{ gap: '15px', borderBottom: '3px solid #EFF1F4' }}>
            <div>
              <IconComponent name="eye" width="20" height="13" viewBox="0 0 20 13" fill="#8EDE64" />
            </div>
            <div>
              <P fontSize="16px" margin="0">
                Recently Viewed
              </P>
              <div className="d-flex align-items-center">
                <IconComponent name="closedLock" width="4.47" height="5.11" viewBox="0 0 4.47 5.11" fill="#B2B9C5" />
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
          <div className="d-flex px-4 py-2 mx-2" style={{ gap: '15px', borderBottom: '3px solid #EFF1F4' }}>
            <div>
              <IconComponent name="team" width="18" height="15" viewBox="0 0 18 15" fill="#FFC24E" />
            </div>
            <div>
              <P fontSize="16px" margin="0">
                My Team
              </P>
              <div className="d-flex align-items-center">
                <IconComponent name="closedLock" width="4.47" height="5.11" viewBox="0 0 4.47 5.11" fill="#B2B9C5" />
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
          <div className="d-flex px-4 py-2 mx-2" style={{ gap: '15px' }}>
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

        <div style={{ padding: '10px', marginTop: '20px' }}>
          <Toggle
            className="mt-3"
            toggled={isArchived}
            handleSetToggle={handleArchive}
            title="Archive"
            sideText="Hide chat from your active list."
          />
          <Toggle
            toggled={isMute}
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
        </div>
      </div>
    </div>
  )
}

export default MobileChatMenu
