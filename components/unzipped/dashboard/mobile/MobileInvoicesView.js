import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import ClientInvoices from './ClientInvoices'
import SingleWeekInvoiceView from './SingleWeekInvoiceView'
import MobileFreelancerFooter from '../../MobileFreelancerFooter'

const MobileView = styled.div`
  background-color: #f7f7f7;
  @media (min-width: 680px) {
    display: none;
  }
`

const MobileInvoicesView = ({ selectedWeek, weekOptions, role, freelancerId }) => {
  return (
    <MobileView>
      {/* Show client invoices */}
      {role !== 1 && <ClientInvoices selectedWeek={selectedWeek} weekOptions={weekOptions} />}
      {/* Show freelancer invoices */}
      {role === 1 && (
        <SingleWeekInvoiceView
          weekOptions={weekOptions}
          selectedWeek={selectedWeek}
          freelancerId={freelancerId}
          timeSheet={true}
        />
      )}
      <MobileFreelancerFooter />
    </MobileView>
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

export default connect(mapStateToProps, mapDispatchToProps)(MobileInvoicesView)
