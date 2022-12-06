import React from 'react'
import styled from 'styled-components'
import {
    Title
} from './textStyles'
import {
    StarIcon
} from '../icons'
import Bullet from './bulletText'
import Buttons from './ButtonStep'

const Container = styled.div`
    display: flex;
    position: relative;
`;

const Image = styled.img`
    width: 100vw;
    position: relative;
    min-height: 50vh;
`;

const Content = styled.div`
    height: 100%;
    width: 50%;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    @media (max-width: 1335px) {
        width: 60%;
    }
    @media (max-width: 1135px) {
        width: 70%;
    }
    @media (max-width: 960px) {
        width: 90%;
    }
`;

const List = styled.div`
    display: flex;
    flex-flow: column;
    justify-content: left;
`;

const items = [
    {
        content: 'Worlds largest freelance marketplace',
        icon: <StarIcon />
    },
    {
        content: 'Any business you can possibly think of',
        icon: <StarIcon /> 
    },
    {
        content: 'Share the risk of starting a new business',
        icon: <StarIcon /> 
    },
    {
        content: `Pay only when you're 100% happy`,
        icon: <StarIcon /> 
    },
]

const HeroUnzipped = () => {
    return (
        <Container>
            <Image src="/img/header-unzipped-paparclip.png" />
            <Content>
                <Title>
                    Collaboration Builds <br/>
                    Better businesses
                </Title>
                <List>
                {items.map((item, index) => (
                    <Bullet text={item.content} icon={item.icon} key={item.content + index}/>
                ))}
                </List>
                <Buttons buttonOne="EARN MONEY FREELANCING" buttonTwo="HIRE A FREELANCER" />
            </Content>
        </Container>
    )
}

export default HeroUnzipped;