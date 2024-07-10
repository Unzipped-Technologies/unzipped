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

const ClientMobileInvoices = ({ weekOptions, selectedWeek, role, freelancerId }) => {
  return (
    <InvoiceOverView>
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
    freelancerId: state?.Auth?.user?.freelancers?._id || ''
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientMobileInvoices)
