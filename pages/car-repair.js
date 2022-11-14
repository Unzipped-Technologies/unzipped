import React from 'react';
import Head from "next/head";
import Nav from '../components/Navbar/ColorNav';
import CovidNav from '../components/Navbar/covid';
import PresentationHeader from '../components/Headers/PresentationHeader';
import AppointmentPresentation from '../components/Custom/Presentation/AppointmentPresentation';
// import safe from '../../assets/img/car-wash-detail.png';
import Footer from '../components/Footer/alt-footer';
import Booking from '../components/Custom/Booking/Book-now';
import SectionOne from '../components/Custom/Sales/Section-one';

const CarRepair = () => {

    const data = [
        {
            title: 'BRAKE PAD REPLACEMENT',
            image: 'car-repair-one.png',
            content: [
                `Our Vohnt technicians will provide a full brake inspection and replacement in accordance with your manufacturer’s specifications. We change your car's brakes on its time, not yours. Schedule your service during the workday or overnight and we’ll have it returned when you need it.`,
            ],
            id: 7,
            price: 50
        },
        {
            title: 'TIRE CHANGE',
            image: 'car-repair-two.png',
            content: [
                `Get your tires changed in a way you’ve never experienced before. With Vohnt’s tire change service, you can book your appointment from the comfort of your car, during the day or overnight, and we’ll take care of the rest with our expert technicians and valet service. `,
            ],
            id: 8,
            price: 50
        },
        {
            title: 'BATTERY REPLACEMENT',
            image: 'car-repair-three.png',
            content: [
                `Never be stranded with a dead battery again when you use Vohnt’s battery replacement service. Our team will come to you, install a new battery, or replace it for you at our operations facility and return it the next morning.`, 
            ],
            id: 9,
            price: 50
        },
    ]

    return (
        <React.Fragment>
            <Head>
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap" rel="stylesheet"></link>
            <title>Car Repair | Unzipped</title>
            <meta name="Car Repair | Unzipped" content="Experience the next generation of car care. Valet car repair done on your car's time, not yours. Vohnt offers on-demand brake pad, tire, and battery replacement."/>
            </Head>
            <div className="page-container-two">
                {/* <Nav safe={'/img/car-wash-detail.png'} banner={'Experience the next generation of Carcare'} /> */}
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
                <SectionOne data={data} title={`Brake Pad, Tire ${'&'} Battery Replacement`} btype={'paragraph'}/>
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