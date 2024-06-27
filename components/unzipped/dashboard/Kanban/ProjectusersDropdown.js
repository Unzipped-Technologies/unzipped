import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';

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
        minWidth: 400,
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


const USERS_ARR = [
    {
        email: "jasonmaynoard@gmail.com",
        firstName: "Jason",
        lastName: "Maynard"
    },
    {
        email: "alishanjami@gmail.com",
        firstName: "Aalishan",
        lastName: "Jami"
    },
    {
        email: "zubairaltaf@gmail.com",
        firstName: "Zubair",
        lastName: "Altaf"
    },
    {
        email: "haseebiqbal@gmail.com",
        firstName: "Haseeb",
        lastName: "Iqbal"
    }
]

const generateRandomColor = () => {
    let red = Math.floor(Math.random() * 256);
    let green = Math.floor(Math.random() * 256);
    let blue = Math.floor(Math.random() * 256);

    let colorCode = "#" + red.toString(16).padStart(2, '0') +
        green.toString(16).padStart(2, '0') +
        blue.toString(16).padStart(2, '0');

    return colorCode;
}
const renderTextContainer = (title = "JM", isInnerList = false) => (
    <div style={{
        background: generateRandomColor(),
        borderRadius: "100%",
        height: isInnerList ? "35px" : "40px",
        width: isInnerList ? "35px" : "40px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        color: "#fff",
        fontWeight: "bold",
        marginRight: "10px",
        fontSize: "12px"
    }}>
        {title}
    </div>
)

const ProjectUsers = () => {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <div style={{ width: "100%", height: "100%" }}>

                <div onClick={handleClick}>
                    <MenuItem key={'index'} value={'item'} onClick={() => console.log('item')}
                        id="demo-customized-button"
                        aria-controls={open ? 'demo-customized-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        disableElevation
                        sx={{
                            '&:hover': {
                                backgroundColor: "transparent",
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
                                {renderTextContainer("AN")}
                                <ListItemText
                                    primary={'Jason Maynard'}
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                sx={{ display: 'inline' }}
                                                component="span"
                                                variant="body2"
                                                color="text.primary"
                                            >
                                                {'jasonmaynard@gmail.com'}
                                            </Typography>
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
                    // sx={{ '& .MuiPaper-root': { left: '160px !important' } }}
                >
                    {
                        USERS_ARR.map((user, index) => (
                            <MenuItem key={index} value={user} onClick={() => console.log('user')} sx={{
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
                                                {renderTextContainer(`${user.firstName.charAt(0)}${user.lastName.charAt(0)}`, true)}
                                            </div>
                                            <div style={{ width: "270px" }}>
                                                <ListItemText
                                                    sx={{
                                                        '& .MuiTypography-root': {
                                                            fontSize: "16px",
                                                            lineHeight: "1.2",
                                                        }
                                                    }}
                                                    primary={`${user.firstName} ${user.lastName}`}
                                                    secondary={
                                                        <React.Fragment>
                                                            <Typography
                                                                sx={{ display: 'inline', fontSize: "15px !important" }}
                                                                component="span"
                                                                variant="body2"
                                                                color="text.primary"
                                                            >
                                                                {user.email}
                                                            </Typography>
                                                        </React.Fragment>
                                                    }
                                                />
                                            </div>
                                            <div style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                marginLeft: 10,
                                            }}>
                                                <div> <BadgeOutlinedIcon /></div>
                                            </div>
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