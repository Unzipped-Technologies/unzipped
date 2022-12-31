import React from 'react'
import styled from 'styled-components'
import {
    DarkText,
    TitleText,
    Underline
} from './dashboard/style'
import Icon from '../ui/Icon'
import { useRouter } from 'next/router'

const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Content = styled.div`
    display: flex;
    width: 953px;
    flex-flow: row;
    align-items: center;
    padding: 30px 0px;
    border-bottom: #555 solid 1px;
`;

const BackButton = styled.div`
    display: flex; 
    justify-content: center;
    align-items: center;
    border: #555 solid 1px;
    border-radius: 5px;
    height: 43px;
    width: 43px;
    margin-right: 30px;
    cursor: pointer;
`;

const Right = styled.div`
    width: 100%;
`;

const BackHeader = ({sub, title, bold, size}) => {
    const router = useRouter()

    return (
        <Container>
            <Content>
                <BackButton onClick={() => router.back()}><Icon name="BackArrowLong" /></BackButton>
                <Right>
                    <TitleText noMargin bold={bold} size={size}>{title}</TitleText>
                    {sub && <DarkText noMargin>{sub}</DarkText>}
                </Right>
            </Content>
            <Underline color="#333"/>
        </Container>
    )
}

export default BackHeader