import React, {useState, useEffect} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import {connect, useDispatch} from 'react-redux';
import { refundAnOrder } from '../../redux/actions';

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
        right: '4vw',
        width: 650,
        // height: 450,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

const SimpleModal = ({open, setOpen, token, refund, setNotificationfunction}) => {
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);

    const dispatch = useDispatch();

    const handleClose = () => {
        setOpen(false);
    };

    const handleRefund = () => {
        dispatch(refundAnOrder(refund, token));
        setNotificationfunction('Refund Success');
        setOpen(false);
    };

    useEffect(() => {
        console.log(refund)
    }, [])

    return (
        <div>
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={open}
                onClose={handleClose}
            >
                <div style={modalStyle} className={classes.paper}>
                    <h5>Are you sure you want to refund {refund.length > 1 ? 'these orders?' : 'this order?'}</h5>
                    <div className="add-user-form">
                        {refund.length === 0 &&
                            <p style={{textAlign: 'center', paddingTop: '10px'}}>Select orders to refund...</p>
                        }
                        {refund.map((item, index) => (
                            <p key={index} style={{textAlign: 'center', paddingTop: '10px'}}>{item.name} ${item.total}.00</p>
                        ))}
                        <div className="bottom-buttons-customer">
                            <button onClick={() => handleRefund()} className="customer-btn"><i className="fa fa-minus" style={{fontStyle: 'normal', marginRight: '7px', color: '#fff', fontWeight: '200'}}/>Refund</button>
                            <button onClick={() => handleClose()} style={{fontStyle: 'normal', marginLeft: '10px', color: '#000', height: '32px'}}>Cancel</button>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default connect(null, {refundAnOrder})(SimpleModal);