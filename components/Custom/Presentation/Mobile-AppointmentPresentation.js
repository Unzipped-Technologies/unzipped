import React, { useState, useRef, useEffect } from 'react';
// import { Input } from 'reactstrap';
// import Link from 'next/link';
import Head from 'next/head';
// import Icon from "@material-ui/core/Icon";
// import SimpleBar from 'simplebar-react';
import { connect, useDispatch } from 'react-redux';
import { startAppScreen, stopAppScreen, addCart, delCart } from '../../../redux/actions';
import Presentationservice from '../Presentation/Presentation-service';
// import BookingBubbles from '../Booking/Booking-bubbles';

const MobileAppointment = ({existingItems, cart}) => {
    const [focus, setFocus] = useState(false);
    const [qty, setQty] = useState(0);
    const wrapperRef = useRef(null);
    const dispatch = useDispatch();
    const [itemType, setItemType] = useState('CAR CARE');

    const services = [
        'CAR CARE',
        'CAR SERVICE',
        'CAR REPAIR'
    ]

    const popupService = () => {
        setFocus('services');
        dispatch(startAppScreen())
    }

    const popupClose = () => {
        setFocus(false);
        dispatch(stopAppScreen())
    }

    const displayClick = (e) => {
        setItemType(e)
    }


    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                popupClose();
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef]);

    return (
        <React.Fragment>
            <Head>

            </Head>
            <div className="center-m">
            <div className={focus !== 'services' ? "mobile-container" : "mobile-container-hidden"}>
                <span className="material-icons icon-services-m">
                    search
                </span>
                <div className="location-input-m">
                    <div className="services-input" onClick={() => popupService()}>Book a service?</div>
                </div>
            </div>
            {focus === 'services' &&
            <div className="popup-services" ref={wrapperRef}>
                <Presentationservice simpleHeight='70vh'/>
            </div>
        }
        </div>

    </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        cart: state.Booking.cart,
        existingItems: state.Booking.existingItems,
    }
}

export default connect(mapStateToProps, {startAppScreen, stopAppScreen, addCart, delCart})(MobileAppointment);