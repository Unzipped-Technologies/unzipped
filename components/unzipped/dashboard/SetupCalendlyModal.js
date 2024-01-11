import React, { useState, useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import styled from 'styled-components';
import {
    COLORS,
    getFontStyled,
    FONT_SIZE,
    LETTER_SPACING
} from '../../ui/TextMaskInput/core/utilities';
import DownArrow from '../../../components/icons/downArrow';
import { SELECT_MEETING_TIME } from '../../../utils/constants';
import dayjs from 'dayjs';
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '0px',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        borderRadius: '15px',
        width: '586px',
        height: 'auto'
    },
}));

const TextTitleStyled = styled.p`
    color: ${({ color }) => (color ? color : '#000')};
    font-family: Roboto;
    font-size: 16px;
    font-style: normal;
    font-weight: ${({ weight }) => (weight ? weight : 600)};;
    line-height: 24.5px;
    letter-spacing: 0.4px;
    text-transform: capitalize;
`;

const InputStyled = styled.input`
    border: 1px solid #D9D9D9;
    padding-left: 15px !important;
    border-radius: 5px;
    :focus {
        box-shadow: none !important;
    }
`;

const Label = styled.span`
    display: block;
    ${getFontStyled(
    {
        color: COLORS.black,
        fontSize: FONT_SIZE.PX_12,
        fontWeight: 500,
        fontStyle: 'normal',
        lineHeight: FONT_SIZE.PX_16,
        letterSpacing: LETTER_SPACING,
    })};
    margin-top: 12px;
    margin-bottom: 6px;
`;

const CancelButtonStyled = styled.button`
    background: #fff;
    color: #1976D2;
    border: 1px solid #1976D2;
    text-transform: uppercase;
    font-size: 15px;
    letter-spacing: 0.4px;
    text-align: center;
    padding-left: 15px;
    padding-right: 15px;
    border-radius: 5px;
    font-family: Roboto;
    font-weight: 500;
    line-height: 24.5px;
`;

const AddListButtonStyled = styled.button`
    background: #1976D2;
    color: #fff;
    text-transform: uppercase;
    font-size: 15px;
    letter-spacing: 0.4px;
    text-align: center;
    padding-left: 15px;
    padding-right: 15px;
    border-radius: 5px;
    font-family: Roboto;
    font-weight: 500;
    line-weight: 24.5px;
    border: 0;
    margin-left: 10px;
`;

const ScheduleMeetingContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    gap: 20px;
`
const SelectionContainer = styled.div`
    position: relative;
    display: inline-block;
    border: 1px solid #D9D9D9;
    background: rgba(217, 217, 217, 0.28);
    border-radius: 3px;
    padding: 5px;
    width: 100px;
    margin-left: auto;
`;

const SelectionButton = styled.div`
    border: none;
    padding: 10px;
    cursor: pointer;
    outline: none;
    border-radius: 3px;
    border: 0.25px solid #D9D9D947;
    background: #D9D9D9;
    
    // &::after{
    //     content : '\2304';
    //     display : block;
    // }

`;

const DropdownContainer = styled.div`
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
    margin-top: 2px;
    height: 320px;
    overflow: auto;
`

const DropdownItems = styled.div`
    padding: 5px;
    cursor: pointer;
    font-size: 14px;
    line-height: 24.5px;
    text-transform: uppercase;
    font-wight: 500;
    margin-top: 5px;
`;

const SetupCalendlyModal = ({
    isModalOpen,
    setIsModalOpen
}) => {
    const classes = useStyles();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef();
    const [startMeetingTime, setStartMeetingTime] = useState('12.00 AM');
    const [endMeetingTime, setEndMeetingTime] = useState('12.30 AM');
    const [value, setValue] = React.useState(dayjs('2022-04-17T15:30'));
    const handleClose = () => {
        setIsModalOpen(false);
    };


    const toggleDropdown = (e) => {
        setIsOpen(!isOpen)
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    const handleMeetingScheduling = (time) => {
        setStartMeetingTime(time);
        setIsOpen(!isOpen)
    }

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);

    return (

        <>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={isModalOpen}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{ timeout: 500, }}
            >
                <Fade in={isModalOpen}>
                    <div className={classes.paper}>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 40
                        }}>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                            }}>
                                <div>
                                    <TextTitleStyled> Set up your Calendly Link </TextTitleStyled>

                                </div>
                                <div>

                                    <Label>
                                        In order to use this feature, you need to have a paid Calendly subscription.
                                        Add your meeting invite link here and our calendar system will use this instead of our built in calendar.
                                    </Label>
                                </div>

                                <div>
                                    <Label>Add your Calendly Link Below</Label>
                                </div>
                                <div>
                                    <InputStyled
                                        placeholder='Only clients whose jobs I have applied to'
                                        style={{
                                            border: '1px solid #D9D9D9',
                                            borderRadius: '5px',
                                        }}

                                    />
                                </div>
                                <div>
                                    <TextTitleStyled weight={400} color="#1976D2">How to setup Calendly?</TextTitleStyled>
                                </div>


                            </div>

                            <div style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'flex-end',
                            }}>
                                <CancelButtonStyled
                                    onClick={handleClose}
                                >
                                    BACK
                                </CancelButtonStyled>
                                <AddListButtonStyled
                                    onClick={() => console.log('update_meeting_link')}
                                >
                                    UPDATE
                                </AddListButtonStyled>
                            </div>

                        </div>
                    </div>
                </Fade>
            </Modal>
        </>
    )
}

export default SetupCalendlyModal;