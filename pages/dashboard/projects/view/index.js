import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useRouter } from 'next/router'
import { bindActionCreators } from 'redux'
import styled, { css } from 'styled-components'

import { ValidationUtils } from '../../../../utils'
import Button from '../../../../components/ui/Button'
import Nav from '../../../../components/unzipped/header'
import { getProjectsList } from '../../../../redux/actions'
import MobileSearchBar from '../../../../components/ui/MobileSearchBar'
import { Absolute } from '../../../../components/unzipped/dashboard/style'
import MobileFreelancerFooter from '../../../../components/unzipped/MobileFreelancerFooter'
import AllProjectHires from '../../../../components/unzipped/dashboard/mobile/AllProjectHires'
import AllProjectsInvoices from '../../../../components/unzipped/dashboard/mobile/AllProjectsInvoices'

const MobileDisplayBox = styled.div`
  background: #f4f4f4;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.25);
  margin-bottom: 50px;
  @media (min-width: 680px) {
    display: none;
  }
`

const Projects = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
`
const Tabs = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  gap: 20px;
  border-bottom: 1px solid #bcc5d3;
  margin-bottom: 1px;
  margin-left: 10px;
`

const TabButton = styled.button`
  padding: 5px 5px 10px 0px;
  border: none;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  margin-right: 30px;
  font-family: Roboto;
  font-size: 14px;
  font-style: normal;
  font-weight: 800;
  line-height: 23px; /* 164.286% */
  letter-spacing: 0.15px;
  background: none !important;
  width: 100%;
  text-align: center;
  align-items: center;
  justify-content: center;
  ${({ active }) =>
    active &&
    css`
      border-bottom: 4px solid #1772eb;
      color: #000;
      background: none !important;
      color: #1772eb;
    `};
`
const TabContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  width: 100%;
  margin-bottom: 50px;
`

const SearchField = styled.div`
  height: 50px;
  width: 96%;
  margin-left: 2.5%;
  margin-top: 5px;
  margin-bottom: 5px;
`

const ProjectsList = styled.div`
  display: flex;
  flex-direction: column;
`

const ProjectCard = styled.div`
  border-radius: 4px;
  background: #fff;
  margin-bottom: 5px;
`

const ProjectName = styled.div`
  color: #000;
  font-family: Roboto;
  font-size: 16px;
  font-style: normal;
  font-weight: 800;
  line-height: 23px; /* 143.75% */
  letter-spacing: 0.15px;
  padding-top: 20px;
  padding-left: 18px;
`

const ProjectDate = styled.div`
  color: #000;
  font-family: Roboto;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 23px; /* 176.923% */
  letter-spacing: 0.15px;
  padding-left: 18px;
`

const AllProjects = ({ businesses = [], getProjectsList, role, freelancerId }) => {
  const router = useRouter()

  const [filter, setFilter] = useState('')
  const [selectedTab, setSelectedTab] = useState(0)
  const [filterOpenClose, setFilterOpenClose] = useState(false)

  let projectTabs = []

  switch (role) {
    case 1:
      projectTabs = [
        { name: 'Projects', index: 0 },
        { name: 'Invoices', index: 1 }
      ]
      break
    default:
      projectTabs = [
        { name: 'Open Projects', index: 0 },
        { name: 'Invoices', index: 1 },
        { name: 'Hires', index: 2 }
      ]
  }

  useEffect(() => {
    getProjectsList({
      take: 1000,
      skip: 0
    })
  }, [])

  const handleFilterOpenClose = value => {
    setFilterOpenClose(value)
  }

  const generatePopout = business => {
    if (role !== 1) {
      return [
        {
          text: 'View details',
          onClick: () => router.push(`/dashboard/projects/details/${business._id}`)
        },
        {
          text: 'Invoice',
          onClick: () => router.push(`/dashboard/projects/details/${business._id}?tab=invoices`)
        },
        {
          text: 'Assign department',
          onClick: () => console.log('ITEM 3')
        },
        {
          text: 'Close project',
          onClick: () => archivedProject(business._id)
        }
      ]
    } else {
      return [
        {
          text: 'Log Time',
          onClick: () => router.push(`projects/invoice/${business._id}`)
        },
        {
          text: 'View Project',
          onClick: () => router.push(`/dashboard/projects/details/${business._id}`)
        },
        {
          text: 'View Work',
          onClick: () => console.log('ITEM 3')
        },
        {
          text: 'View Invoice',
          onClick: () =>
            router.push(
              `/dashboard/projects/freelancer/invoice/${business._id}?tab=invoices&freelancer=${freelancerId}`
            )
        }
      ]
    }
  }

  return (
    <MobileDisplayBox>
      {!filterOpenClose && (
        <Nav
          isSubMenu
          searchValue={filter}
          handleSearchValue={setFilter}
          handleSearch={() => {}}
          searchButton
          margin={'0px'}
          marginBottom={'78px'}
        />
      )}
      <Projects>
        <Tabs>
          {projectTabs.map((tab, index) => {
            return (
              <TabButton
                onClick={() => setSelectedTab(tab.index)}
                active={selectedTab === index}
                key={`${tab.name}_${index}`}>
                {tab.name}
              </TabButton>
            )
          })}
        </Tabs>
        <TabContent>
          {selectedTab === 0 && (
            <div>
              {!filterOpenClose && (
                <SearchField>
                  <MobileSearchBar
                    handleSearch={() => {}}
                    filter={filter}
                    setFilter={setFilter}
                    handleFilterOpenClose={handleFilterOpenClose}
                  />
                </SearchField>
              )}
              <ProjectsList>
                {businesses?.map((business, index) => {
                  return (
                    <ProjectCard key={business._id}>
                      <ProjectName>{business?.name}</ProjectName>
                      <ProjectDate>
                        {(business?.deadline && ValidationUtils.formatDate(business?.deadline)) ||
                          ValidationUtils.formatDate(business?.updatedAt || business?.createdAt)}
                      </ProjectDate>
                      <Absolute
                        buttonHeight="33px"
                        position="none"
                        style={{
                          width: '90%',
                          border: '0.25px solid #000',
                          margin: '20px auto 20px auto',
                          background: 'rgba(217, 217, 217, 0.28)'
                        }}>
                        <Button
                          icon="largeExpand"
                          popoutWidth="324px"
                          noBorder
                          type="lightgrey"
                          fontSize="13px"
                          zIndex={'auto'}
                          popout={generatePopout(business)}
                          iconRight
                          colors={{
                            hover: 'none',
                            background: 'none'
                          }}
                          style={{
                            width: '324px'
                          }}>
                          Details
                        </Button>
                      </Absolute>
                    </ProjectCard>
                  )
                })}
              </ProjectsList>
            </div>
          )}
          {selectedTab === 1 && <AllProjectsInvoices />}
          {selectedTab === 2 && <AllProjectHires />}
        </TabContent>
      </Projects>
      <MobileFreelancerFooter defaultSelected="Projects" />
    </MobileDisplayBox>
  )
}

const mapStateToProps = state => {
  return {
    businesses: state.Business?.projectList,
    role: state.Auth.user.role,
    freelancerId: state.Auth.user?.freelancers
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProjectsList: bindActionCreators(getProjectsList, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProjects)
