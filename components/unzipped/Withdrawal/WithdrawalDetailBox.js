import React, { useState } from 'react'
import styled from 'styled-components'
import { ValidationUtils } from '../../../utils';
import { FormField } from '../../ui';

const Container = styled.div`
    display: flex;
    position: relative;
    width: 100%;
    border: solid 1px #333;
    border-radius: 5px;
    max-width: 650px;
    width: 630px;
    @media(max-width: 1115px) {
        width: 585px;
    }
    @media(max-width: 975px) {
        width: 100%;
        max-width: 100%;
    }
`;

const LeftBox = styled.div``;
const RightBox = styled.div`
    display: flex;
    flex-flow: column;
    gap: 0px;
    position: absolute;
    right: 10px;
    top: 10px;
`;

const LeftTwo = styled.div``;
const RightTwo = styled.div``;

const Table = styled.div`
    padding: 20px 5px;
    margin-top: 20px;
`;

const RowTitleFixed = styled.div`
    text-align: ${({left}) => left ? 'left' : 'center'};
    min-width: 130px;
    font-weight: 600;
`;

const RowTitle = styled.div`
    text-align: ${({left}) => left ? 'left' : 'center'};
    min-width: 130px;
    font-weight: 600;
    @media(max-width: 600px) {
        text-align: left;
        min-width: 116px;
        font-weight: 600;
    }
    @media(max-width: 495px) {
        min-width: ${({smallMobile}) => smallMobile ? '90px' : '116px'};
    }
    @media(max-width: 442px) {
        min-width: ${({smallMobile}) => smallMobile ? '0px' : '116px'};
        width: ${({smallMobile}) => smallMobile ? '75px' : '116px'};
    }
    @media(max-width: 400px) {
        min-width: ${({smallMobile}) => smallMobile ? '0px' : '101px'};
        width: ${({smallMobile}) => smallMobile ? '75px' : '100px'};
    }
`;

const RowItem = styled.div`
    text-align: ${({left}) => left ? 'left' : 'center'};
    min-width: 130px;
    @media(max-width: 600px) {
        text-align: left;
        min-width: 116px;
    }
    @media(max-width: 495px) {
        min-width: ${({smallMobile}) => smallMobile ? '90px' : '116px'};
    }
    @media(max-width: 442px) {
        min-width: ${({smallMobile}) => smallMobile ? '0px' : '116px'};
        width: ${({smallMobile}) => smallMobile ? '75px' : '116px'};
    }
    @media(max-width: 400px) {
        min-width: ${({smallMobile}) => smallMobile ? '0px' : '101px'};
        width: ${({smallMobile}) => smallMobile ? '75px' : '100px'};
    }
`;
const Title = styled.div`
    font-size: 20px;
    font-weight: 600;
    padding: 10px 15px;
`;
const SubTitle = styled.div`
    font-size: 14px;
    padding: 0px 0px;
`;

const Row = styled.div`
    display: flex;
    justify-content: space-between;
    max-width: 250px;
    align-self: center;
    padding: ${({padding}) => padding ? padding : '4px 0px'};
    @media(max-width: 600px) {
        max-width: 100%;
    }
`;

const RightTitle = styled.div`
    font-size: 14px;
    font-weight: 600;
    text-align: center;
    line-height: 18px;
`;
const CostPanel = styled.div`
    font-size: 22px;
    font-weight: 600;
    text-align: center;
    @media(max-width: 550px) {
        font-size: 18px;
    }
`;

const SubText = styled.div`
    font-size: 12px;
    text-align: center;
    @media(max-width: 550px) {
        font-size: 10px;
    }
`;

const Form = styled.form`
    display: flex;
    flex-flow: column;
    gap: 15px;
    padding: 10px 15px;
`;

const ClearMobile = styled.span`
    width: 100%;
    @media(max-width: 600px) {
        display: none;
    }
`;

const Button = styled.button`
    width: 215px;
    height: 40px;
    outline: none;
    border: none;
    background-color: #1976D2;
    color: #fff;
    border-radius: 4px;
    font-size: 18px;
`;

const WithdrawalCard = ({onSubmit}) => {
    const [formDetails, setFormDetails] = useState({
        country: {label: 'United States', value: 1},
        type: {label: 'Express Withdrawal', value: 0},
        amount: '',
    })

    const updateForm = (type, data) => {
        setFormDetails({
            ...formDetails,
            [type]: data
        })
    }

    return (
        <Container>
            <LeftBox>
                <Title>Amount To Withdraw</Title> 
                <Form>  
                    <FormField
                        fieldType="select"
                        margin
                        fontSize='18px'
                        options={[{label: 'United States', value: 1}]}
                        noMargin
                        width="100%"
                        id="country"
                        zIndexUnset
                        disabled={true}
                        onChange={(e) => updateForm('country', e)}
                        value={formDetails.country}
                        >
                        Country of bank account:
                    </FormField>            
                    <LeftTwo>
                        <FormField
                            fieldType="input"
                            margin
                            fontSize='18px'
                            noMargin
                            width="100%"
                            id="amount"
                            zIndexUnset
                            onChange={(e) => updateForm('amount', e)}
                            value={formDetails.amount}
                            >
                            Withdraw amount
                        </FormField>  
                        <SubTitle>Note: Min amount $30 USD. Max amount $10,000.00 USD</SubTitle>          
                    </LeftTwo>
                    <FormField
                        fieldType="select"
                        margin
                        fontSize='18px'
                        options={[
                            {label: 'Express Withdrawal', value: 0},
                            {label: 'Payoneer', value: 1},
                            {label: 'Wire Transfer', value: 2},
                            {label: 'Freelancer Debit Card', value: 3},
                        ]}
                        noMargin
                        width="100%"
                        id="type"
                        zIndexUnset
                        onChange={(e) => updateForm('type', e)}
                        value={formDetails.type}
                        >
                        Type of Withdraw
                    </FormField>            
                </Form> 
                <Row padding="15px 15px 25px 20px">
                <LeftTwo>
                    <RowTitle left>Currency</RowTitle>
                    <RowItem left>USD</RowItem>
                </LeftTwo>
                <RightTwo>
                    <RowTitleFixed left>Balance</RowTitleFixed>
                    <RowItem left>$147.35</RowItem>
                </RightTwo>
                </Row>
            </LeftBox>
            <RightBox>
                <RightTitle>You will be charged <br/> up to</RightTitle>
                <CostPanel>$ 0.00 USD</CostPanel>
                <SubText>Note: There is a 5% payment fee</SubText>
                <Row padding="120px 0px">
                    <LeftTwo>
                        <RowTitle>Remaining Balance</RowTitle>
                        <RowItem>$100.00</RowItem>
                    </LeftTwo>
                </Row>
                <Button onClick={onSubmit}>Submit Application</Button>
            </RightBox>
        </Container>
    )
}

export default WithdrawalCard