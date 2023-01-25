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
    padding-left: 40px;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
`;

const Cards = styled.div`
    width: 300px;
    display: flex;
    flex-flow: column;
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
            {projects.map(item => {
                return (
                    <WhiteCard clickable height="199px" key={item.id} padding="0px" overflow="hidden" borderRadius="15px">
                        <Image src={item.businessImage} height="300px" width="auto"/>
                        <Absolute bottom="0px" right="0px"><Floor><DarkText center noMargin>{item.name}</DarkText></Floor></Absolute>
                    </WhiteCard>                    
                )
            })}
            </Cards>
        </Container>
    )
}

export default SectionOneMobile