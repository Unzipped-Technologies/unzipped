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

const MobileView = styled.div`
  width: 100%;
  flex-wrap: wrap;
  @media (min-width: 680px) {
    display: none;
  }
`
const Tasks = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
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
`

const ViewInvoice = styled.div`
  color: #333;
  font-family: Roboto;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 24.5px; /* 175% */
  letter-spacing: 0.4px;
  text-decoration-line: underline;
  text-transform: capitalize;
  padding-left: 65px;
`

const TaskIcon = styled.div``

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
      <div className={classes.root}>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
            <Typography className={classes.heading}>Week of 11/28/2022 - 12/02/2022</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Tasks>
              <TaskIcon>
                <MdCheckCircle style={{ fontSize: '13px', color: '#5DC26A' }} />
              </TaskIcon>
              <TaskName>Project I'm Hired For</TaskName>
              <ViewInvoice>View Invoice</ViewInvoice>
            </Tasks>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">
            <Typography className={classes.heading}>Week of 11/28/2022 - 12/02/2022</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Tasks>
              <TaskIcon>
                <MdCheckCircle style={{ fontSize: '13px', color: '#D8D8D8' }} />
              </TaskIcon>
              <TaskName>Project I'm Hired For</TaskName>
              <ViewInvoice>View Invoice</ViewInvoice>
            </Tasks>
          </AccordionDetails>
        </Accordion>
      </div>
      <MobileInvoiceDetail />
    </MobileView>
  )
}
export default Invoices
