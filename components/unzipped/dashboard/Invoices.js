import React from 'react'
import styled from 'styled-components'

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

const Invoices = ({ selectedWeek, weekOptions }) => {
  return (
    <>
      {window.innerWidth >= 680 ? (
        <Desktop>
          <DesktopInvoicesTable />
        </Desktop>
      ) : (
        <MobileInvoicesView selectedWeek={selectedWeek} weekOptions={weekOptions} />
      )}
    </>
  )
}

export default Invoices
