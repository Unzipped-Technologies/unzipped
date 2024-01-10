import React from 'react'
import * as moment from 'moment'
import { MdFlag } from 'react-icons/md'
import { MdPerson } from 'react-icons/md'
import { MdCreditCard } from 'react-icons/md'
import { MdAccessTime } from 'react-icons/md'
import { MdLocationOn } from 'react-icons/md'
import styled, { css } from 'styled-components'
import { MdDesktopWindows } from 'react-icons/md'
import { MdMonetizationOn } from 'react-icons/md'

import Badge from '../../../ui/Badge'
import MobileFreelancerFooter from '../../MobileFreelancerFooter'

const MobileView = styled.div`
  width: 100%;
  flex-wrap: wrap;
  @media (min-width: 680px) {
    display: none;
  }
`

const ProjectDetail = styled.div`
  background: #fff;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 80px;
`

const ProjectBudget = styled.h3`
  color: #12151b;
  font-family: Roboto;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 24.5px; /* 136.111% */
  letter-spacing: 0.4px;
  margin-top: 10px;
`

const ProjectDescription = styled.p`
  color: #12151b;
  font-family: Roboto;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-align: justify;
`

const ProjectRequirements = styled.ul`
  margin-left: 10px;
  color: #12151b;
  font-family: Roboto;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  /* Use a more specific selector to override Materialize CSS */
  && li {
    list-style-type: disc !important;
  }
`

const SkillsRequired = styled.p`
  color: #12151b;
  color: #12151b;
  font-family: Roboto;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 23px; /* 115% */
  letter-spacing: 0.15px;
`

const ProjectID = styled.p`
  padding-top: 15px;
  color: #12151b;
  font-family: Roboto;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 24.5px; /* 188.462% */
  letter-spacing: 0.4px;
`

const AboutClient = styled.div`
  flex-shrink: 0;
  color: #123456;
  font-family: Roboto;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: 0.4px;
`

const AboutClientHeading = styled.h3`
  color: #123456;
  font-family: Roboto;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 24.5px; /* 122.5% */
  letter-spacing: 0.4px;
`

const ClientInfo = styled.div`
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  color: #123456;
  font-family: Roboto;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 24.5px; /* 122.5% */
  letter-spacing: 0.4px;
`

const ClientAddress = styled.div`
  display: flex;
  flex-direction: row;
  color: #123456;
  font-family: Roboto;
  font-size: 18px;
  font-weight: bold;
  line-height: 24.5px; /* 122.5% */
  letter-spacing: 0.4px;
  margin-top: 10px;
`

const VerificationHeading = styled.div`
  margin-top: 30px;
  color: #123456;
  font-family: Roboto;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 24.5px; /* 122.5% */
  letter-spacing: 0.4px;
`
const ClientVerificationDetail = styled.div`
  display: flex;
  flex-direction: row;
  color: #123456;
  font-size: 18px;
  line-height: 24.5px; /* 122.5% */
  letter-spacing: 0.4px;
  margin-top: 10px;
`

const ClientVerification = styled.div`
  padding-top: 0px;
  display: flex;
  flex-direction: column;
  color: #123456;
  font-family: Roboto;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 24.5px; /* 122.5% */
  letter-spacing: 0.4px;
`

const MobileProjectDetail = ({ projectDetails }) => {
  return (
    <MobileView>
      <ProjectDetail>
        <ProjectBudget>Budget: ${projectDetails?.budget || 0}</ProjectBudget>
        <ProjectDescription>{projectDetails?.challenge || 'N/A'}</ProjectDescription>
        <ProjectRequirements>
          {projectDetails?.objectives?.length
            ? projectDetails?.objectives?.map((objective, index) => <li key={`${objective}_${index}`}>{objective}</li>)
            : 'N/A'}
        </ProjectRequirements>
        <SkillsRequired>Skills Required</SkillsRequired>
        {projectDetails?.requiredSkills?.length
          ? projectDetails?.requiredSkills?.map((skill, index) => {
              return <Badge key={`${skill}_${index}`}>{skill}</Badge>
            })
          : 'N/A'}
        <ProjectID>Project ID: {projectDetails?._id || 'N / A'}</ProjectID>
        <AboutClient>
          <AboutClientHeading>About client</AboutClientHeading>
          <ClientInfo>
            <ClientAddress>
              <MdLocationOn style={{ marginTop: '4px', fontSize: '24px' }} />{' '}
              <span style={{ paddingLeft: '5px', paddingTop: '3px' }}>{projectDetails?.businessCity || 'N/A'}</span>
            </ClientAddress>
            <ClientAddress>
              <MdFlag style={{ marginTop: '4px', fontSize: '24px' }} />{' '}
              <span style={{ paddingLeft: '5px', paddingTop: '3px' }}>{projectDetails?.businessCountry || 'N/A'}</span>
            </ClientAddress>
            <ClientVerificationDetail>
              <MdPerson style={{ marginTop: '4px', fontSize: '24px' }} />{' '}
              <span style={{ paddingLeft: '5px', paddingTop: '5px' }}>{projectDetails?.likeTotal} upvotes</span>
            </ClientVerificationDetail>
            <ClientVerificationDetail>
              <MdAccessTime style={{ marginTop: '4px', fontSize: '24px' }} />{' '}
              <span style={{ paddingLeft: '5px', paddingTop: '3px' }}>
                Member since {moment(projectDetails?.userId?.createdAt).format('MMM DD, YYYY')}
              </span>
            </ClientVerificationDetail>
          </ClientInfo>

          <ClientVerification>
            <VerificationHeading>Client Verification</VerificationHeading>
            <ClientVerificationDetail>
              <MdCreditCard
                style={{
                  marginTop: '4px',
                  fontSize: '24px',
                  color: projectDetails?.userId?.isIdentityVerified ? '#8EDE64' : 'red'
                }}
              />{' '}
              <span style={{ paddingLeft: '5px', paddingTop: '3px' }}>Identity Verified</span>
            </ClientVerificationDetail>

            <ClientVerificationDetail>
              <MdMonetizationOn
                style={{
                  marginTop: '4px',
                  fontSize: '24px',
                  color: projectDetails?.userId?.stripeSubscription ? '#8EDE64' : 'red'
                }}
              />{' '}
              <span style={{ paddingLeft: '5px', paddingTop: '3px' }}>Payment Verified</span>
            </ClientVerificationDetail>

            <ClientVerificationDetail>
              <MdDesktopWindows style={{ marginTop: '4px', fontSize: '24px', color: '#8EDE64' }} />{' '}
              <span style={{ paddingLeft: '5px', paddingTop: '3px' }}>Completed 12 projects</span>
            </ClientVerificationDetail>
          </ClientVerification>
        </AboutClient>
      </ProjectDetail>

      <MobileFreelancerFooter />
    </MobileView>
  )
}
export default MobileProjectDetail
