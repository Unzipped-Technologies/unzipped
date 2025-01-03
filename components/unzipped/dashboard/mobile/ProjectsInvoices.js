import React, { useEffect, useMemo } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Accordion from '@material-ui/core/Accordion'
import { makeStyles } from '@material-ui/core/styles'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Typography from '@material-ui/core/Typography'
import { FaRegCheckCircle } from 'react-icons/fa'

import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Button from '../../../ui/Button'
import { ConverterUtils } from '../../../../utils'
import { getInvoices, updateInvoice } from '../../../../redux/actions'
import MobileFreelancerFooter from '../../../unzipped/MobileFreelancerFooter'

const MobileDisplayBox = styled.div`
  background: #f4f4f4;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.25);
  flex-wrap: wrap;
  width: 100%;
  @media (min-width: 680px) {
    display: none;
  }
`

// Define a styled AccordionDetails component
const CustomAccordionDetails = styled(AccordionDetails)`
  /* Add your custom styles here */
  // width: 100% !important;
  padding: 0px !important;

  display: block !important;
  // padding: 0px !important;
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
  overflow: scroll;
  white-space: nowrap;
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

const TaskIcon = styled.div`
  margin-left: 10px;
  color: #5dc26a;
  font-size: 13px;
  color: ${({ color }) => color};
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

const ProjectsInvoices = ({ invoices, role, getInvoices, updateInvoice }) => {
  const classes = useStyles()

  const router = useRouter()

  useEffect(() => {
    async function fetchData() {
      await getInvoices({
        businessId: '',
        freelancerId: '',
        limit: 'all',
        page: 1
      })
    }
    fetchData()
  }, [])

  const allInvoices = useMemo(() => {
    const invoicesData = []
    for (var invoice of invoices) {
      const invoiceIndex = invoicesData?.findIndex(business => business?.business?._id === invoice?.business?._id)
      if (invoiceIndex === -1) {
        invoicesData.push({
          business: invoice.business,
          invoices: [invoice]
        })
      } else {
        invoicesData[invoiceIndex].invoices.push(invoice)
      }
    }
    return invoicesData
  }, [invoices])

  const getWeekStartDate = date => {
    var currentDdate = new Date(date)

    // Get the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    var day = currentDdate.getDay()

    // Calculate the start date of the week (Sunday)
    var startDate = new Date(currentDdate)
    startDate.setDate(currentDdate.getDate() - day)

    // Calculate the end date of the week (Saturday)
    var endDate = new Date(currentDdate)
    endDate.setDate(currentDdate.getDate() - day + 6)

    // Format start and end dates
    var startDate = startDate.toLocaleDateString('en-US')
    var endDate = endDate.toLocaleDateString('en-US')

    return {
      startDate,
      endDate
    }
  }

  const viewInvoice = (businessId = null, freelancerId = null, invoiceId = null) => {
    if (role === 1) {
      router.push(`/dashboard/projects/freelancer/invoice/${businessId}?tab=invoices&freelancer=${freelancerId}`)
    } else {
      router.push(`/dashboard/projects/client/invoice/${businessId}?tab=invoices&invoice=${invoiceId}`)
    }
  }
  return (
    <MobileDisplayBox data-testid="freelancer_all_invoices">
      {allInvoices?.length ? (
        allInvoices?.map(invoice => {
          return (
            <Accordion key={`${invoice._id}_${invoice?.user?._id}`} data-testid={`${invoice?.business?._id}_invoices`}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  overflow: 'scroll',
                  whiteSpace: 'nowrap'
                }}>
                <Typography>
                  {ConverterUtils.truncateString(ConverterUtils.capitalize(`${invoice?.business?.name}`), 40)}
                </Typography>
              </AccordionSummary>
              <CustomAccordionDetails>
                {invoice?.invoices?.map(row => {
                  const { startDate, endDate } = getWeekStartDate(row?.createdAt)
                  return (
                    <Accordion key={`${row._id}`} data-testid={`${row?._id}_invoice`}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header">
                        <Typography className={classes.heading}>
                          Week {startDate} - {endDate} ({row?.hoursWorked || 0} )
                        </Typography>
                      </AccordionSummary>
                      <CustomAccordionDetails>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          {row?.tasks?.map(task => {
                            return (
                              <Tasks key={task._id}>
                                <TaskIcon>
                                  <FaRegCheckCircle
                                    size={15}
                                    color={
                                      task?.task?.tag?.tagName?.includes('In Progress')
                                        ? '#FFA500'
                                        : task?.task?.tag?.tagName?.includes('Done')
                                        ? '#198754'
                                        : '#D8D8D8'
                                    }
                                  />
                                </TaskIcon>
                                <TaskName>{task.task?.taskName}</TaskName>
                                <TaskHours>{task?.hours || 0} Hours</TaskHours>
                              </Tasks>
                            )
                          })}
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
                                viewInvoice(invoice?.business._id, row?.freelancerId, row?._id)
                              }}>
                              View Invoice
                            </Button>
                          </div>
                        </div>
                      </CustomAccordionDetails>
                    </Accordion>
                  )
                })}
              </CustomAccordionDetails>
            </Accordion>
          )
        })
      ) : (
        <div
          style={{
            marginLeft: '0%',
            textAlign: 'center',
            paddingTop: '40px',
            paddingBottom: '40px'
          }}>
          <p>No Invoices</p>
        </div>
      )}
      <MobileFreelancerFooter defaultSelected="Projects" />
    </MobileDisplayBox>
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
    getInvoices: bindActionCreators(getInvoices, dispatch),
    updateInvoice: bindActionCreators(updateInvoice, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsInvoices)
