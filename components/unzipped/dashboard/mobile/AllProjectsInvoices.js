import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { bindActionCreators } from 'redux'

import MobileInvoicesView from './MobileInvoicesView'
import MobileFreelancerFooter from '../../MobileFreelancerFooter'
import { getInvoices, updateInvoice } from '../../../../redux/Invoices/actions'

const InvoiceOverView = styled.div`
  width: 96%;
  margin-left: 2%;
  margin-right: 2%;
  background-color: #f7f7f7;
  border-radius: 4px;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.25);
  flex-direction: row;
`
const Select = styled.select`
  display: block;
  border: 0;
  width: fit-content;
  background-color: transparent;
  color: #222;
  font-family: Roboto;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 19.5px; /* 121.875% */
  letter-spacing: 0.15px;
  margin-bottom: -10px !important;
`

const AllProjectsInvoices = ({ role, invoices, getInvoices }) => {
  const [selectedWeek, setSelectedWeek] = useState(0)
  const [weekOptions, setWeekOptions] = useState([])

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
    getInvoices({ businessId: '', limit: 'all', page: 1 })
  }, [])

  return (
    <InvoiceOverView>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Select
          onChange={e => {
            setSelectedWeek(e.target.value)
          }}
          value={selectedWeek}>
          {weekOptions.map((week, index) => (
            <option key={index} value={index} style={{ fontSize: '4px' }}>
              Week of {week.startOfWeek.toDateString()} - {week.endOfWeek.toDateString()}
            </option>
          ))}
        </Select>
      </div>
      <MobileInvoicesView role={role} weekOptions={weekOptions} selectedWeek={selectedWeek} viewAll />
      <MobileFreelancerFooter />
    </InvoiceOverView>
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

export default connect(mapStateToProps, mapDispatchToProps)(AllProjectsInvoices)
