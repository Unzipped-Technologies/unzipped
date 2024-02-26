import React from 'react'
import styled from 'styled-components'
import MobileTicketDetail from '../../../components/unzipped/dashboard/tasks/MobileTicketDetail'

const MobileBox = styled.div`
  @media screen and (min-width: 600px) {
    display: none;
  }
`

const TicketDetail = () => {
  return (
    <MobileBox>
      <MobileTicketDetail />
    </MobileBox>
  )
}
export default TicketDetail
