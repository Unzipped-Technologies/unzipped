import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import styled from 'styled-components'
import Nav from '../../components/unzipped/header'
import ProfileCard from '../../components/unzipped/ProfileCard'
import ProfileTab from '../../components/unzipped/ProfileTab'
import { getCurrentUserData } from '../../redux/actions'
import MobileProfileCard from '../../components/unzipped/MobileProfileCard'
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
const Profile = ({ user, getCurrentUserData, role }) => {
  const [interViewView, setInterViewView] = useState(true)
  const [userData, setUserData] = useState({})
  const [selected, setSelected] = useState(0)

  useEffect(async () => {
    await getCurrentUserData()
  }, [])

  console.log('role', role, user)

  useEffect(() => {
    setUserData({
      ...selected,
      FirstName: user?.FirstName,
      profileImage: user?.profileImage,
      LastName: user?.LastName,
      AddressLineCountry: user?.AddressLineCountry,
      projects: user?.projects ?? [],
      freelancerSkills: user?.freelancerSkills ?? [],
      category: user?.category,
      likeTotal: user?.likeTotal,
      rate: user?.rate,
      updatedAt: user?.updatedAt,
      education: user?.education ?? [],
      rate: user?.rate,
      isAcceptEquity: user?.isAcceptEquity,
      _id: user?._id
    })
  }, [user])

  const handleValueFromChild = value => {
    setInterViewView(value)
  }
  return (
    <>
      <MobileProfileCard user={userData} handleProfilePage={handleValueFromChild} role={role} />
    </>
  )
}

const mapStateToProps = state => {
  return {
    user: state.Auth.user,
    role: state.Auth?.user?.role
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCurrentUserData: bindActionCreators(getCurrentUserData, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
