import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Image from '../../ui/Image'
import Button from '../../ui/Button'
import Badge from '../../ui/Badge'
import { useRouter } from 'next/router'
import { TitleText, DarkText, Absolute, DarkSpan } from './style'
import { useDispatch, useSelector } from 'react-redux'

import { createRecentlyViewdList } from '../../../redux/ListEntries/action'

const Container = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  // width: 100%;
  padding: ${({ includeRate }) => (includeRate ? '0px 10px 0px 20px' : '15px 10px 0px 20px')};
  border-radius: 5px;
  border: 1px solid #d9d9d9;
  padding: 10px;
  @media (max-width: 1300px) and (min-width: 1278x) {
    width: 900px;
    padding: 3px;
  }
  @media (max-width: 1277px) and (min-width: 1181x) {
    width: 850px;
    padding: 3px;
  }
  @media (max-width: 1180px) and (min-width: 1133x) {
    width: 800px;
    padding: 3px;
  }
  @media (max-width: 1132px) and (min-width: 1083px) {
    width: 750px;
    padding: 3px;
  }
  @media (max-width: 1082px) and (min-width: 982px) {
    width: 700px;
    padding: 3px;
  }
  @media (max-width: 981px) and (min-width: 932px) {
    width: 650px;
    padding: 3px;
  }
  @media (max-width: 931px) {
    width: 600px;
    padding: 3px;
  }
`
const Left = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  margin: 0px 10px;
`
const Right = styled.div`
  padding: ${({ includeRate }) => (includeRate ? '5px 20px' : '15px 30px')};
`

const Flex = styled.div`
  display: flex;
  flex-flow: row;
  justify-items: space-between;
`
const RateTextStyled = styled.span`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  padding-left: 3px;
  color: #333;
  line-height: 10px;
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

const DIV = styled.div`
  display: flex;
  width: max-content;
  justify-content: space-between;
  width: 70%;
`
const FreelancerListingCard = ({ user, includeRate, width }) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [isSmallText, setIsSmallText] = useState(false)
  const [isTextHidden, setIsTextHidden] = useState(false)
  const userId = useSelector(state => state.Auth.user._id)
  const [expandedStates, setExpandedStates] = useState(false)
  const userLists = useSelector(state => state.ListEntries.userLists)

  const redirectToProfile = () => {
    const listObj = userLists?.find(list => list.name === 'Recently Viewed')

    dispatch(createRecentlyViewdList({ listId: listObj._id, userId, freelancerId: user.id }))
    if (user?.id) {
      router.push(`/freelancers/${user.id}`)
    }
  }

  useEffect(() => {
    if (user?.cover) {
      setIsSmallText(user?.cover.length > 240 ? true : false)
      setIsTextHidden(true)
    }
  }, [user])

  return (
    <Container includeRate={includeRate}>
      <Left>
        <Image src={user.profilePic} alt={user.name + ' profile'} height="94px" width="94px" radius="50%" />
        <Button margin="20px 0px" type={!user.isInvited ? '#D9D9D9' : '#37DEC5'} noBorder>
          {user.isInvited ? 'Invited' : 'Invite'}
        </Button>
      </Left>
      <Right includeRate={includeRate}>
        <TitleText width={'max-content'} half color="#0057FF" onClick={redirectToProfile}>
          {user?.name}
        </TitleText>
        <TitleText width={'max-content'} half color="#000" onClick={redirectToProfile}>
          {user?.category}
        </TitleText>
        <TitleText width={'max-content'} noMargin>
          {user.type}
        </TitleText>
        <DIV>
          <div>{user?.country && <span>{user.country}</span>}</div>
          <div>
            <span>Estimated Rate:</span>
            <RateTextStyled> $ {user?.rate}</RateTextStyled> / hour
          </div>
        </DIV>

        <div style={{ display: 'flex' }}>
          {user?.cover && (
            <DarkText topMargin="10px">
              <strong>cover letter: </strong>
              {isTextHidden ? (
                <>
                  <div style={{ display: 'flex' }}>
                    <div>{user.cover.substring(0, 240)}</div>
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
            </DarkText>
          )}
        </div>
        {user.skills?.length > 0 && user.skills.map((item, index) => <Badge key={index}>{item}</Badge>)}
      </Right>

      <Absolute>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button
              style={{
                padding: '8px 22px',
                color: '#000',
                borderRadius: '25px',
                border: 0,
                background: '#8EDE64',
                marginLeft: '10px'
              }}
              onClick={redirectToProfile}>
              View Profile
            </button>
          </div>
          <div style={{ marginTop: '15px' }}>
            <span>{`${user.likes.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}  Upvotes by clients `}</span>
          </div>
        </div>
      </Absolute>
    </Container>
  )
}

export default FreelancerListingCard
