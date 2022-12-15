import React, {useState, useEffect, useRef} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import {connect, useDispatch} from 'react-redux';
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
    input: {
        width: '101%', 
        height: '112%', 
        position: 'relative', 
        bottom: '2px', 
        right: '2px', 
        paddingLeft: '4px'
    }
}));

const SimpleModal = ({open, setOpen, selected, token}) => {
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);
    const wrapperRef = useRef(null);

    const handleClose = () => {
        setOpen(false);
    };

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

    return (
        <div>
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={open}
                onClose={handleClose}
                style={{zIndex: '2002'}}
            >
                <div className="paper-map-too-far">
                    <div style={{width: '100%', justifyItems: 'right'}}><i className="fa fa-remove" onClick={() => setOpen(false)} style={{fontStyle:"normal", float: 'right'}}/></div>
                    <div className="location-too-far">
                        <h6 style={{padding: '10px 0px', lineHeight: '25px'}} className="popup-text">Vohnt is not currently accepting clients in your area, please select a garage or an area within the circle to continue.</h6>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default SimpleModal;