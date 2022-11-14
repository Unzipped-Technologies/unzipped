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

const CarDetail = () => {

    const data = [
        {
            title: 'INTERIOR DETAIL',
            image: 'car-wash-one.png',
            content: [
                'Full blow out of underneath, between seats, and air vents.',
                'Deep vacuum of seats, carpets, carpet floor mats, cargo area.',
                'Detail vacuum + Brush of panels, dash, headliner, and vents.',
                'Detail clean of media and controls.',
                'Protective clean of all vinyl, leather, plastic, and rubber areas.' ,
                'Interior window and windshield clean.' ,
            ],
            id: 0,
            price: 85
        },
        {
            title: 'EXTERIOR DETAIL',
            image: 'car-wash-two.png',
            content: [
                'Powerwash of Undercarriage and Wheelwells',
                'Full Rinse',
                'Soap Spray and Hand wash' ,
                'Spotless hand dry. ',
                'Wheels and tires cleaned and shined.' ,
                'Bug and tar treatment.',
                'Clean and degrease door jambs.',
                'Exterior window cleaning.',
                'Exterior sunroof and side mirror cleaning.',
            ],
            id: 1,
            price: 85
        },
        {
            title: 'TOUCHLESS CAR WASH',
            image: 'car-wash-three.png',
            content: [
                'High pressure undercarriage wash', 
                'Hot presoak', 
                'Typhoon touchless car wash', 
                'Clearcoat protectant',
                'Spot free rinse ',
                'Microfiber towel dry', 
            ],
            id: 0,
            price: 35
        },
    ]

    return (
        <React.Fragment>
            <Head>
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap" rel="stylesheet"></link>
            <title>Car Wash &amp; Detail | Unzipped</title>
            <meta name="Car Wash &amp; Detail | Unzipped" content="Experience the next generation of car care. We offer valet car wash, interior, and exterior car detailing. Done on your car's time, not yours. Book, drop, enjoy."/>
            </Head>
            <div className="page-container-two">
                {/* <Nav safe={'/img/car-wash-detail.png'} banner={'Experience the next generation of Carcare'} />
                <PresentationHeader /> */}
                <div className="main-header">
                <CovidNav />
                <Nav popBox='home'/>
                <PresentationHeader 
                    banner={'Next generation Carcare'} 
                    image={'car-wash-detail.png'} 
                    imageTwo={'car-wash-detail-1.png'}
                    imageThree={'car-wash-detail-2.png'}
                    />

                </div>
                <div className="site-scheduler">
                <AppointmentPresentation />
                </div>
                <div className="move-items"></div>
                <SectionOne data={data} title={`Car Wash ${'&'} Detail`} btype={'bullet'}/>
                {/* section two */}
                <div className="section-two-container-wash">
                   <Booking />     
                </div>
                <div id="footer-sixteen">
                    <Footer />
                </div>
            </div>
        </React.Fragment>
    )
}

export default CarDetail;