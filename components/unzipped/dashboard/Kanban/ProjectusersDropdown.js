import React, { useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import { useDispatch, useSelector } from 'react-redux';
import {
    updateTaskAssignee
} from '../../../../redux/actions';

const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({

    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: "8px",
        minWidth: 200,
        maxWidth: 400,
        maxHeight: 250,
        color: "#737373",
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '2px 0',
        },
    },
}));


const generateRandomColor = () => {
    let red = Math.floor(Math.random() * 256);
    let green = Math.floor(Math.random() * 256);
    let blue = Math.floor(Math.random() * 256);

    let colorCode = "#" + red.toString(16).padStart(2, '0') +
        green.toString(16).padStart(2, '0') +
        blue.toString(16).padStart(2, '0');

    return colorCode;
}
const renderTextContainer = (title = "JM", isInnerList = false, isEmailRequired) => (
    <div style={{
        background: generateRandomColor(),
        borderRadius: "100%",
        height: isInnerList ? "25px" : "40px",
        width: isInnerList ? "25px" : "40px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        color: "#fff",
        fontWeight: "bold",
        marginRight: "10px",
        fontSize: isEmailRequired ? "10px" : "12px"
    }}>
        {title}
    </div>
)

const ProjectUsers = ({ isEmailRequired = true, selectedDepartment, assignee, task }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const dispatch = useDispatch();
    const { hiredProjectTeam } = useSelector(state => state.Business)
    const [selectedAssignee, setSelectedAssignee] = React.useState(null);
    const [projectTeam, setProjectTeam] = React.useState([]);

    const handleClick = (event) => {
        if (projectTeam?.length > 0) {
            setAnchorEl(event.currentTarget);
        }
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleOnTeammemberSelect = (assignee) => {
        setSelectedAssignee(assignee);
        handleClose();
        dispatch(updateTaskAssignee(task._id, { assignee: assignee.userId }));
    }

    useEffect(() => {
        if (assignee) setSelectedAssignee(assignee);
    }, [assignee])

    useEffect(() => {
        if (!(hiredProjectTeam &&
            hiredProjectTeam.length > 0 &&
            hiredProjectTeam[0].contractId == null)
        ) {
            setProjectTeam(hiredProjectTeam);
        }
    }, [hiredProjectTeam])


    return (
        <>
            <div style={{ width: "100%", height: "100%" }}>

                <div onClick={handleClick}>
                    <MenuItem key={'index'} value={'item'}
                        id="demo-customized-button"
                        aria-controls={open ? 'demo-customized-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        disableElevation
                        sx={{
                            width: isEmailRequired ? "auto" : "230px",
                            '&:hover': {
                                backgroundColor: "transparent",
                            },
                            '& .MuiList-root': {
                                ...(!isEmailRequired ? { backgroundColor: "transparent" } : {})
                            }
                        }}
                    >
                        <List sx={{
                            width: '100%',
                            maxWidth: 360,
                            bgcolor: 'background.paper',
                            margin: 0
                        }}>
                            <ListItem alignItems="flex-start" sx={{ padding: '0 !important' }}>
                                {renderTextContainer(selectedAssignee?.FirstName?.charAt(0) + selectedAssignee?.LastName?.charAt(0), true)}
                                <ListItemText
                                    sx={{
                                        '& .MuiTypography-root': {
                                            ...(!isEmailRequired ? { fontSize: "16px !important" } : {}),
                                            ...(!isEmailRequired ? { fontWeight: '700 !important' } : {}),
                                            ...(!isEmailRequired ? { textTransform: "uppercase !important" } : {}),
                                        }
                                    }}
                                    primary={
                                        <React.Fragment>
                                            <Typography
                                                sx={{ display: 'inline' }}
                                                component="span"
                                                variant="body2"
                                                color="text.primary"
                                            >
                                                {selectedAssignee && (
                                                    `${selectedAssignee?.FirstName} ${selectedAssignee?.LastName}` || "Unassigned"
                                                )}
                                            </Typography>
                                        </React.Fragment>
                                    }
                                    secondary={
                                        <React.Fragment>
                                            {isEmailRequired && (<Typography
                                                sx={{ display: 'inline' }}
                                                component="span"
                                                variant="body2"
                                                color="text.primary"
                                            >
                                                {selectedAssignee?.email || "Unassigned"}
                                            </Typography>)}
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>
                        </List>
                    </MenuItem>
                </div>

                <StyledMenu
                    id="demo-customized-menu"
                    MenuListProps={{
                        'aria-labelledby': 'demo-customized-button',
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    sx={{
                        '& .MuiPaper-root': {
                            background: "#fff",
                            width: !isEmailRequired ? "100px" : "auto"
                        }
                    }}
                >
                    {
                        projectTeam && projectTeam.map((member, index) => (
                            <MenuItem key={index} value={member} onClick={() => handleOnTeammemberSelect(member)} sx={{
                                '&:hover': {
                                    backgroundColor: "#eeeeee",
                                    borderLeft: "3px solid #1e90ff",
                                }
                            }}>
                                <List sx={{
                                    width: '100%',
                                    maxWidth: 360,
                                    bgcolor: 'transparent',
                                }}>
                                    <ListItem alignItems="flex-start" sx={{ padding: '0 !important' }}>
                                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                                            <div style={{
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                flexDirection: "column"
                                            }}>
                                                {renderTextContainer(`${member?.FirstName?.charAt(0)}${member?.LastName?.charAt(0)}`, true)}
                                            </div>
                                            <div style={{ width: "270px" }}>
                                                <ListItemText
                                                    sx={{
                                                        '& .MuiTypography-root': {
                                                            fontSize: "16px",
                                                            lineHeight: "1.2",
                                                        }
                                                    }}
                                                    primary={`${member?.FirstName} ${member?.LastName}`}
                                                    secondary={
                                                        <React.Fragment>
                                                            {isEmailRequired && (<Typography
                                                                sx={{ display: 'inline', fontSize: "15px !important" }}
                                                                component="span"
                                                                variant="body2"
                                                                color="text.primary"
                                                            >
                                                                {member?.email}
                                                            </Typography>)}
                                                        </React.Fragment>
                                                    }
                                                />
                                            </div>
                                            {isEmailRequired && (<div style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                marginLeft: 10,
                                            }}>
                                                <div> <BadgeOutlinedIcon /></div>
                                            </div>)}
                                        </div>

                                    </ListItem>
                                </List>
                            </MenuItem>
                        ))
                    }
                </StyledMenu>
            </div >
        </>
    );
}


export default ProjectUsers;