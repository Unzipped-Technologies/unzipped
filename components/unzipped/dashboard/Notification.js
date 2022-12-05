import React from 'react';
import styled from 'styled-components'
import Button from '../../ui/Button'
import theme from '../../ui/theme'

const BlackCard = styled.div`
    background: #202123;
    border-radius: 5px;
    width: 100%;
    display: flex;
    flex-flow: row;
    height: 87px;
    align-items: center;
    padding: 0px 40px;
    position: relative;
    margin-bottom: 24px;
`;


const WhiteText = styled.div`
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 23px;
    letter-spacing: 0.15008px;

    color: ${theme.text};
`;

const DarkText = styled.div`
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px
    letter-spacing: 0.15008px;
    margin-bottom: ${({noMargin}) => noMargin ? '0px' : '15px'};
    width: 96%;
    color: ${theme.text2};
`;

const Absolute = styled.div`
    position: absolute;
    right: 10px;
`;

const WhiteCard = styled.div`
    background: #fff;
    border: 1px #d8d8d8 solid;
    border-radius: 5px;
    width: 100%;
    display: flex;
    flex-flow: ${({row}) => row ? 'row' : 'column'};
    height: ${({size}) => size === 'large' ? '151px' : '63px'};
    align-items: center;
    padding: 20px 20px;
    position: relative;
    margin-bottom: 24px;
`;
const Notification = ({type}) => {
    switch (type) {
        case 'plan':
            return (
                <BlackCard>
                    <WhiteText>Build your dream business, grow your following, and collaborate with other professionals to <br/>
                    make your vision a reality. Start your free trial now.</WhiteText>
                    <Absolute><Button noBorder type="black">PICK A PLAN</Button></Absolute>
                </BlackCard>
            )
        case 'github':
            return (
                <WhiteCard size="large">
                    <DarkText>Build your dream business, grow your following, and collaborate with other professionals to <br/>
                    make your vision a reality. Start your free trial now.</DarkText>
                    <Button icon="github" noBorder type="dark" normal>CONNECT YOUR GITHUB ACCOUNT</Button>
                </WhiteCard> 
            )
        case 'browse':
            return (
                <WhiteCard row>
                    <DarkText noMargin>Browse other projects to inspire ideas</DarkText>
                    <Absolute><Button noBorder type="default" normal small>BROWSE</Button></Absolute>
                </WhiteCard> 
            )
        default: 
            return <></>
    }
}

export default Notification