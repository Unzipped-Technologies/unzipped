import React, { useEffect, useState } from 'react'
import * as moment from 'moment'
import styled from 'styled-components'

import ClientInvoices from './ClientInvoiceView'
import SingleWeekInvoiceView from './SingleWeekInvoiceView'
import MobileFreelancerFooter from '../../MobileFreelancerFooter'

const MobileView = styled.div`
  background-color: #f7f7f7;
  @media (min-width: 680px) {
    display: none;
  }
`

const MobileInvoicesView = ({ role, invoices, selectedWeek }) => {
  const [weekInvoice, setWeekInvoice] = useState({})
  const [weekInvoices, setWeekInvoices] = useState([])

  // Filter selected week invoices when selected week OR invoice data changes.

  useEffect(() => {
    if (selectedWeek !== null && selectedWeek !== undefined && selectedWeek !== '') {
      const currentWeek = JSON.parse(selectedWeek)
      setWeekInvoice({})
      setWeekInvoices([])
      const newInvoices = []

      for (var invoice of invoices) {
        if (moment(invoice?.createdAt).isBetween(currentWeek.startOfWeek, currentWeek.endOfWeek, null, '[]')) {
          if (role === 1) {
            setWeekInvoice(invoice)
            break
          } else {
            newInvoices.push(invoice)
          }
        }
      }
      setWeekInvoices(newInvoices)
    }
  }, [selectedWeek, invoices])

  return (
    <MobileView>
      {/* Show client invoices */}
      {role !== 1 && <ClientInvoices weekInvoices={weekInvoices} />}
      {/* Show freelancer invoices */}
      {role === 1 && <SingleWeekInvoiceView weekInvoice={weekInvoice} />}
      <MobileFreelancerFooter />
    </MobileView>
  )
}
export default MobileInvoicesView
