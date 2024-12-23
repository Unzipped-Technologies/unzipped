import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { bindActionCreators } from 'redux'
import Checkbox from '@material-ui/core/Checkbox'
import { connect, useDispatch } from 'react-redux'
import CircularProgress from '@material-ui/core/CircularProgress'

import theme from '../components/ui/theme'
import { ValidationUtils } from '../utils'
import Notification from '../components/animation/notifications'
import { registerUser, handleEmailRegistration } from '../redux/actions'
import { Text, FormField, Button, Image, Icon } from '../components/ui'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-family: 'Roboto';
`
const Box = styled.div`
  display: flex;
  background-color: #d9d9d9;
  width: 464px;
  height: 674px;
  flex-flow: column;
  justify-content: center;
  align-items: center;
`

const Sign = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 22px;
  line-height: 24px;

  text-align: center;
  letter-spacing: 0.39998px;
  text-transform: uppercase;

  color: #333333;
`

const Google = styled.button`
  background-color: #4285f4;
  outline: none;
  border: none;
  color: ${theme.text};
  border-radius: 24px;
  width: 80%;
  height: 44px;
  margin: 20px 10%;
  position: relative;
  cursor: pointer;
`

const Abs = styled.div`
  position: absolute;
  left: -2px;
  bottom: 0px;
`

const Span = styled.span`
  padding: 15px;
`

const Form = styled.form`
  position: relative;
  bottom: 20px;
  margin: 40px 0px 20px 0px;
  display: grid;
  height: 225px;
`

const Hold = styled.div`
  width: 79%;
`

const Or = styled.div`
  position: relative;
  font-size: 16px;
  z-index: 1;
  overflow: hidden;
  text-align: center;
  &:after {
    position: absolute;
    top: 51%;
    overflow: hidden;
    width: 50%;
    height: 1px;
    content: '\a0';
    background-color: #444;
  }
  &:before {
    position: absolute;
    top: 51%;
    overflow: hidden;
    width: 50%;
    height: 1px;
    content: '\a0';
    background-color: #444;
    margin-left: -50%;
    text-align: right;
  }
`

const TextBox = styled.div`
  display: flex;
  flex-flow: row;
  align-items: center;
`

const Contain = styled.div`
  position: relative;
  bottom: 25px;
  width: 80%;
  align-items: left;
  padding-top: ${({ passwordAlert }) => (passwordAlert ? '30px' : '0px')};
`

const Register = ({ loading, isEmailSent, error, registerUser }) => {
  const router = useRouter()
  const dispatch = useDispatch()

  const [emailAlert, setEmailAlert] = useState('')
  const [passwordAlert, setPasswordAlert] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [notifications, setNotifications] = useState('')
  const [user, setUser] = useState({
    email: '',
    password: ''
  })

  useEffect(() => {
    if (isEmailSent) {
      setNotifications('Email sent successfully.')
      router.push('/verify-email')
    } else {
      if (error) {
        setNotifications(error?.data)
        setTimeout(() => {
          setNotifications('')
        }, 1000)
      }
    }
  }, [isEmailSent, error])

  const updateUser = (field, value) => {
    setUser({
      ...user,
      [field]: value
    })
  }

  const handleKeyDown = async event => {
    if (event.key === 'Enter') {
      if (!user || !user.email || !user.password) return
      await RegisterUsers(user)
    }
  }

  const updateRememberMe = () => {
    setRememberMe(!rememberMe)
  }

  const validateEmail = () => {
    const error = !ValidationUtils._emailValidation(user.email)
    if (!error) {
      setEmailAlert('Please enter a valid email address')
      return false
    } else {
      setEmailAlert('')
      return true
    }
  }

  const validatePassword = () => {
    const error = ValidationUtils._strongPasswordValidation(user.password)

    if (!error && user.password) {
      setPasswordAlert('Password must be 8+ characters including numbers, 1 capital letter and 1 special character.')
      return false
    } else {
      setPasswordAlert('')
      return true
    }
  }

  ///Register
  const RegisterUsers = async () => {
    try {
      if (!user || !user.email || !user.password || !validatePassword() || !validateEmail()) return
      await registerUser(user)
    } catch (error) {
      setNotifications('Registration Failed')
      dispatch(handleEmailRegistration())
    }
  }

  const google = () => {
    router.push('/api/auth/google')
  }

  return (
    <React.Fragment>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap" rel="stylesheet"></link>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        <title>Unzipped | Register</title>
        <meta name="Unzipped | Register" content="Unzipped" />
      </Head>
      <Container id="signup">
        <Box>
          <Image src="/img/Unzipped-Primary-Logo.png" alt="logo" width="50%" />
          <Sign textAlign="center" level={2} fontWeight={500}>
            SIGN UP
          </Sign>
          <Google onClick={google}>
            REGISTER WITH GOOGLE
            <Abs>
              <Icon name="googleCircle" />
            </Abs>
          </Google>
          <Hold>
            <Or>
              <Span>OR</Span>{' '}
            </Or>
          </Hold>
          <Form>
            <FormField
              validate={validateEmail}
              error={emailAlert}
              placeholder="Email"
              name="email"
              id="email"
              type="email"
              fieldType="input"
              fontSize={'18px'}
              onChange={e => {
                updateUser('email', e?.target?.value?.toLowerCase())
              }}></FormField>

            <FormField
              validate={validatePassword}
              onKeyDown={handleKeyDown}
              error={
                <p
                  style={{
                    width: '350px',
                    whiteSpace: 'normal',
                    wordWrap: 'break-word'
                  }}>
                  {passwordAlert}
                </p>
              }
              placeholder="Password"
              name="password"
              id="password"
              margin={'10px 0px 0px 0px'}
              type="password"
              fieldType="input"
              fontSize={'18px'}
              bottom="0px"
              onChange={e => {
                updateUser('password', e?.target?.value)
              }}></FormField>
            <TextBox>
              <Checkbox
                id="remember_me"
                color="primary"
                checked={rememberMe}
                onClick={updateRememberMe}
                name="remember_me"></Checkbox>
              <Text>Remember Me</Text>
            </TextBox>
            <Button noBorder background="#1890FF" block type="submit" onClick={RegisterUsers}>
              {loading ? <CircularProgress size={18} /> : 'Sign up'}
            </Button>
          </Form>
          <Contain passwordAlert={passwordAlert}>
            <Text>
              {' '}
              Or <Link href="/login">log in now!</Link>
            </Text>
          </Contain>
          <Notification error={notifications} />
        </Box>
      </Container>
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  return {
    loading: state.Auth.loading,
    error: state.Auth.error,
    isEmailSent: state.Auth.isEmailSent
  }
}

const mapDispatchToProps = dispatch => {
  return {
    registerUser: bindActionCreators(registerUser, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)
