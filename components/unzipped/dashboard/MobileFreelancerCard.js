import React, { useState } from 'react'
import IconComponent from '../../ui/icons/IconComponent'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { createRecentlyViewdList } from '../../../redux/ListEntries/action'
import { useDispatch, useSelector } from 'react-redux'
import { createUserInvitation } from '../../../redux/actions'
import Button from '../../ui/Button'
import { Icon } from '../../ui'
import ListModal from '../ListModal'

const UserSkills = styled.div`
  ::-webkit-scrollbar {
    width: 0.1em;
  }

  ::-webkit-scrollbar-track {
    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background-color: transparent;
  }
`
const SelectInputStyled = styled.select`
  border-radius: 3px;
  border: 0.25px solid #000;
  background: rgba(217, 217, 217, 0.28);
  display: block;
  padding: 5px;
  width: 100px;
  height: 35px;
  font-size: 15px;
`

const ButtonTwo = styled.div`
  margin-left: auto;
  margin-right: 20px;
  transform: rotate(90deg);
  outline: none;
  border: none;
  left: 10px;
  position: relative;
  padding-left: 10px;
`

function MobileFreelancerCard({ user, includeRate, clearSelectedFreelancer, afterInvitation }) {
  const router = useRouter()
  const { project } = router.query

  const dispatch = useDispatch()
  const userLists = useSelector(state => state.ListEntries.userLists)
  const userId = useSelector(state => state.Auth.user._id)
  const accessToken = useSelector(state => state.Auth.token)

  const listObj = userLists?.find(list => list.name === 'Recently Viewed')

  const [isOpen, setOpen] = useState(false)

  const redirectToProfile = () => {
    if (listObj) {
      dispatch(createRecentlyViewdList({ listId: listObj._id, userId, freelancerId: user.id }))
    }
    if (user?.id) {
      router.push(`/freelancers/${user.id}`)
    }
  }

  const handleUserInvite = async () => {
    if (userId && accessToken) {
      const inviteFreelancer = {
        userInvited: userId,
        freelancer: user.id,
        business: project
      }
      await dispatch(createUserInvitation(inviteFreelancer))
      await afterInvitation()
    }
  }

  const handlOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div className="bg-" style={{ borderBottom: '2px solid rgba(0, 0, 0, 0.25)', color: 'black' }}>
      <div className="px-3 py-2">
        <div className="d-flex">
          <img src={user?.profilePic} alt="Profile Pic" style={{ width: '55px', height: '55px' }} className="mt-2" />
          <div style={{ marginLeft: '16px' }}>
            <div className="d-flex">
              <p className="mb-0 pe-2" style={{ color: '#0057FF', fontWeight: '500', fontSize: '16px' }}>
                {user?.name}
              </p>
              {user?.isPreferedFreelancer && (
                <IconComponent name="verifiedUser" width="27" height="27" viewBox="0 0 20 27" fill="#37DEC5" />
              )}
            </div>
            <p className="mb-0" style={{ fontSize: '15px', fontWeight: '600' }}>
              {user?.type}
            </p>
            <p className="mb-0">{user?.country}</p>
          </div>
          {userId && (
            <ButtonTwo onClick={handlOpen}>
              <Icon name="actionIcon" color="#333" />
            </ButtonTwo>
          )}
        </div>
        <div className="d-flex justify-content-between  align-items-center">
          {project && (
            <Button
              margin="20px 0px"
              type={user?.invites?.business === project ? 'grey' : 'default'}
              noBorder
              disabled={user?.invites?.business === project}
              onClick={handleUserInvite}>
              {user?.invites?.business === project ? 'Invited' : 'Invite'}
            </Button>
          )}
          <div className="d-flex  gap-4">
            <span
              style={{
                fontSize: '20px'
              }}>
              {user?.rate > 0 ? (
                <div>
                  ${user?.rate} <span style={{ fontSize: '15px' }}>/ hour</span>
                </div>
              ) : (
                'Negotiable'
              )}
            </span>
            <div className="d-flex align-items-center">
              <IconComponent name="thumbUp" width="15" height="15" viewBox="0 0 15 15" fill="#0057FF" />
              <span style={{ fontSize: '16px', paddingLeft: '3px' }}>{user?.likes}</span>
            </div>
          </div>
        </div>
      </div>
      <UserSkills style={{ overflowX: 'scroll', overflowY: 'hidden', padding: '13px 0', marginLeft: '8px' }}>
        {user?.skills?.map((skill, index) => (
          <span
            key={index}
            style={{
              backgroundColor: '#D9D9D9',
              borderRadius: '16px',
              fontSize: '13px',
              padding: '4px 20px 6px 20px',
              marginRight: '6.4px',
              fontWeight: '500',
              minHeight: '100%'
            }}>
            {skill}
          </span>
        ))}
      </UserSkills>
      <div className="px-4">
        <p>
          <b>cover letter: </b>
          {user?.cover}
        </p>
      </div>
      <div className="px-4 mb-3" style={{ display: 'grid' }}>
        <button
          onClick={redirectToProfile}
          style={{
            background: '#37DEC5',
            color: 'white',
            fontSize: '16px',
            border: '0',
            padding: '10px 0px',
            fontWeight: '600'
          }}>
          VIEW PROFILE
        </button>
      </div>
      {isOpen && (
        <ListModal handleClose={handleClose} open={isOpen} userId={userId} freelancerId={user?.id} user={user} />
      )}
    </div>
  )
}

export default MobileFreelancerCard
