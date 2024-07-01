import React, { useState } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'

import Nav from '../../../components/unzipped/header'
import { parseCookies } from '../../../services/cookieHelper'
import { getProjectsList } from '../../../redux/Business/actions'
import { TitleText } from '../../../components/unzipped/dashboard/style'
import MobileProjects from '../../../components/unzipped/dashboard/MobileProjects'
import ProjectsContainer from '../../../components/unzipped/dashboard/ProjectsContainer'
import MobileFreelancerFooter from '../../../components/unzipped/MobileFreelancerFooter'

const Desktop = styled.div`
  margin-top: 192px;
  @media (max-width: 680px) {
    display: none;
  }
`
const MobileDisplayBox = styled.div`
  @media (min-width: 680px) {
    display: none;
  }
`

const Title = styled.div`
  display: flex;
  flex-flow: row;
  width: 70%;
  margin: 60px 15% 40px 15%;
`

const Projects = () => {
  const [limit, setLimit] = useState(25)
  const [page, setPage] = useState(1)
  const dispatch = useDispatch()

  const [filter, setFilter] = useState({
    searchKey: ''
  })

  const handleSearch = () => dispatch(getProjectsList(filter))

  return (
    <React.Fragment>
      <Nav
        isSubMenu
        handleSearch={handleSearch}
        setFilter={setFilter}
        marginBottom={window.innerWidth > 680 ? '286px' : '86px'}
      />
      {window.innerWidth > 680 ? (
        <Desktop>
          <Title>
            <TitleText title="true" data-testid="projects_heading">
              Projects
            </TitleText>
          </Title>
          <ProjectsContainer limit={limit} page={page} />
        </Desktop>
      ) : (
        <MobileDisplayBox>
          <MobileProjects />
          <MobileFreelancerFooter defaultSelected="Projects" />
        </MobileDisplayBox>
      )}
    </React.Fragment>
  )
}

export default Projects
