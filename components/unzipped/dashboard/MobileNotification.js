import React from 'react';
import Button from '../../ui/Button'
import Icon from '../../ui/Icon'
import Link from 'next/link'
import {
    BlackCard,
    WhiteText,
    TitleText,
    DarkText,
    Absolute,
    WhiteCard,
    Dismiss
} from './style'

import { useRouter } from 'next/router';

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
            to: 'https://www.udemy.com/'
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

const Notification = ({ type, children, noButton }) => {
    const router = useRouter()
    switch (type) {
        case 'plan':
            return (
                <BlackCard display='block'>
                    <WhiteText>Build your dream business, grow your following, and collaborate with other professionals to <br />
                        make your vision a reality. Start your free trial now.</WhiteText>
                    <Absolute justifyContent='end' ><Button noBorder type="black" onClick={() => router.push('/pick-a-plan')}>PICK A PLAN</Button></Absolute>
                </BlackCard>
            )
        case 'github':
            return (
                <WhiteCard size="large">
                    <DarkText>You haven't created your first Business yet, create one now so
                        you can begin Collaborating! Need Ideas? View existing projects here.</DarkText>
                    <Button icon="github" webKit noBorder type="dark" normal>CONNECT YOUR GITHUB ACCOUNT</Button>
                </WhiteCard>
            )
        case 'browse':
            return (
                <WhiteCard row display='block'>
                    <DarkText noMargin>Browse other projects to inspire ideas</DarkText>
                    <Absolute justifyContent='end' ><Button noBorder type="default" normal small>BROWSE</Button></Absolute>
                </WhiteCard>
            )
        case 'dismiss':
            return (
                <WhiteCard row display='block'>
                    <DarkText noMargin>{children}</DarkText>
                    <Absolute justifyContent='end' >
                        <Dismiss>Dismiss</Dismiss>
                        <Button noBorder type="default" normal small>UPDATE</Button></Absolute>
                </WhiteCard>
            )
        case 'faq':
            return (
                <WhiteCard row display='block'>
                    <DarkText noMargin>Investors are asking about your businss. Update Frequently asked
                        questions now.</DarkText>
                    <Absolute justifyContent='end'>
                        <Dismiss>Dismiss</Dismiss>
                        <Button noBorder type="default" normal small>UPDATE</Button></Absolute>
                </WhiteCard>
            )
        case 'freeTrial':
            return (
                <WhiteCard row borderColor="#0029FF" background="#F8FAFF">
                    <Icon name="question" />
                    <DarkText noMargin paddingLeft>Your free trial will end in 5 days on
                        12/02/2022</DarkText>
                    {/* {!noButton && (
                        <Absolute>
                            <Dismiss>Dismiss</Dismiss>
                            <Button noBorder type="default" normal small>UPDATE</Button>
                        </Absolute>
                    )} */}
                </WhiteCard>
            )
        case 'createBusiness':
            return (
                <WhiteCard size="large">
                    <DarkText>You haven't created your first Business yet, create one now so
                        you can begin Collaborating! Need Ideas? View existing projects here.</DarkText>
                    <Button noBorder webKit type="dark" normal>CREATE FIRST PROJECT</Button>
                </WhiteCard>
            )
        // case 'updateBusiness':
        //     return (
        //         <WhiteCard size="large">
        //             <DarkText>You created your first business. Hooray! Now you need to customize your
        //                 business homepage to attract better talent.</DarkText>
        //             <Button noBorder type="dark" normal>CUSTOMIZE YOUR BUSINESS PAGE</Button>
        //         </WhiteCard>
        //     )
        case 'explore':
            return (
                <WhiteCard marginBottom='70px' size="extraLarge">
                    <TitleText noMargin>Explore more support</TitleText>
                    <DarkText>Check out these resources for answers to your questions, videos, and best practices.</DarkText>
                    {help.map((item, index) => (
                        <WhiteCard display='-webkit-box' gap='7px' shadow="0px 4px 4px rgba(0, 0, 0, 0.25)" background="#EAEAEA" key={index} noMargin padding="15px 20px" borderRadius={index === 0 ? "10px 10px 0px 0px" : index === 3 ? "0px 0px 10px 10px" : "0px"}>
                            <Absolute left top="17px"><Icon name={item.icon} /></Absolute>
                            <div style={{width:"95%"}}>
                            <TitleText noMargin small >{item.name}</TitleText>
                            <DarkText noMargin small>{item.text} <Link href={item.link.to}>{item.link.text}</Link></DarkText>
                            </div>
                        </WhiteCard>
                    ))}
                </WhiteCard>
            )
        default:
            return <></>
    }
}

export default Notification