import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { MdVerifiedUser } from 'react-icons/md'
import styled from 'styled-components'
import Button from '../../ui/Button'
import { useRouter } from 'next/router'

import Image from '../../ui/Image'
import Badge from '../../ui/Badge'
import { ConverterUtils } from '../../../utils'
import { getInvitesLists } from '../../../redux/actions'
import MobileInvitesView from './mobile/MobileInvitesView'
import ProjectDesktopCard from './ProjectsDesktopCard'

const ProjectApplications = styled.div`
  display: flex;
  flex-flow: row;
  justify-items: space-around;
  flex-shrink: 0;
  background: rgba(240, 240, 240, 0);
  border-radius:5px;
  box-shadow:0px 4px 6px rgba(0, 0, 0, 0.4);
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
const Grid2 = styled.div`
  display: flex;
  align-items: center;
`

const UserInfo = styled.div`
  display: flex;
  flex-flow: column;
  width: 600px;
  margin-top: 20px;
  margin-left: 10px;
  margin-bottom: 10px;
`

const UserName = styled.span`
  color: #0057ff;
  font-family: Roboto;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 24.5px; /* 153.125% */
  letter-spacing: 0.4px;
`
const UserCategory = styled.span`
  color: gray;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 24.5px; /* 163.333% */
  letter-spacing: 0.4px;
`

const UserCountry = styled.span`
  color: gray;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 24.5px; /* 175% */
  letter-spacing: 0.4px;
`

const UserRate = styled.span`
  color: #0057ff;
  font-size: 24px;
  font-weight: 400;
  line-height: 24.5px; /* 102.083% */
  letter-spacing: 0.4px;
  padding-top: 8px;
  margin: 4px 0px 4px 0px;
`
const Skills = styled.div`
  margin-top: 10px;
  margin-bottom: 5px;
`

const ViewProfile = styled.div`
  display: flex;
  flex-flow: column;
  margin-top: 20px;
  margin-bottom: 10px;
  align-items: flex-end; /* Align items at the end of the column */
  margin-right: 10px;
  justify-content: space-between;
  width: 200px;
`
const ViewProfileButton = styled.button`
  width: 100px;
  height: 30px;
  flex-shrink: 0;
  border-radius: 5px;
  border: 1px solid rgba(196, 196, 196, 0);
  background: #5cb85c;
  color: #fff;
  font-size:14px;
`

const DefaultDisplay = styled.div`
  display: flex;
  justify-content: end;
  align-items: end;
  padding-top: 15px;
`

const InvitesList = ({ projectDetails, invitesList, getInvitesLists, userId, role }) => {
  const router = useRouter()

  const redirectToProfile = freelancerId => {
    router.push(`/freelancers/${freelancerId}`)
  }

  useEffect(() => {
    async function fetchData() {
      await getInvitesLists({
        filter: {
          user: userId,
          name: 'Invites'
        },
        take: 1000
      })
    }
    fetchData()
  }, [])

  return (
    <>
      {window?.innerWidth > 680 ? (
        <div data-testid="desktop_invites" 
        style={{ width: '60%',margin:"8px 0px 0px 0px",boxShadow:"0px 4px 6px rgba(0, 0, 0, 0.4)"}}
        >
          {invitesList?.length && invitesList[0]?.listEntries?.length ? (
            invitesList[0]?.listEntries.map(invitation => {
              return (
                <span key={invitation._id} data-testid={`${invitation?._id}_invite`}>
                  {role === 0 ? (
                    <ProjectApplications>
                      <ProfileImage>
                        {invitation?.freelancerId?.userId?.profileImage ? (
                          <Image
                            src={invitation?.freelancerId?.userId?.profileImage}
                            alt={`${
                              invitation?.freelancerId?.userId?.FirstName +
                              ' ' +
                              invitation?.freelancerId?.userId?.LastName
                            }`}
                            height="80px"
                            width="auto"
                            radius="50%"
                          />
                        ) : (
                          <div
                            id="user_avatar"
                            style={{
                              display: 'flex',
                              flexFlow: 'column',
                              alignItems: 'center',
                              margin: '20px 20px',
                              height: '102px',
                              width: '102px',
                              borderRadius: '50%',
                              color: 'white',
                              backgroundColor: '#0e1724',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}>
                            {invitation?.freelancerId?.userId?.FirstName?.[0] ??
                              invitation?.freelancerId?.userId?.LastName?.[0]}
                          </div>
                        )}
                      </ProfileImage>
                      <UserInfo>
                        <div style={{ display: 'flex' }}>
                          <UserName id="name">
                            {ConverterUtils.capitalize(
                              `${invitation?.freelancerId?.userId?.FirstName} ${invitation?.freelancerId?.userId?.LastName}`
                            )}
                          </UserName>
                          <div style={{ fontSize: '27px', color: '#37DEC5', marginTop: '-12px', marginLeft: '5px' }}>
                            <MdVerifiedUser />
                          </div>
                        </div>

                        <UserCategory id="category">{invitation?.freelancerId?.category}</UserCategory>
                        <UserCountry id="address_country">
                          {invitation?.freelancerId?.userId?.AddressLineCountry || 'N/A'}</UserCountry>
                        <UserRate id="rate">
                          {invitation?.freelancerId?.rate > 0 ? (
                            <div>
                              {`$${invitation?.freelancerId?.rate}`}{' '}
                              <span
                                style={{
                                  fontWeight: '100',
                                  color: '#000',
                                  fontSize: '12px',
                                  fontWeight: '400',
                                  letterSpacing: '0.4px',
                                  marginTop: '-100px'
                                }}>
                                / hour
                              </span>
                            </div>
                          ) : (
                            <span
                              style={{
                                color: '#000',
                                fontSize: '15px'
                              }}>
                              Negotiable
                            </span>
                          )}
                        </UserRate>
                        <Skills data-testid={`${invitation._id}_skills`}>
                          {invitation?.freelancerId?.freelancerSkills?.length
                            ? invitation?.freelancerId?.freelancerSkills.map(skill => {
                                return (
                                  <Badge color="blue" key={skill._id}>
                                    {skill?.skill}
                                  </Badge>
                                )
                              })
                            : ''}
                        </Skills>
                      </UserInfo>
                      <ViewProfile>
                        <Grid2>
                          <ViewProfileButton
                            onClick={() => {
                              redirectToProfile(invitation?.freelancerId?._id)
                            }}>
                            View Profile
                          </ViewProfileButton>
                        </Grid2>
                        <span
                          id="total_likes"
                          style={{
                            color: 'gray',
                            fontFamily: 'Roboto',
                            fontSize: '12px',
                            fontStyle: 'normal',
                            fontWeight: 'normal',
                            lineHeight: '24.5px' /* 163.333% */,
                            letterSpacing: '0.4px',
                            marginTop: '50px'
                          }}>
                          {invitation?.freelancerId?.likeTotal || 0} UPVOTES BY CLIENTS
                        </span>
                      </ViewProfile>
                    </ProjectApplications>
                  ) : (
                    <ProjectDesktopCard
                      project={invitation?.businessId}
                      includeRate
                      freelancerId={invitation?.freelancerId?._id}
                    />
                  )}
                </span>
              )
            })
          ) : (
            <DefaultDisplay>
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
            </DefaultDisplay>
          )}
        </div>
      ) : (
        <MobileInvitesView projectDetails={projectDetails} invitesList={invitesList}></MobileInvitesView>
      )}
    </>
  )
}

const mapStateToProps = state => {
  return {
    invitesList: state?.Lists?.invitesList,
    userId: state?.Auth?.user?._id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getInvitesLists: bindActionCreators(getInvitesLists, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InvitesList)
