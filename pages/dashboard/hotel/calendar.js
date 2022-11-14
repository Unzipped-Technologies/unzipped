import React, {useEffect, useState} from 'react';
import Admin from '../../../components/Dashboard/HotelPanel';
import Nav from '../../../components/Dashboard/AdminNav';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import {connect, useDispatch} from 'react-redux';
import SimpleBar from 'simplebar-react';
import { getOrders } from '../../../redux/actions';
import { parseCookies } from "../../../services/cookieHelper";
import ViewOrder from '../../../components/modals/viewOrder'
import 'simplebar/dist/simplebar.min.css';

const Dashboard = ({orders, token, cookies, hotel}) => {
    const localizer = momentLocalizer(moment);
    const [orderList, setOrderList] = useState(orders);
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState({
        name: '',
        email: '',
        location: {},
        Vehicle: {},
        status: '',
        services: []
    })
    const dispatch = useDispatch();

    const eventModal = (event) => {
        // console.log(event)
        let itemToShow = orders.find(item => item._id === event.id);
        console.log(itemToShow)
        setSelected(itemToShow)
        setOpen(true)
    }

    useEffect(() => {
        let cookie;
        if (token.access_token) {
            cookie = token.access_token
        } else { cookie = cookies}
        dispatch(getOrders(0, cookie));
    }, [])

    useEffect(() => {
        console.log(hotel);
        console.log(orderList)
    }, [orderList, hotel])

    useEffect(() => {
        let list = orders.map((item) => {
            console.log(item.time)
        if (item.time !== "Overnight") {
            let time = item.time.substring(0,7);
            let hour = time.split(':')[0];
            let min = time.split(':')[1].substring(0,2)
            let ampm;
            if (hour > 9) {
                ampm = time.substring(time.length - 2,time.length)
            } else {
                ampm = time.substring(time.length - 3,time.length)
            }
            console.log(ampm)
            if (ampm.replace(/\s/g, '') == "PM") {
                hour = parseInt(hour) + 12
            }
            // console.log(hour + ',' + min)
            let dd = new Date(`${item.date}`);
            let de = dd.setHours(hour, min, 0, 0);
            let sd = new Date(de);
            let endhour = parseInt(hour) + 1
            let endd = dd.setHours(endhour, min, 0, 0);
            let ed = new Date(endd);
            if (item.status !== 'Refunded') {
                return {
                    title: item.email ? item.email : item.name,
                    id: item._id,
                    start: sd,
                    end: ed,
                    hotel: item.hotel
                }
            }
        } else {
            let start = new Date(item.date).setHours(22)
            let end = new Date(item.date).setHours(30)
            return {
                title: item.email ? item.email : item.name,
                id: item._id,
                start: new Date(start),
                end: new Date(end),
                hotel: item.hotel
            }
        }
        })
        list = list.filter(x => x !== undefined)
        if (hotel) {
            list = list.filter(x => x.hotel === hotel)
        } else {
            list = []
        }
        
        setOrderList(list)
        
    }, [orders])

    // useEffect(() => {
    //     orders.map((item) => {
    //         let start = new Date(item.date).setHours(22)
    //         let end = new Date(item.date).setHours(30)
    //         console.log(new Date(start))
    //         console.log(new Date(end))
    //     })
    // }, [orderList])

    return (
        <React.Fragment>
            <div className="main-dashboard">
                <Admin page={0} />
                <div className="right-dashboard">
                    <Nav/>
                    <div className="dashboard-main">
                        <div className="dashboard-card">
                            <div className="card-title">
                                <h4>Calendar</h4>
                            </div>
                            <SimpleBar className="simple-Bar-5" style={{ height: '530px', width: '99%' }}>
                            <div>
                                <Calendar
                                localizer={localizer}
                                events={orderList}
                                selectable={true}
                                startAccessor="start"
                                endAccessor="end"
                                onSelectEvent={event => eventModal(event)}
                                defaultDate={new Date()}
                                style={{ height: 500,width: '95%' }}
                                />
                            </div>
                            </SimpleBar>
                        </div>
                        <ViewOrder open={open} setOpen={setOpen} selected={selected} token={token} cookies={cookies}/>
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
        orders: state.Dashboard.orders,
        cookies: state.Auth.token,
        hotel: state.Auth.user.hotel
    }
}

export default connect(mapStateToProps, {getOrders})(Dashboard);