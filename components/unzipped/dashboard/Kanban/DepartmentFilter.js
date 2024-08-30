import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import CloseIcon from '@mui/icons-material/Close';
import DndFilterIcon from '../../../icons/dndFilterIcon';

export const SpanStyled = styled.span`
    display: inline-flex;
    justify-content: flex-end;
    align-items: center;
    gap: 25px;
`;

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
        minWidth: 280,
        maxWidth: 320,
        maxHeight: 250,
        color: "#737373",
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '2px 0',
        },
    },
}));



const DeptFilterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background: #e0e4e7;
  width: 100%;
  flex-direction: column;
`;

const DepartmentFilter = ({ deptFilter, setDepartmentFiltering }) => {

    const [itemsIndex, setItemsIndex] = useState([])
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const [mappedFilter, setMappedFilter] = useState([])

    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const handleMenuItemUserSelection = (dept, index) => {
        if (itemsIndex.includes(index)) {
            const filteredIndex = itemsIndex.filter((item) => item !== index);
            setItemsIndex(filteredIndex)
        } else {
            setItemsIndex([...itemsIndex, index])
        }
    }
    const handleCloseList = () => setItemsIndex([])

    useEffect(() => {
        setMappedFilter(deptFilter);
        if (deptFilter && deptFilter.length > 0) {
        }
    }, [deptFilter])


    useEffect(() => {
        if (deptFilter && deptFilter.length > 0) {
            const finalArray = deptFilter.filter(
                (item, index) => itemsIndex.includes(index)
            )
            setDepartmentFiltering(finalArray)
        }
    }, [itemsIndex])

    return (
        <>
            <DeptFilterContainer>
                <div style={{ width: "100%", height: "100%" }}>
                    <Button
                        id="demo-customized-button"
                        aria-controls={open ? 'demo-customized-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        disableElevation
                        onClick={handleClick}
                        endIcon={<DndFilterIcon />}
                        sx={{
                            width: 'max-content',
                            color: "#000",
                            background: "#fff !important",
                            fontSize: "17px",
                            fontWeight: "500",
                            textTransform: "none"
                        }}
                    >
                        Department
                    </Button>
                    <StyledMenu
                        id="demo-customized-menu"
                        MenuListProps={{
                            'aria-labelledby': 'demo-customized-button',
                        }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                    >
                        {
                            mappedFilter && mappedFilter.map((dept, index) => (
                                <MenuItem
                                    key={index}
                                    value={dept}
                                    onClick={() => handleMenuItemUserSelection(dept, index)}
                                >
                                    <Checkbox
                                        checked={itemsIndex.length > 0
                                            ? itemsIndex.includes(index)
                                            : false
                                        }
                                    />
                                    <ListItemText primary={dept?.name} />
                                </MenuItem>
                            ))
                        }
                        <Divider sx={{ my: 0.5, border: "1px solid  #737373" }} />
                        <MenuItem disableRipple
                            sx={{
                                display: "flex",
                                justifyContent: "flex-end",
                                paddingTop: "15px",
                                paddingBottom: "15px",
                            }}
                            onClick={handleCloseList} >
                            <CloseIcon />
                            <span style={{
                                fontWeight: 'bold',
                                fontFamily: "Roboto"

                            }}>
                                Clear
                            </span>
                        </MenuItem>
                    </StyledMenu>
                </div>

            </DeptFilterContainer>
        </>
    )
}

export default DepartmentFilter;