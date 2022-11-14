import React from 'react';
import Nav from '../components/Navbar/ColorNav';
import CovidNav from '../components/Navbar/covid';
import PresentationHeader from '../components/Headers/PresentationHeader';
import AppointmentPresentation from '../components/Custom/Presentation/AppointmentPresentation';
import Head from "next/head";
// import safe from '../../assets/img/car-wash-detail.png';
import Footer from '../components/Footer/alt-footer';
import Booking from '../components/Custom/Booking/Book-now';
import SectionOne from '../components/Custom/Sales/Section-one';

const CarRepair = () => {

    const data = [
        {
            title: 'GAS TOP-OFF',
            image: 'car-service-one.png',
            content: [
                `Vohnt delivers gas directly to your parked car so you never have to stop and to get gas again. We offer premium or unleaded gas at the going market rate with no delivery fees. Vohnt is creating a world where you no longer have to pay extra for convenience. `,
            ],
            id: 4,
            price: 50
        },
        {
            title: 'OIL CHANGE',
            image: 'car-service-two.png',
            content: [
                `Never worry about making time for an oil change again. With Vohnt’s valet oil change service, we’ll pick your car up and have it back to you after work or first thing in the morning.`,
            ],
            id: 5,
            price: 50
        },
        {
            title: 'TIRE PRESSURE',
            image: 'car-service-three.png',
            content: [
                `Our team will check the depth, wear, and pressure of your tires, adding air if necessary. Always be up to date with professional, unbiased recommendations when it comes to your tires.`, 
            ],
            id: 6,
            price: 50
        },
    ]

    return (
        <React.Fragment>
            <Head>
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap" rel="stylesheet"></link>
            <title>Car Services | Unzipped</title>
            <meta name="Car Services | Unzipped" content="Experience the next generation of car care. We offer valet and on demand delivery services for gas top-offs, oil changes, and tire pressure checks."/>
            </Head>
            <div className="page-container-two">
                {/* <Nav safe={'img/car-wash-detail.png'} banner={'Experience the next generation of Carcare'} /> */}
                <div className="main-header">
                <CovidNav />
                <Nav popBox='home'/>
                <PresentationHeader 
                    banner={'Experience the next generation of Carcare'} 
                    image={'car-wash-detail.png'}
                    imageTwo={'vohnt-header-2-mobile.png'}
                    imageThree={'vohnt-header-3-mobile.png'}
                    />

                </div>
                <div className="site-scheduler">
                <AppointmentPresentation />
                </div>
                <div className="move-items"></div>
                <SectionOne data={data} title={`Gas Top-Off, Oil Change ${'&'} Tire Pressure`} btype={'paragraph'}/>
                {/* section two */}
                <div className="section-two-container-wash">
                   <Booking />     
                </div>
                <Footer />
            </div>
        </React.Fragment>
    )
}

export default CarRepair;