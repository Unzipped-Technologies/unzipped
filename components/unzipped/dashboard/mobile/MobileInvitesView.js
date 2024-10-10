import React from 'react'
import styled, { css } from 'styled-components'
import Image from '../../../ui/Image'
import Button from '../../../ui/Button'
import Badge from '../../../ui/Badge'
import { useRouter } from 'next/router'
import { MdVerifiedUser } from 'react-icons/md'
import IconComponent from '../../../ui/icons/IconComponent'
import { ConverterUtils } from '../../../../utils'

const ApplicationView = styled.div`
  display: flex;
  flex-direction: column;
  background: rgba(240, 240, 240, 0);
  border-radius: 5px;
  border: 1px solid #d9d9d9;
  flex-wrap: wrap;
  padding-bottom: 10px;
  margin: 5px 10px 7px 15px;
`

const PersonalInfo = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

const ProfileImage = styled.div`
  margin: 20px 20px 8px 20px;
  width: 65px;
  height: 65px;
`

const UserInfo = styled.div`
  display: flex;
  flex-flow: column;
  margin-top: 10px;
  margin-left: 10px;
  flex-wrap: wrap;
`

const UserRate = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const Rate = styled.div`
  color: #000;
  font-size: 16px;
  font-weight: 600;
  line-height: 24.5px; /* 102.083% */
  letter-spacing: 0.4px;
  padding-top: 5px;
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

const Likes = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 10px;
`

const TotlaLikes = styled.div`
  color: #000;
  font-family: Roboto;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 19.5px; /* 121.875% */
  letter-spacing: 0.15px;
  padding-left: 5px;
`

const Skills = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 10px 20px 5px 20px;
`

const CoverLetter = styled.span`
  color: #000;
  font-size: 13px;
  font-weight: 100;
  line-height: 21px; /* 161.538% */
  letter-spacing: 0.4px;
  padding-left: 3px;
`

const ViewProfileButton = styled.button`
  display: flex;
  width: 95%;
  height: 38px;
  border-radius: 5px;
  border: 1px solid rgba(196, 196, 196, 0);
  background: #37dec5;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-family: Roboto;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 19.5px;
  letter-spacing: 0.5px;
  margin: auto;
  padding:1px;
`

const MobileInvitesView = ({ projectDetails, invitesList }) => {
  const router = useRouter()

  const redirectToProfile = freelancerId => {
    router.push(`/freelancers/${freelancerId}`)
  }
  return (
    <>
      <div data-testid="mobile_invites">
        {invitesList?.length && invitesList[0]?.listEntries?.length ? (
          invitesList[0]?.listEntries.map(invitation => {
            return (
              <ApplicationView key={invitation._id} data-testid={`${invitation?._id}_invite`}>
                <PersonalInfo>
                  <ProfileImage>
                    <Image
                      src={invitation?.freelancerId?.userId?.profileImage}
                      alt={`${
                        invitation?.freelancerId?.userId?.FirstName + ' ' + invitation?.freelancerId?.userId?.LastName
                      }`}
                      height="55px"
                      width="65px"
                      radius="5px"
                    />
                  </ProfileImage>
                  <UserInfo>
                    <div style={{ display: 'flex' }}>
                      <UserName>
                        {ConverterUtils.capitalize(
                          `${invitation?.freelancerId?.userId?.FirstName} ${invitation?.freelancerId?.userId?.LastName}`
                        )}
                      </UserName>
                      <div style={{ fontSize: '27px', color: '#37DEC5', marginTop: '-12px', marginLeft: '5px' }}>
                        <MdVerifiedUser />
                      </div>
                    </div>

                    <UserCategory>{invitation?.freelancerId?.category}</UserCategory>
                    <UserCountry>{invitation?.freelancerId?.userId?.AddressLineCountry || 'N/A'}</UserCountry>
                  </UserInfo>
                </PersonalInfo>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    margin: '0px 20px 0px 20px'
                  }}>
                  <UserRate>
                    <Rate>
                      {invitation?.freelancerId?.rate > 0 ? (
                        <>
                          ${invitation?.freelancerId?.rate}
                          <small
                            style={{
                              fontWeight: '100',
                              color: ' #000',
                              fontSize: '15px',
                              fontWeight: '500',
                              letterSpacing: '0.4px',
                              marginTop: '8px'
                            }}>
                            /&nbsp;hour
                          </small>
                        </>
                      ) : (
                        'Negotiable'
                      )}
                    </Rate>
                  </UserRate>
                  <Likes>
                    <IconComponent name="thumbUp" width="14" height="14" viewBox="0 0 14 14" fill="#0057FF" />

                    <TotlaLikes>{invitation?.freelancerId?.likeTotal || 0}</TotlaLikes>
                  </Likes>
                </div>
                <Skills data-testid={`${invitation._id}_skills`}>
                  {invitation?.freelancerId?.freelancerSkills?.length
                    ? invitation?.freelancerId?.freelancerSkills.map(skill => {
                        return <Badge key={skill._id} small>{skill?.skill}</Badge>
                      })
                    : ''}
                </Skills>
                <ViewProfileButton
                  onClick={() => {
                    redirectToProfile(invitation?.freelancerId?._id)
                  }}>
                  View Profile
                </ViewProfileButton>
              </ApplicationView>
            )
          })
        ) : (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: '200px'
            }}>
            <Button
              extraWid
              type="outlineInverse"
              buttonHeight="25px"
              fontSize="15px"
              contentMargin="0px !important"
              colors={{
                text: '#1976D2',
                background: 'white',
                border: '1px',
                wideBorder: '#1976D2'
              }}
              onClick={() => {
                router.push(`/freelancers?project=${projectDetails?._id}`)
              }}>
              Invite Freelancer
            </Button>
          </div>
        )}
      </div>
    </>
  )
}

export default MobileInvitesView
