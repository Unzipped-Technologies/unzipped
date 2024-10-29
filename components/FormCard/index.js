import React from 'react'
import { Badge, Icon } from '../ui'
import styled from 'styled-components'

const Container = styled.div`
  border: 1px solid #333;
  border-radius: 8px;
  padding: 12px 30px;
  margin: 10px 0px;
  width: 100%;
  ${({ first }) => (first ? 'margin-top: 24px' : '')};
  @media screen and (max-width: 600px) {
    width: 100%;
    padding: 5px 5px;
  }
`

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 6px 0px;
  display: flex;
  align-items: center;
  @media screen and (max-width: 600px) {
    width: 100%;
    padding: 0px;
  }
  @media screen and (max-width: 420px) {
    width: 100%;
    flex-direction: column;
  }
`

const Button = styled.button`
  width: 138px;
  height: 32px;
  border: #999999 solid 1px;
  color: #333;
  ${({ isSelected }) => isSelected && 'visibility: hidden;'}
  background: #fff;
  border-radius: 5px;
  @media screen and (max-width: 600px) {
    width: 100%;
  }
`

const Image = styled.img`
  height: 24px;
`

const Title = styled.div`
  min-width: 240px;
  max-width: 300px;
`

const Div = styled.div`
  display: flex;
  @media screen and (max-width: 600px) {
    width: 100%;
  }
  @media screen and (max-width: 420px) {
    flex-flow: column;
    width: 100%;
    margin: 10px;
  }
`

const ButtonTwo = styled.div`
  transform: rotate(90deg);
  outline: none;
  border: none;
  left: 10px;
  position: relative;
  @media screen and (max-width: 600px) {
    display: none;
  }
`

const CustomBadge = styled.div`
  display: inline-block;
  padding: 4px 12px; /* Adjust padding to better match the screenshot */
  font-size: 12px;
  font-weight: bold;
  color: #3a3a3a; 
  background-color: #f0f0f0; 
  border-radius: 12px;
  text-align: center;
  min-width: 60px;
  margin-right: 10px;
  
`;


const FormCard = ({ image, title, children, badge, isSelected, first, onClick }) => {
  return (
    <Container first={first} data-testid="form_card">
      {badge && <CustomBadge color="grey">{badge}</CustomBadge>}
      <Row>
        {image && <Image src={image} alt="form_card_image" />}
        <Title>{title}</Title>
        <Div>
          <Button isSelected={isSelected} onClick={onClick}>
            Update
          </Button>
          <ButtonTwo>
            <Icon name="actionIcon" color="#333" />
          </ButtonTwo>
        </Div>
      </Row>
      {children && isSelected && children}
    </Container>
  )
}

export default FormCard
