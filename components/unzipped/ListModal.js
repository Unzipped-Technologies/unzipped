import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import CloseIcon from '../icons/close'
import styled from 'styled-components'
import { Dialog } from '@material-ui/core'
import { bindActionCreators } from 'redux'
import IconButton from '@mui/material/IconButton'
import { withStyles } from '@material-ui/core/styles'
import MuiDialogContent from '@material-ui/core/DialogContent'
import router from 'next/router'

import IconComponent from '../ui/icons/IconComponent'
import { getInvitesLists, getAllFreelancers, addEntriesToList } from '../../redux/actions'

const P = styled.p`
  font-size: ${({ fontSize }) => (fontSize ? fontSize : '')};
  font-weight: ${({ fontWeight }) => (fontWeight ? fontWeight : '')};
  color: ${({ color }) => (color ? color : 'black')};
  background: ${({ background }) => (background ? background : '#fff')};
  padding: ${({ padding }) => (padding ? padding : '')};
  margin: ${({ margin }) => (margin ? margin : '')};
  text-align: ${({ align }) => (align ? align : '')};
  cursor: ${({ cursor }) => (cursor ? cursor : '')};
  border-bottom: ${({ borderBottom }) => (borderBottom ? borderBottom : '')};
  right: ${({ right }) => (right ? right : '')};
  &:hover {
    color: ${({ hoverColor }) => (hoverColor ? hoverColor : '#1A264E')};
  }
`
const DropDown = styled.div`
  display: ${({ display }) => (display ? display : '')};
  position: absolute;
  background-color: white;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  width: 95%; /* Adjust the width as needed */
  border: 1px solid #ccc;
`

const MUIDialog = withStyles(theme => ({
  paper: {
    width: '586px',
    height: '472px'
  },
  root: {}
}))(Dialog)

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiDialogContent)

const ListModal = ({ handleClose, open, getInvitesLists, userId, lists, addEntriesToList, freelancerId }) => {
  const [openList, setOpenList] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    getInvitesLists({
      filter: {
        user: userId
      },
      take: 1000
    })
  }, [])

  const addToList = async listData => {
    const response = await addEntriesToList(
      {
        name: listData?.name,
        icon: listData?.icon,
        userId: userId,
        freelancerId: freelancerId,
        listId: listData?._id
      },
      listData?._id
    )
    if (response?.status === 200) {
      handleClose()
    } else {
      setError(response?.response?.data?.msg || 'Something went wrong')
    }
  }

  return (
    <>
      <MUIDialog
        onClose={() => {
          handleClose()
        }}
        disableEscapeKeyDown
        open={open}
        maxWidth="sm"
        aria-labelledby="story-preview-modal"
        aria-describedby="story-preview-modal-description">
        <DialogContent dividers>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: theme => theme.palette.grey[500]
            }}>
            <CloseIcon />
          </IconButton>
          <div className="mx-2">
            {error && (
              <P color="red" fontSize="12px">
                {error}
              </P>
            )}
            <P
              padding="25px 0 18px 0"
              margin="7px 0 0 0"
              borderBottom="3px solid #EFF1F4"
              fontWeight="600"
              cursor="pointer"
              onClick={() => router.push('/hire')}>
              Make An Offer
            </P>
            <P padding="12px 0 18px 0" cursor="pointer" borderBottom="3px solid #EFF1F4" margin="0" fontWeight="600">
              Schedule an Interview
            </P>
            <P padding="12px 0 18px 0" cursor="pointer" borderBottom="3px solid #EFF1F4" margin="0" fontWeight="600">
              Send A Message
            </P>

            <div
              onClick={() => setOpenList(!openList)}
              className="d-flex justify-content-between"
              style={{ padding: '12px 0 18px 0', borderBottom: '3px solid #EFF1F4', cursor: 'pointer', position: 'relative' }}>
              <P fontWeight="600" margin="0">
                Add User To A List
              </P>
              <span style={{ 
                position: 'absolute', 
                right: '10px', 
                top: '15px',
                transform: openList ? 'rotate(0deg)' : 'rotate(-90deg)',
                transition: 'transform 0.3s ease'
              }}>
                <IconComponent name="downArrow" width="10" height="10" viewBox="0 0 10 10" fill="black" />
              </span>
            </div>
          </div>
          <DropDown display={openList ? 'block' : 'none'}>
            {lists?.length
              ? lists.map(list => (
                  <div
                    className="d-flex px-4 py-2 me-2"
                    style={{ gap: '15px', borderBottom: '3px solid #EFF1F4' }}
                    key={list?._id}
                    onClick={() => {
                      addToList(list)
                    }}>
                    <div>
                      <img src="/img/heart.png" />
                    </div>
                    <div>
                      <P fontSize="16px" margin="0">
                        {list?.name || 'List Name'}
                      </P>
                      <div className="d-flex align-items-center">
                        <IconComponent
                          name={list?.icon}
                          width="4.47"
                          height="5.11"
                          viewBox="0 0 4.47 5.11"
                          fill="#B2B9C5"
                        />
                        <P fontSize="7px" margin="0" padding="0 0 0 3px">
                          {list?.isPrivate && 'Private'}
                        </P>

                        <P fontSize="7px" margin="0" padding="0px 0px 0px 5px">
                          {list?.listEntries?.length || 0} member
                        </P>
                      </div>
                    </div>
                  </div>
                ))
              : ''}
          </DropDown>
        </DialogContent>
      </MUIDialog>
    </>
  )
}

const mapStateToProps = state => {
  return {
    lists: state.Lists?.invitesList
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getInvitesLists: bindActionCreators(getInvitesLists, dispatch),
    getAllFreelancers: bindActionCreators(getAllFreelancers, dispatch),
    addEntriesToList: bindActionCreators(addEntriesToList, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListModal)
