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
  flex-shrink: 0;
  margin-top: 30px;
  border: none;
  background: #f0f0f0;
  padding: 5px 5px;
  border-radius: 5px;
  margin-bottom: 10px;
  color: #333;
  font-size: 14px;
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
        <div style={{ width: '80%', margin: 'auto', marginTop: '8px' }}>
          {projectApplications?.length
            ? projectApplications.map(application => {
                return (
                  <DIV
                    key={application._id}
                    data-testid={`${application._id}_application_card`}
                    id={`application_${application._id}`}
                    display="flex "
                    flexFlow="column"
                    justifyItems="space-around"
                    flexShrink="0"
                    background="rgba(240, 240, 240, 0)"
                    border="1px solid #d9d9d9"
                    boxShadow="0px 4px 6px rgba(0, 0, 0, 0.4)"
                    borderRadius="5px">
                    <DIV height="20px" display="flex" flexDirection="colummn" justifyContent="flex-end" margin="0px">
                      <VerticalDropdown freelancerId={application?.freelancerId?._id} />
                    </DIV>
                    <DIV
                      display="flex"
                      flexDirection="row"
                      justifyContent="space-around"
                      flexFlow="row"
                      alignItems="center"
                      margin="0px 20px"
                      width="100%">
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        {application?.freelancerId?.userId?.profileImage ? (
                          <Image
                            src={application?.freelancerId?.userId?.profileImage}
                            alt={`${
                              application?.freelancerId?.userId?.FirstName +
                              ' ' +
                              application?.freelancerId?.userId?.LastName
                            }`}
                            height="80px"
                            width="auto"
                            radius="50%"
                          />
                        ) : (
                          <div
                            data-testid="no_profile_image"
                            id="no_profile_image"
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
                      </div>
                      <DIV width="600px" margin="-40px 0px 0px 50px">
                        <div style={{ display: 'flex' }}>
                          <TEXT
                            textColor="#0057ff"
                            fontSize=" 16px"
                            fontWeight=" 500"
                            lineHeight=" 24.5px"
                            letterSpacing=" 0.4px"
                            margin="0px">
                            {ConverterUtils.capitalize(
                              `${application?.freelancerId?.userId?.FirstName} ${application?.freelancerId?.userId?.LastName}`
                            )}
                          </TEXT>
                          <div style={{ fontSize: '27px', color: '#37DEC5', marginTop: '-12px', marginLeft: '5px' }}>
                            <MdVerifiedUser />
                          </div>
                        </div>

                        <TEXT
                          textColor="gray"
                          fontSize=" 15px"
                          fontWeight=" 400"
                          lineHeight=" 24.5px"
                          letterSpacing=" 0.4px"
                          margin="0px">
                          {application?.freelancerId?.category}
                        </TEXT>
                        <TEXT
                          textColor="gray"
                          fontSize=" 14px"
                          font-style=" normal"
                          fontWeight=" 300"
                          lineHeight=" 24.5px"
                          letterSpacing=" 0.4px"
                          margin="0px">
                          {application?.freelancerId?.userId?.AddressLineCountry || 'N/A'}
                        </TEXT>
                        <TEXT
                          textColor="#0057ff"
                          fontSize="24px"
                          fontWeight="400"
                          lineHeight="24.5px"
                          letterSpacing="0.4px"
                          padding="5px 0px 0px 0px"
                          margin="10px 0px 0px 0px">
                          {application?.rate > 0 ? (
                            <span>
                              {`$${application?.rate}`}{' '}
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
                        justifyContent="flex-start"
                        data-testid={`${application._id}_application_skills`}>
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
                          {application?.freelancerId?.likeTotal > 10000
                            ? `10000+`
                            : application?.freelancerId?.likeTotal || 0}{' '}
                          UPVOTES BY CLIENTS
                        </span>
                        <ViewProfileButton
                          onClick={() => {
                            redirectToProfile(application?.freelancerId?._id)
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
                      data-testid={`${application._id}_application_skills`}>
                      {application?.freelancerId?.freelancerSkills?.length
                        ? application?.freelancerId?.freelancerSkills.map(skill => {
                            return (
                              <Badge color="blue" key={skill._id}>
                                {skill?.skill}
                              </Badge>
                            )
                          })
                        : 'N/A'}
                    </div>

                    <DIV padding="0px 10px 0px 30px" display="flex" width="100%">
                      <TEXT
                        textColor="#000"
                        fontSize="16px"
                        fontWeight="100"
                        lineHeight="21px"
                        letterSpacing="0.4px"
                        padding="0px 0px 0px 3px">
                        <b style={{ fontSize: '11px', fontWeight: '800', paddingRight: '5px', fontFamily: 'Roboto' }}>
                          Cover letter:
                        </b>

                        {ConverterUtils.truncateString(application?.coverLetter.toLowerCase(), 150)}
                        {application?.coverLetter?.length > 150 && (
                          <a style={{ textDecoration: 'underline' }}>Read More</a>
                        )}
                      </TEXT>
                    </DIV>
                  </DIV>
                )
              })
            : ''}

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
