import React from 'react'
import styled from 'styled-components'
import DashboardTable from './DashboardTable'

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  padding: 40px 12.5%;
  border-radius: 10px;
`

const ListPanel = ({ list, business, selectedList, type, businesses, loading, userType }) => {
  return (
    <Container>
      <DashboardTable
        list={list}
        business={business}
        selectedList={selectedList}
        businesses={businesses}
        type={type}
        loading={loading}
        userType={userType}
      />
    </Container>
  )
}

export default ListPanel
