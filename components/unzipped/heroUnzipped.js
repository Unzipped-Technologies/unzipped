import React from 'react'
import styled from 'styled-components'
import { 
    Title 
} from './textStyles'
import { 
    WhiteCard, 
    DarkText 
} from './dashboard/style'
import { 
    StarIcon 
} from '../icons'
import Button from '../ui/Button';
import Buttons from '../ui/Buttons';

const Container = styled.div`
    display: flex;
    position: relative;
    justify-content: center;
`;

const Image = styled.img`
    max-width: 100vw;
    position: relative;
    min-height: 50vh;
    @media(max-width: 1420px) {
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
    @media(max-width: 1045px) {
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
    @media(max-width: 750px) {
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
    @media(max-width: 563px) {
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
    @media(max-width: 378px) {
        display: none;
    }
`;

const NarrowImage = styled.img`
    width: 100vw;
    position: relative;
    min-height: 50vh;
    @media(min-width: 379px) {
        display: none;
    }
`;

const Content = styled.div`
    height: 100%;
    width: 60%;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-flow: column;
    align-items: left;
    padding-left: 10vw;
    justify-content: center;
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
    padding: 20px 1vw;
    @media (max-width: 1515px) {
        padding: 0px 4vw;
    }
    @media (max-width: 1145px) {
        padding: 10px 3vw;
    }
    @media (max-width: 448px) {
        padding: 0px 1vw;
    }
`;

const items = [
    {
        text: 'Worlds largest freelance marketplace',
        icon: <StarIcon />
    },
    {
        text: 'Any business you can possibly think of',
        icon: <StarIcon />
    },
    {
        text: 'Share the risk of starting a new business',
        icon: <StarIcon />
    },
    {
        text: `Pay only when you're 100% happy`,
        icon: <StarIcon />
    },
]

const HeroUnzipped = () => {
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
                    Collaboration Builds <br/>
                    Better businesses
                </Title>
                <List>
                    {items.map(item => (
                        <WhiteCard borderColor="transparent" background="transparent" unset row noMargin>
                            {item.icon}
                            <DarkText noMargin paddingLeft color="#fff" fontSize="26px">{item.text}</DarkText>
                        </WhiteCard>
                    ))}
                </List>
                <Buttons flush mobileCenter mobileAbsolute>
                    <Button extraTall extraWide noBorderWorlds largest freelance marketplace noBorder>HIRE A FREELANCER</Button>
                    <Button extraTall extraWide type="outlineTransparent">EARN MONEY FREELANCING</Button>
                </Buttons>
            </Content>
        </Container>
    )
}

export default HeroUnzipped;