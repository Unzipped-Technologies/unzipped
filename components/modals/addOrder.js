import React, {useState, useEffect, useRef} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Link from 'next/link';
import SimpleBar from 'simplebar-react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import SelService from '../Custom/Presentation/Presentation-service';
import PaymentForm from '../../components/Custom/Cart/paymentForm';
import VehicleForm from '../../components/Custom/Cart/vehicleForm';
import Icon from "@material-ui/core/Icon";
import CalendarDisplay from '../Custom/Presentation/Calendar-display';
import CircularProgress from '@material-ui/core/CircularProgress';
import 'react-calendar/dist/Calendar.css';
import {connect, useDispatch} from 'react-redux';
import { selectLocation, dashboardSubmitOrder } from '../../redux/actions';

function getModalStyle() {
    const top = 50;
    const left = 50;
    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles(theme => ({
    modal: {
        // display: 'grid',
        // gridTemplateColumns: '1fr',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    paper: {
        position: 'absolute',
        marginLeft: '0vw',
        width: 850,
        height: 550,
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    input: {
        width: '101%', 
        height: '112%', 
        position: 'relative', 
        bottom: '2px', 
        right: '2px', 
        paddingLeft: '4px'
    }
}));

const SimpleModal = ({open, setOpen, token, location, access, setNotificationfunction, make, model, error, users, loading, defaultVehicle, makeLoading, modelLoading}) => {
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [selected, setSelected ] = useState({});
    const [focus, setFocus] = useState(false);
    const [password, setPassword] = useState('');
    const [page, setPage] = useState(1);
    const [vehicleFocus, setVehicleFocus] = useState(false);
    const [paymentFocus, setPaymentFocus] = useState(false);
    const [selMake, setSelMake] = useState('Make');
    const [selModel, setSelModel] = useState('Model');
    const [vin, setVin] = useState('Vin');
    const [transmission, setTransmission] = useState('Automatic');
    const [orderNumber, setOrderNumber] = useState('')
    const [selectedUser, setSelectedUser] = useState({});
    const [license, setLicense] = useState('License');
    const [year, setYear] = useState('Year');
    const [color, setColor] = useState('Select a color...');
    const [orderDetails, setOrderDetails] = useState({
      orderNumber: '',
      selectedUser: '',
      transmission: '',
      orderNumber: orderNumber,
      vehicle: {
        make: '',
        model: '',
        year: '',
        vin: '',
        color: '',
        license: ''
      }
    });

    const updateOrderDetails = () => {
      setOrderDetails({
        orderNumber: orderNumber,
        selectedUser: selectedUser,
        transmission: transmission,
        vehicle: {
          make: selMake,
          model: selModel,
          year: year,
          vin: vin,
          color: color,
          license: license
        }
      })
    }

    const locations = [
        {
          name: "75 East Main Street",
          address: '75E E Main St, Columbus, OH 43215',
          location: { 
            lat: 39.956350,
            lng: -82.997500, 
        },
        },
        {
          name: "SHERATON HOTEL VALET - COLUMBUS",
          address: '75 E. State St. Columbus, OH 43215',
          location: { 
            lat: 39.956350,
            lng: -82.997500, 
          }
        },
        {
          name: "FIFTH THIRD GARAGE",
          address: '21 e state street columbus, OH 43215',
          location: { 
            lat: 39.955910,
            lng: -82.998690, 
          },
        },
        {
          name: "Bicentennial Lot",
          address: '226 S. FRONT ST. COLUMBUS, OH 43215',
          location: { 
            lat: 39.957370,
            lng: -83.001480, 
          },
        },
        {
          name: "107 Garage",
          address: '107 S. Wall St. Columbus, OH 43215',
          location: { 
            lat: 39.961620,
            lng: -83.001520, 
          },
        },
        {
          name: "Milestone 229 Valet",
          address: '229 CIVIC CENTER DRIVE COLUMBUS, OH 43215',
          location: { 
            lat: 39.95675945,
            lng: -83.0037127265203, 
          },
        },
        {
          name: "Huntington Plaza Garage",
          address: '37 W broad St. Columbus, OH 43215',
          location: { 
            lat: 39.961666,
            lng: -83.0021288, 
          },
        },
        {
          name: "Miranova",
          address: '2 MIRANOVA PLACE Columbus, OH 43215',
          location: { 
            lat: 39.9546459,
            lng: -83.0061463, 
          }
        },
        {
          name: "3rd and Gay Bank Lot",
          address: '72 E. GAY ST. COLUMBUS, OH 43215',
          location: { 
            lat: 39.9635276571429,
            lng: -83.0023308571429, 
          },
        },
        {
          name: "LEVEQUE GARAGE",
          address: '40 N Front St Columbus, OH 43215',
          location: { 
            lat: 39.9698331404752,
            lng: -83.0043707572681, 
          },
        },
        {
          name: "General Tire Lot",
          address: '141 N. 4TH Street COLUMBUS, OH 43215',
          location: { 
            lat: 39.965757979064136,
            lng: -82.99710299959271, 
          },
        },
        {
          name: "3RD AND SPRING",
          address: '159 N third Columbus, OH 43215',
          location: { 
            lat: 39.965994302359356,
            lng: -82.99873842495317, 
          },
        },
        {
          name: "Brewery District Lot",
          address: '111 LIBERTY ST. COLUMBUS, OH 43215',
          location: { 
            lat: 39.95083565,
            lng: -83.0019038185996, 
          },
        },
        {
          name: "HACKMAN LOT",
          address: '167 Mckee Alley Columbus , OH 43215',
          location: { 
            lat: 39.9671234418605,
            lng: -82.9965511860465, 
          },
        },
        {
          name: "115 North Grant Street",
          address: '115 N. GRANT AVE. COLUMBUS, OH 43215',
          location: { 
            lat: 39.9655491710957,
            lng: -82.9915957561672, 
          },
        },

    ]

    const handleClick = () => {
        setPage(page + 1)
    }

    const updatePayment = (item) => {
        setPaymentFocus(item);
    }

    const changePaymentFocus = () => {
        setPaymentFocus('loading');
        setTimeout(() => {  setPaymentFocus('verified'); }, 1000);
    }

    const userVehicle = () => {
        let cookie;
        if (token.access_token) {
            cookie = token.access_token
        } else {
            cookie = access
        }
        // dispatch(updateVehicle(cookie, { year: year, make: selMake, model: selModel, color: color, vin: vin, license: license }))
        changeVehicleFocus();
    }

    const submitOrder = () => {
      let cookie;
      if (token.access_token) {
          cookie = token.access_token
      } else {
          cookie = access
      }
      dispatch(dashboardSubmitOrder(orderDetails, cookie));
      setNotificationfunction('Order created Success')
    }

    const dispatch = useDispatch();

    const handleClose = () => {
        setOpen(false);
    };

    const handleVinFocus = (e) => {
        setFocus(e.target.name);
        setVin('')
    };
    const changeVin = (e) => {
        setVin(e.target.value);
    }
    const handleLicenseFocus = (e) => {
        setFocus(e.target.name);
        setLicense('')
    };
    const changeLicense = (e) => {
        setLicense(e.target.value);
    };

    const onSelect = item => {
        setSelected(item);
        dispatch(selectLocation(item));
    };

    const updateUsers = (index) => {
        setSelectedUser(index);
    };

    useEffect(() => {
      setOrderNumber(Math.round(Math.random() * 1000000))
    }, [])

    useEffect(() => {
      updateOrderDetails()
    }, [selMake, selModel, year, vin, color, license])

    return (
        <div>
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={open}
                onClose={handleClose}
            >
                <div style={modalStyle} className={classes.paper}>
                    <h4>Add Order</h4>
                    <div className="add-user-form">
                        <div id="next-button" >
                            {page !== 5 ?
                            <button className="learn-more-button" onClick={() => setPage(page + 1)}>Next</button>
                            :
                            <button className="learn-more-button" onClick={() => submitOrder()}>{loading ? <CircularProgress size={20}/> : 'Submit'}</button>
                            }
                        </div>
                        {page > 1 &&
                        <div id="prev-button" >
                            <button className="learn-more-button" onClick={() => setPage(page - 1)}>Prev</button>
                        </div>
                        }
                        {page === 1 &&
                            <SelService simpleHeight='380px' buttons='pop' display={'dashboard'}/>
                        }
                        {page === 2 &&
                            <div className="maps-list-container">
                                <p >{location ? location : ''}</p>
                            <SimpleBar className="simple-Bar" style={{ height: '430px', width: '60%', overflow: 'hidden auto' }}>
                            {locations.map((item, index) => {
                                return (
                                    <div key={index} className={location === item.name ? "garage-item-2" : "garage-item"} onClick={() => onSelect(item)}>
                                    <div>
                                    <p className="garage-title">{item.name}</p>
                                    <p className="garage-type">Parking Garage</p>
                                    <p className="garage-address">{item.address}</p>
                                    </div>
                                    {/* <p>distance: {CalcDistance(coordinates, item.location)}</p> */}
                                    <div className="garage-buttons">
                                        <div id="icon-add" onClick={() => onSelect(item)}>
                                        <Icon className="material-icons" >add</Icon>
                                        <p className="text-button">Add</p>
                                        </div>
                                        <div id="icon-send">
                                        <Icon className="material-icons" onClick={() => onSelect(item)}>send</Icon>
                                        <p className="text-button">Continue</p>
                                        </div>
                                    </div>
                                    </div>
                                )
                            })}
                            </SimpleBar>
                        </div>
                        }
                        {page === 3 &&
                            <CalendarDisplay handler={handleClick}/>
                        }
                        {page === 4 &&
                            <>
                            <div id="select-user">
                                <p>EMAIL</p>
                                <p>NAME</p>
                                <p>STRIPE ID</p>
                            </div>
                            <SimpleBar className="simple-Bar" style={{ height: '330px', width: '99%', overflow: 'hidden auto' }}>
                            {users.map((item, index) => (
                                <div key={index} id="select-user" className={selectedUser !== index ? "index-rows" : "index-rows-1"} onClick={() => updateUsers(item)}>
                                    <p>{item.email}</p>
                                    <p>{item.name}</p>
                                    <p>{item.stripeId}</p>
                                </div>
                            ))}
                            </SimpleBar>
                            </>
                        }
                        {page === 5 &&
                        <SimpleBar className="simple-Bar" style={{ height: '430px', width: '99%', overflow: 'hidden auto' }}>
                        <div>
                            <div id="vehicle-form-bottom">
                            <VehicleForm 
                                focus={vehicleFocus} 
                                setFocus={setVehicleFocus} 
                                changeFocus={userVehicle}
                                make={make} 
                                model={model} 
                                makeLoading={makeLoading} 
                                modelLoading={modelLoading} 
                                vin={vin}
                                license={license}
                                year={year}
                                setTransmission={setTransmission}
                                setYear={setYear}
                                error={error}
                                defaultVehicle={defaultVehicle}
                                changeVin={changeVin}
                                changeLicense={changeLicense}
                                handleLicenseFocus={handleLicenseFocus}
                                handleVinFocus={handleVinFocus}
                                color={color}
                                setColor={setColor}
                                selMake={selMake}
                                setSelMake={setSelMake} 
                                selModel={selModel} 
                                setSelModel={setSelModel}
                            />
                            </div>
                            <div id="payment-form-bottom">
                            <PaymentForm 
                                paymentFocus={paymentFocus} 
                                setPaymentFocus={updatePayment} 
                                changePaymentFocus={changePaymentFocus}
                            />
                            </div>
                        </div>
                        </SimpleBar>
                        }
                    </div>
                </div>
            </Modal>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        location: state.Booking.location.name,
        make: state.Vehicle.make,
        model: state.Vehicle.model,
        makeLoading: state.Vehicle.makeLoading,
        modelLoading: state.Vehicle.modelLoading,
        error: state.Vehicle.error,
        defaultVehicle: state.Auth.user.defaultVehicle,
        access: state.Auth.token,
        loading: state.Dashboard.loading
    }
}

export default connect(mapStateToProps, {selectLocation, dashboardSubmitOrder})(SimpleModal);