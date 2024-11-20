import React, { useState } from 'react'

import Notification from '../../animation/notifications'
import { TitleText } from './style'
import { CloseIcon } from '../../icons'

import Button from '../../ui/Button'

import UploadImage from '../image-upload/UploadImage'

import { Dialog } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import MuiDialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'

import { useDispatch } from 'react-redux'
import { updateProfileImage, getCurrentUserData } from '../../../redux/actions'

const MUIDialog = withStyles(theme => ({
  paper: {
    width: '100%',
    height: window?.innerWidth < 680 ? '100% !important' : 'auto',
    maxHeight: '100% !important',
    margin: '0px !important'
  },
  root: {
    padding: theme.spacing(2)
  }
}))(Dialog)

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    paddingBottom: '60px'
  }
}))(MuiDialogContent)

const MUIDialogActions = withStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  }
}))(DialogActions)

const UpdateProfileImage = ({ user, isOpen, handleClose }) => {
  const dispatch = useDispatch()

  const [image, setImage] = useState(null)
  const [isUploading, setUploading] = useState(false)
  const [successMessage, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleUpload = async () => {
    setUploading(true)
    const formData = new FormData()

    formData.append('image', image[0])
    const response = await dispatch(updateProfileImage(formData))
    if (response?.status === 200) {
      setMessage('Image uploaded successfully.')
      handleClose()
      dispatch(getCurrentUserData())
      setImage(null)
    } else {
      setError(response?.data?.message ?? 'Something went wrong')
    }
    setUploading(false)
  }

  return (
    <>
      <MUIDialog
        onClose={() => handleClose()}
        disableEscapeKeyDown
        open={isOpen}
        maxWidth="md"
        aria-labelledby="profile-image-modal"
        id="profile_image_modal"
        aria-describedby="profile-image-modal-description">
        <DialogContent dividers>
          <div className="mt-3 ">
            <TitleText fontWeight="500" lineHeight="25.78px" fontSize="22px">
              Profile Image
            </TitleText>
            {error && (
              <div className="mt-3 ">
                <TitleText fontWeight="500" lineHeight="25.78px" fontSize="16px" color="red">
                  {error}
                </TitleText>
              </div>
            )}
          </div>

          <UploadImage setFiles={setImage} files={image} projectFiles={[image]} id="profile_images" accept="image/*" />
          <div className="mt-3 d-flex mb-3">
            {image?.length && (
              <div style={{ width: '151px', height: '120px', overflow: 'hidden', marginLeft: '10px' }}>
                <div className="d-flex w-10 items-center" style={{ backgroundColor: '#F0F0F0', height: '24px' }}>
                  <span
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'black',
                      paddingRight: '1px !important',
                      width: '13px',
                      height: '10px',
                      marginTop: '9px',
                      marginLeft: '5px',
                      marginRight: '7px'
                    }}
                    onClick={() => {
                      setImage(null)
                    }}>
                    <CloseIcon width="7px" height="7px" color="#FFFFFF" />
                  </span>
                </div>
                <img
                  src={URL?.createObjectURL(image[0])}
                  alt="logo"
                  className="w-100 h-100"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'fill'
                  }}
                />
              </div>
            )}
          </div>
        </DialogContent>
        <MUIDialogActions>
          <Button width="120px !important" oval type="outlineInverse" height="42px" extraWide onClick={handleClose}>
            Cancel
          </Button>
          <Button
            disabled={!image || isUploading}
            onClick={handleUpload}
            width="120px !important"
            height="42px"
            extraWide
            oval
            type="black">
            Upload
          </Button>
        </MUIDialogActions>
      </MUIDialog>
      <Notification error={successMessage} />
    </>
  )
}
export default UpdateProfileImage
