import React, { useEffect, useState } from 'react';
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
import {
    useDispatch,
    useSelector
} from 'react-redux';
import {
    createList,
    updateList
} from '../../../redux/Lists/ListsAction';
import { getUserLists } from '../../../redux/ListEntries/action';
import { IconPicker } from 'react-fa-icon-picker';


const TextTitleStyled = styled.p`
    color: #000;
    font-family: Roboto;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
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
    text-transform: uppercase;
    display: block;
    ${getFontStyled(
    {
        color: COLORS.black,
        fontSize: FONT_SIZE.PX_12,
        fontWeight: 500,
        fontStyle: 'normal',
        lineHeight: FONT_SIZE.PX_24,
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

const CustomScrollbar = styled.div`
overflow-y: auto; /* Enable vertical scrollbar when needed */
    max-height: 500px; /* Set a maximum height for the container */
    ::-webkit-scrollbar {
        width: 8px;
      }
      ::-webkit-scrollbar-thumb {
        background-color: #888;
        border-radius: 10px;
      }
      ::-webkit-scrollbar-thumb:hover {
        background-color: #555;
      }
      
`
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
        height: '350px'
    },
}));


const ListManagementPanel = ({
    isModalOpen,
    setIsModalOpen,
    listInfo,
    isEditMode,
    setIsEditMode,
    userId,
    setSelectedValue
}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { token } = useSelector(state => state.Auth);
    const [listName, setListName] = useState('');
    const [listIcon, setListIcon] = useState('');


    const handleIconChangeEvent = (event) => {
        setListIcon(event.target.value)
    }

    const handleNameChangeEvent = (event) => {
        setListName(event.target.value)
    }

    useEffect(() => {
        if (isEditMode) {
            setListName(listInfo.listTitle)
            setListIcon(listInfo.listIcon)
        }
    }, [isEditMode])

    const handleListSaveEvent = () => {
        let listObj = {
            name: listName,
            icon: listIcon,
            userId,
            ...(isEditMode ? { listId: listInfo.listId } : {})
        }

        if (isEditMode) {
            dispatch(updateList(listObj, token, () => dispatch(getUserLists(userId))))
        } else {
            dispatch(createList(listObj, token, () => dispatch(getUserLists(userId))))
        }

        handleClose();
    }

    const handleOpen = () => {
        setIsModalOpen(true);
    };

    const handleClose = () => {
        setListName('');
        setListIcon('');
        setIsModalOpen(false);
        setIsEditMode(false);
        setSelectedValue("Details");
    };
    const [windowSize, setWindowsize] = useState('100%');

    const handleResize = () => {
        let windowSize = (window.innerWidth <= 600) ? '300px' : '100%'
        setWindowsize(windowSize);
    };

    useEffect(() => {
        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return (
        <div>
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
                            <div>
                                <TextTitleStyled>
                                    {isEditMode ? 'Edit list' : 'create a list'}
                                </TextTitleStyled>

                                <Label>List name(required)</Label>
                                <InputStyled
                                    placeholder='Enter a List Name'
                                    style={{
                                        border: '1px solid #D9D9D9',
                                        borderRadius: '5px',
                                    }}
                                    value={listName}
                                    onChange={handleNameChangeEvent}
                                />

                                <Label>select an icon</Label>

                                <IconPicker
                                    value={listIcon}
                                    onChange={(icon) => setListIcon(icon)}
                                    buttonStyles={{
                                        width: '100%',
                                        border: '1px solid rgb(217, 217, 217)',
                                        paddingLeft: '15px !important',
                                        borderRadius: '5px'
                                    }}
                                    containerStyles={{
                                        border: '0px',
                                        boxShadow: '0px 10px 15px -3px rgba(0,0,0,0.1)',
                                        width: '60%',

                                    }}
                                    pickerIconStyles={{ color: '#e25050', padding: 10 }}
                                    searchInputStyles={{
                                        borderBottom: '1px solid gray !important'
                                    }}
                                    buttonIconStyles={{ color: '#e25050' }}
                                />

                            </div>

                            <div style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'flex-end',
                            }}>
                                <CancelButtonStyled
                                    onClick={handleClose}
                                >
                                    cancel
                                </CancelButtonStyled>
                                <AddListButtonStyled
                                    onClick={handleListSaveEvent}
                                >
                                    {isEditMode ? 'UPDATE LIST' : 'ADD LIST'}
                                </AddListButtonStyled>
                            </div>

                        </div>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}

export default ListManagementPanel;