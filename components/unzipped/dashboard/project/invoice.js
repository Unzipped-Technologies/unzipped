import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { SearchBar } from '../../../ui'
import { ConverterUtils } from '../../../../utils'
import styled, { css } from 'styled-components'
import { FaRegCheckCircle } from 'react-icons/fa'
import { getInvoices, getBusinessById } from '../../../../redux/actions'

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
const TableTop = styled.div`
  padding: 20px 30px;
  border-radius: 10px 10px 0 0;
  display: flex;
  border: 1px solid #d9d9d9;
  background-color: rgba(217, 217, 217, 0.36);
  justify-content: space-between;
  width: 830px;
`
const TableDiv = styled.div`
  display: flex;
  flex-direction: row;
  text-align: -webkit-center;
  position: relative;
`
const TableInnerDiv = styled.div`
  max-width: 830px;
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
const CustomTable = styled.table`
  width: 100%;
  thead {
    border: 1px solid #bbb;
  }
  tbody {
    border-bottom: 1px solid #bbb;
    border-right: 1px solid #bbb;
    border-left: 1px solid #bbb;
    tr:nth-child(even) {
      background-color: ${props => (!props.displayFormat ? '#F7F7F7' : '')};
    }
  }
  th:first-child {
    padding: 0 0 0 43px;
    width: 40%;
  }
  th:last-child {
    width: 25%;
  }
  th:nth-child(3) {
    width: 20%;
  }
  th:nth-child(2) {
    width: 15%;
  }
  td:not(:first-child),
  th:not(:first-child) {
    text-align: center;
  }
  ${props =>
    props.displayFormat &&
    css`
      td:first-child {
        paddling-left: 43px;
        width: 40%;
      }
      td:last-child {
        width: 25%;
      }
      td:nth-child(3) {
        width: 20%;
      }
      td:nth-child(2) {
        width: 15%;
      }
    `}

  th {
    background: #f7f7f7;
    vertical-align: middle;
    text-align: left;
  }
`
const HoursDiv = styled.div`
  width: 300px;
  background: #fff;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  padding: 24px 15px;
  height: fit-content;
`

const Select = styled.select`
  display: block;
  border: 0;
  width: fit-content;
  background-color: transparent;
`

function Invoice({
  weekOptions,
  take = 25,
  getInvoices,
  getBusinessById,
  selectedWeek,
  handleWeekChange,
  invoices,
  projectDetails,
  role,
  displayFormat
}) {
  const router = useRouter()
  const { id, freelancer } = router.query
  const [filteredData, setFilteredData] = useState([])
  const [sortedData, setSortedData] = useState({})
  const [subTotal, setSubTotal] = useState(0)
  const [fee, setFee] = useState(0)
  const [totalAmount, setAmount] = useState(0)
  const [searchFilter, setSearchFilter] = useState('')
  useEffect(() => {
    getInvoices({
      businessId: id,
      freelancerId: freelancer,
      limit: take,
      page: 1
    })
    if (id !== undefined) {
      getBusinessById(id)
    }
  }, [])

  useEffect(() => {
    if (selectedWeek !== null && selectedWeek !== undefined && invoices?.length) {
      const filteredItems = invoices.filter(item => {
        const itemDate = new Date(item.createdAt)
        const startOfWeek = weekOptions[selectedWeek].startOfWeek
        const endOfWeek = weekOptions[selectedWeek].endOfWeek
        return itemDate >= startOfWeek && itemDate <= endOfWeek
      })
      setFilteredData(filteredItems)
    }
  }, [selectedWeek, invoices, weekOptions])

  useEffect(() => {
    if (selectedWeek !== null && selectedWeek !== undefined && filteredData !== null && invoices?.length) {
      const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
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
    setFee(fee)
    setAmount(totalAmount)
  }, [filteredData])

  const getStatusColor = ({ task }) => {
    if (task?.status.includes('inprogress')) {
      return '#FFA500'
    } else if (task?.status.includes('done')) {
      return '#198754'
    } else {
      return '#D8D8D8'
    }
  }

  const getTaskHours = weeklyTasks => {
    let taskHours = 0
    if (weeklyTasks?.length) {
      for (var task of weeklyTasks) {
        taskHours += task.hours
      }
    }
    return taskHours
  }

  const getContractRate = task => {
    for (var invoice of filteredData) {
      if (invoice?.freelancerId === task?.assignee) {
        return invoice?.contract.hourlyRate
      }
    }
  }

  const getData = ({ task }, key) => {
    for (var invoice of filteredData) {
      if (invoice?.freelancerId === task?.assignee) {
        return invoice?.freelancer.user[key]
      }
    }
  }
  const handleFilter = value => {
    setSearchFilter(value)
  }

  return (
    <>
      <div className="mb-5">
        <TableDiv>
          <div style={{ marginLeft: '270px' }}>
            <TableTop>
              <P margin="0px" fontSize="24px" fontWeight="500">
                {projectDetails?.name?.slice(0, 15)}
                {+projectDetails?.name?.length > 15 && '...'}
              </P>
              <Select
                onChange={e => {
                  handleWeekChange(e.target.value)
                }}>
                {weekOptions.map((week, index) => (
                  <option key={`week_${index}`} value={index}>
                    Week of {week.startOfWeek.toDateString()} - {week.endOfWeek.toDateString()}
                  </option>
                ))}
              </Select>
              <ButtonComp>SUBMIT</ButtonComp>
            </TableTop>
            {sortedData &&
              Object?.keys(sortedData)?.map((day, index) => {
                return (
                  <TableInnerDiv key={`${day}_${index}`}>
                    <CustomTable displayFormat={displayFormat}>
                      {!displayFormat ? (
                        <thead>
                          <tr>
                            <th>
                              {day} ({getTaskHours(sortedData[day])} HOURS)
                            </th>
                            <th>RATE</th>
                            <th>TIME SPENT</th>
                            <th>ASIGNEE</th>
                          </tr>
                        </thead>
                      ) : (
                        index === 0 && (
                          <thead>
                            <tr>
                              <th>TASK</th>
                              <th>RATE</th>
                              <th>TIME SPENT</th>
                              <th>ASIGNEE</th>
                            </tr>
                          </thead>
                        )
                      )}
                      <tbody>
                        {sortedData[day].length > 0 ? (
                          sortedData[day]?.map((item, itemIndex) => {
                            return (
                              <tr key={itemIndex} className={displayFormat && id % 2 === 0 && 'bg-light'}>
                                <td style={{ paddingLeft: '40px' }}>
                                  <FaRegCheckCircle size={15} color={getStatusColor(item)} />
                                  <span className="px-3">{item?.task?.taskName}</span>
                                </td>
                                <td>${getContractRate(item?.task)}</td>
                                <td>{item?.hours}</td>
                                <td>
                                  {' '}
                                  <img
                                    src={getData(item, 'profileImage')}
                                    style={{ width: '24px', height: '24px', borderRadius: '50%', marginRight: '6px' }}
                                  />
                                  {getData(item, 'FirstName') + ' ' + getData(item, 'LastName') ?? 'Anonymous'}
                                </td>
                              </tr>
                            )
                          })
                        ) : !displayFormat ? (
                          <tr>
                            <td className="px-5">No Records</td>
                          </tr>
                        ) : (
                          index === +Object.keys(sortedData).length - 1 &&
                          id == 0 && (
                            <tr>
                              <td className="px-5">No Records</td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </CustomTable>
                  </TableInnerDiv>
                )
              })}
          </div>
          {role === 1 ? (
            <HoursDiv>
              <div className="d-flex justify-content-between" style={{ borderBottom: '1px solid #777' }}>
                <P fontWeight="500">DAY</P>
                <P fontWeight="500">HOURS</P>
              </div>
              {sortedData &&
                Object?.keys(sortedData)?.map((day, index) => {
                  return (
                    <div className="d-flex justify-content-between" key={`day_hours_${index}`}>
                      <P fontWeight="500">{day}</P>
                      <P fontWeight="500">{sortedData[day].reduce((acc, obj) => acc + obj.hours, 0)}</P>
                    </div>
                  )
                })}
              <div className="d-flex justify-content-between" style={{ borderTop: '1px solid #777' }}>
                <P fontWeight="500">RATE</P>
                {filteredData && <P fontWeight="500">${filteredData[0]?.contract?.hourlyRate || 0} /HOUR</P>}
              </div>
              <div className="d-flex justify-content-between">
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
              <div className="d-flex justify-content-between" style={{ borderBottom: '1px solid #777' }}>
                <P fontWeight="500">Name</P>
                <P fontWeight="500">Amount</P>
              </div>
              {filteredData?.length
                ? filteredData?.map((invoice, index) => {
                    return (
                      <div className="d-flex justify-content-between" key={invoice._id}>
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
              <div className="d-flex justify-content-between" style={{ borderTop: '1px solid #777' }}>
                <P fontWeight="500">Subtotal</P>
                <P fontWeight="500">${subTotal}</P>
              </div>
              <div className="d-flex justify-content-between">
                <P fontWeight="500">FEE</P>
                <P fontWeight="500">${fee}</P>
              </div>
              <div className="d-flex justify-content-between">
                <P fontWeight="500">TOTAL</P>
                <P fontWeight="500">${totalAmount} </P>
              </div>
            </HoursDiv>
          )}
        </TableDiv>
      </div>
    </>
  )
}

const mapStateToProps = state => {
  return {
    invoices: state.Invoices.invoices,
    role: state.Auth.user.role,
    projectDetails: state.Business.selectedBusiness
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getInvoices: bindActionCreators(getInvoices, dispatch),
    getBusinessById: bindActionCreators(getBusinessById, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Invoice)
