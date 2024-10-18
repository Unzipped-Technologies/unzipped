import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { bindActionCreators } from 'redux'
import { MdCheckCircle } from 'react-icons/md'
import Accordion from '@material-ui/core/Accordion'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'

import { DIV, TEXT } from '../style'
import Button from '../../../ui/Button'
import { ConverterUtils } from '../../../../utils'
import SingleWeekInvoiceView from './SingleWeekInvoiceView'
import { getInvoices, getBusinessById } from '../../../../redux/actions'

// Define a styled AccordionDetails component
const CustomAccordionDetails = styled(AccordionDetails)`
  display: block !important;
`

const TaskIcon = styled.div`
  margin-left: 10px;
  color: ${({ color }) => color};
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

const ClientInvoices = ({ weekOptions, selectedWeek, getInvoices, invoices }) => {
  const classes = useStyles()
  const router = useRouter()
  const { id, freelancer, invoice } = router.query
  const [filteredData, setFilteredData] = useState([])
  const [showSingleInvoice, setShowInvoice] = useState(false)
  const [freelancerId, setFreelancerId] = useState('')

  const [fee, setFee] = useState(0)
  const [totalAmount, setAmount] = useState(0)

  useEffect(() => {
    async function fetchData() {
      getInvoices({
        businessId: id,
        _id: invoice,
        freelancerId: freelancer,
        limit: 25,
        page: 1
      })
    }
    id && fetchData()
  }, [])

  useEffect(() => {
    if (selectedWeek >= 0 && selectedWeek !== null && selectedWeek !== undefined && selectedWeek !== '' && !invoice) {
      const filteredItems = invoices.filter(item => {
        const itemDate = new Date(item.updatedAt)
        const startOfWeek = weekOptions[selectedWeek]?.startOfWeek
        const endOfWeek = weekOptions[selectedWeek]?.endOfWeek
        return itemDate >= startOfWeek && itemDate <= endOfWeek
      })
      setFilteredData(filteredItems)
    } else {
      setFilteredData(invoices)
    }
  }, [selectedWeek, invoices, weekOptions, freelancerId])

  useEffect(() => {
    let subTotal = 0
    let fee = 0
    let totalAmount = 0
    for (var invoice of filteredData) {
      subTotal += invoice?.contract.hourlyRate * invoice.hoursWorked
    }
    fee = subTotal * 0.05
    totalAmount = subTotal - fee
    setFee(Math.round(fee))
    setAmount(totalAmount)
  }, [filteredData])

  return (
    <>
      {showSingleInvoice ? (
        <SingleWeekInvoiceView weekOptions={weekOptions} selectedWeek={selectedWeek} freelancerId={freelancerId} />
      ) : (
        <DIV
          width="96%"
          alignItems="center"
          margin="10px 2% 0px 2%"
          padding="0px 0px 60px 0px"
          background="#f7f7f7"
          borderRadius="4px"
          boxShadow="0px 1px 2px 0px rgba(0, 0, 0, 0.25)"
          flexDirection="row">
          <DIV width="100%" background="#fff" padding="10px 0px 0px 0px" display="flex" margin="0px 0px 20px 0px">
            <DIV width="50%" padding="0px 0px 0px 20px" data-testid="employess_invoices_table">
              <DIV display="flex" justifyContent="space-around">
                <TEXT
                  fontSize="14px"
                  lineHeight="14.5px"
                  letterSpacing="0.4px"
                  textTransform="capitalize"
                  width="90%"
                  padding="0px !important">
                  Name
                </TEXT>
                <TEXT
                  textAlign="right"
                  fontSize="14px"
                  lineHeight="14.5px"
                  letterSpacing="0.4px"
                  textTransform="capitalize"
                  width="10%"
                  padding="0px !important">
                  Hours
                </TEXT>
              </DIV>
              <div
                style={{
                  position: 'absolute',
                  borderBottom: '1px solid #777',
                  width: '160px'
                }}></div>
              <DIV margin="5px 0px 0px 0px">
                {filteredData?.length &&
                  filteredData.map(invoice => {
                    return (
                      <DIV
                        display="flex"
                        justifyContent="space-around"
                        key={invoice._id}
                        data-testid={`${invoice?.freelancer?._id}_invoice`}>
                        <TEXT
                          fontSize="14px"
                          lineHeight="20.5px"
                          letterSpacing="0.4px"
                          textTransform="uppercase"
                          padding="0px !important"
                          width="90%"
                          whiteSpace="nowrap"
                          overflow="scroll"
                          wordBreak="break-word">
                          {ConverterUtils.capitalize(
                            `${invoice?.freelancer?.user?.FirstName} ${invoice?.freelancer?.user?.LastName}`
                          )}
                        </TEXT>
                        <TEXT
                          whiteSpace="normal"
                          fontSize="14px"
                          lineHeight="20.5px"
                          letterSpacing="0.4px"
                          textTransform="uppercase"
                          wordBreak="break-word"
                          width="10%"
                          textAlign="right"
                          padding="0px 0px 0px 5px">
                          {invoice?.hoursWorked || 0}
                        </TEXT>
                      </DIV>
                    )
                  })}
              </DIV>
            </DIV>
            <DIV margin="0px 0px 0px 35px" borderLeft="1px solid #000"></DIV>
            <DIV
              margin="55px 0px 0px 0px"
              display="flex"
              flexDirection="column"
              flexFlow="column"
              padding="0px 0px 0px 10px"
              width="50%"
              data-testid="employess_invoices_totals">
              <DIV display="flex">
                <TEXT
                  fontSize="14px"
                  fontWeight="800"
                  lineHeight="24.5px" /* 175% */
                  letterSpacing="0.4px"
                  textTransform="uppercase"
                  overflow="visible"
                  whiteSpace="nowrap"
                  textOverflow="ellipsis"
                  width="50px"
                  margin="0px !important">
                  Hours
                </TEXT>
                <TEXT
                  textColor="#000"
                  fontSize="14px"
                  lineHeight="24.5px" /* 175% */
                  letterSpacing="0.4px"
                  textTransform="uppercase"
                  padding="0px 0px 0px 10px"
                  whiteSpace="pre-line"
                  overflow="scroll"
                  wordWrap="break-word"
                  margin="0px !important">
                  {filteredData?.map(invoice => invoice.hoursWorked).reduce((acc, hours) => acc + hours, 0) || 0}
                </TEXT>
              </DIV>
              <DIV display="flex">
                <TEXT
                  fontSize="14px"
                  fontWeight="800"
                  lineHeight="24.5px" /* 175% */
                  letterSpacing="0.4px"
                  textTransform="uppercase"
                  overflow="scroll"
                  whiteSpace="nowrap"
                  textOverflow="ellipsis"
                  width="50px"
                  margin="0px !important">
                  Fee
                </TEXT>
                <TEXT
                  textColor="#000"
                  fontSize="14px"
                  lineHeight="24.5px" /* 175% */
                  letterSpacing="0.4px"
                  textTransform="uppercase"
                  padding="0px 0px 0px 10px"
                  whiteSpace="pre-line"
                  overflow="scroll"
                  id="fee"
                  wordWrap="break-word"
                  margin="0px !important">
                  ${fee}
                </TEXT>
              </DIV>
              <DIV display="flex">
                <TEXT
                  fontSize="14px"
                  fontWeight="800"
                  lineHeight="24.5px" /* 175% */
                  letterSpacing="0.4px"
                  textTransform="uppercase"
                  overflow="scroll"
                  whiteSpace="nowrap"
                  textOverflow="ellipsis"
                  width="50px"
                  margin="0px !important">
                  Total
                </TEXT>
                <TEXT
                  textColor="#000"
                  id="total"
                  fontSize="14px"
                  lineHeight="24.5px" /* 175% */
                  letterSpacing="0.4px"
                  textTransform="uppercase"
                  padding="0px 0px 0px 10px"
                  whiteSpace="pre-line"
                  overflow="hidden"
                  wordWrap="break-word"
                  margin="0px !important">
                  ${totalAmount}
                </TEXT>
              </DIV>
            </DIV>
          </DIV>
          {filteredData?.map(invoiceData => {
            return (
              <Accordion
                key={`${invoiceData._id}_${invoiceData?.user?._id}`}
                data-testid={`${invoiceData._id}_invoice`}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                  <Typography className={classes.heading}>
                    {ConverterUtils.capitalize(
                      `${invoiceData?.freelancer?.user?.FirstName} ${invoiceData?.freelancer?.user?.LastName}`
                    )}{' '}
                    - {invoiceData?.hoursWorked ?? 0} hours
                  </Typography>
                </AccordionSummary>
                <CustomAccordionDetails>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {invoiceData?.tasks?.length > 0 &&
                      invoiceData.tasks.map(task => (
                        <DIV
                          height="50px"
                          display="flex"
                          alignItems="center"
                          background="#fff"
                          borderBottom="1px solid rgba(0, 0, 0, 0.25)"
                          boxShadow="0px 1px 1px 0px rgba(0, 0, 0, 0.25)"
                          id={task._id}
                          key={task._id}>
                          <TaskIcon color={task.task?.status === 'Done' ? '#5dc26a' : '#D8D8D8'}>
                            <MdCheckCircle />
                          </TaskIcon>
                          <TEXT
                            fontSize="16px"
                            fontWeight="700"
                            lineHeight="24.5px" /* 153.125% */
                            letterSpacing="0.4px"
                            textTransform="capitalize"
                            padding="15px 0px 0px 10px"
                            whiteSpace="nowrap"
                            overflow="scroll"
                            width="167px">
                            {task.task?.taskName}
                          </TEXT>
                          <TEXT
                            width="100px"
                            textAlign="center"
                            fontSize="14px"
                            lineHeight="24.5px" /* 175% */
                            letterSpacing="0.4px"
                            textTransform="capitalize"
                            padding="0px 10px 0px 0px"
                            margin="0px 0px 0px auto">
                            {task?.hours || 0} Hours
                          </TEXT>
                        </DIV>
                      ))}
                    {!invoice && (
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
                            setFreelancerId(invoiceData.freelancerId)
                          }}>
                          View Invoice
                        </Button>
                      </div>
                    )}
                  </div>
                </CustomAccordionDetails>
              </Accordion>
            )
          })}
        </DIV>
      )}
    </>
  )
}

const mapStateToProps = state => {
  return {
    invoices: state.Invoices.invoices,
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
