import React from 'react'
import styled from 'styled-components'
import {
    LongArrow
} from '../icons'

const Container = styled.div`
    display: flex;;
    align-items: center;
    justify-content: center;
    width: 80vw;
    margin: 20px;
    position: relative;

    color: #FDFDFD;
`;

const Image = styled.img`
    height: auto;
    width: 100%;
    border-radius: 15px;
    position: relative;
`;

const Content = styled.div`
    height: 100%;
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    padding: 40px;
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
    margin: 120px 0px 40px 0px;
`;

const P = styled.p`
    font-weight: 400;
    font-size: 24px;
    line-height: 38.5px;
    letter-spacing: 0.5px;
`;

const Three = styled.div`
    display: grid;
    width: 100%;
    grid-template-columns: 1fr 1fr 1fr;
    justify-content: center;
    align-items: center;
`;

const Span = styled.p`
    font-weight: 700;
    font-size: 34px;
    line-height: 42px;

    letter-spacing: 0.5px;
    margin: 0px;
`;

const P2 = styled.p`
    margin: 0px;
`;

const GreenCard = styled.div`
    background: #8EDE64;
    border-radius: 25px;
    width: 366px;
    height: 223px;
    padding: 20px 20px;
    position: relative;
`;

const Action = styled.div`
    margin: 0px;
    position: absolute;
    bottom: 20px;
    right: 20px;
    display: flex;
    flex-flow: row;
    align-items: center;
`;

const Text = styled.div`
    font-weight: 600;
    font-size: 25px;
    line-height: 42px;

    letter-spacing: 0.5px;
    text-transform: uppercase;
    padding-right: 15px;
`;

const items = [
    {
        text: <P2>Post a Job<br/>
        and hire a pro</P2>,
        sub: 'HIRE NOW'
    },
    {
        text: <P2>Share equity<br/>
        and find partners</P2>,
        sub: 'START BUSINESS'
    },
    {
        text: <P2>Let us work<br/>
        for you</P2>,
        sub: 'START TODAY'
    },
]

const SectionThree = () => {
    return (
        <Container>
            <Image src="https://res.cloudinary.com/dghsmwkfq/image/upload/v1670086085/guy-phone_upj8ly.png" />
            <Content>
                <Title>FOR CLIENTS</Title>
                <Header>FIND TALENT YOUR <br/> WAY</Header>
                <P>Work with the largest network of independent <br/> 
                professionals and get things done—from quick <br/> 
                turnarounds to big transformations.
                </P>
                <Three>
                    {items.map(item => (
                        <GreenCard>
                            <Span>{item.text}</Span>
                            <Action><Text>{item.sub}</Text><LongArrow /></Action>
                        </GreenCard>
                    ))}
                </Three>
            </Content>
        </Container>
    )
}

export default SectionThree;