import React from 'react'
import styled, { css } from 'styled-components'

import { makeStyles } from '@material-ui/core/styles'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { MdCheckCircle } from 'react-icons/md'
import MobileInvoiceDetail from './MobileInvoiceDetail'
import MobileFreelancerFooter from '../../MobileFreelancerFooter'
import SingleInvoiceView from './SingleInvoiceView'
import ClientInvoices from './ClientInvoiceView'

const MobileView = styled.div`
  background-color: #f7f7f7;
  @media (min-width: 680px) {
    display: none;
  }
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
  text-align: center;
  font-family: Roboto;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 24.5px; /* 153.125% */
  letter-spacing: 0.4px;
  text-transform: capitalize;
  padding-left: 10px;
  width: 167px;
`

const ViewInvoice = styled.div`
  width: 100px;
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
    lineHeight: '19.5px' /* 121.875% */,
    letterSpacing: '0.15px',
    textAlign: 'center'
  }
}))

const Invoices = () => {
  const classes = useStyles()

  return (
    <MobileView>
      {/* <ClientInvoices /> */}
      <SingleInvoiceView />
      {/* <div className={classes.root}>
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
                <TaskName>Project I'm Hired For</TaskName>
                <ViewInvoice>View Invoice</ViewInvoice>
              </Tasks>
              <Tasks>
                <TaskIcon>
                  <MdCheckCircle />
                </TaskIcon>
                <TaskName>Project I'm Hired For</TaskName>
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
                  <MdCheckCircle style={{ color: '#D8D8D8' }} />
                </TaskIcon>
                <TaskName>Project I'm Hired For</TaskName>
                <ViewInvoice>View Invoice</ViewInvoice>
              </Tasks>
              <Tasks>
                <TaskIcon>
                  <MdCheckCircle />
                </TaskIcon>
                <TaskName>Project I'm Hired For</TaskName>
                <ViewInvoice>View Invoice</ViewInvoice>
              </Tasks>
            </div>
          </CustomAccordionDetails>
        </Accordion>
      </div> */}
      <MobileFreelancerFooter />
    </MobileView>
  )
}
export default Invoices
