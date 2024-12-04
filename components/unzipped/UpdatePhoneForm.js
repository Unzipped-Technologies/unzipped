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
 width: ${({ mobile }) => (mobile ? '100%' : '114px')};
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
  padding:  ${({ mobile }) => (mobile ? '0px' : '20px 0px')};
  display: flex;
  justify-content: ${({ mobile }) => (mobile ? 'flex-end' : 'start')};
  margin-top: ${({ mobile }) => (mobile ? '15px' : '0px')};
  margin-bottom: ${({ mobile }) => (mobile ? '30px' : '0px')};
  flex-direction: ${({ mobile }) => (mobile ? 'column-reverse' : 'row-reverse')};
  gap: ${({ mobile }) => (mobile ? '15px' : '0px')};
`

const UpdateKeyDataForm = ({ title, onBack, onSubmit, phone, error }) => {
  const isMobile = window.innerWidth >= 680 ? false : true

  const [PhoneError, setPhoneError] = useState('')
  const [userData, setUserData] = useState({
    currentPhone: '',
    phoneNumber: ''
  })

  useEffect(() => {
    setPhoneError(error)
  }, [error])

  useEffect(() => {
    setUserData({
      ...userData,
      currentPhone: phone ?? ''
    })
  }, [phone])

  const updateForm = (type, data) => {
    const filteredData = data?.replace(/[^\d()-\s]/g, '')
    setUserData({
      ...userData,
      [type]: filteredData
    })
  }

  const isFormValid = () => {

    const validatedPhoneNumber = userData.phoneNumber.replace(/\D/g, '');
    let fieldsFilled = userData.currentPhone && validatedPhoneNumber;
    if (!phone && validatedPhoneNumber) {
      fieldsFilled = true;
    }

    const noErrors = !PhoneError;
    const isNumberValid = validatedPhoneNumber.length === 10;

    return fieldsFilled && noErrors && isNumberValid;
  };


  const validatePhone = phone => {
    if (phone) {
      const phoneNumber = ValidationUtils._formatPhoneNumber(phone)
      const isNotValid = ValidationUtils._isValidPhoneNumber(phoneNumber)
      if (isNotValid) {
        setPhoneError('Enter a valid Phone Number!')
      } else {
        if (confirmPhoneNotMatch()) {
          setPhoneError('Must not be that same as current Phone!')
        } else {
          setPhoneError('')
        }
      }
    } else {
    }
  }

  const confirmPhoneNotMatch = () => {
    return userData.phoneNumber === userData.currentPhone
  }

  const validateAndFormatPhoneNumber = (phoneNumber) => {
    const phoneRegex = /^(1\s?)?(\(\d{3}\)|\d{3})([-.\s]?)\d{3}\2\d{4}$/;

    const cleanedNumber = phoneNumber.replace(/\D/g, '');

    let formattedNumber = '';
    if (cleanedNumber.length > 0) {
      formattedNumber += '(' + cleanedNumber.substring(0, 3);
    }
    if (cleanedNumber.length >= 3) {
      formattedNumber += ') ' + cleanedNumber.substring(3, 6);
    }
    if (cleanedNumber.length >= 6) {
      formattedNumber += '-' + cleanedNumber.substring(6, 10);
    }

    const isValid = phoneRegex.test(formattedNumber);


    return formattedNumber
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Backspace') {
      const cursorPosition = e.target.selectionStart;
      const pNumber = validateAndFormatPhoneNumber(userData.phoneNumber.slice(0, cursorPosition - 1));

      updateForm('phoneNumber', pNumber);

      setTimeout(() => {
        e.target.setSelectionRange(cursorPosition - 1, cursorPosition - 1);
      }, 0);
    }
  };

  return (
    <Container>
      <BackHeader title={title} />
      <Form
        data-testid="change_phone_form"
        mobile={isMobile}
        onSubmit={e => {
          e.preventDefault()
          onSubmit(userData)
        }}>
        <Box mobile={isMobile}>
          <FormField
            fieldType="input"
            placeholder="Current Phone"
            borderRadius={isMobile ? "4px" : "5px"}
            name="currentPhone"
            id="currentPhone"
            width="100%"
            zIndexUnset
            error={''}
            value={ValidationUtils._formatPhoneNumber(userData.currentPhone) ?? ''}
            disabled={true}>
            Current Phone
          </FormField>
          <FormField
            fieldType="input"
            placeholder="phone"
            borderRadius={isMobile ? "4px" : "5px"}
            name="phone"
            id="phone"
            width="100%"
            zIndexUnset
            error={PhoneError}
            validate={validatePhone}
            onChange={e => {
              updateForm('phoneNumber', validateAndFormatPhoneNumber(e.target.value))
            }}
            onKeyDown={handleKeyDown}
            value={userData.phoneNumber}>
            Phone
          </FormField>

          <ButtonContainer mobile={isMobile}>
            <ButtonBack type="button" onClick={onBack} data-testid="cancel_phone_changes"  mobile={isMobile}>
              Cancel
            </ButtonBack>
            <ButtonSubmit type="submit" disabled={!isFormValid()} data-testid="save_phone_changes"  mobile={isMobile}>
              Save
            </ButtonSubmit>
          </ButtonContainer>
        </Box>
      </Form>
    </Container>
  )
}

export default UpdateKeyDataForm
