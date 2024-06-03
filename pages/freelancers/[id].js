import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import styled from 'styled-components'

import Nav from '../../components/unzipped/header'
import { getFreelancerById } from '../../redux/actions'
import ProfileTab from '../../components/unzipped/ProfileTab'
import ProfileCard from '../../components/unzipped/ProfileCard'
import ProjectsCard from '../../components/unzipped/ProjectsCard'
import MobileProfileCard from '../../components/unzipped/MobileProfileCard'
import MobileProfileCardOptions from '../../components/unzipped/MobileProfileCardOptions'

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
const Profile = ({ selectedFreelancer, getFreelancerById, role, freelancerId, userId }) => {
  const router = useRouter()
  const { id } = router.query
  const [interViewView, setInterViewView] = useState(true)
  const [selected, setSelected] = useState(0)
  const [userData, setUserData] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      await getFreelancerById(id)
    }
    fetchData()
  }, [])

  useEffect(() => {
    setUserData({
      ...selected,
      FirstName: selectedFreelancer?.userId?.FirstName ?? '',
      profileImage: selectedFreelancer?.userId?.profileImage,
      LastName: selectedFreelancer?.userId?.LastName ?? '',
      AddressLineCountry: selectedFreelancer?.userId?.AddressLineCountry ?? '',
      projects: selectedFreelancer?.projects,
      freelancerSkills: selectedFreelancer?.freelancerSkills,
      category: selectedFreelancer?.category,
      likeTotal: selectedFreelancer?.likeTotal,
      dislikeTotal: selectedFreelancer?.dislikeTotal,
      rate: selectedFreelancer?.rate,
      updatedAt: selectedFreelancer?.updatedAt,
      education: selectedFreelancer?.education,
      rate: selectedFreelancer?.rate,
      isAcceptEquity: selectedFreelancer?.isAcceptEquity,
      _id: selectedFreelancer?._id,
      role: selectedFreelancer?.userId?.role,
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
        {window.innerWidth > 680 && (
          <Container>
            <Nav marginBottom={'0px'} />
            <div>
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
        )}

        {window.innerWidth <= 680 && (
          <MobileContainer>
            {interViewView ? (
              <MobileProfileCard
                user={userData}
                handleProfilePage={handleValueFromChild}
                role={role}
                freelancerId={freelancerId}
              />
            ) : (
              <MobileProfileCardOptions handleProfilePage={handleValueFromChild} freelancerId={id} userId={userId} />
            )}
          </MobileContainer>
        )}
      </>
    </>
  )
}

const mapStateToProps = state => {
  return {
    userId: state?.Auth?.user?._id,
    selectedFreelancer: state.Freelancers?.selectedFreelancer,
    role: state.Auth?.user?.role,
    freelancerId: state.Auth?.user?.freelancers?._id,
    loading: state.Loading.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getFreelancerById: bindActionCreators(getFreelancerById, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
