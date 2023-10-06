import React from 'react'
import styled from 'styled-components'
import {
    TitleText,
    DarkText,
    Absolute,
    WhiteCard,
} from './style'
import Link from 'next/link'
import ProgressBar from '../../ui/ProgressBar'

const Container = styled.div`
    display: flex;
    flex-flow: column;
    width: 100%;
    padding: 0px 40px;
`;

const Panel = ({ user }) => {
    return (
        <Container>
            <div style={{ backgroundColor: "#D9D9D9" }} className='px-2 pt-2 pb-4'>
                <div className='d-flex justify-content-between'>
                    <TitleText>Set up your account</TitleText>
                    <DarkText textAlignLast='end'>75%</DarkText>
                </div>
                <ProgressBar value={75} width={75} showValue />
                <DarkText color='#000000'>Some functionality will not be accessable if your
                    account is not completed </DarkText>
                <TitleText marginTop="40px" small>Complete your account setup by:</TitleText>
                <WhiteCard unset background="#d8d8d8" style={{ border: "1px solid #CD4949" }} >
                    {user.slice(1).map(item => (
                        <WhiteCard onClick={item?.onClick || (() => { })} borderColor="#37DEC5" row half clickable style={{ display: "flex", alignItems: "center", border: "1px solid #37DEC5", padding: "17px", borderRadius: "8px", minHeight: "70px", margin: "15px 10px" }}>
                            {item.icon}
                            <DarkText clickable noMargin paddingLeft={item.padding} fontSize="12px">{item.text}</DarkText>
                        </WhiteCard>
                    ))}
                </WhiteCard>
            </div>
        </Container >
    )
}

export default Panel;