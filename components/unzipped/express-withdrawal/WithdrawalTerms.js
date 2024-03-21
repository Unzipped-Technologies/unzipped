import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../../redux/actions';

const BlueCheckbox = withStyles({
    root: {
        color: 'blue',
        '&$checked': {
            color: '#1976D2',
        },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />);

const HeadingStyled = styled.h2`
    font-size: 20px;
    font-weight: 600;

`;

const TopContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    width: 100%;
    width: 1070px;
    @media screen and (max-width: 600px) {
        width: 100%;
        padding-bottom: 20px;
    }
`;
const MiddleSection = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    width: 100%;
    padding: 20px 0px;
    @media screen and (max-width: 600px) {
        padding: 10px 15px;
    }
`;

const Span = styled.span`
    font-size: 17px;
    font-weight: 400;
    font-family: 'Roboto';
    line-height: 24px;
    letter-spacing: 1px;
    margin-left: 15px;
    vertical-align: middle;
    width: ${({ width }) => width ? width : '530px'};
    display: inline-block;
    color: ${({ color }) => color ? color : '#000'};
    @media screen and (max-width: 600px) {
        width: 100%;
    }
`;
const Divider = styled.div`
    height: 2px; 
    width: 600px; 
    background: #CCCCCC;
    @media screen and (max-width: 600px) {
        width: 100%;
    }
`;
const P = styled.p`
    font-size: 17px;
    font-weight: 400;
    font-family: 'Roboto';
    line-height: 24px;
    letter-spacing: 1px;
    margin-left: ${({ marginLeft }) => marginLeft ? marginLeft : '15px'};
    vertical-align: middle;
    width: ${({ width }) => width ? width : '530px'};
    display: inline-block;
    color: ${({ color }) => color ? color : '#000'};
    @media screen and (max-width: 600px) {
        width: 100%;
    }
`;

const SubmitButton = styled.button`
    width: 200px;
    height: 40px;
    background: #1976D2;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    padding: 10px;
`;

const TextContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

const TermsSection = styled.div`
    display: flex;
    width: 100%;
`;

const WithdrawalTerms = ({ user, token }) => {
    const dispatch = useDispatch();
    const [isAgreed, setIsAgreed] = React.useState(false);
    const handleChange = () => setIsAgreed(!isAgreed);
    const handleUserAgreement = () => {
        dispatch(updateUser({ isAgreeTransferTerms: true }, token))
    }
    return (
        <TopContent>
            <HeadingStyled>Transfer Money</HeadingStyled>
            <TopContent>

                <img src='http://res.cloudinary.com/dghsmwkfq/image/upload/v1711042882/6396408a63b1433960a39821/ci4k80hagztaj8ffxaf1.png' />
            </TopContent>
            <HeadingStyled style={{ marginTop: '5px' }}>Activate Money Transfer</HeadingStyled>
            <Divider></Divider>
            <MiddleSection>
                <TextContainer>
                    <span>
                        <img
                            width={"32px"}
                            height={"32px"}
                            src='https://res.cloudinary.com/dghsmwkfq/image/upload/v1711043089/6396408a63b1433960a39821/uv1puao8axrtf7ci3y8k.png' />
                    </span>
                    <Span>
                        Transfer money securely from your unzipped account into your PayPal or your linked bank account.
                    </Span>
                </TextContainer>
                <TextContainer>
                    <span>
                        <img
                            width={"32px"}
                            height={"32px"}
                            src="http://res.cloudinary.com/dghsmwkfq/image/upload/v1711043265/6396408a63b1433960a39821/ip5wyj2jhmg0f0kkqmmk.png" />
                    </span>
                    <Span>
                        Save time by setting up future dated or repeating withdrawals from your account.
                    </Span>
                </TextContainer>
                <TextContainer>
                    <span>
                        <img
                            width={"32px"}
                            height={"32px"}
                            src='http://res.cloudinary.com/dghsmwkfq/image/upload/v1711042882/6396408a63b1433960a39821/ci4k80hagztaj8ffxaf1.png' />
                    </span>
                    <Span>
                        Manage your upcoming withdrawals in one place conveniently.
                        Transfer activity.
                    </Span>
                </TextContainer>
            </MiddleSection>
            <Divider></Divider>

            <TextContainer style={{ paddingLeft: 30, alignItems: 'center' }}>
                <P>
                    To continue, read and accept the
                    <span style={{ color: '#0057FF', display: 'inline-flex', marginLeft: '2px' }}>
                        Transfers Agreement
                    </span>
                </P>
            </TextContainer>
            <TermsSection>
                <BlueCheckbox
                    size='small'
                    checked={isAgreed}
                    onClick={handleChange}
                    inputProps={{ 'aria-label': 'secondary  checkbox' }}
                    sx={{ color: 'red' }}
                />
                <Span>I accept the terms and conditions of the Transfers Agreement</Span>
            </TermsSection>
            <SubmitButton onClick={handleUserAgreement} >SUBMIT APPLICATION</SubmitButton>

        </TopContent>
    )
}

export default WithdrawalTerms