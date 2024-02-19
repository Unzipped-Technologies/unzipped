import React, { useState } from 'react'
import styled from 'styled-components'
import BackHeader from './BackHeader';
import FormField from '../ui/FormField'
import { useRouter } from 'next/router'
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

const UpdateKeyDataForm = ({ type, title, onBack, onSubmit }) => {
    const [currentPasswordError, setCurrentPasswordError] = useState("")
    const [PasswordError, setPasswordError] = useState("")
    const [confirmPasswordError, setConfirmPasswordError] = useState("")
    const [userData, setUserData] = useState({
        currentPassword: '',
        password: '',
        confirmPassword: ''
    })

    const updateForm = (type, data) => {
        setUserData({
            ...userData,
            [type]: data
        })
    }

    const isFormValid = () => {
        // Check if all password fields have some text
        const fieldsFilled = userData.currentPassword && userData.password && userData.confirmPassword;
    
        // Check if there are no error messages set
        const noErrors = !currentPasswordError && !PasswordError && !confirmPasswordError;
    
        return fieldsFilled && noErrors;
    };

    const validatePassword = () => {
        const isValid = ValidationUtils._strongPasswordValidation(userData.password)
        if (!isValid) {
            setPasswordError("Password must contain 1 capital letter and 1 special character!")
        } else {
            setPasswordError("")
        }
    }

    const confirmPasswordMatch = () => {
        const isMatch = userData.password === userData.confirmPassword

        if (!isMatch) {
            setConfirmPasswordError("Passwords do not match!")
        } else {
            setConfirmPasswordError("")
        }
    }

    return (
        <Container>
            <BackHeader 
                title={title}
            />
            <Form onSubmit={() => onSubmit(userData)}>
                <Title>Protect your account with a unique password at least 6 characters long.</Title>
                <Box>
                    <FormField
                        fieldType="input"
                        placeholder="Current Password"
                        borderRadius="10px"
                        name="currentPassword"
                        width="100%"
                        zIndexUnset
                        error={currentPasswordError}
                        onBlur={() => {
                            validatePassword(
                                { 
                                    item: userData.currentPassword, 
                                    min: 1, 
                                    max: 45,
                                    message: "Please enter a valid password!"
                                }, 
                                setCurrentPasswordError
                            )
                        }}
                        validate={() => {
                            validatePassword(
                                { 
                                    item: userData.currentPassword, 
                                    min: 1, 
                                    max: 45,
                                    message: "Please enter a valid password!"
                                }, 
                                setCurrentPasswordError
                            )
                        }}
                        onChange={e => updateForm('currentPassword', e.target.value)}
                        value={userData.currentPassword}
                    >Current Password</FormField>
                    <FormField
                        fieldType="input"
                        placeholder="Password"
                        borderRadius="10px"
                        name="password"
                        width="100%"
                        zIndexUnset
                        error={PasswordError}
                        onBlur={validatePassword}
                        validate={validatePassword}
                        onChange={e => updateForm('password', e.target.value)}
                        value={userData.password}
                    >Password</FormField>
                    <FormField
                        fieldType="input"
                        placeholder="Confirm Password"
                        borderRadius="10px"
                        name="confirmPassword"
                        width="100%"
                        zIndexUnset
                        error={confirmPasswordError}
                        onBlur={() => {
                            confirmPasswordMatch()
                        }}
                        validate={() => {
                            confirmPasswordMatch()
                        }}
                        onChange={e => updateForm('confirmPassword', e.target.value)}
                        value={userData.confirmPassword}
                    >Confirm Password</FormField>
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