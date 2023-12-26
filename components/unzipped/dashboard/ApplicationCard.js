import React from 'react'
import styled, { css } from 'styled-components'
import Image from '../../ui/Image'
import Button from '../../ui/Button'
import Badge from '../../ui/Badge'
import { useRouter } from 'next/router'
import { TitleText, DarkText, Absolute, DarkSpan } from './style'
import { MdVerifiedUser } from 'react-icons/md'
import MobileApplicationCard from './mobile/MobileApplicationsView'

const DesktopContainer = styled.div`
  display: flex;
  flex-flow: row;
  justify-items: space-around;
  flex-shrink: 0;
  background: rgba(240, 240, 240, 0);
  height: 262px;
  width: 80%;
  margin: auto;
  border-radius: 5px;
  border: 1px solid #d9d9d9;
  @media (max-width: 680px) {
    display: none;
  }
`

const ProfileImage = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  margin: 20px 20px;
  width: 120px;
`

const InviteButton = styled.button`
  width: 77px;
  height: 33px;
  flex-shrink: 0;
  margin-top: 30px;
  border: none;
  background: #d9d9d9 !important;
  ${({ active }) =>
    active &&
    css`
      border: none;
      background-color: transparent !important;
      display: none;
    `};
`

const UserInfo = styled.div`
  display: flex;
  flex-flow: column;
  width: 600px;
  margin-top: 30px;
  margin-left: 20px;
`

const UserName = styled.span`
  color: #0057ff;
  font-family: Roboto;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 24.5px; /* 153.125% */
  letter-spacing: 0.4px;
`
const UserCategory = styled.span`
  color: #000;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 24.5px; /* 163.333% */
  letter-spacing: 0.4px;
`

const UserCountry = styled.span`
  color: #000;
  font-size: 14px;
  font-style: normal;
  font-weight: 300;
  line-height: 24.5px; /* 175% */
  letter-spacing: 0.4px;
`

const UserRate = styled.span`
  color: #000;
  font-size: 24px;
  font-weight: 300;
  line-height: 24.5px; /* 102.083% */
  letter-spacing: 0.4px;
  padding-top: 5px;
`
const Skills = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 10px;
  margin-bottom: 10px;
`

const CoverLetter = styled.span`
  color: #000;
  font-size: 13px;
  font-weight: 100;
  line-height: 21px; /* 161.538% */
  letter-spacing: 0.4px;
  padding-left: 3px;
`

const ViewProfile = styled.div`
  display: flex;
  flex-flow: column;
  margin-top: 20px;
  align-items: flex-end; /* Align items at the end of the column */
  margin-right: 10px;
`
const ViewProfileButton = styled.button`
  width: 131px;
  height: 35px;
  flex-shrink: 0;
  border-radius: 16px;
  border: 1px solid rgba(196, 196, 196, 0);
  background: #8ede64;
`

const ApplicationCard = ({ user, includeRate, clearSelectedFreelancer, width }) => {
  const router = useRouter()
  const redirectToProfile = () => {
    if (clearSelectedFreelancer) clearSelectedFreelancer()
    if (user?.id) {
      router.push(`/freelancers/${user.id}`)
    }
  }
  return (
    <>
      <DesktopContainer>
        <ProfileImage>
          <Image src={user?.profilePic} alt={user?.name + ' profile'} height="102px" width="102px" radius="50%" />
          <InviteButton>{user?.isInvited ? 'Invited' : 'Invite'}</InviteButton>
        </ProfileImage>
        <UserInfo>
          <div style={{ display: 'flex' }}>
            <UserName>James Cameron</UserName>
            <div style={{ fontSize: '27px', color: '#37DEC5', marginTop: '-12px', marginLeft: '5px' }}>
              <MdVerifiedUser />
            </div>
          </div>

          <UserCategory>Full stack web developer</UserCategory>
          <UserCountry>United States</UserCountry>
          <UserRate>
            $27{' '}
            <span
              style={{
                fontWeight: '100',
                color: ' #000',
                fontSize: '15px',
                fontWeight: '300',
                letterSpacing: '0.4px',
                marginTop: '-100px'
              }}>
              / hour
            </span>
          </UserRate>
          <Skills>
            <Badge>React</Badge>
            <Badge>Node</Badge>
            <Badge>MongoDB</Badge>
            <Badge>Express</Badge>
            <Badge>UI/UX</Badge>
          </Skills>
          <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
            <p>
              <b style={{ fontSize: '11px' }}>cover letter:</b>
              <CoverLetter>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim...
                <a style={{ textDecoration: 'underline' }}>Read More</a>
              </CoverLetter>
            </p>
          </div>
        </UserInfo>
        <ViewProfile>
          <ViewProfileButton onClick={redirectToProfile}>View Profile</ViewProfileButton>
          <span
            style={{
              color: ' #000',
              fontFamily: 'Roboto',
              fontSize: '15px',
              fontStyle: 'normal',
              fontWeight: '400',
              lineHeight: '24.5px' /* 163.333% */,
              letterSpacing: '0.4px',
              marginTop: '50px'
            }}>
            200 UPVOTES BY CLIENTS
          </span>
        </ViewProfile>
      </DesktopContainer>
      <MobileApplicationCard></MobileApplicationCard>
    </>
  )
}

export default ApplicationCard
