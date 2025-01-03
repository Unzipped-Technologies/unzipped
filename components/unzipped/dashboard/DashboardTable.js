import React, { useEffect } from 'react'
import Swal from 'sweetalert2'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { bindActionCreators } from 'redux'
import Loading from '../../loading'

import Button from '../../ui/Button'
import { ValidationUtils } from '../../../utils'
import { TableHeading, TableData } from './style'
import { updateBusiness, getProjectsList } from '../../../redux/Business/actions'

const Container = styled.div`
  position: relative;
  display: flex;
  border: 1px solid #d9d9d9;
  background: #fdfdfd;
  width: 77%;
  margin: auto;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`

const DashboardTable = ({
  businesses = [],
  getProjectsList,
  updateBusiness,
  role,
  limit,
  page,
  freelancerId,
  loading
}) => {
  const router = useRouter()
  const filteredBusinesses = businesses.filter(business => !business.isArchived)
  
  useEffect(() => {
    // Below we are only sending pagination data, Other data we are using from redux store.
    const fetchData = async () => {
      await getProjectsList({
        limit: limit,
        skip: (page - 1) * 25
      })
    }

    fetchData()
  }, [limit, page])

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
        const formData = new FormData()
          formData.append(
            'projectDetails',
            JSON.stringify({
              listId: projectID,
              isArchived: true
            })
          )
        const response = await updateBusiness(formData)
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

  const generatePopout = (role, item) => {
    if (role === 0 || role === 2) {
      return [
        {
          text: 'Invoice',
          onClick: () => router.push(`projects/details/${item._id}?tab=invoices`)
        },
        {
          text: 'View details',
          onClick: () => router.push(`projects/details/${item._id}`)
        },
        {
          text: 'Close project',
          onClick: () => archivedProject(item._id)
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
          onClick: () => router.push(`projects/invoice/${item._id}`)
        },
        {
          text: 'View Project',
          onClick: () => router.push(`projects/details/${item._id}`)
        },
        {
          text: 'View Work',
          onClick: () => console.log('ITEM 3')
        },

        {
          text: 'VIEW INVOICE',
          onClick: () =>
            router.push(`/dashboard/projects/freelancer/invoice/${item._id}?tab=invoices&freelancer=${freelancerId}`)
        }
      ]
    }
  }

  return (
    <Container>
      {!loading ? (
        <table>
          <thead data-testid="dashboard_projects_table_header">
            <tr style={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
              <TableHeading textAlign="left" paddingLeft="25px" fontWeight="600" color="grey">
                Project Name
              </TableHeading>
              <TableHeading fontWeight="600" color="grey">
                Budget
              </TableHeading>
              <TableHeading fontWeight="600" color="grey">
                Points
              </TableHeading>
              <TableHeading fontWeight="600" color="grey">
                Value Estimate
              </TableHeading>
              <TableHeading fontWeight="600" color="grey">
                Deadline
              </TableHeading>
              <TableHeading fontWeight="600" color="grey">
                ACTIONS
              </TableHeading>
            </tr>
          </thead>
          {filteredBusinesses?.length > 0 && (
            <tbody data-testid="dashboard_projects_table_body">
              {filteredBusinesses?.map(row => (
                <tr key={row._id} data-testid={row?._id} id={row?._id}>
                  <TableData
                    fontSize="14px"
                    fontWeight="500"
                    color="grey"
                    paddingLeft="25px"
                    textTransform="capitalize"
                    $default
                    onClick={() => router.push(`projects/details/${row._id}`)}
                    textAlign="left">
                    {ValidationUtils.truncate(row.name, 40)}
                  </TableData>
                  <TableData fontSize="14px" color="grey">
                    {' '}
                    {row.budget || 0}{' '}
                  </TableData>
                  <TableData fontSize="14px" color="grey">
                    {' '}
                    27{' '}
                  </TableData>
                  <TableData fontSize="14px" color="grey">
                    {' '}
                    {row.valueEstimate || 'N/A'}{' '}
                  </TableData>
                  <TableData fontSize="14px" color="grey">
                    {(row?.deadline && ValidationUtils.formatDate(row?.deadline)) ||
                      ValidationUtils.formatDate(row?.updatedAt || row?.createdAt)}
                  </TableData>

                  <TableData
                    textTransform="lowercase"
                    style={{
                      display: 'flex',
                      justifyContent: 'center'
                    }}>
                    <Button
                      icon="largeExpand"
                      popoutWidth="220px"
                      noUppercase
                      block
                      type="lightgrey"
                      fontSize="16px"
                      dropDownRight="-104px"
                      popout={generatePopout(role, row)}
                      boxShadow="0px 4px 8px rgba(0, 0, 0, 0.2)"
                      colors={{
                        text: '#d3d3d3',
                        background: '#fff',
                        border: '1px',
                        wideBorder: '#d3d3d3'
                      }}
                      zIndex="auto"
                      style={{
                        color: 'grey',
                        borderRadius: '8px'
                      }}
                      iconRight>
                      Details
                    </Button>
                  </TableData>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      ) : (
        <Loading />
      )}
    </Container>
  )
}

const mapStateToProps = state => {
  return {
    businesses: state.Business?.projectList,
    loading: state.Business?.loading,
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

export default connect(mapStateToProps, mapDispatchToProps)(DashboardTable)
