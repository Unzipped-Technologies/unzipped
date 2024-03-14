import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import styled from 'styled-components'
import Nav from '../../components/unzipped/header'
import ProfileCard from '../../components/unzipped/ProfileCard'
import ProfileTab from '../../components/unzipped/ProfileTab'
import { getFreelancerById } from '../../redux/actions'
import MobileProfileCard from '../../components/unzipped/MobileProfileCard'
import MobileProfileCardOptions from '../../components/unzipped/MobileProfileCardOptions'
import ProjectsCard from '../../components/unzipped/ProjectsCard'

const Container = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  @media (max-width: 680px) {
    display: none;
  }
`
const MobileContainer = styled.div`
  @media (min-width: 680px) {
    display: none;
  }
`
const Profile = ({ selectedFreelancer, getFreelancerById, role }) => {
  const router = useRouter()
  const { id } = router.query
  const [interViewView, setInterViewView] = useState(true)
  const [selected, setSelected] = useState(0)

  useEffect(() => {
    getFreelancerById(id)
  }, [id])

  const handleValueFromChild = value => {
    setInterViewView(value)
  }
  return (
    <>
      <Container>
        <Nav marginBottom={'0px'} />
        <div style={{ overflow: 'overlay' }}>
          <ProfileCard user={selectedFreelancer} />
        </div>
        <div style={{ width: '100%' }}>
          <ProfileTab tabs={['PROJECTS']} selected={selected} setSelected={setSelected} role={role} />
        </div>
        <ProjectsCard user={selectedFreelancer} />
      </Container>
      <MobileContainer>
        {interViewView ? (
          <MobileProfileCard user={selectedFreelancer} handleProfilePage={handleValueFromChild} role={role} />
        ) : (
          <MobileProfileCardOptions handleProfilePage={handleValueFromChild} />
        )}
      </MobileContainer>
    </>
  )
}

const mapStateToProps = state => {
  return {
    selectedFreelancer: state.Freelancers?.selectedFreelancer,
    role: state.Auth?.user?.role
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getFreelancerById: bindActionCreators(getFreelancerById, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
