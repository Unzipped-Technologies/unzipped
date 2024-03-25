import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { useRouter } from 'next/router'
import UpdateKeyDataForm from '../components/unzipped/UpdatePasswordForm'
import { changePassword } from '../redux/actions'
import Nav from '../components/unzipped/header'
import { parseCookies } from '../services/cookieHelper'

import MobileFreelancerFooter from '../components/unzipped/MobileFreelancerFooter'
import Footer from '../components/unzipped/Footer'

const Reset = ({ error, token, changePassword }) => {
  const [loading, setLoading] = useState(false)
  const [passwordError, setPasswordError] = useState('')
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

  const resetPassword = async userData => {
    setLoading(true)
    const response = await changePassword(userData)
    if (response?.status === 200) {
      await router.push('/dashboard')
    } else {
      setPasswordError(response?.data?.message ?? 'Something went wrong')
    }
  }

  return (
    <React.Fragment>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap" rel="stylesheet"></link>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        <title>Change Password | Unzipped</title>
        <meta name="Change Password | Unzipped" content="Change Password" />
      </Head>
      <Nav token={token} marginBottom={marginBottom} onBackArrowClick={() => linkPush('/dashboard/account')} />
      <UpdateKeyDataForm
        type="password"
        title="Change Password"
        onBack={() => linkPush('/dashboard/account')}
        onSubmit={resetPassword}
        error={passwordError}
      />
      {window.innerWidth >= 680 ? <Footer /> : <MobileFreelancerFooter defaultSelected="Projects" />}
    </React.Fragment>
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
    token: state.Auth.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changePassword: bindActionCreators(changePassword, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Reset)
