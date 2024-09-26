import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { MdVerifiedUser } from 'react-icons/md'
import styled from 'styled-components'
import Button from '../../ui/Button'
import { useRouter } from 'next/router'

import { DIV, TEXT } from './style'
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
  border-radius: 5px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.4);
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
  font-size: 14px;
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
        <div
          data-testid="desktop_invites"
          style={{ width: '80%', margin: 'auto', marginTop: '8px', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.4)' }}>
          {invitesList?.length && invitesList[0]?.listEntries?.length ? (
            invitesList[0]?.listEntries.map(invitation => {
              return (
                <span key={invitation._id} data-testid={`${invitation?._id}_invite`}>
                  {role === 0 ? (
                    <DIV
                      display="flex"
                      flexFlow="column"
                      justifyItems="space-around"
                      flexShrink="0"
                      background="rgba(240, 240, 240, 0)"
                      border="1px solid #d9d9d9"
                      boxShadow="0px 4px 6px rgba(0, 0, 0, 0.4)"
                      borderRadius="5px">
                      <DIV
                        display="flex"
                        flexDirection="row"
                        justifyContent="space-around"
                        flexFlow="row"
                        alignItems="center"
                        margin="0px 20px"
                        width="100%">
                        <div>
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
                              data-testid="user_avatar"
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
                        </div>
                        <DIV width="600px" margin="20px 0px 0px 50px">
                          <div style={{ display: 'flex' }}>
                            <TEXT
                              textColor="#0057ff"
                              fontSize=" 16px"
                              fontWeight=" 500"
                              lineHeight=" 24.5px"
                              letterSpacing=" 0.4px"
                              margin="0px">
                              {ConverterUtils.capitalize(
                                `${invitation?.freelancerId?.userId?.FirstName} ${invitation?.freelancerId?.userId?.LastName}`
                              )}
                            </TEXT>
                            <div style={{ fontSize: '27px', color: '#37DEC5', marginTop: '-12px', marginLeft: '5px' }}>
                              <MdVerifiedUser />
                            </div>
                          </div>
                          <TEXT
                            id="category"
                            textColor="gray"
                            fontSize=" 15px"
                            fontWeight=" 400"
                            lineHeight=" 24.5px"
                            letterSpacing=" 0.4px"
                            margin="0px">
                            {invitation?.freelancerId?.category}
                          </TEXT>
                          <TEXT
                            textColor="gray"
                            fontSize=" 14px"
                            font-style=" normal"
                            fontWeight=" 300"
                            lineHeight=" 24.5px"
                            letterSpacing=" 0.4px"
                            margin="0px">
                            {invitation?.freelancerId?.userId?.AddressLineCountry || 'N/A'}{' '}
                          </TEXT>
                          <TEXT
                            textColor="#0057ff"
                            fontSize="24px"
                            fontWeight="400"
                            lineHeight="24.5px"
                            letterSpacing="0.4px"
                            padding="5px 0px 0px 0px"
                            margin="10px 0px 0px 0px">
                            {invitation?.freelancerId?.rate > 0 ? (
                              <span>
                                {`$${invitation?.freelancerId?.rate}`}{' '}
                                <span
                                  style={{
                                    fontWeight: '200',
                                    color: '#000',
                                    fontSize: '15px',
                                    fontWeight: '300',
                                    letterSpacing: '0.4px',
                                    marginTop: '-100px'
                                  }}>
                                  / hour
                                </span>
                              </span>
                            ) : (
                              <span
                                style={{
                                  color: '#000',
                                  fontSize: '15px'
                                }}>
                                Negotiable
                              </span>
                            )}
                          </TEXT>
                        </DIV>
                        <DIV
                          display="flex"
                          flexFlow="row"
                          margin="0px 20px 0px 0px"
                          alignItems="flex-start"
                          justifyContent="flex-start">
                          <span
                            style={{
                              color: ' #000',
                              fontFamily: 'Roboto',
                              fontSize: '14px',
                              fontStyle: 'normal',
                              fontWeight: '400',
                              lineHeight: '24.5px',
                              letterSpacing: '0.4px',
                              paddingRight: '50px',
                              color: 'gray'
                            }}>
                            {invitation?.freelancerId?.likeTotal > 10000
                              ? `10000+`
                              : invitation?.freelancerId?.likeTotal || 0}{' '}
                            UPVOTES BY CLIENTS
                          </span>
                          <ViewProfileButton
                            onClick={() => {
                              redirectToProfile(invitation?.freelancerId?._id)
                            }}>
                            View Profile
                          </ViewProfileButton>
                        </DIV>
                      </DIV>
                      <div
                        style={{
                          margin: '20px 0px 5px 25px'
                        }}
                        display="flex"
                        data-testid={`${invitation._id}_skills`}>
                        {invitation?.freelancerId?.freelancerSkills?.length
                          ? invitation?.freelancerId?.freelancerSkills.map(skill => {
                              return (
                                <Badge color="blue" key={skill._id}>
                                  {skill?.skill}
                                </Badge>
                              )
                            })
                          : 'N/A'}
                      </div>
                    </DIV>
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
            <DIV display="flex" justifyContent="center" alignItems="end" padding="15px 0px 0px 0px">
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
            </DIV>
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
