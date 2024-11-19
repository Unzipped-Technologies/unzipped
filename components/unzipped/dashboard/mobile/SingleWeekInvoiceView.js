import React, { useEffect, useState } from 'react'

import { connect } from 'react-redux'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { bindActionCreators } from 'redux'
import { FaRegCheckCircle } from 'react-icons/fa'
import Accordion from '@material-ui/core/Accordion'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'

import Button from '../../../ui/Button'
import { TEXT, DIV } from '../style'
import { FormField } from '../../../ui'
import AddTasksModal from '../tasks/AddTasksModal'
import {
  updateInvoice,
  getInvoices,
  addInvoiceTasks,
  createTaskHour,
  createInvoice,
  updateTaskHour
} from '../../../../redux/actions'

const Tasks = styled.div`
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.25);
  box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.25);
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
    lineHeight: '19.5px' /* 121.875% */,
    letterSpacing: '0.15px',
    textAlign: 'center'
  }
}))

const SingleWeekInvoiceView = ({
  role,
  getInvoices,
  invoices,
  freelancerId,
  weekOptions,
  selectedWeek,
  createInvoice,
  updateTaskHour,
  updateInvoice,
  projectDetails,
  addInvoiceTasks
}) => {
  const classes = useStyles()
  const router = useRouter()
  const { id } = router.query

  const [filteredData, setFilteredData] = useState([])
  const [sortedData, setSortedData] = useState({})
  const [isCurrenWeek, setIsCurrentWeek] = useState(false)
  const [tasksModal, setTasksModal] = useState(false)
  const [selectedInvoice, setSelectedInvoice] = useState(null)
  const [selectedDay, setDay] = useState('')
  const [selectedDayDate, setDayDate] = useState('')
  const [selectedTaskId, setTaskId] = useState('')

  const [subTotal, setSubTotal] = useState(0)
  const [fee, setFee] = useState(0)
  const [totalAmount, setAmount] = useState(0)

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

  useEffect(() => {
    async function fetchData() {
      await getInvoices({
        businessId: id,
        freelancerId: freelancerId,
        limit: 'all',
        page: 1
      })
    }
    fetchData()
  }, [])

  useEffect(() => {
    if (selectedWeek >= 0 && selectedWeek !== null && selectedWeek !== undefined && selectedWeek !== '') {
      setSelectedInvoice(null)
      const startOfWeek = weekOptions[selectedWeek].startOfWeek

      const currentDate = new Date()

      const currentWeekStartDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() - currentDate.getDay()
      )
      currentWeekStartDate.setHours(0, 0, 0, 0)
      const isCurrentWeek = startOfWeek?.getTime() === currentWeekStartDate?.getTime()
      setIsCurrentWeek(isCurrentWeek)

      const filteredItems = invoices.filter(item => {
        if (freelancerId) {
          if (freelancerId === item.freelancerId) {
            const itemDate = new Date(item.updatedAt)
            const startOfWeek = weekOptions[selectedWeek]?.startOfWeek
            const endOfWeek = weekOptions[selectedWeek]?.endOfWeek
            const isCurrentWeek = startOfWeek?.getTime() === currentWeekStartDate?.getTime()

            setIsCurrentWeek(isCurrentWeek)
            const isCurrentInvoice = itemDate >= startOfWeek && itemDate <= endOfWeek
            if (isCurrentInvoice) {
              setSelectedInvoice(item)
            }
            return isCurrentInvoice
          }
        } else {
          const itemDate = new Date(item.updatedAt)
          const endOfWeek = weekOptions[selectedWeek].endOfWeek
          const isCurrentWeek = startOfWeek?.getTime() === currentWeekStartDate?.getTime()
          setIsCurrentWeek(isCurrentWeek)
          return itemDate >= startOfWeek && itemDate <= endOfWeek
        }
      })

      setFilteredData(filteredItems)
    } else {
      setFilteredData([])
    }
  }, [selectedWeek, invoices, freelancerId])

  useEffect(() => {
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
  }, [selectedWeek, filteredData])

  useEffect(() => {
    let subTotal = 0
    let fee = 0
    let totalAmount = 0
    if (filteredData?.length) {
      if (role === 0) {
        for (var invoice of filteredData) {
          subTotal += invoice?.contract.hourlyRate * invoice.hoursWorked
        }
        fee = subTotal * 0.05
      } else {
        subTotal = filteredData[0]?.contract?.hourlyRate * filteredData[0]?.hoursWorked
        fee = subTotal * 0.05
      }
      totalAmount = subTotal - fee
    }
    setSubTotal(subTotal)
    setFee(Math.round(fee))
    setAmount(totalAmount)
  }, [filteredData])

  const showTasksModal = day => {
    const daysToAdd = daysOfWeek.indexOf(day)
    const date = new Date(weekOptions[selectedWeek]?.startOfWeek)
    date.setHours(0, 0, 0, 0)

    date.setDate(date.getDate() + daysToAdd)
    const dateIso = new Date(date)
    const isoString = dateIso.toISOString()
    setDayDate(isoString)
    setDay(daysToAdd)
    setTasksModal(true)
  }

  const hideTasksModal = () => {
    setTasksModal(false)
  }

  const addTasks = async tasks => {
    const taskHours = []
    const dayOfWeek = daysOfWeek[selectedDay]

    for (var task of tasks) {
      if (!sortedData[dayOfWeek]?.find(item => item.taskId === task)) {
        taskHours.push({
          taskId: task,
          hours: 0,
          invoiceId: selectedInvoice?._id || null,
          day: selectedDay,
          createdAt: selectedDayDate,
          updatedAt: selectedDayDate
        })
      }
    }
    if (taskHours?.length) {
      if (selectedInvoice?._id) {
        await addInvoiceTasks(selectedInvoice?._id, {
          tasksHours: taskHours,
          freelancerId: freelancerId
        })
      } else {
        await createInvoice({
          tasks: [],
          tasksHours: taskHours,
          businessId: id,
          freelancerId: freelancerId,
          clientId: projectDetails?.userId
        })
      }
      await getInvoices({ businessId: id })
    }
  }

  const addHours = (value, invoiceId, taskHourId) => {
    setFilteredData(prevData => {
      const newData = [...prevData]
      const invoiceToUpdate = newData.find(item => item._id === invoiceId)

      if (invoiceToUpdate) {
        const taskHourtoUpdate = invoiceToUpdate?.tasks?.find(taskHour => taskHour?._id === taskHourId)
        taskHourtoUpdate.hours = value
      }

      return newData
    })
  }

  const handleSubmit = async status => {
    await updateInvoice(selectedInvoice?._id, {
      status: status
    })
  }

  return (
    <>
      <DIV
        background="#f7f7f7"
        margin="10px 10px 0px 10px"
        borderRadius="4px"
        padding="0px 0px  60px 0px"
        boxShadow="0px 1px 2px 0px rgba(0, 0, 0, 0.25)"
        flexDirection="row"
        justifyContent="space-around"
        data-testid="single_week_invoice">
        <DIV width="100%" background="#fff" padding="10px 0px 0px 0px" display="flex" margin="0px 0px 20px 0px">
          <DIV width="50%" padding="0px 0px 0px 20px" data-testid="employess_single_invoices">
            <DIV display="flex" justifyContent="space-around">
              <TEXT
                fontSize="14px"
                lineHeight="14.5px"
                letterSpacing="0.4px"
                textTransform="capitalize"
                width="90%"
                padding="0px !important">
                Day
              </TEXT>
              <TEXT
                textAlign="right"
                fontSize="14px"
                lineHeight="14.5px"
                letterSpacing="0.4px"
                textTransform="capitalize"
                width="25%"
                padding="0px !important">
                Hours
              </TEXT>
            </DIV>
            <div
              style={{
                position: 'absolute',
                borderBottom: '1px solid #777',
                width: '190px',
                minWidth: '190px'
              }}></div>
            <DIV margin="5px 0px 0px 0px">
              {Object?.keys(sortedData)?.map(day => {
                return (
                  <DIV
                    height="20px"
                    display="flex"
                    justifyContent="space-around"
                    key={`${day}_hours`}
                    data-testid={`${day}_hours`}>
                    <TEXT
                      fontSize="14px"
                      lineHeight="24.5px"
                      letterSpacing="0.4px"
                      textTransform="uppercase"
                      padding="0px !important"
                      width="85%">
                      {day}
                    </TEXT>
                    <TEXT
                      whiteSpace="normal"
                      fontSize="14px"
                      lineHeight="20.5px"
                      letterSpacing="0.4px"
                      textTransform="uppercase"
                      wordBreak="break-word"
                      width="15%"
                      textAlign="right"
                      padding="0px 0px 0px 5px">
                      {sortedData[day]?.reduce((accumulator, currentValue) => {
                        const totalHours = +accumulator + +currentValue.hours
                        return totalHours
                      }, 0) || 0}
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
            justifyContent="end"
            padding="0px 0px 0px 10px"
            width="50%"
            data-testid="single_invoice_totals">
            <DIV display="flex">
              <TEXT
                fontSize="14px"
                fontWeight="800"
                lineHeight="24.5px"
                letterSpacing="0.4px"
                textTransform="uppercase"
                overflow="visible"
                whiteSpace="nowrap"
                textOverflow="ellipsis"
                width="50px"
                margin="0px !important">
                Hours
              </TEXT>
              <DIV display="flex" alignItems="flex-end">
                <TEXT
                  textColor="#000"
                  fontSize="14px"
                  lineHeight="24.5px"
                  letterSpacing="0.4px"
                  textTransform="uppercase"
                  padding="0px 0px 0px 10px"
                  whiteSpace="pre-line"
                  textAlign="right"
                  overflow="scroll"
                  id="total_hours"
                  wordWrap="break-word"
                  margin="0px !important">
                  {selectedInvoice?.hoursWorked || 0}
                </TEXT>
              </DIV>
            </DIV>
            <DIV display="flex">
              <TEXT
                fontSize="14px"
                fontWeight="800"
                lineHeight="24.5px"
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
                lineHeight="24.5px"
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
                lineHeight="24.5px"
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
                fontSize="14px"
                lineHeight="24.5px"
                letterSpacing="0.4px"
                textTransform="uppercase"
                padding="0px 0px 0px 10px"
                whiteSpace="pre-line"
                id="total"
                overflow="hidden"
                wordWrap="break-word"
                margin="0px !important">
                ${totalAmount}
              </TEXT>
            </DIV>
          </DIV>
        </DIV>
        {sortedData &&
          Object?.keys(sortedData)?.map((day, index) => {
            return (
              <Accordion style={{ marginTop: '0px' }} key={`${day}`} data-testid={`${day}_invoice`}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id={`${day}_header`}>
                  <Typography className={classes.heading}>
                    {`${day} - `}
                    {sortedData[day]?.reduce((accumulator, currentValue) => {
                      const totalHours = +accumulator + +currentValue.hours
                      return totalHours
                    }, 0)}{' '}
                    Hours
                  </Typography>
                </AccordionSummary>
                <CustomAccordionDetails>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {sortedData[day]?.map(task => {
                      return (
                        <Tasks key={`${task._id}`} id={`${task._id}`}>
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
                          <TEXT
                            textColor="#000"
                            textAlign="left"
                            fontSize="16px"
                            fontStyle="normal"
                            fontWeight="700"
                            lineHeight="24.5px" /* 153.125% */
                            letterSpacing="0.4px"
                            textTransform="capitalize"
                            padding="16px 0px 0px 10px"
                            overflow="scroll"
                            whiteSpace="nowrap"
                            width="167px">
                            {task?.task?.taskName}
                          </TEXT>

                          {selectedTaskId === task._id && isCurrenWeek && role === 1 ? (
                            <FormField
                              zIndexUnset
                              fieldType="input"
                              type="number"
                              placeholder="Hours"
                              fontSize="14px"
                              name={`${task._id}_hours`}
                              id={`${task._id}_hours`}
                              width="60px"
                              margin="0px 0px 0px 20px"
                              height="30px  !important"
                              borderRadius="4px"
                              border="1px solid #A5A0A0"
                              value={task.hours}
                              maxLength="30"
                              onChange={e => addHours(e?.target?.value, task?.invoiceId, task._id)}
                              handleEnterKey={e => {
                                if (e?.key === 'Enter') {
                                  updateTaskHour(task._id, task)
                                  setTaskId('')
                                }
                              }}
                            />
                          ) : (
                            <TEXT
                              width="100px"
                              textColor="#333"
                              textAlign="center"
                              font-size="14px"
                              fontStyle="normal"
                              id={`${task._id}_hours`}
                              fontWeight="400"
                              lineHeight="24.5px" /* 175% */
                              letterSpacing="0.4px"
                              textTransform="capitalize"
                              padding="0px 10px 0px 0px "
                              margin="auto"
                              onClick={() => {
                                role === 1 && setTaskId(task._id)
                              }}>
                              <span>{task?.hours || 0} Hours</span>
                            </TEXT>
                          )}
                        </Tasks>
                      )
                    })}
                    {isCurrenWeek && role === 1 && (
                      <div style={{ width: '90%', margin: '0px auto' }}>
                        <Button
                          data-testid={`${day}_add_task_icon`}
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
                            showTasksModal(day)
                          }}>
                          Add Task
                        </Button>
                      </div>
                    )}
                  </div>
                </CustomAccordionDetails>
              </Accordion>
            )
          })}
        {role !== 1 && selectedInvoice?.status !== 'approved' ? (
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
                await updateInvoice(selectedInvoice?._id, { status: 'approved' })
                await getInvoices({
                  businessId: id,
                  freelancerId: freelancerId,
                  limit: 'all',
                  page: 1
                })
              }}>
              APPROVE
            </Button>
          </div>
        ) : isCurrenWeek && selectedInvoice?.tasks?.length ? (
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
              handleSubmit('active')
            }}>
            SUBMIT
          </Button>
        ) : (
          ''
        )}
      </DIV>
      {tasksModal && <AddTasksModal onHide={hideTasksModal} onAdd={addTasks} open={tasksModal} />}
    </>
  )
}

const mapStateToProps = state => {
  return {
    projectDetails: state.Business.selectedBusiness,
    invoices: state.Invoices.invoices,
    role: state.Auth.user.role
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getInvoices: bindActionCreators(getInvoices, dispatch),
    updateInvoice: bindActionCreators(updateInvoice, dispatch),
    createTaskHour: bindActionCreators(createTaskHour, dispatch),
    createInvoice: bindActionCreators(createInvoice, dispatch),
    addInvoiceTasks: bindActionCreators(addInvoiceTasks, dispatch),
    updateTaskHour: bindActionCreators(updateTaskHour, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleWeekInvoiceView)
