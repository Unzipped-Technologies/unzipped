import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 100vw;
    background-color: #001AFF;
    height: 590px;
`;

const ImageContainer = styled.div`
    max-width: 50vw;
    height: 100%;
    height: 590px;
`;

const Image = styled.img`
    height: 100%;
    width: auto;
`;

const Right = styled.div`
    display: grid;
    grid-template-rows: 1fr 2fr 1fr 1fr 2fr;
    justify-content: center;
    align-items: left;
    background-color: #001AFF;
    padding: 40px;
    letter-spacing: 0.39998px;
    text-transform: uppercase;
    color: #FDFDFD;
    max-height: 590px;
    
`;

const Title = styled.div`
    font-weight: 600;
    font-size: 24px;
    line-height: 19px;
`;

const Header = styled.div`
    font-weight: 500;
    font-size: 54px;
    line-height: 68px;
    margin: 40px 0px;
`;

const P = styled.p`
    font-weight: 400;
    font-size: 18px;
    line-height: 27px;
`;

const Three = styled.div`
    display: grid;
    width: 100%;
    grid-template-columns: 1fr 1fr 1fr;
`;

const P2 = styled.p`
    font-weight: 500;
    font-size: 16px;
    line-height: 25px;
    letter-spacing: 0.39998px;
    max-width: 180px;
`;

const Underline = styled.div`
    border: #fff 1px solid;
    height: 3px;
    background-color: #fff;
    border-radius: 2px;
    width: 90%;
    margin-top: 30px;
    margin-bottom: 20px;
`;

const items = [
    <P2>Find opportunities <br/> 
    for every stage of <br/> 
    your freelance<br/> 
    career</P2>,
    <P2>Control when, <br/> 
    where, and how 
    you work</P2>,
    <P2>Explore different <br/> 
    ways to earn</P2>,
]

const SectionTwo = () => {
    return (
        <Container>
            <ImageContainer>
                <Image src="https://res.cloudinary.com/dghsmwkfq/image/upload/v1670086084/girl-computer_s2igls.png" />
            </ImageContainer>
            <Right>
                <Title>FOR TALENT</Title>
                <Header>FIND GREAT <br/> WORK</Header>
                <P>Choose Projects you’re excited to work on and take your career 
                or business to new heights.
                </P>
                <Underline />
                <Three>
                    {items.map(item => 
                        item
                    )}
                </Three>
            </Right>
        </Container>
    )
}

export default SectionTwo;