import React, {useEffect} from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Nav from '../components/Navbar/ColorNav';
import Selector from '../components/Custom/Presentation/MapSelector';
import AppointmentMobile from '../components/Custom/Presentation/Mobile-AppointmentPresentation';
import Footer from '../components/Footer/alt-footer';
import SelService from '../components/Custom/Presentation/Presentation-service.js';
import { connect, useDispatch } from 'react-redux';
import { parseCookies } from "../services/cookieHelper";
import { stopAppScreen, googleUser } from '../redux/actions';

const Services = ({user, token}) => {
    const dispatch = useDispatch();

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
            <div className="services-page">
            <Head>
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap" rel="stylesheet"></link>
                <title>Unzipped | Services</title>
                <meta name="Unzipped | Services" content="Car care, service, and repair done on your car's time, not yours. Because some of life's best moments begin with, &quot;I'll drive.&quot;"/>
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
                    <div className="product-list-left-small">
                        <SelService simpleHeight='420px' buttons="services"/>
                    </div>
                    <div className="product-list-left-small2">
                        <SelService simpleHeight='400px' buttons="services"/>
                    </div>
                    <div className="product-list-left-small3">
                        <SelService simpleHeight='350px' buttons="services"/>
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


Services.getInitialProps = async ({ req, res }) => {
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

export default connect(mapStateToProps, {stopAppScreen, googleUser})(Services);