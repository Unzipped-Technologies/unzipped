import React, {useEffect, useState} from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import Nav from '../components/Navbar/ColorNav';
import Icon from "@material-ui/core/Icon";
import { parseCookies } from "../services/cookieHelper";
import {connect, useDispatch} from 'react-redux';
import {fetchOrders} from '../redux/actions';
import InvoiceContainer from '../components/payment/InvoiceContainer';

const Receipt = ({token}) => {

    return (
        <React.Fragment>
        <div className="receipt-page">
        <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap" rel="stylesheet"></link>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@600&display=swap" rel="stylesheet"></link>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap" rel="stylesheet"></link>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@700&display=swap" rel="stylesheet"></link>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        <title>Unzipped | Receipt</title>
        <meta name="Unzipped | Receipt" content="Unzipped"/>
        </Head>
        <div className="service-header-1" >
            <Nav popBox="services" />
        </div>
        <div className="invoice-content">
            <div className="receipt-invoice" id="services-invoice" onClick={() => Router.push('/services')}>
                <Icon className="material-icon-back-cart">arrow_back_ios</Icon>
                <h4 className="float-left-cart">Services</h4>
            </div>
            <InvoiceContainer token={token}/>
        </div>
        </div>
        </React.Fragment>
    )
}

Receipt.getInitialProps = async ({ req, res }) => {
    const token = parseCookies(req)
    
      return {
        token: token && token,
      }
    }

export default Receipt;