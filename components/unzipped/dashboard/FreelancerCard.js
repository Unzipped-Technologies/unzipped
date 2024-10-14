import React, { useState } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'

import { Icon } from '../../ui'
import Image from '../../ui/Image'
import Button from '../../ui/Button'
import Badge from '../../ui/Badge'
import { DarkText, Absolute, DarkSpan, TEXT } from './style'
import { useDispatch, useSelector } from 'react-redux'
import ListModal from '../ListModal'
import { createRecentlyViewdList } from '../../../redux/ListEntries/action'
import { createUserInvitation } from '../../../redux/actions'

const Container = styled.div`
  display: flex;
  flex-flow: row;
  width: inherit;
  padding: ${({ includeRate }) => (includeRate ? '0px 10px 0px 20px' : '15px 10px 0px 20px')};
`
const Left = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  margin: 0px 10px;
`
const Right = styled.div`
  padding: ${({ includeRate }) => (includeRate ? '5px 30px' : '15px 30px')};
  min-width: ${({ minWidth }) => minWidth};
`

const ButtonTwo = styled.div`
  transform: rotate(90deg);
  outline: none;
  border: none;
  left: 10px;
  position: relative;
  padding-left: 10px;
`

const Flex = styled.div`
  display: flex;
  flex-flow: row;
  justify-items: space-between;
`

const FreelancerCard = ({ user, includeRate, width, filter, userId }) => {
  const router = useRouter()
  const { project } = router.query

  const [isOpen, setOpen] = useState(false)

  const userLists = useSelector(state => state.ListEntries.userLists)
  const accessToken = useSelector(state => state.Auth.token)
  const dispatch = useDispatch()

  const redirectToProfile = () => {
    const listObj = userLists?.find(list => list.name === 'Recently Viewed')
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
      dispatch(createUserInvitation(inviteFreelancer, filter))
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
    <Container includeRate={includeRate} data-testid={user?.id}>
      <Left>
        <Image src={user.profilePic} alt={user.name + ' profile'} height="94px" width="94px" radius="50%" />
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
      </Left>
      <Right minWidth={width} includeRate={includeRate}>
        <TEXT textColor="#0057FF" onClick={redirectToProfile}>
          {user.name}
        </TEXT>
        <TEXT margin="0px">{user.type}</TEXT>
        {user?.country ? <DarkText half>{user.country}</DarkText> : <DarkText half>-</DarkText>}
        {includeRate && (
          <Flex>
            {user?.rate > 0 ? (
              <DarkText small half>
                <DarkSpan large>${user?.rate}</DarkSpan> / hour
              </DarkText>
            ) : (
              <DarkText small half>
                Negotiable
              </DarkText>
            )}

            {user?.likes > 0 && (
              <DarkText right color="#000" fontSize="15px" noMargin>
                {`${user.likes.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}  UPVOTES BY CLIENTS `}
              </DarkText>
            )}
          </Flex>
        )}
        {user.skills?.length > 0 &&
          user.skills.map((item, index) => <Badge  className="overflow-hidden"  key={`${index}_badge`}>{item?.skill}</Badge>)}
        {user?.cover && (
          <DarkText topMargin="10px" width="100%">
            <b
              style={{
                fontSize: '11px',
                fontWeight: '800',
                paddingRight: '5px',
                lineHeight: '21px'
              }}>
              Cover letter:
            </b>
            {user.cover}
          </DarkText>
        )}
      </Right>
      <Absolute>
        <Button
          color="#000"
          style={{ padding: '8px 22px', marginRight: '20px' }}
          normal
          oval
          type="green2"
          noBorder
          onClick={redirectToProfile}>
          View Profile
        </Button>
        {userId && userId !== user.userId && (
          <ButtonTwo onClick={handlOpen} data-testid={`open_${userId}_list_modal`}>
            <Icon name="actionIcon" color="#333" />
          </ButtonTwo>
        )}
      </Absolute>

      {isOpen && (
        <ListModal handleClose={handleClose} open={isOpen} userId={userId} freelancerId={user?.id} user={user} />
      )}
    </Container>
  )
}

export default FreelancerCard
