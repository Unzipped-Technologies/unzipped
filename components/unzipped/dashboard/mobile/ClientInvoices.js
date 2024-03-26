import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { MdCheckCircle } from 'react-icons/md'
import Accordion from '@material-ui/core/Accordion'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import { useRouter } from 'next/router'

import Button from '../../../ui/Button'
import { ConverterUtils } from '../../../../utils'
import SingleWeekInvoiceView from './SingleWeekInvoiceView'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getInvoices, getBusinessById } from '../../../../redux/actions'

const InvoiceOverView = styled.div`
  width: 96%;
  align-items: center;
  margin-left: 2%;
  margin-right: 2%;
  background-color: #f7f7f7;
  margin-top: 10px;
  border-radius: 4px;
  padding-bottom: 60px;
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
  // padding: 0px !important;
`

const TaskIcon = styled.div`
  margin-left: 10px;
  color: ${({ color }) => (color ? color : '#5dc26a')};
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

const ClientInvoices = ({ weekOptions, selectedWeek, getInvoices, invoices, role }) => {
  const classes = useStyles()
  const router = useRouter()
  const { id, freelancer } = router.query
  const [filteredData, setFilteredData] = useState([])
  const [sortedData, setSortedData] = useState({})
  const [showSingleInvoice, setShowInvoice] = useState(false)
  const [freelancerId, setFreelancerId] = useState('')
  const [take, setTake] = useState(25)

  const [subTotal, setSubTotal] = useState(0)
  const [fee, setFee] = useState(0)
  const [totalAmount, setAmount] = useState(0)

  useEffect(() => {
    getInvoices({
      businessId: id,
      freelancerId: freelancer,
      limit: take,
      page: 1
    })
    if (id !== undefined) {
      getBusinessById(id)
    }
  }, [])

  useEffect(() => {
    if (selectedWeek !== null && selectedWeek !== undefined) {
      const filteredItems = invoices.filter(item => {
        if (freelancerId) {
          if (freelancerId === item.freelancerId) {
            const itemDate = new Date(item.updatedAt)
            const startOfWeek = weekOptions[selectedWeek].startOfWeek
            const endOfWeek = weekOptions[selectedWeek].endOfWeek
            return itemDate >= startOfWeek && itemDate <= endOfWeek
          }
        } else {
          const itemDate = new Date(item.updatedAt)
          const startOfWeek = weekOptions[selectedWeek]?.startOfWeek
          const endOfWeek = weekOptions[selectedWeek]?.endOfWeek
          return itemDate >= startOfWeek && itemDate <= endOfWeek
        }
      })
      setFilteredData(filteredItems)
    }
  }, [selectedWeek, invoices, weekOptions, freelancerId])

  useEffect(() => {
    if (selectedWeek !== null && selectedWeek !== undefined && filteredData !== null && invoices?.length) {
      const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
      const organizedItems = Object.fromEntries(daysOfWeek.map(day => [day, []]))
      filteredData?.forEach(item => {
        item?.tasks?.forEach(task => {
          const taskDate = new Date(task.updatedAt)
          const dayOfWeek = daysOfWeek[taskDate.getDay()]
          task['contract'] = item.contract
          task['freelancer'] = item.freelancer
          organizedItems[dayOfWeek].push(task)
        })
      })
      setSortedData(organizedItems)
    }
  }, [selectedWeek, filteredData])

  useEffect(() => {
    let subTotal = 0
    let fee = 0
    let totalAmount = 0
    if (role === 0) {
      for (var invoice of filteredData) {
        subTotal += invoice?.contract.hourlyRate * invoice.hoursWorked
      }
      fee = subTotal * 0.05
    } else {
      subTotal = filteredData?.length && filteredData[0]?.contract?.hourlyRate * filteredData[0]?.hoursWorked
      fee = subTotal * 0.05
    }
    totalAmount = subTotal - fee
    setSubTotal(subTotal)
    setFee(fee)
    setAmount(totalAmount)
  }, [filteredData])

  return (
    <>
      {showSingleInvoice ? (
        <SingleWeekInvoiceView weekOptions={weekOptions} selectedWeek={selectedWeek} freelancerId={freelancerId} />
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
                {filteredData?.length &&
                  filteredData.map(invoice => {
                    return (
                      <TableRow key={invoice._id}>
                        <TableData width="90%" wordBreak>
                          {ConverterUtils.capitalize(
                            `${invoice?.freelancer?.user?.FirstName} ${invoice?.freelancer?.user?.LastName}`
                          )}
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
                  {filteredData?.map(invoice => invoice.hoursWorked).reduce((acc, hours) => acc + hours, 0) || 0} Hours
                </PaymentAmount>
              </Payment>
              <Payment>
                <PaymentHeading>Fee</PaymentHeading>
                <PaymentAmount>${fee}</PaymentAmount>
              </Payment>
              <Payment>
                <PaymentHeading>Total</PaymentHeading>
                <PaymentAmount>${totalAmount}</PaymentAmount>
              </Payment>
            </InvoiceAmount>
          </InvoiceTable>
          {filteredData?.map(invoice => {
            return (
              <Accordion key={`${invoice._id}_${invoice?.user?._id}`}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                  <Typography className={classes.heading}>
                    {ConverterUtils.capitalize(
                      `${invoice?.freelancer?.user?.FirstName} ${invoice?.freelancer?.user?.LastName}`
                    )}{' '}
                    - {invoice?.hoursWorked} hours
                  </Typography>
                </AccordionSummary>
                <CustomAccordionDetails>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {invoice?.task?.length
                      ? invoice.task.map(task => {
                          {
                            return task.taskHours?.length
                              ? task.taskHours.map(hours => {
                                  return (
                                    <Tasks key={hours._id}>
                                      <TaskIcon color={hours.task?.status === 'done' ? '#5dc26a' : '#D8D8D8'}>
                                        <MdCheckCircle />
                                      </TaskIcon>
                                      <TaskName>{hours.task?.taskName}</TaskName>
                                      <TaskHours>{hours?.hours || 0} Hours</TaskHours>
                                    </Tasks>
                                  )
                                })
                              : ''
                          }
                        })
                      : ''}
                    <div style={{ width: '90%', margin: '0px auto 0px auto' }}>
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

const mapStateToProps = state => {
  return {
    invoices: state.Invoices.invoices,
    role: state.Auth.user.role,
    projectDetails: state.Business.selectedBusiness
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getInvoices: bindActionCreators(getInvoices, dispatch),
    getBusinessById: bindActionCreators(getBusinessById, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientInvoices)
