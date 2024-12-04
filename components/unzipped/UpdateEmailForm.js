import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import BackHeader from './BackHeader'
import FormField from '../ui/FormField'
import { ValidationUtils } from '../../utils'

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column;
  justify-items: center;
`

const Box = styled.div`
  gap: 15px;
  display: flex;
  max-width: 650px;
  flex-flow: column;
  padding: ${({ mobile }) => (mobile ? '5px' : '0px')};
`

const Form = styled.form`
  width: ${({ mobile }) => (mobile ? '96%' : '950px')};
  align-self: center;
  margin: 10px 0px;
  gap: 15px;
  display: flex;
  flex-flow: column;
`

const ButtonSubmit = styled.button`
  width:${({ mobile }) => (mobile ? '100%' : '114px')}; 
  height: 45px;
  background: #1772eb;
  color: #fff;
  outline: none;
  border: none;
  font-size: 16px;
  font-weight: 600;
  margin-right: ${({ mobile }) => (mobile ? '0px' : '15px')};
  border-radius: 4px;
  :disabled {
    cursor: default;
    opacity: 0.5;
    background: #d8d8d8;
  }
`

const ButtonBack = styled.button`
  width: ${({ mobile }) => (mobile ? '100%' : '114px')};  
  height: 45px;
  background: #ccc;
  color: #333;
  outline: none;
  border: none;
  font-size: 16px;
  font-weight: 600;
  margin-left: ${({ mobile }) => (mobile ? '0px' : '15px')};
  border-radius: 4px;
  :disabled {
    cursor: default;
    opacity: 0.5;
    background: #d8d8d8;
  }
`

const ButtonContainer = styled.div`
  padding: ${({ mobile }) => (mobile ? '0px' : '20px 0px')};
  display: flex;
  justify-content: ${({ mobile }) => (mobile ? 'flex-end' : 'start')};
  margin-top: ${({ mobile }) => (mobile ? '10px' : '0px')};
  margin-bottom: ${({ mobile }) => (mobile ? '30px' : '0px')};
  flex-direction: ${({ mobile }) => (mobile ? 'column-reverse' : 'row-reverse')};
  gap: ${({ mobile }) => (mobile ? '15px' : '0px')};
`

const UpdateKeyDataForm = ({ title, onBack, onSubmit, email, error }) => {
  const isMobile = window.innerWidth >= 680 ? false : true
  const [currentEmailError, setCurrentEmailError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [userData, setUserData] = useState({
    currentEmail: email,
    email: ''
  })
  useEffect(() => {
    setEmailError(error)
  }, [error])

  useEffect(() => {
    setUserData({
      ...userData,
      currentEmail: email
    })
  }, [email])

  const updateForm = (type, data) => {
    setUserData({
      ...userData,
      [type]: data
    })
  }

  const isFormValid = () => {
    // Check if all email fields have some text
    const fieldsFilled = userData.currentEmail && userData.email

    // Check if there are no error messages set
    const noErrors = !emailError

    return fieldsFilled && noErrors
  }

  const validateEmail = () => {
    const isNotValid = ValidationUtils._emailValidation(userData.email)
    if (isNotValid) {
      setEmailError('Enter a valid email address!')
    } else {
      if (confirmEmailNotMatch()) {
        setEmailError('Must not be that same as current email!')
      } else {
        setEmailError('')
      }
    }
  }

  const confirmEmailNotMatch = () => {
    return userData.email === userData.currentEmail
  }

  return (
    <Container>
      <BackHeader title={title} />
      <Form
        data-testid="change_email_form"
        mobile={isMobile}
        onSubmit={e => {
          e?.preventDefault()
          onSubmit(userData)
        }}>
        <Box mobile={isMobile}>
          <FormField
            fieldType="input"
            placeholder="Current Email"
            borderRadius={isMobile ? "4px" : "5px"}
            name="currentEmail"
            id="currentEmail"
            width="100%"
            zIndexUnset
            error={currentEmailError}
            value={userData.currentEmail}
            disabled={true}>
            Current Email
          </FormField>
          <FormField
            fieldType="input"
            placeholder="New Email"
            borderRadius={isMobile ? "4px" : "5px"}
            name="email"
            id="email"
            width="100%"
            zIndexUnset
            error={emailError}
            onBlur={validateEmail}
            validate={validateEmail}
            onChange={e => updateForm('email', e.target.value)}
            value={userData.email}>
            New Email
          </FormField>
          <ButtonContainer mobile={isMobile}>
            <ButtonBack type="button" onClick={onBack} data-testid="cancel_email_changes" mobile={isMobile}>
              Cancel
            </ButtonBack>
            <ButtonSubmit type="submit" disabled={!isFormValid()} data-testid="save_email_changes" mobile={isMobile}>
              Save
            </ButtonSubmit>
          </ButtonContainer>
        </Box>
      </Form>
    </Container>
  )
}

export default UpdateKeyDataForm
