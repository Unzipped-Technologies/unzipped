import React, { useState } from 'react'
import styled from 'styled-components'
import BackHeader from './BackHeader';
import FormField from '../ui/FormField'
import { ValidationUtils } from '../../utils'

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-flow: column;
    justify-items: center;
`;

const Box = styled.div`
    gap: 15px;
    display: flex;
    max-width: 650px;
    flex-flow: column;
`;

const Form = styled.form`
    width: 950px;
    align-self: center;
    margin: 10px 0px;
    gap: 15px;
    display: flex;
    flex-flow: column;
`;

const Title = styled.p`
    font-size: 16px;
    color: #333;
`;

const ButtonSubmit = styled.button`
    width: 95px;
    height: 45px;
    background: #1772EB;
    color: #fff;
    outline: none;
    border: none;
    font-size: 16px;
    font-weight: 600;
    margin-left: 15px;
    :disabled {
        cursor: default;
        opacity: 0.5;
        background: #D8D8D8;
    }
`;

const ButtonBack = styled.button`
    width: 114px;
    height: 45px;
    background: #CCC;
    color: #333;
    outline: none;
    border: none;
    font-size: 16px;
    font-weight: 600;
    margin-right: 15px;
    :disabled {
        cursor: default;
        opacity: 0.5;
        background: #D8D8D8;
    }
`;

const ButtonContainer = styled.div`
    padding: 20px 0px;
`;

const UpdateKeyDataForm = ({ type, title, onBack, onSubmit, phone }) => {
    const [currentPhoneError, setCurrentPhoneError] = useState("")
    const [PhoneError, setPhoneError] = useState("")
    const [userData, setUserData] = useState({
        currentPhone: phone,
        phone: ''
    })
    console.log(userData.phone)

    const updateForm = (type, data) => {
        const filteredData = data.replace(/[^\d()-\s]/g, '');
    
        setUserData({
            ...userData,
            [type]: filteredData
        });
    };

    const isFormValid = () => {
        // Check if all Phone fields have some text
        const fieldsFilled = userData.currentPhone && userData.phone;
    
        // Check if there are no error messages set
        const noErrors =  !PhoneError;
    
        return fieldsFilled && noErrors;
    };
    
    const validatePhone = (phone) => {
        const phoneNumber = ValidationUtils._formatPhoneNumber(phone)
        console.log('phone number', phoneNumber)
        const isNotValid = ValidationUtils._isValidPhoneNumber(phoneNumber)
        console.log(isNotValid)
        if (isNotValid) {
            setPhoneError("Enter a valid Phone Number!")
        } else {
            if (confirmPhoneNotMatch()) {
                setPhoneError("Must not be that same as current Phone!")
            } else {
                setPhoneError("")
            }
        }
    }

    const confirmPhoneNotMatch = () => {
        return userData.phone === userData.currentPhone
    }

    return (
        <Container>
            <BackHeader 
                title={title}
            />
            <Form onSubmit={() => onSubmit(userData)}>
                <Box>
                    <FormField
                        fieldType="input"
                        placeholder="Current Phone"
                        borderRadius="10px"
                        name="currentPhone"
                        width="100%"
                        zIndexUnset
                        error={currentPhoneError}
                        onBlur={() => {
                            validatePhone(
                                { 
                                    item: userData.currentPhone, 
                                    min: 1, 
                                    max: 45,
                                    message: "Please enter a valid Phone!"
                                }, 
                                setCurrentPhoneError
                            )
                        }}
                        validate={() => {
                            validatePhone(
                                { 
                                    item: userData.currentPhone, 
                                    min: 1, 
                                    max: 45,
                                    message: "Please enter a valid Phone!"
                                }, 
                                setCurrentPhoneError
                            )
                        }}
                        onChange={e => updateForm('currentPhone', e.target.value)}
                        value={ValidationUtils._formatPhoneNumber(userData.currentPhone)}
                        disabled={true}
                    >Current Phone</FormField>
                    <FormField
                        fieldType="input"
                        placeholder="phone"
                        borderRadius="10px"
                        name="phone"
                        width="100%"
                        zIndexUnset
                        error={PhoneError}
                        onBlur={() => {
                            validatePhone(ValidationUtils._formatPhoneNumber(userData.phone))
                            updateForm('phone', ValidationUtils._formatPhoneNumber(userData.phone))
                        }}
                        validate={validatePhone}
                        onChange={e => updateForm('phone', e.target.value)}
                        value={userData.phone}
                    >Phone</FormField>
                    <ButtonContainer>
                        <ButtonBack type="button" onClick={onBack}>Cancel</ButtonBack>
                        <ButtonSubmit type="submit" disabled={!isFormValid()}>Save</ButtonSubmit>
                    </ButtonContainer>
                </Box>
            </Form>
        </Container>
    )
}

export default UpdateKeyDataForm