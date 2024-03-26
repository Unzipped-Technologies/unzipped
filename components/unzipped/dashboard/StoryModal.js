import React, { useState, useEffect, useRef } from 'react'

import { Dialog } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import MuiDialogContent from '@material-ui/core/DialogContent'
import Modal from '../../ui/Modal'
import Button from '../../ui/Button'
import Image from '../../ui/Image'
import { TitleText, DarkText, Absolute, WhiteCard, Span, Underline, Grid2, Grid3 } from './style'
import { FormField } from '../../ui'
import { ValidationUtils } from '../../../utils'
import styled from 'styled-components'

const Left = styled.div`
  display: flex;
  justify-content: flex-start;
  height: 150px;
  margin-right: 10px;
`

const Relative = styled.div`
  position: relative;
`

const MUIDialog = withStyles(theme => ({
  paper: {
    width: '100%' // Adjust the width as needed
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

const StoryModal = ({ open, content, onHide, user, submitComments }) => {
  const [editDescription, setEditDescription] = useState(false)
  const [form, setForm] = useState({
    comment: '',
    img: ''
  })
  const wrapperRef = useRef(null)

  const updateComments = async () => {
    await submitComments({ taskId: content._id, ...form })
    setForm({
      comment: '',
      img: ''
    })
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setEditDescription(false)
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [wrapperRef])

  return (
    <MUIDialog
      onClose={onHide}
      disableEscapeKeyDown
      open={open}
      maxWidth="sm"
      aria-labelledby="story-preview-modal"
      aria-describedby="story-preview-modal-description">
      <DialogContent dividers>
        <DarkText>
          {content.department.toLowerCase()} {'>'} {content?.ticketCode.toLowerCase()}
        </DarkText>
        <Underline margin="15px 0px" />
        <TitleText size="24px" textOverflow="ellipsis" width="90%" lineHeight="32px">
          {content?.taskName}
        </TitleText>
        <Grid3 block margin="0px" grid="2fr 1fr 1fr">
          <Span dark size="16px" bold>
            assignee:{' '}
            <Span dark size="16px" clickable>
              <Image
                radius="50%"
                src={content.employee?.profileImage}
                margin="0px 5px 0px 10px"
                width="20px"
                height="20px"
              />
              {content.employee?.FirstName || 'Unassigned'} {content.employee?.LastName}
            </Span>
          </Span>
          <Span dark size="16px" bold>
            priority:{' '}
            <Span dark size="16px" clickable space>
              {' '}
              {content?.priority}
            </Span>
          </Span>
          <Span dark size="16px" bold>
            points:{' '}
            <Span clickable dark size="16px" space>
              {' '}
              {content?.storyPoints}
            </Span>
          </Span>
        </Grid3>
        <Grid2 block margin="0px">
          <Span dark size="16px" bold>
            <Span clickable dark size="16px" space></Span>
          </Span>
          <Span dark size="16px" bold>
            status:{' '}
            <Span clickable dark size="16px" space>
              {' '}
              {content?.tagName}
            </Span>
          </Span>
        </Grid2>
        <Underline margin="15px 0px" />
        {content?.comments && content?.comments.length > 0 && (
          <Span dark size="16px" bold>
            comments:
          </Span>
        )}
        {content?.comments &&
          content?.comments.length > 0 &&
          content?.comments.map(item => (
            <WhiteCard borderColor="transparent" unset>
              <Grid2 block margin="0px">
                <Span margin="0px 0px 10px 0px">
                  {item?.profilePic && <Image src={item?.profilePic} width="24px" height="24px" radius="50%" />}
                  {item?.name && (
                    <Span space>
                      <DarkText noMargin>{item?.name}</DarkText>
                    </Span>
                  )}
                </Span>
                <Span margin="10px 0px 10px 0px" size="14px">
                  {item?.updatedAt && (
                    <Span space>
                      <DarkText small right noMargin>
                        {ValidationUtils.formatDateWithDate(item?.updatedAt)} -{' '}
                        {ValidationUtils.getTimeFormated(item?.updatedAt)}
                      </DarkText>
                    </Span>
                  )}
                </Span>
              </Grid2>
              {item?.comment && <DarkText>{item?.comment}</DarkText>}
              {item?.img && <Image src={item?.img} />}
            </WhiteCard>
          ))}
        <Span>
          <Left>
            <Image src={user?.profileImage} width="24px" height="24px" radius="50%" />
          </Left>

          <FormField
            fieldType="input"
            margin
            fontSize="14px"
            placeholder="Leave a comment..."
            noMargin
            width="100%"
            textarea
            onChange={e => setForm({ ...form, comment: e.target.value })}
            value={form.comment}></FormField>
          <Absolute zIndex={10} right="0px" top="150px">
            <Button
              type="action"
              fontSize="14px"
              small
              onClick={() => updateComments({ taskId: content._id, ...form })}>
              Comment
            </Button>
          </Absolute>
        </Span>
      </DialogContent>
    </MUIDialog>
  )
}

export default StoryModal
