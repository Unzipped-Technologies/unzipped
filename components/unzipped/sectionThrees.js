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
    @media(max-width: 499px) {
        display: none;
    }
`;

const MobileImage = styled.img`
    height: auto;
    width: 100%;
    border-radius: 15px;
    position: relative;
    @media(min-width: 500px) {
        display: none;
    }
`;

const Content = styled.div`
    height: 100%;
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    padding: 40px;
    @media(max-width: 651px) {
        padding: 20px 30px;
    }
    @media(max-width: 481px) {
        padding: 10px 20px;
    }
    @media(max-width: 456px) {
        padding: 5px 10px;
    }
`;

const Title = styled.div`
    font-weight: 600;
    font-size: 24px;
    line-height: 19px;
    @media(max-width: 1326px) {
        font-size: 20px;
        font-weight: 500;
    }
    @media(max-width: 651px) {
        font-size: 17px;
    }
    @media(max-width: 605px) {
        width: 100%;
        text-align: right;
        font-size: 16px;
    }
`;

const Header = styled.div`
    font-weight: 500;
    font-size: 54px;
    line-height: 68px;
    margin: 120px 0px 40px 0px;
    @media(max-width: 1649px) {
        font-size: 42px;
        line-height: 60px;
        margin: 90px 0px 40px 0px;
    }
    @media(max-width: 1473px) {
        margin: 60px 0px 20px 0px;
    }
    @media(max-width: 1473px) {
        margin: 45px 0px 15px 0px;
    }
    @media(max-width: 1155px) {
        margin: 25px 0px 10px 0px;
        font-size: 34px;
        line-height: 40px;
    }
    @media(max-width: 651px) {
        margin: 20px 0px 5px 0px;
        font-size: 32px;
        line-height: 38px;
    }
    @media(max-width: 651px) {
        display: none;
    }
`;
const HeaderMobile = styled.div`
    font-family: 'Roboto';
    font-weight: 700;
    font-size: 36px;
    line-height: 44px;
    margin: 25px 0px 10px 0px;
    @media(min-width: 651px) {
        display: none;
    }
    @media(max-width: 651px) {
        margin: 10px 0px 10px 0px;
    }
    @media(max-width: 563px) {
        font-size: 32px;
        line-height: 40px;
        margin: 5px 0px 5px 0px;
    }
    @media(max-width: 499px) {
        margin: 35px 0px 25px 0px;
    }
    @media(max-width: 432px) {
        margin: 25px 0px 15px 0px;
        font-size: 28px;
        line-height: 36px;
    }
    @media(max-width: 370px) {
        margin: 25px 0px 105px 0px;
    }
    @media(max-width: 335px) {
        margin: 25px 0px 85px 0px;
    }
    @media(max-width: 308px) {
        margin: 25px 0px 65px 0px;
    }
`;

const P = styled.p`
    font-weight: 400;
    font-size: 24px;
    line-height: 38.5px;
    letter-spacing: 0.5px;
    @media(max-width: 1326px) {
        font-size: 20px;
        line-height: 26px;
        font-weight: 400;
    }
    @media(max-width: 981px) {
        margin-bottom: 70px;
    }
    @media(max-width: 726px) {
        font-size: 17px;
        line-height: 22px;
        margin-bottom: 50px;
    }
    @media(max-width: 651px) {
        font-size: 16px;
        line-height: 20px;
        margin-bottom: 40px;
    }
    @media(max-width: 563px) {
        font-size: 15px;
        line-height: 18px;
        margin-bottom: 40px;
    }
    @media(max-width: 499px) {
        display: none;
    }
`;

const PMobile = styled.p`
    font-size: 16px;
    line-height: 22px;
    margin-bottom: 60px;
    @media(min-width: 500px) {
        display: none;
    }
    @media(max-width: 432px) {
        font-size: 14px;
        line-height: 18px;
    }
    @media(max-width: 390px) {
        margin-bottom: 40px;
    }
    @media(max-width: 370px) {
        display: none;
    }
`;

const Three = styled.div`
    display: grid;
    width: 100%;
    position: absolute;
    bottom: 10%;
    grid-template-columns: 1fr 1fr 1fr;
    justify-content: center;
    align-items: center;
    @media(max-width: 1772px) {
        bottom: 40px;
    }
    @media(max-width: 1649px) {
        width: 90%;
        margin-left: 5%;
    }
    @media(max-width: 1473px) {
        margin-left: 1%;
        bottom: 25px;
    }
    @media(max-width: 1317px) {
        margin-left: 0%;
        left: 20px;
        width: 100%;
    }
    @media(max-width: 1248px) {
        width: 95%;
    }
    @media(max-width: 981px) {
        grid-template-columns: 1fr;
        position: relative;
    }
    @media(max-width: 521px) {
        left: 0px;
    }
`;

const Span = styled.p`
    font-weight: 700;
    font-size: 34px;
    line-height: 42px;

    letter-spacing: 0.5px;
    margin: 0px;
    @media(max-width: 1649px) {
        font-weight: 600;
        font-size: 30px;
        line-height: 36px;
    }
    @media(max-width: 1326px) {
        font-size: 24px;
        font-weight: 500;
        line-height: 30px;
    }
    @media(max-width: 726px) {
        font-size: 20px;
        line-height: 26px;
    }
    @media(max-width: 308px) {
        font-size: 16px;
        line-height: 22px;
    }
`;

const P2 = styled.p`
    margin: 0px;
`;

const ColorBlock = styled.p`
    position: absolute;
    width: 100%;
    height: 280px;
    left: 0px;
    bottom: -280px;
    z-index: 0;
    border-radius: 0px 0px 15px 15px;
    background: linear-gradient(180deg, #4A3D3D 9.23%, #150902 96.66%);
    @media(min-width: 982px) {
        display: none;
    }
    @media(max-width: 836px) {
        height: 330px;
        bottom: -330px;
    }
    @media(max-width: 726px) {
        height: 360px;
        bottom: -360px;
    }
    @media(max-width: 651px) {
        height: 320px;
        bottom: -320px;
    }
    @media(max-width: 521px) {
        height: 360px;
        bottom: -360px;
    }
    @media(max-width: 499px) {
        height: 320px;
        bottom: -320px;
    }
`;

const GreenCard = styled.div`
    background: #8EDE64;
    border-radius: 25px;
    width: 366px;
    height: 223px;
    padding: 20px 20px;
    position: relative;
    @media(max-width: 1649px) {
        width: 329px;
        height: 200px;
    }
    @media(max-width: 1411px) {
        width: 296px;
        height: 180px;
    }
    @media(max-width: 1199px) {
        width: 266px;
        height: 162px;
    }
    @media(max-width: 1078px) {
        width: 239px;
        height: 145px;
    }
    @media(max-width: 981px) {
        background: #14A800;
        width: 90%;
        height: 100px;
        padding: 10px 25px;
        margin: 5px;
        z-index: 10;
    }
    @media(max-width: 521px) {
        width: 100%;
    }
`;

const Action = styled.div`
    margin: 0px;
    position: absolute;
    bottom: 20px;
    right: 20px;
    display: flex;
    flex-flow: row;
    align-items: center;
    @media(max-width: 981px) {
        bottom: 5px;
    }
    @media(max-width: 726px) {
        bottom: 0px;
    }
    @media(max-width: 308px) {
        bottom: 10px;
    }
`;

const Text = styled.div`
    font-weight: 600;
    font-size: 25px;
    line-height: 42px;

    letter-spacing: 0.5px;
    text-transform: uppercase;
    padding-right: 15px;
    cursor: pointer;
    @media(max-width: 1326px) {
        font-size: 18px;
        font-weight: 500;
    }
    @media(max-width: 1078px) {
        font-size: 16px;
        font-weight: 400;
    }
    @media(max-width: 308px) {
        display: none;
    }
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
            <MobileImage src="https://res.cloudinary.com/dghsmwkfq/image/upload/v1674616271/guy-phone_mobile_jjp6kv.png" />
            <Content>
                <Title>FOR CLIENTS</Title>
                <Header>FIND TALENT YOUR <br/> WAY</Header>
                <HeaderMobile>FIND TALENT <br/> YOUR WAY</HeaderMobile>
                <P>Work with the largest network of independent <br/> 
                professionals and get things done—from quick <br/> 
                turnarounds to big transformations.
                </P>
                <PMobile>Work with the largest network of independent 
                professionals and get things done—from quick
                turnarounds to big transformations.
                </PMobile>
                <Three>
                    {items.map(item => (
                        <GreenCard>
                            <Span>{item.text}</Span>
                            <Action><Text>{item.sub}</Text><LongArrow /></Action>
                        </GreenCard>
                    ))}
                </Three>
            </Content>
            <ColorBlock />
        </Container>
    )
}

export default SectionThree;