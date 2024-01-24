import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import Nav from '../../components/unzipped/header'
import SearchBar from '../../components/ui/SearchBar'
import { parseCookies } from '../../services/cookieHelper'
import { TitleText } from '../../components/unzipped/dashboard/style'
import MobileProjects from '../../components/unzipped/dashboard/MobileProjects'
import ProjectsContainer from '../../components/unzipped/dashboard/ProjectsContainer'
import MobileFreelancerFooter from '../../components/unzipped/MobileFreelancerFooter'

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

  return (
    <React.Fragment>
      <Nav isSubMenu marginBottom={'86px'} />
      {window.innerWidth > 680 && (
        <Desktop>
          <Title>
            <TitleText title="true">Projects</TitleText>
          </Title>
          <SearchBar
            theme={{ tint3: '#C4C4C4' }}
            placeHolderColor={'#444444'}
            margin="0px"
            take={limit}
            setTake={setLimit}
          />
          <ProjectsContainer limit={limit} page={page} />
        </Desktop>
      )}
      {window.innerWidth < 680 && (
        <MobileDisplayBox>
          <MobileProjects />
          <MobileFreelancerFooter defaultSelected="Projects" />
        </MobileDisplayBox>
      )}
    </React.Fragment>
  )
}

Projects.getInitialProps = async ({ req, res }) => {
  const token = parseCookies(req)
  return {
    token: token && token
  }
}

export default Projects
