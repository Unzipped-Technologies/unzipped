import React, {useState, useEffect, useRef} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import {connect, useDispatch} from 'react-redux';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { updateStatus } from '../../redux/actions';


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

const SimpleModal = ({open, setOpen, selected, cookies, token}) => {
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);
    const [change, setChange] = useState(false);
    const [select, setSelect] = useState('Customer');
    const [code, setCode] = useState('');
    const [statusElm, setStatusElm] = useState(selected.status);
    const [focus, setFocus] = useState(false);
    const [discount, setDiscount] = useState('');
    const [role, setRole] = useState('Customer');
    const wrapperRef = useRef(null);
    const dispatch = useDispatch();

    const statusTypes = ["Pending", "In Progress", "Completed", "Refunded"]

    const handleClose = () => {
        setOpen(false);
    };

    const handleStatus = (item) => {
        let cookie;
        if (token.access_token) {
            cookie = token.access_token
        } else { cookie = cookies}
        setChange(false);
        setOpen(false);
        dispatch(updateStatus(item, selected._id, cookie));
    }

    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setChange(false);
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
        setStatusElm(selected.status)
    }, [])

    useEffect(() => {
        if (open) {
            setStatusElm(selected.status)
        }
    }, [open])
    
    return (
        <div>
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={open}
                onClose={handleClose}
            >
                <div style={modalStyle} className={classes.paper} id="mobile-modal-c">
                    <h4>Order Details</h4>
                    <div className="see-order-form">
                        <p>{selected.date}</p>
                        <p></p>
                        <p>Email: {selected.email}</p>
                        <p>Name: {selected.name}</p>
                        <p>Phone: {selected.phone}</p>
                        <p>Time: {selected.time}</p>
                        <FormControl className="form-elim"  style={{height: '110%', width: '95%', marginTop: '7px', marginLeft: '10px', borderBottom: 'none !important'}} required>
                            <Select className="form-elim" value={statusElm} onChange={(e) => setStatusElm(e.target.value)}>
                                <MenuItem className="form-elim" value={statusElm}>{statusElm}</MenuItem>
                                {statusTypes.map((item, index) => (
                                    <MenuItem key={index} value={item}>{item}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <div onClick={() => setChange(true)}>
                            Status: {selected.status}<i className="fa fa-angle-down" style={{fontStyle: 'normal', marginLeft: '5px', color: '#000'}}/>
                            {change &&
                            <div className="status-box" ref={wrapperRef} onMouseLeave={() => setChange(false)}>
                                {statusTypes.map((item, index) => {
                                    return (
                                        <div key={index} className="status-line" onClick={() => handleStatus(item)}>
                                            <p className="text-box-status">
                                                {item}
                                            </p>
                                        </div>
                                    )
                                })}
                            </div>
                            }
                        </div>
                        <p>
                        Services: {selected.services.map((item, index) => (
                            <span key={index}>{item.name}{index === selected.length - 1 ? '' : ', '}</span>
                        ))}
                        </p>
                        <p>Transmission: {selected.transmission}</p>
                    </div>
                    <button className="update-order-btn" onClick={() => handleStatus(statusElm)}>Save</button>
                </div>
            </Modal>
        </div>
    );
}

export default connect(null, {updateStatus})(SimpleModal);