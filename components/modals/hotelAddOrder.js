import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import SimpleBar from 'simplebar-react';
import VehicleForm from '../../components/Custom/Cart/vehicleForm';
import CircularProgress from '@material-ui/core/CircularProgress';
import 'react-calendar/dist/Calendar.css';
import {connect, useDispatch} from 'react-redux';
import { selectLocation, createOrder, decodeVehicle } from '../../redux/actions';

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

function pad2(number) {
  let newNumber = number;
  if (new Date().getHours() > 19) {
    newNumber = number + 1
  }
  return (newNumber < 10 ? '0' : '') + newNumber

}

const SimpleModal = ({open, setOpen, token, location, access, hotel, setNotificationfunction, make, model, error, users, loading, defaultVehicle, makeLoading, modelLoading}) => {
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);
    const [date, setDate] = useState(`${new Date().getFullYear()}-${pad2(new Date().getMonth() + 1)}-${new Date().getDate()}`);
    const [email, setEmail] = useState('');
    const [selected, setSelected ] = useState({});
    const [roomNumber, setRoomNumber] = useState('');
    const [valetNumber, setValetNumber] = useState('');
    const [focus, setFocus] = useState(false);
    const [password, setPassword] = useState('');
    const [page, setPage] = useState(1);
    const [vehicleFocus, setVehicleFocus] = useState(false);
    const [selMake, setSelMake] = useState('Make');
    const [selModel, setSelModel] = useState('Model');
    const [vin, setVin] = useState('Vin');
    const [orderNumber, setOrderNumber] = useState('')
    const [selectedUser, setSelectedUser] = useState({});
    const [manual, setManual] = useState('Automatic');
    const [stateAbv, setStateAbv] = useState('OH');
    const [license, setLicense] = useState('License');
    const [year, setYear] = useState('Year');
    const [color, setColor] = useState('Select a color...');
    const [orderDetails, setOrderDetails] = useState({
      orderNumber: '',
      email: '',
      date: '',
      valetNumber: '',
      roomNumber: '',
      transmission: '',
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
        email: email,
        date: date,
        transmission: manual,
        valetNumber: valetNumber,
        roomNumber: roomNumber,
        vehicle: {
          ...defaultVehicle
        }
      })
    }

    const changeVehicleFocus = () => {
      setVehicleFocus('loading');

    } 

    const userVehicle = () => {
      let cookie;
      if (token.access_token) {
          cookie = token.access_token
      } else {
          cookie = access
      }
      dispatch(decodeVehicle(cookie, { state: stateAbv, color: color, license: license.toUpperCase() }))
      changeVehicleFocus();
    }



    const submitOrder = (e) => {
      e.preventDefault();
      let cookie;
      if (token.access_token) {
          cookie = token.access_token
      } else {
          cookie = access
      }
      dispatch(createOrder(orderDetails, cookie));
      setNotificationfunction('Order created Success');
      setTimeout(() => {  setNotificationfunction(''); }, 4000);
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

    useEffect(() => {
      setOrderNumber(Math.round(Math.random() * 1000000))
    }, [])

    useEffect(() => {
        if (!loading) {
          if (defaultVehicle.make) {
          setVehicleFocus('verified'); 
          } else setVehicleFocus(false);
        }
      }, [loading, defaultVehicle])

    useEffect(() => {
      updateOrderDetails()
    }, [selMake, selModel, year, vin, color, license, email, valetNumber, roomNumber, date, manual])

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
                    <form onSubmit={(e) => submitOrder(e)}>
                    <div className="add-user-form">
                        <div id="next-button" >
                        <button className="learn-more-button" type="submit">{loading ? <CircularProgress size={20}/> : 'Submit'}</button>   
                        </div>
                        <SimpleBar className="simple-Bar" style={{ height: '430px', width: '99%', overflow: 'hidden auto' }}>
                        <div >
                            <div className="hotel-service-box">
                                <div>
                                <p style={{fontWeight: '500'}}>Hotel: </p>
                                <p>{hotel}</p>
                                <p style={{fontWeight: '500'}}>Date: </p>
                                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required style={{width: '150px', paddingLeft: '3px'}}/>

                                </div>
                                <div>
                                    <p style={{fontWeight: '500'}}>Service:</p>
                                    <p>Exterior {'&'} Interior Detail Package</p>
                                    <p>Price: $150.00</p>
                                    <p style={{fontWeight: '500'}}>Time:</p> 
                                    <p>Overnight</p>
                                </div>

                            </div>
                            <div style={{display: 'grid', gridTemplateColumns: '1fr', justifyItems: 'left'}}>
                                
                                <label style={{color: '#222', marginBottom: '5px'}}>Email:</label>
                                <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} required style={{width: '80%', border: '1px solid darkgray', paddingLeft: '5px', borderRadius: '8px'}}/>
                                <label style={{color: '#222', marginBottom: '5px'}}>Room #:</label>
                                <input type="text" onChange={(e) => setRoomNumber(e.target.value)} value={roomNumber} required style={{width: '80%', border: '1px solid darkgray', paddingLeft: '5px', borderRadius: '8px'}}/>
                                <label style={{color: '#222', marginBottom: '5px'}}>Valet #:</label>
                                <input type="text" onChange={(e) => setValetNumber(e.target.value)} value={valetNumber} required style={{width: '80%', border: '1px solid darkgray', paddingLeft: '5px', borderRadius: '8px', marginBottom: '20px'}}/>
                            </div>
                            <div id="vehicle-form-bottom" style={{marginBottom: '65px'}}>
                            <VehicleForm 
                                focus={vehicleFocus} 
                                setFocus={setVehicleFocus} 
                                changeFocus={userVehicle}
                                make={make} 
                                model={model} 
                                makeLoading={makeLoading} 
                                modelLoading={modelLoading} 
                                vin={vin}
                                setTransmission={setManual}
                                license={license}
                                year={year}
                                setYear={setYear}
                                error={error}
                                defaultVehicle={defaultVehicle}
                                changeVin={changeVin}
                                changeLicense={changeLicense}
                                handleLicenseFocus={handleLicenseFocus}
                                handleVinFocus={handleVinFocus}
                                color={color}
                                stateAbv={stateAbv}
                                setStateAbv={setStateAbv}
                                setColor={setColor}
                                selMake={selMake}
                                setSelMake={setSelMake} 
                                selModel={selModel} 
                                setSelModel={setSelModel}
                            />
                            </div>
                        </div>
                        </SimpleBar>
                        
                    </div>
                    </form>
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
        loading: state.Dashboard.loading,
        hotel: state.Auth.user.hotel
    }
}

export default connect(mapStateToProps, {selectLocation, createOrder, decodeVehicle})(SimpleModal);