import React, { useState, useEffect } from 'react'
import IconComponent from '../../ui/icons/IconComponent'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { DIV, TEXT, DarkText, DarkSpan } from './style'
import { createRecentlyViewdList } from '../../../redux/ListEntries/action'
import { useDispatch, useSelector } from 'react-redux'
import { createUserInvitation } from '../../../redux/actions'
import Button from '../../ui/Button'
import { Icon, Badge } from '../../ui'
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

const SpanStyled = styled.span`
  color: #000;
  font-family: Roboto;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 21px; /* 161.538% */
  letter-spacing: 0.4px;
  text-decoration-line: underline;
  margin-left: 10px;
  display: block;
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

function MobileFreelancerCard({ user, includeRate, clearSelectedFreelancer, afterInvitation, hasBorder = true }) {
  const router = useRouter()
  const { project } = router.query

  const dispatch = useDispatch()
  const userLists = useSelector(state => state.ListEntries.userLists)
  const userId = useSelector(state => state.Auth.user._id)
  const accessToken = useSelector(state => state.Auth.token)
  const listObj = userLists?.find(list => list.name === 'Recently Viewed')

  const [isSmallText, setIsSmallText] = useState(false)
  const [isTextHidden, setIsTextHidden] = useState(false)
  const [expandedStates, setExpandedStates] = useState(false)
  const [isOpen, setOpen] = useState(false)

  useEffect(() => {
    setIsSmallText(user?.cover.length > 240 ? true : false)
    setIsTextHidden(true)
  }, [user])

  const redirectToProfile = () => {
    if (listObj) {
      dispatch(createRecentlyViewdList({ listId: listObj._id, userId, freelancerId: user.id }))
    }
    user?.id && router.push(`/freelancers/${user.id}`)
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
    } else {
    }
  }

  const handlOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  return (
    <div
      style={{ borderBottom: hasBorder ? '2px solid rgba(0, 0, 0, 0.25)' : '', color: 'black' }}
      data-testid={`${user?.id}_mobile`}>
      <div className="px-3 py-2">
        <div className="d-flex">
          <img
            src={user?.profilePic}
            alt={user?.name + ' profile'}
            style={{ width: '55px', height: '55px' }}
            className="mt-2"
          />
          <div style={{ marginLeft: '16px' }}>
            <div className="d-flex">
              <p
                className="mb-0 pe-2"
                style={{ color: '#0057FF', fontWeight: '500', fontSize: '16px' }}
                id="freelancer_name">
                {user?.name}
              </p>
              {user?.isPreferedFreelancer && (
                <span data-testid={`${user?.id}_prefered`}>
                  <IconComponent name="verifiedUser" width="27" height="27" viewBox="0 0 20 27" fill="#37DEC5" />
                </span>
              )}
            </div>
            <p className="mb-0" style={{ fontSize: '15px', fontWeight: '600' }} id="freelancer_category">
              {user?.type}
            </p>
            <p className="mb-0" id="freelancer_country">
              {user?.country}
            </p>
          </div>
          {userId && (
            <ButtonTwo
              onClick={handlOpen}
              data-testid={`open_${user?.id}_mobile`}
              id={`open_${user.userId}_list_modal`}>
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
          <div className="d-flex me-2" style={{ gap: '15px', width: '100%' }}>
            <span
              style={{
                display: 'flex',
                flexFlow: 'row',
                justifyItems: 'space-between',
                alignItems: 'flex-end',
                fontSize: '20px'
              }}
              id="freelancer_rate">
              {user?.rate > 0 ? (
                <span className="d-flex">
                  <span style={{ paddingRight: '5px' }}>${user?.rate}</span> /{' '}
                  <span style={{ fontSize: '15px', padding: '5px 0px 0px 0px' }}>hour</span>
                </span>
              ) : (
                'Negotiable'
              )}
            </span>
            <DIV
              id="freelancer_votes"
              width="97%"
              display="flex"
              overflow="hidden"
              alignItems="flex-end"
              justifyContent="flex-end"
              margin="-25px 0px 0px 35px">
              <IconComponent name="thumbUp" width="15" height="15" viewBox="0 0 15 15" fill="#0057FF" />
              <span style={{ fontSize: '16px', paddingLeft: '3px' }}>{user?.likes}</span>
            </DIV>
          </div>
        </div>
      </div>
      {user?.skills?.length > 0 && (
        <UserSkills style={{ overflowX: 'scroll', overflowY: 'hidden', padding: '10px', marginLeft: '8px' }}>
          {user?.skills?.map((skill, index) => (
            <Badge key={index}>{skill?.skill}</Badge>
          ))}
        </UserSkills>
      )}
      <div className="px-4" id="freelancer_cover">
        <b>cover letter: </b>
        {isTextHidden ? (
          <>
            <div style={{ display: 'flex' }}>
              <div>{user?.cover?.substring(0, 240)}</div>
            </div>
            {isSmallText && (
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <div>
                  <SpanStyled
                    onClick={() => {
                      setExpandedStates(!expandedStates)
                      setIsTextHidden(!isTextHidden)
                    }}>
                    Read More
                  </SpanStyled>
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            <div style={{ display: 'flex' }}>
              <div> {user?.cover} </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <div>
                <SpanStyled
                  onClick={() => {
                    setExpandedStates(!expandedStates)
                    setIsTextHidden(!isTextHidden)
                  }}>
                  Read Less
                </SpanStyled>
              </div>
            </div>
          </>
        )}
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
