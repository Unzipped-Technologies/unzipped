import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useRouter } from 'next/router'
import { bindActionCreators } from 'redux'
import { MdVerifiedUser } from 'react-icons/md'
import styled, { css } from 'styled-components'
import Button from '../../ui/Button'

import Image from '../../ui/Image'
import Badge from '../../ui/Badge'
import { TEXT, DIV } from './style'
import { ConverterUtils } from '../../../utils'
import { getProjectApplications, getFreelancerById } from '../../../redux/actions'
import MobileApplicationCard from './mobile/MobileApplicationsView'
import VerticalDropdown from '../../VerticalDropdown'

const InviteButton = styled.button`
  width: 77px;
  height: 33px;
  flex-shrink: 0;
  margin-top: 30px;
  border: none;
  background: #d9d9d9 !important;
`

const ViewProfileButton = styled.button`
  width: 131px;
  height: 35px;
  flex-shrink: 0;
  border-radius: 16px;
  border: 1px solid rgba(196, 196, 196, 0);
  background: #8ede64;
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
    async function fetchData() {
      getProjectApplications({
        projectId: id,
        limit: 'all',
        page: 1
      })
    }
    fetchData()
  }, [])

  return (
    <>
      {window?.innerWidth > 680 ? (
        <div>
          {projectApplications?.length
            ? projectApplications.map(application => {
                return (
                  <DIV
                    key={application._id}
                    data-testid={`${application._id}_application_card`}
                    display="flex"
                    flexFlow="row"
                    justifyItems="space-around"
                    flexShrink="0"
                    background="rgba(240, 240, 240, 0)"
                    height="auto"
                    width="984px"
                    margin="10px 0px 0px 150px"
                    borderRadius="5px"
                    border="1px solid #d9d9d9">
                    <DIV display="flex" flexFlow="column" alignItems="center" margin="20px 20px" width="120px">
                      {application?.freelancerId?.userId?.profileImage ? (
                        <Image
                          src={application?.freelancerId?.userId?.profileImage}
                          alt={`${
                            application?.freelancerId?.userId?.FirstName +
                            ' ' +
                            application?.freelancerId?.userId?.LastName
                          }`}
                          height="102px"
                          width="102px"
                          radius="50%"
                        />
                      ) : (
                        <div
                          data-testid="no_profile_image"
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
                          {application?.freelancerId?.userId?.FirstName?.[0] ??
                            application?.freelancerId?.userId?.LastName?.[0]}
                        </div>
                      )}

                      <InviteButton>Invited</InviteButton>
                    </DIV>
                    <DIV display="flex" flexFlow="column" width="600px" margin="20px 0px 0px 10px">
                      <div style={{ display: 'flex' }}>
                        <TEXT
                          textColor="#0057ff"
                          fontSize=" 16px"
                          fontWeight=" 500"
                          lineHeight=" 24.5px" /* 153.125% */
                          letterSpacing=" 0.4px">
                          {ConverterUtils.capitalize(
                            `${application?.freelancerId?.userId?.FirstName} ${application?.freelancerId?.userId?.LastName}`
                          )}
                        </TEXT>
                        <div style={{ fontSize: '27px', color: '#37DEC5', marginTop: '-12px', marginLeft: '5px' }}>
                          <MdVerifiedUser />
                        </div>
                      </div>

                      <TEXT
                        textColor=" #000"
                        fontSize=" 15px"
                        fontWeight=" 400"
                        lineHeight=" 24.5px" /* 163.333% */
                        letterSpacing=" 0.4px">
                        {application?.freelancerId?.category}
                      </TEXT>
                      <TEXT
                        textColor=" #000"
                        fontSize=" 14px"
                        font-style=" normal"
                        fontWeight=" 300"
                        lineHeight=" 24.5px" /* 175% */
                        letterSpacing=" 0.4px">
                        {application?.freelancerId?.userId?.AddressLineCountry || 'N/A'}
                      </TEXT>
                      <TEXT
                        textColor="#000"
                        fontSize="24px"
                        fontWeight="300"
                        lineHeight="24.5px" /* 175% */
                        letterSpacing="0.4px"
                        padding="5px 0px 0px 0px">
                        {application?.rate > 0 ? (
                          <span>
                            {`$${application?.rate}`}{' '}
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
                      <DIV margin="10px 0px 5px 0px" data-testid={`${application._id}_application_skills`}>
                        {application?.freelancerId?.freelancerSkills?.length
                          ? application?.freelancerId?.freelancerSkills.map(skill => {
                              return <Badge key={skill._id}>{skill?.skill}</Badge>
                            })
                          : 'N/A'}
                      </DIV>
                      <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                        <TEXT
                          textColor="#000"
                          fontSize="13px"
                          fontWeight="100"
                          lineHeight="21px" /* 175% */
                          letterSpacing="0.4px"
                          padding="0px 0px 15px 3px">
                          <b style={{ fontSize: '11px', fontWeight: '800', paddingRight: '5px' }}>cover letter:</b>

                          {ConverterUtils.truncateString(application?.coverLetter, 150)}
                          {application?.coverLetter?.length > 150 && (
                            <a style={{ textDecoration: 'underline' }}>Read More</a>
                          )}
                        </TEXT>
                      </div>
                    </DIV>
                    <DIV
                      display="flex"
                      flexFlow="column"
                      margin="20px 10px 0px 0px"
                      alignItems="flex-end" /* Align items at the end of the column */
                    >
                      <DIV display="flex" alignItems="center">
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
                      </DIV>
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
                    </DIV>
                  </DIV>
                )
              })
            : ''}
          <DIV display="flex" justifyContent="center" alignItems="center" padding="30px 0px 0px 0px">
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
                router.push(`/freelancers?project=${id}`)
              }}>
              Invite Freelancer
            </Button>
          </DIV>
        </div>
      ) : (
        <MobileApplicationCard projectApplications={projectApplications}></MobileApplicationCard>
      )}
    </>
  )
}

const mapStateToProps = state => {
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
