import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Fade from '@material-ui/core/Fade'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import * as Icons from '@ant-design/icons/lib/icons'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch, useSelector } from 'react-redux'

import IconPicker from './../IconPicker'
import { IconColors } from '../../../utils/FontIcons'
import { getUserLists } from '../../../redux/ListEntries/action'
import { createList, updateList } from '../../../redux/Lists/ListsAction'
import { COLORS, getFontStyled, FONT_SIZE, LETTER_SPACING } from '../../ui/TextMaskInput/core/utilities'

const TextTitleStyled = styled.p`
  color: #000;
  font-family: Roboto;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 24.5px;
  letter-spacing: 0.4px;
  text-transform: capitalize;
`

const InputStyled = styled.input`
  border: 1px solid #d9d9d9;
  padding-left: 15px !important;
  border-radius: 5px;
  :focus {
    box-shadow: none !important;
  }
`

const Label = styled.span`
  text-transform: uppercase;
  display: block;
  ${getFontStyled({
    color: COLORS.black,
    fontSize: FONT_SIZE.PX_12,
    fontWeight: 500,
    fontStyle: 'normal',
    lineHeight: FONT_SIZE.PX_24,
    letterSpacing: LETTER_SPACING
  })};
  margin-top: 12px;
  margin-bottom: 6px;
`

const CancelButtonStyled = styled.button`
  background: #fff;
  color: #1976d2;
  border: 1px solid #1976d2;
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
`

const AddListButtonStyled = styled.button`
  background: #1976d2;
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
`

const SelectIconLabel = styled.span`
    text-transform: uppercase;
    display: block;
    cursor: pointer;
    ${getFontStyled({
      color: COLORS.black,
      fontSize: FONT_SIZE.PX_12,
      fontWeight: 500,
      fontStyle: 'normal',
      lineHeight: '4.5rem',
      letterSpacing: LETTER_SPACING
    })};<
`

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '0px',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: '15px',
    width: '586px',
    height: '350px'
  }
}))

const ListManagementPanel = ({
  isModalOpen = false,
  setIsModalOpen,
  listInfo,
  isEditMode = false,
  setIsEditMode,
  userId
}) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { token } = useSelector(state => state.Auth)
  const [listNamee, setListNamee] = useState('')
  const [listIcon, setListIcon] = useState('')
  const [isIconDropdownOpen, setIsIconDropdownOpen] = useState(false)
  const IconComponent = Icons[listIcon]
  const [isIconSelected, setIsIconSelected] = useState(false)
  const [filteredIcons, setFilterdIcons] = useState([])

  const handleNameChangeEvent = event => {
    setListNamee(event.target.value)
  }

  useEffect(() => {
    if (isEditMode) {
      setListNamee(listInfo.listTitle ?? '')
      setListIcon(listInfo.listIcon)
    }
  }, [isEditMode])

  const handleListSaveEvent = () => {
    let listObj = {
      name: listNamee,
      icon: listIcon,
      userId,
      user: userId,
      ...(isEditMode ? { listId: listInfo.listId } : {})
    }

    if (isEditMode) {
      dispatch(updateList(listObj, token, () => dispatch(getUserLists(userId))))
    } else {
      dispatch(createList(listObj, token, () => dispatch(getUserLists(userId))))
    }

    handleClose()
  }

  const handleClose = () => {
    setListNamee('')
    setListIcon('')
    setIsModalOpen && setIsModalOpen(false)
    setIsEditMode && setIsEditMode(false)
  }
  const [windowSize, setWindowsize] = useState('100%')

  const handleResize = () => {
    let windowSize = window.innerWidth <= 600 ? '300px' : '100%'
    setWindowsize(windowSize)
  }

  useEffect(() => {
    handleResize()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const handleIconDropdown = () => {
    setIsIconDropdownOpen(!isIconDropdownOpen)
    setIsIconSelected(!isIconSelected)
    setFilterdIcons([])
  }

  return (
    <div>
      <Modal
        data-testid="add_list_modal"
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={isModalOpen}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
        onClose={handleClose}>
        <Fade in={isModalOpen}>
          <div className={classes.paper}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 40,
                position: 'relative'
              }}>
              <div>
                <TextTitleStyled>{isEditMode ? 'Edit list' : 'create a list'}</TextTitleStyled>

                <Label>List name(required)</Label>
                <InputStyled
                  id="list_name"
                  placeholder="Enter a List Name"
                  style={{
                    border: '1px solid #D9D9D9',
                    borderRadius: '5px'
                  }}
                  value={listNamee}
                  onChange={handleNameChangeEvent}
                />

                <div style={{ display: 'flex', flexDirection: 'row', gap: 20 }}>
                  <div style={{ background: '' }}>
                    <SelectIconLabel onClick={() => setIsIconDropdownOpen(true)}>select an icon</SelectIconLabel>
                  </div>
                  <div style={{ background: '', display: 'flex', flexDirection: 'column', alignItems: 'baseline' }}>
                    {listIcon && (
                      <>
                        <div
                          id="selected_icon"
                          style={{ fontSize: '30px', padding: '5px', textAlign: 'center' }}
                          onClick={handleIconDropdown}>
                          <IconComponent style={{ color: IconColors[listIcon] }} twoToneColor={IconColors[listIcon]} />
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <IconPicker
                  setListIcon={setListIcon}
                  isIconDropdownOpen={isIconDropdownOpen}
                  setIsIconDropdownOpen={setIsIconDropdownOpen}
                  setIsIconSelected={setIsIconSelected}
                  isIconSelected={isIconSelected}
                  filteredIcons={filteredIcons}
                  setFilterdIcons={setFilterdIcons}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                <CancelButtonStyled onClick={handleClose}> cancel </CancelButtonStyled>
                <AddListButtonStyled onClick={handleListSaveEvent}>
                  {isEditMode ? 'UPDATE LIST' : 'ADD LIST'}
                </AddListButtonStyled>
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  )
}

export default ListManagementPanel
