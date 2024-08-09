import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { bindActionCreators } from 'redux'

import Nav from '../components/unzipped/header'
import { changePassword } from '../redux/actions'
import Footer from '../components/unzipped/Footer'
import UpdateKeyDataForm from '../components/unzipped/UpdatePasswordForm'
import MobileFreelancerFooter from '../components/unzipped/MobileFreelancerFooter'

const MainContainer = styled.div`
  min-height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
`

const FooterContainer = styled.div`
  margin-top: auto;
`

const Reset = ({ changePassword, accessToken }) => {
  const router = useRouter()

  const [passwordError, setPasswordError] = useState('')
  const [marginBottom, setMarginBottom] = useState('0px')

  useEffect(() => {
    if (!accessToken) {
      router.push('/login')
    }
  }, [])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 680) {
        setMarginBottom('72px')
      } else {
        setMarginBottom('77px')
      }
    }

    // Add an event listener for window resize
    window.addEventListener('resize', handleResize)

    // Initial call to set the marginBottom based on the current window width
    handleResize()

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const linkPush = link => {
    router.push(link)
  }

  const resetPassword = async userData => {
    const response = await changePassword(userData)
    if (response?.status === 200) {
      router.push('/dashboard')
    } else {
      setPasswordError(response?.data?.message ?? 'Something went wrong')
    }
  }

  return (
    <MainContainer>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap" rel="stylesheet"></link>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        <title>Change Password | Unzipped</title>
        <meta name="Change Password | Unzipped" content="Change Password" />
      </Head>
      <Nav marginBottom={marginBottom} />
      <UpdateKeyDataForm
        type="password"
        title="Change Password"
        onBack={() => linkPush('/dashboard/account')}
        onSubmit={resetPassword}
        error={passwordError}
      />
      {window.innerWidth >= 680 ? (
        <FooterContainer>
          <Footer />
        </FooterContainer>
      ) : (
        <MobileFreelancerFooter defaultSelected="Projects" />
      )}
    </MainContainer>
  )
}

const mapStateToProps = state => {
  return {
    accessToken: state.Auth?.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changePassword: bindActionCreators(changePassword, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Reset)
