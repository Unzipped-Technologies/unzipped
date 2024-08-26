import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import CircularProgress from '@material-ui/core/CircularProgress'
import { clearErrors, loadUser, resetMessageStore } from '../redux/actions'
import { useRouter } from 'next/router'
import Notification from '../components/animation/notifications'
import styled, { css, keyframes } from 'styled-components'
import { FormField, Image, Icon } from '../components/ui'
import theme from '../components/ui/theme'
import { ValidationUtils, Constants } from '../utils'

const height = typeof window !== 'undefined' ? window?.innerHeight + 'px' : '100vh'

const slideIn = keyframes`
  from {
    transform: translateY(-30%);
  }
  to {
    transform: translateY(0%);
  }
`

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${height};
  font-family: 'Roboto';
  overflow: hidden;
`
const Box = styled.div`
  display: flex;
  width: 364px;
  flex-flow: column;
  justify-content: center;
  align-items: center;
`

const BackButton = styled.div`
  position: absolute;
  top: 15px;
  left: 15px;
  cursor: pointer;
  @media (max-width: 680px) {
    display: none;
  }
`

const Sign = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 22px;
  line-height: 24px;
  text-align: center;
  letter-spacing: 0.39998px;
  text-transform: uppercase;
  margin: 20px 0 10px 0;
  color: #333333;
`

const Google = styled.button`
  background-color: #575bc7;
  outline: none;
  border: none;
  color: ${theme.text};
  width: 100%;
  height: 60px;
  position: relative;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  font-size: 14px;
  margin-top: 20px;
  &:hover {
    background-color: #5c67c7;
  }
`

const EmailButton = styled.button`
  background-color: #ffffff;
  outline: none;
  width: 100%;
  border: none;
  height: 60px;
  margin: 10px;
  position: relative;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  box-shadow: 1px 1px 5px 0px #00000033;
  font-size: 14px;
  letter-spacing: 0.4px;
  &:hover {
    background-color: #f4f5f8;
  }
  &:focus {
    background-color: #ffffff;
  }
`

const GoogleText = styled.span`
  margin-left: 15px;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.4px;
`

const LoginInputs = styled.div`
  display: block;
  transform: translateY(-25%);
  width: 100%;

  ${props =>
    props.showLoginForm &&
    css`
      animation: ${slideIn} 0.3s ease forwards;
    `}
`

const Login = ({ loading, loadUser, isAuthenticated, error, clearErrors, resetMessageStore }) => {
  const [emailAlert, setEmailAlert] = useState('')
  const [passwordAlert, setPasswordAlert] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [notifications, setNotifications] = useState('')
  const [showLoginForm, setShowLoginForm] = useState(false)
  const router = useRouter()
  const [user, setUser] = useState({
    email: '',
    password: ''
  })

  const updateUser = () => {
    setUser({
      email: email.toLowerCase(),
      password: password
    })
  }

  const handleKeyDown = event => {
    if (event.key === 'Enter') {
      loginUser()
    }
  }

  const updateEmail = e => {
    setEmail(e.target.value)
    updateUser()
  }

  const updatePassword = e => {
    setPassword(e.target.value)
    updateUser()
  }

  const validateEmail = () => {
    const error = !ValidationUtils._emailValidation(email)
    if (!error) {
      setEmailAlert(Constants.LOGIN_EMAIL_REQUIRED)
    } else {
      setEmailAlert('')
    }
    return error
  }

  const validatePassword = () => {
    const error = ValidationUtils._passwordValidation(password)
    if (!error) {
      setPasswordAlert(Constants.LOGIN_PASSWORD_REQUIRED)
    } else {
      setPasswordAlert('')
    }
    return error
  }

  const loginUser = async () => {
    if (!showLoginForm) {
      setShowLoginForm(true)
      return
    }
    if (!email || !password) {
      if (!email) {
        setEmailAlert(Constants.LOGIN_EMAIL_REQUIRED)
      }
      if (!password) {
        setPasswordAlert(Constants.LOGIN_PASSWORD_REQUIRED)
      }
      return
    }
    if (passwordAlert || emailAlert) {
      return
    }
    try {
      await loadUser(user)
      await resetMessageStore('')
    } catch (e) {}
  }

  const google = () => {
    router.push('/api/auth/google')
  }

  const back = () => {
    router.back()
  }

  useEffect(() => {
    updateUser()
  }, [email, password])

  useEffect(() => {
    if (isAuthenticated) {
      setNotifications('Login Successful')
      setTimeout(() => {
        router.push('/dashboard')
      }, 2000)
    } else {
      if (error?.data) {
        setNotifications(JSON.stringify(error?.data).replace('{', '').replace('}', ''))
        clearErrors()
      }
      setTimeout(() => {
        setNotifications('')
      }, 1000)
    }
  }, [isAuthenticated, error])

  return (
    <React.Fragment>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap" rel="stylesheet"></link>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        <title>Unzipped | Login</title>
        <meta name="Unzipped | Login" content="Unzipped" />
      </Head>
      <Container>
        {/* <BackButton onClick={back}> <Icon name="backArrow" /> </BackButton> */}
        <Box showLoginForm={showLoginForm}>
          <Image src="/img/unzipped-logo-mini.png" alt="logo" width="40%" />
          <Sign textAlign="center" level={2} fontWeight={500}>
            LOG IN TO UNZIPPED
          </Sign>
          <Google onClick={google}>
            <Icon name="googleLogo" />
            <GoogleText>CONTINUE WITH GOOGLE</GoogleText>
          </Google>

          {showLoginForm && (
            <LoginInputs showLoginForm={showLoginForm}>
              <FormField
                validate={validateEmail}
                error={emailAlert}
                placeholder="ENTER YOUR EMAIL ADDRESS... "
                name="email"
                type="email"
                fieldType="input"
                fontSize={'14px'}
                bottom="0px"
                onChange={updateEmail}
                borderColor="authInput"
                margin={'40px 0px 0px 0px'}
                width="100%"
              />
              <FormField
                validate={validatePassword}
                onKeyDown={handleKeyDown}
                error={passwordAlert}
                placeholder="ENTER YOUR PASSWORD..."
                name="password"
                type="password"
                fieldType="input"
                fontSize={'14px'}
                bottom="0px"
                onChange={updatePassword}
                borderColor="authInput"
                margin={'16px 0px 6px 0px'}
                width="100%"
              />
            </LoginInputs>
          )}
          <EmailButton noPadding color="black" background="#FFFFFF" block type="action" onClick={loginUser}>
            {loading ? <CircularProgress size={18} /> : 'CONTINUE WITH EMAIL'}
          </EmailButton>
          <Notification error={notifications} />
        </Box>
      </Container>
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.Auth.isAuthenticated,
    token: state.Auth.token,
    loading: state.Auth.loading,
    error: state.Auth.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadUser: bindActionCreators(loadUser, dispatch),
    clearErrors: bindActionCreators(clearErrors, dispatch),
    resetMessageStore: bindActionCreators(resetMessageStore, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
