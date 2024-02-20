import React from 'react'
import styled from 'styled-components'

import { makeStyles } from '@material-ui/core/styles'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { MdCheckCircle } from 'react-icons/md'
import { updateInvoice } from '../../../../redux/Invoices/actions'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Button from '../../../ui/Button'

const InvoiceOverView = styled.div`
  background-color: #f7f7f7;
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
  border-radius: 4px;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.25);
  flex-direction: row;
  justify-content: space-around;
`
const InvoiceTable = styled.div`
  background: #fff;
  display: flex;
  flex-direction: row;
  padding: 5px 0px 10px 0px;
`

const Table = styled.table`
  table-layout: fixed;
  border-collapse: separate;
  padding-left: 20px;
  width: 57%;
`

const TableHeading = styled.th`
  width: 76px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #000;
  text-align: center;
  font-family: Roboto;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 14.5px; /* 175% */
  letter-spacing: 0.4px;
  text-transform: capitalize;
  text-align: left;
  padding: ${({ padding }) => (padding ? padding : '0px !important')};
`

const TableData = styled.td`
  word-break: ${({ wordBreak }) => (wordBreak ? 'break-word' : '')};
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #000;
  text-align: left;
  font-family: Roboto;
  font-size: 14px;
  font-weight: 400;
  line-height: 20.5px; /* 175% */
  letter-spacing: 0.4px;
  text-transform: uppercase;
  padding: 0px !important;
  text-align: ${({ textAlign }) => (textAlign ? textAlign : 'left')};
`

const TableRow = styled.tr``

const VerticalLine = styled.div`
  margin-left: -20px;
  border-left: 1px solid #000; /* Adjust color and width as needed */
`

const InvoiceAmount = styled.div`
  margin-top: auto;
  display: flex;
  flex-direction: column;
  padding-left: 10px;
`

const Payment = styled.div`
  display: flex;
  flex-direction: row;
`

const PaymentHeading = styled.div`
  color: #000;
  text-align: center;
  font-size: 14px;
  font-weight: 800;
  line-height: 24.5px; /* 175% */
  letter-spacing: 0.4px;
  text-transform: uppercase;
  text-align: left;
  overflow: visible;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 50px;
`
const PaymentAmount = styled.div`
  color: #000;
  font-family: Roboto;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 24.5px; /* 175% */
  letter-spacing: 0.4px;
  text-transform: uppercase;
  padding-left: 10px;
  text-align: left;
  white-space: pre-line;
  overflow: hidden;
  word-wrap: break-word;
`

const Tasks = styled.div`
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.25);
  box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.25);
`

const TaskName = styled.div`
  color: #000;
  text-align: left;
  font-family: Roboto;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 24.5px; /* 153.125% */
  letter-spacing: 0.4px;
  text-transform: capitalize;
  padding-left: 10px;
  width: 167px;
`

const TaskHours = styled.div`
  width: 100px;
  color: #333;
  text-align: center;
  font-family: Roboto;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 24.5px; /* 175% */
  letter-spacing: 0.4px;
  text-transform: capitalize;
  padding-right: 10px;
  margin-left: auto;
`

// Define a styled AccordionDetails component
const CustomAccordionDetails = styled(AccordionDetails)`
  /* Add your custom styles here */
  display: block !important;
  padding: 0px !important;
`

const TaskIcon = styled.div`
  margin-left: 10px;
  color: #5dc26a;
  font-size: 13px;
`

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  heading: {
    color: '#222',
    fontFamily: 'Roboto',
    fontSize: '16px',
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: '19.5px' /* 121.875% */,
    letterSpacing: '0.15px',
    textAlign: 'center'
  }
}))

const SingleWeekInvoiceView = ({ role, updateInvoice, weekInvoice }) => {
  const classes = useStyles()

  return (
    <>
      <InvoiceOverView>
        <InvoiceTable>
          <Table>
            <thead>
              <tr>
                <TableHeading padding="0px 0px 10px 0px">Day</TableHeading>
                <TableHeading padding="0px 0px 10px 10px">Hours</TableHeading>
              </tr>
            </thead>
            <tbody>
              <TableRow>
                <TableData>Monday</TableData>
                <TableData textAlign="center" width="2px">
                  8
                </TableData>
              </TableRow>
              <TableRow>
                <TableData>Tuesday</TableData>
                <TableData textAlign="center">8</TableData>
              </TableRow>
              <TableRow>
                <TableData>Wednesday</TableData>
                <TableData textAlign="center">8</TableData>
              </TableRow>
              <TableRow>
                <TableData>Thursday</TableData>
                <TableData textAlign="center">8</TableData>
              </TableRow>
              <TableRow>
                <TableData>Friday</TableData>
                <TableData textAlign="center">8</TableData>
              </TableRow>
            </tbody>
          </Table>
          <VerticalLine></VerticalLine>
          <InvoiceAmount>
            <Payment>
              <PaymentHeading>Hours</PaymentHeading>
              <PaymentAmount>{weekInvoice?.hoursWorked || 0} Hours</PaymentAmount>
            </Payment>
            <Payment>
              <PaymentHeading>Fee</PaymentHeading>
              <PaymentAmount>${weekInvoice?.hoursWorked * weekInvoice?.hourlyRate * 0.05 || 0}</PaymentAmount>
            </Payment>
            <Payment>
              <PaymentHeading>Total</PaymentHeading>
              <PaymentAmount>${weekInvoice?.hoursWorked * weekInvoice?.hourlyRate || 0}</PaymentAmount>
            </Payment>
          </InvoiceAmount>
        </InvoiceTable>
        <Accordion style={{ marginTop: '10px' }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
            <Typography className={classes.heading}>Monday - 8 Hours</Typography>
          </AccordionSummary>
          <CustomAccordionDetails>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Tasks>
                <TaskIcon>
                  <MdCheckCircle />
                </TaskIcon>
                <TaskName>New Task</TaskName>
                <TaskHours>3 Hours</TaskHours>
              </Tasks>
              <Tasks>
                <TaskIcon>
                  <MdCheckCircle />
                </TaskIcon>
                <TaskName>Another New Task</TaskName>
                <TaskHours>8 Hours</TaskHours>
              </Tasks>
              <div style={{ width: '90%', margin: '0px auto' }}>
                <Button
                  background="#1976D2"
                  noBorder
                  margin="5px 0px 5px 0px"
                  buttonHeight="35px"
                  webKit
                  colors={{
                    background: '#1976D2',
                    text: '#FFF'
                  }}
                  onClick={e => {
                    e.stopPropagation()
                  }}>
                  Add Task
                </Button>
              </div>
            </div>
          </CustomAccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">
            <Typography className={classes.heading}>Tuesday - 8 Hours</Typography>
          </AccordionSummary>
          <CustomAccordionDetails>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Tasks>
                <TaskIcon>
                  <MdCheckCircle style={{ color: '#D8D8D8' }} />
                </TaskIcon>
                <TaskName>Project I'm Hired For</TaskName>
                <TaskHours>View Invoice</TaskHours>
              </Tasks>
              <Tasks>
                <TaskIcon>
                  <MdCheckCircle />
                </TaskIcon>
                <TaskName>Project I'm Hired For</TaskName>
                <TaskHours>View Invoice</TaskHours>
              </Tasks>
            </div>
          </CustomAccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">
            <Typography className={classes.heading}>Wednesday - 8 Hours</Typography>
          </AccordionSummary>
          <CustomAccordionDetails>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Tasks>
                <TaskIcon>
                  <MdCheckCircle style={{ color: '#D8D8D8' }} />
                </TaskIcon>
                <TaskName>Project I'm Hired For</TaskName>
                <TaskHours>View Invoice</TaskHours>
              </Tasks>
              <Tasks>
                <TaskIcon>
                  <MdCheckCircle />
                </TaskIcon>
                <TaskName>Project I'm Hired For</TaskName>
                <TaskHours>View Invoice</TaskHours>
              </Tasks>
            </div>
          </CustomAccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">
            <Typography className={classes.heading}>Thursday - 8 Hours</Typography>
          </AccordionSummary>
          <CustomAccordionDetails>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Tasks>
                <TaskIcon>
                  <MdCheckCircle style={{ color: '#D8D8D8' }} />
                </TaskIcon>
                <TaskName>Project I'm Hired For</TaskName>
                <TaskHours>View Invoice</TaskHours>
              </Tasks>
              <Tasks>
                <TaskIcon>
                  <MdCheckCircle />
                </TaskIcon>
                <TaskName>Project I'm Hired For</TaskName>
                <TaskHours>View Invoice</TaskHours>
              </Tasks>
            </div>
          </CustomAccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">
            <Typography className={classes.heading}>Friday - 8 Hours</Typography>
          </AccordionSummary>
          <CustomAccordionDetails>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Tasks>
                <TaskIcon>
                  <MdCheckCircle style={{ color: '#D8D8D8' }} />
                </TaskIcon>
                <TaskName>Project I'm Hired For</TaskName>
                <TaskHours>View Invoice</TaskHours>
              </Tasks>
              <Tasks>
                <TaskIcon>
                  <MdCheckCircle />
                </TaskIcon>
                <TaskName>Project I'm Hired For</TaskName>
                <TaskHours>View Invoice</TaskHours>
              </Tasks>
            </div>
          </CustomAccordionDetails>
        </Accordion>
        {role !== 1 && (
          <div style={{ width: '100%', margin: '0px auto' }}>
            <Button
              background="#1976D2"
              noBorder
              margin="5px 0px 5px 0px"
              buttonHeight="35px"
              webKit
              colors={{
                background: '#1976D2',
                text: '#FFF'
              }}
              onClick={async () => {
                await updateInvoice(weekInvoice._id, { isApproved: true })
              }}>
              APPROVE
            </Button>
          </div>
        )}
      </InvoiceOverView>
    </>
  )
}

const mapStateToProps = state => {
  return {
    role: state.Auth.user.role
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateInvoice: bindActionCreators(updateInvoice, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleWeekInvoiceView)
