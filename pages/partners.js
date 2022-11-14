import React from 'react';
import Image from 'next/image';
import Nav from '../components/Navbar/ColorNav';
import CovidNav from '../components/Navbar/covid';
import PresentationHeader from '../components/Headers/PresentationHeader';
import AppointmentPresentation from '../components/Custom/Presentation/AppointmentPresentation';
import Head from "next/head";
import Footer from '../components/Footer/alt-footer';
import PartnerForm from '../components/Forms/partnerContact';
// import safe from '../../assets/img/Partners-crop.png';

const Partners = () => {

    const data = [
        {
            image: 'section-two-one.png',
            title: 'Service Structures',
            content: `Vohnt’s services are designed to eliminate the
                stress and inconvenience of having a car,
                allowing them to focus solely on where
                they’re going and who they are with. All of
                Vohnt’s services t under two structures:
                valet, and delivery.`,
        },
        {
            image: 'section-two-two.png',
            title: 'Valet Services',
            content: `Vohnt’s valet services are rendered by a Vohnt
            driver picking up the customer’s car, servicing
            it at Vohnt’s downtown location, then return-
            ing the car to the user’s parking garage.`,
        },
        {
            image: 'section-two-three.png',
            title: 'Delivery Services',
            content: `Vohnt’s delivery services are services that can
            be effectively brought to the customer’s car
            without being an inconvenience to other
            parked cars in the garage.`,
        },
    ]

    return (
        <React.Fragment>
            <Head>
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap" rel="stylesheet"></link>
            <title>Partners | Unzipped</title>
            <meta name="Partners | Unzipped" content="Be one of the first to experience the next generation of car care. Vohnt is the most convenient, efficient, and affordable form of car care on the market."/>
            </Head>
            <div className="page-container">
                {/* <Nav safe={'/img/vohnt-header-2.png'} banner={"Car Care At The Touch Of A Button!"} /> */}
                <div className="main-header main-partner">
                <CovidNav />
                <Nav popBox='home'/>
                <PresentationHeader 
                    banner={'Car Care At The Touch Of A Button!'} 
                    image={'vohnt-header-2.png'} 
                    imageTwo={'vohnt-header-2-mobile.png'}
                    imageThree={'vohnt-header-3-mobile.png'}
                    />

                </div>
                <div className="site-scheduler">
                <AppointmentPresentation />
                </div>
                <div className="move-items"></div>
                            {/* section 2 */}
                <div className="section-two-c">
                    <div className="in-sec-two-c">
                        <h3 className="c-h3">
                        </h3>
                        <p className="c-p2">In 2020 alone, there was a reported $24.9 billion in delayed auto maintenance. The 100,000
                        consumers polled stated that their reasons for delayed maintenance was because of time
                        commitment, inconvenience, expense, and lack of trust.
                        <br/>
                        <br/>
                        <span className="mid-title-partner">Our Model </span>
                        <br/>
                        <br/>
                        Vohnt is fundamentally shifting the model in which car care is done. We are creating an
                        operational model that works FOR our users, not AGAINST them.
                        <br/>
                        <br/>
                        We pick up and service vehicles during times where they are typically idle: parked while
                        owners work, or parked while owners sleep. This model gives us the ability to run 24/7 oper-
                        ations, servicing our downtown users that are parked in Business, Residential, and Hotel ga-
                        rages.

                        </p>
                        {/* <h3 className="c-h2">Business Services</h3> */}
                    </div>
                <div className="business-img-container">
                <img src={'/img/vohnt-business.png'} alt="" className="business-img"/>
                </div>
                {/* section 3 */}
                <div className="section-three-c">
                    {data.map((item, index) => {
                        return (
                        <div className="content-container-c" key={index}>
                            <div className="content-inner-c">
                                <div className="left-img-c">
                                    <img src={`/img/${item.image}`} alt="" className="standard-image-1" />
                                </div>
                                <div className="right-content-c">
                                    <h4 className="content-title">{item.title}</h4>
                                    <p className="desc-paragraph-partner">
                                    {item.content}
                                    </p>

                                </div>
                            </div>
                        </div>
                        )
                    })}
                </div>
                <div className="form-control">
                    <PartnerForm />
                </div>
                </div>
                <div className="footer-c" >
                    <Footer/>
                </div>
            </div>
            
        </React.Fragment>
    )
}

export default Partners;