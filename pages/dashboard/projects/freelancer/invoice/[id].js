import React, { useState, useEffect, useMemo } from 'react'
import styled, { css } from 'styled-components'
import { useRouter } from 'next/router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { DIV, TEXT } from '../../../../../components/unzipped/dashboard/style'

import { getBusinessById } from '../../../../../redux/actions'
import Nav from '../../../../../components/unzipped/header'
import ClientMobileInvoices from '../../../../../components/unzipped/dashboard/mobile/ClinetMobileInvoices'
import Timesheet from '../../../../../components/unzipped/dashboard/project/Timesheet'
import FreelancerInvites from '../../../../../components/unzipped/dashboard/FreelancerInvites'

import DesktopProjectDetail from '../../../../../components/unzipped/dashboard/DesktopProjectDetail'

const Desktop = styled.div`
  width: 80%;
  margin: auto;
  @media (max-width: 680px) {
    width: 100%;
  }
`
const MobileDisplayBox = styled.div`
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

const Header = styled.div`
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
const HeaderDetail = styled.div`
  justify-content: space-between;
  right: 0px;
  top: 10px;
  width: 100%;
  padding: 0px 0px 0px 15px;
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

const ProjectSubHeading = styled(TEXT)`
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
  margin-top: -40px;
  margin-bottom: -10px !important;
  margin-right: 10px;
`

const FounderInvoice = ({ projectDetails, getBusinessById }) => {
  const [selectedWeek, setSelectedWeek] = useState(null)
  const [weekOptions, setWeekOptions] = useState([])
  const [displayFormat, setDisplayFormat] = useState(false)

  const router = useRouter()
  const { id, freelancer, tab } = router.query

  const [selectedTab, setSelectedTab] = useState(0)

  const handleClick = index => setSelectedTab(index)

  let projectTabs = [
    { name: 'Details', index: 0 },
    { name: 'Invoices', index: 3 },
    { name: 'Invites', index: 4 }
  ]

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
              {(selectedTab === 3) & (window.innerWidth <= 680) ? (
                <Select
                  data-testid="timesheet_week_options"
                  onChange={e => {
                    handleWeekChange(e.target.value)
                  }}
                  value={selectedWeek}>
                  {weekOptions.map((week, index) => (
                    <option key={index} value={index} style={{ fontSize: '4px' }}>
                      Week of {week.startOfWeek.toDateString()} - {week.endOfWeek.toDateString()}
                    </option>
                  ))}
                </Select>
              ) : (
                ''
              )}
            </Header>
            {selectedTab !== 3 && (
              <ProjectSubHeading
                textColor="#444"
                fontSize="24px"
                fontWeight="400"
                lineHeight="24.5px"
                letterSpacing="0.4px"
                textTsransform="uppercase">
                {projectDetails?.name}
              </ProjectSubHeading>
            )}
          </HeaderDetail>
        </Title>
        <Tabs data-testid="desktop_project_detail_tabs">
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
      <DIV display="block" padding="0px 0px 50px 0px">
        {selectedTab === 0 && <DesktopProjectDetail projectDetails={projectDetails} />}
        {selectedTab === 3 && (
          <>
            {window.innerWidth > 680 ? (
              <Timesheet businessId={projectDetails?._id} displayFormat={displayFormat} freelancer={freelancer} />
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
        {selectedTab === 4 && <FreelancerInvites businessId={id} projectDetails={projectDetails} />}
      </DIV>
    </>
  )
}

const mapStateToProps = state => {
  return {
    projectDetails: state.Business.selectedBusiness
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getBusinessById: bindActionCreators(getBusinessById, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FounderInvoice)
