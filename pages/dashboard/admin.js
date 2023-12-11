import React, {useEffect, useState} from 'react';
import Admin from '../../components/Dashboard/AdminPanel';
import Nav from '../../components/Dashboard/AdminNav';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import {connect, useDispatch} from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import { parseCookies } from "../../services/cookieHelper";
import Axios from 'axios';
import fileDownload from 'js-file-download';
import { colors } from '@material-ui/core';


const Dashboard = ({loading, token, cookies}) => {
    const [month, setMonth] = useState([]);
    const [selected, setSelected] = useState(2);
    const dispatch = useDispatch();

    const fixDate = (number) => {
        var month = new Array(12);
        let date = new Date().getMonth()
        let num = number + date
        month[0] = "Jan.";
        month[1] = "Feb.";
        month[2] = "March";
        month[3] = "April";
        month[4] = "May";
        month[5] = "June";
        month[6] = "July";
        month[7] = "Aug.";
        month[8] = "Sept.";
        month[9] = "Oct.";
        month[10] = "Nov.";
        month[11] = "Dec.";
        if (num > 11) {
            num = num - 12;
        } else if (num < 0) {
            num = num + 12;
        } else {
            num = num;
        }
        return month[num];
    }

    const updateMonth = () => {
        
        let dates = [-2, -1, 0, 1, 2]
        const newMonth = dates.map(item => fixDate(item))
        
        setMonth(newMonth)
    }

    useEffect(() => {
        updateMonth();
    }, [])

    return (
        <React.Fragment>
            <div className="main-dashboard">
                <Admin page={5} />
                <div className="right-dashboard">
                    <Nav/>

                    <div className="dashboard-main">
                    <SimpleBar className="simple-Bar-5" style={{ height: '90vh', width: '99%', overflowX: 'hidden' }}>
                    <div className="center-content-2">
                    <div className="dashboard-card card-admin-1" >
                    <div className="card-title">
                        <h4 className="title-admin-mobile">Sales Per Garage</h4>
                    </div>
                    <div className="tabs-container">
                    <div className="admin-tabs">
                        {month.map((item, index) => (
                            <div key={index} className={index === selected ? "tab-selected" : "tab-not-selected"} onClick={() => selectAMonth(index)}>
                                <p>{item}</p>
                            </div>
                        ))}
                    </div>
                    </div>
                    <SimpleBar className="simple-Bar-5" id="mobile-admin-scroll" style={{ height: '530px', width: '99%' }}>
                            <div className="garage-admin-container">
                                <div className="line-admin">
                                    <p>Name</p>
                                    <p className="admin-subtext">Total</p>
                                    <p className="admin-subtext">Quantity</p>
                                </div>
                                {loading ?
                                    <CircularProgress />
                                :
                                <>

                                </>
                                }
                            </div>
                    </SimpleBar>
                    </div>
                    <div className="dashboard-card  card-admin-1">
                    <div className="card-title">
                        <h4 className="title-admin-mobile">Sales Per Hotel</h4>
                    </div>
                    <div className="tabs-container">
                    <div className="admin-tabs">
                        {month.map((item, index) => (
                            <div key={index} className={index === selected ? "tab-selected" : "tab-not-selected"} onClick={() => selectAMonth(index)}>
                                <p>{item}</p>
                            </div>
                        ))}
                    </div>
                    </div>
                    <SimpleBar className="simple-Bar-5" id="mobile-admin-scroll-1" style={{ height: '530px', width: '99%' }}>
                            <div className="garage-admin-container">
                                <div className="line-admin">
                                    <p>Name</p>
                                    <p className="admin-subtext">Total</p>
                                    <p className="admin-subtext">Quantity</p>
                                </div>
                                {loading ?
                                    <CircularProgress />
                                :
                                <>

                                </>
                                }
                            </div>
                    </SimpleBar>
                    </div>
                    <div className="dashboard-card card-admin-1">
                    <div className="card-title">
                        <h4 className="title-admin-mobile">Owed Per Hotel</h4>
                    </div>
                    <div className="tabs-container">
                    <div className="admin-tabs">
                        {month.map((item, index) => (
                            <div key={index} className={index === selected ? "tab-selected" : "tab-not-selected"} onClick={() => selectAMonth(index)}>
                                <p>{item}</p>
                            </div>
                        ))}
                    </div>
                    </div>
                    <SimpleBar className="simple-Bar-5" id="mobile-admin-scroll-2" style={{ height: '530px', width: '99%', overflowX: 'hidden' }}>
                            <div className="garage-admin-container">
                                <div className="line-admin">
                                    <p>Name</p>
                                    <p className="admin-subtext">Total</p>
                                    <p className="admin-subtext">Quantity</p>
                                </div>
                                {loading ?
                                    <CircularProgress />
                                :
                                <>
                                
                                </>
                                }
                            </div>
                    </SimpleBar>
                    </div>
                    </div>
                    </SimpleBar>
                    </div>

                </div>
            </div>
        </React.Fragment>
    )
}

Dashboard.getInitialProps = async ({ req, res }) => {
    const token = parseCookies(req)

      return {
        token: token && token,
      }
    }

const mapStateToProps = (state) => {
    return {
        loading: state.Dashboard.loading,
        cookies: state.Auth.token,
        // garageOrders: state.Dashboard.garageOrders,
        // hotelOrders: state.Dashboard.hotelOrders,
        // hotelOwed: state.Dashboard.hotelOwed
    }
}

export default connect(mapStateToProps, 
    // {getGarageOrders, getHotelOrders, getHotelOwed}
    )(Dashboard);