import React, {useEffect} from 'react';
import Head from "next/head";
import Link from "next/link";
import CovidNav from '../components/Navbar/covid';
import ColorNav from '../components/Navbar/ColorNav';
import PresentationHeader from '../components/Headers/PresentationHeader';
import AppointmentPresentation from '../components/Custom/Presentation/AppointmentPresentation';
import AppointmentMobile from '../components/Custom/Presentation/Mobile-AppointmentPresentation';
import SectionOne from '../components/Custom/Presentation/presentation-section-one';
import SectionTwoMobile from '../components/Custom/Presentation/presentation-section-two-mobile';
import SectionTwo from '../components/Custom/Presentation/presentation-section-two';
import SectionThree from '../components/Custom/Presentation/presentation-section-three';
import SectionFour from '../components/Custom/Presentation/presentation-section-four';
import SectionFive from '../components/Custom/Presentation/presentaion-section-five';
import SectionSix from '../components/Custom/Presentation/presentation-section-six';
import Testimonial from '../components/Custom/Testimonials';
import MobileOne from '../components/Custom/Presentation/presentation-mobile-one';
import Section from '../components/Custom/Sales/Presentation-section-two';
import { connect, useDispatch } from 'react-redux';
import { startAppScreen, stopAppScreen, googleUser, tokenSet, reloadLogout } from '../redux/actions';
import { parseCookies } from "../services/cookieHelper";
// import Footer from '../Footer/presentation-footer';
import { useRouter } from 'next/router';
import Footer from '../components/Footer/alt-footer';


//style


const Presentation = ({ app, user, token, loggedOut }) => {
    const dispatch = useDispatch();
    const router = useRouter();

    const data = [
        {
            title: "Quality at the Right Price",
            content: "Quality that you don’t get overcharged for. Don’t pay for other companies' inefficiencies. ",
        },
        {
            title: "Redefined Convenience",
            content: "Done on your car’s time, not yours. Why not have your car made like new when you’re not using it?  ",
        },
        {
            title: "Environmentally Responsible",
            content: "Convenience shouldn’t come at a high cost to you or the environment. We don’t sacrifice our future for more profit.",
        },
    ]

    const data2 = [
        {
            image: 'section-two-one.png',
            title: 'Step 1',
            text: 'Schedule your consultation.'
        },
        {
            image: 'section-two-two.png',
            title: 'Step 2',
            text: 'Plan out your project with out skilled project managers.'
        },
        {
            image: 'section-two-three.png',
            title: 'Step 3',
            text: 'Your web app will be delivered in phases as the work is complete. '
        },
    ]

    const data3 = [
        {
            image: 'section-two-one.png',
            title: 'Step 1',
            text: 'Choose your desired service.'
        },
        {
            image: 'section-two-two.png',
            title: 'Step 2',
            text: 'Drop your keys either with a certified driver at your desired location, or at a Vohnt Box nearest you.'
        },
        {
            image: 'section-two-three.png',
            title: 'Step 3',
            text: 'Your car will be ready and waiting where you left it by 5pm that day. '
        },
    ]

    useEffect(() => {
        dispatch(stopAppScreen());
        if (token.access_token) {
            if (!user) {
            dispatch(googleUser(token.access_token));
            }
        }
    }, [])

    return (
        <React.Fragment>
            <Head>
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap" rel="stylesheet"></link>
            <title>Unzipped | Let us build your app</title>
            <meta name="Unzipped | Let us build your app" content="Web development, machine learning, and app done for your company. Because some of life's best moments begin with, &quot;That should be an app.&quot;"/>
            </Head>
            <div className={app}>
            <div className="main-header">
                <CovidNav />
                <ColorNav popBox='home'/>
                <PresentationHeader 
                    banner={<div>Your APP re-imagined.</div>} 
                    image={'unzipped-header-2.png'} 
                    imageTwo={'unzipped-header-2-mobile.png'}
                    imageThree={'unzipped-header-3-mobile.png'}
                    />
            </div>
            <div className="site-scheduler">
            <AppointmentPresentation />
            </div>
            <div className="mobile-scheduler">
                <AppointmentMobile />
            </div>
            <br/>
            <div className="sec-2-mobile">
            <SectionTwoMobile data={data3}/>
            </div>
            <div className="sec-2-desktop">
            <SectionTwo />
            </div>
            <div className="desk-one">
            <SectionOne />
            </div>    
            <div className="mobile-one">
            <MobileOne />
            </div>
            <br/>
            <div className="learn-more-home">
            <Section data={data2} content={'Learn More'} />
            </div>
            <div className="testimonial-home">
            <Testimonial />
            </div>
            {/* <SectionThree data={data}/> */}
            <SectionFour />
            <SectionFive />
            <SectionSix />
            <div className="footer-container">
                <Footer />
            </div>
            </div>
        </React.Fragment>
    )
}

Presentation.getInitialProps = async ({ req, res }) => {
    const token = parseCookies(req)
    
      return {
        token: token && token,
      }
    }

const mapStateToProps = (state) => {
    return {
        app: state.Booking.screen,
        user: state.Auth.isAuthenticated,
        loggedOut: state.Auth.loggedOut
    }
}

export default connect(mapStateToProps, {googleUser, reloadLogout, tokenSet})(Presentation);