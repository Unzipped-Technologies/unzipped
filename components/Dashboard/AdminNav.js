import React, {useState, useEffect, useRef} from 'react';
import Head from 'next/head';
import Icon from "@material-ui/core/Icon";
import Link from 'next/link';
import { connect, useDispatch } from 'react-redux';
import { logoutUser, clearCart } from '../../redux/actions';
import { useRouter } from 'next/router';

const AdminNav = ({isAuthenticated, userType}) => {
    const [focus, setFocus] = useState(false);
    const wrapperRef = useRef(null);
    const dispatch = useDispatch();
    const router = useRouter();

    const signOut = () => {
        dispatch(clearCart())
        dispatch(logoutUser()) 
        router.push('/login')
    }

    const MenuItems = () => {
        if (isAuthenticated) {
            if (userType === "Admin") {
                return (
                    [
                        { names: "Home", links: `/`},
                        { names: "Sign out", links: `/api/auth/logout`},
                        // { names: "Dashboard", links: `/dashboard/calendar`},
                        // { names: "Schedule", links: `/calendar/driver`},
                        // { names: "Orders", links: `/receipt`},
                        { names: "<hr />", links: ''},
                        // { names: "Calendar", links: `/dashboard/calendar`},
                        // { names: "Orders", links: `/dashboard/orders`},
                        { names: "Customers", links: `/dashboard/customers`},
                        // { names: "Garages", links: `/dashboard/garages`},
                        // { names: "Promos", links: `/dashboard/promos`},
                        { names: "Admin", links: `/dashboard/admin`}
                    ]
                )
            }
            // if (userType === "Driver") {
            //     return (
            //         [
            //             { names: "Home", links: `/`},
            //             { names: "Sign out", links: `/api/auth/logout`},
            //             { names: "Dashboard", links: `/calendar/driver`},
            //             { names: "Orders", links: `/receipt`},
            //             { names: "<hr />", links: ''},
            //             { names: "Schedule an appointment", links: `/schedule`},
            //             { names: "Become a partner", links: `/partners` },
            //             { names: "Help", links: `/faqs`},
            //         ]
            //     )
            // }
            // if (userType === "Hotel") {
            //     return (
            //         [
            //             { names: "Home", links: `/`},
            //             { names: "Sign out", links: `/api/auth/logout`},
            //             { names: "Dashboard", links: `/dashboard/hotel/calendar`},
            //             { names: "Orders", links: `/receipt`},
            //             { names: "<hr />", links: ''},
            //             { names: "Calendar", links: `/dashboard/hotel/calendar`},
            //             { names: "Orders", links: `/dashboard/hotel/orders`},
            //             { names: "Total", links: `/dashboard/hotel/total`},
            //         ]
            //     )
            // }
            return (
                [
                    { names: "Home", links: `/`},
                    { names: "Sign out", links: `/api/auth/logout`},
                    { names: "Membership", links: `/register`},
                    // { names: "Orders", links: `/receipt`},
                    { names: "<hr />", links: ''},
                    { names: "Schedule an appointment", links: `/schedule`},
                    { names: "Become a partner", links: `/partners` },
                    { names: "Help", links: `/faqs`},
                ]
            )
        } else {
            return (
                [
                    { names: "Home", links: `/`},
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

    return (
        <React.Fragment>
            <Head>
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
            </Head>
            <div className="top-bar">
                <div className="search-bar">
                    <div className="text-search">
                        <Icon className="material-icons" id="move-search">search</Icon>
                        <input type="text" placeholder="search" className="searchbox-input"/>
                    </div>
                </div>
                <div className="top-bar-menu" >
                    <Icon className="material-icons">notifications_none</Icon>
                    <button onClick={() => setFocus(true)} style={{outline: 'none', backgroundColor: 'transparent', border: 'none', position: 'relative', top: '-8px'}}>
                    <Icon className="material-icons" >dehaze</Icon>
                    </button>
                    {focus &&
                        <div onBlur={() => setFocus(false)} ref={wrapperRef} className="menu-box-dashboard">
                            <ul className="nav-text-right">
                            {MenuItems().map((item, index) => (
                                <li key={index} className={item !== "<hr />" ? "menu-item-comp" : "line-div-comp"}>
                                {item.names === "<hr />" &&
                                    <hr className="line-div words-nav"/> 
                                }
                                {item.names !== "<hr />" &&
                                    <>
                                    {item.names !== 'Sign out' &&
                                        <a href={item.links} className="link-styleless">
                                        <span className="words-nav" >{item.names}</span> 
                                        </a>
                                    }
                                    {item.names === 'Sign out' &&
                                        <button onClick={() => signOut()} className="link-styleless" id="menu-signout">
                                        <span className="words-nav" >{item.names}</span> 
                                        </button>
                                    }
                                    </>
                                }    

                            </li>
                            ))}
                            </ul>
                        </div>
                    }
                </div>

            </div>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.Auth.isAuthenticated,
        userType: state.Auth.user.userType
    }
}

export default connect(mapStateToProps, { logoutUser, clearCart })(AdminNav);