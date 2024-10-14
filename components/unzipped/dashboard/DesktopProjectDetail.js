import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { MdFlag } from 'react-icons/md'
import { MdPerson } from 'react-icons/md'
import { bindActionCreators } from 'redux'
import { MdAccessTime } from 'react-icons/md'
import { MdLocationOn } from 'react-icons/md'
import { MdCreditCard } from 'react-icons/md'
import { MdDesktopWindows } from 'react-icons/md'
import { MdMonetizationOn } from 'react-icons/md'
import { useRouter } from 'next/router'

import { Image } from '../../ui'
import Badge from '../../ui/Badge'
import Loading from '../../loading'
import { TEXT, DIV } from './style'
import { ConverterUtils } from '../../../utils'
import MobileProjectDetail from './mobile/MobileProjectDetail'
import { verifyUserStripeAccount, countClientContracts } from '../../../redux/actions'

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
  width: 26%;
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
      if (projectDetails?.userId?._id) {
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
    } else {
      setVerified(false)
    }
  }
  const countBusiness = async userId => {
    setBusinessCount(0)
    const response = await countClientContracts(userId)
    if (response?.status === 200) {
      setBusinessCount(response?.data?.count ?? 0)
    } else {
      setBusinessCount(0)
    }
  }
  return (
    <>
      {!loading ? (
        <>
          {projectDetails ? (
            <>
              {window?.innerWidth > 680 ? (
                <Desktop data-testid="desktop_project_detail">
                  <div style={{ width: '70%' }}>
                    <ProjectDetail>
                      <DIV
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        padding="10px 10px 15px 0px">
                        <TEXT

                          fontSize="18px"
                          fontWeight="bolder"
                          lineHeight="23px"
                          textColor="#12151B"
                        >
                          Project Hires
                        </TEXT>
                        <TEXT
                          fontSize="18px"
                          lineHeight="24.5px"
                          textColor="#12151B
"
                          style={{ display: 'flex', justifyContent: 'flex-end' }}>
                          Budget: ${projectDetails?.budgetRange || 0}
                        </TEXT>
                      </DIV>
                      <TEXT fontSize="18px" lineHeight="23px" textColor=" #12151B" fontWeight="bolder">
                        Project Length
                      </TEXT>
                      <TEXT
                        padding="10px 0px 0px 0px"
                        fontWeight="200"
                        fontSize="18px"
                        lineHeight="25.78px"
                        textColor="#12151B">
                        {projectDetails?.projectType || 'N/A'}
                      </TEXT>

                      <TEXT
                        margin="15px 0px 0px 0px"
                        fontSize="18px"
                        fontWeight="bolder"
                        lineHeight="23px"
                        textColor=" #12151B">
                        Description
                      </TEXT>
                      <TEXT
                        padding="10px 0px 0px 0px"
                        fontWeight="200"
                        fontSize="18px"
                        lineHeight="25.78px"
                        textColor="#12151B">
                        {projectDetails?.description || 'N/A'}
                      </TEXT>

                      <TEXT
                        margin="15px 0px 0px 0px"
                        fontSize="18px"
                        fontWeight="bolder"
                        lineHeight="23px"
                        textColor=" #12151B">
                        Requirements
                      </TEXT>
                      <ProjectRequirements>
                        {projectDetails?.objectives?.length ? (
                          projectDetails?.objectives?.map((objective, index) => (
                            <li key={`${objective}_${index}`}>
                              <TEXT fontWeight="200" fontSize="18px" lineHeight="25.78px" textColor="#444444">
                                {objective}
                              </TEXT>
                            </li>
                          ))
                        ) : (
                          <TEXT fontWeight="200" fontSize="18px" lineHeight="25.78px" textColor="#444444">
                            N/A
                          </TEXT>
                        )}
                      </ProjectRequirements>
                      <TEXT padding="10px 0px 10px 0px" fontSize="18px" lineHeight="23px" textColor=" #12151B" fontWeight="bolder">
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
                      <div style={{ borderBottom: '1px solid #BCC5D3', margin: '0px auto' }}>
                        <TEXT
                          padding="20px 0px 10px 0px"
                          fontSize="20px"
                          fontWeight="bolder"
                          lineHeight="23px"
                          textColor="#12151B">
                          Project Goals
                        </TEXT>
                      </div>
                      <TEXT
                        textAlign="justify"
                        padding="20px 0px 20px 0px"
                        fontWeight="200"
                        fontSize="18px"
                        lineHeight="23.44px"
                        textColor="#12151B">
                        {projectDetails?.goals || 'N/A'}
                      </TEXT>
                    </ProjectDetail>
                    <ProjectDetail margin="10px 0px 0px 0px">
                      <div style={{ borderBottom: '1px solid #BCC5D3', margin: '0px auto' }}>
                        <TEXT
                          padding="20px 0px 10px 0px"
                          fontSize="20px"
                          fontWeight="bolder"
                          lineHeight="23px"
                          textColor="#12151B">
                          Additional Details
                        </TEXT>
                      </div>

                      <TEXT padding="20px 0px 20px 0px" fontWeight="bolder" fontSize="18px" lineHeight="23.44px">
                        Budget
                      </TEXT>
                      <TEXT fontSize="18px" lineHeight="24.5px" fontWeight="200" textColor="#444444">
                        ${projectDetails?.budgetRange || 0}{' '}
                        {projectDetails?.projectBudgetType === 'Hourly Rate' ? 'per Hour' : 'Fixed'}
                      </TEXT>

                      <TEXT padding="20px 0px 20px 0px" fontWeight="bolder" fontSize="18px" lineHeight="23.44px">
                        Project Image
                      </TEXT>
                      <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%', gap: '10px' }}>
                        {projectDetails && projectDetails?.projectImagesUrl?.length > 0 ? (
                          projectDetails.projectImagesUrl.map((item, index) => (
                            <Image
                              src={item.url}
                              id={item?._id}
                              alt="project image"
                              width={'100%'}
                              height={'150px'}
                              key={item?._id ?? index}
                            />
                          ))
                        ) : (
                          <TEXT fontWeight="200" fontSize="18px" lineHeight="25.78px" textColor="#444444">
                            N/A
                          </TEXT>
                        )}
                      </div>
                    </ProjectDetail>
                  </div>
                  <AboutClient data-testid="about_client_container">
                    <TEXT topMargin="18px" fontSize="18px" fontWeight="bolder" lineHeight="24.5px" textColor="#123456">
                      About client
                    </TEXT>
                    <DIV margin="15px 0px 15px 0px">
                      <DIV display="flex" flexDirection="column">
                        <MdLocationOn style={{ marginTop: '4px', fontSize: '24px' }} />{' '}
                        <TEXT
                          fontSize="18px"
                          lineHeight="24.5px"
                          textColor="#123456"
                          fontWeight="200"
                          padding="3px 0px 0px 5px">
                          {projectDetails?.businessCity || 'N/A'}
                        </TEXT>
                      </DIV>
                      <DIV display="flex" flexDirection="column" padding="10px 0px 0px 0px">
                        <MdFlag style={{ marginTop: '4px', fontSize: '24px' }} />{' '}
                        <TEXT
                          fontSize="18px"
                          lineHeight="24.5px"
                          textColor="#123456"
                          fontWeight="200"
                          padding="3px 0px 0px 5px">
                          {projectDetails?.businessCountry || 'N/A'}
                        </TEXT>
                      </DIV>
                      <DIV display="flex" flexDirection="column" padding="10px 0px 0px 0px">
                        <MdPerson style={{ marginTop: '4px', fontSize: '24px' }} />{' '}
                        <TEXT
                          fontWeight="200"
                          fontSize="18px"
                          lineHeight="24.5px"
                          textColor="#123456"
                          padding="3px 0px 0px 5px">
                          {projectDetails?.likeTotal || 0} upvotes
                        </TEXT>
                      </DIV>
                      <DIV display="flex" flexDirection="column" margin="10px 0px 0px 0px">
                        <MdAccessTime style={{ marginTop: '4px', fontSize: '24px' }} />{' '}
                        <TEXT
                          fontWeight="200"
                          fontSize="18px"
                          lineHeight="24.5px"
                          textColor="#123456"
                          padding="3px 0px 0px 5px">
                          Member since {ConverterUtils.toMonthDateYear(projectDetails?.userId?.createdAt)}
                        </TEXT>
                      </DIV>
                    </DIV>

                    <DIV>
                      <TEXT
                        padding="20px 0px 0px 0px"
                        fontSize="18px"
                        fontWeight="bolder"
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
                          fontWeight="200"
                          fontSize="18px"
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
                          fontWeight="200"
                          fontSize="18px"
                          lineHeight="24.5px"
                          textColor="#123456"
                          padding="3px 0px 0px 5px">
                          Payment Verified
                        </TEXT>
                      </DIV>
                      <DIV display="flex" flexDirection="column" margin="10px 0px 0px 0px">
                        <MdDesktopWindows style={{ marginTop: '4px', fontSize: '24px', color: '#8EDE64' }} />{' '}
                        <TEXT
                          fontWeight="200"
                          fontSize="18px"
                          lineHeight="24.5px"
                          textColor="#123456"
                          padding="3px 0px 0px 5px">
                          Completed {clientBusinessCount} projects
                        </TEXT>
                      </DIV>
                    </DIV>
                  </AboutClient>
                </Desktop>
              ) : (
                <MobileProjectDetail
                  projectDetails={projectDetails}
                  isClientPaymentVerified={isClientPaymentVerified}
                  clientBusinessCount={clientBusinessCount}
                />
              )}
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
