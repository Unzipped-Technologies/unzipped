import React, { useState } from 'react'
import styled from 'styled-components'
import BackHeader from '../BackHeader'
import Checkbox from '@material-ui/core/Checkbox'

const Container = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
`

const Title = styled.div`
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  padding: 20px;
`

const TitleTwo = styled.div`
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  padding: 30px;
`

const BulletContainer = styled.div`
  width: 555px;
  display: flex;
  flex-flow: column;
  align-items: center;
  padding: 30px;
  border-top: 2px #cccccc solid;
  border-bottom: 2px #cccccc solid;
`

const BulltetItem = styled.div`
  display: flex;
  padding: 10px;
  align-items: center;
`

const Bullet = styled.div`
  padding-left: 15px;
`

const TermsOne = styled.div`
  padding: 25px 10px 5px 10px;
`

const CheckContainer = styled.div`
  display: flex;
  align-items: center;
`

const TermsCheck = styled.div``

const Button = styled.button`
  margin: 40px;
  width: 215px;
  height: 40px;
  outline: none;
  border: none;
  background-color: #1976d2;
  color: #fff;
  border-radius: 4px;
  font-size: 18px;
`

export const bulletData = [
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
  }
]

const Notification = ({ onSubmit }) => {
  const [check, setCheck] = useState(false)

  return (
    <Container>
      <BackHeader title="Express withdrawal" />
      <Title>Transfer Money</Title>
      <img src="https://res.cloudinary.com/dghsmwkfq/image/upload/v1708747474/Icon_transfer_-transfers_-money_-arrows_vgtf8f.png" />
      <TitleTwo>Activate money transfers</TitleTwo>
      <BulletContainer>
        {bulletData.map((item, index) => (
          <BulltetItem key={`${item.name}_${index}`}>
            <img width={32} height={32} src={item.icon} alt={item.name} name={item.name} />
            <Bullet key={index}>{item.name}</Bullet>
          </BulltetItem>
        ))}
      </BulletContainer>
      <TermsOne>To continue, read and accept the Transfers Agreement</TermsOne>
      <CheckContainer>
        <Checkbox checked={check} onClick={() => setCheck(!check)} id="accept_terms"></Checkbox>
        <TermsCheck>I accept the terms and conditions of the Transfers Agreement</TermsCheck>
      </CheckContainer>
      <Button onClick={onSubmit}>Submit Application</Button>
    </Container>
  )
}

export default Notification
