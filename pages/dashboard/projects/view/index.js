import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useRouter } from 'next/router'
import { bindActionCreators } from 'redux'
import styled, { css } from 'styled-components'

import Button from '../../../../components/ui/Button'
import Nav from '../../../../components/unzipped/header'
import { getBusinessList } from '../../../../redux/actions'
import MobileSearchBar from '../../../../components/ui/MobileSearchBar'
import { Absolute } from '../../../../components/unzipped/dashboard/style'
import MobileFreelancerFooter from '../../../../components/unzipped/MobileFreelancerFooter'

const MobileDisplayBox = styled.div`
  background: #f4f4f4;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.25);
  margin-bottom: 50px;
  @media (min-width: 680px) {
    display: none;
  }
`

const Header = styled.div`
  display: flex;
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
`

const Projects = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
`
const Tabs = styled.div`
  width: 100%;
  display: flex;
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
  width: 96%;
  height: 45px;
  margin: auto;
  margin-top: 5px;
  margin-bottom: 10px;
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

const AllProjects = ({ businesses = [], getBusinessList, role }) => {
  const router = useRouter()

  const [filter, setFilter] = useState('')
  const [selectedTab, setSelectedTab] = useState(0)
  const [filterOpenClose, setFilterOpenClose] = useState(false)

  const projectTabs = ['Open Projects', 'Invoices', 'Hires']

  useEffect(() => {
    getBusinessList({
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
          text: 'Invoice',
          onClick: () => router.push(`/dashboard/projects/client/invoice/${business._id}`)
        },
        {
          text: 'View details',
          onClick: () => router.push(`/dashboard/projects/details/${business._id}`)
        },
        {
          text: 'Close project',
          onClick: () => archivedProject(business._id)
        },
        {
          text: 'Assign department',
          onClick: () => console.log('ITEM 3')
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
      <Header></Header>
      <Projects>
        <Tabs>
          {projectTabs.map((tab, index) => {
            return (
              <TabButton onClick={() => setSelectedTab(index)} active={selectedTab === index} key={`${tab}_${index}`}>
                {tab}
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
                {businesses?.map(business => {
                  return (
                    <ProjectCard>
                      <ProjectName>{business?.name}</ProjectName>
                      <ProjectDate>10/26/2024</ProjectDate>
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
        </TabContent>
      </Projects>
      <MobileFreelancerFooter defaultSelected="Projects" />
    </MobileDisplayBox>
  )
}

const mapStateToProps = state => {
  return {
    businesses: state.Business?.businesses
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getBusinessList: bindActionCreators(getBusinessList, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProjects)
