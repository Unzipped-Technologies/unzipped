import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useRouter } from 'next/router'
import CloseIcon from '../icons/close'
import styled from 'styled-components'
import { Dialog } from '@material-ui/core'
import { bindActionCreators } from 'redux'
import IconButton from '@mui/material/IconButton'
import { withStyles } from '@material-ui/core/styles'
import MuiDialogContent from '@material-ui/core/DialogContent'
import router from 'next/router'
import ScheduleMeetingModal from '../modals/scheduleMeeting'
import Notification from '../animation/notifications'

import IconComponent from '../ui/icons/IconComponent'
import {
  getInvitesLists,
  getAllFreelancers,
  addEntriesToList,
  getFreelancerById,
  resetContractForm,
  setUserIdForChat,
  checkUserConversation
} from '../../redux/actions'

export const P = styled.p`
  font-size: ${({ fontSize }) => (fontSize ? fontSize : '')};
  font-weight: ${({ fontWeight }) => (fontWeight ? fontWeight : '')};
  color: ${({ color }) => (color ? color : 'black')};
  background: ${({ background }) => (background ? background : '#fff')};
  padding: ${({ padding }) => (padding ? padding : '')};
  margin: ${({ margin }) => (margin ? margin : '')};
  text-align: ${({ align }) => (align ? align : '')};
  cursor: ${({ cursor }) => (cursor ? cursor : '')};
  border-bottom: ${({ borderBottom }) => (borderBottom ? borderBottom : '')};
  right: ${({ right }) => (right ? right : '')};
  &:hover {
    color: ${({ hoverColor }) => (hoverColor ? hoverColor : '#1A264E')};
  }
`
const DropDown = styled.div`
  display: ${({ display }) => display};
  position: absolute;
  background-color: white;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  width: 92%; /* Adjust the width as needed */
  border: 1px solid #ccc;
  @media (max-width: 680px) {
    width: 90%; /* Adjust the width as needed */
  }
`

const MUIDialog = withStyles(theme => ({
  paper: {
    width: '100%',
    height: window?.innerWidth > 680 ? '472px' : '100% !important',
    margin: '0px !important'
  },
  root: {}
}))(Dialog)

const DialogContent = withStyles(theme => ({
  root: {
    maxWidth: 'unset !important', // Remove default max-width
    width: '100% !important', // Fill remaining dialog space
    padding: theme.spacing(2),
    height: window?.innerWidth > 680 ? '472px' : '100% !important',
    maxHeight: '100% !important'
  }
}))(MuiDialogContent)

const ListModal = ({
  handleClose,
  open,
  getInvitesLists,
  userId,
  lists,
  addEntriesToList,
  freelancerId,
  getFreelancerById,
  resetContractForm,
  setUserIdForChat,
  user,
  checkUserConversation,
  role
}) => {
  const router = useRouter()

  const [openList, setOpenList] = useState(false)
  const [error, setError] = useState('')
  const [scheduleInterviewModal, setScheduleInterviewModal] = useState(false)

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
      handleClose()
    } else {
      setError(response?.response?.data?.msg ?? 'Something went wrong')
    }
  }

  const handleScheduleInterviewModal = () => {
    setScheduleInterviewModal(!scheduleInterviewModal)
  }

  const sendMessage = async () => {
    setUserIdForChat(user?.userId)

    if (window.innerWidth <= 680) {
      const response = await checkUserConversation({
        freelancerId: user?.userId,
        clientId: userId
      })
      if (response?.data?._id || response?.data === true) {
        router.push(`/dashboard/chat/${response?.data?._id}`)
        setUserIdForChat(null)
      } else {
      }
    } else {
      router.push('/dashboard/inbox')
    }
  }

  return (
    <>
      <MUIDialog
        data-testid={`${userId}_list_modal`}
        id={`${user?.userId}_list_modal`}
        onClose={handleClose}
        disableEscapeKeyDown
        open={open}
        maxWidth="sm"
        aria-labelledby="story-preview-modal"
        aria-describedby="story-preview-modal-description">
        <DialogContent dividers>
          <IconButton
            data-testid="close_list_modal_icon"
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: theme => theme.palette.grey[500]
            }}>
            <CloseIcon />
          </IconButton>
          <div className="mx-2">
            {role !== 1 && (
              <P
                padding="25px 0 18px 0"
                margin="7px 0 0 0"
                borderBottom="3px solid #EFF1F4"
                fontWeight="600"
                cursor="pointer"
                onClick={async () => {
                  await resetContractForm()
                  await getFreelancerById(freelancerId)
                  await router.push('/hire')
                }}>
                Make An Offer
              </P>
            )}
            {role !== 1 && (
              <P
                padding="12px 0 18px 0"
                cursor="pointer"
                borderBottom="3px solid #EFF1F4"
                margin="0"
                fontWeight="600"
                onClick={handleScheduleInterviewModal}>
                Schedule an Interview
              </P>
            )}
            <P
              padding="12px 0 18px 0"
              cursor="pointer"
              borderBottom="3px solid #EFF1F4"
              margin="0"
              fontWeight="600"
              onClick={async () => {
                await getFreelancerById(freelancerId)

                sendMessage()
              }}>
              Send A Message
            </P>

            <div
              onClick={() => setOpenList(!openList)}
              className="d-flex justify-content-between"
              style={{
                padding: '12px 0 18px 0',
                borderBottom: '3px solid #EFF1F4',
                cursor: 'pointer',
                position: 'relative'
              }}>
              <P fontWeight="600" margin="0">
                Add User To A List
              </P>
              <span
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '15px',
                  transform: openList ? 'rotate(0deg)' : 'rotate(-90deg)',
                  transition: 'transform 0.3s ease'
                }}>
                <IconComponent name="downArrow" width="10" height="10" viewBox="0 0 10 10" fill="black" />
              </span>
            </div>
          </div>
          <DropDown display={openList ? 'block' : 'none'} className="mx-2">
            {lists?.length
              ? lists.map(
                  list =>
                    list?.name !== 'Recently Viewed' && (
                      <div
                        data-testid={list?._id}
                        className="d-flex px-4 py-2 me-2"
                        style={{ gap: '15px', borderBottom: '3px solid #EFF1F4' }}
                        key={list?._id}
                        onClick={() => {
                          addToList(list)
                        }}>
                        <div>
                          <img src="/img/heart.png" />
                        </div>
                        <div>
                          <P fontSize="16px" margin="0">
                            {list?.name || 'List Name'}
                          </P>
                          <div className="d-flex align-items-center">
                            <IconComponent
                              name={list?.icon}
                              width="4.47"
                              height="5.11"
                              viewBox="0 0 4.47 5.11"
                              fill="#B2B9C5"
                            />
                            <P fontSize="7px" margin="0" padding="0 0 0 3px">
                              {list?.isPrivate && 'Private'}
                            </P>

                            <P fontSize="7px" margin="0" padding="0px 0px 0px 5px">
                              {list?.listEntries?.length || 0} member
                            </P>
                          </div>
                        </div>
                      </div>
                    )
                )
              : ''}
          </DropDown>
        </DialogContent>
      </MUIDialog>
      {scheduleInterviewModal && (
        <ScheduleMeetingModal
          scheduleInterviewModal={scheduleInterviewModal}
          handleScheduleInterviewModal={handleScheduleInterviewModal}
          receiver={{ userId: { _id: user?.userId } }}
          setScheduleInterviewModal={setScheduleInterviewModal}
        />
      )}
      <Notification error={error} />
    </>
  )
}

const mapStateToProps = state => {
  return {
    role: state?.Auth?.user?.role,
    lists: state.Lists?.invitesList
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getInvitesLists: bindActionCreators(getInvitesLists, dispatch),
    getAllFreelancers: bindActionCreators(getAllFreelancers, dispatch),
    addEntriesToList: bindActionCreators(addEntriesToList, dispatch),
    getFreelancerById: bindActionCreators(getFreelancerById, dispatch),
    resetContractForm: bindActionCreators(resetContractForm, dispatch),
    setUserIdForChat: bindActionCreators(setUserIdForChat, dispatch),
    checkUserConversation: bindActionCreators(checkUserConversation, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListModal)
