import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Label, Input } from 'reactstrap';
import CalendarDisplay from './Calendar-display';
import SelService from './Presentation-service.js';
import { connect, useDispatch } from 'react-redux';
import { selectLocation } from '../../../redux/actions';
import 'react-calendar/dist/Calendar.css';

const AppointmentPresentation = ({ date, location, count, isAuthenticated }) => {
    const [ focus, setFocus ] = useState(false);
    const [coordinates, setCoordinates] = useState({latitude: 'none', longitude: 'none'});
    const [link, setLink] = useState('/services');
    const [textValue, setTextValue] = useState('')
    // const [nextDate, setNextDate] = useState(date.setMonth(date.getMonth() + 2));
    const dispatch = useDispatch();
    const router = useRouter();
    const wrapperRef = useRef(null);

    // useEffect(() => {
    //     // const todayDate = new Date();
    //     // todayDate.setMonth(todayDate.getMonth() + 1);
    //     // setNextDate(todayDate)
    //     console.log(nextDate)
    // }, [])

    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setFocus(false);
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef]);

    const setUserLocation = () => {
        // dispatch(selectLocation({name: 'Explore Nearby Locations'}))
        setTextValue('Explore Nearby Locations')
        router.push('/maps')
    }

    const handleClick = () => {
        setFocus('selectService')
    }

    // useEffect(() => {
    //     if ("geolocation" in navigator) {
    //         navigator.geolocation.getCurrentPosition(function(position) {
    //             setCoordinates({latitude: position.coords.latitude, longitude: position.coords.longitude})
    //           });
    //       } 
    // },[])

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
            <div className="selector-container">
                <div className="selector-borders">
                    <div className="label-container">
                    <div className="pickup-location move-align move-align-input input-one border-right">
                        <Label className="services-label">Services</Label>
                        <Input placeholder="Select services" onClick={() => setFocus('selectService')} readOnly={true} className="location-input"></Input>
                    </div>
                    <hr className="divider" id="divider" />
                    <div className="appointment-time move-align move-align-input border-left input-two border-right">
                        <Label className="services-label">Appt. time</Label>
                        <Input placeholder="Select date" className="time-input" readOnly={true} value={date === 'Select a Date' ? '' : date} onClick={() => setFocus('aptTime')}></Input>
                    </div>
                    <hr className="divider" id="divider-two"/>
                    <div className="services-required move-align move-align-input border-left input-three">
                        <Label className="services-label">Location</Label>
                        <Input placeholder="Pick Up Location?" className="services-input" value={textValue} readOnly={true} onClick={() => setFocus('pickUp')}></Input>
                    </div>
                    </div>
                    <Link href={link}>
                    <button className="move-align-right button-services" color="#1c978b">
                    <span className="material-icons icon-services">
                    search
                    </span>
                    </button>
                    </Link>
                </div>
                { focus === 'pickUp' &&
                    <div className="set-location-pop" ref={wrapperRef}>
                        <div className="set-pop-container">
                            <img src={'/img/google-maps.png'} alt="" className="logo-left-popup" />
                            <div className="text-location-popup" onClick={() => setUserLocation('')}>
                            Explore Nearby Locations
                            </div>
                        </div>
                    </div>
                }
                { focus === 'aptTime' && 
                    <div className="set-time-pop" ref={wrapperRef}>
                        <CalendarDisplay handler={handleClick} link={link}/>
                    </div>
                }
                { focus === 'selectService' && 
                    <div className="set-service-pop" ref={wrapperRef}>
                        <SelService simpleHeight='380px' buttons='pop'link={link}/>
                    </div>
                }
            </div>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        location: state.Booking.location,
        date: state.Booking.date,
        count: state.Booking.count,
        isAuthenticated: state.Auth.isAuthenticated,
    }
}

export default connect(mapStateToProps, {selectLocation})(AppointmentPresentation);