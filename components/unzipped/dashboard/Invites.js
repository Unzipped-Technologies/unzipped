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

const DesktopContainer = styled.div`
  @media (max-width: 680px) {
    display: none;
  }
`

const ProjectApplications = styled.div`
  display: flex;
  flex-flow: row;
  justify-items: space-around;
  flex-shrink: 0;
  background: rgba(240, 240, 240, 0);
  height: auto;
  width: 984px;
  margin-left: 150px;
  border-radius: 5px;
  border: 1px solid #d9d9d9;
  margin-top: 10px;
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
  margin-top: 10px;
  margin-bottom: 5px;
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

const DefaultDisplay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 160px;
`

const InvitesList = ({ projectDetails, invitesList, getInvitesLists, userId, role }) => {
  const router = useRouter()

  const redirectToProfile = freelancerId => {
    if (freelancerId) {
      router.push(`/freelancers/${freelancerId}`)
    }
  }

  useEffect(() => {
    // Below we are only sending pagination data, Other data we are using from redux store.
    getInvitesLists({
      filter: {
        user: userId,
        name: 'Invites'
      },
      take: 1000
    })
  }, [])

  return (
    <>
      <DesktopContainer>
        {invitesList?.length && invitesList[0]?.listEntries?.length ? (
          invitesList[0]?.listEntries.map(invitation => {
            return (
              <>
                {role === 0 ? (
                  <ProjectApplications key={invitation._id}>
                    <ProfileImage>
                      {invitation?.freelancerId?.userId?.profileImage ? (
                        <Image
                          src={invitation?.freelancerId?.userId?.profileImage}
                          alt={
                            invitation?.freelancerId?.userId?.FirstName + invitation?.freelancerId?.userId?.LastName ||
                            invitation._id
                          }
                          height="102px"
                          width="102px"
                          radius="50%"
                        />
                      ) : (
                        <div
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
                          {invitation?.freelancerId?.userId?.FirstName[0] ||
                            invitation?.freelancerId?.userId?.LastName[0]}
                        </div>
                      )}
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
                      <UserRate>
                        {invitation?.freelancerId?.rate > 0 ? (
                          <div>
                            {`$${invitation?.freelancerId?.rate}`}{' '}
                            <span
                              style={{
                                fontWeight: '100',
                                color: '#000',
                                fontSize: '15px',
                                fontWeight: '300',
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
                      <Skills>
                        {invitation?.freelancerId?.freelancerSkills?.length
                          ? invitation?.freelancerId?.freelancerSkills.map(skill => {
                              return <Badge key={skill._id}>{skill?.skill}</Badge>
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
              </>
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
      </DesktopContainer>

      <MobileInvitesView projectDetails={projectDetails} invitesList={invitesList}></MobileInvitesView>
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
