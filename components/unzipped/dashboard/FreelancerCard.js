import React, { useState } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'

import { Icon } from '../../ui'
import Image from '../../ui/Image'
import Button from '../../ui/Button'
import Badge from '../../ui/Badge'
import { TitleText, DarkText, Absolute, DarkSpan } from './style'
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
  min-width: ${({ minWidth }) => (minWidth ? minWidth : '850px')};
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
  const { proejct } = router.query

  const [isOpen, setOpen] = useState(false)

  const userLists = useSelector(state => state.ListEntries.userLists)
  const accessToken = useSelector(state => state.Auth.token)
  const dispatch = useDispatch()

  const redirectToProfile = () => {
    const listObj = userLists?.find(list => list.name === 'Recently Viewed')
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
        business: proejct
      }
      dispatch(createUserInvitation(inviteFreelancer, filter))
    }
  }

  const handlOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Container includeRate={includeRate}>
      <Left>
        <Image src={user.profilePic} alt={user.name + ' profile'} height="94px" width="94px" radius="50%" />
        {proejct && (
          <Button
            margin="20px 0px"
            type={user?.invites?.business === proejct ? 'grey' : 'default'}
            noBorder
            disabled={user?.invites?.business === proejct}
            onClick={handleUserInvite}>
            {user?.invites?.business === proejct ? 'Invited' : 'Invite'}
          </Button>
        )}
      </Left>
      <Right minWidth={width} includeRate={includeRate}>
        <TitleText half color="#0057FF" onClick={redirectToProfile}>
          {user.name}
        </TitleText>
        <TitleText noMargin>{user.type}</TitleText>
        {user?.country && <DarkText half>{user.country}</DarkText>}
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
        {user.skills?.length > 0 && user.skills.map((item, index) => <Badge key={index}>{item}</Badge>)}
        {user?.cover && (
          <DarkText topMargin="10px">
            <strong>cover letter: </strong>
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
        {userId && (
          <ButtonTwo onClick={handlOpen}>
            <Icon name="actionIcon" color="#333" />
          </ButtonTwo>
        )}
      </Absolute>

      {isOpen && <ListModal handleClose={handleClose} open={isOpen} userId={userId} freelancerId={user?.id} />}
    </Container>
  )
}

export default FreelancerCard
