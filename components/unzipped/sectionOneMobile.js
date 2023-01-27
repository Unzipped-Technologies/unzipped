import React from 'react'
import styled from 'styled-components'
import {
    TitleText,
    WhiteCard,
    Absolute,
    DarkText
} from './dashboard/style'
import Image from '../ui/Image'

const Container = styled.div`
    width: 100%;
    padding: 20px;
    padding-left: 20px;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    @media(min-width: 858px) {
        display: none;
    }
    @media(max-width: 858px) {
        padding-left: 0px;
    }
`;

const Cards = styled.div`
    width: 300px;
    display: flex;
    flex-flow: column;
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 700px;
    justify-items: center;
    align-items: center;
    @media(max-width: 858px) {
        width: 670px;
    }
    @media(max-width: 677px) {
        width: 375px;
        padding: 20px 0px;
        padding-left: 20px;
    }
    @media(max-width: 646px) {
        grid-template-columns: 1fr;
    }
`;

const Index = styled.div`
    display: ${({index}) => index > 3 ? 'none' : 'unset'};
    @media(max-width: 646px) {
        display: ${({index}) => index > 4 ? 'none' : 'unset'};
    }
`;

const Floor = styled.div`
    width: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 33px;
    background: #D9D9D9;
`;

const SectionOneMobile = ({projects}) => {
    return (
        <Container>
            <TitleText size="14px">AMAZING PROJECTS</TitleText>
            <Cards>
            {projects.map((item, index) => {
                return (
                    <Index key={index} index={index}>
                        <WhiteCard clickable height="199px" center maxWidth="300px" key={item.id} padding="0px" overflow="hidden" borderRadius="15px">
                            <Image src={item.businessImage} height="300px" width="auto"/>
                            <Absolute bottom="0px" right="0px"><Floor><DarkText center noMargin>{item.name}</DarkText></Floor></Absolute>
                        </WhiteCard> 
                    </Index>                   
                )
            })}
            </Cards>
        </Container>
    )
}

export default SectionOneMobile