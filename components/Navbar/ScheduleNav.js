import React, { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Button } from 'reactstrap';
import { connect, useDispatch } from 'react-redux';
import { clearCart, logoutUser } from '../../redux/actions';
import Icon from "@material-ui/core/Icon";
import MenuDropdown from '../Custom/MenuDropdown';
import Scheduler from '../Custom/Presentation/MapSelector';
import { useRouter } from 'next/router';


const ScheduleNav = ({link, isAuthenticated}) => {
    const [focus, setFocus] = useState(false);
    const router = useRouter()
    const dispatch = useDispatch();
    const wrapperRef = useRef(null);

    const MenuItems = () => {
        if (isAuthenticated) {
            return (
                [
                    { names: "Sign out", links: `/api/auth/logout`},
                    { names: "Membership", links: `/register`},
                    { names: "<hr />", links: ''},
                    { names: "Schedule an appointment", links: `/schedule`},
                    { names: "Become a partner", links: `/partners` },
                    { names: "Help", links: `/faqs`},
                ]
            )
        } else {
            return (
                [
                    { names: "Sign up", links: `/register`},
                    { names: "Log in", links: `/login`},
                    { names: "<hr />", links: ''},
                    { names: "Schedule an appointment", links: `/schedule`},
                    { names: "Become a partner", links: `/partners` },
                    { names: "Help", links: `/faqs`},
                ]
            )
        }
    }

    const signOut = () => {
        dispatch(logoutUser());
        dispatch(clearCart());
        router.push('/');
        return;
    }

    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
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

    // useEffect(() => {
    //     if(isAuthenticated === false) {
    //         window.location.href = '/';
    //     }
    // }, [isAuthenticated])

    return (
        <React.Fragment>
            <Head>
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
            </Head>
            <div className="S-Nav-Container">
                <div >
                    <Link href="/">
                    <img src={'/img/cursive-logo-purple.png'} alt="" className="purple-logo-nav"/>
                    </Link>
                </div>
                <div className="selector-small">
                    <Scheduler link={link}/>
                </div>
                <div className="right-S-nav">
                    <Link href="/partners">
                    <div className="partner-S">
                        <span className="driver-text-S">
                            Become a partner
                        </span>
                    </div>
                    </Link>
                    <div className="button-right-Sn">
                        <Button className="right-nav-button" onClick={() => setFocus('dropdown')}>
                        <Icon className="material-icons icon-sn" id="icon-left-sn">
                        menu
                        </Icon>
                        <Icon className="material-icons icon-sn">
                        account_circle
                        </Icon>
                        </Button>
                    </div>
                </div>
                <div className="selector-small-mobile">
                    <Scheduler />
                </div>
            </div>
            {focus === "dropdown" && 
                <div onBlur={() => setFocus(false)} ref={wrapperRef} className="nav-right-box">
                <MenuDropdown MenuItems={MenuItems()} signOut={signOut}/>
                </div>
            }
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.Auth.isAuthenticated,
    }
}

export default connect(mapStateToProps, {logoutUser, clearCart})(ScheduleNav);