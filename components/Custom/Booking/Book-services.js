import React, {useEffect, useState} from 'react';
import Head from 'next/head';
import Icon from "@material-ui/core/Icon";
import Link from 'next/link';
import CircularProgress from '@material-ui/core/CircularProgress';
import {connect, useDispatch} from 'react-redux';
import { addCart, delCart, loadProducts } from '../../../redux/actions';
import BookComponent from './book-component';
import { useRouter } from 'next/router';


const BookService = ({cart, existingItems, count, location, date, isAuthenticated}) => {
    const [focus, setFocus] = useState(false);
    const [link, setLink] = useState('/services');
    const dispatch = useDispatch();
    const router = useRouter();

    const setQty = (i) => {
        let e = cart.find(item => item.id === existingItems[i].id)
            if (e) {
                return e.quantity
            }
            return 0
        
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

    const bookNow = () => {
        router.push(link)
    }

    useEffect(() => {
        if (existingItems.length === 0) {
            dispatch(loadProducts())
        }
    }, [])


    return (
        <React.Fragment>
            <Head>
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap" rel="stylesheet"></link>
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
            </Head>
            <div className="product-container">
                <div className="maps-desc-header">
                    <h4  className="header-services-title">Select a Service:</h4>
                </div>
                <div className="maps-list-container">
                    {existingItems.length === 0 &&
                        <CircularProgress />
                    }
                    {existingItems.length !== 0 &&
                    <>
                    {existingItems.map((item, index) => {
                        return (
                            <div key={index + item.id}>
                            {item.id < 4 &&
                            <div key={index} className="service-item">
                                <BookComponent item={item} bookNow={bookNow} index={index} quantity={setQty(index)}/>
                            </div>
                            }
                            </div>
                        )
                    })}
                    </>
                    }
                </div>
                <Link href="/services" >
                <button className="see-more-items">See More...</button>
                </Link>
            </div>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        cart: state.Booking.cart,
        existingItems: state.Booking.existingItems,
        count: state.Booking.count,
        isAuthenticated: state.Auth.isAuthenticated,
        location: state.Booking.location,
        date: state.Booking.date
    }
}

export default connect(mapStateToProps, {addCart, delCart, loadProducts})(BookService);