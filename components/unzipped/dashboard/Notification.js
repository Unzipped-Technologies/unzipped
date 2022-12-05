import React from 'react';
import styled from 'styled-components'
import Button from '../../ui/Button'
import Icon from '../../ui/Icon'
import theme from '../../ui/theme'
import Link from 'next/link'

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

const TitleText = styled.div`
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 600;
    font-size: ${({small}) => small ? '16px' : '18px'};
    line-height: ${({lineHeight}) => lineHeight ? lineHeight : '24px'};
    letter-spacing: 0.15008px;
    margin-bottom: ${({noMargin}) => noMargin ? '0px' : '15px'};
    margin-left: ${({paddingLeft}) => paddingLeft ? '20px' : '0px'};
    width: 96%;
    color: ${theme.text2};
`;

const DarkText = styled.div`
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: ${({small}) => small ? '14px' : '16px'};
    line-height: ${({lineHeight}) => lineHeight ? lineHeight : '24px'};
    letter-spacing: 0.15008px;
    margin-bottom: ${({noMargin}) => noMargin ? '0px' : '15px'};
    margin-left: ${({paddingLeft}) => paddingLeft ? '20px' : '0px'};
    width: 96%;
    color: ${theme.text2};
`;

const Absolute = styled.div`
    position: absolute;
    display: flex;
    flex-flow: row;
    align-items: center;
    top: ${({top}) => top ? top : 'unset'};
    right: ${({left}) => left ? 'unset' : '10px'};
    left: ${({left}) => left ? '10px' : 'unset'};
`;

const WhiteCard = styled.div`
    background: ${({background}) => background ? background : '#fff'};
    border: 1px ${({borderColor}) => borderColor ? borderColor : '#d8d8d8'} solid;
    border-radius: ${({borderRadius}) => borderRadius ? borderRadius : '5px'};
    width: 100%;
    display: flex;
    flex-flow: ${({row}) => row ? 'row' : 'column'};
    height: ${({size}) => size === 'large' ? '151px' : size === 'extraLarge' ? '370px' : '63px'};
    align-items: center;
    padding: ${({padding}) => padding ? padding : '20px 20px'};
    position: relative;
    box-shadow: ${({shadow}) => shadow ? shadow : 'none'};
    margin-bottom: ${({noMargin}) => noMargin ? '0px' : '24px'};
`;

const Dismiss = styled.div`
    font-weight: 500;
    font-size: 12px;
    line-height: 24px;
    text-align: center;
    letter-spacing: 0.39998px;
    text-decoration-line: underline;
    text-transform: uppercase;

    color: #282932;

    margin: 0px 20px;
`;

const help = [
    {
        name: 'Help Center',
        icon: 'glasses',
        text: 'Find documentation and tutorials on how to use Unzipped.',
        link: {
            text: 'See our help docs',
            to: '/'
        }
    },
    {
        name: 'Unzipped Learn',
        icon: 'compass',
        text: 'Get step-by-step guidance on how to best set up your business online.',
        link: {
            text: 'Get started',
            to: '/'
        }
    },
    {
        name: 'Courses',
        icon: 'play',
        text: 'Learn how to run a successful business with video courses taught by industry experts',
        link: {
            text: 'Learn more',
            to: '/'
        }
    },
    {
        name: 'Ask us about a topic',
        icon: 'questionCircle',
        text: 'Find answers to your questions and review Unzipped resources.',
        link: {
            text: 'Ask about a topic.',
            to: '/'
        }
    },
]

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
        case 'dismiss':
            return (
                <WhiteCard row>
                    <DarkText noMargin>Update types of professionals you are seeking for your business</DarkText>
                    <Absolute>
                    <Dismiss>Dismiss</Dismiss>
                    <Button noBorder type="default" normal small>UPDATE</Button></Absolute>
                </WhiteCard> 
            )
        case 'faq':
            return (
                <WhiteCard row>
                    <DarkText noMargin>Investors are asking about your businss. Update Frequently asked 
                    questions now.</DarkText>
                    <Absolute>
                    <Dismiss>Dismiss</Dismiss>
                    <Button noBorder type="default" normal small>UPDATE</Button></Absolute>
                </WhiteCard> 
            )
        case 'blue':
            return (
                <WhiteCard row borderColor="#0029FF" background="#F8FAFF">
                    <Icon name="question" />
                    <DarkText noMargin paddingLeft>Update types of professionals you are seeking for your business</DarkText>
                    <Absolute>
                    <Dismiss>Dismiss</Dismiss>
                    <Button noBorder type="default" normal small>UPDATE</Button></Absolute>
                </WhiteCard> 
            )
        case 'createBusiness':
            return (
                <WhiteCard size="large">
                    <DarkText>You haven't created your first Business yet, create one now so
                    you can begin Collaborating! Need Ideas? View existing projects here.</DarkText>
                    <Button noBorder type="dark" normal>CREATE YOUR FIRST BUSINESS</Button>
                </WhiteCard> 
            )
        case 'updateBusiness':
            return (
                <WhiteCard size="large">
                    <DarkText>You created your first business. Hooray! Now you need to customize your
                    business homepage to attract better talent.</DarkText>
                    <Button noBorder type="dark" normal>CUSTOMIZE YOUR BUSSINESS PAGE</Button>
                </WhiteCard> 
            )
        case 'explore':
            return (
                <WhiteCard size="extraLarge">
                    
                    <TitleText noMargin>Explore more support</TitleText>
                    <DarkText>Check out these resources for answers to your questions, videos, and best practices.</DarkText>
                    {help.map((item, index) => (
                        <WhiteCard shadow="0px 4px 4px rgba(0, 0, 0, 0.25)" background="#EAEAEA" key={index} noMargin padding="5px 40px" borderRadius={index === 0 ? "10px 10px 0px 0px" : index === 3 ? "0px 0px 10px 10px" : "0px"}>
                            <Absolute left top="17px"><Icon name={item.icon} /></Absolute>
                            <TitleText noMargin small >{item.name}</TitleText>
                            <DarkText noMargin small>{item.text} <Link href={item.link.to}>{item.link.text}</Link></DarkText>
                        </WhiteCard> 
                    ))}
                </WhiteCard> 
            )
        default: 
            return <></>
    }
}

export default Notification