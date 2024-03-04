import React from 'react'
import styled from 'styled-components'

import MobileInvoicesView from './mobile/MobileInvoicesView'
import InvoicesTable from './InvoicesTable'
import Timesheet from './project/Timesheet'

const Desktop = styled.div`
  width: 100%;
  margin: auto;
  display: flex;
  flex-direction: row;
  @media (max-width: 680px) {
    display: none;
  }
`

const Invoices = ({ selectedWeek, weekOptions, role, businessId, invoice }) => {
  return (
    <>
      {window.innerWidth >= 680 ? (
        <Desktop>
          {role === 0 ? (
            invoice ? (
              <Timesheet businessId={businessId} invoice={invoice} />
            ) : (
              <InvoicesTable selectedWeek={selectedWeek} weekOptions={weekOptions} />
            )
          ) : (
            <Timesheet businessId={businessId} timeSheet={true} />
          )}
        </Desktop>
      ) : (
        <MobileInvoicesView selectedWeek={selectedWeek} weekOptions={weekOptions} />
      )}
    </>
  )
}

export default Invoices
