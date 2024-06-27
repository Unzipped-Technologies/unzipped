import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { bindActionCreators } from 'redux'

import Nav from '../components/unzipped/header'
import Footer from '../components/unzipped/Footer'
import { updateUserEmail } from '../redux/actions'
import UpdateKeyDataForm from '../components/unzipped/UpdateEmailForm'
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

const ChangeEmail = ({ email, updateUserEmail }) => {
  const [emailError, setEmailError] = useState('')
  const router = useRouter()

  const linkPush = link => {
    router.push(link)
  }

  const [marginBottom, setMarginBottom] = useState('0px')

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

  const resetPassword = async data => {
    const response = await updateUserEmail(data)
    if (response?.status === 400) {
      setEmailError(response?.data?.msg ?? 'Something went wrong!')
    } else {
      await router.push('/dashboard/account')
    }
  }

  return (
    <MainContainer>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap" rel="stylesheet"></link>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        <title>Change Email | Unzipped</title>
        <meta name="Change Email | Unzipped" content="Change Email" />
      </Head>
      <Nav marginBottom={marginBottom} />
      <UpdateKeyDataForm
        title="Change Email"
        onBack={() => linkPush('/dashboard/account')}
        onSubmit={resetPassword}
        email={email}
        error={emailError}
      />
      {window.innerWidth >= 680 ? (
        <FooterContainer>
          <Footer />
        </FooterContainer>
      ) : (
        <MobileFreelancerFooter defaultSelected="Account" />
      )}
    </MainContainer>
  )
}

const mapStateToProps = state => {
  return {
    email: state.Auth?.user.email
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateUserEmail: bindActionCreators(updateUserEmail, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangeEmail)
