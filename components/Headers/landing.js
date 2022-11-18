import React from 'react'
import style from 'styled-components'

const Container = style.div`
    width: 100%;
    display: flex;
    justify-content: center;
    background-image: url("/img/background-landing");
`;

const IMG = style.img`
    max-width: 50%;
`;

const Landing = () => {
    return (
        <Container>
            <IMG
                alt="newsletter"
                src={
                "/img/newsletter-header.png"
                }
            />
        </Container>
    )
}

export default Landing