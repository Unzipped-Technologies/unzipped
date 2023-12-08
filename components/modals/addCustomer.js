import React, {useState, useEffect} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import {connect, useDispatch} from 'react-redux';
import { addCustomer } from '../../redux/actions';

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
    const [select, setSelect] = useState('Customer');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [focus, setFocus] = useState(false);
    const [password, setPassword] = useState('');
    // const [hotelName, setHotelName] = useState('Select a hotel...');
    const [user, setUser] = useState({
        name: '',
        password: '',
        email: '',
        role: '',
        // hotel: '',
    });

    const updateUser = () => {
        setUser({
            email: email,
            password: password,
            name: name,
            role: select,
            // hotel: hotelName,
        });
        };

    const dispatch = useDispatch();

    const handleClose = () => {
        setOpen(false);
    };

    const handleEmailFocus = (e) => {
        setFocus(e.target.name);
    };
    const handlePasswordFocus = (e) => {
        setFocus(e.target.name);
    };
    const handleNameFocus = (e) => {
        setFocus(e.target.name);
    };

    const handleEmailChange = (e) => {
        const { name, value } = e.target;
        setEmail(value);
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPassword(value);
    };
    const handleNameChange = (e) => {
        const { name, value } = e.target;
        setName(value);
    };

    // const handleHotelNameChange = (e) => {
    //     const { name, value } = e.target;
    //     setHotelName(value);
    // };

    const addNewUser = () => {
        dispatch(addCustomer(user, token));
    }

    useEffect(() => {
        updateUser()
        console.log(user)
    }, [email, password, name, select])

    return (
        <div>
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={open}
                onClose={handleClose}
            >
                <div style={modalStyle} className={classes.paper}>
                    <h4>Add user</h4>
                    <div className="add-user-form">
                        <form onSubmit={() => addNewUser()}>
                        <div className="form-row-1-customer">
                        <div className="add-form-field">
                        <input type="name" 
                            placeholder="Name" 
                            required  
                            value={name}
                            // onChange={(e) => user.name = e.target.value} 
                            className={classes.input}
                            onChange={handleNameChange}
                            onFocus={handleNameFocus}
                        />
                        </div>
                        <div className="add-form-field">
                        <input 
                            type="email" 
                            placeholder="Email" 
                            value={email}
                            required 
                            style={{paddingLeft: '4px', position: 'relative', bottom: '3px'}}
                            onChange={handleEmailChange}
                            onFocus={handleEmailFocus}/>
                        </div>
                        </div>
                        <div className="add-form-field" id="password-customer">
                        <input 
                            type="password" 
                            placeholder="Password" 
                            value={password}
                            style={{paddingLeft: '4px', position: 'relative', bottom: '3px'}}
                            onChange={handlePasswordChange}
                            onFocus={handlePasswordFocus}
                            />
                        </div>
                        <div className="user-role-select">
                        <FormControl 
                            style={{width: '100%', 
                            height: '130%', 
                            paddingLeft: '4px', 
                            position: 'relative', 
                            top: '5px'}} 
                        >
                            <Select 
                                value={select} 
                                onChange={(e) => setSelect(e.target.value)} 
                                style={{width: '100%'}} 
                            >
                                <MenuItem value="Customer">Customer</MenuItem>
                                {/* <MenuItem value="Hotel">Hotel</MenuItem> */}
                                <MenuItem value="Admin">Admin</MenuItem>
                                {/* <MenuItem value="Driver">Driver</MenuItem> */}
                            </Select>
                        </FormControl>
                        </div>
                        {/* {select === 'Hotel' &&
                        <div className="user-role-select">
                        <FormControl 
                            style={{width: '100%', 
                            height: '130%', 
                            paddingLeft: '4px', 
                            position: 'relative', 
                            top: '5px'}} 
                        >
                            <Select 
                                value={hotelName} 
                                onChange={handleHotelNameChange} 
                                style={{width: '100%'}} 
                            >
                                <MenuItem value="Select a hotel...">Select a hotel...</MenuItem>
                                <MenuItem value="Le-Meridien">Le Meridien The Joseph</MenuItem>
                            </Select>
                        </FormControl>
                        </div>
                        } */}
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

export default connect(null, {addCustomer})(SimpleModal);