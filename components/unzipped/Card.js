import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    position: relative;
    border: 0.25px solid #37DEC5;
    justify-content: center;
    align-items: center;
    margin: 15px 0px;
    border-radius: ${({borderRadius}) => borderRadius ? `${borderRadius}px` : '5px'}
`;

const Card = ({children, borderRadius}) => {
    return (
        <Container borderRadius={borderRadius}>
            {children}
        </Container>
    )
}

export default Card;