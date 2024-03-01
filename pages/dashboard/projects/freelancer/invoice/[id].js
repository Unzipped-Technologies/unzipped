import React, { useState, useEffect, useMemo } from 'react'
import styled, { css } from 'styled-components'
import { useRouter } from 'next/router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { TitleText, DarkText } from '../../../../../components/unzipped/dashboard/style'

import { getBusinessById } from '../../../../../redux/actions'
import Nav from '../../../../../components/unzipped/header'
import Invoice from '../../../../../components/unzipped/dashboard/project/invoice'
import ClientMobileInvoices from '../../../../../components/unzipped/dashboard/mobile/ClinetMobileInvoices'
import Timesheet from '../../../../../components/unzipped/dashboard/project/Timesheet'

import ApplicationCard from '../../../../../components/unzipped/dashboard/ApplicationCard'
import HiringTable from '../../../../../components/unzipped/dashboard/HiresTable'
import DesktopProjectDetail from '../../../../../components/unzipped/dashboard/DesktopProjectDetail'

const Desktop = styled.div`
  width: 80%;
  margin: auto;
  @media (max-width: 680px) {
    display: none;
  }
`
const MobileDisplayBox = styled.div`
  margin-top: -40px;
  @media (min-width: 680px) {
    display: none;
  }
`

const Navbar = styled.div`
  margin-bottom: 160px;
  @media (max-width: 680px) {
    margin-bottom: 120px !important;
    margin-top: 0px !important;
    padding-bottom: 0px !important;
    padding-top: 0px !important;
  }
`

const Title = styled.div`
  display: flex;
  flex-flow: row;
  margin: 60px 0px 0px 0px;
`
const Toggle = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 260px;
  height: 34px;
  background-color: #d8d8d8;
  border-radius: 5px;
  overflow: hidden;
`
const Left = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding-top: 5px;
  height: 100%;
  width: 100%;
  background: ${({ displayFormat }) => (!displayFormat ? '#5E99D4' : 'transparent')};
`
const Right = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding-top: 5px;
  height: 100%;
  width: 100%;
  background: ${({ displayFormat }) => (displayFormat ? '#5E99D4' : 'transparent')};
`

const Header = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0px 10px 15px 0px;
  flex-wrap: wrap;
  @media (max-width: 680px) {
    justify-content: center;
    margin: 0px;
  }
`
const HeaderDetail = styled.header`
  justify-content: space-between;
  right: 0px;
  top: 10px;
  width: 100%;
  padding: 0px 0px 24px 15px;
  @media (max-width: 680px) {
    width: 100%;
    top: 0;
    padding-top: 0px !important;
  }
`

const ProjectName = styled.div`
  width: 70%;
  display: flex;
  flex-wrap: wrap;
  color: #000;
  font-family: Roboto;
  font-size: 36px;
  font-style: normal;
  font-weight: 700;
  line-height: 40.5px; /* 68.056% */
  letter-spacing: 0.4px;
  text-transform: uppercase;
  @media (max-width: 680px) {
    font-weight: 300;
    font-size: 18px;
    line-height: 12.5px; /* 68.056% */
    width: 100%;
    justify-content: center;
  }
`

const ProjectSubHeading = styled.p`
  color: #444;
  font-size: 24px;
  font-weight: 400;
  line-height: 24.5px; /* 102.083% */
  letter-spacing: 0.4px;
  text-transform: uppercase;
  @media (max-width: 680px) {
    display: none;
  }
`

const Tabs = styled.div`
  border-bottom: 1px solid #bcc5d3;
  margin-bottom: 1px;
  display: flex;
  @media (max-width: 680px) {
    justify-content: space-around;
    display: flex;
    overflow-x: auto;
    margin-left: 10px;
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

const Select = styled.select`
  display: block;
  border: 0;
  width: fit-content;
  background-color: transparent;
  color: #222;
  font-family: Roboto;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 19.5px; /* 121.875% */
  letter-spacing: 0.15px;
  margin-top: -20px;
  margin-bottom: -10px !important;
  margin-right: 10px;
`

const FounderInvoice = ({ projectDetails, getBusinessById, role }) => {
  const [selectedWeek, setSelectedWeek] = useState(null)
  const [weekOptions, setWeekOptions] = useState([])
  const [take, setTake] = useState('all')
  const [displayFormat, setDisplayFormat] = useState(false)

  const router = useRouter()
  const { id } = router.query
  const { tab } = router.query

  const [selectedTab, setSelectedTab] = useState(0)

  const handleClick = index => setSelectedTab(index)

  let projectTabs = []

  switch (role) {
    case 1:
      projectTabs = [
        { name: 'Details', index: 0 },
        { name: 'Invoices', index: 3 }
      ]
      break
    default:
      projectTabs = [
        { name: 'Details', index: 0 },
        { name: 'Applications', index: 1 },
        { name: 'Hires', index: 2 },
        { name: 'Invoices', index: 3 }
      ]
  }

  useEffect(() => {
    switch (tab) {
      case 'invoices':
        setSelectedTab(3)
        break
      default:
        setSelectedTab(0)
    }
  }, [])

  useEffect(() => {
    getBusinessById(id)
  }, [id])

  // In below useEffect options for week dropdown are creating.
  useEffect(() => {
    const options = []
    const currentDate = new Date()
    for (let i = 10; i >= 0; i--) {
      const startOfWeek = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() - currentDate.getDay() - i * 7
      )
      startOfWeek.setHours(0, 0, 0, 0)
      const endOfWeek = new Date(startOfWeek)
      endOfWeek.setDate(endOfWeek.getDate() + 6)
      endOfWeek.setHours(23, 59, 59, 999)
      options.unshift({ startOfWeek, endOfWeek })
    }
    setWeekOptions(options)
    setSelectedWeek(0)
  }, [])

  const handleWeekChange = value => {
    setSelectedWeek(value)
  }

  const handletake = value => {
    setTake(value)
  }

  const toggleDisplayFormat = () => {
    setDisplayFormat(!displayFormat)
  }

  return (
    <>
      <Navbar>
        <Nav isSubMenu />
      </Navbar>
      <Desktop>
        <Title>
          <HeaderDetail>
            <Header>
              <ProjectName>
                {selectedTab !== 3 ? (window.innerWidth <= 680 ? `${projectDetails?.name}` : 'PROJECT') : ''}
                {selectedTab === 3 && window.innerWidth > 680 ? 'Invoice History' : ''}
              </ProjectName>
            </Header>
            {selectedTab !== 3 && <ProjectSubHeading>{projectDetails?.name}</ProjectSubHeading>}
          </HeaderDetail>
          {selectedTab === 3 && role === 0 && (
            <Toggle>
              <Left displayFormat={displayFormat} onClick={toggleDisplayFormat}>
                <DarkText small>Day</DarkText>
              </Left>
              <Right displayFormat={displayFormat} onClick={toggleDisplayFormat}>
                <DarkText small>Week</DarkText>
              </Right>
            </Toggle>
          )}
        </Title>
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
        {selectedTab === 0 && <DesktopProjectDetail projectDetails={projectDetails} />}
        {selectedTab === 1 && <ApplicationCard includeRate clearSelectedFreelancer={() => {}} />}
        {selectedTab === 2 && <HiringTable />}
        {selectedTab === 3 && (
          <>
            {window.innerWidth > 680 ? (
              <Timesheet businessId={projectDetails?._id} displayFormat={displayFormat} />
            ) : (
              <MobileDisplayBox>
                <ClientMobileInvoices
                  weekOptions={weekOptions}
                  selectedWeek={selectedWeek}
                  handleWeekChange={handleWeekChange}
                />
              </MobileDisplayBox>
            )}
          </>
        )}
      </TabContent>
    </>
  )
}

const mapStateToProps = state => {
  return {
    projectDetails: state.Business.selectedBusiness,
    role: state.Auth.user.role
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getBusinessById: bindActionCreators(getBusinessById, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FounderInvoice)
