import React, { useEffect } from 'react'
import Swal from 'sweetalert2'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { bindActionCreators } from 'redux'

import Button from '../../ui/Button'
import { ValidationUtils } from '../../../utils'
import { TableHeading, TableData } from './style'
import { updateBusiness, getProjectsList } from '../../../redux/Business/actions'

const Container = styled.div`
  position: relative;
  display: flex;
  border: 1px solid #d9d9d9;
  background: ${({ background }) => (background ? background : '#D9D9D9')};
  width: 77%;
  margin: auto;
  border-radius: 10px;
`

const DashboardTable = ({ businesses = [], getProjectsList, updateBusiness, role, limit, page }) => {
  const router = useRouter()

  useEffect(async () => {
    // Below we are only sending pagination data, Other data we are using from redux store.
    await getProjectsList({
      limit: limit,
      skip: (page - 1) * 25
    })
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
        const response = await updateBusiness({ listId: projectID, isArchived: true })
        if (response?.status === 200) {
          Swal.fire({
            title: 'Closed!',
            text: `${response?.data?.msg || 'Project closed successfully'}`,
            icon: 'success'
          })
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${response?.data?.msg || 'Error archive the project.'}!`
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
          onClick: () => router.push(`projects/client/invoice/${item._id}`)
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
        }
      ]
    }
  }

  return (
    <Container background={'#FDFDFD'}>
      <table>
        <thead>
          <tr style={{}}>
            <TableHeading>Project Name</TableHeading>
            <TableHeading>Budget</TableHeading>
            <TableHeading>Equity</TableHeading>
            <TableHeading>Points</TableHeading>
            <TableHeading>Value Estimate</TableHeading>
            <TableHeading>Deadline</TableHeading>
            <TableHeading>ACTIONS</TableHeading>
          </tr>
        </thead>
        <tbody>
          {businesses?.length > 0 &&
            businesses?.map(row => (
              <tr key={row._id}>
                <TableData>{row.name}</TableData>
                <TableData>{row.budget || 0}</TableData>
                <TableData>{row.equity || 0}</TableData>
                <TableData>27</TableData>
                <TableData>{row.valueEstimate || 'N/A'}</TableData>
                <TableData>
                  {(row?.deadline && ValidationUtils.formatDate(row?.deadline)) ||
                    ValidationUtils.formatDate(row?.updatedAt || row?.createdAt)}
                </TableData>

                <TableData
                  textTransform="lowercase"
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    marginRight: '10px',
                    textTransform: 'lowercase'
                  }}>
                  <Button
                    icon="largeExpand"
                    popoutWidth="220px"
                    noBorder
                    noUppercase
                    block
                    type="lightgrey"
                    fontSize="16px"
                    dropDownRight="-104px"
                    background="red"
                    popout={generatePopout(role, row)}
                    style={{
                      borderRadius: '3px',
                      border: '0.25px solid #000',
                      background: 'rgba(217, 217, 217, 0.28)',
                      zIndex: 'auto'
                    }}
                    iconRight>
                    Details
                  </Button>
                </TableData>
              </tr>
            ))}
        </tbody>
      </table>
    </Container>
  )
}

const mapStateToProps = state => {
  return {
    businesses: state.Business?.projectList,
    loading: state.Business?.loading,
    role: state.Auth.user.role
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProjectsList: bindActionCreators(getProjectsList, dispatch),
    updateBusiness: bindActionCreators(updateBusiness, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardTable)
