import React, { useState, useEffect, useRef } from 'react'
import Head from 'next/head'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { useRouter } from 'next/router'
import UpdatePhoneForm from '../components/unzipped/UpdatePhoneForm'
import { updatePhoneNumber } from '../redux/actions'
import Nav from '../components/unzipped/header'
import { parseCookies } from '../services/cookieHelper'

import MobileFreelancerFooter from '../components/unzipped/MobileFreelancerFooter'
import Footer from '../components/unzipped/Footer'

import styled from 'styled-components';

const MainContainer = styled.div`
  min-height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const FooterContainer = styled.div`
  margin-top: auto;
`;

const Reset = ({ updateCurrentUser, token, phone }) => {
  const [loading, setLoading] = useState(false)
  const [phoneError, setPhoneError] = useState('')

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

  const changePhoneNumber = async data => {
    setLoading(true)
    const response = await updatePhoneNumber(data)
    if (response?.status === 200) {
      await router.push('/dashboard/account')
    } else {
      setPhoneError(response?.data?.message ?? 'Something went wrong')
    }
  }

  return (
    <MainContainer >
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap" rel="stylesheet"></link>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        <title>Change Phone | Unzipped</title>
        <meta name="Change Password | Unzipped" content="Change Password" />
      </Head>
      <Nav token={token} marginBottom={marginBottom} onBackArrowClick={() => linkPush('/dashboard/account')} />
      <UpdatePhoneForm
        type="phone"
        title="Change Phone"
        onBack={() => linkPush('/dashboard/account')}
        onSubmit={changePhoneNumber}
        phone={phone}
        error={phoneError}
      />

      {window.innerWidth >= 680 ? <FooterContainer><Footer /></FooterContainer> : <MobileFreelancerFooter defaultSelected="Account" />}

    </MainContainer>
  )
}

Reset.getInitialProps = async ({ req, res }) => {
  const token = parseCookies(req)

  return {
    token: token && token
  }
}

const mapStateToProps = state => {
  return {
    error: state.Auth.error,
    phone: state.Auth.user.phoneNumber
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updatePhoneNumber: bindActionCreators(updatePhoneNumber, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Reset)
