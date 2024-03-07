import React from 'react'
import styled from 'styled-components'
import MobileDepartmentDetail from '../../../components/unzipped/dashboard/tasks/MobileDepartmentDetail'

const MobileBox = styled.div`
  @media screen and (min-width: 600px) {
    display: none;
  }
`

const DepartmentDetail = () => {
  return (
    <MobileBox>
      <MobileDepartmentDetail />
    </MobileBox>
  )
}
export default DepartmentDetail
