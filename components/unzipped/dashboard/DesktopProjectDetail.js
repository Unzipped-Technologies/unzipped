import React, { useEffect, useState } from 'react'
import * as moment from 'moment'
import styled from 'styled-components'
import { MdFlag } from 'react-icons/md'
import { MdPerson } from 'react-icons/md'
import { MdAccessTime } from 'react-icons/md'
import { MdLocationOn } from 'react-icons/md'
import { MdCreditCard } from 'react-icons/md'
import { MdDesktopWindows } from 'react-icons/md'
import { MdMonetizationOn } from 'react-icons/md'
import Loading from '../../loading'
import Badge from '../../ui/Badge'
import MobileProjectDetail from './mobile/MobileProjectDetail'
import { TEXT, DIV } from './style'
import { Image } from '../../ui'
import { verifyUserStripeAccount, countClientContracts } from '../../../redux/actions'
import { useRouter } from 'next/router'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

const Desktop = styled(DIV)`
  min-width: 82%;
  margin-left: 9%;
  margin-right: 9%;
  display: flex;
  flex-direction: row;
  @media (max-width: 680px) {
    display: none;
  }
`

const ProjectDetail = styled(DIV)`
  position: relative;
  right: 0px;
  top: 10px;
  flex-shrink: 0;
  border-radius: 8px;
  border: 1px solid #f0f0f0;
  background: #fff;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.1);
  padding: 0px 24px 15px;
  margin: ${({ margin }) => (margin ? margin : '0px')};
`

const ProjectRequirements = styled.ul`
  margin-top: 10px;
  margin-left: 10px;

  /* Use a more specific selector to override Materialize CSS */
  && li {
    list-style-type: disc !important;
    font-weight: 400;
  }
`

const AboutClient = styled.div`
  position: relative;
  top: 10px;
  width: 28%;
  height: fit-content;
  flex-shrink: 0;
  left: 20px;
  border-radius: 8px;
  border: 1px solid #f0f0f0;
  background: rgba(255, 255, 255, 0.72);
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.1);
  padding: 20px;
  @media (max-width: 680px) {
    top: 0px;
    width: 750px;
    left: -5px;
  }
`

const DesktopProjectDetail = ({ projectDetails, loading, verifyUserStripeAccount, countClientContracts }) => {
  const router = useRouter()
  const { id } = router.query

  const [isClientPaymentVerified, setVerified] = useState(false)
  const [clientBusinessCount, setBusinessCount] = useState(0)

  useEffect(() => {
    async function fetchData() {
      if (projectDetails?.userId?._id && id === projectDetails?._id) {
        const userId = projectDetails?.userId?._id
        await checkPayentVerification(userId)
        await countBusiness(userId)
      }
    }
    fetchData()
  }, [projectDetails])

  const checkPayentVerification = async userId => {
    const response = await verifyUserStripeAccount(userId)
    if (response?.status === 200) {
      setVerified(true)
    }
  }
  const countBusiness = async userId => {
    setBusinessCount(0)
    const response = await countClientContracts(userId)
    if (response?.status === 200) {
      setBusinessCount(response?.data?.count ?? 0)
    }
  }
  return (
    <>
      {!loading ? (
        <>
          {projectDetails ? (
            <>
              <Desktop>
                <div style={{ width: '70%' }}>
                  <ProjectDetail>
                    <DIV display="flex" justifyContent="space-between" alignItems="center" padding="40px 10px 15px 7px">
                      <TEXT
                        fontSize="24px"
                        fontWeight="500"
                        lineHeight="23px"
                        textColor="#12151B
">
                        Project Hires
                      </TEXT>
                      <TEXT
                        fontSize="18px"
                        lineHeight="24.5px"
                        textColor="#12151B
"
                        style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        Budget: ${projectDetails?.budget || 0}
                      </TEXT>
                    </DIV>
                    <TEXT fontSize="20px" fontWeight="500" lineHeight="23px" textColor=" #12151B">
                      Project Length
                    </TEXT>
                    <TEXT
                      padding="10px 0px 0px 0px"
                      fontWeight="300"
                      fontSize="20px"
                      lineHeight="25.78px"
                      textColor="#12151B">
                      {projectDetails?.projectType || 'N/A'}
                    </TEXT>

                    <TEXT
                      margin="15px 0px 0px 0px"
                      fontSize="20px"
                      fontWeight="500"
                      lineHeight="23px"
                      textColor=" #12151B">
                      Description
                    </TEXT>
                    <TEXT
                      padding="10px 0px 0px 0px"
                      fontWeight="300"
                      fontSize="20px"
                      lineHeight="25.78px"
                      textColor="#12151B">
                      {projectDetails?.description || 'N/A'}
                    </TEXT>

                    <TEXT
                      margin="15px 0px 0px 0px"
                      fontSize="20px"
                      fontWeight="500"
                      lineHeight="23px"
                      textColor=" #12151B">
                      Requirements
                    </TEXT>
                    <ProjectRequirements>
                      {projectDetails?.objectives?.length ? (
                        projectDetails?.objectives?.map((objective, index) => (
                          <li key={`${objective}_${index}`}>
                            <TEXT fontWeight="300" fontSize="20px" lineHeight="25.78px" textColor="#444444">
                              {objective}
                            </TEXT>
                          </li>
                        ))
                      ) : (
                        <TEXT fontWeight="300" fontSize="20px" lineHeight="25.78px" textColor="#444444">
                          N/A
                        </TEXT>
                      )}
                    </ProjectRequirements>
                    <TEXT padding="10px 0px 10px 0px" fontSize="20px" lineHeight="23px" textColor=" #12151B">
                      Skills Required
                    </TEXT>
                    {projectDetails?.requiredSkills?.length
                      ? projectDetails?.requiredSkills?.map((skill, index) => {
                          return <Badge key={`${skill}_${index}`}>{skill}</Badge>
                        })
                      : 'N/A'}

                    <TEXT topPadding fontSize="13px" lineHeight="24.5px">
                      Project ID: {projectDetails?._id || 'N / A'}
                    </TEXT>
                  </ProjectDetail>
                  <ProjectDetail margin="10px 0px 0px 0px">
                    <TEXT
                      padding="20px 10px 10px 0px"
                      fontSize="24px"
                      fontWeight="500"
                      lineHeight="23px"
                      textColor="#12151B">
                      Project Goals
                    </TEXT>
                    <TEXT textAlign="justify" fontWeight="300" fontSize="20px" lineHeight="25.78px" textColor="#12151B">
                      {projectDetails?.goals || 'N/A'}
                    </TEXT>
                  </ProjectDetail>
                  <ProjectDetail margin="10px 0px 0px 0px">
                    <div style={{ borderBottom: '1px solid #BCC5D3', margin: '0px auto' }}>
                      <TEXT
                        padding="20px 0px 10px 0px"
                        fontSize="24px"
                        fontWeight="500"
                        lineHeight="23px"
                        textColor="#12151B">
                        Additional Details
                      </TEXT>
                    </div>

                    <TEXT padding="20px 0px 20px 0px" fontWeight="500" fontSize="20px" lineHeight="23.44px">
                      Budget
                    </TEXT>
                    <TEXT fontSize="20px" lineHeight="24.5px" fontWeight="300" textColor="#444444">
                      ${projectDetails?.budget || 0}{' '}
                      {projectDetails?.projectBudgetType === 'Hourly Rate' ? 'per Hour' : 'Fixed'}
                    </TEXT>

                    <TEXT padding="20px 0px 20px 0px" fontWeight="500" fontSize="20px" lineHeight="23.44px">
                      Project Image
                    </TEXT>
                    <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%', gap: '10px' }}>
                      {projectDetails && projectDetails?.projectImagesUrl?.length > 0 ? (
                        projectDetails.projectImagesUrl.map((item, index) => (
                          <Image
                            src={item.url}
                            alt="project image"
                            width={'100%'}
                            height={'150px'}
                            key={item?._id ?? index}
                          />
                        ))
                      ) : (
                        <TEXT fontWeight="300" fontSize="20px" lineHeight="25.78px" textColor="#444444">
                          N/A
                        </TEXT>
                      )}
                    </div>
                  </ProjectDetail>
                </div>
                <AboutClient>
                  <TEXT topMargin="20px" fontSize="20px" fontWeight="500" lineHeight="24.5px" textColor="#123456">
                    About client
                  </TEXT>
                  <DIV margin="15px 0px 15px 0px">
                    <DIV display="flex" flexDirection="column">
                      <MdLocationOn style={{ marginTop: '4px', fontSize: '24px' }} />{' '}
                      <TEXT
                        fontSize="20px"
                        lineHeight="24.5px"
                        textColor="#123456"
                        fontWeight="500"
                        padding="3px 0px 0px 5px">
                        {projectDetails?.businessCity || 'N/A'}
                      </TEXT>
                    </DIV>
                    <DIV display="flex" flexDirection="column" padding="10px 0px 0px 0px">
                      <MdFlag style={{ marginTop: '4px', fontSize: '24px' }} />{' '}
                      <TEXT
                        fontSize="20px"
                        lineHeight="24.5px"
                        textColor="#123456"
                        fontWeight="500"
                        padding="3px 0px 0px 5px">
                        {projectDetails?.businessCountry || 'N/A'}
                      </TEXT>
                    </DIV>
                    <DIV display="flex" flexDirection="column" padding="10px 0px 0px 0px">
                      <MdPerson style={{ marginTop: '4px', fontSize: '24px' }} />{' '}
                      <TEXT
                        fontWeight="300"
                        fontSize="20px"
                        lineHeight="24.5px"
                        textColor="#123456"
                        padding="3px 0px 0px 5px">
                        {projectDetails?.likeTotal || 0} upvotes
                      </TEXT>
                    </DIV>
                    <DIV display="flex" flexDirection="column" margin="10px 0px 0px 0px">
                      <MdAccessTime style={{ marginTop: '4px', fontSize: '24px' }} />{' '}
                      <TEXT
                        fontWeight="300"
                        fontSize="20px"
                        lineHeight="24.5px"
                        textColor="#123456"
                        padding="3px 0px 0px 5px">
                        Member since {moment(projectDetails?.userId?.createdAt).format('MMM DD, YYYY')}
                      </TEXT>
                    </DIV>
                  </DIV>

                  <DIV>
                    <TEXT
                      padding="20px 0px 0px 0px"
                      fontSize="20px"
                      fontWeight="500"
                      lineHeight="24.5px"
                      textColor="#123456">
                      Client Verification
                    </TEXT>
                    <DIV display="flex" flexDirection="column" padding="20px 0px 0px 0px">
                      <MdCreditCard
                        style={{
                          marginTop: '4px',
                          fontSize: '24px',
                          color: projectDetails?.userId?.isIdentityVerified === 'SUCCESS' ? '#8EDE64' : 'red'
                        }}
                      />{' '}
                      <TEXT
                        fontWeight="300"
                        fontSize="20px"
                        lineHeight="24.5px"
                        textColor="#123456"
                        padding="3px 0px 0px 5px">
                        Identity Verified
                      </TEXT>
                    </DIV>
                    <DIV display="flex" flexDirection="column" margin="10px 0px 0px 0px">
                      <MdMonetizationOn
                        style={{
                          marginTop: '4px',
                          fontSize: '24px',
                          color: isClientPaymentVerified ? '#8EDE64' : 'red'
                        }}
                      />{' '}
                      <TEXT
                        fontWeight="300"
                        fontSize="20px"
                        lineHeight="24.5px"
                        textColor="#123456"
                        padding="3px 0px 0px 5px">
                        Payment Verified
                      </TEXT>
                    </DIV>
                    <DIV display="flex" flexDirection="column" margin="10px 0px 0px 0px">
                      <MdDesktopWindows style={{ marginTop: '4px', fontSize: '24px', color: '#8EDE64' }} />{' '}
                      <TEXT
                        fontWeight="300"
                        fontSize="20px"
                        lineHeight="24.5px"
                        textColor="#123456"
                        padding="3px 0px 0px 5px">
                        Completed {clientBusinessCount ?? 0} projects
                      </TEXT>
                    </DIV>
                  </DIV>
                </AboutClient>
              </Desktop>
              <MobileProjectDetail
                projectDetails={projectDetails}
                isClientPaymentVerified={isClientPaymentVerified}
                clientBusinessCount={clientBusinessCount}
              />
            </>
          ) : (
            <h4 className="text-center mt-5">Project Not Found</h4>
          )}
        </>
      ) : (
        <Loading />
      )}
    </>
  )
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    verifyUserStripeAccount: bindActionCreators(verifyUserStripeAccount, dispatch),
    countClientContracts: bindActionCreators(countClientContracts, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DesktopProjectDetail)
