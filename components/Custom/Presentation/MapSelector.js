import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Icon from "@material-ui/core/Icon";
import { connect } from 'react-redux';

const MapSelector = ({ service, area, date, location, count, isAuthenticated }) => {
    const [link, setLink] = useState('/services');

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

    return (
        <React.Fragment>
            <Head>
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
            </Head>
            <div className="ms-container">
                <div className="ms-cont-1 ms-text">
                    <Link href="maps">
                    <p className="subtext">{area.substring(0,13)}..</p>
                    </Link>
                </div>
                <hr className="divider" id="div-3"/>
                <div className="ms-time-select ms-text" id="ms-time">
                    <Link href="/schedule">
                    <p className="subtext">{date}</p>
                    </Link>
                </div>
                <hr className="divider" id="div-4"/>
                <div className="ms-service-select ms-text" id="ms-service">
                    <Link href="/services">
                    <p className="subtext">{service}{' '}{service > 1 ? 'Services' : 'Service'}</p>
                    </Link>
                </div>
                <div>
                    <Link href={link}>
                        <button className="ms-button-color" color="#1c978b">
                            <Icon className="material-icons icon-services-ms">
                            search
                            </Icon>
                        </button>
                    </Link>
                </div>

            </div>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        service: state.Booking.count,
        area: state.Booking.location.name,
        date: state.Booking.date,
        location: state.Booking.location,
        count: state.Booking.count,
        isAuthenticated: state.Auth.isAuthenticated,
    }
}

export default connect(mapStateToProps)(MapSelector);