import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 100vw;
    background-color: #001AFF;
    height: 590px;
    @media(max-width: 856px) {
        grid-template-columns: 1fr;
        height: unset;
    }
`;

const ImageContainer = styled.div`
    max-width: 50vw;
    height: 100%;
    height: 590px;
    @media(max-width: 856px) {
        max-width: 100vw;
        width: 100vw;
        height: unset;
    }
`;

const Image = styled.img`
    height: 100%;
    width: auto;
    @media(max-width: 856px) {
        width: 100%;
        height: unset;
    }
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
    @media(max-width: 428px) {
        padding: 25px;
        max-height: 460px;
    }
    @media(max-width: 388px) {
        padding: 10px;
    }
    @media(max-width: 360px) {
        max-height: 560px;
    }
`;

const Title = styled.div`
    font-weight: 600;
    font-size: 24px;
    line-height: 19px;
    @media(max-width: 1251px) {
        font-size: 20px;
    }
    @media(max-width: 428px) {
        font-size: 18px;
    }
`;

const Header = styled.div`
    font-weight: 500;
    font-size: 54px;
    line-height: 68px;
    margin: 40px 0px;
    @media(max-width: 1251px) {
        font-size: 48px;
        line-height: 60px;
    };
    @media(max-width: 1043px) {
        font-size: 44px;
        line-height: 54px;
        margin: 30px 0px;
    };
    @media(max-width: 428px) {
        font-size: 38px;
        line-height: 44px;
        margin: 20px 0px;
    }
`;

const P = styled.p`
    font-weight: 400;
    font-size: 18px;
    line-height: 27px;
    @media(max-width: 1251px) {
        font-size: 16px;
        line-height: 24px;
    };
    @media(max-width: 1043px) {
        font-size: 15px;
        margin: 10px 0px;
    };
    @media(max-width: 428px) {
        font-size: 14px;
        line-height: 20px;
        margin: 5px 0px;
    }
`;

const Break = styled.div`
    @media(min-width: 1193px) {
        display: none;
    };
    @media(max-width: 1192px) {
        flex-basis: 100%;
    };
`;


const P2 = styled.p`
    font-weight: 500;
    font-size: 16px;
    line-height: 25px;
    letter-spacing: 0.39998px;
    max-width: 180px;
    @media(max-width: 1251px) {
        font-size: 14px;
    }
    @media(max-width: 428px) {
        font-size: 13px;
    }
`;

const Three = styled.div`
    display: grid;
    width: 100%;
    grid-template-columns: 1fr 1fr 1fr;
    @media(max-width: 1192px) {
        display: flex;
        flex-flow: row;
        flex-wrap: wrap;
        justify-content: start;
        ${P2}:nth-child(2) {
            margin-left: 20px;
        }
    }
    @media(max-width: 360px) {
        display: grid;
        width: 100%;
        grid-template-columns: 1fr;
        ${P2}:nth-child(2) {
            margin-left: 0px;
        }
    }
`;

const Underline = styled.div`
    border: #fff 1px solid;
    height: 3px;
    background-color: #fff;
    border-radius: 2px;
    width: 90%;
    margin-top: 30px;
    margin-bottom: 20px;
    @media(max-width: 428px) {
        margin-top: 20px;
        margin-bottom: 10px;
    }
`;

const items = [
    <P2>Find opportunities <br/> 
    for every stage of <br/> 
    your career<br/></P2>,
    <P2>Control when, <br/> 
    where, and how 
    you work</P2>,
    <Break/>,
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