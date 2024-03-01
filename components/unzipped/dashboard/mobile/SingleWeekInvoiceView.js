import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { FormField } from '../../../ui'

import { makeStyles } from '@material-ui/core/styles'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { MdCheckCircle } from 'react-icons/md'
import {
  updateInvoice,
  getInvoices,
  addInvoiceTasks,
  createTaskHour,
  createInvoice,
  updateTaskHour
} from '../../../../redux/actions'
import AddTasksModal from '../tasks/AddTasksModal'

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
  getInvoices,
  invoices,
  freelancerId,
  weekOptions,
  selectedWeek,
  createTaskHour,
  createInvoice,
  updateTaskHour,
  updateInvoice,
  projectDetails,
  addInvoiceTasks,
  timeSheet = false
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
  const [isCurrenWeek, setIsCurrentWeek] = useState(false)
  const [tasksModal, setTasksModal] = useState(false)
  const [selectedInvoice, setSelectedInvoice] = useState(null)
  const [selectedDay, setDay] = useState('')
  const [selectedDayDate, setDayDate] = useState('')
  const [selectedTaskId, setTaskId] = useState('')

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

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
      setSelectedInvoice(null)

      const currentDate = new Date()

      const currentWeekStartDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() - currentDate.getDay()
      )
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
          const startOfWeek = weekOptions[selectedWeek].startOfWeek
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
  }, [selectedWeek, invoices, weekOptions, freelancerId])

  useEffect(() => {
    if (selectedWeek !== null && selectedWeek !== undefined && filteredData !== null && invoices?.length) {
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

  const showTasksModal = day => {
    const daysToAdd = daysOfWeek.indexOf(day)
    if (daysToAdd !== -1) {
      const date = new Date(weekOptions[selectedWeek]?.startOfWeek)
      date.setHours(0, 0, 0, 0)

      date.setDate(date.getDate() + daysToAdd)
      const dateIso = new Date(date)
      const isoString = dateIso.toISOString()
      setDayDate(isoString)
    }
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
        if (taskHourtoUpdate) {
          taskHourtoUpdate.hours = value
        }
      }

      return newData
    })
  }

  return (
    <>
      <InvoiceOverView>
        {sortedData &&
          Object?.keys(sortedData)?.map((day, index) => {
            return (
              <Accordion style={{ marginTop: '0px' }} key={`${day}`}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                  <Typography className={classes.heading}>
                    {day} -{' '}
                    {sortedData[day]?.reduce((accumulator, currentValue) => {
                      return +accumulator + +currentValue.hours
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
                          <TaskHours
                            onClick={() => {
                              if (role === 1) setTaskId(task._id)
                            }}>
                            {(!task.hours || selectedTaskId === task._id) && isCurrenWeek ? (
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
                                onUpdate={() => {}}
                                handleEnterKey={async e => {
                                  if (e?.keyCode === 13) {
                                    await updateTaskHour(task._id, task)
                                    setTaskId('')
                                  }
                                }}
                              />
                            ) : (
                              <span>{task?.hours || 0} Hours</span>
                            )}
                          </TaskHours>
                        </Tasks>
                      )
                    })}

                    {isCurrenWeek && role === 1 && timeSheet && (
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
