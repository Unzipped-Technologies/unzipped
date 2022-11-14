import React from 'react';
import Nav from '../components/Navbar/ColorNav';
import CovidNav from '../components/Navbar/covid';
import PresentationHeader from '../components/Headers/PresentationHeader';
import AppointmentPresentation from '../components/Custom/Presentation/AppointmentPresentation';
import Head from "next/head";
// import safe from '../../assets/img/howitworks-header.png';
import Footer from '../components/Footer/alt-footer';
import Booking from '../components/Custom/Booking/Book-now';
import Section from '../components/Custom/Sales/Presentation-section-two';
import ReactVideo from '../components/Custom/React-video';

const CarRepair = () => {

    const data = [
        {
            image: 'section-two-one.png',
            title: 'BOOK.',
            text: [
                'Your car care journey begins with one simple click to book your appointment. ',
                'Choose an available car care, service, or repair appointment time; select your location and desired return time.',
            ],
        },
        {
            image: 'section-two-two.png',
            title: 'DROP.',
            text: [
                'Choose your desired appointment time from the comfort of your car, office, or serviced area. ',
                'We’ll generate your QR code or key code to drop your keys in the Vohnt box nearest to you. ',
            ],
        },
        {
            image: 'section-two-three.png',
            title: 'enjoy.',
            text: [
                'Sit back, relax, and one of our vetted Vohnt drivers will pick up your car. ',
                'Follow along every step of the way. Your car will be waiting for you before you leave for the day.',
            ],
        },
    ]

    const dataTwo = [
        {
            image: 'HIW-one.png',
            title: 'Water Conservation',
            text: [
                'Using an advanced reclamation and filter system, we are able to reclaim and reuse 98.4% of our water.',
            ],
        },
        {
            image: 'HIW-two.png',
            title: 'Environmentally Safe Products ',
            text: [
                'We are committed to only using products that are safe for our customers and our environment. We refuse to sacrifice quality or safety for profit.',
            ],
        },
        {
            image: 'HIW-three.png',
            title: 'Reduced Waste ',
            text: [
                'Vohnt procures all chemicals and products in bulk in order to reduce bottles and packaging waste. All plastics are reused or recycled, and non-reusable waste is properly disposed.',
            ],
        },
    ]

    return (
        <React.Fragment>
            <Head>
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap" rel="stylesheet"></link>
            <title>How Unzipped Works | Unzipped</title>
            <meta name="keywords" content="We like to keep it simple. Book, drop, freedom. Professional car detailing done on your car's time, not yours. $99 and zero time commitment. It's that simple."/>
            </Head>
            <div className="page-container-two">
                {/* <Nav safe={'/img/howitworks-header.png'} banner={'How to Use Vohnt '} /> */}
                <div className="main-header">
                <CovidNav />
                <Nav popBox='home'/>
                <PresentationHeader 
                    banner={'How to Use Vohnt'} 
                    image={'howitworks-header.png'} 
                    imageTwo={'howitworks-header-1.png'}
                    imageThree={'howitworks-header-2.png'} />

                </div>
                <div className="site-scheduler">
                <AppointmentPresentation />
                </div>
                <div className="move-items"></div>
                <div className="container-one-hiw">
                <h2 id="header-client"><span className="enjoy">enjoy </span> YOUR NEW CAR CARE EXPERIENCE</h2>
                <h2 id="header-client-mobile">Book. Drop. <span className="enjoy">enjoy</span>.</h2>
                <Section data={data} content={'Book Now'} />
                <ReactVideo url={'https://vimeo.com/477825177'} />
                <Section data={dataTwo} content={'Book Now'} />
                </div>
                {/* section two */}
                <div className="section-two-container-wash">
                   <Booking />     
                </div>
                <div id="footer-hiw">
                <Footer />
                </div>
            </div>
        </React.Fragment>
    )
}

export default CarRepair;