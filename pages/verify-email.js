import React, { useState, useEffect, useRef } from 'react'
import router from 'next/router'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import CircularProgress from '@material-ui/core/CircularProgress'

import { Button } from '../components/ui'
import SvgComponent from '../components/ui/icons/SvgComponent'
import IconComponent from '../components/ui/icons/IconComponent'
import Notification from '../components/animation/notifications'
import { updateRegistrationCredentials, verifyUser } from '../redux/actions'

const Container = styled.div`
  * {
    font-size: 16px;
  }
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`

const InnerContainer = styled.div`
  width: 50%;
  background: #d9d9d9;
  text-align: center;
  padding: 70px 30px;
  border-radius: 35px;

  @media (max-width: 680px) {
    width: 96%;
  }
`

const Input = styled.input`
  border-radius: 16px !important;
  border: 1px solid #c4c4c4 !important;
  background: rgba(217, 217, 217, 0);
  width: 196px !important;
  color: #000;
  padding-left: 25px !important;
  margin: 0;
  height: 2.6rem;
  &::placeholder {
    color: black;
  }
`
const Form = styled.form`
  gap: 15px;
  display: flex;
  align-items: start;
  justify-content: center;
`
const EmailDiv = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: ${({ gap }) => (gap ? gap : '')};
  @media (max-width: 680px) {
    flex-wrap: wrap-reverse;
  }
`

const P = styled.p`
  color: #de4e4e;
  font-size: 16px;
  font-weight: 500;
  text-transform: uppercase;
`
const VerifyEmail = ({
  loading,
  userForm,
  error,
  isEmailSent,
  updateRegistrationCredentials,
  verifyUser,
  isEmailVerified
}) => {
  const mounted = useRef(false)
  const [showEmailChange, setSowEmailChange] = useState(false)
  const [email, setEmail] = useState(userForm.email)
  const [notifications, setNotifications] = useState('')

  useEffect(() => {
    if (isEmailVerified) {
      router.push('/dashboard')
    }
  }, [isEmailVerified])

  useEffect(() => {
    if (mounted.current) {
      if (isEmailSent) {
        setNotifications('Email sent successfully.')
      } else {
        if (error) {
          setNotifications(error?.data)
          setTimeout(() => {
            setNotifications('')
          }, 1000)
        }
      }
    }

    mounted.current = true
  }, [isEmailSent, error])

  const handleRequest = async () => {
    verifyUser(userForm)
  }

  const handleSubmit = () => {
    updateRegistrationCredentials(email)
  }

  return (
    <>
      <Container>
        <InnerContainer>
          <IconComponent name="messageEmailVerification" width="134" height="89" viewBox="0 0 134 89" fill="#37DEC5" />
          <p className="mt-5 mb-3">
            <b>VERIFY YOUR EMAIL TO PROCEED</b>
          </p>
          <p className="fw-light m-0">WE JUST SENT AN EMAIL TO THE ADDRESS:</p>
          <p className="fw-light m-0">PLEASE CHECK YOUR EMAIL AND CLICK ON THE LINK PROVIDED TO VERIFY YOUR ADDRESS.</p>
          <Button
            colors={{ text: '#4285F4', border: 'transparent' }}
            background="transparent"
            onClick={() => {
              setSowEmailChange(!showEmailChange)
            }}>
            <EmailDiv gap="3px">
              <SvgComponent name={!showEmailChange ? 'DownArrowVerifyEmail' : 'UpArrowVerifyEmail'} />
              CHANGE EMAIL
            </EmailDiv>
          </Button>
          <br />
          {showEmailChange && (
            <Form>
              <Input
                type="email"
                placeholder="UPDATE EMAIL"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required></Input>
              <Button
                colors={{ text: '#FFFFFF', border: '#E25050' }}
                background="#E25050"
                oval
                small
                onClick={handleSubmit}>
                UPDATE
              </Button>
            </Form>
          )}
          {!loading && isEmailSent && <P>Verification email has been sent!</P>}
          <EmailDiv gap="20px">
            <Button
              colors={{ text: '#37DEC5', border: '#37DEC5' }}
              background="transparent"
              oval
              onClick={() => {
                handleRequest()
              }}
              disabled={loading}>
              {loading && <CircularProgress size={18} />} Resend verification email
            </Button>
            <Button colors={{ text: '#363636', border: '#37DEC5' }} background="#37DEC5" oval>
              {' '}
              <a href="https://mail.google.com/mail/u/0/?pli=1#inbox" target="_blank" rel="noopener noreferrer">
                Go to Google Inbox
              </a>
            </Button>
          </EmailDiv>
        </InnerContainer>
      </Container>
      <Notification error={notifications} />
    </>
  )
}

const mapStateToProps = state => {
  return {
    isEmailVerified: state.Auth.user.isEmailVerified,
    loading: state.Auth.loading,
    error: state.Auth.error,
    isEmailSent: state.Auth.isEmailSent,
    userForm: state.Auth.userRegistrationForm
  }
}

const mapDispatchToProps = dispatch => {
  return {
    verifyUser: bindActionCreators(verifyUser, dispatch),
    updateRegistrationCredentials: bindActionCreators(updateRegistrationCredentials, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail)
