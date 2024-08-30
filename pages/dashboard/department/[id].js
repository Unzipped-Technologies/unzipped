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
    <MobileBox data-testid="mobile_department_detail">
      <MobileDepartmentDetail />
    </MobileBox>
  )
}
export default DepartmentDetail
