import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useRouter } from 'next/router'
import { bindActionCreators } from 'redux'
import { MdVerifiedUser } from 'react-icons/md'
import styled, { css } from 'styled-components'
import Button from '../../ui/Button'

import Image from '../../ui/Image'
import Badge from '../../ui/Badge'
import { ConverterUtils } from '../../../utils'
import { getProjectApplications, getFreelancerById } from '../../../redux/actions'
import MobileApplicationCard from './mobile/MobileApplicationsView'
import VerticalDropdown from '../../VerticalDropdown'

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

const CoverLetter = styled.span`
  color: #000;
  font-size: 13px;
  font-weight: 100;
  line-height: 21px; /* 161.538% */
  letter-spacing: 0.4px;
  padding-left: 3px;
  padding-bottom: 15px;
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

const ApplicationCard = ({ projectApplications, getProjectApplications, getFreelancerById, token }) => {
  const router = useRouter()
  const { id } = router.query

  const redirectToProfile = freelancerId => {
    if (freelancerId) {
      router.push(`/freelancers/${freelancerId}`)
    }
  }

  useEffect(() => {
    // Below we are only sending pagination data, Other data we are using from redux store.
    getProjectApplications({
      projectId: id,
      limit: 'all',
      page: 1
    })
  }, [])

  return (
    <>
      <DesktopContainer>
        {projectApplications?.length ? (
          projectApplications.map(application => {
            return (
              <ProjectApplications key={application._id}>
                <ProfileImage>
                  {application?.freelancerId?.userId?.profileImage ? (
                    <Image
                      src={application?.freelancerId?.userId?.profileImage}
                      alt={
                        application?.freelancerId?.userId?.FirstName + application?.freelancerId?.userId?.LastName ||
                        application._id
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
                      {application?.freelancerId?.userId?.FirstName[0] ||
                        application?.freelancerId?.userId?.LastName[0]}
                    </div>
                  )}

                  <InviteButton>Invited</InviteButton>
                </ProfileImage>
                <UserInfo>
                  <div style={{ display: 'flex' }}>
                    <UserName>
                      {ConverterUtils.capitalize(
                        `${application?.freelancerId?.userId?.FirstName} ${application?.freelancerId?.userId?.LastName}`
                      )}
                    </UserName>
                    <div style={{ fontSize: '27px', color: '#37DEC5', marginTop: '-12px', marginLeft: '5px' }}>
                      <MdVerifiedUser />
                    </div>
                  </div>

                  <UserCategory>{application?.freelancerId?.category}</UserCategory>
                  <UserCountry>{application?.freelancerId?.userId?.AddressLineCountry || 'N/A'}</UserCountry>
                  <UserRate>
                    {application?.rate > 0 ? (
                      <div>
                        {`${application?.rate}`}{' '}
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
                    {application?.freelancerId?.freelancerSkills?.length
                      ? application?.freelancerId?.freelancerSkills.map(skill => {
                          return <Badge key={skill._id}>{skill?.skill}</Badge>
                        })
                      : 'N/A'}
                  </Skills>
                  <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                    <p>
                      <b style={{ fontSize: '11px' }}>cover letter:</b>
                      <CoverLetter>
                        {ConverterUtils.truncateString(application?.coverLetter, 150)}
                        {application?.coverLetter?.length > 150 && (
                          <a style={{ textDecoration: 'underline' }}>Read More</a>
                        )}
                      </CoverLetter>
                    </p>
                  </div>
                </UserInfo>
                <ViewProfile>
                  <Grid2>
                    <ViewProfileButton
                      onClick={() => {
                        redirectToProfile(application?.freelancerId?._id)
                      }}>
                      View Profile
                    </ViewProfileButton>
                    <VerticalDropdown
                      dropdownOptions={[
                        {
                          name: 'Hire User',
                          action: () => {
                            getFreelancerById(application?.freelancerId?._id, token)
                            router.push(`/hire`)
                          }
                        },
                        {
                          name: 'View Application',
                          action: () => {}
                        },
                        {
                          name: 'Dismiss Application',
                          action: () => {}
                        }
                      ]}
                    />
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
                    {application?.freelancerId?.likeTotal || 0} UPVOTES BY CLIENTS
                  </span>
                </ViewProfile>
              </ProjectApplications>
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
                router.push(`/freelancers?proejct=${id}`)
              }}>
              Invite Freelancer
            </Button>
            {/* <p>When someone applies to this project, it will display here!</p> */}
          </DefaultDisplay>
        )}
      </DesktopContainer>
      <MobileApplicationCard projectApplications={projectApplications}></MobileApplicationCard>
    </>
  )
}

const mapStateToProps = state => {
  console.log(state)
  return {
    token: state.Auth.token,
    projectApplications: state.ProjectApplications.projectApplications
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProjectApplications: bindActionCreators(getProjectApplications, dispatch),
    getFreelancerById: bindActionCreators(getFreelancerById, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationCard)
