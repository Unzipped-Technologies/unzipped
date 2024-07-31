import React from 'react'
import { Badge, Icon } from '../ui'
import styled from 'styled-components'

const Container = styled.div`
  border: 1px solid #333;
  border-radius: 8px;
  padding: 12px 30px;
  margin: 10px 0px;
  width: 100%;
  min-height: 76px;
  ${({ first }) => (first ? 'margin-top: 24px' : '')};
  @media screen and (max-width: 600px) {
    padding: 10px;
  }
`

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 6px 0px;
  display: flex;
  min-height: 76px;
  align-items: center;
`

const Button = styled.button`
  width: 138px;
  height: 32px;
  border: #999999 solid 1px;
  color: #333;
  ${({ isSelected }) => isSelected && 'visibility: hidden;'}
  background: #fff;
  border-radius: 5px;
`

const Image = styled.img`
  height: 24px;
`

const Title = styled.div`
  min-width: 200px;
  max-width: 260px;
  font-size: 22px;
  font-weight: 600;
`

const Div = styled.div`
  display: flex;
`

const ButtonTwo = styled.div`
  transform: rotate(90deg);
  outline: none;
  border: none;
  left: 10px;
  position: relative;
`

const FormCard = ({ image, title, children, badge, isSelected, first, onClick }) => {
  return (
    <Container first={first} data-testid="address_card">
      {badge && (
        <Badge color="grey" data-testid="badge">
          {badge}
        </Badge>
      )}
      <Row>
        {image && <Image src={image} alt="address_card_image" />}
        <Title>{title}</Title>
        <Div>
          {window.innerWidth > 680 ? (
            <Button isSelected={isSelected} onClick={onClick}>
              Update
            </Button>
          ) : (
            <div onClick={onClick} data-testid="update_icon">
              <Icon name="edit" color="#333" />
            </div>
          )}

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
