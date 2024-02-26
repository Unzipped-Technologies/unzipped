import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { FaRegCheckCircle } from 'react-icons/fa'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import AddInvoiceTask from '../../../ui/icons/addInvoiceTask'
import { FormField } from '../../../ui'

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
  padding: ${({ padding }) => (padding ? padding : '')};
  margin: ${({ margin }) => (margin ? margin : '')};
  text-align: ${({ align }) => (align ? align : '')};
  border-bottom: ${({ borderBottom }) => (borderBottom ? borderBottom : '')};
  right: ${({ right }) => (right ? right : '')};
  width: ${({ width }) => (width ? width : '')};
`

const Container = styled.div`
  position: relative;
  display: flex;
  flex-flow: column;
  margin-bottom: 100px;
  background: ${({ background }) => (background ? background : '')};
`

const DragDiv = styled.div`
  width: 830px;
  align-self: center;
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
  justify-content: space-between;
  border-left: 1px solid #d9d9d9;
`

const Timesheet = ({
  projectDetails,
  handleUpdatedAt,
  businessId,
  getInvoices,
  invoices,
  updateInvoice,
  createInvoice,
  addInvoiceTasks,
  updateTaskHour,
  freelancerId
}) => {
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

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

  useEffect(() => {
    getInvoices({ businessId: businessId })
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
        const isCurrentInvoice = itemDate >= startOfWeek && itemDate <= endOfWeek
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
          organizedItems[dayOfWeek].push(task)
        })
      })
      setSortedData(organizedItems)
    }
  }, [filteredData])

  const handleWeekChange = value => {
    setSelectedWeek(value)
  }

  const onDragEnd = async result => {
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
    const taskHours = tasks.map(task => {
      return {
        taskId: task,
        hours: 0,
        invoiceId: selectedInvoice?._id || null,
        day: selectedDay,
        createdAt: selectedDayDate,
        updatedAt: selectedDayDate
      }
    })
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

  const handleSubmit = async () => {
    await updateInvoice(selectedInvoice?._id, {
      status: 'active'
    })
  }

  return (
    <Container>
      <TableTop>
        <div style={{ display: 'flex' }}>
          <P margin="0px" fontSize="24px" fontWeight="500" width="182px">
            {projectDetails?.name.slice(0, 15)}
            {projectDetails?.name?.length > 17 && '...'}
          </P>
          <select
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
        </div>
        {isCurrenWeek ? (
          <ButtonComp
            onClick={() => {
              handleSubmit()
            }}>
            SUBMIT
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
                <DaysDiv>
                  <P margin="0px" fontWeight="500" width={'50%'}>
                    {' '}
                    {day.toUpperCase()}{' '}
                  </P>
                  <P margin="0px" fontWeight="500" width={'20%'}>
                    {' '}
                    TIME SPENT{' '}
                  </P>
                  <P margin="0px" fontWeight="500" width={'20%'}>
                    {' '}
                    STORY POINTS{' '}
                  </P>
                  {isCurrenWeek ? (
                    <span onClick={() => handleAddModal(day)}>
                      <AddInvoiceTask />
                    </span>
                  ) : (
                    <span></span>
                  )}
                </DaysDiv>
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
                              className="d-flex align-items-center draggable-item border bg-white py-3 px-2"
                              onClick={() => {
                                setTaskId(item._id)
                              }}>
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
                              <P margin="0px" padding="0 0 0 10px" width={'50%'} fontWeight="500">
                                {' '}
                                {item?.task?.taskName}{' '}
                              </P>
                              <div style={{ width: '15%' }}>
                                {console.log('hours', item)}
                                {(!item.hours || selectedTaskId === item._id) && isCurrenWeek ? (
                                  <FormField
                                    zIndexUnset
                                    fieldType="input"
                                    placeholder="Story Points"
                                    fontSize="14px"
                                    name={`${item._id}_hours`}
                                    id={`${item._id}_hours`}
                                    width="60px"
                                    margin="0px 0px 0px 30px"
                                    height="30px  !important"
                                    borderRadius="4px"
                                    border="1px solid #A5A0A0"
                                    value={item.hours}
                                    maxLength="30"
                                    onChange={e => addHours(e?.target?.value, item?.invoiceId, item._id)}
                                    onUpdate={() => {}}
                                    handleEnterKey={async e => {
                                      if (e?.keyCode === 13) {
                                        await updateTaskHour(item._id, item)
                                        setTaskId('')
                                      }
                                    }}
                                  />
                                ) : (
                                  <P margin="0px 15px 0px 0px" fontWeight="300" align="center">
                                    {item.hours} Hours
                                  </P>
                                )}
                              </div>
                              <P margin="0px 0px 0px 30px" width={'20%'} fontWeight="500" align="center">
                                {' '}
                                {item?.task?.storyPoints}{' '}
                              </P>
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
      {tasksModal && <AddTasksModal onHide={hideTasksModal} onAdd={addTasks} />}
    </Container>
  )
}

const mapStateToProps = state => {
  return {
    projectDetails: state.Business.selectedBusiness,
    role: state.Auth.user.role,
    freelancerId: state.Auth.user.freelancers,
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
