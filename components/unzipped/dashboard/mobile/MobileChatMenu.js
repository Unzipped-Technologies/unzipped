import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'

import Toggle from '../../../ui/Toggle'
import IconComponent from '../../../ui/icons/IconComponent'
import ScheduleMeetingModal from '../../../modals/scheduleMeeting'
import { getCurrentUserList, addEntriesToList } from '../../../../redux/actions'
import { bindActionCreators } from 'redux'
import { connect, useDispatch, useSelector } from 'react-redux'
import IconSelector from '../../../unzipped/dashboard/IconSelector'
import { IconColors } from '../../../../utils/FontIcons'

const P = styled.p`
  font-size: ${({ fontSize }) => (fontSize ? fontSize : '')};
  font-weight: ${({ fontWeight }) => (fontWeight ? fontWeight : '')};
  color: ${({ color }) => (color ? color : 'black')};
  padding: ${({ padding }) => (padding ? padding : '')};
  margin: ${({ margin }) => (margin ? margin : '')};
  text-align: ${({ align }) => (align ? align : '')};
  border-bottom: ${({ borderBottom }) => (borderBottom ? borderBottom : '')};
  right: ${({ right }) => (right ? right : '')};
  cursor: ${({ cursor }) => (cursor ? cursor : '')};
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

function MobileChatMenu({ data, handleFilterOpenClose, role, isArchived, isMute, handleChatArchive, handleChatMute,
  lists}) {
  const router = useRouter()
  const dispatch = useDispatch()
  const [openList, setOpenList] = useState(false)
  const [scheduleInterviewModal, setScheduleInterviewModal] = useState(false)
  const { _id } = useSelector(state => state.Auth.user)
  const handleMute = value => {
    handleChatMute(value)
  }

  const handleArchive = value => {
    handleChatArchive(value)
  }
  const handleScheduleInterviewModal = () => {
    setScheduleInterviewModal(!scheduleInterviewModal)
  }

  useEffect(() => {
    dispatch(getCurrentUserList(_id))
  }, [])

  const addToList = listData => {
    const freelancerID = data?.userId?.freelancers?._id;
    if (freelancerID) {
      dispatch(addEntriesToList(
        {
          name: listData?.name,
          icon: listData?.icon,
          userId: _id,
          freelancerId: data?.userId?.freelancers?._id,
          listId: listData?._id
        },
        listData?._id
      ))
      setOpenList(false);
    }
  }

  return (
    <div style={{ backgroundColor: 'white', color: 'black' }} id="profile_menu_container">
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
          id="hide_chat_menu"
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
          {role !== 1 ? (
            <div>
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
            </div>
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
          <div>
            {lists?.length
              ? lists.map(list => (
                <div
                  className="d-flex px-4 py-2 me-2"
                  style={{ gap: '15px', borderBottom: '3px solid #EFF1F4' }}
                  key={list?._id}
                  data-testid={list?._id}
                  onClick={() => {
                    addToList(list)
                  }}>
                  <div>
                    {list?.icon && (
                      <IconSelector
                        icon={list.icon}
                        size={24}
                        style={{ color: IconColors[list.icon] || '#1C1C1C' }}
                        twoToneColor={IconColors[list.icon]}
                      />
                    )}
                  </div>
                  <div>
                    <P fontSize="16px" margin="0">
                      {list?.name || 'Favorites'}
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
                        {list?.isPrivate && 'Private'}
                      </P>
                      <P fontSize="7px" margin="0">
                        .
                      </P>
                      <P fontSize="7px" margin="0">
                        {list?.listEntries?.length || 0} member
                      </P>
                    </div>
                  </div>
                </div>
              ))
              : ''}
          </div>
        </DropDown>
        <div style={{ padding: '10px', marginTop: '20px' }}>
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
            handleSetToggle={handleMute}
            title="Mute"
            id="mute"
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

const mapStateToProps = state => {
  return {
    lists: state.Lists?.currentUserList
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCurrentUserList: bindActionCreators(getCurrentUserList, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MobileChatMenu)