import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useRouter } from 'next/router'
import { bindActionCreators } from 'redux'
import styled, { css } from 'styled-components'
import Swal from 'sweetalert2'

import { ValidationUtils } from '../../../../utils'
import Button from '../../../../components/ui/Button'
import Nav from '../../../../components/unzipped/header'
import MobileSearchBar from '../../../../components/ui/MobileSearchBar'
import { updateBusiness, getProjectsList } from '../../../../redux/actions'
import MobileSearchFilter from '../../../../components/unzipped/MobileSearchFilter'
import { Absolute, TEXT, DIV } from '../../../../components/unzipped/dashboard/style'
import MobileFreelancerFooter from '../../../../components/unzipped/MobileFreelancerFooter'
import AllProjectHires from '../../../../components/unzipped/dashboard/mobile/AllProjectHires'
import AllProjectsInvoices from '../../../../components/unzipped/dashboard/mobile/AllProjectsInvoices'

const MobileDisplayBox = styled(DIV)`
  @media (min-width: 680px) {
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

const AllProjects = ({ businesses = [], getProjectsList, role, freelancerId, updateBusiness }) => {
  const router = useRouter()

  const [filter, setFilter] = useState({
    searchKey: '',
    budget: '',
    minRate: 0,
    maxRate: 0,
    skill: [],
    projectBudgetType: ''
  })
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
      skip: 0,
      filter
    })
  }, [filter])

  const handleFilterOpenClose = value => {
    setFilterOpenClose(value)
  }

  const archivedProject = async projectID => {
    await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, close it!'
    }).then(async result => {
      if (result.isConfirmed) {
        const response = await updateBusiness({ listId: projectID, isArchived: true })
        if (response?.status === 200) {
          Swal.fire({
            title: 'Closed!',
            text: `${response?.data?.msg ?? 'Project closed successfully'}`,
            icon: 'success'
          })
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${response?.data?.msg ?? 'Error archive the project.'}!`
          })
        }
      }
    })
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

  const setFilters = (field, value) => {
    setFilter(prevFilter => {
      const updatedFilter = { ...prevFilter }

      updatedFilter[field] = value

      return updatedFilter
    })
  }

  return (
    <MobileDisplayBox width="100%" background="#f4f4f4" boxShadow="0px 1px 2px 0px rgba(0, 0, 0, 0.25)">
      {!filterOpenClose && (
        <Nav
          isSubMenu
          searchValue={filter}
          handleSearchValue={setFilter}
          searchButton
          margin={'0px'}
          marginBottom={'78px'}
        />
      )}
      {filterOpenClose ? (
        <MobileSearchFilter handleFilterOpenClose={handleFilterOpenClose} filter={filter} setFilters={setFilters} />
      ) : (
        <>
          <DIV display="flex" flexWrap="wrap" flexDirection="row" flexFlow="column">
            <DIV
              width="100%"
              display="flex"
              justifyContent="space-around"
              gap="20px"
              borderBottom="1px solid #bcc5d3"
              margin="0px 0px 1px 10px">
              {projectTabs.map((tab, index) => {
                return (
                  <TabButton
                    data-testid={`${tab.name}_${index}`}
                    onClick={() => setSelectedTab(tab.index)}
                    active={selectedTab === index}
                    key={`${tab.name}_${index}`}>
                    {tab.name}
                  </TabButton>
                )
              })}
            </DIV>
            <DIV
              display="flex"
              flexWrap="wrap"
              flexDirection="column"
              width="100%"
              margin="0px 0px 50px 0px"
              flexFlow="column">
              {selectedTab === 0 && (
                <div>
                  {!filterOpenClose && (
                    <DIV height="50px" width="96%" margin="5px 0px 5px 2.5%">
                      <MobileSearchBar setFilters={setFilters} handleFilterOpenClose={handleFilterOpenClose} />
                    </DIV>
                  )}
                  <DIV display="flex" flexDirection="column" flexFlow="column" data-testid="all_projects">
                    {businesses?.map((business, index) => {
                      return (
                        <DIV
                          key={business._id}
                          borderRadius="4px"
                          background="#fff"
                          margin="0px 0px 5px 0px"
                          data-testid={business?._id}>
                          <TEXT
                            textColor="#000"
                            fontSize="16px"
                            fontWeight="600"
                            lineHeight="23px"
                            letterSpacing="0.15px"
                            padding="20px 0px 0px 18px">
                            {ValidationUtils.truncate(business?.name, 40)}
                          </TEXT>
                          <TEXT
                            textColor="#000"
                            fontFamily="Roboto"
                            fontSize="13px"
                            fontStyle="normal"
                            fontWeight="400"
                            lineHeight="23px"
                            letterSpacing="0.15px"
                            padding="0px 0px 0px 18px">
                            {(business?.deadline && ValidationUtils.formatDate(business?.deadline)) ||
                              ValidationUtils.formatDate(business?.updatedAt || business?.createdAt)}
                          </TEXT>
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
                        </DIV>
                      )
                    })}
                  </DIV>
                </div>
              )}
              {selectedTab === 1 && <AllProjectsInvoices />}
              {selectedTab === 2 && <AllProjectHires />}
            </DIV>
          </DIV>
          <MobileFreelancerFooter defaultSelected="Projects" />
        </>
      )}
    </MobileDisplayBox>
  )
}

const mapStateToProps = state => {
  return {
    businesses: state.Business?.projectList,
    role: state.Auth.user.role,
    freelancerId: state.Auth.user?.freelancers?._id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProjectsList: bindActionCreators(getProjectsList, dispatch),
    updateBusiness: bindActionCreators(updateBusiness, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProjects)
