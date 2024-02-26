import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'

import { makeStyles } from '@material-ui/core/styles'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { MdCheckCircle } from 'react-icons/md'
import { updateInvoice, getInvoices } from '../../../../redux/actions'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Button from '../../../ui/Button'

const InvoiceOverView = styled.div`
  background-color: #f7f7f7;
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
  border-radius: 4px;
  padding-bottom: 60px;
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

const SingleWeekInvoiceView = ({
  role,
  updateInvoice,
  getInvoices,
  invoices,
  freelancerId,
  weekOptions,
  selectedWeek
}) => {
  const classes = useStyles()
  const router = useRouter()
  const { id } = router.query

  const [filteredData, setFilteredData] = useState([])
  const [sortedData, setSortedData] = useState({})
  const [subTotal, setSubTotal] = useState(0)
  const [fee, setFee] = useState(0)
  const [totalAmount, setAmount] = useState(0)
  const [totalHours, setTotalHours] = useState(0)
  const [take, setTake] = useState(25)

  useEffect(async () => {
    await getInvoices({
      businessId: id,
      freelancerId: freelancerId,
      limit: take,
      page: 1
    })
  }, [])

  useEffect(() => {
    if (selectedWeek !== null && selectedWeek !== undefined && invoices?.length) {
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
          const startOfWeek = weekOptions[selectedWeek].startOfWeek
          const endOfWeek = weekOptions[selectedWeek].endOfWeek
          return itemDate >= startOfWeek && itemDate <= endOfWeek
        }
      })
      setFilteredData(filteredItems)
    } else {
      setFilteredData([])
    }
  }, [selectedWeek, invoices, weekOptions, freelancerId])

  useEffect(() => {
    if (selectedWeek !== null && selectedWeek !== undefined && filteredData !== null && invoices?.length) {
      const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
      const organizedItems = Object.fromEntries(daysOfWeek.map(day => [day, []]))
      filteredData.forEach(item => {
        item.task.forEach(taskObj => {
          taskObj.taskHours.forEach(taskHour => {
            const itemDate = new Date(taskHour.createdAt)
            const dayOfWeek = daysOfWeek[itemDate.getDay()]
            organizedItems[dayOfWeek].push(taskHour)
          })
        })
      })
      setSortedData(organizedItems)
    } else {
      setSortedData({})
    }
  }, [selectedWeek, filteredData])

  useEffect(() => {
    let subTotal = 0
    let fee = 0
    let totalAmount = 0
    if (filteredData?.length) {
      for (var invoice of filteredData) {
        if (invoice?.freelancerId === freelancerId) {
          setTotalHours(invoice.hoursWorked)
          subTotal = invoice?.contract?.hourlyRate * invoice.hoursWorked
        }
      }
    } else {
      setSubTotal(0)
      setFee(0)
      setAmount(0)
      setTotalHours(0)
    }
    fee = subTotal * 0.05
    totalAmount = subTotal - fee
    setSubTotal(subTotal)
    setFee(fee)
    setAmount(totalAmount)
  }, [filteredData])

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
              {sortedData &&
                Object?.keys(sortedData)?.map((day, index) => {
                  return (
                    <TableRow key={`${day}_${index}`}>
                      <TableData>{day}</TableData>
                      <TableData textAlign="center" width="2px">
                        {sortedData[day]?.reduce((accumulator, currentValue) => {
                          return accumulator + currentValue.hours
                        }, 0)}
                      </TableData>
                    </TableRow>
                  )
                })}
            </tbody>
          </Table>
          <VerticalLine></VerticalLine>
          <InvoiceAmount>
            <Payment>
              <PaymentHeading>Hours</PaymentHeading>
              <PaymentAmount>{totalHours || 0} Hours</PaymentAmount>
            </Payment>
            <Payment>
              <PaymentHeading>Fee</PaymentHeading>
              <PaymentAmount>${fee || 0}</PaymentAmount>
            </Payment>
            <Payment>
              <PaymentHeading>Total</PaymentHeading>
              <PaymentAmount>${totalAmount || 0}</PaymentAmount>
            </Payment>
          </InvoiceAmount>
        </InvoiceTable>
        {sortedData &&
          Object?.keys(sortedData)?.map((day, index) => {
            return (
              <Accordion style={{ marginTop: '0px' }} key={`${day}`}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                  <Typography className={classes.heading}>
                    {day} -{' '}
                    {sortedData[day]?.reduce((accumulator, currentValue) => {
                      return accumulator + currentValue.hours
                    }, 0)}{' '}
                    Hours
                  </Typography>
                </AccordionSummary>
                <CustomAccordionDetails>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {sortedData[day]?.map(task => {
                      return (
                        <Tasks key={`${task._id}`}>
                          <TaskIcon color={task.task?.status === 'done' ? '#5dc26a' : '#D8D8D8'}>
                            <MdCheckCircle />
                          </TaskIcon>
                          <TaskName>{task?.task?.taskName}</TaskName>
                          <TaskHours>{task?.hours || 0} Hours</TaskHours>
                        </Tasks>
                      )
                    })}

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
            )
          })}
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
                await updateInvoice(weekInvoice._id, { status: 'approved' })
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
    invoices: state.Invoices.invoices,
    role: state.Auth.user.role
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateInvoice: bindActionCreators(updateInvoice, dispatch),
    getInvoices: bindActionCreators(getInvoices, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleWeekInvoiceView)
