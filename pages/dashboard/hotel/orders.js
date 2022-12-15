import React, {useState, useEffect, useRef, useCallback} from 'react';
import Admin from '../../../components/Dashboard/HotelPanel';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect, useDispatch } from 'react-redux';
import { parseCookies } from "../../../services/cookieHelper";
import SimpleBar from 'simplebar-react';
import { getOrders, getMoreOrders, getCustomers } from '../../../redux/actions';
import AddOrder from '../../../components/modals/hotelAddOrder';
import RefundOrder from '../../../components/modals/refundOrder';
import 'simplebar/dist/simplebar.min.css';
import Nav from '../../../components/Dashboard/AdminNav';
import Notification from '../../../components/animation/notifications';
import fileDownload from 'js-file-download';
import Axios from 'axios';

const Orders = ({token, cookies, orders, loading, hasMoreOrders, users, hotel}) => {
    const [indeterminate, setIndeterminate] = useState(false);
    const [checked, setChecked] = useState([]);
    const [pages, setPages] = useState(0);
    const [checkAll, setCheckAll] = useState(false);
    const [focus, setFocus] = useState(false);
    const [open, setOpen] = useState(false);
    const [cookiea, setCookiea] = useState('');
    const [refund, setRefund] = useState([])
    const [refundOpen, setRefundOpen] = useState(false);
    const [manual, setManual] = useState('Automatic');
    const [editOpen, setEditOpen] = useState(false);
    const [edits, setEdits] = useState([]);
    const [access, setAccess] = useState('');
    const [notifications, setNotifications] = useState('');
    const wrapperRef = useRef(null);
    const observer = useRef(null);
    const lastOrderRef = useCallback(node => {
        if (hasMoreOrders) {
            if (loading) return;
            if (observer.current) observer.current.disconnect()
            observer.current = new IntersectionObserver(entries => {
                if (entries[0].isIntersecting) {
                    loadMoreOrders()
                }
            })
            if (node) observer.current.observe(node)
            console.log('print More')
        }
    }, [loading])

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

    const editSelected = () => {
        let list = checked.filter(x=> x.checked !== false); 
        setEdits(list);
        setEditOpen(true);
    }
    const refundSelected = () => {
        let list = checked.filter(x=> x.checked !== false); 
        setRefund(list);
        setRefundOpen(true);
    }

    const printPdf = () => {
        const printPdf = Axios
            .post(`/api/dashboard/hotel/orders/pdf`, {hotel}, { responseType: 'blob' })
            .then((res) => {
                fileDownload(res.data, `pending-orders.pdf`)
        })
    }

    const moreBtn = [
        {
            name: 'Print PDF',
            function: () => printPdf()
        },

    ]
    const dispatch = useDispatch();


    const handleChange = (index) => {
        let update = checked.find(x=> x._id === checked[index]._id); 
        let list = checked.filter(x=> x._id !== checked[index]._id); 
        update.checked = !update.checked
        let start = index;
        let deleteCount = 0;
        list.splice(start, deleteCount, update);
        // temporarychecked[index][whichvalue] = true;
        // console.log(temporarychecked)
        setChecked([...list]);
      };

    const checkAllUsers = () => {
        setCheckAll(!checkAll);
        const checked = orders.map(item => ({...item, checked: !checkAll}))
        setChecked(checked);
    }

    const grabChecked = () => {
        let checks = orders.map(item => ({...item, checked: false}));
        checks = checks.filter(item => item.hotel === hotel);
        setChecked(checks);
    }

    const loadMoreOrders = () => {
        let number = pages + 1;
        let cookie;
        if (token.access_token) {
            cookie = token.access_token
        } else { cookie = cookies}
        setPages(number)
        dispatch(getMoreOrders(number, cookie))
    }

    const setNotificationfunction = (item) => {
        setOpen(false);
        setNotifications(item);
        setTimeout(() => {  setNotifications(''); }, 4000);
    }

    useEffect(() => {
        let cookie;
        if (token.access_token) {
            cookie = token.access_token
        } else { cookie = cookies}
        setCookiea(cookie);
        dispatch(getOrders(0, cookie));
        dispatch(getCustomers(0, cookie));
    }, [])

    useEffect(() => {
        let cookie;
        if (token.access_token) {
            cookie = token.access_token
        } else { cookie = cookies}
        setAccess(cookie);
    }, [token, cookies])

    useEffect(() => {
        grabChecked()
    }, [orders])

    return (
        <React.Fragment>
            <div className="main-dashboard">
                <Admin page={1}/>
                <div className="right-dashboard">
                    <Nav/>
                    <div className="dashboard-main">
                        <div className="dashboard-card">
                        <div className="card-title fix-title-dash" id="promo-title">
                                <h4 className="mobile-dashboard-title" id="customer-dash">Orders</h4>
                                <div className="button-mobile-mover">
                                    <AddOrder open={open} setOpen={setOpen} setNotificationfunction={setNotificationfunction} token={cookiea} users={users}/>
                                    <RefundOrder open={refundOpen} setOpen={setRefundOpen} token={cookiea} refund={refund} setNotificationfunction={setNotificationfunction}/>
                                    <button className="filter-btn"><i className="fa fa-filter" style={{fontStyle: 'normal', marginRight: '3px'}} onClick={() => console.log('coming soon')}/>Filter</button>
                                    <button className="customer-btn" onClick={() => setOpen(true)}><i className="fa fa-plus" style={{fontStyle: 'normal', marginRight: '7px', color: '#fff', fontWeight: '200'}}/>Add order</button>
                                    <button className="customer-btn" onClick={() => setFocus("more")} id="more-btn">
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
                            <div className="row-box-customer">
                                <div className="first-row">
                                    <div className="first-row">
                                        <div className="left-box" id="email-title-customer">
                                            <Checkbox
                                                color="primary"
                                                checked={checkAll}
                                                onClick={() => checkAllUsers()}
                                                name="All"
                                                
                                            />
                                            <p className="email-customer bold" >NAME</p>
                                        </div>
                                        <p className="description-customer bold service-order-mobile">SERVICES</p>
                                    </div>
                                    <div className="first-row column-two-customer bold">
                                        <p id="move-text-type" className="order-total-mobile">TOTAL</p>
                                        <p id="move-text-customer"  className="order-date-mobile">DATE</p>
                                    </div>
                                    <Notification error = {notifications}/>
                                </div>
                            <div style={{height: '530px'}}>
                            <SimpleBar className="simple-Bar-5" style={{ height: '530px', width: '99%' }}>
                            {checked.map((item, index) => {
                                return (
                                    <div key={index} className="user-rows">
                                        {item.status !== 'Refunded' &&
                                        <>
                                        <div className="first-row">
                                        <div className="left-box" id="email-title-customer">
                                            <Checkbox
                                                color="primary"
                                                checked={item.checked}
                                                onClick={(e) => handleChange(index)}
                                                name={item._id}
                                            />
                                        <p className="email-customer">{item.name ? item.name : item.email}</p>
                                        </div>
                                        <p className="description-customer service-order-mobile">{item.services.map((service, index) => (<span key={index}>{service.name}{index > item.services.length - 2 ? '' : ', '}</span>))}</p>
                                        </div>
                                        <div className="first-row column-two-customer">
                                            <p className="order-total-mobile">${item.total}.00</p>
                                            <p className="order-date-mobile">{item.date.substring(0,15)}</p>
                                        </div>
                                        </>
                                        }
                                    </div>
                                )
                            })}
                            <div className="user-rows" id="see-more-1">
                                <div className="first-row" id="see-more">
                                {hasMoreOrders &&
                                <>
                                {orders.length > 0 &&
                                    <button className="see-more-customer" ref={lastOrderRef} onClick={() => loadMoreOrders()}>{loading ? <CircularProgress size={18}/> : 'See More...'}</button>
                                }
                                </>
                                }
                                </div>
                            </div>
                            </SimpleBar>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

Orders.getInitialProps = async ({ req, res }) => {
    const token = parseCookies(req)

      return {
        token: token && token,
      }
    }

const mapStateToProps = (state) => {
    return {
        orders: state.Dashboard.orders,
        cookies: state.Auth.token,
        loading: state.Dashboard.loading,
        hasMoreOrders: state.Dashboard.hasMoreOrders,
        users: state.Dashboard.users.reverse(),
        hotel: state.Auth.user.hotel
    }
}

export default connect(mapStateToProps, { getOrders, getMoreOrders, getCustomers })(Orders);
