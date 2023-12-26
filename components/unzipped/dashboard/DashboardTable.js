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
          onClick: () => console.log('ITEM 2')
        },
        {
          text: 'View Work',
          onClick: () => console.log('ITEM 3')
        }
      ]
    }
  }

  return (
    <Container background={type === 'department' ? '#FDFDFD' : ''}>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="sticky table">
          <TableHead className={classes.head}>
            <TableRow>
              <StyledTableCell class="muiTableHeader" align="left !important" style={{ padding: '0px 0px 0px 15px' }}>
                Project Name
              </StyledTableCell>
              <StyledTableCell class="muiTableHeader" align="left">
                Budget
              </StyledTableCell>
              <StyledTableCell class="muiTableHeader" align="left">
                Equity
              </StyledTableCell>
              <StyledTableCell class="muiTableHeader" align="left">
                Points
              </StyledTableCell>
              <StyledTableCell class="muiTableHeader" align="left">
                Value Estimate
              </StyledTableCell>
              <StyledTableCell class="muiTableHeader" align="left">
                Deadline
              </StyledTableCell>
              <StyledTableCell class="muiTableHeader" align="center">
                ACTIONS
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {businesses?.length === 0 && <Box>Start a project and you will see it here...</Box>}
            {businesses?.length > 0 &&
              businesses?.map((row, index) => (
                <StyledTableRow key={`${row.name}_${index}`}>
                  <StyledTableCell align="left">{row.name}</StyledTableCell>
                  <StyledTableCell align="left">{row.budget || 0}</StyledTableCell>
                  <StyledTableCell align="left">{row.equity || 0}</StyledTableCell>
                  <StyledTableCell align="left">27</StyledTableCell>
                  <StyledTableCell align="left">{row.valueEstimate || 'N/A'}</StyledTableCell>
                  <StyledTableCell align="left">
                    {(row?.deadline && ValidationUtils.formatDate(row?.deadline)) ||
                      ValidationUtils.formatDate(row?.updatedAt || row?.createdAt)}
                  </StyledTableCell>
                  <StyledTableCell
                    align="inherit"
                    style={{
                      display: 'inline-block'
                    }}>
                    <Button
                      icon="largeExpand"
                      popoutWidth="180px"
                      noBorder
                      block
                      type="lightgrey"
                      fontSize="12px"
                      popout={generatePopout(userType, row)}
                      iconRight>
                      Details
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <TableTitle paddingLeft half row>
        <DarkText noMargin bold>
          Project Name
        </DarkText>
        <DarkText noMargin> </DarkText>
        <DarkText noMargin center bold>
          Budget
        </DarkText>
        <DarkText noMargin center bold>
          Equity
        </DarkText>
        <DarkText noMargin center bold>
          Points
        </DarkText>
        <DarkText noMargin center bold>
          Value Estimate
        </DarkText>
        <DarkText noMargin center bold>
          Deadline
        </DarkText>
        <DarkText noMargin center bold>
          Actions
        </DarkText>
      </TableTitle>
      <Underline color="#333" noMargin />
      <StoryTable>
        {businesses.length === 0 && loading && (
          <Box>
            <CircularProgress />
          </Box>
        )}
        {businesses.length === 0 && <Box>Start a project and you will see it here...</Box>}
        {businesses.length > 0 &&
          businesses.map((item, index) => (
            <WhiteCard
              noMargin
              borderRadius="0px"
              row
              background={!ValidationUtils.checkNumberEven(index) ? '#F7F7F7' : '#fff'}>
              <Absolute width="45%" wideLeft textOverflow="ellipsis">
                <DarkText textOverflow="ellipsis" noMargin>
                  {item.name}
                </DarkText>
              </Absolute>
              <DarkText noMargin> </DarkText>
              <DarkText noMargin> </DarkText>
              <DarkText noMargin center>
                ${(item.budget || 0).toLocaleString()}
              </DarkText>
              <DarkText noMargin center>
                {item?.equity || 0}%
              </DarkText>
              <DarkText noMargin center>
                27
              </DarkText>
              <DarkText noMargin center>
                {item?.valueEstimate || 'N/A'}
              </DarkText>
              <DarkText noMargin center>
                {(item?.deadline && ValidationUtils.formatDate(item?.deadline)) ||
                  ValidationUtils.formatDate(item?.updatedAt || item?.createdAt)}
              </DarkText>
              <DarkText noMargin center></DarkText>
              <Absolute>
                <Button
                  icon="largeExpand"
                  popoutWidth="150px"
                  noBorder
                  block
                  type="lightgrey"
                  fontSize="13px"
                  popout={generatePopout(userType, item)}
                  iconRight>
                  Details
                </Button>
              </Absolute>
            </WhiteCard>
          ))}
      </StoryTable> */}
    </Container>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    updateBusiness: bindActionCreators(updateBusiness, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(Panel)
