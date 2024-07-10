import React from 'react'
import styled from 'styled-components'

import { Button } from '../ui'
import Bullet from '../ui/Bullet'
import { DarkText, TitleText, Underline } from './dashboard/style'

const Container = styled.div`
  border: 1px #555 solid;
  border-radius: 5px;
  height: 674px;
  width: 342px;
  display: flex;
  flex-flow: column;
  padding: 20px;
  @media (max-width: 680px) {
    margin-top: 10px;
  }
`

const Span = styled.span`
  font-weight: 300;
  font-size: 14px;
`

const PlanCard = ({ data, onClick }) => {
  return (
    <Container data-testid={`${data?.id}_plans`}>
      <TitleText bold size="24px" data-testid="name">
        {data?.name}
      </TitleText>
      <DarkText small marginLarge data-testid="description">
        {data?.description}
      </DarkText>
      <DarkText fontSize="32px" data-testid="cost">
        ${data?.cost} <Span>USD / month</Span>
      </DarkText>
      <Button margin="10px 0px" noBorder onClick={() => onClick(1)}>
        CHOOSE THIS PLAN
      </Button>
      <Underline color="#333" margin="5px 0px 15px 0px" />
      <TitleText>FEATURES</TitleText>
      <span data-testid="features">
        {data?.features.map(item => (
          <Bullet icon={item?.icon} text={item?.text} key={item?.text} />
        ))}
      </span>
    </Container>
  )
}

export default PlanCard
