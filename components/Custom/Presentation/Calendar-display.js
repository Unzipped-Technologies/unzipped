import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Button } from '@material-ui/core';
import Icon from "@material-ui/core/Icon";
// import googleMaps from '../../../assets/img/google-maps.png';
import Calendar from 'react-calendar';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import { connect, useDispatch } from 'react-redux';
import { selectDate, selectTimes } from '../../../redux/actions';

// import {Calendar} from 'react-modern-calendar-datepicker';

const CalendarDisplay = ({gtime, time, available, handler, hotel, link}) => {
    const [date, setDate] = useState(new Date());//
    const [focus, setFocus] = useState('calendar');
    const [dateList, setDateList] = useState({});
    const [altDate, setAltDate] = useState(new Date())
    const [newMonth, setNewMonth] = useState(new Date());
    const [colorSelect, setColorSelect] = useState(3);
    const [yesterday, setYesterday] = useState('');
    const [hourTime, setHourTime] = useState(new Date().getHours());
    const [adjHours, setAdjHours] = useState(false);
    const dispatch = useDispatch();

    const daysObj = [0, 1, 2, 3, 4, 5, 6]
    const setTimesAvail = () => {
        if(hotel === 'N/A') {
            return  [
                {
                    time: 'Overnight',
                    id: 25
                }, 
                {
                    time: '8:00AM - 8:30AM',
                    id: 8
                },
                {
                    time: '8:30AM - 9:00AM',
                    id: 8
                }, 
                {
                    time: '9:00AM - 9:30AM',
                    id: 9
                }, 
                {
                    time: '10:00AM - 10:30AM',
                    id: 10
                }, 
                {
                    time: '11:30AM - 12:00PM',
                    id: 11
                }, 
                {
                    time: '12:00PM - 12:30PM',
                    id: 12
                }, 
                {
                    time: '1:00PM - 1:30PM',
                    id: 13
                }, 
                {
                    time: '2:00PM - 2:30PM',
                    id: 14
                }, 
                {
                    time: '3:00PM - 3:30PM',
                    id: 15
                }, 
                {
                    time: '4:00PM - 4:30PM',
                    id: 16
                }, 
                {
                    time: '5:00PM - 5:30PM',
                    id: 17
                },
                {
                    time: '5:30PM - 6:00PM',
                    id: 17
                },
                {
                    time: '6:00PM - 6:30PM',
                    id: 18
                },
                {
                    time: '6:30PM - 7:00PM',
                    id: 18
                }
            ]
        } else {
            return [
                {
                    time: 'Overnight',
                    id: 25
                }
                ]
        }
    }

    const [timesAvail, setTheTime] = useState(setTimesAvail());
       

    const calcCalendar = (n, c) => {
        var now = n;
        if (now.getMonth() == 11) {
            setDate(new Date(now.getFullYear() + c, 0, 1));
        } else {
            setDate(new Date(now.getFullYear(), now.getMonth() + c, 1));
        }
    }

    const calcCalendar2 = (n, c) => {
        var now = n;
        if (now.getMonth() == 11) {
            setNewMonth(new Date(now.getFullYear() + c, 0, 1));
        } else {
            setNewMonth(new Date(now.getFullYear(), now.getMonth() + c, 1));
        }
    }

    const updateCalendar = (n) => {
        calcCalendar(date, n);
        calcCalendar2(newMonth, n);
    }

    const displayDates = (days) => {
        const day = altDate;
        const changeDate = new Date(day);
        const keepDate = new Date(day);
        keepDate.setDate(keepDate.getDate() + (days + 1))
        changeDate.setDate(changeDate.getDate() + days);
        var month = new Array(12);
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

        var m = month[changeDate.getMonth()];
        var d = changeDate.getDate();
        // if ()
        return {date: d, month: m, dateCode: new Date(keepDate.getFullYear(), keepDate.getMonth(), keepDate.getDate())};
    }

    const timeClick = (c) => {
        var day = displayDates(c - 1)
        console.log('item:' + c)
        // setDate(day.dateCode);
        dispatch(selectDate(String(day.dateCode).substring(4,15)));
        dispatch(selectTimes(null));
        setColorSelect(c);
        setDate(day.dateCode)
    }

    const selectADate = (e) => {
        console.log(e)
        if (e > new Date(yesterday)) {
            setDate(e);
            dispatch(selectDate(String(e).substring(4,15)));
            dispatch(selectTimes(null));
            setColorSelect(0);
            setFocus('time');
            setAltDate(e);
        } else {
            console.log('Choose a date in the future')
        }

    }

    const submitTime = (time) => {
        dispatch(selectTimes(time))
        handler()
    }

    useEffect(() => {
        console.log(date)
    }, [date])

    useEffect(() => {
        var now = new Date(date);
        if (now.getMonth() == 11) {
            setNewMonth(new Date(now.getFullYear() + 1, 0, 1));
        } else {
            setNewMonth(new Date(now.getFullYear(), now.getMonth() + 1, 1));
        }
        if (new Date(date).getUTCDate() == new Date().getUTCDate()) {
            setAdjHours(new Date().getHours() + 2)
        } else { setAdjHours(0) }
    }, [date])

    useEffect(() => {
        let todays = new Date()
        let yesterdays = new Date(todays)

        yesterdays.setDate(yesterdays.getDate() - 1)
        setYesterday(yesterdays.toDateString())
    }, [])


    return (
        <React.Fragment>
            <Head>
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
            </Head>
            <div className="set-pop-container-time" >
                <div className="date-toggle-shell">
                <div className="date-pop-toggle">
                    <div className="inner-shell-c">
                        <span className={focus !== 'calendar' ? "toggle-text-c" : "toggled-text-c"} onClick={() => setFocus('calendar')}>Calendar</span>
                    </div>
                    <div className="inner-shell-t">
                        <span className={focus !== 'time' ? "toggle-text-t" : "toggled-text-t"} onClick={() => setFocus('time')}>Time</span>
                    </div>
                </div>
                </div>
                {focus === 'calendar' &&
                <div className="calendar-rows">
                <div className="change-month">
                <button className="arrow-c" id="arrow-c-l" onClick={() => updateCalendar(-1)}><Icon className="material-icons ">arrow_back_ios</Icon></button>
                <button className="arrow-c" id="arrow-c-r" onClick={() => updateCalendar(1)}><Icon className="material-icons ">arrow_forward_ios</Icon></button>
                </div>
                <div className="two-calendars">
                {/* <Calendar 
                    value={date}
                    onChange={setDate}
                    shouldHighlightWeekends
                /> */}

                <Calendar
                    onChange={(e) => selectADate(e)}
                    value={date}
                    activeStartDate={date}
                    minDate={new Date()}
                    defaultView="month"
                    className="calendar-view"
                    showNeighboringMonth = {false}
                    tileClassName = "calendar-tile"
                    id="calendar-1"
                    prevLabel = {null}
                    prev2Label = {null}
                    next2Label = {null}
                    nextLabel = {null}
                    border={false}
                />
                <div className="calendar-2">
                <Calendar
                    onChange={(e) => selectADate(e)}
                    value={null}
                    activeStartDate={newMonth}
                    defaultValue = {null}
                    defaultView="month"
                    className="calendar-view"
                    showNeighboringMonth = {false}
                    tileClassName = "calendar-tile"
                    prev2Label = {null}
                    prevLabel = {null}
                    nextLabel = {null}
                    next2Label = {null}

                />
                </div>
                </div>
                </div>
                }
                {focus === 'time' &&
                    <>
                    {/* <p>Select a Pickup Time</p> */}
                    <div className="time-pick-container">
                        <div className="inner-pick-c">
                        <div className="date-display">
                            {daysObj.map((item, index) => {
                                return (
                                <div key={index} className={colorSelect !== index ? "date-container" : 'date-container-one'} onClick={() => timeClick(item)}>
                                    <h4 className="bubble-date">{displayDates(item).date}</h4>
                                    <p className="bubble-month">{displayDates(item).month}</p>
                                </div>
                                )
                            })}     
                        </div>
                            <div className="list-times">
                                
                                <div className="list-container-t">
                                    <SimpleBar className="simple-Bar-3" style={{ maxHeight: 230 }}>
                                        <div className="list-item-time-title" >
                                            {/* <div className="date-time">
                                                {`${'Friday, Nov 28'}`}
                                            </div> */}
                                            <div className="time-title">
                                                Select a pickup window...
                                            </div>
                                        </div>
                                        {timesAvail.map((item, index) => {
                                            return (
                                                <div key={index+item.id}>
                                                {adjHours < item.id &&
                                                    <div className={time !== item.time ? "list-item-time" : "list-item-time selected-t"} key={index} onClick={() => submitTime(item.time)}>
                                                    <div className="time-t">
                                                        {item.time}
                                                    </div>
                                                </div>
                                                }
                                                </div>
                                            )
                                        })}
                                    </SimpleBar>
                                </div>

                            </div>
                        </div>
                    </div>
                    </>
                }
            </div>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        gdate: state.Booking.date,
        time: state.Booking.time,
        available: state.Booking.available,
        location: state.Booking.location,
        date: state.Booking.date,
        cart: state.Booking.cart,
        isAuthenticated: state.Auth.isAuthenticated,
        hotel: state.Booking.hotel
    }
}

export default connect(mapStateToProps, {selectDate, selectTimes})(CalendarDisplay);