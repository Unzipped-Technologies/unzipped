import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import ClientInvoices from './ClientInvoices'
import MobileFreelancerFooter from '../../MobileFreelancerFooter'
import SingleWeekInvoiceView from './SingleWeekInvoiceView'

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

const ClientMobileInvoices = ({ weekOptions, selectedWeek, handleWeekChange, role, freelancerId }) => {
  return (
    <InvoiceOverView>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
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
      </div>

      {role !== 1 && <ClientInvoices weekOptions={weekOptions} selectedWeek={selectedWeek} />}
      {role === 1 && (
        <SingleWeekInvoiceView weekOptions={weekOptions} selectedWeek={selectedWeek} freelancerId={freelancerId} />
      )}
      <MobileFreelancerFooter />
    </InvoiceOverView>
  )
}

const mapStateToProps = state => {
  return {
    role: state.Auth.user.role,
    freelancerId: state?.Auth?.user?.freelancers || ''
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientMobileInvoices)
