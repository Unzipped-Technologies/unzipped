import React, { useState } from 'react'
import styled from 'styled-components'
import BackHeader from '../BackHeader'
import Checkbox from '@material-ui/core/Checkbox';

const Container = styled.div`
    display: flex;
    flex-flow: column;
    align-items: center;
    @media screen and (max-width: 600px) {
        margin: 16px;
    }
`;

const Title = styled.div`
    font-size: 18px;
    font-weight: 600;
    text-align: center;
    padding: 20px;
    @media screen and (max-width: 600px) {
        font-size: 16px;
        padding: 15px;
        margin-top: 20px;
    }
`;

const TitleTwo = styled.div`
    font-size: 20px;
    font-weight: 600;
    text-align: center;
    padding: 30px;
    @media screen and (max-width: 600px) {
        font-size: 16px;
        padding: 5px;
    }
`;

const BulletContainer = styled.div`
    width: 555px;
    display: flex;
    flex-flow: column;
    align-items: center;
    padding: 30px;
    border-top: 2px #CCCCCC solid;
    border-bottom: 2px #CCCCCC solid;
    gap: 5px;
    @media screen and (max-width: 600px) {
        width: 405px;
        margin: 16px;
        gap: 8px;
    }
`;

const BulltetItem = styled.div`
    display: flex;
    padding: 10px;
    align-items: center;
    @media screen and (max-width: 600px) {
        padding: 0px;
        font-size: 14px;
    }
`;

const Bullet = styled.div`
    padding-left: 15px;
`;

const TermsOne = styled.div`
    padding: 25px 10px 5px 10px;
    @media screen and (max-width: 600px) {
        padding: 10px 10px 12px 10px;
        font-size: 12px;
    }
`;

const CheckContainer = styled.div`
    display: flex;
    align-items: center;
    @media screen and (max-width: 600px) {
        padding: 0px 15px 0px 13px;
    }
`;

const TermsCheck = styled.div`
    @media screen and (max-width: 600px) {
        font-size: 12px;
    }
`;

const Button = styled.button`
    margin: 40px;
    width: 215px;
    height: 40px;
    outline: none;
    border: none;
    background-color: ${({ disabled }) => (disabled ? '#D8D8D8' : '#1976D2')};
    color: #fff;
    border-radius: 4px;
    font-size: 18px;
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
    opacity: ${({ disabled }) => (disabled ? 0.85 : 1)};

    @media screen and (max-width: 600px) {
       margin: 30px;
       font-size: 14px;
    }
    
`;

const Notification = ({onSubmit}) => {
    const [check, setCheck] = useState(false)
    const isMobile = window.innerWidth > 680 ? false : true

    const bulletData = [
        {
            name: 'Transfer money securely from your unzipped account into your PayPal or your linked bank account.',
            icon: 'https://res.cloudinary.com/dghsmwkfq/image/upload/v1708747678/Icon_internet-banking_-online-bank_-bank_-university_sjhicv.png'
        },
        {
            name: 'Save time by setting up future dated or repeating withdrawals from your account.',
            icon: 'https://res.cloudinary.com/dghsmwkfq/image/upload/v1708747619/Icon_transaction-history_-clock_pea4pe.png'
        },
        {
            name: `Manage your upcoming withdrawals in one place conveniently. "Transfer activity."`,
            icon: 'https://res.cloudinary.com/dghsmwkfq/image/upload/v1708747646/Icon_piggy-bank-money_-saving_gwevmh.png'
        },
    ]
    return (
        <Container>
            <BackHeader 
                size={isMobile ? "14px": "18px"} 
                title="Express withdrawal"
            />
            <Title>Transfer Money</Title>
            <img src="https://res.cloudinary.com/dghsmwkfq/image/upload/v1708747474/Icon_transfer_-transfers_-money_-arrows_vgtf8f.png" />
            <TitleTwo>Activate money transfers</TitleTwo>
            <BulletContainer>
                {bulletData.map((item, index) => (
                    <BulltetItem>
                        <img width={32} height={32} src={item.icon} alt={item.name} />
                        <Bullet key={index}>{item.name}</Bullet>
                    </BulltetItem>
                ))}
            </BulletContainer>
            <TermsOne>To continue, read and accept the Transfers Agreement</TermsOne>
            <CheckContainer>
                <Checkbox checked={check} onClick={() => setCheck(!check)}></Checkbox>
                <TermsCheck>I accept the terms and conditions of the Transfers Agreement</TermsCheck>
            </CheckContainer>
            <Button disabled={!check} onClick={onSubmit}>Submit Application</Button>
        </Container>
    )
}

export default Notification