import { connect } from 'react-redux'
import styled, { css } from 'styled-components'
import { useRouter } from 'next/router'
import { bindActionCreators } from 'redux'
import React, { useState, useEffect, useMemo } from 'react'

import Nav from '../../../../components/unzipped/header'
import { getBusinessById } from '../../../../redux/actions'
import { accountTypeEnum } from '../../../../server/enum/accountTypeEnum'
import { DarkText } from '../../../../components/unzipped/dashboard/style'
import ApplicationCard from '../../../../components/unzipped/dashboard/ApplicationCard'
import HiringTable from '../../../../components/unzipped/dashboard/HiresTable'
import InvoicesTable from '../../../../components/unzipped/dashboard/InvoicesTable'
import DesktopProjectDetail from '../../../../components/unzipped/dashboard/DesktopProjectDetail'

const Navbar = styled.div`
  margin-bottom: 160px;
  @media (max-width: 680px) {
    margin-bottom: 100px;
  }
`

const Desktop = styled.div`
  width: 80%;
  margin: auto;
  @media (max-width: 680px) {
    width: 100%;
    margin: 0px;
  }
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
  padding: 0 24px 15px;
  @media (max-width: 680px) {
    width: 100%;
    top: 0;
    padding-top: 0px !important;
  }
`

const ProjectName = styled.div`
  color: #000;
  font-family: Roboto;
  font-size: 36px;
  font-style: normal;
  font-weight: 700;
  line-height: 24.5px; /* 68.056% */
  letter-spacing: 0.4px;
  text-transform: uppercase;
  @media (max-width: 680px) {
    font-weight: 300;
    font-size: 18px;
    line-height: 12.5px; /* 68.056% */
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
const Toggle = styled.div`
  justify-content: space-between;
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 260px;
  height: 34px;
  background-color: #d8d8d8;
  border-radius: 5px;
  @media (max-width: 680px) {
    display: none;
  }
`

const Left = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding-top: 15px;
  height: 34px;
  width: 120px;
  border-radius: 5px;
  background: ${({ displayFormat }) => (!displayFormat ? '#5E99D4' : 'transparent')};
`
const Right = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding-top: 15px;
  height: 34px;
  width: 140px;
  border-radius: 5px;
  background: ${({ displayFormat }) => (displayFormat ? '#5E99D4' : 'transparent')};
`

const ProjectInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction:row
  margin-bottom: 20px;
`

const Tabs = styled.div`
  border-bottom: 1px solid #bcc5d3;
  margin-bottom: 1px;
  display: flex;
  justify-content: space-around;
  @media (max-width: 680px) {
    display: flex;
    overflow-x: auto;
  }
`

const TabButton = styled.button`
  padding: 5px 5px 20px 15px;
  border: none;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  margin-right: 10px;
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
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

const ProjectDetails = ({ projectDetails, getBusinessById, role }) => {
  const projectTabs = ['Details', 'Applications', 'Hires', 'Invoices']
  const router = useRouter()
  const { id } = router.query

  const [selectedTab, setSelectedTab] = useState(0)

  const handleClick = index => setSelectedTab(index)

  const [displayFormat, setDisplayFormat] = useState(false)

  useMemo(() => {
    if (id !== undefined) {
      getBusinessById(id)
    }
  }, [id])

  const toggleDisplayFormat = () => {
    setDisplayFormat(!displayFormat)
  }

  return (
    <>
      <Navbar>
        <Nav isSubMenu marginBottom={'100px'} />
      </Navbar>
      <Desktop>
        <HeaderDetail>
          <Header>
            <ProjectName>{selectedTab === 3 ? 'Invoice History' : `${projectDetails?.name}`}</ProjectName>
            <Toggle>
              <Left displayFormat={displayFormat} onClick={toggleDisplayFormat}>
                <DarkText small>{selectedTab === 0 ? 'As Client' : 'As Founder'}</DarkText>
              </Left>
              <Right displayFormat={displayFormat} onClick={toggleDisplayFormat}>
                <DarkText small>{selectedTab === 0 ? 'As Freelancer' : 'As Investor'}</DarkText>
              </Right>
            </Toggle>
          </Header>
          {selectedTab !== 3 && <ProjectSubHeading>{projectDetails?.businessNiche}</ProjectSubHeading>}
        </HeaderDetail>

        <Tabs>
          {projectTabs.map((tab, index) => {
            return (
              <TabButton onClick={() => handleClick(index)} active={selectedTab === index} key={`${tab}_${index}`}>
                {tab}
              </TabButton>
            )
          })}
        </Tabs>
      </Desktop>

      <TabContent>
        {selectedTab === 0 && <DesktopProjectDetail projectDetails={projectDetails} />}
        {selectedTab === 1 && (
          <ApplicationCard
            user={{
              id: '1',
              name: `Mathew Hadden`,
              type: 'Category',
              isPreferedFreelancer: true,
              country: 'United States',
              skills: ['MERN'],
              cover: `I have been a MERN stacl 'developer'} for over 2 years. schedule a meeting to check if I'm a good fit for your business.`,
              profilePic: 'https://res.cloudinary.com/dghsmwkfq/image/upload/v1670086178/dinosaur_xzmzq3.png',
              rate: '20',
              likes: 200
            }}
            includeRate
            clearSelectedFreelancer={() => {}}
          />
        )}
        {selectedTab === 2 && (
          <div style={{ marginTop: '10px' }}>
            <HiringTable
              data={[{ name: 'jason', rate: '10', points: '10', department: 'test', hireDate: '2012-12-12' }]}
            />
          </div>
        )}
        {selectedTab === 3 && (
          <div style={{ marginTop: '10px' }}>
            <InvoicesTable
              data={[
                {
                  name: 'jason',
                  dates: '2012-12-12 - 2012-12-12',
                  hours: 40,
                  status: 'Submitted',
                  hireDate: '2012-12-12'
                },
                {
                  name: 'jason',
                  dates: '2012-12-12 - 2012-12-12',
                  hours: 40,
                  status: 'Submitted',
                  hireDate: '2012-12-12'
                },
                {
                  name: 'jason',
                  dates: '2012-12-12 - 2012-12-12',
                  hours: 40,
                  status: 'Approved',
                  hireDate: '2012-12-12'
                },
                {
                  name: 'jason',
                  dates: '2012-12-12 - 2012-12-12',
                  hours: 40,
                  status: 'Archived',
                  hireDate: '2012-12-12'
                },
                {
                  name: 'jason',
                  dates: '2012-12-12 - 2012-12-12',
                  hours: 40,
                  status: 'Submitted',
                  hireDate: '2012-12-12'
                },
                {
                  name: 'jason',
                  dates: '2012-12-12 - 2012-12-12',
                  hours: 40,
                  status: 'Approved',
                  hireDate: '2012-12-12'
                },
                {
                  name: 'jason',
                  dates: '2012-12-12 - 2012-12-12',
                  hours: 40,
                  status: 'Approved',
                  hireDate: '2012-12-12'
                }
              ]}
            />
          </div>
        )}
      </TabContent>
      <TabContent active={selectedTab === 1}></TabContent>
    </>
  )
}

const mapStateToProps = state => {
  return {
    access_token: state.Auth.token,
    projectDetails: state.Business.selectedBusiness,
    role: state.Auth.user.role
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getBusinessById: bindActionCreators(getBusinessById, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetails)
