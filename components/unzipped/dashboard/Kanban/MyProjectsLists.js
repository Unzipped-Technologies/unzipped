import React from 'react';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    List,
    ListItem,
    ListItemIcon,
    ListItemText
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ListIcon from '@mui/icons-material/List';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/system';
import Menu from '@mui/material/Menu';
import { SpanStyled } from './AssignedToList';
import DndFilterIcons from '../../../icons/dndFilterIcon';

const CustomButton = styled(Button)(({ theme }) => ({
    marginTop: "13px",
    color: "#000",
    backgroundColor: "transparent !important",
    fontSize: "17px",
    fontWeight: "500",
    textTransform: "none",
    '&:active': {
        backgroundColor: "transparent !important",
    },
    '&:focus': {
        backgroundColor: "transparent !important",
    },
    '&:hover': {
        backgroundColor: "transparent !important",
    },
}));


const Container = styled('div')({
    paddingLeft: '20px',
    width: '100%',
});

const StyledListItem = styled(ListItem)({
    margin: 0,
    padding: '4px 0',
});

const BlueListIcon = styled(ListIcon)({
    color: '#2F76FF',
});

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
        marginTop: "0px",
        minWidth: 500,
        color: "#737373",
        '& .MuiMenu-list': {
            padding: '2px 0',
        },
    },
    '& .MuiModal-root-MuiPopover-root-MuiMenu-root': { left: "175px" }
}));



const projects = [
    {
        name: 'Unzipped',
        departments: ['Marketing', 'Administration'],
    },
    {
        name: 'Saas ',
        departments: ['Bankend Development', 'FrontEnd Development', 'Human Resource Manager', 'Project Management'],
    },
    {
        name: 'VS Code',
        departments: ['Quality Assurance', 'FrontEnd Development', 'Human Resource Manager', 'Project Management', 'Marketing', 'Administration'],
    },
];

const MyProjectsLists = () => {

    const [isExpanded, setIsExpanded] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setIsExpanded(!isExpanded)
    };

    const handleClose = () => setAnchorEl(null)

    return (
        <>
            <Container>
                <CustomButton
                    id="demo-customized-button"
                    aria-controls={open ? 'demo-customized-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    disableElevation
                    onClick={handleClick}
                    sx={{
                        color: "#000",
                        fontSize: "17px",
                        fontWeight: "500",
                        textTransform: "none",
                    }}
                >
                    <SpanStyled>
                        My Projects
                        <DndFilterIcons />
                    </SpanStyled>
                </CustomButton>

                <StyledMenu
                    id="demo-customized-menu"
                    MenuListProps={{
                        'aria-labelledby': 'demo-customized-button',
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    sx={{
                        '& .MuiPopover-paper  ':{
                            left: "145px !important"
                        }
                    }}
                >
                    {projects.map((project, index) => (
                        <MenuItem key={index} value={index} >

                            <Accordion key={index} sx={{
                                background: "transparent",
                                margin: 0,
                                border: 0,
                                boxShadow: "none",
                            }}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls={`panel${index}-content`}
                                    id={`panel${index}-header`}
                                >
                                    <Typography>{project.name}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <List sx={{ margin: 0, boxShadow: "none", border: 0 }}>
                                        {project.departments.map((department, idx) => (
                                            <StyledListItem key={idx}>
                                                <ListItemIcon>
                                                    <BlueListIcon />
                                                </ListItemIcon>
                                                <ListItemText primary={department} />
                                            </StyledListItem>
                                        ))}
                                    </List>
                                </AccordionDetails>
                            </Accordion>
                        </MenuItem>
                    ))
                    }

                </StyledMenu>
            </Container>
        </>
    )
}

export default MyProjectsLists