import React from 'react'
import styled from 'styled-components'

import DashboardTable from './DashboardTable'

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  border-radius: 10px;
`

const ProjectsContainer = ({ limit, page }) => {
  return (
    <Container>
      <DashboardTable limit={limit} page={page} />
    </Container>
  )
}

export default ProjectsContainer
