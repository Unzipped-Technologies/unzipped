import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Image from '../../ui/Image'
import Badge from '../../ui/Badge'
import { useRouter } from 'next/router'
import { DarkText, Absolute, TEXT } from './style'
import { useDispatch, useSelector } from 'react-redux'

import { createRecentlyViewdList } from '../../../redux/ListEntries/action'

const Container = styled.div`
  display: flex;
  flex-flow: row;
  width: inherit;
  padding: ${({ includeRate }) => (includeRate ? '0px 10px 0px 20px' : '15px 10px 0px 20px')};
  border-radius: 5px;
  border: 1px solid #d9d9d9;
  padding: 10px;
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
    user?.id && router.push(`/freelancers/${user.id}`)
  }

  useEffect(() => {
    setIsSmallText(user?.cover.length > 240 ? true : false)
    setIsTextHidden(true)
  }, [user])

  return (
    <Container includeRate={includeRate} data-testid={user?.itemId + '_entry'}>
      <Left>
        <Image src={user?.profilePic} alt={user?.name + ' profile'} height="94px" width="94px" radius="50%" />
      </Left>
      <Right minWidth={width} includeRate={includeRate}>
        <TEXT textColor="#0057FF" onClick={redirectToProfile} id="freelancer_name">
          {user?.name}
        </TEXT>
        <TEXT textColor="#000" onClick={redirectToProfile} id="freelancer_category">
          {user?.category}
        </TEXT>
        <TEXT>{user?.type}</TEXT>
        <div style={{ display: 'flex', width: '100%' }}>
          <div>{user?.country && <span id="freelancer_country">{user?.country}</span>}</div>
          <div style={{ marginLeft: '175px' }} id="freelancer_rate">
            <span>Estimated Rate:</span>
            <RateTextStyled> $ {user?.rate}</RateTextStyled> / hour
          </div>
        </div>

        <div style={{ width: '82%', display: 'flex' }} id="freelancer_cover">
          {user?.cover && (
            <DarkText topMargin="10px">
              <strong>cover letter: </strong>
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
            </DarkText>
          )}
        </div>
        {user?.skills?.length > 0 && user.skills.map((item, index) => <Badge key={index}>{item}</Badge>)}
      </Right>

      <Absolute>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div>
            <button
              role="button"
              style={{
                padding: '8px 22px',
                color: '#000',
                borderRadius: '25px',
                border: 0,
                background: '#8EDE64'
              }}
              onClick={redirectToProfile}>
              View Profile
            </button>
          </div>
          <div style={{ marginTop: '15px' }}>
            <span id="freelancer_votes">{`${
              user?.likes?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') ?? 0
            } Upvotes by clients`}</span>
          </div>
        </div>
      </Absolute>
    </Container>
  )
}

export default FreelancerListingCard
