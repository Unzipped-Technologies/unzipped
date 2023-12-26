import React from 'react'
import styled from 'styled-components'
import CircularProgress from '@material-ui/core/CircularProgress'
import { useRouter } from 'next/router'
import { updateBusiness } from '../../../redux/Business/actions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Button from '../../ui/Button'
import Invoices from './mobile/Invoices'

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
  display: flex;
  margin-top: 10px;
  flex-direction: row;
  @media (max-width: 680px) {
    display: none;
  }
`

const Box = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
  min-height: 100px;
  justify-content: center;
  align-items: center;
`

const HiringTable = ({ data, loading, user }) => {
  const classes = useStyles()

  const menus = [
    {
      text: 'Approve Invoice',
      onClick: () => {}
    },
    {
      text: 'View Details',
      onClick: () => {}
    },
    {
      text: 'View Profile',
      onClick: () => {}
    },
    {
      text: 'Archive Invoice',
      onClick: () => {}
    }
  ]

  return (
    <>
      <Desktop>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="sticky table">
            <TableHead>
              <TableRow>
                <StyledTableCell class="muiTableHeader" align="left" style={{ padding: '0px 0px 0px 15px' }}>
                  Name
                </StyledTableCell>
                <StyledTableCell class="muiTableHeader" align="left">
                  Dates
                </StyledTableCell>
                <StyledTableCell class="muiTableHeader" align="left">
                  Hours
                </StyledTableCell>
                <StyledTableCell class="muiTableHeader" align="left">
                  Status
                </StyledTableCell>
                <StyledTableCell class="muiTableHeader" align="left">
                  Hire Date
                </StyledTableCell>
                <StyledTableCell class="muiTableHeader muiTableActionsHeading">ACTIONS</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.length === 0 && loading && (
                <Box>
                  <CircularProgress />
                </Box>
              )}
              {data?.length === 0 && <Box>Start a project and you will see it here...</Box>}
              {data?.length > 0 &&
                data?.map((row, index) => (
                  <StyledTableRow key={`${row.name}_${index}`}>
                    <StyledTableCell align="left">{row.name}</StyledTableCell>
                    <StyledTableCell align="left">{row.dates}</StyledTableCell>
                    <StyledTableCell align="left">{row.hours}</StyledTableCell>
                    <StyledTableCell align="left">{row.status}</StyledTableCell>
                    <StyledTableCell align="left">{row.hireDate}</StyledTableCell>
                    <StyledTableCell
                      align="inherit"
                      style={{
                        display: 'inline-block',
                        float: 'right'
                      }}>
                      <Button
                        icon="largeExpand"
                        popoutWidth="150px"
                        noBorder
                        block
                        type="lightgrey"
                        fontSize="13px"
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
      </Desktop>
      <Invoices />
    </>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    updateBusiness: bindActionCreators(updateBusiness, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(HiringTable)
