import React from 'react'
import { Badge } from '../ui'
import styled from 'styled-components'

const Container = styled.div`
    border: 1px solid #333;
    border-radius: 8px;
    padding: 12px 30px;
    margin: 10px 0px;
    ${({first}) => first ? 'margin-top: 24px' : ''};
`;

const Row = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 6px 0px;
`;

const Button = styled.button`
    width: 138px;
    height: 32px;
    border: #999999 solid 1px;
    color: #333;
    background: #fff;
    border-radius: 5px;
`;

const Image = styled.img`
    height: 24px;
`;

const Title = styled.div`
    width: 240px;
`;

const FormCard = ({image, title, children, badge, isSelected, first}) => {
    return (
        <Container first={first}>
            {badge && <Badge color="grey">{badge}</Badge>}
            <Row>
                {image && <Image src={image} alt='credit-card'/>}
                <Title>{title}</Title>
                <Button>Update</Button>
            </Row>
            {children && children}
        </Container>
    )
}

export default FormCard