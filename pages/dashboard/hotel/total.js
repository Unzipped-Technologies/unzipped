import React, {useEffect, useState, useRef} from 'react';
import Admin from '../../../components/Dashboard/HotelPanel';
import Nav from '../../../components/Dashboard/AdminNav';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import {connect, useDispatch} from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import { parseCookies } from "../../../services/cookieHelper";
import Axios from 'axios';
import {getGarageOrders, getHotelOwed} from '../../../redux/actions';
import fileDownload from 'js-file-download';


const Dashboard = ({loading, token, cookies, hotelOwed, hotel}) => {
    const [month, setMonth] = useState([]);
    const [selected, setSelected] = useState(2);
    const [focus, setFocus] = useState(false);
    const dispatch = useDispatch();
    const wrapperRef = useRef(null)

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

    const printPdf = () => {
        const printPdf = Axios
            .post(`/api/dashboard/hotel/pdf`, {hotel, month: month[selected]}, { responseType: 'blob' })
            .then((res) => {
                fileDownload(res.data, `${month[selected]}-orders.pdf`)
            })
    }

    const moreBtn = [
        {
            name: 'Print Pdf',
            function: () => printPdf()
        },
    ]

    const selectAMonth = (index) => {
        setSelected(index);
        let cookie;
        if (token.access_token) {
            cookie = token.access_token
        } else { cookie = cookies}
        dispatch(getGarageOrders(month[index], cookie));
        dispatch(getHotelOwed(month[index], cookie));
    }

    useEffect(() => {
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

    useEffect(() => {
        updateMonth();
    }, [])

    // useEffect(() => {
    //     let cookie;
    //     if (token.access_token) {
    //         cookie = token.access_token
    //     } else { cookie = cookies}
    //     console.log(selected)
    //     dispatch(getGarageOrders(month[selected], cookie));
    // }, [month])

    useEffect(() => {
        let cookie;
        if (token.access_token) {
            cookie = token.access_token
        } else { cookie = cookies}
        dispatch(getHotelOwed(month[selected], cookie));
    }, [month])

    return (
        <React.Fragment>
            <div className="main-dashboard">
                <Admin page={2} />
                <div className="right-dashboard">
                    <Nav/>
                    <div className="dashboard-main">
                    <div className="dashboard-card">
                    <div className="card-title" id="promo-title">
                        <h4 className="mobile-dashboard-title" id="customer-dash">Sales Per Hotel</h4>
                        <div style={{position: 'relative', left: '85px'}}>
                        <button className="customer-btn" onClick={() => setFocus('more')} id="total-more-btn">
                            More<i className="fa fa-angle-down" style={{fontStyle: 'normal', marginLeft: '5px', color: '#000'}}/>
                            {focus === "more" && 
                                <div className="more-box-1" ref={wrapperRef}>
                                    {moreBtn.map((item, index) => {
                                        return (
                                            <div className="menu-items-customer" onClick={item.function} key={index}>
                                                <p className="del-add-text">{item.name}</p>
                                            </div>
                                        )
                                    })}
                                </div>
                            }
                        </button>
                        </div>
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
                    <SimpleBar className="simple-Bar-5" style={{ height: '530px', width: '99%' }}>
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
                                {hotelOwed.map((item, index) => {
                                    return (
                                        <div key={index} style={{width: '95%'}}>
                                        {item.name === hotel &&
                                        <div className="line-admin" >
                                            <p>{item.name}</p>
                                            <p className="admin-subtext">${item.total}.00</p>
                                            <p className="admin-subtext">{item.quantity}</p>
                                        </div>
                                        }
                                        </div>
                                    )
                                })}
                                </>
                                }
                            </div>
                    </SimpleBar>
                    </div>
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
        hotelOwed: state.Dashboard.hotelOwed,
        hotel: state.Auth.user.hotel
    }
}

export default connect(mapStateToProps, {getGarageOrders, getHotelOwed})(Dashboard);