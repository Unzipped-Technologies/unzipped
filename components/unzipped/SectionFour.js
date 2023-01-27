import React from 'react'
import styled from 'styled-components'
import {
    LeafIcon,
    CycleIcon,
    CircleStar,
} from '../icons'

const Container = styled.div`
    display: grid;
    grid-template-columns: 3fr 1fr;
    width: 80vw;
    position: relative;
    background: #8EDE64;
    height: 664px;
    @media(max-width: 1385px) {
        height: 605px;
    }
    @media(max-width: 1152px) {
        grid-template-columns: 5fr 2fr;
    }
    @media(max-width: 991px) {
        display: flex;
        flex-flow: column;
        height: 100%;
    }
    @media(max-width: 405px) {
        width: 100%;
    }
`;

const Left = styled.div`
    background: #F2F7F2;
    position: relative;
    @media(max-width: 991px) {
        height: 540px;
    }
    @media(max-width: 460px) {
        height: 510px;
    }
`;

const ImageContainer = styled.div`
    max-width: 612px;
    display: flex;
    height: 100%;
    position: absolute;
    bottom: 0px;
    right: 0px;
    @media(max-width: 1536px) {
        width: 500px;
    }
    @media(max-width: 1385px) {
        width: 450px;
    }
    @media(max-width: 1271px) {
        width: 400px;
    }
    @media(max-width: 1152px) {
        width: 240px;
        margin-right: 20px;
    }
`;

const Image = styled.img`
    height: auto;
    width: 100%;
    margin-top: auto;
    @media(max-width: 1152px) {
        display: none;
    }
`;

const MobileImage = styled.img`
    height: auto;
    width: 100%;
    margin-top: auto;
    @media(min-width: 1153px) {
        display: none;
    }
    @media(max-width: 622px) {
        display: none;
    }
`;

const Right = styled.div`
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    background: #8EDE64;
    padding: 40px;
    letter-spacing: 0.39998px;
    text-transform: uppercase;
    color: #FDFDFD;
    max-height: 100%;
    @media(max-width: 1385px) {
        padding: 20px;
    }
    @media(max-width: 1233px) {
        padding: 10px;
    }
    @media(max-width: 991px) {
        align-items: flex-start;
        padding: 40px;
        max-height: 425px;
    }
    @media(max-width: 405px) {
        padding: 40px 20px 0px 20px;
    }
`;

const Header = styled.div`
    font-weight: 500;
    font-size: 28px;
    line-height: 43px;
    @media(max-width: 1385px) {
        font-size: 24px;
    }
`;

// styling for left text

const Absolute = styled.div`
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    padding: 60px 30px;
    @media(max-width: 1385px) {
        padding: 35px 25px;
    }
    @media(max-width: 1271px) {
        padding: 25px 20px;
    }
    @media(max-width: 991px) {
        padding: 5px 20px;
    }
    @media(max-width: 328px) {
        padding: 5px 10px;
    }
    @media(max-width: 315px) {
        padding: 5px 5px;
    }
`;

const H2 = styled.div`
    font-weight: 500;
    font-size: 57px;
    line-height: 68px;
    letter-spacing: 0.5px;
    text-transform: uppercase;

    color: #333333;
    @media(max-width: 1271px) {
        font-size: 50px;
    }
    @media(max-width: 1082px) {
        font-size: 42px;
    }
    @media(max-width: 659px) {
        font-size: 36px;
    }
    @media(max-width: 574px) {
        font-size: 32px;
        line-height: 48px;
    }
    @media(max-width: 517px) {
        font-size: 28px;
        margin-top: 15px;
        line-height: 48px;
    }
    @media(max-width: 460px) {
        font-size: 24px;
        line-height: 38px;
    }
    @media(max-width: 308px) {
        font-size: 20px;
        line-height: 28px;
        font-weight: bold;
    }
`;

const ImageSmall = styled.img`
    height: 57px;
    position: relative;
    top: 10px;
    @media(max-width: 1271px) {
        height: 52px;
        top: 7px;
    }
    @media(max-width: 1271px) {
        height: 46px;
        top: 6px;
    }
    @media(max-width: 659px) {
        height: 39px;
        top: 3px;
    }
    @media(max-width: 574px) {
        height: 38px;
        top: 7px;
    }
    @media(max-width: 308px) {
        height: 34px;
        top: 7px;
    }
`;

// Styling for icon bullets

const Bullets = styled.div`
    display: flex;
    width: 100%;
    flex-flow: column;
    margin: 30px 0px;
    @media(max-width: 991px) {
        margin: ${({small}) => small ? '10px 0px' : '30px 0px'}
    }
    @media(max-width: 659px) {
        margin: 10px 0px;
    }
    @media(max-width: 405px) {
        margin: 30px 0px;
    }
`;

const P2 = styled.p`
    margin: 0px 10px;
    @media(max-width: 574px) {
        font-size: 24px;
    }
`;

const Icon = styled.div`
    padding-top ${({padding}) => padding ? `${padding}px` : '0px'};
`;

const Bullet = styled.div`
    display: flex;
    flex-flow: row;
    margin: 10px 0px;
    @media(max-width: 405px) {
        margin: 4px 0px;
    }
`;
const BulletText = styled.div`
    margin-bottom: auto;
    @media(max-width: 622px) {
        font-size: 16px;
    }
    @media(max-width: 315px) {
        font-size: 14px;
    }
`;
const TitleSpan = styled.div`
    margin: 0px;
    font-weight: 500;
    font-size: 24px;
    line-height: 24px;
`;
const TitleP = styled.div`
    margin: 15px 10px;
    max-width: 250px;
    @media(max-width: 622px) {
        max-width: 275px;
    }
    @media(max-width: 591px) {
        max-width: ${({short}) => short ? '230px' : '340px'};
    }
    @media(max-width: 315px) {
        max-width: 300px;
    }
`;

const AltImgContainer = styled.div`
    position: absolute;
    bottom: 0px;
    right: 0px;
    @media(min-width: 623px) {
        display: none;
    }
    @media(max-width: 565px) {
        display: none;
    }
`;

const AltImg = styled.img`
    width: 175px;
`;

const items = [
    {
        title: <P2>30% Saved</P2>,
        icon: <LeafIcon />,
        sub: 'Invested employees work harder'
    },
    {
        title: <P2>Award Winner</P2>,
        icon: <CycleIcon />,
        sub: 'BCI 2022 business of the year award'
    }
]

const bullets = [
    {
        title: <P2>Quick to scale</P2>,
        icon: <CircleStar />,
        sub: `build your businesses using a proven best practices`
    },
    {
        title: <P2>Get to MVP faster</P2>,
        icon: <CircleStar />,
        sub: `Set up equity sharing for initial talent contributions.`
    },
    {
        title: <P2>Safe and secure</P2>,
        icon: <CircleStar />,
        sub: `Focus on your work knowing
        we help protect your data
        and privacy. we're here with
        you 24/7.`
    },
]

const SectionTwo = () => {
    return (
        <Container>
            <Left>
            <ImageContainer>
                <Image src="https://res.cloudinary.com/dghsmwkfq/image/upload/v1670086178/cartoon_pgrwke.png" />
                <MobileImage src="https://res.cloudinary.com/dghsmwkfq/image/upload/v1674786278/single_yrjzyk.png" />
            </ImageContainer>
            <Absolute>
                <H2>Why Businesses work <br/> with <ImageSmall src="/img/unzipped-3d.png"/> unzipped</H2>
                <Bullets>
                    {bullets.map(item => (
                        <Bullet>
                            <Icon padding={5}>{item.icon}</Icon>
                            <BulletText>
                                <TitleSpan>{item.title}</TitleSpan>
                                <TitleP>{item.sub}</TitleP>
                            </BulletText>
                        </Bullet>
                    )
                    )}
                </Bullets>
            </Absolute>
            {/* <Spacer /> */}
            </Left>
            <Right>
                <Header>WE'RE <br/> THE WORLDS <br/> STARTUP BUILDER</Header>
                <Bullets small>
                    {items.map(item => (
                        <Bullet >
                            <Icon>{item.icon}</Icon>
                            <BulletText>
                                <TitleSpan>{item.title}</TitleSpan>
                                <TitleP short>{item.sub}</TitleP>
                            </BulletText>
                        </Bullet>
                    )
                    )}
                </Bullets>
                <AltImgContainer>
                        <AltImg src="https://res.cloudinary.com/dghsmwkfq/image/upload/v1674786278/single_yrjzyk.png" />
                </AltImgContainer>
            </Right>
        </Container>
    )
}

export default SectionTwo;