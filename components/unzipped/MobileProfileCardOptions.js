import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { bindActionCreators } from 'redux'
import { connect, useDispatch, useSelector } from 'react-redux'

import { IconColors } from '../../utils/FontIcons'
import IconSelector from './dashboard/IconSelector'
import IconComponent from '../ui/icons/IconComponent'
import ScheduleInterview from './dashboard/ScheduleInterview'
import ScheduleMeetingModal from './../modals/scheduleMeeting'
import { getFreelancerById } from '../../redux/Freelancers/actions'
import { getInvitesLists, addEntriesToList, getCurrentUserList,setUserIdForChat, checkUserConversation} from '../../redux/actions'

export const P = styled.p`
  font-size: ${({ fontSize }) => (fontSize ? fontSize : '')};
  font-weight: ${({ fontWeight }) => (fontWeight ? fontWeight : '')};
  color: ${({ color }) => (color ? color : 'black')};
  background: ${({ background }) => (background ? background : '#fff')};
  padding: ${({ padding }) => (padding ? padding : '')};
  margin: ${({ margin }) => (margin ? margin : '')};
  text-align: ${({ align }) => (align ? align : '')};
  border-bottom: ${({ borderBottom }) => (borderBottom ? borderBottom : '')};
  right: ${({ right }) => (right ? right : '')};
`

export const DropDown = styled.div`
  display: ${({ display }) => (display ? display : '')};
  position: absolute;
  background-color: white;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  width: 100%; /* Adjust the width as needed */
  border: 1px solid #ccc;
`
function MobileProfileCardOptions({
  handleProfilePage,
  freelancerId,
  addEntriesToList,
  userId,
  getInvitesLists,
  lists,
  setUserIdForChat,
  checkUserConversation,
  user
}) {
  
  const dispatch = useDispatch()
  const [openList, setOpenList] = useState(false)
  const navigate = useRouter()
  const [error, setError] = useState('')
  const [scheduleInterview, setScheduleInterview] = useState(false)
  const [scheduleInterviewModal, setScheduleInterviewModal] = useState(false)
  const { _id, calendarSettings } = useSelector(state => state.Auth.user)
  const receiverInfo = useSelector(state => state.Freelancers.selectedFreelancer)

  const handleScheduleInterviewModal = () => {
    setScheduleInterviewModal(!scheduleInterviewModal)
    setScheduleInterview(!scheduleInterview)
  }

  useEffect(() => {
    dispatch(getFreelancerById(navigate.query.id))
    dispatch(getCurrentUserList(_id))
  }, [])

  useEffect(() => {
    getInvitesLists({
      filter: {
        user: userId
      },
      take: 1000
    })
  }, [])

  const addToList = async listData => {
    const response = await addEntriesToList(
      {
        name: listData?.name,
        icon: listData?.icon,
        userId: userId,
        freelancerId: freelancerId,
        listId: listData?._id
      },
      listData?._id
    )
    if (response?.status === 200) {
      handleProfilePage(true)
    } else {
      setError(response?.response?.data?.msg || 'Something went wrong')
    }
  }

  const handleMeetingScheduling = () => {
    setScheduleInterview(!scheduleInterview)
    setScheduleInterviewModal(true)
  }

  const sendMessage = async () => {
    await setUserIdForChat(user?.userId)

    if (window.innerWidth <= 680) {
      const response = await checkUserConversation({
        freelancerId: user?.userId,
        clientId: userId
      })
      if (response?.data?._id || response?.data === true) {
        navigate.push(`/dashboard/chat/${response?.data?._id}`)
        setUserIdForChat(null)
      } else {
      }
    } else {
      navigate.push('/dashboard/inbox')
    }
  }

  return (
    <div data-testid="mobile_profile_card_options">
      <div
        className="py-3 px-2 d-flex align-items-center"
        style={{ boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.25)', gap: '11px' }}>
        <span
          data-testid="show_mobile_profile"
          onClick={() => {
            handleProfilePage(true)
          }}
          style={{ cursor: 'pointer' }}>
          <IconComponent name="backArrow" width="20" height="20" viewBox="0 0 20 20" fill="black" />
        </span>
        <span style={{ fontWeight: '600', fontSize: '18px' }}>Options</span>
      </div>
      <div className="mx-2">
        {error && (
          <P color="red" fontSize="12px">
            {error}
          </P>
        )}
        <P
          padding="25px 0 18px 0"
          margin="7px 0 0 0"
          borderBottom="3px solid #EFF1F4"
          fontWeight="600"
          onClick={() => {
            navigate.push('/hire')
          }}>
          Make An Offer
        </P>
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            borderBottom: '3px solid #EFF1F4'
          }}>
          <div>
            <P padding="12px 0 18px 0" margin="0" fontWeight="600" onClick={handleMeetingScheduling}>
              Schedule an Interview
            </P>
          </div>
          {scheduleInterview && (
            <div>
              {calendarSettings ? (
                <ScheduleMeetingModal
                  scheduleInterviewModal={scheduleInterviewModal}
                  handleScheduleInterviewModal={handleScheduleInterviewModal}
                  receiver={{ userId: { _id: receiverInfo?.userId?._id } }}
                  setScheduleInterviewModal={setScheduleInterviewModal}
                  setScheduleInterview={setScheduleInterview}
                  isMobileViewPanle={true}
                />
              ) : (
                <ScheduleInterview />
              )}
            </div>
          )}
        </div>

        <P padding="12px 0 18px 0" borderBottom="3px solid #EFF1F4" margin="0" fontWeight="600" 
        onClick={() => {sendMessage()}}>
          Send A Message
        </P>
        <div
          onClick={() => setOpenList(!openList)}
          style={{
            padding: '12px 0 10px 0',
            borderBottom: '3px solid #EFF1F4',
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%'
          }}>
          <div>
            <P fontWeight="600" margin="0">
              Add User To A List
            </P>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
            <div style={{ position: 'relative', top: '10px' }}>
              <span>
                <IconComponent name="downArrow" width="30" height="30" viewBox="0 0 20 20" fill="black" />
              </span>
            </div>
          </div>
        </div>
      </div>

      <DropDown display={openList ? 'block' : 'none'}>
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
      </DropDown>
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
    getInvitesLists: bindActionCreators(getInvitesLists, dispatch),
    addEntriesToList: bindActionCreators(addEntriesToList, dispatch),
    getCurrentUserList: bindActionCreators(getCurrentUserList, dispatch),
    setUserIdForChat: bindActionCreators(setUserIdForChat, dispatch),
    checkUserConversation: bindActionCreators(checkUserConversation, dispatch)

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MobileProfileCardOptions)
