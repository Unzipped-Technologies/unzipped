import React, { useEffect, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'

import { TitleText, DarkText, WhiteCard, Span, Grid2 } from '../style'

import Button from '../../../ui/Button'
import Image from '../../../ui/Image'
import { FormField } from '../../../ui'
import { ValidationUtils } from '../../../../utils'
import Badge from '../../../ui/Badge'
import ManIcon from '../../../icons/man'
import EditIcon from '../../../icons/edit'
import Chat from '../../../icons/chat'
import Plus from '../../../icons/plus'

const TaskForm = ({
  content,
  onHide,
  isEditing,
  user,
  submitComments,
  updateForm,
  addCommentToStory,
  onSubmit,
  assigneeOptions,
  tagOptions,
  taskForm,
  taskStatusOptions,
  taskPriorityOptions
}) => {
  const [editMode, setEditMode] = useState()
  const [newComment, setComment] = useState({
    comment: '',
    img: '',
    taskId: content?._id
  })
  const setForminEditMode = () => {
    setEditMode(true)
  }
  const disableEditMode = () => {
    setEditMode(false)
  }
  useEffect(() => {
    setEditMode(!isEditing)
  }, [isEditing])
  return (
    <>
      <DarkText fontSize="18px" color="#0057FF" lineHeight="normal">
        ISSUE {content?.ticketCode?.toLowerCase()}
      </DarkText>
      <div
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
          marginLeft: '35px',
          marginTop: '-25px'
        }}>
        <Button
          extraWid
          type="outlineInverse"
          buttonHeight="25px"
          fontSize="15px"
          contentMargin="0px !important"
          colors={{
            text: '#1976D2',
            background: 'white',
            border: '1px',
            wideBorder: '#1976D2'
          }}
          onClick={() => {
            onHide()
          }}>
          CANCEL
        </Button>

        <Button
          disabled={false}
          onClick={async () => {
            if (newComment?.comment || newComment?.img) {
              await addCommentToStory(newComment)
            }
            await onSubmit()
          }}
          width="58.25px"
          extraWide
          margin="0px 37px 0px 20px"
          contentMargin="0px !important"
          type="black"
          buttonHeight="25px"
          fontSize="15px"
          colors={{
            text: '#FFF',
            background: '#1976D2',
            border: '1px',
            wideBorder: '#1976D2'
          }}>
          Save
        </Button>
      </div>
      <div style={{ display: 'flex', marginTop: '5px', alignItems: 'center' }}>
        {content?.ticketCode && (
          <TitleText color="#000" titleFontSize="18px" lineHeight="normal" light width="120px" marginTop="20px">
            {content?.ticketCode?.toLowerCase()}
          </TitleText>
        )}

        <FormField
          zIndexUnset
          fieldType="input"
          margin
          fontSize="14px"
          borderColor="red"
          disableBorder={!editMode}
          noMargin
          width="500px"
          height="36px !important"
          onChange={e => updateForm('taskName', e?.target?.value)}
          value={taskForm?.taskName}
          clickType="taskName"
          onUpdate={() => {}}
          onClick={setForminEditMode}
          //   onBlur={disableEditMode}
        />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
        <span style={{ paddingRight: '10px', paddingTop: '5px' }}>
          <ManIcon width="16px" height="16px" viewBox="0 0 20 18" fill="#979797" />
        </span>
        {editMode ? (
          <FormField
            mobile
            zIndex="10000"
            disableBorder={!editMode}
            fieldType="searchField"
            isSearchable={true}
            name="select"
            options={assigneeOptions}
            placeholder="assignee"
            fontSize="14px"
            width="160px"
            height={taskForm?.assignee ? '15px' : '30px'}
            dropdownList={assigneeOptions}
            onChange={value => {
              updateForm('assignee', value?.value)
            }}
            value={{
              label: assigneeOptions?.find(assignee => assignee.value === taskForm?.assignee)?.label
            }}
            clickType="assignee"
            onUpdate={() => {}}
          />
        ) : (
          <DarkText fontSize="18px" color="#000" lineHeight="normal" topMargin="20px" width="200px">
            {assigneeOptions?.find(assignee => assignee.value === taskForm?.assignee)?.label}
          </DarkText>
        )}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginLeft: '200px'
          }}>
          {content?.comments?.length ? (
            <>
              <Chat width="18" height="18" />
              <DarkText fontSize="18px" color="#0057FF" lineHeight="normal" paddingLeft="5px" topPadding>
                {content?.comments.length} Comment
              </DarkText>
            </>
          ) : (
            ''
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', marginRight: '60px', marginLeft: '20px' }}>
          <TitleText color="#000" titleFontSize="16px" lineHeight="normal" light marginTop="10px" paddingRight="5px">
            tags:
          </TitleText>
          <Badge small style={{ marginTop: '-90px' }}>
            {tagOptions?.find(tag => tag.value === content?.tag)?.label}
            <AiOutlineClose style={{ width: '14px', height: '14px', marginLeft: '10px' }} />
          </Badge>
          <div
            style={{
              width: '17px',
              height: '17px',
              background: '#D9D9D9',
              display: 'flex',
              alignItems: 'center',
              marginRight: '10px',
              marginTop: '-5px'
            }}>
            <Plus width="17" height="17" />
          </div>
          {editMode && (
            <FormField
              zIndex
              mobile
              required
              fieldType="searchField"
              isSearchable={true}
              name="select"
              placeholder="Select tag"
              fontSize="14px"
              width="160px"
              height="10px"
              options={tagOptions}
              dropdownList={tagOptions}
              onChange={value => updateForm('tag', value?.value)}
              value={{
                label: tagOptions?.find(tag => tag.value === taskForm?.tag)?.label
              }}
              clickType="tag"
              onUpdate={() => {}}
            />
          )}
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
        <div style={{ width: '40%', display: 'flex', marginRight: '50px' }}>
          <TitleText
            color="#000"
            titleFontSize="16px"
            lineHeight="normal"
            light
            marginTop="10px"
            width="70px"
            paddingRight="30px">
            Priority:
          </TitleText>
          {editMode ? (
            <FormField
              zIndex="999"
              zIndexUnset={true}
              mobile
              required
              fieldType="searchField"
              isSearchable={true}
              name="select"
              placeholder="Select priority"
              fontSize="14px"
              width="160px"
              height={taskForm?.priority ? '10px' : '30px'}
              options={taskPriorityOptions}
              dropdownList={taskPriorityOptions}
              onChange={value => updateForm('priority', value?.value)}
              value={{ label: taskPriorityOptions?.find(priority => priority.value === taskForm?.priority)?.label }}
              clickType="priority"
              onUpdate={() => {}}
            />
          ) : (
            <DarkText fontSize="18px" color="#000" lineHeight="normal" topMargin="10px">
              {taskPriorityOptions?.find(priority => priority.value === content?.priority)?.label}
            </DarkText>
          )}
        </div>
        <div
          style={{
            width: '50%',
            display: 'flex'
          }}>
          <TitleText
            color="#000"
            titleFontSize="16px"
            lineHeight="normal"
            marginTop="7px"
            light
            width="124px"
            paddingLeft>
            Story Points:
          </TitleText>
          {editMode ? (
            <FormField
              zIndexUnset
              fieldType="input"
              borderRadius="0px"
              border="1px solid #ccc"
              fontSize="14px"
              width="130px"
              margin="0px -80px 0px 0px"
              height="30px  !important"
              onChange={e => updateForm('storyPoints', e?.target?.value)}
              value={content?.storyPoints}
              clickType="storyPoints"
              onUpdate={() => {}}></FormField>
          ) : (
            <DarkText fontSize="18px" color="#000" lineHeight="normal" paddingLeft="20px" topMargin="7px">
              {content?.storyPoints}
            </DarkText>
          )}
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
        <div style={{ width: '40%', display: 'flex' }}>
          <TitleText
            color="#000"
            titleFontSize="16px"
            lineHeight="normal"
            light
            marginTop="10px"
            width="70px"
            paddingRight="30px">
            Status:
          </TitleText>
          {editMode ? (
            <FormField
              zIndex="1"
              mobile
              required
              fieldType="searchField"
              isSearchable={true}
              name="status"
              placeholder="Select priority"
              fontSize="14px"
              width="160px"
              height={taskForm?.status ? '10px' : '30px'}
              options={taskStatusOptions}
              onChange={value => updateForm('status', value?.value)}
              value={{ label: taskStatusOptions?.find(status => status.value === taskForm?.status)?.label }}
              clickType="status"
              onUpdate={() => {}}
            />
          ) : (
            <DarkText fontSize="18px" color="#000" lineHeight="normal" topMargin="10px">
              {taskStatusOptions?.find(status => status.value === content?.status)?.label}
            </DarkText>
          )}
        </div>
      </div>
      <div style={{ display: 'flex', marginTop: '20px' }}>
        {!editMode && (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <TitleText color="#000" titleFontSize="16px" lineHeight="normal" light marginTop="10px" width="70px">
              Description:
            </TitleText>
            <div style={{ paddingLeft: '10px' }}>{content?.description}</div>
          </div>
        )}
        {editMode && (
          <FormField
            disableBorder={!editMode}
            fieldType="input"
            margin
            fontSize="14px"
            width="100%"
            display="inline !important"
            textarea
            onChange={e => updateForm('description', e?.target?.value)}
            value={taskForm?.description}>
            Description
          </FormField>
        )}
      </div>
      <div
        style={{
          marginTop: '20px',
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
          width: '100%'
        }}>
        <FormField
          fieldType="input"
          fontSize="14px"
          placeholder="Leave a comment..."
          noMargin
          height="auto"
          textarea
          width="100%"
          display="inline !important"
          onChange={e => setComment({ ...newComment, comment: e.target.value })}
          value={newComment.comment}>
          Discussion
        </FormField>
      </div>
      {content?.comments &&
        content?.comments.length > 0 &&
        content?.comments.map((item, index) => (
          <WhiteCard
            borderColor="transparent"
            unset
            key={item?._id}
            noMargin
            padding={index === 0 ? '30px 0px 0px 0px' : '0px'}>
            <Grid2 block margin="0px">
              <Span margin="0px 0px 10px 0px">
                {item?.profilePic && <Image src={item?.profilePic} width="24px" height="24px" radius="50%" />}
                <Span space>
                  <DarkText noMargin>
                    {item?.name || ''}
                    <span style={{ paddingLeft: '20px' }}>
                      {ValidationUtils.formatDateWithDate(item?.updatedAt)} -{' '}
                      {ValidationUtils.getTimeFormated(item?.updatedAt)}
                    </span>
                  </DarkText>
                </Span>
              </Span>
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'flex-end',
                  marginTop: '20px'
                }}>
                <EditIcon width="12px" height="12px" color="#585858" />
              </div>
            </Grid2>
            {item?.comment && <DarkText padding="0px 0px 0px 15px">{item?.comment}</DarkText>}
            {item?.img && <Image src={item?.img} />}
          </WhiteCard>
        ))}
    </>
  )
}
export default TaskForm
