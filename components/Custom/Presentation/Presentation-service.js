import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import CircularProgress from '@material-ui/core/CircularProgress';
import Icon from "@material-ui/core/Icon";
// import googleMaps from '../../../assets/img/google-maps.png';
import Calendar from 'react-calendar';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import { connect, useDispatch } from 'react-redux';
import { selectDate, selectTimes, delCart, loadProducts } from '../../../redux/actions';
import BookComponent from '../Booking/book-component';
import { useRouter } from 'next/router';
 
// import {Calendar} from 'react-modern-calendar-datepicker';

const CalendarDisplay = ({ getServices, count, cart, total, simpleHeight, buttons, display, isAuthenticated, location, date, loading }) => {
    const [focus, setFocus] = useState('CAR CARE');
    const [carts, setCarts] = useState(cart);
    const [link, setLink] = useState('/services');
    const [buttonLoading, setButtonLoading] = useState(false);
    const [alert, setAlert] = useState(false);
    const router = useRouter();
    const dispatch = useDispatch();

    const services = [
        'CAR CARE',
        'CAR SERVICE',
        'CAR REPAIR'
    ]

    const displayClick = (e) => {
        setFocus(e)
    }
 
    const itemsInCart = () => {
        let x = 0
        cart.map((item) => {
            x = x + item.quantity
        })
        return x;
    }

    const removeButton = (id, qty) => {
        dispatch(delCart(id, qty))
    }

    const setQty = (i) => {
        let e = cart.find(item => item.id === getServices[i].id)
            if (e) {
                console.log(e)

                return e.quantity
            }
            return 0
    }

    const bookNow = () => {
        if (cart.length > 0) {
            router.push(link)
        } else {
            setAlert(true);
        }
    }

    useEffect(() => {
        if (getServices.length < 1) {
            dispatch(loadProducts());
        }
    }, [])

    useEffect(() => {
        setCarts(cart);
    }, [cart])

    useEffect(() => {
        if (cart.length > 0) {
            setAlert(false);
        } 
    }, [cart])

    useEffect(() => {
            if (count < 1) {
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
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@600&display=swap" rel="stylesheet"></link>
            </Head>
            <div className="set-pop-container-service">
                <div className="services-cart">
                {/* <h4>Services:</h4> */}
                    <div className="service-headers">
                        {services.map((item, index) => {
                            return (
                            <div className={focus !== item ? "header-container" : "header-container-2"} onClick={ () => displayClick(item)} key={index}>
                                <h6 className="title-service-type">{item}</h6>
                            </div>
                            )
                        })}
                    </div>
                    <div className="mobile-cart">
                        <div>
                        {carts.map((item, index) => {
                            return (
                                <div className="item-bubble" key={index} onClick={() => removeButton(item.id, item.quantity)}>
                                    <img src={`/img/${item.image[0]}`} alt="" className="small-cart-icon"/>
                                    <span className="text-sub-cart">x{item.quantity}</span>
                                </div>
                            )
                        })}
                        {alert &&
                            <p style={{color: 'red', width: '165px', paddingLeft: '2px', position: 'relative', top: '-3px'}}>Select items to continue...</p>
                        }
                        </div>
                        {display !== 'dashboard' &&
                        <button onClick={() => bookNow()} alt="" className="bookItButton" style={{backgroundColor: '#000', outline: 'none', border: 'none'}}><div className="right-book-sc">Book Now</div></button>
                        }
                    </div>
                    <div className="book-details">
                        {loading &&
                            <div className="center-div"><CircularProgress /></div>
                        }
                        <SimpleBar className="simple-Bar-one" style={{ width: '99%', height: simpleHeight, overflow: 'hidden auto' }}>
                        {getServices.map((item, index) => {
                            return (
                            <div key={index + item.name}>
                            {item.type === focus &&
                            <div key={index} className="service-item-1">
                                <BookComponent item={item} bookNow={bookNow} index={index} quantity={setQty(index)} change="service-item-1"/>
                            </div>
                            }
                            </div>
                            )
                        })}
                        </SimpleBar>
                    </div>
                </div>
                <div className="right-cart-11">
                    
                    <div className="map-box-c">
                        <div className="items-selected-container">
                            <div className="list-item-c">
                                <p className="cart-text-title">Name</p>
                                <p className="cart-price-title">Price</p>
                                <p className="cart-qty-title">Qty.</p>
                                <p className="cart-remove-title">Remove</p>
                            </div>
                        </div>
                    {itemsInCart() > 0 &&
                    <>
                    {carts.map((item, index) => {
                        return (
                            <div className="container-no-padding" key={index}>
                            {item.quantity > 0 &&
                                <div className="items-selected-container">
                                    <div className="list-item-c">
                                        <p className="cart-text-pop">{item.name}</p>
                                        <p className="cart-price-pop">{item.price !== 50 ? item.price > 1 ? `$${item.price}.00` : `$${item.price}` : 'Item Not Available' }</p>
                                        <p className="cart-qty-pop">{item.quantity}</p>
                                        <button className="cart-remove-pop" onClick={() => removeButton(item.id, item.quantity)}>x</button>
                                    </div>
                                </div>
                            }
                            </div>
                        )
                    })}
                    </>
                    }
                    {itemsInCart() < 1 &&
                        <div className="center-content">
                            Add items to your cart.
                        </div>
                    }
                    <div className="cart-total-shell">
                            <div className="cart-total">
                                {total > 1 ? `$${total}.00` : `$${total.toFixed(2)}`}
                            </div>
                    </div>
                    </div>
                    {itemsInCart() > 0 &&
                    <div className={buttons === 'services' ? "book-now-old" : "book-now-button"} >
                        {display !== 'dashboard' &&
                        <Link href={link} >
                        <button className="learn-more-button" onClick={() => setButtonLoading(true)}>{buttonLoading ? <CircularProgress /> : 'Book Now'}</button>
                        </Link>
                        }
                    </div>
                    }
                </div>
            </div>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        getServices: state.Booking.existingItems,
        time: state.Booking.time,
        available: state.Booking.available,
        count: state.Booking.count,
        total: state.Booking.total,
        isAuthenticated: state.Auth.isAuthenticated,
        location: state.Booking.location,
        cart: state.Booking.cart,
        loading: state.Booking.loading
    }
}

export default connect(mapStateToProps, { selectDate, selectTimes, delCart, loadProducts })(CalendarDisplay);