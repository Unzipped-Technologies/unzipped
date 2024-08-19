import React from 'react'
import styled from 'styled-components'

import { DIV } from './style'
import Timesheet from './project/Timesheet'
import DesktopInvoicesTable from './DesktopInvoiceTable'
import MobileInvoicesView from './mobile/MobileInvoicesView'

const Desktop = styled.div`
  width: 80%;
  margin: auto;
  display: flex;
  margin-top: 10px;
  flex-direction: row;
  @media (max-width: 680px) {
    display: none;
  }
`

const Invoices = ({ selectedWeek, weekOptions, role, businessId }) => {
  return (
    <>
      {window.innerWidth > 680 ? (
        <DIV width="100%" margin="auto" display="flex" flexDirection="row" boxSizing="border-box">
          {role === 0 ? (
            <Desktop>
              <DesktopInvoicesTable />
            </Desktop>
          ) : (
            <Timesheet businessId={businessId} timeSheet={true} />
          )}
        </DIV>
      ) : (
        <MobileInvoicesView selectedWeek={selectedWeek} weekOptions={weekOptions} />
      )}
    </>
  )
}

export default Invoices
