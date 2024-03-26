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
    ${({first}) => first ? 'margin-top: 24px' : ''};
`;

const Row = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 6px 0px;
    display: flex;
    min-height: 76px;
    align-items: center;
`;

const Button = styled.button`
    width: 138px;
    height: 32px;
    border: #999999 solid 1px;
    color: #333;
    ${({isSelected}) => isSelected && 'visibility: hidden;'}
    background: #fff;
    border-radius: 5px;
`;

const Image = styled.img`
    height: 24px;
`;

const Title = styled.div`
    min-width: 240px;
    max-width: 300px;
    font-size: 22px;
    font-weight: 600;
`;

const Div = styled.div`
    display: flex;
`;

const ButtonTwo = styled.div`
    transform: rotate(90deg);
    outline: none;
    border: none;
    left: 10px;
    position: relative;
`;

const FormCard = ({image, title, children, badge, isSelected, first, onClick}) => {
    return (
        <Container first={first}>
            {badge && <Badge color="grey">{badge}</Badge>}
            <Row>
                {image && <Image src={image} alt='credit-card'/>}
                <Title>{title}</Title>
                <Div>
                    <Button isSelected={isSelected} onClick={onClick}>Update</Button>
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