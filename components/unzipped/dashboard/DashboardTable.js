import React from 'react'
import styled from 'styled-components'
import { DarkText, Absolute, WhiteCard, Underline } from './style'
import { TableTitle } from './tableStyle'
import Button from '../../ui/Button'
import { ValidationUtils } from '../../../utils'
import CircularProgress from '@material-ui/core/CircularProgress'
import { useRouter } from 'next/router'
import { updateBusiness } from '../../../redux/Business/actions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import { TableHeading, TableData } from './style'

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14,
    margin: '0px 10px 0px 0px'
  }
}))(TableCell)

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover
    },
    margin: '0px 10px 0px 0px'
  }
}))(TableRow)

const useStyles = makeStyles({
  table: {
    minWidth: '1150px',
    borderRadius: '10px',
    border: '1px solid #D9D9D9',
    background: 'rgba(255, 255, 255, 0.36)'
  }
})

const Container = styled.div`
  position: relative;
  display: flex;
  border: 1px solid #d9d9d9;
  background: ${({ background }) => (background ? background : '#D9D9D9')};
  width: 77%;
  margin: auto;
  border-radius: 10px;
`

const Box = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
  min-height: 100px;
  justify-content: center;
  align-items: center;
`

const StoryTable = styled.div``
import Swal from 'sweetalert2'

const Panel = ({ type, businesses, loading, userType, updateBusiness }) => {
  const router = useRouter()
  const classes = useStyles()

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

  const generatePopout = (userType, item) => {
    if (userType === 0 || userType === 2) {
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
                    popout={generatePopout(userType, row)}
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

const mapDispatchToProps = dispatch => {
  return {
    updateBusiness: bindActionCreators(updateBusiness, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(Panel)
