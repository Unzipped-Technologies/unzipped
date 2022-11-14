import React from 'react';
import Image from 'next/image';
import Head from "next/head";
import Nav from '../components/Navbar/ColorNav';
import CovidNav from '../components/Navbar/covid';
import PresentationHeader from '../components/Headers/PresentationHeader';
import AppointmentPresentation from '../components/Custom/Presentation/AppointmentPresentation';
import Footer from '../components/Footer/alt-footer';
// import safe from '../../assets/img/safety-crop.png';

const Safety = () => {

    const data = [
        {
            image: 'safety-mask.png',
            title: 'PPE Use',
            content: [
                'All drivers are vetted and background checked, and contractually agree to follow all PPE ground rules.',
                'Drivers are required to wear facial masks and latex gloves at all times.',
                'Drivers’ uniforms consist of long pants and jackets, ensuring that no skin ever touches the customer’s car.',
            ],
        },
        {
            image: 'safety-sheild.png',
            title: 'Surface Sanitation',
            content: [
                "Responsible and regular use of hand sanitizer prior to handling any customer property or surface.",
                "Regular sanitizing and disinfecting of all high-touch areas. Including (but not limited to) Vohnt Key Boxes.",
                "Final disinfection of every vehicle when returning it to the customer."
            ],
        },
        {
            image: 'safety-scanner.png',
            title: 'CDC Guideline Adherence',
            content: [
                'Daily screening of employee temperature',
                'Daily reporting to supervision of any symptoms of COVID-19, direct contact with an individual confirmed to have COVID-19, or contact with a person in quarantine.',
                'Strict adherence to social distancing in all scenarios where staff interacts with customers or partner organizations’ staff.' 
            ],
        },
    ]

    return (
        <React.Fragment>
            <Head>
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap" rel="stylesheet"></link>
            <title>Safety | Unzipped</title>
            <meta name="Safety | Unzipped" content="We take the safety of you, your car, and our associates seriously. We adhere to all CDC guidelines in order to keep you safe and your car clean."/>
            </Head>
            <div className="page-container" id="safety123">
                {/* <Nav safe={'/img/safety-crop.png'} banner={"Your safety. Our priority."} /> */}
                <div className="main-header">
                <CovidNav />
                <Nav popBox='home'/>
                <PresentationHeader 
                    banner={'Your safety. Our priority.'} 
                    image={'safety-crop.png'} 
                    imageTwo={'safety-crop-1.png'}
                    imageThree={'safety-crop-2.png'}
                    />

                </div>
                <div className="site-scheduler">
                <AppointmentPresentation />
                </div>
                <div className="move-items"></div>
                            {/* section 2 */}
                <div className="section-two-c">
                    <div className="in-sec-two-c">
                        <h3 className="c-h3">Safely providing you with the most convenient and cost effective detailing on the market.</h3>
                        <p className="c-p2">Vohnt takes the safety of our customers and team very seriously and has put in place strict safety procedures allowing you to get your car safely detailed no matter the situation. Providing our customers with the safest environment possible is our priority.</p>
                        <h3 className="c-h2">Vohnt Safety Standards</h3>
                    </div>
                
                {/* section 3 */}
                <div className="section-three-c">
                    {data.map((item, index) => {
                        return (
                        <div className="content-container-c" key={index}>
                            <div className="content-inner-c">
                                <div className="left-img-c">
                                    <img src={`/img/${item.image}`} alt="" className="standard-image" />
                                </div>
                                <div className="right-content-c">
                                    <h4 className="content-title">{item.title}</h4>
                                    <ul className="list-ul">
                                    {item.content.map((point, index) => {
                                        return (
                                            <>
                                            <li className="content-points" id="bullets">{'   '}{point}</li>
                                            {index < 1 &&
                                                <br />
                                            }
                                            </>
                                        )
                                    })}
                                    </ul>

                                </div>
                            </div>
                        </div>
                        )
                    })}
                </div>

                </div>
                <div className="footer-c" >
                    <Footer/>
                </div>
            </div>
            
        </React.Fragment>
    )
}

export default Safety;