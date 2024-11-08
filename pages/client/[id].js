import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import styled from 'styled-components'

import Nav from '../../components/unzipped/header'
import { getCurrentUserData, getProjectsList } from '../../redux/actions'
import ProfileTab from '../../components/unzipped/ProfileTab'
import ProfileCard from '../../components/unzipped/ProfileCard'
import ProjectsCard from '../../components/unzipped/ProjectsCard'
import MobileProfileCard from '../../components/unzipped/MobileProfileCard'
import MobileProfileCardOptions from '../../components/unzipped/MobileProfileCardOptions'
import MobileFreelancerFooter from '../../components/unzipped/MobileFreelancerFooter'

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
const Profile = ({ user, getCurrentUserData, getProjectsList, businesses }) => {
  const router = useRouter()
  const { id } = router.query
  const [interViewView, setInterViewView] = useState(true)
  const [refetch, setReFetch] = useState(false)
  const [selected, setSelected] = useState(0)
  const [userData, setUserData] = useState({})

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    refetch && fetchData()
  }, [refetch])

  const fetchData = async () => {
    await getCurrentUserData(id)
    setReFetch(false)
  }

  useEffect(() => {
    setUserData({
      ...userData,
      calendarSettings: user?.calendarSettings ?? null,
      FirstName: user?.FirstName ?? '',
      profileImage: user?.profileImage,
      LastName: user?.LastName ?? '',
      AddressLineCountry: user?.AddressLineCountry ?? '',
      updatedAt: user?.updatedAt,
      role: user?.role,
      isEmailVerified: user?.isEmailVerified,
      isPhoneVerified: user?.isPhoneVerified,
      isIdentityVerified: user?.isIdentityVerified,
      userId: user?._id
    })
  }, [user])

  useEffect(() => {
    // Below we are only sending pagination data, Other data we are using from redux store.
    const fetchData = async () => {
      await getProjectsList({
        limit: 'all',
        skip: 0
      })
    }

    fetchData()
  }, [])

  useEffect(() => {
    console.log('businesses', businesses)
    const projects = businesses.slice(0, 10).map(project => {
      return {
        ...project,
        projectName: project.name,
        images: project.projectImages,
        skills: project.requiredSkills
      }
    })
    setUserData({
      ...userData,
      projects: projects
    })
  }, [businesses])

  const handleValueFromChild = value => {
    setInterViewView(value)
  }
  return (
    <>
      <>
        {window.innerWidth > 680 && (
          <Container>
            <Nav marginBottom={'0px'} />
            <div>
              <ProfileCard user={userData} userId={userData?.userId} role={userData.role} />
            </div>
            <div style={{ width: '100%' }}>
              <ProfileTab tabs={['PROJECTS']} selected={selected} setSelected={setSelected} userId={userData?.userId} />
            </div>
            <ProjectsCard user={userData} setReFetch={setReFetch} />
          </Container>
        )}

        {window.innerWidth <= 680 && (
          <MobileContainer>
            {interViewView ? (
              <MobileProfileCard
                user={userData}
                setReFetch={setReFetch}
                handleProfilePage={handleValueFromChild}
                userId={userData?.userId}
              />
            ) : (
              <MobileProfileCardOptions
                handleProfilePage={handleValueFromChild}
                userId={userData?.userId}
                user={userData}
              />
            )}
            <MobileFreelancerFooter />
          </MobileContainer>
        )}
      </>
    </>
  )
}

const mapStateToProps = state => {
  return {
    user: state.Auth.user,
    loading: state.Loading.loading,
    businesses: state.Business?.projectList
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCurrentUserData: bindActionCreators(getCurrentUserData, dispatch),
    getProjectsList: bindActionCreators(getProjectsList, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
