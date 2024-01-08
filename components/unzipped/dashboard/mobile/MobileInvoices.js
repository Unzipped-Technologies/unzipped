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
import * as moment from 'moment'

import MobileFreelancerFooter from '../../MobileFreelancerFooter'
import Button from '../../../ui/Button'

const InvoiceOverView = styled.div`
  width: 96%;
  margin-left: 2%;
  margin-right: 2%;
  background-color: #f7f7f7;
  border-radius: 4px;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.25);
  flex-direction: row;
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
  font-weight: 600;
  line-height: 24.5px; /* 153.125% */
  letter-spacing: 0.4px;
  text-transform: capitalize;
  padding-left: 10px;
  width: 270px;
`

const ViewInvoice = styled.div`
  width: 130px;
  color: #333;
  text-align: center;
  font-family: Roboto;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 24.5px; /* 175% */
  letter-spacing: 0.4px;
  text-decoration-line: underline;
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
    fontWeight: '400',
    lineHeight: '19.5px',
    letterSpacing: '0.15px',
    textAlign: 'center'
  }
}))

const MobileInvoices = ({
  data,
  businesses,
  weekOptions,
  sortedData,
  handleWeekChange,
  take,
  handletake,
  handleFilter,
  projectName,
  userType
}) => {
  const classes = useStyles()
  const router = useRouter()
  const { id } = router.query

  const [invoices, setInvoices] = useState([])

  useEffect(() => {
    const weeksInvoices = []
    for (var i = 0; i < weekOptions.length; i++) {
      const filteredItems = businesses.filter(item => {
        const itemDate = new Date(item.updatedAt)
        const startOfWeek = weekOptions[i].startOfWeek
        const endOfWeek = weekOptions[i].endOfWeek
        return itemDate >= startOfWeek && itemDate <= endOfWeek
      })
      const weekInvoice = {
        [`Week of ${moment(weekOptions[i].startOfWeek).format('MM/DD/YYYY')} - ${moment(
          weekOptions[i].endOfWeek
        ).format('MM/DD/YYYY')}`]: filteredItems
      }
      weeksInvoices.push(weekInvoice)
    }

    setInvoices(weeksInvoices)
  }, [data, weekOptions])

  return (
    <InvoiceOverView>
      {/* {invoices?.length &&
        invoices.map((invoice, index) => {
          console.log('invoice', invoice)
          return (
            <Accordion key={`mobile_${invoice}_${index}`}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                <Typography className={classes.heading}>{Object.keys(invoice)[0]}</Typography>
              </AccordionSummary>
              <CustomAccordionDetails>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {invoice[Object.keys(invoice)[0]]?.length
                    ? invoice[Object.keys(invoice)[0]].map(project => {
                        return (
                          <Tasks>
                            <TaskIcon>
                              <MdCheckCircle />
                            </TaskIcon>
                            <TaskName>{project.name}</TaskName>
                            <ViewInvoice
                              onClick={() => {
                                router.push({
                                  pathname: `/dashboard/projects/details/${id}`,
                                  query: { tab: 'invoices' }
                                })
                              }}>
                              View Invoice
                            </ViewInvoice>
                          </Tasks>
                        )
                      })
                    : 'N/A'}
                </div>
              </CustomAccordionDetails>
            </Accordion>
          )
        })} */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
          <Typography className={classes.heading}>Week of 11/28/2022 - 12/02/2022</Typography>
        </AccordionSummary>
        <CustomAccordionDetails>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Tasks>
              <TaskIcon>
                <MdCheckCircle />
              </TaskIcon>
              <TaskName>Project I am Hired for</TaskName>
              <ViewInvoice
                onClick={() => {
                  router.push({
                    pathname: `/dashboard/projects/details/${id}`,
                    query: { tab: 'invoices' }
                  })
                }}>
                View Invoice
              </ViewInvoice>
            </Tasks>
            <Tasks>
              <TaskIcon>
                <MdCheckCircle style={{ color: '#D8D8D8' }} />
              </TaskIcon>
              <TaskName>Another New Project</TaskName>
              <ViewInvoice>View Invoice</ViewInvoice>
            </Tasks>
            <Tasks>
              <TaskIcon>
                <MdCheckCircle style={{ color: '#D8D8D8' }} />
              </TaskIcon>
              <TaskName>Another New Project</TaskName>
              <ViewInvoice>Create Invoice</ViewInvoice>
            </Tasks>
          </div>
        </CustomAccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">
          <Typography className={classes.heading}>Week of 11/28/2022 - 12/02/2022</Typography>
        </AccordionSummary>
        <CustomAccordionDetails>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Tasks>
              <TaskIcon>
                <MdCheckCircle />
              </TaskIcon>
              <TaskName>Project I am Hired for</TaskName>
              <ViewInvoice>View Invoice</ViewInvoice>
            </Tasks>
            <Tasks>
              <TaskIcon>
                <MdCheckCircle style={{ color: '#D8D8D8' }} />
              </TaskIcon>
              <TaskName>Another New Project</TaskName>
              <ViewInvoice>View Invoice</ViewInvoice>
            </Tasks>
            <Tasks>
              <TaskIcon>
                <MdCheckCircle style={{ color: '#D8D8D8' }} />
              </TaskIcon>
              <TaskName>Another New Project</TaskName>
              <ViewInvoice>View Invoice</ViewInvoice>
            </Tasks>
          </div>
        </CustomAccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">
          <Typography className={classes.heading}>Week of 11/28/2022 - 12/02/2022</Typography>
        </AccordionSummary>
        <CustomAccordionDetails>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Tasks>
              <TaskIcon>
                <MdCheckCircle />
              </TaskIcon>
              <TaskName>Project I am Hired for</TaskName>
              <ViewInvoice>View Invoice</ViewInvoice>
            </Tasks>
            <Tasks>
              <TaskIcon>
                <MdCheckCircle style={{ color: '#D8D8D8' }} />
              </TaskIcon>
              <TaskName>Another New Project</TaskName>
              <ViewInvoice>View Invoice</ViewInvoice>
            </Tasks>
            <Tasks>
              <TaskIcon>
                <MdCheckCircle style={{ color: '#D8D8D8' }} />
              </TaskIcon>
              <TaskName>Another New Project</TaskName>
              <ViewInvoice>View Invoice</ViewInvoice>
            </Tasks>
          </div>
        </CustomAccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">
          <Typography className={classes.heading}>Week of 11/28/2022 - 12/02/2022</Typography>
        </AccordionSummary>
        <CustomAccordionDetails>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Tasks>
              <TaskIcon>
                <MdCheckCircle />
              </TaskIcon>
              <TaskName>Project I am Hired for</TaskName>
              <ViewInvoice>View Invoice</ViewInvoice>
            </Tasks>
            <Tasks>
              <TaskIcon>
                <MdCheckCircle style={{ color: '#D8D8D8' }} />
              </TaskIcon>
              <TaskName>Another New Project</TaskName>
              <ViewInvoice>View Invoice</ViewInvoice>
            </Tasks>
            <Tasks>
              <TaskIcon>
                <MdCheckCircle style={{ color: '#D8D8D8' }} />
              </TaskIcon>
              <TaskName>Another New Project</TaskName>
              <ViewInvoice>View Invoice</ViewInvoice>
            </Tasks>
          </div>
        </CustomAccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">
          <Typography className={classes.heading}>Week of 11/28/2022 - 12/02/2022</Typography>
        </AccordionSummary>
        <CustomAccordionDetails>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Tasks>
              <TaskIcon>
                <MdCheckCircle />
              </TaskIcon>
              <TaskName>Project I am Hired for</TaskName>
              <ViewInvoice>View Invoice</ViewInvoice>
            </Tasks>
            <Tasks>
              <TaskIcon>
                <MdCheckCircle style={{ color: '#D8D8D8' }} />
              </TaskIcon>
              <TaskName>Another New Project</TaskName>
              <ViewInvoice>View Invoice</ViewInvoice>
            </Tasks>
            <Tasks>
              <TaskIcon>
                <MdCheckCircle style={{ color: '#D8D8D8' }} />
              </TaskIcon>
              <TaskName>Another New Project</TaskName>
              <ViewInvoice>View Invoice</ViewInvoice>
            </Tasks>
          </div>
        </CustomAccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">
          <Typography className={classes.heading}>Week of 11/28/2022 - 12/02/2022</Typography>
        </AccordionSummary>
        <CustomAccordionDetails>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Tasks>
              <TaskIcon>
                <MdCheckCircle />
              </TaskIcon>
              <TaskName>Project I am Hired for</TaskName>
              <ViewInvoice>View Invoice</ViewInvoice>
            </Tasks>
            <Tasks>
              <TaskIcon>
                <MdCheckCircle style={{ color: '#D8D8D8' }} />
              </TaskIcon>
              <TaskName>Another New Project</TaskName>
              <ViewInvoice>View Invoice</ViewInvoice>
            </Tasks>
            <Tasks>
              <TaskIcon>
                <MdCheckCircle style={{ color: '#D8D8D8' }} />
              </TaskIcon>
              <TaskName>Another New Project</TaskName>
              <ViewInvoice>View Invoice</ViewInvoice>
            </Tasks>
          </div>
        </CustomAccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">
          <Typography className={classes.heading}>Week of 11/28/2022 - 12/02/2022</Typography>
        </AccordionSummary>
        <CustomAccordionDetails>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Tasks>
              <TaskIcon>
                <MdCheckCircle />
              </TaskIcon>
              <TaskName>Project I am Hired for</TaskName>
              <ViewInvoice>View Invoice</ViewInvoice>
            </Tasks>
            <Tasks>
              <TaskIcon>
                <MdCheckCircle style={{ color: '#D8D8D8' }} />
              </TaskIcon>
              <TaskName>Another New Project</TaskName>
              <ViewInvoice>View Invoice</ViewInvoice>
            </Tasks>
            <Tasks>
              <TaskIcon>
                <MdCheckCircle style={{ color: '#D8D8D8' }} />
              </TaskIcon>
              <TaskName>Another New Project</TaskName>
              <ViewInvoice>View Invoice</ViewInvoice>
            </Tasks>
          </div>
        </CustomAccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">
          <Typography className={classes.heading}>Week of 11/28/2022 - 12/02/2022</Typography>
        </AccordionSummary>
        <CustomAccordionDetails>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Tasks>
              <TaskIcon>
                <MdCheckCircle />
              </TaskIcon>
              <TaskName>Project I am Hired for</TaskName>
              <ViewInvoice>View Invoice</ViewInvoice>
            </Tasks>
            <Tasks>
              <TaskIcon>
                <MdCheckCircle style={{ color: '#D8D8D8' }} />
              </TaskIcon>
              <TaskName>Another New Project</TaskName>
              <ViewInvoice>View Invoice</ViewInvoice>
            </Tasks>
            <Tasks>
              <TaskIcon>
                <MdCheckCircle style={{ color: '#D8D8D8' }} />
              </TaskIcon>
              <TaskName>Another New Project</TaskName>
              <ViewInvoice>View Invoice</ViewInvoice>
            </Tasks>
          </div>
        </CustomAccordionDetails>
      </Accordion>
      <MobileFreelancerFooter />
    </InvoiceOverView>
  )
}

export default MobileInvoices
