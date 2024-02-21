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

const UpdateKeyDataForm = ({ type, title, onBack, onSubmit, email }) => {
    const [currentEmailError, setCurrentEmailError] = useState("")
    const [EmailError, setEmailError] = useState("")
    const [userData, setUserData] = useState({
        currentEmail: email,
        email: ''
    })

    const updateForm = (type, data) => {
        setUserData({
            ...userData,
            [type]: data
        })
    }

    const isFormValid = () => {
        // Check if all email fields have some text
        const fieldsFilled = userData.currentEmail && userData.email;
    
        // Check if there are no error messages set
        const noErrors =  !EmailError;
    
        return fieldsFilled && noErrors;
    };

    const validateEmail = () => {
        const isNotValid = ValidationUtils._emailValidation(userData.email)
        if (isNotValid) {
            setEmailError("Enter a valid email address!")
        } else {
            if (confirmEmailNotMatch()) {
                setEmailError("Must not be that same as current email!")
            } else {
                setEmailError("")
            }
        }
    }

    const confirmEmailNotMatch = () => {
        return userData.email === userData.currentEmail
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
                        placeholder="Current Email"
                        borderRadius="10px"
                        name="currentEmail"
                        width="100%"
                        zIndexUnset
                        error={currentEmailError}
                        onBlur={() => {
                            validateEmail(
                                { 
                                    item: userData.currentEmail, 
                                    min: 1, 
                                    max: 45,
                                    message: "Please enter a valid Email!"
                                }, 
                                setCurrentEmailError
                            )
                        }}
                        validate={() => {
                            validateEmail(
                                { 
                                    item: userData.currentEmail, 
                                    min: 1, 
                                    max: 45,
                                    message: "Please enter a valid Email!"
                                }, 
                                setCurrentEmailError
                            )
                        }}
                        onChange={e => updateForm('currentEmail', e.target.value)}
                        value={userData.currentEmail}
                        disabled={true}
                    >Current Email</FormField>
                    <FormField
                        fieldType="input"
                        placeholder="email"
                        borderRadius="10px"
                        name="email"
                        width="100%"
                        zIndexUnset
                        error={EmailError}
                        onBlur={validateEmail}
                        validate={validateEmail}
                        onChange={e => updateForm('email', e.target.value)}
                        value={userData.email}
                    >Email</FormField>
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