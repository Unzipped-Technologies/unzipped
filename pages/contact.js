import React from 'react';
import NoLogo from '../components/Navbar/No-logo';
import Footer from '../components/Footer/alt-footer';
import { GoogleMap, LoadScript, Marker, InfoWindow, Circle } from '@react-google-maps/api';

const Contact = () => {

    const defaultCenter = {
        // lat: coordinates.lat, lng: coordinates.lng,
        //vohnt headquarters
        // lat: 39.956300, lng: -82.995680,
        //centered point
        lat: 39.9624184, lng: -82.9966745,
      }
      const mapStyles = {        
        height: "350px",
        width: "500px", 
        overflow: 'hidden',
        marginTop: '45px'};

      const mapStyles2 = {        
        height: "280px",
        width: "280px", 
        overflow: 'hidden',
        marginTop: '65px'};

    return (
        <React.Fragment>
            <div className="page-container-two">
            <div className="blog-header-faqs">
            <NoLogo />
            </div>
            <div className="contact-outer-container">
            <div className="split-content">
                <div className="contact-left">
                    <h4 className="contact-title">Experience Car Care Freedom Today</h4>
                    <p className="text-size-contact">If you have any questions or comments, please contact us via email or fill out our contact form. Your Carcare expert is just one click away to answer any questions you have or to book your Carecare appointment today.</p>
                </div>
                <div className="contact-right">
                    <div className="left-contact-text">
                    <div>
                    <h5>Email</h5>
                    <a href="">admin@vohnt.com</a>
                    </div>
                    <div>
                    <h5>Phone</h5>
                    <a href="">+1 (614) 512-9627</a>
                    </div>
                    </div>
                    <div className="desk-map-contact">
                        <LoadScript
                        googleMapsApiKey='AIzaSyDcE5jKlJtBQHo1lhqYUEaQ227UuoCvC4s'>
                            <GoogleMap
                            mapContainerStyle={mapStyles}
                            zoom={13}
                            center={defaultCenter}
                            onClick={(e) => onMapClick(e)}
                            ></GoogleMap>
                        </LoadScript>
                    </div>
                    <div className="mobile-map-contact">
                        <LoadScript
                        googleMapsApiKey='AIzaSyDcE5jKlJtBQHo1lhqYUEaQ227UuoCvC4s'>
                            <GoogleMap
                            mapContainerStyle={mapStyles2}
                            zoom={13}
                            center={defaultCenter}
                            onClick={(e) => onMapClick(e)}
                            ></GoogleMap>
                        </LoadScript>
                    </div>
                </div>
            </div>
            </div>
            <div className="contact-img-container">
                <h1 className="image-title">Join the Carcare Revolution.</h1>
                <img src={'/img/contact-us.png'} alt="contact-us" className="contact-img"/>
            </div>
            <div id="footer-hiw" >
                <Footer />
            </div>
            </div>
        </React.Fragment>
    )
}

export default Contact;