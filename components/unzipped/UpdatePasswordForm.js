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
`

const Form = styled.form`
  width: ${({ mobile }) => (mobile ? '96%' : '950px')};
  align-self: center;
  margin: 10px 0px;
  gap: 15px;
  display: flex;
  flex-flow: column;
  padding:${({ mobile }) => (mobile ? '10px' : '0px')};
`

const Title = styled.p`
  font-size: ${({ mobile }) => (mobile ? '14px' : '16px')};
  color: #333;
`

const ButtonSubmit = styled.button`
  width:${({ mobile }) => (mobile ? '100%' : '95px')};
  height: 45px;
  background: #1772eb;
  color: #fff;
  outline: none;
  border: none;
  font-size: 16px;
  font-weight: 600;
  margin-right:${({ mobile }) => (mobile ? '0px' : '15px')};
  border-radius: 4px;
  :disabled {
    cursor: default;
    opacity: 0.5;
    background: #d8d8d8;
  }
`

const ButtonBack = styled.button`
  width:${({ mobile }) => (mobile ? '100%' : '114px')};
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
  padding: 0px 0px;
  display: flex;
  justify-content: ${({ mobile }) => (mobile ? 'flex-end' : 'start')};
  margin-top: ${({ mobile }) => (mobile ? '12px !important' : '10px !important')};
  flex-direction:${({ mobile }) => (mobile ? 'column-reverse' : 'row-reverse')};
  gap: ${({ mobile }) => (mobile ? '15px' : '0px')};

`

const UpdateKeyDataForm = ({ title, onBack, onSubmit, error }) => {
  const isMobile = window.innerWidth >= 680 ? false : true

  const [passwordError, setPasswordError] = useState('')
  const [currentPasswordError, setcurrentPasswordError] = useState('')
  const [newPasswordError, setNewPasswordError] = useState('')
  const [confirmPasswordError, setconfirmPasswordError] = useState('')
  const [userData, setUserData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  })

  useEffect(() => {
    setPasswordError(error)
  }, [error])

  const updateForm = (type, data) => {
    setUserData({
      ...userData,
      [type]: data
    })
  }

  const isFormValid = () => {
    // Check if all password fields have some text
    const fieldsFilled = userData.currentPassword && userData.newPassword && userData.confirmNewPassword

    // Check if there are no error messages set
    const noErrors = !currentPasswordError && !currentPasswordError && !confirmPasswordError

    return fieldsFilled && noErrors
  }

  const validatePassword = () => {
    const isValid = ValidationUtils._strongPasswordValidation(userData.newPassword)
    if (!isValid && userData.newPassword) {
      setNewPasswordError('Password must be 8+ characters including numbers, 1 capital letter and 1 special character.')
    } else {
      setNewPasswordError('')
    }
  }

  const confirmPasswordMatch = () => {
    const isMatch = userData.newPassword === userData.confirmNewPassword

    if (!isMatch) {
      setconfirmPasswordError('Passwords do not match!')
    } else {
      setconfirmPasswordError('')
    }
  }

  return (
    <Container>
      <BackHeader title={title} />
      <Form
        data-testid="change_password_form"
        mobile={isMobile}
        onSubmit={e => {
          e?.preventDefault()
          onSubmit(userData)
        }}>
        <Title mobile={isMobile}>Protect your account with a unique password at least 6 characters long.</Title>
        <Box>
          <FormField
            fieldType="input"
            type="password"
            placeholder="Current Password"
            borderRadius={isMobile ? "4px" : "5px"}
            name="password"
            id="password"
            width="100%"
            zIndexUnset
            error={currentPasswordError}
            onBlur={() => {
              validatePassword(
                {
                  item: userData.currentPassword,
                  min: 1,
                  max: 45,
                  message: 'Please enter a valid password!'
                },
                setcurrentPasswordError
              )
            }}
            validate={() => {
              validatePassword(
                {
                  item: userData.currentPassword,
                  min: 1,
                  max: 45,
                  message: 'Please enter a valid password!'
                },
                setcurrentPasswordError
              )
            }}
            onChange={e => updateForm('currentPassword', e.target.value)}
            value={userData.currentPassword}>
            Current Password
          </FormField>
          <FormField
            fieldType="input"
            type="password"
            placeholder="New Password"
            borderRadius={isMobile ? "4px" : "5px"}
            name="newPassword"
            id="newPassword"
            width="100%"
            zIndexUnset
            error={newPasswordError}
            onBlur={validatePassword}
            validate={validatePassword}
            onChange={e => updateForm('newPassword', e.target.value)}
            value={userData.newPassword}>
            New Password
          </FormField>
          <FormField
            fieldType="input"
            type="password"
            placeholder="Confirm Password"
            borderRadius={isMobile ? "4px" : "5px"}
            name="confirmNewPassword"
            id="confirmNewPassword"
            width="100%"
            zIndexUnset
            error={confirmPasswordError}
            onBlur={() => {
              confirmPasswordMatch()
            }}
            validate={() => {
              confirmPasswordMatch()
            }}
            onChange={e => updateForm('confirmNewPassword', e.target.value)}
            value={userData.confirmNewPassword}>
            Confirm Password
          </FormField>
          {passwordError && <p className="red-text"> {passwordError}</p>}
          <ButtonContainer mobile={isMobile}>
            <ButtonBack type="button" onClick={onBack} data-testid="cancel_password_changes" mobile={isMobile}>
              Cancel
            </ButtonBack>
            <ButtonSubmit type="submit" disabled={!isFormValid()} data-testid="save_password_changes" mobile={isMobile}>
              Save
            </ButtonSubmit>
          </ButtonContainer>
        </Box>
      </Form>
    </Container>
  )
}

export default UpdateKeyDataForm
