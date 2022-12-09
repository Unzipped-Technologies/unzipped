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
    background: #8EDE64;
    height: 664px;
`;

const Left = styled.div`
    background: #F2F7F2;
    position: relative;
`;

const ImageContainer = styled.div`
    max-width: 612px;
    display: flex;
    height: 100%;
    position: absolute;
    bottom: 0px;
    right: 0px;
`;

const Image = styled.img`
    height: auto;
    width: 100%;
    margin-top: auto;
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
    
`;

const Header = styled.div`
    font-weight: 500;
    font-size: 28px;
    line-height: 43px;
`;

// styling for left text

const Absolute = styled.div`
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    padding: 60px 30px;
`;

const H2 = styled.div`
    font-weight: 500;
    font-size: 57px;
    line-height: 68px;
    letter-spacing: 0.5px;
    text-transform: uppercase;

    color: #333333;
`;

const ImageSmall = styled.img`
    height: 57px;
    position: relative;
    top: 10px;
`;

// Styling for icon bullets

const Bullets = styled.div`
    display: flex;
    width: 100%;
    flex-flow: column;
    margin: 30px 0px;
`;

const P2 = styled.p`
    margin: 0px 10px;
`;

const Icon = styled.div`
    padding-top ${({padding}) => padding ? `${padding}px` : '0px'};
`;

const Bullet = styled.div`
    display: flex;
    flex-flow: row;
    margin: 10px 0px;
`;
const BulletText = styled.div`
    margin-bottom: auto;
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
        sub: `build your businesses /n using a proven best practices`
    },
    {
        title: <P2>Get to MVP faster</P2>,
        icon: <CircleStar />,
        sub: `Set up equity sharing for initial /n talent contributions.`
    },
    {
        title: <P2>Safe and secure</P2>,
        icon: <CircleStar />,
        sub: `Focus on your work knowing /n
        we help protect your data /n
        and privacy. we're here with /n
        you 24/7.`
    },
]

const SectionTwo = () => {
    return (
        <Container>
            <Left>
            <ImageContainer>
                <Image src="https://res.cloudinary.com/dghsmwkfq/image/upload/v1670086178/cartoon_pgrwke.png" />
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
            </Left>
            <Right>
                <Header>WE'RE <br/> THE WORLDS <br/> STARTUP BUILDER</Header>
                <Bullets>
                    {items.map(item => (
                        <Bullet>
                            <Icon>{item.icon}</Icon>
                            <BulletText>
                                <TitleSpan>{item.title}</TitleSpan>
                                <TitleP>{item.sub}</TitleP>
                            </BulletText>
                        </Bullet>
                    )
                    )}
                </Bullets>
            </Right>
        </Container>
    )
}

export default SectionTwo;