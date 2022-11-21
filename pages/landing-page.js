import React from 'react';
import Nav from '../components/Navbar/ColorNav';
import CovidNav from '../components/Navbar/covid';
import PresentationHeader from '../components/Headers/PresentationHeader';
import Head from "next/head";
import AppointmentPresentation from '../components/Custom/Presentation/AppointmentPresentation';
// import safe from '../../assets/img/car-wash-detail.png';
import Footer from '../components/Footer/alt-footer';
import Booking from '../components/Custom/Booking/Book-now';
import SectionOne from '../components/Custom/Sales/Section-one';
import LandingHeader from '../components/Headers/landing';
import style from 'styled-components'

const LandingPage = () => {

    const Container = style.div`
        display: flex;
        justify-content: center;
        width: 100%;
    `;

    const Content = style.div`
        display: flex;
        justify-content: center;
        flex-flow: row;
    `;

    const Text = style.p`
        font-size: 18px;
        max-width: 900px;
    `;

    const Input = style.input``;

    const Button = style.button``;

    const SignUp = style.div``;

    return (
        <React.Fragment>
            <Head>
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap" rel="stylesheet"></link>
            <title>Newsletter | Unzipped</title>
            <meta name="Newsletter | Unzipped" content="Experience the next generation of car care. We offer valet car wash, interior, and exterior car detailing. Done on your car's time, not yours. Book, drop, enjoy."/>
            </Head>
            <Container>
                <LandingHeader />
            </Container>
            <Content>
                <SignUp>
                    <Input />
                    <Button>Sign up</Button>
                </SignUp>
                <Text>Hey!<br/>

                    Thanks for checking us out. We are The Unzipped Newsletter bringing you the latest in business, tech, science, and health in an easy-to-read email every Sunday. Our mission is to provide you with knowledge and information that will make your life better every day and give you interesting topics to discuss with your friends! Each week's issue will be unique and relevant to you.
                    <br/><br/>
                    Enjoy<br/>
                    -Jason
                </Text>
            </Content>
        </React.Fragment>
    )
}

export default LandingPage;