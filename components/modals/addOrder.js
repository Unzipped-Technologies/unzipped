import React, {useState, useEffect, useRef} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Link from 'next/link';
import SimpleBar from 'simplebar-react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Icon from "@material-ui/core/Icon";
import CircularProgress from '@material-ui/core/CircularProgress';
import {connect, useDispatch} from 'react-redux';
import { dashboardSubmitOrder } from '../../redux/actions';

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

const SimpleModal = ({open, setOpen, token, access, setNotificationfunction, error, users, loading}) => {
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [selected, setSelected ] = useState({});
    const [focus, setFocus] = useState(false);
    const [password, setPassword] = useState('');
    const [page, setPage] = useState(1);
    const [transmission, setTransmission] = useState('Automatic');
    const [orderNumber, setOrderNumber] = useState('')
    const [selectedUser, setSelectedUser] = useState({});
    const [orderDetails, setOrderDetails] = useState({
      orderNumber: '',
      selectedUser: '',
      transmission: '',
      orderNumber: orderNumber,
    });

    const updateOrderDetails = () => {
      setOrderDetails({
        orderNumber: orderNumber,
        selectedUser: selectedUser,
        transmission: transmission
      })
    }

    const handleClick = () => {
        setPage(page + 1)
    }

    const changePaymentFocus = () => {
        setPaymentFocus('loading');
        setTimeout(() => {  setPaymentFocus('verified'); }, 1000);
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

    const updateUsers = (index) => {
        setSelectedUser(index);
    };

    useEffect(() => {
      setOrderNumber(Math.round(Math.random() * 1000000))
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
                    <h4>Add Order</h4>
                    <div className="add-user-form">
                        
                    </div>
                </div>
            </Modal>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        access: state.Auth.token,
        loading: state.Dashboard.loading
    }
}

export default connect(mapStateToProps, {dashboardSubmitOrder})(SimpleModal);