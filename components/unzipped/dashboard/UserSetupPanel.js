import React from 'react'
import styled from 'styled-components'
import {
    TitleText,
    DarkText,
    Absolute,
    WhiteCard,
} from './style'
import ProgressBar from '../../ui/ProgressBar'

const Container = styled.div`
    position: relative;
    display: flex;
    flex-flow: column;
    border: 1px solid #D9D9D9;
    width: 100%;
    min-height: 435px;
    max-height: 900px;
    padding: 20px;
    margin-left: 10px;
`;

const Panel = ({user}) => {
    return (
        <Container>
            <TitleText>Set up your account<Absolute top="20px"><DarkText>75%</DarkText></Absolute></TitleText>
            <ProgressBar value={75} width={190} showValue/>
            <DarkText>Some functionality will not be accessable if your
            account is not completed </DarkText>
            <TitleText small>Complete your account setup by:</TitleText>
            <WhiteCard unset background="#d8d8d8">
                {user.map(item => (
                    <WhiteCard borderColor="#37DEC5" row half clickable>
                        {item.icon}
                        <DarkText clickable noMargin paddingLeft={item.padding} fontSize="12px">{item.text}</DarkText>
                    </WhiteCard>
                ))}
            </WhiteCard>
        </Container>
    )
}

export default Panel;