import React, { useState, useEffect, useMemo } from 'react'
import styled from 'styled-components'
import Nav from '../../../../../components/unzipped/header'
import Invoice from '../../../../../components/unzipped/dashboard/project/invoice'
import ClientMobileInvoices from '../../../../../components/unzipped/dashboard/mobile/ClinetMobileInvoices'

const Desktop = styled.div`
  @media (max-width: 680px) {
    display: none;
  }
`
const MobileDisplayBox = styled.div`
  margin-top: -40px;
  @media (min-width: 680px) {
    display: none;
  }
`

const Navbar = styled.div`
  margin-bottom: 160px;
  @media (max-width: 680px) {
    margin-bottom: 0px !important;
    margin-top: 0px !important;
    padding-bottom: 0px !important;
    padding-top: 0px !important;
  }
`

const FounderInvoice = ({}) => {
  const [selectedWeek, setSelectedWeek] = useState(null)
  const [weekOptions, setWeekOptions] = useState([])
  const [take, setTake] = useState('all')

  // In below useEffect options for week dropdown are creating.
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

  const handleWeekChange = value => {
    setSelectedWeek(value)
  }

  const handletake = value => {
    setTake(value)
  }

  return (
    <>
      <Navbar>
        <Nav isSubMenu />
      </Navbar>
      {window.innerWidth > 680 ? (
        <Desktop>
          <Invoice
            weekOptions={weekOptions}
            handletake={handletake}
            take={take}
            selectedWeek={selectedWeek}
            handleWeekChange={handleWeekChange}
          />
        </Desktop>
      ) : (
        <MobileDisplayBox>
          <ClientMobileInvoices
            weekOptions={weekOptions}
            selectedWeek={selectedWeek}
            handleWeekChange={handleWeekChange}
          />
        </MobileDisplayBox>
      )}
    </>
  )
}

export default FounderInvoice
