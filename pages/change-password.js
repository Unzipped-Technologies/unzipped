import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useRouter } from 'next/router';
import UpdateKeyDataForm from '../components/unzipped/UpdateKeyDataForm'
import {changePassword} from '../redux/actions';
import Nav from '../components/unzipped/header';
import { parseCookies } from "../services/cookieHelper";

const Reset = ({ error, token }) => {
    const [loading, setLoading] = useState(false);
    const router = useRouter()

    const linkPush = (link) => {
        router.push(link)
    }

    const [marginBottom, setMarginBottom] = useState('0px');

    useEffect(()=>{
        const handleResize = () => {
            if (window.innerWidth < 680) {
                setMarginBottom('72px');
            } else {
                setMarginBottom('77px');
            }
        };

        // Add an event listener for window resize
        window.addEventListener('resize', handleResize);

        // Initial call to set the marginBottom based on the current window width
        handleResize();

        // Remove the event listener when the component unmounts
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    },[])

    const resetPassword = (ev) => {
        ev.preventDefault();
        setLoading(true)
        changePassword(user, token.access_token)
    }

    return (
        <React.Fragment>
            <Head>
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap" rel="stylesheet"></link>
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
            <title>Change Password | Unzipped</title>
            <meta name="Change Password | Unzipped" content="Change Password"/>
            </Head>
            <Nav token={token} marginBottom={marginBottom} />
            <UpdateKeyDataForm 
                type='password' 
                title="Change Password" 
                onBack={() => linkPush('/dashboard/account')}
                onSubmit={resetPassword}
            />
        </React.Fragment>
    )
}

Reset.getInitialProps = async ({ req, res }) => {
    const token = parseCookies(req)
    
      return {
        token: token && token,
      }
    }

const mapStateToProps = (state) => {
    return {
        error: state.Auth.error,
    }
}

const mapDispatchToProps = dispatch => {
    return {
      changePassword: bindActionCreators(changePassword, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Reset);