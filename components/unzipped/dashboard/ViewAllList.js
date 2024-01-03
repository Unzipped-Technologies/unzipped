import styled from "styled-components";
import Icon from '../../../components/ui/Icon';
import { getListEntriesById, getRecentlyViewedList, getTeamMembers } from '../../../redux/ListEntries/action';
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {
    COLORS,
    getFontStyled,
    FONT_SIZE,
    LETTER_SPACING
} from '../../ui/TextMaskInput/core/utilities';
import { createList } from "../../../redux/Lists/ListsAction";
import { IconPickerItem } from 'react-fa-icon-picker'
import { IconPicker } from 'react-fa-icon-picker';


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
        width: '80%',
        height: 'auto'
    },
}));

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

const ListStyled = styled.div`
    display: flex;
    gap: 10px;
    margin-top: 2px;
    margin-bottom: 2px;
    box-shadow: 1px 1px 2px 0px rgba(0, 0, 0, 0.25);
    padding: 15px;
`;

const ListItemStyled = styled.div`
    font-size: 20px;
    font-weight: 500;
`;

const ViewAllList = ({
    userLists,
    setIsViewable,
    setIsFavourite,
    setIsRecentlyViewed,
    setIsMyTeam,
    setListName,
    setIsLogoHidden,
    setIsListViewable,
    userId,
    setIsExpanded,
    setListInfo
}) => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [icon, setIcon] = useState('');
    const { token } = useSelector(state => state.Auth);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleIconChangeEvent = (event) => {
        setIcon(event.target.value)
    }

    const handleNameChangeEvent = (event) => {
        setName(event.target.value)
    }

    const handleListChangeEv = (item) => {

        if (item.name === 'Favorites') {
            setIsFavourite(true);
            dispatch(getListEntriesById(item._id));
        }

        if (item.name === 'Recently Viewed') {
            setIsRecentlyViewed(true);
            dispatch(getRecentlyViewedList(item._id));
        }

        if (item.name === 'My Team') {
            setIsMyTeam(true);
            dispatch(getTeamMembers(userId));
        }

        setIsViewable(true);
        setListName(item.name);
        setIsLogoHidden(true);
        setIsListViewable(false);
        // setIsExpanded(true)
        setListInfo({ listId: item._id, listTitle: item.name, listIcon: item.icon });
    }
    const handleListSaveEvent = () => {
        dispatch(createList({
            name,
            icon,
            userId,
        },
            token,
            () => dispatch(getUserLists(userId))
        )
        )
        handleClose();
    }

    const handleClose = () => {
        setName('');
        setIcon('');
        setIsModalOpen(false);
    };

    return (

        <div >
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: 10,
                fontSize: 16,
                fontWeight: 500,
                borderBottom: '1px solid gray'
            }}
            >
                <div><p>Lists</p></div>
                <div
                    style={{
                        color: 'blue',
                        marginRight: 10
                    }}
                    onClick={() => setIsModalOpen(true)}>
                    <p>+ New List</p>
                </div>
            </div>
            {userLists && userLists.length > 0 && userLists.map((item) => (
                <ListStyled >
                    <div >
                        {item.icon && (<IconPickerItem icon={item.icon} size={24} color="#e25050" />)}
                    </div>
                    <ListItemStyled onClick={() => handleListChangeEv(item)}> {item.name}</ListItemStyled>
                </ListStyled>
            ))}
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
                                        {'create a list'}
                                    </TextTitleStyled>

                                    <Label>List name(required)</Label>
                                    <InputStyled
                                        placeholder='Enter a List Name'
                                        style={{
                                            border: '1px solid #D9D9D9',
                                            borderRadius: '5px',
                                        }}
                                        value={name}
                                        onChange={handleNameChangeEvent}
                                    />

                                    <Label>select an icon</Label>
                                    {/* 
                                    <InputStyled
                                        placeholder='Select an Icon'
                                        style={{
                                            border: '1px solid #D9D9D9',
                                            borderRadius: '5px',
                                        }}
                                        value={icon}
                                        onChange={handleIconChangeEvent}
                                    /> */}
                                    <IconPicker
                                        value={icon}
                                        onChange={(icon) => setIcon(icon)}
                                        buttonStyles={{
                                            width: '100%',
                                            border: '1px solid rgb(217, 217, 217)',
                                            paddingLeft: '15px !important',
                                            borderRadius: '5px'
                                        }}
                                        containerStyles={{
                                            border: '0px',
                                            boxShadow: '0px 10px 15px -3px rgba(0,0,0,0.1)',
                                            width: '300px'
                                        }}
                                        pickerIconStyles={{ color: '#e25050', padding: 15 }}
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
                                        {'ADD LIST'}
                                    </AddListButtonStyled>
                                </div>

                            </div>
                        </div>
                    </Fade>
                </Modal>
            </div>
        </div>
    )
}



export default ViewAllList;