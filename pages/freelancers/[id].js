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
const Profile = ({ selectedFreelancer, getFreelancerById, role, freelancerId, loading, userId }) => {
  const router = useRouter()
  const { id } = router.query
  const [interViewView, setInterViewView] = useState(true)
  const [selected, setSelected] = useState(0)
  const [userData, setUserData] = useState({})

  useEffect(async () => {
    await getFreelancerById(id)
  }, [])

  useEffect(() => {
    setUserData({
      ...selected,
      FirstName: selectedFreelancer?.userId?.FirstName,
      profileImage: selectedFreelancer?.userId?.profileImage,
      LastName: selectedFreelancer?.userId?.LastName,
      AddressLineCountry: selectedFreelancer?.userId?.AddressLineCountry,
      projects: selectedFreelancer?.projects,
      freelancerSkills: selectedFreelancer?.freelancerSkills,
      category: selectedFreelancer?.category,
      likeTotal: selectedFreelancer?.likeTotal,
      rate: selectedFreelancer?.rate,
      updatedAt: selectedFreelancer?.updatedAt,
      education: selectedFreelancer?.education,
      rate: selectedFreelancer?.rate,
      isAcceptEquity: selectedFreelancer?.isAcceptEquity,
      _id: selectedFreelancer?._id,
      isPreferedFreelancer: selectedFreelancer?.isPreferedFreelancer,
      isEmailVerified: selectedFreelancer?.userId?.isEmailVerified,
      isPhoneVerified: selectedFreelancer?.userId?.isPhoneVerified,
      isIdentityVerified: selectedFreelancer?.userId?.isIdentityVerified
    })
  }, [selectedFreelancer])

  const handleValueFromChild = value => {
    setInterViewView(value)
  }
  return (
    <>
      <>
        <Container>
          <Nav marginBottom={'0px'} />
          <div style={{ overflow: 'overlay' }}>
            <ProfileCard user={userData} />
          </div>
          <div style={{ width: '100%' }}>
            <ProfileTab
              tabs={['PROJECTS']}
              selected={selected}
              setSelected={setSelected}
              role={role}
              freelancerId={freelancerId}
              userId={userData?._id}
            />
          </div>
          <ProjectsCard user={userData} freelancerId={freelancerId} />
        </Container>
        <MobileContainer>
          {interViewView ? (
            <MobileProfileCard user={userData} handleProfilePage={handleValueFromChild} role={role} freelancerId={id} />
          ) : (
            <MobileProfileCardOptions handleProfilePage={handleValueFromChild} freelancerId={id} userId={userId} />
          )}
        </MobileContainer>
      </>
    </>
  )
}

const mapStateToProps = state => {
  return {
    userId: state?.Auth?.user?._id,
    selectedFreelancer: state.Freelancers?.selectedFreelancer,
    role: state.Auth?.user?.role,
    freelancerId: state.Auth?.user?.freelancers,
    loading: state.Loading.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getFreelancerById: bindActionCreators(getFreelancerById, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
