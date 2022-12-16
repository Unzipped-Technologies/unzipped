import React, {useEffect, useState, useRef, useCallback } from 'react';
import Head from 'next/head';
import Router, { useRouter } from 'next/router';
import Nav from '../components/Navbar/ColorNav';
import Footer from '../components/Footer/alt-footer';
import Link from 'next/link';
import Icon from "@material-ui/core/Icon";
import {connect, useDispatch} from 'react-redux';
import { delCart, submitOrder, orderConfirmEmail, getPromo, resetOrder, resetTotal, updateVehicle, decodeVehicle, setTotal, userPayment, resetPromo } from '../redux/actions';
import CircularProgress from '@material-ui/core/CircularProgress';
import { parseCookies } from "../services/cookieHelper";
import Notification from '../components/animation/notifications';
import PaymentForm from '../components/Custom/Cart/paymentForm';
import VehicleForm from '../components/Custom/Cart/vehicleForm';
import { relativeTimeRounding } from 'moment';


// import { CardElement, useStripe, useElements, Elements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';
// import {stripePublishableKey} from '../config/keys';

// const stripePromise = loadStripe(stripePublishableKey);

const Cart = ({ cart, total, credits, date, time, location, orderHistory, promoValid, hotel, discount, status, usePromo, isHotel, promoApplied, isAdmin, defaultVehicle, token, access, code, make, model, makeLoading, modelLoading, error, message }) => {
    const [order, setOrder] = useState('');
    const [fixed, setFixed] = useState(false);
    const [focus, setFocus] = useState(false);
    const [mobileFocus, setMobileFocus] = useState(false);
    const [year, setYear] = useState('Year');
    const [color, setColor] = useState('Select a color...');
    const [stateAbv, setStateAbv] = useState('OH');
    const [vehicleFocus, setVehicleFocus] = useState(false);
    const [paymentFocus, setPaymentFocus] = useState(false);
    const [selMake, setSelMake] = useState('Make');
    const [selModel, setSelModel] = useState('Model');
    const [roomNumber, setRoomNumber] = useState('');
    const [valetNumber, setValetNumber] = useState('');
    const [manual, setManual] = useState('Automatic');
    const [loading, setLoading] = useState(false);
    const [promo, setPromo] = useState('');
    const [vin, setVin] = useState('Vin');
    const [license, setLicense] = useState('');
    const [roundTotal, setRoundTotal] = useState(total);
    const [roundCredits, setRoundCredits] = useState(credits);
    const [savings, setSavings] = useState(0);
    const [notifications, setNotifications] = useState('');
    const [valid, setValid] = useState(false);
    const router = useRouter();
    const dispatch = useDispatch();
    ///control cart scrolling
    const observer = useRef(null);
    const lastOrderRef = useCallback(node => {
            if (loading) return;
            if (observer.current) observer.current.disconnect()
            observer.current = new IntersectionObserver(entries => {
                if (entries[0].isIntersecting) {
                    setFixed(true)
                } else {setFixed(false)}
            })
            if (node) observer.current.observe(node)
            console.log('print More')
    }, [loading])
    const titleRef = useRef()

    const removeButton = (id, qty) => {
        dispatch(delCart(id, qty))
    }

    const updatePayment = (item) => {
        setPaymentFocus(item);
        titleRef.current.scrollIntoView({behavior: 'smooth'})
    }
      
    const submitPayment = (cookie) => {
        dispatch(submitOrder(cookie, order, roomNumber, valetNumber, manual));
        dispatch(userPayment());
    }
    const pushUser = (cookie) => {
        dispatch(orderConfirmEmail(cookie, order));
        setTimeout(() => {  setLoading(false); }, 2000);
        setNotifications('Payment Success');
        dispatch(resetOrder())
        setTimeout(() => {  setNotifications(''); }, 4000);
    }

    const bookButton = (ev) => {
        ev.preventDefault();
        if (paymentFocus === 'verified') {
            setLoading(true);
            let cookie;
            if (token?.access_token) {
                cookie = token?.access_token
            } else { cookie = access}
            submitPayment(cookie)
            return;
        } else if (vehicleFocus !== 'verified') {
            setLoading(true);
            setNotifications('Select Default Vehicle');
            setTimeout(() => {  setNotifications(''); }, 4000);
            setTimeout(() => {  setLoading(false); }, 4000);
            return;
        } else {
        setLoading(true);
        setNotifications('Select Payment Method');
        setTimeout(() => {  setNotifications(''); }, 4000);
        setTimeout(() => {  setLoading(false); }, 4000);
        return;
        }
    }


    const onApply = () => {
        if (usePromo && userType === 'Customer') {
            setNotifications('Enter Valid Promo');
            setTimeout(() => {  setNotifications(''); }, 4000);
        }
        if (code === promo) {
            return;
        }
        let cookie;
        let userType;
        if (isHotel) {
            userType = "Hotel";
        } else if (isAdmin) {
            userType = "Admin";
        } else { userType = "Any"; }
        if (token?.access_token) {
            cookie = token?.access_token
        } else {
            cookie = access
        }
        dispatch(getPromo(cookie, {code: promo, userType: userType}));

        calcDiscount()
    }

    const changePaymentFocus = (type) => {
        setPaymentFocus('loading');
        setValid(false);
        setTimeout(() => {  setPaymentFocus(type); }, 1000);
        if (type === 'credit') {
            setNotifications('Payment Failed, Please try again');
            setValid(true);
            setTimeout(() => {  setNotifications(''); }, 3000);
        }
    }

    const changeVehicleFocus = () => {
        setVehicleFocus('loading');
        setTimeout(() => {  
            if (defaultVehicle.make) {
            setVehicleFocus('verified'); 
            } else setVehicleFocus(false);
        }, 1500);
    }

    const handlePromoFocus = (e) => {
        setFocus(e.target.name);
    };

    const handlePromoChange = (e) => {
        const { name, value } = e.target;
        setPromo(value);
    };

    const handleVinFocus = (e) => {
        setFocus(e.target.name);
        setVin('')
    };
    const changeVin = (e) => {
        setVin(e.target.value);
    }
    const handleLicenseFocus = (e) => {
        setFocus(e.target.name);
        setLicense('')
    };
    const changeLicense = (e) => {
        setLicense(e.target.value);
    }

    const cartTotal = () => {
        const amt = cart.reduce((prev,next) => prev + next.price,0);
        return amt;
    }

    const userVehicle = () => {
        let cookie;
        if (token.access_token) {
            cookie = token.access_token
        } else {
            cookie = access
        }
        dispatch(decodeVehicle(cookie, { state: stateAbv, color: color, license: license.toUpperCase() }))
        changeVehicleFocus();
    }

    const calcDiscount = () => {
        if (discount) {
            setRoundTotal((total * discount).toFixed(2));
            setSavings((total - (total * discount)).toFixed(2));
            if (!promoApplied) {
                dispatch(setTotal(total * discount))
            }
        }
    }

    useEffect(() => {
        if (promoValid) {
            setNotifications(promoValid);
            setRoundCredits(credits.toFixed(2));
            setRoundTotal(cartTotal().toFixed(2));
            setSavings((0).toFixed(2));
            dispatch(setTotal(cartTotal()));
            dispatch(resetTotal())
            setTimeout(() => {  
                setNotifications('');
                dispatch(resetPromo()); 
            }, 4000);
        }
    }, [promoValid])

    useEffect(() => {
        calcDiscount()
    }, [discount])

    useEffect(() => {
        let cookie;
        if (token.access_token) {
            cookie = token.access_token
        } else { cookie = access}
        if (status) {
            pushUser(cookie);
            setTimeout(() => {  router.push('/receipt'); }, 3010);
        } else {
            if (message === "Payment Failed") {
                setNotifications('Payment Failed, Please try again');
                setValid(true);
                setLoading(false);
                setTimeout(() => {  setNotifications(''); }, 4000);
            }
        }
    }, [message, status])

    useEffect(() => {
        setOrder(Math.round(Math.random() * 1000000))
        setRoundCredits(credits.toFixed(2));
        setRoundTotal(total.toFixed(2));
        changeVehicleFocus();
        setSavings((total - credits).toFixed(2));
        if (code) {
            setPromo(code);
        }
    }, [total])


    return (
        <React.Fragment>
            <div className="cart-page"  id="main">
            <Head>
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap" rel="stylesheet"></link>
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@700&display=swap" rel="stylesheet"></link>
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
            <title>Cart | Unzipped</title>
            <meta name="Cart" content="Cart"/>
            </Head>
            <div className="service-header-1" >
                <Nav popBox="services" />
            </div>
                <div className="cart-content">
                    <div className="confirmAndPay" onClick={() => Router.back()}>
                        <Icon className="material-icon-back-cart">arrow_back_ios</Icon>
                        <h4 className="float-left-cart">Confirm and pay</h4>
                    </div>
                    <div className="cart-whole">
                    <div className="cart-left">
                        <div className="row-one-cart">
                            <h6 className="bold-cart">Cart</h6>
                            <div> </div>
                            <div className="order-num-bold">Order #: {order}</div>
                        </div>
                        {cart.length > 0 &&
                        <div className="cart-container-large">
                        {cart.map((item, index) => {
                            return (
                                <div key={index} className="cart-item-f">
                                    <button className="cart-remover" onClick={() => removeButton(item.id, item.quantity)}>
                                    <Icon className="material-icon-close">close</Icon>
                                    </button>
                                    <div className="cart-item-1">
                                        <div className="cart-desc-1">
                                            <img src={`/img/${item.image[0]}`} alt="" className="cart-img" />
                                            <div className="center-cart">
                                                <h5 className="item-name-cart">{item.name.length > 22 ? `${item.name.substring(0,22)}...` : item.name}</h5>
                                                <p className="cart-item-desc">{item.description[0].length > 120 ? `${item.description[0].substring(0,120)}...` : item.description[0]}</p>
                                            </div>
                                        </div>
                                        <div className="right-cart">
                                            <div className="cart-quantity-picker">
                                                <span className="mobile-label-cart">Qty: </span>
                                                {item.quantity > 0 ? `x${item.quantity}` : item.quantity}
                                            </div>
                                            <div className="cart-price-item">
                                                {item.price === 50 ? "Item Unavailable" : item.price > 1 ? `$${item.price}.00` : `$${item.price.toFixed(2)}`}
                                            </div>
                                        </div>
                                        <div className="line-below">
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                        </div>
                        }
                        {cart.length === 0 &&
                        <div className="cart-container-large">
                            <Link href="/services" className="services-links">
                            <p className="services-links">Add items to cart..</p>
                            </Link>
                        </div>
                        }
                        <div className="time-location-info">
                            <p className="receipt-title">Checkout</p>
                            <div className="data-box">
                                <div className="receipt-location">
                                    <Link href='/maps'>
                                    <button className="edit-receipt">Edit</button>
                                    </Link>
                                    <p className="receipt-location-title">Location</p>
                                    <p className="receipt-text">{location.name}</p>
                                    <p className="receipt-text">{location.address}</p>
                                </div>
                                <div className="receipt-time">
                                    <Link href="/schedule">
                                    <button className="edit-receipt">Edit</button>
                                    </Link>
                                    <p className="receipt-location-title">Date</p>
                                    <p className="receipt-text">{date}</p>
                                    <p className="receipt-text">{time}</p>
                                </div>
                            </div>
                        </div>
                        {hotel !== 'N/A' &&
                            <div className="stack-inputs">
                                <label style={{color: '#222'}}>Room #:</label>
                                <input value={roomNumber} onChange={(e) => setRoomNumber(e.target.value)} style={{border: '1px solid #999', paddingLeft: '10px', marginTop: '10px'}} className="orderInputs"/>
                                <label value={valetNumber} onChange={(e) => setValetNumber(e.target.value)} style={{color: '#222'}}>Valet ID #:</label>
                                <input style={{border: '1px solid #999', paddingLeft: '10px', marginTop: '10px'}} className="orderInputs"/>
                            </div>
                        }
                        <div id="vehicle-form-bottom">
                        <VehicleForm 
                            focus={vehicleFocus} 
                            setFocus={setVehicleFocus} 
                            changeFocus={userVehicle}
                            make={make} 
                            model={model} 
                            makeLoading={makeLoading} 
                            modelLoading={modelLoading} 
                            vin={vin}
                            setTransmission={setManual}
                            license={license}
                            year={year}
                            setYear={setYear}
                            error={error}
                            defaultVehicle={defaultVehicle}
                            changeVin={changeVin}
                            changeLicense={changeLicense}
                            handleLicenseFocus={handleLicenseFocus}
                            handleVinFocus={handleVinFocus}
                            color={color}
                            setColor={setColor}
                            selMake={selMake}
                            stateAbv={stateAbv}
                            setStateAbv={setStateAbv}
                            setSelMake={setSelMake} 
                            selModel={selModel} 
                            setSelModel={setSelModel}
                        />
                        </div>
                        <div id="payment-form-bottom">
                        <PaymentForm 
                            paymentFocus={paymentFocus} 
                            setPaymentFocus={updatePayment} 
                            valid={valid}
                            changePaymentFocus={changePaymentFocus}
                        />
                        </div>
                        <div id="dummy-div" ref={titleRef}></div>
                    </div>
                    <div className={fixed ? "cart-right-1" : "cart-right"}>
                        <div className="price-box">
                            <div className="cart-box-1">
                            <p className="order-sumary">ORDER SUMMARY</p>
                            </div>
                            <div className="cart-box-2">
                            <p className="promo-text">Enter Promo/Referral Code(s) Here?</p>
                            <div className="center-items">
                                <div className="input-cart-pro">
                                    <input 
                                        type="text" 
                                        placeholder="Enter promo code" 
                                        value={promo} 
                                        className="input-cart-i"
                                        onChange={handlePromoChange}
                                        onFocus={handlePromoFocus}
                                    />
                                    <button className="apply-button-cart" onClick={() => onApply()}>Apply</button>
                                </div>
                            </div>
                            <div className="cart-subtotal">
                                <div className="move-item-left">
                                <p className="cart-box-text">Subtotal</p>
                                </div>
                                <div className="move-item-right">
                                <p className="cart-box-item">{`$${roundTotal}`}</p>
                                </div>
                            </div>
                            <div className="cart-subtotal">
                            <div className="move-item-left">
                                <p className="cart-box-text">Pickup</p>
                            </div>
                            <div className="move-item-right">
                                <p className="cart-box-item">FREE</p>
                            </div>
                            </div>
                            <div className="cart-subtotal">
                            <div className="move-item-left">
                                <p className="cart-box-text">Estimated Tax</p>
                            </div>
                            <div className="move-item-right">
                                <p className="cart-box-item" id="est-tax">-</p>
                            </div>
                            </div>
                            </div>
                            <div className="cart-box-3">
                                <div className="cart-subtotal" id="total-box">
                                <div className="move-item-left">
                                    <p className="cart-box-text-2">TOTAL</p>
                                    </div>
                                    <div className="move-item-right-1">
                                    <p className="cart-box-item" id="total-price-buy">{`$${roundTotal}`}</p>
                                    </div>
                                </div>
                                <div className="cart-savings">
                                    Or {`$${roundCredits}`} w/ membership <Link href="/" ><span id="membership-s">{`⊕`}</span></Link>
                                </div>
                            </div>
                            <div className="cart-box-4">
                                <div className="cart-subtotal">
                                    <div className="move-item-left">
                                    <div className="cart-box-text-1">Total Savings <Icon className="material-icons-down">arrow_down_ios</Icon></div>
                                    </div>
                                    <div className="move-item-right" id="color-red">
                                    <p>{`$${savings}`}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="input-cart-mobile">
                            {mobileFocus === "promo-mobile" &&
                            <>
                            <input 
                                type="text" 
                                placeholder="Enter promo code" 
                                value={promo} 
                                className="input-cart-5"
                                onChange={handlePromoChange}
                                onFocus={handlePromoFocus}
                            />
                            <button 
                                className="apply-button-cart" 
                                onClick={() => {
                                    onApply();
                                    setMobileFocus(false);
                                }}
                            >Apply</button>
                            </>
                            }
                            {mobileFocus !== "promo-mobile" &&
                            <div className="promo-no-focus" onClick={() => setFocus("promo-mobile")}>
                            <span>
                            <button id="mobile-promo" onClick={() => setMobileFocus("promo-mobile")}>Promo code?</button>
                            </span>
                            <p className="apply-button-cart-2" >Subtotal: {roundTotal}</p>
                            {/* //onClick={() => onApply()} */}
                            </div>
                            }
                        </div>
                        <div className="checkout-button">
                            <button className="learn-more-button" id="lmb2" onClick={(ev) => bookButton(ev)}>{!loading ? 'CHECKOUT' : <CircularProgress />}</button>
                        </div>
                    </div>

                    </div>
                    <Notification error = {notifications}/>
                </div>
            <div className="footer-container-1" id="footers" ref={lastOrderRef}>
            <Footer />
            </div>
            </div>
        </React.Fragment>
    )
}

Cart.getInitialProps = async ({ req, res }) => {
    const token = parseCookies(req)
    
      return {
        token: token && token,
      }
    }

const mapStateToProps = (state) => {
    return {
        cart: state.Booking.cart,//existingItems,//
        total: state.Booking.total,
        credits: state.Booking.credits,
        date: state.Booking.date,
        time: state.Booking.time,
        location: state.Booking.location,
        access: state.Auth.token,
        code: state.Booking.promo.code,
        make: state.Vehicle.make,
        model: state.Vehicle.model,
        makeLoading: state.Vehicle.makeLoading,
        modelLoading: state.Vehicle.modelLoading,
        error: state.Auth.error,
        defaultVehicle: state.Auth.user.defaultVehicle,
        status: state.Booking.orderStatus.success,
        message: state.Booking.orderStatus.message,
        usePromo: state.Auth.user.usePromo,
        isHotel: state.Auth.user.isHotel,
        isAdmin: state.Auth.user.isAdmin,
        promoValid: state.Booking.promo.error,
        discount: state.Booking.promo.discount,
        promoApplied: state.Booking.promoApplied,
        hotel: state.Booking.hotel,
        orderHistory: state.Booking.orderHistory,
    }
}

export default connect(mapStateToProps, {delCart, submitOrder, resetOrder, resetPromo, updateVehicle, orderConfirmEmail, decodeVehicle, setTotal, userPayment, resetTotal, getPromo})(Cart);