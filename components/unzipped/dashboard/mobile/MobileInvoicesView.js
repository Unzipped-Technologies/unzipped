import React from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'

import ClientInvoices from './ClientInvoices'
import SingleWeekInvoiceView from './SingleWeekInvoiceView'
import MobileFreelancerFooter from '../../MobileFreelancerFooter'
import { connect } from 'react-redux'
import ProjectsInvoices from './ProjectsInvoices'
const MobileView = styled.div`
  background-color: #f7f7f7;
  @media (min-width: 680px) {
    display: none;
  }
`

const MobileInvoicesView = ({ selectedWeek, weekOptions, role, freelancerId, viewAll = false }) => {
  const router = useRouter()
  const { id } = router.query // Filter selected week invoices when selected week OR invoice data changes.

  return (
    <MobileView>
      {/* Show client invoices */}
      {role !== 1 && <ClientInvoices selectedWeek={selectedWeek} weekOptions={weekOptions} />}
      {/* Show freelancer invoices */}
      {role === 1 &&
        (viewAll && !id ? (
          <ProjectsInvoices />
        ) : (
          <SingleWeekInvoiceView
            weekOptions={weekOptions}
            selectedWeek={selectedWeek}
            freelancerId={freelancerId}
            timeSheet={true}
          />
        ))}
      <MobileFreelancerFooter />
    </MobileView>
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

export default connect(mapStateToProps, mapDispatchToProps)(MobileInvoicesView)
