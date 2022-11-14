import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import {connect, useDispatch} from 'react-redux';
import {setCustomLocation} from '../../redux/actions';
import { useRouter } from 'next/router';

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

const CustomLocation = ({open, setOpen, markerPosition, link}) => {
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);
    const [focus, setFocus] = useState(false);
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const dispatch = useDispatch();
    const [custom, setCustom] = useState({
        name: name,
        address: address,
        location: markerPosition
    });
    const router = useRouter();

    const handleClose = () => {
        setOpen(false);
    };

    const handleNameFocus = (e) => {
        setFocus(e.target.name);
    };

    const handleNameChange = (e) => {
        const { name, value } = e.target;
        setName(value);
    };
    const handleAddressFocus = (e) => {
        setFocus(e.target.name);
    };

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setAddress(value);
    };

    const UpdateLocations = () => {
        setOpen(false);
        dispatch(setCustomLocation(custom))
        router.push(link)
    }

    useEffect(() => {
        setCustom({
            name: name,
            address: address,
            location: markerPosition
        })
    }, [name, address, markerPosition])

    return (
        <React.Fragment>
        <div>
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={open}
                onClose={handleClose}
                style={{zIndex: '2002'}}
            >
                <div className="custom-location-modal">
                    <h4 className="location-modal-title">Add a name for this location:</h4>
                    <div className="garage-form">
                        <form onSubmit={() => UpdateLocations()}>
                        <div className="form-row-1-map">
                        <div className="add-form-field">
                        <input type="name" 
                            placeholder="Name" 
                            required  
                            value={name}
                            onChange={(e) => user.name = e.target.value} 
                            style={{paddingLeft: '3px', position: 'relative', bottom: '3px', width: '115%', height: '110%'}}
                            className="custom-location-input"
                            onChange={handleNameChange}
                            onFocus={handleNameFocus}
                        />
                        </div>
                        <div className="add-form-field">
                        <input 
                            type="Address" 
                            placeholder="Address" 
                            value={address}
                            required 
                            style={{paddingLeft: '3px', position: 'relative', bottom: '3px', width: '115%', height: '110%'}}
                            onChange={handleAddressChange}
                            onFocus={handleAddressFocus}/>
                        </div>
                        </div>
                        <div className="bottom-buttons-customer">
                            <button type="submit" className="customer-btn">Continue</button>
                            <button onClick={() => handleClose()} style={{fontStyle: 'normal', marginLeft: '10px', color: '#000', height: '32px'}}>Cancel</button>
                        </div>
                        </form>
                    </div>
                </div>
            </Modal>
        </div>
        </React.Fragment>
    )
}

export default connect(null, {setCustomLocation})(CustomLocation);