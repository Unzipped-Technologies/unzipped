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


    return (
        <React.Fragment>
            <Head>
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap" rel="stylesheet"></link>
            <title>Car Wash &amp; Detail | Unzipped</title>
            <meta name="Car Wash &amp; Detail | Unzipped" content="Experience the next generation of car care. We offer valet car wash, interior, and exterior car detailing. Done on your car's time, not yours. Book, drop, enjoy."/>
            </Head>
            <Container>
                <LandingHeader />
            </Container>
        </React.Fragment>
    )
}

export default LandingPage;