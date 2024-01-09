import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { makeStyles } from '@material-ui/core/styles'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { MdCheckCircle } from 'react-icons/md'
import SingleWeekInvoiceView from './SingleWeekInvoiceView'

import Button from '../../../ui/Button'
import { ConverterUtils, ValidationUtils } from '../../../../utils'

const InvoiceOverView = styled.div`
  width: 96%;
  align-items: center;
  margin-left: 2%;
  margin-right: 2%;
  background-color: #f7f7f7;
  margin-top: 10px;
  border-radius: 4px;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.25);
  flex-direction: row;
`
const InvoiceTable = styled.div`
  width: 100%;
  background: #fff;
  padding-top: 10px;
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
`
const Table = styled.div`
  width: 50%;
  padding-left: 20px;
`

const TableHeader = styled.div`
  display: flex;
  justify-content: space-around;
  text-align: left;
  padding-bottom: 10px;
`

const TableBody = styled.div`
  margin-top: 5px;
`

const TableHeading = styled.div`
  color: #000;
  text-align: center;
  font-family: Roboto;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 14.5px; /* 175% */
  letter-spacing: 0.4px;
  text-transform: capitalize;
  text-align: ${({ textAlign }) => (textAlign ? textAlign : 'center')};
  padding: ${({ padding }) => (padding ? padding : '0px !important')};
  width: ${({ width }) => (width ? width : '50%')};
`

const TableRow = styled.div`
  display: flex;
  justifycontent: space-around;
`

const TableData = styled.div`
  white-space: normal;
  word-break: ${({ wordBreak }) => (wordBreak ? 'break-word' : '')};
  color: #000;
  text-align: left;
  font-family: Roboto;
  font-size: 14px;
  font-weight: 400;
  line-height: 20.5px; /* 175% */
  letter-spacing: 0.4px;
  text-transform: uppercase;
  padding: ${({ padding }) => (padding ? padding : '0px !important')};
  width: ${({ width }) => (width ? width : '50%')};
  text-align: ${({ textAlign }) => (textAlign ? textAlign : 'left')};
`

const VerticalLine = styled.div`
  margin-left: 35px;
  border-left: 1px solid #000; /* Adjust color and width as needed */
`

const HorizontalLine = styled.hr`
  width: 140px;
  margin-bottom: 5px;
  border-left: 3px solid #777; /* Adjust color and width as needed */
`

const InvoiceAmount = styled.div`
  margin-top: 55px;
  display: flex;
  flex-direction: column;
  padding-left: 10px;
  width: 50%;
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
    lineHeight: '19.5px',
    letterSpacing: '0.15px',
    textAlign: 'center'
  }
}))

const ClientInvoices = ({ weekInvoices }) => {
  const classes = useStyles()

  const [freelancerInvoice, setFreelancerInvoice] = useState({})
  const [showSingleInvoice, setShowInvoice] = useState(false)
  const [freelancerId, setFreelancerId] = useState('')

  useEffect(() => {
    setFreelancerInvoice({})
    for (var invoice of weekInvoices) {
      if (invoice?.freelancerId === freelancerId) {
        setFreelancerInvoice(invoice)
      }
    }
  }, [showSingleInvoice, weekInvoices])

  return (
    <>
      {showSingleInvoice ? (
        <SingleWeekInvoiceView weekInvoice={freelancerInvoice} />
      ) : (
        <InvoiceOverView>
          <InvoiceTable>
            <Table>
              <TableHeader style={{}}>
                <TableHeading width="90%" textAlign="left">
                  Name
                </TableHeading>
                <TableHeading width="10%" textAlign="right">
                  Hours
                </TableHeading>
              </TableHeader>
              <div
                style={{
                  position: 'absolute',
                  borderBottom: '1px solid #777',
                  width: '160px'
                }}></div>
              <TableBody>
                {weekInvoices.map(invoice => {
                  return (
                    <TableRow key={invoice._id}>
                      <TableData width="90%" wordBreak>
                        {ConverterUtils.capitalize(`${invoice?.user?.FirstName} ${invoice?.user?.LastName}`)}
                      </TableData>
                      <TableData width="10%" textAlign="right" padding="0px 0px 0px 5px">
                        {invoice?.hoursWorked || 0}
                      </TableData>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
            <VerticalLine></VerticalLine>
            <InvoiceAmount>
              <Payment>
                <PaymentHeading>Hours</PaymentHeading>
                <PaymentAmount>
                  {weekInvoices.map(invoice => invoice.hoursWorked).reduce((acc, hours) => acc + hours, 0)} Hours
                </PaymentAmount>
              </Payment>
              <Payment>
                <PaymentHeading>Fee</PaymentHeading>
                <PaymentAmount>
                  $
                  {weekInvoices
                    .map(invoice => invoice.hoursWorked * invoice.hourlyRate * 0.05)
                    .reduce((acc, hours) => acc + hours, 0)}
                </PaymentAmount>
              </Payment>
              <Payment>
                <PaymentHeading>Total</PaymentHeading>
                <PaymentAmount>
                  $
                  {weekInvoices
                    .map(invoice => invoice.hoursWorked * invoice.hourlyRate)
                    .reduce((acc, hours) => acc + hours, 0)}
                </PaymentAmount>
              </Payment>
            </InvoiceAmount>
          </InvoiceTable>
          {weekInvoices?.map(invoice => {
            return (
              <Accordion key={`${invoice._id}_${invoice?.user?._id}`}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                  <Typography className={classes.heading}>
                    {ConverterUtils.capitalize(`${invoice?.user?.FirstName} ${invoice?.user?.LastName}`)} -{' '}
                    {invoice?.hoursWorked} hours
                  </Typography>
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
                        onClick={() => {
                          setShowInvoice(true)
                          setFreelancerId(invoice.freelancerId)
                        }}>
                        View Invoice
                      </Button>
                    </div>
                  </div>
                </CustomAccordionDetails>
              </Accordion>
            )
          })}
        </InvoiceOverView>
      )}
    </>
  )
}
export default ClientInvoices
