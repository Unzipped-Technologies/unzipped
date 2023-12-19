import React, {useState, useEffect} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import {connect, useDispatch} from 'react-redux';
import { addPromos } from '../../redux/actions';

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
    const [code, setCode] = useState('');
    const [description, setDescription] = useState('');
    const [focus, setFocus] = useState(false);
    const [discount, setDiscount] = useState('');
    const [role, setRole] = useState('Customer');
    const [promo, setPromo] = useState({
        code: '',
        description: '',
        discount: '',
        userType: '',
    });

    const updatePromo = () => {
        setPromo({
            code: code,
            description: description,
            discount: discount,
            userType: role,
        });
        };

    const dispatch = useDispatch();

    const handleClose = () => {
        setOpen(false);
    };

    const handleCodeFocus = (e) => {
        setFocus(e.target.name);
    };
    const handleDescriptionFocus = (e) => {
        setFocus(e.target.name);
    };
    const handleDiscountFocus = (e) => {
        setFocus(e.target.name);
    };

    const handleCodeChange = (e) => {
        const { name, value } = e.target;
        setCode(value);
    };

    const handleDescriptionChange = (e) => {
        const { name, value } = e.target;
        setDescription(value);
    };
    const handleDiscountChange = (e) => {
        const { name, value } = e.target;
        setDiscount(value);
    };

    const addNewUser = () => {
        dispatch(addPromos(promo, token));
    }

    useEffect(() => {
        updatePromo()
    }, [code, description, discount, role])

    return (
        <div>
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={open}
                onClose={handleClose}
            >
                <div style={modalStyle} className={classes.paper}>
                    <h4>Add promo</h4>
                    <div className="add-user-form">
                        <form onSubmit={() => addNewUser()}>
                        <div className="form-row-1-customer">
                        <div className="add-form-field">
                        <input type="text" 
                            placeholder="Code" 
                            required  
                            value={code} 
                            style={{paddingLeft: '4px', position: 'relative', bottom: '3px'}}
                            onChange={handleCodeChange}
                            onFocus={handleCodeFocus}
                        />
                        </div>
                        <div className="add-form-field">
                        <input 
                            type="text" 
                            placeholder="Description" 
                            value={description}
                            required 
                            style={{paddingLeft: '4px', position: 'relative', bottom: '3px'}}
                            onChange={handleDescriptionChange}
                            onFocus={handleDescriptionFocus}/>
                        </div>
                        </div>
                        <div className="add-form-field" id="password-customer">
                        <input 
                            type="text" 
                            placeholder="Discount (ex. 0.9 is 10% off total order)" 
                            value={discount}
                            style={{paddingLeft: '4px', position: 'relative', bottom: '3px'}}
                            onChange={handleDiscountChange}
                            onFocus={handleDiscountFocus}
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
                                onChange={(e) => setRole(e.target.value)} 
                                style={{width: '100%'}} 
                            >
                                <MenuItem value="Customer">Customer</MenuItem>
                                <MenuItem value="Admin">Admin</MenuItem>
                            </Select>
                        </FormControl>
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

export default connect(null, {addPromos})(SimpleModal);