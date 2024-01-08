import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import styled, { css } from 'styled-components'
import { accountTypeEnum } from '../../../../server/enum/accountTypeEnum'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { TitleText, DarkText, Absolute } from '../../../../components/unzipped/dashboard/style'
import MobileSearchBar from '../../../../components/ui/MobileSearchBar'
import Nav from '../../../../components/unzipped/header'
import Button from '../../../../components/ui/Button'
import MobileFreelancerFooter from '../../../../components/unzipped/MobileFreelancerFooter'

import { getBusinessList } from '../../../../redux/actions'
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

const Toggle = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 260px;
  height: 34px;
  background-color: #d8d8d8;
  border-radius: 5px;
  overflow: hidden;
  margin-top: 35px;
  justify-items: center; /* Center items horizontally */
  align-items: center;
  margin-bottom: 20px;
`

const Left = styled.div`
  text-align: center;
  padding-top: 10px;
  height: 100%;
  width: 100%;
  background: ${({ selected }) => (selected === accountTypeEnum.INVESTOR ? '#5E99D4' : 'transparent')};
`
const Right = styled.div`
  text-align: center;
  padding-top: 10px;
  height: 100%;
  width: 100%;
  background: ${({ selected }) =>
    selected === accountTypeEnum.FOUNDER || selected === accountTypeEnum.ADMIN ? '#5E99D4' : 'transparent'};
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

const AllProjects = ({ _id, token, cookie, businesses = [], getBusinessList, role, loading, access_token }) => {
  const access = token?.access_token || cookie
  const router = useRouter()

  const [selected, setSelected] = useState(null)

  const [take, setTake] = useState(3)
  const [page, setPage] = useState(1)
  const [selectedTab, setSelectedTab] = useState(0)
  const [filter, setFilter] = useState('')
  const [filterOpenClose, setFilterOpenClose] = useState(false)

  const projectTabs = ['Open Projects', 'Invoices', 'Hires']

  useEffect(() => {
    getBusinessList({
      take: take,
      skip: (page - 1) * 25
    })
  }, [])

  const toggleRole = () => {
    if (role === accountTypeEnum.ADMIN) {
      if (selected === accountTypeEnum.FOUNDER) {
        setSelected(accountTypeEnum.INVESTOR)
      } else {
        setSelected(accountTypeEnum.FOUNDER)
      }
    }
  }

  const handleFilterOpenClose = value => {
    setFilterOpenClose(value)
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
          marginBottom={'60px'}
        />
      )}
      <Header>
        {/* <Toggle>
          <Right selected={selected} onClick={toggleRole}>
            <DarkText small>AS CLIENT</DarkText>
          </Right>
          <Left selected={selected} onClick={toggleRole}>
            <DarkText small>AS FREELANCER</DarkText>
          </Left>
        </Toggle> */}
      </Header>
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
                          popout={[
                            {
                              text: 'View Details',
                              onClick: () => router.push(`details/${business._id}`)
                            },
                            {
                              text: 'Invoices',
                              onClick: () => {
                                router.push(`client/invoice/${business._id}`)
                              }
                            },
                            {
                              text: 'Assign Department',
                              onClick: () => {}
                            },
                            {
                              text: 'Close Project',
                              onClick: () => {}
                            }
                          ]}
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
    _id: state.Auth.user._id,
    access_token: state.Auth.token,
    businesses: state.Business?.businesses,
    loading: state.Business?.loading,
    role: state.Auth.user.role,
    cookie: state.Auth.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getBusinessList: bindActionCreators(getBusinessList, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProjects)
