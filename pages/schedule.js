import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Router from "next/router";
import Link from 'next/link';
import Calendar from '../components/Custom/Presentation/Calendar-display';
import Nav from '../components/Navbar/ColorNav';
import Selector from '../components/Custom/Presentation/MapSelector';
import Footer from '../components/Footer/alt-footer';
import { connect } from 'react-redux';
import 'simplebar/dist/simplebar.min.css';
import 'react-calendar/dist/Calendar.css';

const Maps = ({count, location, date, isAuthenticated}) => {
  const [link, setLink] = useState('/services');
  
  const onSelect = item => {
    setSelected(item);
  }

  const handleClick = (e) => {
    Router.push(link)
  }

  useEffect(() => {
    if (count === 0) {
        setLink('/services');
    } else if (date === 'Select a Date') {
        setLink('/schedule');
    } else if (location.name === 'Select map area') {
        setLink('/maps');
    } else if (isAuthenticated !== true) {
        setLink('/login');
    } else {
        setLink('/cart');
    }
}, [count, location, date, isAuthenticated])

    //// use Distance Matrix API
    // const CalcDistance = (coords1, coords2) => {
    //  return miles
    // }

    return (
        <React.Fragment>
            <div className="services-page">
            <Head>
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap" rel="stylesheet"></link>
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
            <title>Unzipped | Schedule</title>
            <meta name="Unzipped | Schedule" content="Unzipped"/>
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
                <div className="vohnt-product-offerings-cal">
                    <div className="product-list-cal">
                        {/* <SelService simpleHeight='600px' buttons="services"/> */}
                        <Calendar handler={handleClick}/>
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

const mapStateToProps = (state) => {
  return {
    date: state.Booking.date,
    location: state.Booking.location,
    count: state.Booking.count,
    isAuthenticated: state.Auth.isAuthenticated,
  }
}

export default connect(mapStateToProps)(Maps);