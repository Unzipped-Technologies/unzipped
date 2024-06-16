import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import AddInvoiceTask from '../../../ui/icons/addInvoiceTask'

import { FaRegCheckCircle } from 'react-icons/fa'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { FormField } from '../../../ui'
import { ConverterUtils } from '../../../../utils'

import {
  getBusinessById,
  getInvoices,
  createTaskHour,
  createInvoice,
  updateTaskHour,
  updateInvoice,
  addInvoiceTasks
} from '../../../../redux/actions'
import AddTasksModal from '../tasks/AddTasksModal'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

const P = styled.p`
  font-size: ${({ fontSize }) => (fontSize ? fontSize : '16px')};
  font-weight: ${({ fontWeight }) => (fontWeight ? fontWeight : '')};
  color: ${({ color }) => (color ? color : 'black')};
  background: ${({ background }) => (background ? background : '')};
  padding: ${({ padding }) => (padding ? padding : '0px !important')};
  margin: ${({ margin }) => (margin ? margin : '0px !important')};
  text-align: ${({ align }) => (align ? align : '')};
  border-bottom: ${({ borderBottom }) => (borderBottom ? borderBottom : '')};
  right: ${({ right }) => (right ? right : '')};
  width: ${({ width }) => (width ? width : '')};
`

const Container = styled.div`
  width: 98%;
  margin: 0px auto;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  flex-flow: row;
  margin-bottom: 100px;
  background: ${({ background }) => (background ? background : '')};
`

const DragDiv = styled.div`
  border-right: 1px solid #d9d9d9;
  border-left: 1px solid #d9d9d9;
`

const TableTop = styled.div`
  padding: 20px 30px;
  border-radius: 10px 10px 0 0;
  display: flex;
  border: 1px solid #d9d9d9;
  background-color: rgba(217, 217, 217, 0.36);
  justify-content: space-between;
  width: 830px;
  align-self: center;
`

const ButtonComp = styled.button`
  border: 0;
  background: #1976d2;
  border-radius: 5px;
  color: white;
  font-weight: 500;
  padding: 6px 22px;
  height: fit-content;
  align-self: center;
`

const DaysDiv = styled.div`
  padding: 20px 30px;
  display: flex;
  border-bottom: 1px solid #d9d9d9;
  border-right: 1px solid #d9d9d9;
  background-color: #f7f7f7;
  // justify-content: space-between;
  border-left: 1px solid #d9d9d9;
`

const HoursDiv = styled.div`
  width: 300px;
  background: #fff;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  padding: 24px 15px;
  height: fit-content;
`

const Timesheet = ({
  projectDetails,
  role,
  freelancerId,
  invoices,
  getInvoices,
  createInvoice,
  addInvoiceTasks,
  updateInvoice,
  updateTaskHour,

  businessId,
  timeSheet = false,
  displayFormat = false,
  invoice = null,
  freelancer
}) => {
  const router = useRouter()
  const { week } = router.query

  const [tasksModal, setTasksModal] = useState(false)
  const [selectedTaskId, setTaskId] = useState('')
  const [selectedDay, setDay] = useState('')
  const [selectedDayDate, setDayDate] = useState('')
  const [weekOptions, setWeekOptions] = useState([])
  const [selectedWeek, setSelectedWeek] = useState(0)
  const [isCurrenWeek, setIsCurrentWeek] = useState(false)
  const [startDate, setStartDate] = useState()
  const [filteredData, setFilteredData] = useState([])
  const [sortedData, setSortedData] = useState({})
  const [selectedInvoice, setSelectedInvoice] = useState(null)

  const [subTotal, setSubTotal] = useState(0)
  const [fee, setFee] = useState(0)
  const [totalAmount, setAmount] = useState(0)
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

  const tableColumns = () => {
    if (role === 1) {
      return [
        {
          name: 'TIME SPENT'
        },
        {
          name: 'STORY POINTS'
        }
      ]
    } else {
      return [
        {
          name: 'Rate'
        },
        {
          name: 'TIME SPENT'
        },
        {
          name: 'ASSIGNEE'
        }
      ]
    }
  }

  useEffect(() => {
    if (+week && week > 0) setSelectedWeek(week)
  }, [week])

  useEffect(() => {
    getInvoices({ businessId: businessId, _id: invoice, freelancerId: freelancer })
  }, [businessId])

  // Below set week options
  useEffect(() => {
    const options = []
    const currentDate = new Date()

    for (let i = 10; i >= 0; i--) {
      const startOfWeek = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() - currentDate.getDay() - i * 7
      )
      startOfWeek.setHours(0, 0, 0, 0)
      const endOfWeek = new Date(startOfWeek)
      endOfWeek.setDate(endOfWeek.getDate() + 6)
      endOfWeek.setHours(23, 59, 59, 999)
      options.unshift({ startOfWeek, endOfWeek })
    }
    setWeekOptions(options)
    setSelectedWeek(0)
  }, [])

  useEffect(() => {
    if (selectedWeek !== null && selectedWeek !== undefined) {
      setSelectedInvoice(null)
      const currentDate = new Date()
      const startOfWeek = weekOptions[selectedWeek]?.startOfWeek
      const endOfWeek = weekOptions[selectedWeek]?.endOfWeek
      setStartDate(startOfWeek)
      const filteredItems = invoices?.filter(item => {
        const itemDate = new Date(item.createdAt)

        const isCurrentInvoice = invoice ? true : itemDate >= startOfWeek && itemDate <= endOfWeek
        if (isCurrentInvoice) {
          setSelectedInvoice(item)
        }
        return isCurrentInvoice
      })
      setFilteredData(filteredItems)

      const currentWeekStartDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() - currentDate.getDay()
      )
      currentWeekStartDate.setHours(0, 0, 0, 0)
      const isCurrentWeek = startOfWeek?.getTime() === currentWeekStartDate?.getTime()
      setIsCurrentWeek(isCurrentWeek)
    }
  }, [selectedWeek, weekOptions, invoices])

  useEffect(() => {
    if (selectedWeek !== null && selectedWeek !== undefined) {
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
  }, [filteredData])

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

  const handleWeekChange = value => {
    setSelectedWeek(value)
  }

  const onDragEnd = async result => {
    if (role === 1 && timeSheet) {
      if (!isCurrenWeek) {
        return
      }
      if (!result.destination) {
        return
      }
      const { source, destination, draggableId } = result
      const sourceDay = source.droppableId
      const destinationDay = destination.droppableId
      const ifExists = sortedData[destinationDay].find(obj => obj._id === draggableId)
      if (ifExists) return
      const sourceDayIndex = daysOfWeek.indexOf(sourceDay)
      const destinationDayIndex = daysOfWeek.indexOf(destinationDay)
      const objectToMoveIndex = sortedData[sourceDay].findIndex(obj => obj._id === result.draggableId)
      if (objectToMoveIndex !== -1) {
        const objectToMove = { ...sortedData[sourceDay][objectToMoveIndex] }
        const daysDifference = destinationDayIndex - sourceDayIndex
        const currentDate = new Date(objectToMove.updatedAt)
        currentDate.setDate(currentDate.getDate() + daysDifference)
        objectToMove.updatedAt = currentDate.toISOString()
        objectToMove.day = destinationDayIndex
        const updatedSourceDay = [...sortedData[sourceDay]]
        updatedSourceDay.splice(objectToMoveIndex, 1)
        const updatedDestinationDay = [...sortedData[destinationDay], objectToMove]
        await updateTaskHour(objectToMove._id, objectToMove)
        setFilteredData(prevData => {
          const newData = [...prevData]
          const invoiceToUpdate = newData.find(item => item._id === objectToMove.invoiceId)

          if (invoiceToUpdate) {
            let taskHourtoUpdate = invoiceToUpdate?.tasks?.find(taskHour => taskHour?._id === objectToMove._id)
            if (taskHourtoUpdate) {
              taskHourtoUpdate.day = objectToMove.day
              taskHourtoUpdate.updatedAt = objectToMove.updatedAt
            }
          }
          return newData
        })
      }
    }
  }

  const handleAddModal = day => {
    const daysToAdd = daysOfWeek.indexOf(day)
    if (daysToAdd !== -1) {
      const date = new Date(startDate)
      date.setHours(0, 0, 0, 0)

      date.setDate(date.getDate() + daysToAdd)
      const dateIso = new Date(date)
      const isoString = dateIso.toISOString()
      setDayDate(isoString)
    }
    console.log('opening...')
    setDay(daysToAdd)
    setTasksModal(true)
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
          businessId: projectDetails?._id,
          freelancerId: freelancerId,
          clientId: projectDetails?.userId
        })
      }
      await getInvoices({ businessId: businessId })
    }
  }

  const handleSubmit = async status => {
    await updateInvoice(selectedInvoice?._id, {
      status: status
    })
  }

  return (
    <Container style={{ justifyContent: timeSheet ? 'center' : 'flex-end' }} data-testid={'desktop_timesheet'}>
      <div
        style={{
          width: '830px'
        }}>
        <TableTop>
          <div style={{ display: 'flex' }}>
            <P margin="0px" fontSize="24px" fontWeight="500" width="182px" data-testid={'timesheet_user_name'}>
              {ConverterUtils.capitalize(`${selectedInvoice?.freelancer?.user?.FullName.slice(0, 15) || 'User'}`)}
              {selectedInvoice?.freelancer?.user?.FullName?.length > 17 && '...'}
            </P>
            {!invoice && (
              <select
                data-testid="timesheet_week_options"
                onChange={e => {
                  handleWeekChange(e?.target?.value)
                }}
                style={{
                  display: 'block',
                  border: '0',
                  width: 'fit-content',
                  backgroundColor: 'transparent',
                  marginLeft: '50px'
                }}>
                {weekOptions.map((week, index) => (
                  <option key={index} value={index}>
                    Week of {week.startOfWeek.toDateString()} - {week.endOfWeek.toDateString()}
                  </option>
                ))}
              </select>
            )}
          </div>
          {role === 1 ? (
            isCurrenWeek && timeSheet && selectedInvoice?.tasks?.length ? (
              <ButtonComp
                onClick={() => {
                  handleSubmit('active')
                }}>
                SUBMIT
              </ButtonComp>
            ) : (
              ''
            )
          ) : selectedInvoice?.status !== 'approved' ? (
            <ButtonComp
              onClick={() => {
                handleSubmit('approved')
              }}>
              Approve
            </ButtonComp>
          ) : (
            ''
          )}
        </TableTop>
        <DragDropContext onDragEnd={onDragEnd}>
          <DragDiv>
            {Object.keys(sortedData).map((day, index) => {
              return (
                <div key={day} className="day">
                  {!displayFormat ? (
                    <DaysDiv data-testid={`${day}_header`}>
                      <P margin="0px" fontWeight="500" width={'40%'}>
                        {' '}
                        {day.toUpperCase()}{' '}
                      </P>
                      {tableColumns().map(column => {
                        return (
                          <P
                            fontWeight="500"
                            width={`${60 / tableColumns()?.length}%`}
                            align="center"
                            key={`${column.name}_${index}`}>
                            {' '}
                            {column.name}
                          </P>
                        )
                      })}
                      {isCurrenWeek && role === 1 && timeSheet ? (
                        <span onClick={() => handleAddModal(day)} data-testid={`${day}_add_task_icon`}>
                          <AddInvoiceTask />
                        </span>
                      ) : (
                        ''
                      )}
                    </DaysDiv>
                  ) : (
                    index === 0 && (
                      <DaysDiv>
                        <P margin="0px" fontWeight="500" width={'40%'}>
                          {' '}
                          Task
                        </P>
                        {tableColumns().map(column => {
                          return (
                            <P
                              data-testid={column.name}
                              fontWeight="500"
                              width={`${60 / tableColumns()?.length}%`}
                              align="center"
                              key={`${column.name}_${index}`}>
                              {' '}
                              {column.name}
                            </P>
                          )
                        })}
                      </DaysDiv>
                    )
                  )}
                  <Droppable droppableId={day} key={day}>
                    {(provided, snapshot) => (
                      <div
                        style={{
                          background: snapshot.isDraggingOver ? 'lightblue' : 'white',
                          borderRadius: '4px'
                        }}
                        ref={provided.innerRef}
                        className={`droppable-area ${snapshot.isDraggingOver ? 'dragging-over' : ''}`}>
                        {sortedData[day].map((item, itemIndex) => (
                          <Draggable key={item._id} draggableId={`${item._id}`} index={itemIndex}>
                            {(provided, snapshot) => (
                              <div
                                style={{
                                  ...provided.draggableProps.style,
                                  background: snapshot.isDragging ? 'red' : 'white',
                                  position: 'relative'
                                }}
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="d-flex  draggable-item border bg-white py-3 px-2"
                                onClick={() => {
                                  if (role === 1) setTaskId(item._id)
                                }}>
                                <div style={{ alignItems: 'center' }}>
                                  <FaRegCheckCircle
                                    size={15}
                                    color={
                                      item?.task?.tag?.tagName?.includes('In')
                                        ? '#FFA500'
                                        : item?.task?.tag?.tagName?.includes('Done')
                                        ? '#198754'
                                        : '#D8D8D8'
                                    }
                                  />
                                </div>

                                <P
                                  margin="0px"
                                  padding="0 0 0 10px"
                                  width={'40%'}
                                  fontWeight="500"
                                  data-testid={`${item?._id}_task`}>
                                  {' '}
                                  {item?.task?.taskName}{' '}
                                </P>
                                {role === 0 && (
                                  <P
                                    align="center"
                                    width={`${60 / tableColumns()?.length}%`}
                                    fontWeight="500"
                                    margin="0px 30px 0px 0px">
                                    {' '}
                                    {item?.contract?.hourlyRate}{' '}
                                  </P>
                                )}
                                <div style={{ width: `${60 / tableColumns()?.length}%` }}>
                                  {(!item.hours || selectedTaskId === item._id) && isCurrenWeek && role === 1 ? (
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                      <FormField
                                        zIndexUnset
                                        fieldType="input"
                                        type="number"
                                        placeholder="Hours"
                                        fontSize="14px"
                                        name={`${item._id}_hours`}
                                        id={`${item._id}_hours`}
                                        width="60px"
                                        margin="0px 10px 0px 0px"
                                        height="30px  !important"
                                        borderRadius="4px"
                                        border="1px solid #A5A0A0"
                                        value={item.hours}
                                        maxLength="30"
                                        onChange={e => addHours(e?.target?.value, item?.invoiceId, item._id)}
                                        handleEnterKey={async e => {
                                          if (e?.key === 'Enter') {
                                            await updateTaskHour(item._id, item)
                                            setTaskId('')
                                          }
                                        }}
                                      />
                                    </div>
                                  ) : (
                                    <P
                                      fontWeight="500"
                                      align="center"
                                      margin={`0px ${role === 0 ? '60px' : '10px'} 0px 0px`}>
                                      {item.hours} Hours
                                    </P>
                                  )}
                                </div>
                                {role === 1 && (
                                  <P
                                    width={`${60 / tableColumns()?.length}%`}
                                    fontWeight="500"
                                    align="center"
                                    margin="0px 30px 0px 0px">
                                    {' '}
                                    {item?.task?.storyPoints}{' '}
                                  </P>
                                )}
                                {role === 0 && (
                                  <P align="left" width={`${60 / tableColumns()?.length}%`}>
                                    <img
                                      src={item?.freelancer?.user?.profileImage}
                                      style={{ width: '24px', height: '24px', borderRadius: '50%', marginRight: '6px' }}
                                    />
                                    {item?.freelancer?.user?.FirstName + ' ' + item?.freelancer?.user?.LastName ??
                                      'Anonymous'}
                                  </P>
                                )}
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              )
            })}
          </DragDiv>
        </DragDropContext>
      </div>
      {!timeSheet ? (
        role === 1 ? (
          <HoursDiv>
            <div className="d-flex justify-content-between  mb-3" style={{ borderBottom: '1px solid #777' }}>
              <P fontWeight="500">DAY</P>
              <P fontWeight="500">HOURS</P>
            </div>
            {sortedData &&
              Object?.keys(sortedData)?.map((day, index) => {
                return (
                  <div className="d-flex justify-content-between pb-3" key={`day_hours_${index}`}>
                    <P fontWeight="500">{day}</P>
                    <P fontWeight="500">{sortedData[day].reduce((acc, obj) => acc + obj.hours, 0)}</P>
                  </div>
                )
              })}
            <div className="d-flex justify-content-between mt-3 pb-3" style={{ borderTop: '1px solid #777' }}>
              <P fontWeight="500">RATE</P>
              {filteredData && <P fontWeight="500">${filteredData[0]?.contract?.hourlyRate || 0} /HOUR</P>}
            </div>
            <div className="d-flex justify-content-between  pb-3">
              <P fontWeight="500">FEE</P>
              <P fontWeight="500">${fee || 0}</P>
            </div>
            <div className="d-flex justify-content-between">
              <P fontWeight="500">TOTAL</P>
              <P fontWeight="500">${totalAmount || 0} </P>
            </div>
          </HoursDiv>
        ) : (
          <HoursDiv>
            <div className="d-flex justify-content-between mb-3 pb-2" style={{ borderBottom: '1px solid #777' }}>
              <P fontWeight="500">Name</P>
              <P fontWeight="500">Amount</P>
            </div>
            {filteredData?.length
              ? filteredData?.map((invoice, index) => {
                  return (
                    <div className="d-flex justify-content-between pb-3" key={invoice._id}>
                      <P fontWeight="500">
                        {ConverterUtils.capitalize(
                          `${invoice?.freelancer?.user?.FirstName} ${invoice?.freelancer?.user?.LastName}`
                        )}
                      </P>
                      <P fontWeight="500">${invoice?.contract?.hourlyRate * invoice?.hoursWorked}</P>
                    </div>
                  )
                })
              : ''}
            <div
              className="d-flex justify-content-between pt-3 pb-3"
              style={{ borderTop: filteredData?.length ? '1px solid #777' : '' }}>
              <P fontWeight="500">Subtotal</P>
              <P fontWeight="500">${subTotal}</P>
            </div>
            <div className="d-flex justify-content-between pb-3">
              <P fontWeight="500">FEE</P>
              <P fontWeight="500">${fee}</P>
            </div>
            <div className="d-flex justify-content-between">
              <P fontWeight="500">TOTAL</P>
              <P fontWeight="500">${totalAmount} </P>
            </div>
          </HoursDiv>
        )
      ) : (
        ''
      )}

      {tasksModal && <AddTasksModal onHide={hideTasksModal} onAdd={addTasks} />}
    </Container>
  )
}

const mapStateToProps = state => {
  return {
    projectDetails: state.Business.selectedBusiness,
    role: state.Auth.user.role,
    freelancerId: state.Auth.user?.freelancers,
    invoices: state.Invoices.invoices
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getBusinessById: bindActionCreators(getBusinessById, dispatch),
    getInvoices: bindActionCreators(getInvoices, dispatch),
    createTaskHour: bindActionCreators(createTaskHour, dispatch),
    createInvoice: bindActionCreators(createInvoice, dispatch),
    addInvoiceTasks: bindActionCreators(addInvoiceTasks, dispatch),
    updateInvoice: bindActionCreators(updateInvoice, dispatch),
    updateTaskHour: bindActionCreators(updateTaskHour, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Timesheet)
