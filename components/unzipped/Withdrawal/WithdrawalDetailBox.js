import React, { useState } from 'react'
import styled from 'styled-components'
import { ValidationUtils } from '../../../utils'
import { FormField } from '../../ui'

const Container = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  border: solid 1px #333;
  border-radius: 5px;
  max-width: 650px;
  width: 630px;
  @media (max-width: 1115px) {
    width: 585px;
  }
  @media (max-width: 975px) {
    width: 100%;
    max-width: 100%;
  }
  @media screen and (max-width: 680px) {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
`

const LeftBox = styled.div``
const RightBox = styled.div`
  display: flex;
  flex-flow: column;
  gap: 0px;
  position: absolute;
  right: 10px;
  top: 10px;
  @media screen and (max-width: 680px) {
    display: none;
  }
`

const LeftTwo = styled.div``
const RightTwo = styled.div``

const Table = styled.div`
  padding: 20px 5px;
  margin-top: 20px;
`

const RowTitleFixed = styled.div`
  text-align: left;
  min-width: 130px;
  font-weight: 600;
`

const RowTitle = styled.div`
  text-align: ${({ left }) => (left ? 'left' : 'center')};
  min-width: 130px;
  font-weight: 600;
  @media (max-width: 680px) {
    text-align: left;
    min-width: 116px;
    font-weight: 600;
  }
  @media (max-width: 495px) {
    min-width: 116px;
  }
  @media (max-width: 442px) {
    min-width: 116px;
    width: 116px;
  }
  @media (max-width: 400px) {
    min-width: 101px;
    width: 100px;
  }
`

const RowItem = styled.div`
  text-align: ${({ left }) => (left ? 'left' : 'center')};
  min-width: 130px;
  @media (max-width: 680px) {
    text-align: center;
    min-width: 116px;
  }
  @media (max-width: 495px) {
    min-width: 116px;
  }
  @media (max-width: 442px) {
    min-width: 116px;
    width: 116px;
  }
  @media (max-width: 400px) {
    min-width: 101px;
    width: 100px;
  }
`
const Title = styled.div`
  font-size: 20px;
  font-weight: 600;
  padding: 10px 15px;
`
const SubTitle = styled.div`
  font-size: 14px;
  padding: 0px 0px;
`

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 250px;
  align-self: center;
  padding: ${({ padding }) => (padding ? padding : '4px 0px')};
  @media (max-width: 680px) {
    max-width: 100%;
    padding: 10px;
  }
`

const RightTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  line-height: 18px;
`
const CostPanel = styled.div`
  font-size: 22px;
  font-weight: 600;
  text-align: center;
  @media (max-width: 550px) {
    font-size: 18px;
  }
`

const SubText = styled.div`
  font-size: 12px;
  text-align: center;
  @media (max-width: 550px) {
    font-size: 10px;
  }
`

const Form = styled.form`
  display: flex;
  flex-flow: column;
  gap: 15px;
  padding: 10px 15px;
`

const ClearMobile = styled.span`
  width: 100%;
  @media (max-width: 680px) {
    display: none;
  }
`

const Button = styled.button`
  width: 215px;
  height: 40px;
  outline: none;
  border: none;
  background-color: #1976d2;
  color: #fff;
  border-radius: 4px;
  font-size: 18px;
  :disabled {
    cursor: default;
    opacity: 0.5;
    background: #d8d8d8;
  }
`

const RightBoxMobile = styled.div`
  display: none;
  gap: 0px;
  @media screen and (max-width: 680px) {
    display: flex;
    flex-direction: column;
  }
`

const ButtonBoxMobile = styled.div`
  display: none;
  @media screen and (max-width: 680px) {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0px auto;
    padding-bottom: 10px;
    width: 100%;
  }
`
const WithdrawalCard = ({ onSubmit, balance, isBank }) => {
  const [formDetails, setFormDetails] = useState({
    country: { label: 'United States', value: 1 },
    type: { label: 'Express Withdrawal', value: 0 },
    amount: ''
  })

  const updateForm = (type, data) => {
    setFormDetails({
      ...formDetails,
      [type]: data
    })
  }

  const shouldDisableButton = (balance, formDetails) => {
    let instantAvailableAmount = 0
    // Extract the instant available amount and convert it to a standard numerical format (dollars)
    if (balance && balance?.instant_available) {
      instantAvailableAmount = balance?.instant_available[0]?.amount / 100
    }
    const formAmount = +formDetails.amount || 0

    // Condition 1: Check if the difference between the available amount and the form amount is negative
    const isNegativeBalanceAfterTransaction = instantAvailableAmount - formAmount < 0

    // Condition 2: Check if the available amount is less than the minimum required (e.g., $30)
    const isBelowMinimum = formAmount < 30

    // Condition 3: Check if the available amount exceeds the maximum allowed (e.g., $10,000)
    const isAboveMaximum = formAmount > 10000
    // The button should be disabled if any of the conditions above are true
    return isNegativeBalanceAfterTransaction || isBelowMinimum || isAboveMaximum || !isBank
  }
  const isDisabled = shouldDisableButton(balance, formDetails)

  return (
    <Container>
      <LeftBox>
        <Title>Amount To Withdraw</Title>
        <RightBoxMobile>
          <RightTitle>You can withdraw up to</RightTitle>
          <CostPanel id="withdraw_amout">
            ${' '}
            {balance && balance?.instant_available
              ? (balance?.instant_available[0]?.amount / 100).toFixed(2).toLocaleString()
              : 0}{' '}
            USD
          </CostPanel>
          <SubText>Note: refer to table for fees that may apply</SubText>
          <Row>
            <LeftTwo>
              <RowTitle>Remaining Balance</RowTitle>
              <RowItem id="remaining_balace">
                $
                {balance && balance?.instant_available
                  ? (balance?.instant_available[0]?.amount / 100 - (formDetails.amount || 0)).toFixed(2)
                  : 0}
              </RowItem>
            </LeftTwo>
          </Row>
        </RightBoxMobile>
        <Form id="withdraw_form">
          <FormField
            fieldType="select"
            margin
            fontSize="18px"
            options={[{ label: 'United States', value: 1 }]}
            noMargin
            width="100%"
            id="country"
            zIndexUnset
            disabled={true}
            value={formDetails.country}>
            Country of bank account:
          </FormField>
          <LeftTwo>
            <FormField
              fieldType="input"
              margin
              fontSize="18px"
              noMargin
              width="100%"
              id="amount"
              zIndexUnset
              onChange={e => updateForm('amount', e.target.value)}
              value={formDetails.amount}>
              Withdraw amount
            </FormField>
            <SubTitle>Note: Min amount $30 USD. Max amount $10,000.00 USD</SubTitle>
          </LeftTwo>
          <FormField
            fieldType="select"
            margin
            fontSize="18px"
            options={[
              { label: 'Express Withdrawal', value: 0 },
              { label: 'Payoneer', value: 1 },
              { label: 'Wire Transfer', value: 2 },
              { label: 'Freelancer Debit Card', value: 3 }
            ]}
            noMargin
            width="100%"
            id="type"
            zIndexUnset
            onChange={e => updateForm('type', e)}
            value={formDetails.type}>
            Type of Withdraw
          </FormField>
        </Form>
        <Row padding="15px 15px 25px 20px">
          <LeftTwo>
            <RowTitle left>Currency</RowTitle>
            <RowItem left>USD</RowItem>
          </LeftTwo>
          <RightTwo>
            <RowTitleFixed>Balance</RowTitleFixed>
            <RowItem left>
              $
              {balance && balance?.instant_available
                ? (balance?.available[0]?.amount / 100).toFixed(2).toLocaleString()
                : 0}
            </RowItem>
          </RightTwo>
        </Row>
      </LeftBox>

      <RightBox>
        <RightTitle>
          You can withdraw <br /> up to
        </RightTitle>
        <CostPanel>
          ${' '}
          {balance && balance?.instant_available
            ? (balance?.instant_available[0]?.amount / 100).toFixed(2).toLocaleString()
            : 0}{' '}
          USD
        </CostPanel>
        <SubText>Note: refer to table for fees that may apply</SubText>
        <Row padding="120px 0px">
          <LeftTwo>
            <RowTitle>Remaining Balance</RowTitle>
            <RowItem>
              $
              {balance && balance?.instant_available
                ? (balance?.instant_available[0]?.amount / 100 - (formDetails.amount || 0)).toFixed(2)
                : 0}
            </RowItem>
          </LeftTwo>
        </Row>

        <Button disabled={isDisabled} onClick={() => onSubmit(formDetails.amount)}>
          Submit Application
        </Button>
      </RightBox>
      <ButtonBoxMobile>
        <Button id="mobile_submit_button" disabled={isDisabled} onClick={() => onSubmit(formDetails.amount)}>
          Submit Application
        </Button>
      </ButtonBoxMobile>
    </Container>
  )
}

export default WithdrawalCard
