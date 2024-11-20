import React from 'react'
import { DarkText, TitleText, WhiteCard, Underline } from './dashboard/style'
import styled from 'styled-components'
import { paymentFrequencyEnum } from '../../server/enum/planEnum'
import Button from '../ui/Button'
import Bullet from '../ui/Bullet'

const Container = styled.div`
  margin: 0px 10px 0px 0px;
  padding: 5px;
  width: 100%;
`

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  padding: 30px 0px;
  justify-content: flex-end;
`

const SubscriptionCard = ({
  submitSubscription,
  disabled,
  plans = [],
  dateCode,
  subscriptionName,
  planCost,
  subscriptionForm,
  selectedPlan
}) => {
  const plan = plans.find(e => e.id === selectedPlan)
  const calcPrice = months => {
    return planCost * (0.85 - 0.05 * months).toFixed(2)
  }
  // console.log('isDisabled', disabled)
  const calcPaymentFrequency = frequency => {
    switch (frequency) {
      case paymentFrequencyEnum.TRIYEARLY:
        return '3 years'
      case paymentFrequencyEnum.BIYEARLY:
        return '2 years'
      case paymentFrequencyEnum.YEARLY:
        return 'year'
      case paymentFrequencyEnum.MONTHLY:
        return '30 days'
    }
  }
  const total = (
    calcPrice(subscriptionForm?.paymentFrequency).toFixed(2) *
    (12 * subscriptionForm?.paymentFrequency > 0 ? 12 * subscriptionForm?.paymentFrequency : 1)
  )
    .toFixed(2)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')

  const isButtonEnabled =
    subscriptionForm?.paymentMethod &&
    subscriptionForm?.businessAddress &&
    selectedPlan;


  if (!isButtonEnabled) {
    console.log("Button disabled due to missing parameters:");
    if (!subscriptionForm?.paymentMethod) console.log("Missing: paymentMethod");
    if (!subscriptionForm?.businessAddress) console.log("Missing: businessAddress");
    if (!selectedPlan) console.log("Missing: selectedPlan");
  }

  return (
    <Container data-testid="receipt_card" id="receipt_card">
      <WhiteCard height={(selectedPlan + 1) * 50 + 450 + 'px'} padding="10px">
        <TitleText size="22px">{subscriptionName} Plan</TitleText>
        <DarkText>
          ${total} + tax every {calcPaymentFrequency(subscriptionForm?.paymentFrequency)}
        </DarkText>
        <DarkText>
          You will be charged ${total} + tax on {dateCode}, when your trial ends.
        </DarkText>
        <Underline color="#D8D8D8" width="100%" margin="5px 0px 20px 0px" />
        <TitleText>PLAN DETAILS</TitleText>
        <span data-testid="features">
          {plan?.features.map(item => (
            <Bullet icon={item.icon} text={item.text} key={item.text} />
          ))}
        </span>

        <ButtonContainer>
          <Button noBorder block type="black" onClick={() => submitSubscription()} disabled={!isButtonEnabled}>
            START PLAN
          </Button>
        </ButtonContainer>
      </WhiteCard>
    </Container>
  )
}

export default SubscriptionCard
