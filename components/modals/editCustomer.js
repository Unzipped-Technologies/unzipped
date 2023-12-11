import React, {useState, useEffect} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import CircularProgress from '@material-ui/core/CircularProgress';
import {connect, useDispatch} from 'react-redux';
import { editCustomer } from '../../redux/actions';

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

const SimpleModal = ({open, setOpen, token, edits, loading}) => {
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);
    const [select, setSelect] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [focus, setFocus] = useState(false);
    const [id, setId] = useState('')
    const [user, setUser] = useState({
        name: '',
        email: '',
        role: '',
        id: '',
    });

    const updateUser = () => {
        setUser({
            email: email,
            name: name,
            role: select,
            id: id,
        });
    };

    const dispatch = useDispatch();

    const handleClose = () => {
        setOpen(false);
    };

    const handleEmailFocus = (e) => {
        setFocus(e.target.name);
    };

    const handleNameFocus = (e) => {
        setFocus(e.target.name);
    };

    const handleEmailChange = (e) => {
        const { name, value } = e.target;
        setEmail(value);
    };

    const handleNameChange = (e) => {
        const { name, value } = e.target;
        setName(value);
    };

    const editExistingUser = () => {
        dispatch(editCustomer(user, token));
    }

    useEffect(() => {
        updateUser()
    }, [email, name, select])

    useEffect(() => {
        if (edits) {
            setName(edits.name);
            setEmail(edits.email);
            setSelect(edits.userType);
            setId(edits._id)
        }
    }, [edits])

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
                        <form onSubmit={() => editExistingUser()}>
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
                        <div className="bottom-buttons-customer">
                            <button type="submit" className="customer-btn"><i className="fa fa-plus" style={{fontStyle: 'normal', marginRight: '7px', color: '#fff', fontWeight: '200'}}/>Update</button>
                            <button onClick={() => handleClose()} style={{fontStyle: 'normal', marginLeft: '10px', color: '#000', height: '32px'}}>Cancel</button>
                        </div>
                        </form>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        loading: state.Dashboard.loading
    }
}

export default connect(mapStateToProps, {editCustomer})(SimpleModal);