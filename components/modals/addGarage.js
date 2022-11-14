import React, {useState, useEffect} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import {connect, useDispatch} from 'react-redux';
import { addGarage } from '../../redux/actions';

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
        // height: 450,
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

const SimpleModal = ({open, setOpen, token}) => {
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [focus, setFocus] = useState(false);
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [garage, setGarage] = useState({
        name: '',
        address: '',
        location: {
            lat: '',
            lng: ''
        },
    });

    const updateGarage = () => {
        setGarage({
            name: name,
            address: address,
            location: {
                lat: lat,
                lng: lng
            },
        });
        };

    const dispatch = useDispatch();

    const handleClose = () => {
        setOpen(false);
    };

    const handleAddressFocus = (e) => {
        setFocus(e.target.name);
    };
    const handleLatFocus = (e) => {
        setFocus(e.target.name);
    };
    const handleLngFocus = (e) => {
        setFocus(e.target.name);
    };
    const handleNameFocus = (e) => {
        setFocus(e.target.name);
    };

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setAddress(value);
    };

    const handleLatChange = (e) => {
        const { name, value } = e.target;
        setLat(value);
    };
    const handleLngChange = (e) => {
        const { name, value } = e.target;
        setLng(value);
    };
    const handleNameChange = (e) => {
        const { name, value } = e.target;
        setName(value);
    };

    const addNewGarage = () => {
        dispatch(addGarage(garage, token));
    }

    useEffect(() => {
        updateGarage()
    }, [name, address, lat, lng])

    return (
        <div>
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={open}
                onClose={handleClose}
            >
                <div style={modalStyle} className={classes.paper}>
                    <h4>Add Garage</h4>
                    <div className="add-user-form">
                        <form onSubmit={() => addNewGarage()}>
                        <div className="">
                        <div className="add-form-field">
                        <input type="name" 
                            placeholder="Name" 
                            required  
                            value={name}
                            className={classes.input}
                            onChange={handleNameChange}
                            onFocus={handleNameFocus}
                        />
                        </div>
                        <div className="add-form-field">
                        <input 
                            type="text" 
                            placeholder="Address" 
                            value={address}
                            required 
                            style={{paddingLeft: '4px', position: 'relative', bottom: '3px'}}
                            onChange={handleAddressChange}
                            onFocus={handleAddressFocus}/>
                        </div>
                        </div>
                        <div className="form-row-1-customer">
                        <div className="add-form-field" id="password-customer">
                        <input 
                            type="text" 
                            placeholder="lat" 
                            value={lat}
                            style={{paddingLeft: '4px', position: 'relative', bottom: '3px'}}
                            onChange={handleLatChange}
                            onFocus={handleLatFocus}
                            />
                        </div>
                        <div className="add-form-field" id="password-customer">
                        <input 
                            type="text" 
                            placeholder="lng" 
                            value={lng}
                            style={{paddingLeft: '4px', position: 'relative', bottom: '3px'}}
                            onChange={handleLngChange}
                            onFocus={handleLngFocus}
                            />
                        </div>
                        </div>
                        <div className="bottom-buttons-customer">
                            <button type="submit" className="customer-btn"><i className="fa fa-plus" style={{fontStyle: 'normal', marginRight: '7px', color: '#fff', fontWeight: '200'}}/>Add</button>
                            <button onClick={() => handleClose()} style={{fontStyle: 'normal', marginLeft: '10px', color: '#000', height: '32px'}}>Cancel</button>
                        </div>
                        </form>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default connect(null, {addGarage})(SimpleModal);