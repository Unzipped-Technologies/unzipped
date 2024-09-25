import React, { useState, useRef, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import styled from 'styled-components'
import { COLORS, getFontStyled, FONT_SIZE, LETTER_SPACING } from '../../ui/TextMaskInput/core/utilities'
import DownArrow from '../../../components/icons/downArrow'
import { useDispatch } from 'react-redux'
import { createCalendarSetting } from '../../../redux/Auth/actions'

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
    height: 'auto'
  }
}))

const TextTitleStyled = styled.p`
  color: ${({ color }) => (color ? color : '#000')};
  font-family: Roboto;
  font-size: 16px;
  font-style: normal;
  font-weight: ${({ weight }) => (weight ? weight : 600)};
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
  display: block;
  ${({ color, fontSize, fontWeight }) =>
    getFontStyled({
      color: color || COLORS.black,
      fontSize: fontSize || FONT_SIZE.PX_12,
      fontWeight: fontWeight || 500,
      fontStyle: 'normal',
      lineHeight: FONT_SIZE.PX_20,
      letterSpacing: LETTER_SPACING
    })};
  margin-top: 0px;
  margin-bottom: 6px;
  font-family: Roboto;
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

const SetupCalendlyModal = ({ isCalendlyModal, setIsCalendlyModal, setIsModalOpen }) => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef()

  const [calendlyLink, setCalendlyLink] = useState('')

  const handleClose = () => {
    setIsCalendlyModal(false)
    setIsModalOpen(true)
  }

  const toggleDropdown = e => {
    setIsOpen(!isOpen)
  }

  const handleClickOutside = event => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [])

  const handleCalendlyLinkSetting = () => {
    setIsCalendlyModal(false)
    setIsModalOpen(false)
    dispatch(createCalendarSetting({ calendlyLink }))
  }

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={isCalendlyModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}>
        <Fade in={isCalendlyModal}>
          <div className={classes.paper}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 40
              }}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                <div>
                  <TextTitleStyled> Set up your Calendly Link </TextTitleStyled>
                </div>
                <div>
                  <Label fontSize={'15px'} fontWeight={300}>
                    In order to use this feature, you need to have a paid Calendly subscription. Add your meeting invite
                    link here and our calendar system will use this instead of our built in calendar.
                  </Label>
                </div>

                <div className="mt-2">
                  <Label fontSize={'16px'} fontWeight={600}>
                    Add your Calendly Link Below
                  </Label>
                </div>
                <div>
                  <InputStyled
                    placeholder="Calendly Link..."
                    style={{
                      border: '1px solid #D9D9D9',
                      borderRadius: '5px'
                    }}
                    onChange={e => setCalendlyLink(e.target.value)}
                    value={calendlyLink}
                  />
                </div>
                <div>
                  <TextTitleStyled weight={400} color="#1976D2">
                    How to setup Calendly?
                  </TextTitleStyled>
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-end'
                }}>
                <CancelButtonStyled onClick={handleClose}>BACK</CancelButtonStyled>
                <AddListButtonStyled onClick={handleCalendlyLinkSetting}>UPDATE</AddListButtonStyled>
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
    </>
  )
}

export default SetupCalendlyModal
