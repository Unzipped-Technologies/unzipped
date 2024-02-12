import React from 'react'
import styled from 'styled-components'
import { 
    Title 
} from './textStyles'
import Button from '../ui/Button';
import Buttons from '../ui/Buttons';
import {useRouter} from 'next/router';

const Container = styled.div`
    display: flex;
    position: relative;
    justify-content: center;
    height: calc(100vh - 170px);
    @media (max-width: 1475px) {
        height: calc(100vh - 100px);
    }
    @media (max-width: 1000px) {
        height: 75vh;
    }
`;

const Image = styled.img`
    max-width: 100vw;
    position: relative;
    min-height: 50vh;
    @media(max-width: 1422px) {
        display: none;
    }
`;

const TransitionImage = styled.img`
    max-width: 100vw;
    position: relative;
    min-height: 50vh;
    @media(min-width: 1421px) {
        display: none;
    }
    @media(max-width: 1047px) {
        display: none;
    }
`;

const LaptopImage = styled.img`
    max-width: 100vw;
    position: relative;
    min-height: 50vh;
    @media(min-width: 1046px) {
        display: none;
    }
    @media(max-width: 752px) {
        display: none;
    }
`;

const TabletImage = styled.img`
    width: 100vw;
    position: relative;
    min-height: 50vh;
    @media(min-width: 751px) {
        display: none;
    }
    @media(max-width: 565px) {
        display: none;
    }
`;

const MobileImage = styled.img`
    width: 100vw;
    position: relative;
    min-height: 50vh;
    @media(min-width: 564px) {
        display: none;
    }
    @media(max-width: 380px) {
        display: none;
    }
`;

const NarrowImage = styled.img`
    width: 100vw;
    position: relative;
    min-height: 50vh;
    max-height: 89vh;
    @media(min-width: 379px) {
        display: none;
    }
`;

const Content = styled.div`
    height: 100%;
    width: 800px;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-flow: column;
    align-items: left;
    padding-left: 10vw;
    justify-content: center;
    @media (max-width: 800px) {
        width: 600px;
        padding-left: 6vw;
    }
    @media (max-width: 600px) {
        width: 500px;
        padding-left: 25px;
    }
    @media (max-width: 1711px) {
        width: 70%;
    }
    @media (max-width: 1335px) {
        width: 75%;
    }
    @media (max-width: 1145px) {
        width: 80%;
    }
    @media (max-width: 960px) {
        width: 90%;
    }
    @media (max-width: 752px) {
        width: 100%;
        padding-left: 30px;
    }
    @media (max-width: 564px) {
        width: 100%;
        padding-left: 0px;
        align-items: center;
    }
    @media (max-width: 448px) {
        justify-content: flex-start;
        padidng-top: 30px !important;
    }
`;

const List = styled.div`
    display: flex;
    flex-flow: column;
    justify-content: left;
    padding: 25px 3vw 55px 3vw;
    font-size: 26px;
    color: #F7F7F7;
    @media(max-width: 1500px) {
        padding: 25px 3vw 35px 3vw;
    }
    @media (max-width: 600px) {
        font-size: 18px;
    }
    @media (max-width: 1145px) {
        padding: 10px 3vw;
    }
    @media (max-width: 550px) {
        padding: 25px 6vw;
        font-size: 20px;
    }
    @media (max-width: 400px) {
        padding: 0px 6vw;
        font-size: 16px;
    }
`;

const MobileButton = styled.div`
    @media (max-width: 564px) {
        width: 100%;
        display: flex;
        justify-content: center;
    }
`;

const HeroUnzipped = () => {
    const router = useRouter();
    return (
        <Container>
            <Image src="/img/header-unzipped-paparclip.png" />
            <TransitionImage src="/img/header-narrow-paperclip.png" />
            <LaptopImage src="/img/laptop-background.png" />
            <TabletImage src="https://res.cloudinary.com/dghsmwkfq/image/upload/v1674583500/background-mobile_bwhdgw.png" />
            <MobileImage src="https://res.cloudinary.com/dghsmwkfq/image/upload/v1674583885/mobile-background_kwuaeu.png" />
            <NarrowImage src="https://res.cloudinary.com/dghsmwkfq/image/upload/v1674601150/narrow-mobile-background_ms8vmh.png" />
            <Content>
                <Title>
                Unlock the Full Potential <br/> of Technical Talent
                </Title>
                <List>
                Unzipped is where you find the best tech freelancers and get more done. With smart matching and easy to use project tools, hiring and managing top talent is simple and effective!
                </List>
                <MobileButton>
                <Buttons flush mobileCenter mobileAbsolute>
                    <Button onClick={() => router.push("/how-it-works/client")} extraTall extraWide noBorderWorlds largest freelance marketplace noBorder>HIRE A FREELANCER</Button>
                    <Button onClick={() => router.push("/how-it-works/freelancer")} extraTall extraWide type="outlineTransparent">EARN MONEY FREELANCING</Button>
                </Buttons>
                </MobileButton>
            </Content>
        </Container>
    )
}

export default HeroUnzipped;