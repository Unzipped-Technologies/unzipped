import React, {useEffect, useState} from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Icon from "@material-ui/core/Icon";
import {connect, useDispatch} from 'react-redux';
import { addCart, delCart } from '../../../redux/actions';

const BookService = ({ item, count, cart, bookNow, quantity, date, location, isAuthenticated }) => {
    const [focus, setFocus] = useState(false);
    const [qty, setQty] = useState(quantity)
    const [link, setLink] = useState('/services')

    const addQty = () => {
        setQty(qty + 1)
        dispatch(addCart(item.name, item.price, item.id))
    }

    const delQty = () => {
        setQty(0);
        dispatch(delCart(item.id, qty));                         
    }

    const dispatch = useDispatch();

    const getDetails = (item) => {
        setFocus(item.name);
    }

    const closeDetails = () => {
        setFocus(false);
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

    const descriptionPoint = () => {
        if (item.description[1]) {
            return (
                <ul className="service-bullet">
                    {item.description.map((content, index) => {
                        return (
                            <li key={index} id="bullet-blog">
                                {content}
                            </li>
                        )
                    })}
                </ul>
            )
        }
        return (
            <p className="service-description">{item.description}</p>
        )
    }

    useState(() => {
        if (cart.length > 0) {
            let existed_item = cart.find(e => e.id === item.id);
            // setQty(existed_item.quantity)
        }

    }, [])

    useEffect(() => {
        setQty(quantity)
    }, [quantity])

    const imageRender = () => {
        if (item.image[1]) {
            return (
                <div className="double-image">
                <img src={`/img/${item.image[0]}`} alt="" className="service-image"/>
                <img src={`/img/${item.image[1]}`} alt="" className="service-image" id="service-img-one"/>
                </div>
            )
        }
        return <img src={`/img/${item.image[0]}`} alt="" className="service-image"/>
    }

    return (
        <React.Fragment>
            <div className="service-left">
                <div>
                    {imageRender()}
                </div>
                <div className="service-text">
                    <p className={item.name.length < 19 ? "service-title" : "service-title-t"}>{item.name}</p>
                    {item.name !== focus &&
                    <p className="service-description">{item.description[0].substring(0,35)}...</p>
                    }
                    {item.name === focus &&
                        descriptionPoint(item.description)
                    }
                    {item.name !== focus && 
                        <div className="sbtn">
                        <button className="service-details" onClick={() => getDetails(item)}>details</button>
                        </div>
                    }
                    {item.name === focus && 
                        <div className="sbtn">
                        <button className="service-details" id="service-close" onClick={() => closeDetails(item)}><Icon className="up-arrow-close">keyboard_arrow_up</Icon></button>
                        </div>
                    }
                    <p className="service-price">{item.price === 50 ? 'Coming Soon!' : item.price > 1 ? `$${item.price}.00` : `$${item.price}`}</p>
                </div>
            </div>
            {/* <p>distance: {CalcDistance(coordinates, item.location)}</p> */}
            <div className={item.name !== focus ? "service-buttons" : "alt-service-buttons"}>
                <div id="icon-add-service">
                {qty === 0 &&
                <>
                <button onClick={() => addQty()} id="add-button-c">
                    <Icon className="material-icons service-icons" id="plus-icon" >add</Icon>
                    <p className="text-button-service">Add</p>
                </button>
                </>
                }
                {qty > 0 &&
                <div className="counter-box">
                <button onClick={() => delQty()} id="add-button-c">
                    <Icon className="material-icons service-icons" id="minus-icon" >remove</Icon>
                </button>
                <div className="quantity-display">{qty}</div>
                <button onClick={() => addQty()} id="add-button-c">
                    <Icon className="material-icons service-icons" id="plus-icon-2" >add</Icon>
                </button>
                </div>
                }
                </div>
                <div id={qty === 0 ? "icon-send-service" : "icon-send-service-2"}>
                <button id="send-button-c" onClick={() => bookNow()}>
                <Icon className="material-icons service-icons" id="airplane-icon">send</Icon>
                <p className="text-button-service">{qty === 0 ? 'Book Now' : ''}</p>
                </button>
                </div>
            </div>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        count: state.Booking.count,
        cart: state.Booking.cart,
        isAuthenticated: state.Auth.isAuthenticated,
        location: state.Booking.location,
        date: state.Booking.date
    }
}

export default connect(mapStateToProps, {addCart, delCart})(BookService);