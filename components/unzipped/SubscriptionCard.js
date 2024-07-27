import React, { useState } from 'react'
import { DarkText, TitleText, WhiteCard, Absolute } from './dashboard/style'
import styled from 'styled-components'
import { paymentFrequencyEnum } from '../../server/enum/planEnum'
import Radio from '@material-ui/core/Radio'
import Button from '../ui/Button'
import Image from '../ui/Image'
import { CircularProgress } from '@material-ui/core'

const Container = styled.div`
  margin: 0px 0px 0px 0px;
`

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  padding: 30px 0px;
  justify-content: flex-end;
`

const Blue = styled.span`
  color: #37dec5;
  font-size: 13px;
`

const SubscriptionCard = ({ planCost = 0, subscriptionForm, updateSubscription }) => {
  const isMobile = window.innerWidth >= 680 ? false : true

  const [isBillingCycle, setIsBillingCycle] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const billingCycleUpdate = () => {
    setIsBillingCycle(false)
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 750)
  }
  const calcPrice = months => {
    return planCost * (0.85 - 0.05 * months).toFixed(2)
  }

  const calcSavings = (cost, months) => {
    const price = planCost * months
    return (months * cost - price) * -1
  }

  const cards = [
    {
      id: paymentFrequencyEnum.TRIYEARLY,
      name: '3 YEARS',
      icon: 'radio',
      text: `$${calcPrice(paymentFrequencyEnum.TRIYEARLY).toFixed(2)} X 36 MONTHS`,
      save: `SAVE $${calcSavings(calcPrice(paymentFrequencyEnum.TRIYEARLY).toFixed(2), 36).toFixed(2)}`,
      onChange: updateSubscription
    },
    {
      id: paymentFrequencyEnum.BIYEARLY,
      name: '2 YEARS',
      icon: 'radio',
      text: `$${calcPrice(paymentFrequencyEnum.BIYEARLY).toFixed(2)} X 24 MONTHS`,
      save: `SAVE $${calcSavings(calcPrice(paymentFrequencyEnum.TRIYEARLY).toFixed(2), 24).toFixed(2)}`,
      onChange: updateSubscription
    },
    {
      id: paymentFrequencyEnum.YEARLY,
      name: 'YEARLY',
      icon: 'radio',
      text: `$${calcPrice(paymentFrequencyEnum.YEARLY).toFixed(2)} X 12 MONTHS`,
      save: `SAVE $${calcSavings(calcPrice(paymentFrequencyEnum.TRIYEARLY).toFixed(2), 12).toFixed(2)}`,
      onChange: updateSubscription
    },
    {
      id: paymentFrequencyEnum.MONTHLY,
      name: 'MONTHLY',
      icon: 'radio',
      text: `$${planCost.toFixed(2)} / MONTH`,
      save: undefined,
      onChange: updateSubscription
    }
  ]

  return (
    <Container>
      {isBillingCycle ? (
        <WhiteCard height="437px">
          <TitleText size="22px" paddingTop={isMobile ? '10px' : '0px'} paddingLeft={isMobile ? '10px' : '0px'}>
            Billing cycle
          </TitleText>
          <DarkText padding="0px 10px 0px 0px">
            Chose how often you’d like to be billed. You can cancel anytime.
          </DarkText>
          {cards.map((item, index) => (
            <WhiteCard
              shadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
              background="#EAEAEA"
              key={index}
              noMargin
              padding="5px 40px"
              borderRadius={index === 0 ? '10px 10px 0px 0px' : index === 3 ? '0px 0px 10px 10px' : '0px'}>
              <Absolute smallLeft top="0px">
                <Radio
                  data-testid={`${index}_card`}
                  checked={subscriptionForm?.paymentFrequency === item.id}
                  onClick={() => item.onChange({ paymentFrequency: item.id })}
                />
              </Absolute>
              <TitleText noMargin small>
                {item.name}
              </TitleText>
              <DarkText noMargin small>
                {item.text}
              </DarkText>
              {item.save && (
                <Absolute top="20px">
                  <Blue>{item.save}</Blue>
                </Absolute>
              )}
            </WhiteCard>
          ))}
          <ButtonContainer>
            <Button noBorder onClick={billingCycleUpdate}>
              CONFIRM BILLING CYCLE
            </Button>
          </ButtonContainer>
        </WhiteCard>
      ) : (
        <WhiteCard onClick={() => setIsBillingCycle(true)}>
          <TitleText size="22px" paddingTop={isMobile ? '10px' : '0px'} paddingLeft={isMobile ? '10px' : '0px'}>
            Billing cycle
          </TitleText>
          {isLoading && (
            <Absolute top="18px">
              <CircularProgress size={24} />
            </Absolute>
          )}
          {!isLoading && (
            <Absolute top="12px">
              <Image
                src="https://res.cloudinary.com/dghsmwkfq/image/upload/v1671323871/verifiedCheck_w902qa.png"
                alt="success"
                height="34px"
                width="34px"
                id="done_image"
              />
            </Absolute>
          )}
        </WhiteCard>
      )}
    </Container>
  )
}

export default SubscriptionCard
