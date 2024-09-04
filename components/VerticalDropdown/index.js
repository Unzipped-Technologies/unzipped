import React, { useState } from 'react'
import styled from 'styled-components'
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreHorizSharpIcon from '@mui/icons-material/MoreHorizSharp'
import { getFreelancerById } from '../../redux/Freelancers/actions'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'

const Container = styled.div`
  position: relative;
`

const ICON_STYLES = {
  '&:focus': {
    background: 'transparent !important'
  },
  '&:hover': {
    background: 'transparent !important'
  },
  '&:active': {
    background: 'transparent !important'
  }
}

const DROPDOWN_LIST = ['Hire User', 'View Application', 'Dismiss Application']

const VerticalDropdown = ({ freelancerId }) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleOnOptionChange = item => {
    switch (item) {
      case 'Hire User':
        {
          dispatch(getFreelancerById(freelancerId))
          router.push(`/hire`)
        }
        break
      case 'View Application':
        break
      case 'Dismiss Application':
        break
      default:
        break
    }
    handleClose()
  }

  const handleOnOptionClick = event => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)

  return (
    <Container>
      <IconButton data-testid="application_actions" onClick={handleOnOptionClick} sx={ICON_STYLES}>
        <MoreHorizSharpIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{
          '& .MuiPaper-root': { padding: '5px' }
        }}>
        {DROPDOWN_LIST.map(listElement => (
          <MenuItem
            key={listElement}
            onClick={() => handleOnOptionChange(listElement)}
            sx={{
              '&:hover': {
                background: '#e5eaf2',
                borderRadius: '8px !important'
              }
            }}>
            {listElement}
          </MenuItem>
        ))}
      </Menu>
    </Container>
  )
}

export default VerticalDropdown
