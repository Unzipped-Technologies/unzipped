import React, {useEffect} from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Nav from '../components/Navbar/ColorNav';
import Selector from '../components/Custom/Presentation/MapSelector';
import AppointmentMobile from '../components/Custom/Presentation/Mobile-AppointmentPresentation';
import Footer from '../components/Footer/alt-footer';
import SelService from '../components/Custom/Presentation/Presentation-service.js';

const Services = () => {
    
    useEffect(() => {
        dispatch(selectHotel('Mariot'));
    }, [])

    return (
        <React.Fragment>
            <div className="services-page">
            <Head>
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap" rel="stylesheet"></link>
                <title>Unzipped | Services</title>
                <meta name="Unzipped | Services" content="Unzipped"/>
            </Head>
            <div className="service-header">
            <Nav popBox="services"/>
            <div className="service-selector">
            <Selector />
            </div>
            {/* <div className="mobile-service-selector">
            <AppointmentMobile />
            </div> */}
            </div>
            <div className="service-section-1">
                <div className="service-sec-1-container">
                    <h2 >Unzipped’s service offerings</h2>
                    <p className="serv-1-p">Creating a world where you have immediate, convenient, and affordable access to web development.</p>
                    <div className="serv-1-button">
                    <Link href="/how-it-works">
                    <button className="learn-more-button" id="no-border-radius">Learn More</button>
                    </Link>
                    </div>
                </div>
                <div className="vohnt-product-offerings">
                    <div className="product-list-left">
                        <SelService simpleHeight='600px' buttons="services"/>
                    </div>
                </div>
            </div>
            <div className="alt-footer-2">
            <Footer />
            </div>
            </div>
        </React.Fragment>
    )
}

export default Services;