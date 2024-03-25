import React, { useState, useMemo, useEffect } from 'react'
import { connect } from 'react-redux'
import { useRouter } from 'next/router'
import { bindActionCreators } from 'redux'
import styled, { css } from 'styled-components'
import { getBusinessById } from '../../redux/Business/actions'
import { createProjectApplication } from '../../redux/ProjectApplications/actions'

import ProjectApplyForm from '../../components/unzipped/ProjectApplyForm'
import Nav from '../../components/unzipped/header'
import DesktopProjectDetail from '../../components/unzipped/dashboard/DesktopProjectDetail'

const Desktop = styled.div`
  width: 80%;
  margin: auto;
  @media (max-width: 680px) {
    width: 100%;
    margin: 0px !important;
  }
`

const Header = styled.header`
  display: flex;
  flex: 1;
  flex-direction: column;
  @media (max-width: 680px) {
    justify-content: center;
    width: 100%;
  }
`
const ProjectName = styled.div`
  color: #000;
  font-family: Roboto;
  font-size: 36px;
  font-style: normal;
  font-weight: 700;
  line-height: 40.5px; /* 68.056% */
  letter-spacing: 0.4px;
  text-transform: uppercase;
  @media (max-width: 680px) {
    display: none;
    font-weight: 300;
    font-size: 18px;
    line-height: 12.5px; /* 68.056% */
    width: 100%;
    justify-content: center;
    padding-left: 10px;
  }
`

const ProjectSubHeading = styled.div`
  padding: 10px 0px 10px 0px;
  color: #444;
  font-size: 24px;
  font-weight: 400;
  line-height: 24.5px; /* 102.083% */
  letter-spacing: 0.4px;
  text-transform: uppercase;
  @media (max-width: 680px) {
    font-size: 16px;
    padding: 15px 0px 0px 10px;
  }
`

const Tabs = styled.div`
  border-bottom: 1px solid #bcc5d3;
  margin-bottom: 1px;
  display: flex;
  @media (max-width: 680px) {
    display: none;
  }
`

const TabButton = styled.button`
  padding: 5px 5px 10px 0px;
  border: none;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  margin-right: 30px;
  font-family: Roboto;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 23px; /* 127.778% */
  letter-spacing: 0.15px;
  background: none !important;

  @media (max-width: 680px) {
    display: flex;
    color: #12151b;
    font-family: Roboto;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 23px; /* 164.286% */
    letter-spacing: 0.15px;
    margin-right: 0px;
    width: 100%;
    text-align: center;
    align-items: center;
    justify-content: center;
  }

  ${({ active }) =>
    active &&
    css`
      border-bottom: 4px solid #1772eb;
      color: #000;
      background: none !important;
      color: #1772eb;
    `};
  @media (max-width: 680px) {
    font-weight: 600;
  }
`

const TabContent = styled.div`
  display: block;
  padding-bottom: 50px;
`

const SubmitButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: ${({ margin }) => (margin ? margin : '0px')};
`

const SubmitButton = styled.button`
  color: #fff;
  text-align: center;
  font-family: Roboto;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 24.5px; /* 163.333% */
  letter-spacing: 0.4px;
  text-transform: uppercase;
  width: 184px;
  height: 27px;
  flex-shrink: 0;
  border-radius: 5px;
  background: #1976d2 !important;
  outline: none !important;
  border: none !important;
  ${({ active }) =>
    active &&
    css`
      outline: none !important;
      border: none !important;
    `};
`

const ProjectDetail = ({
  projectDetails,
  success,
  freelancerId,
  getBusinessById,
  createProjectApplication,
  role,
  loading
}) => {
  const [filterOpenClose, setFilterOpenClose] = useState(false)

  const router = useRouter()
  const { id } = router.query

  const [selectedTab, setSelectedTab] = useState(0)

  const handleClick = index => setSelectedTab(index)

  let projectTabs = [{ name: 'Details', index: 0 }]

  useEffect(() => {
    getBusinessById(id)
  }, [id])

  const applyToProject = async data => {
    await createProjectApplication({
      projectId: id,
      freelancerId: freelancerId,
      ...data
    })
  }

  useEffect(() => {
    if (success) router.push('/dashboard')
  }, [success])
  return (
    <>
      {!filterOpenClose && <Nav marginBottom={window.innerWidth >= 680 ? '100px' : '78px'} />}
      <Desktop>
        <Header>
          <ProjectName>PROJECT</ProjectName>
          <ProjectSubHeading>{projectDetails?.name}</ProjectSubHeading>
          {window.innerWidth >= 680 && !projectDetails?.applicants?.includes(freelancerId) && role === 1 && (
            <SubmitButtonContainer margin="0px 0px -30px 0px">
              <SubmitButton
                onClick={() => {
                  applyToProject()
                }}>
                SUBMIT APPLICATION
              </SubmitButton>
            </SubmitButtonContainer>
          )}
        </Header>
        <Tabs>
          {projectTabs.map((tab, index) => {
            return (
              <TabButton
                onClick={() => handleClick(tab.index)}
                active={selectedTab === tab.index}
                key={`${tab.name}_${index}`}>
                {tab.name}
              </TabButton>
            )
          })}
        </Tabs>
      </Desktop>
      <TabContent>
        {selectedTab === 0 && (
          <>
            <DesktopProjectDetail projectDetails={projectDetails} loading={loading} />
            {!projectDetails?.applicants?.includes(freelancerId) && role === 1 && (
              <ProjectApplyForm applyToProject={applyToProject} projectDetails={projectDetails} />
            )}
          </>
        )}
      </TabContent>{' '}
    </>
  )
}

const mapStateToProps = state => {
  return {
    projectDetails: state.Business.selectedBusiness,
    freelancerId: state?.Auth?.user?.freelancers,
    role: state?.Auth?.user?.role,
    success: state?.ProjectApplications?.success,
    loading: state.Loading.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getBusinessById: bindActionCreators(getBusinessById, dispatch),
    createProjectApplication: bindActionCreators(createProjectApplication, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetail)
