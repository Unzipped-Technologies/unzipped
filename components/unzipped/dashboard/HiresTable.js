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
import MobileProjectHires from './mobile/MobileProjectHires'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { withStyles, makeStyles } from '@material-ui/core/styles'

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
    }
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

const Desktop = styled.div`
  width: 80%;
  margin: auto;
  margin-top: 10px;
  @media (max-width: 680px) {
    display: none;
  }
`

const Container = styled.div`
  border: 1px solid #d9d9d9;
  background: ${({ background }) => (background ? background : '#D9D9D9')};
  border-radius: 10px;
  flex: 1;
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

const HiringTable = ({ data, loading, user }) => {
  const router = useRouter()
  const classes = useStyles()

  const menus = [
    {
      text: 'Revoke Access',
      onClick: () => {}
    },
    {
      text: 'View Profile',
      onClick: () => {}
    },
    {
      text: 'Assign Work',
      onClick: () => {}
    },
    {
      text: 'View Invoices',
      onClick: () => {}
    },
    {
      text: 'Assign Department',
      onClick: () => {}
    }
  ]

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

  return (
    <>
      <Desktop>
        <Container background={'#FDFDFD'}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <StyledTableCell class="muiTableHeader" style={{ padding: '0px 0px 0px 15px' }}>
                    Name
                  </StyledTableCell>
                  <StyledTableCell class="muiTableHeader" align="left">
                    RATE
                  </StyledTableCell>
                  <StyledTableCell class="muiTableHeader" align="left">
                    POINTS
                  </StyledTableCell>
                  <StyledTableCell class="muiTableHeader" align="left">
                    DEPARTMENT
                  </StyledTableCell>
                  <StyledTableCell class="muiTableHeader" align="left">
                    HIRE DATE
                  </StyledTableCell>
                  <StyledTableCell class="muiTableHeader muiTableActionsHeading">ACTIONS</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.length === 0 && <Box>Start a project and you will see it here...</Box>}
                {data?.length > 0 &&
                  data?.map((row, index) => (
                    <StyledTableRow key={`${row.name}_${index}`}>
                      <StyledTableCell align="left">{row.name}</StyledTableCell>
                      <StyledTableCell align="left">{row.rate || 0}</StyledTableCell>
                      <StyledTableCell align="left">{row.points || 0}</StyledTableCell>
                      <StyledTableCell align="left">{row.department || 'N/A'}</StyledTableCell>
                      <StyledTableCell align="left">{row.hireDate || 'N/A'}</StyledTableCell>
                      <StyledTableCell
                        align="inherit"
                        style={{
                          display: 'inline-block',
                          float: 'right',
                          marginRight: '20px'
                        }}>
                        <Button
                          icon="largeExpand"
                          popoutWidth="180px"
                          noBorder
                          block
                          type="lightgrey"
                          fontSize="12px"
                          popout={menus}
                          iconRight>
                          Details
                        </Button>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Desktop>
      <MobileProjectHires data={data} />
    </>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    updateBusiness: bindActionCreators(updateBusiness, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(HiringTable)
