import React, {useEffect, useState} from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {connect, useDispatch} from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import {fetchOrders} from '../../redux/actions';
import InvoiceMain from './InvoiceMain';

const Container = ({token, access, loading, orderHistory, email, phone, discount}) => {
    const [showOrders, setShowOrders] = useState(1)
    const dispatch = useDispatch();
    const router = useRouter();
    const [focus, setFocus] = useState(0);

    const getOrders = () => {
        let cookie;
        if (token.access_token) {
            cookie = token.access_token
        } else {
            cookie = access
        }
        dispatch(fetchOrders(cookie));
    }

    const changeFocus = (index) => {
        setFocus(index);
    }

    const increaseShow = () => {
        setShowOrders(showOrders + 3)
    }

    useEffect(() => {
        console.log('useEffect')
        getOrders();
    }, [])

    return (
        <div className="invoice-whole">
        <h4>My Orders</h4>
        <p className="invoice-text">Take control of your recent Vohnt orders. Visit this page to track orders, cancel an order, or initiate a <Link href="contact">return</Link>.</p>
        <p className="invoice-text">Do you have questions about your order? Please visit our <Link href="/faqs">FAQs</Link> page for answers..</p>
        {orderHistory.length > 0 &&
        <>
        {orderHistory.reverse().map((item, index) => (
            <div key={index}>
            {index < showOrders &&
            <>
            <InvoiceMain 
                item={item} 
                index={index} 
                changeFocus={changeFocus} 
                email={email} 
                loading={loading}
                focus={focus}
                discount={discount}
                phone={phone}
                
            />
            {showOrders === 1 &&
                <div style={{marginTop: '8px', color: '#1428a0', cursor: 'default'}} onClick={increaseShow}>
                    <p>See More...</p>
                </div>
            }
            </>
            }
            </div>
        ))}
            {showOrders === 4 &&
                <div style={{marginTop: '8px', color: '#1428a0'}} onClick={increaseShow}>
                    <p>See More...</p>
                </div>
            }
            {showOrders === 7 &&
                <div style={{marginTop: '8px', color: '#1428a0'}} onClick={increaseShow}>
                    <p></p>
                </div>
            }
        </>
        }
        {orderHistory.length === 0 &&
            <>
            {loading ?
            <CircularProgress />
            :
            <Link href="/services">
            <p id="make-an-order">Make an order to continue...</p>
            </Link>
            }
            </>
        }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        access: state.Auth.token,
        loading: state.Booking.loading,
        orderHistory: state.Booking.orderHistory,
        email: state.Auth.user.email,
        discount: state.Booking.orderHistory,
        phone: state.Booking.orderHistory.phone,
    }
}

export default connect(mapStateToProps, {fetchOrders})(Container);