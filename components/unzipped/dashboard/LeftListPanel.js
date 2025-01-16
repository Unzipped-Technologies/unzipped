import React, { useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import * as Icons from '@ant-design/icons/lib/icons'

import IconSelector from './IconSelector'
import { IconColors } from '../../../utils/FontIcons'
import ListManagementPanel from './ListManagementPanel'
import { TitleText, DarkText, Absolute, WhiteCard, Underline, DIV } from './style'
import { getListEntriesById } from '../../../redux/ListEntries/action'

const Action = styled.div`
  width: 100%;
  color: blue;
  cursor: pointer;
  font-weight: 400;
  font-size: 16px;
  &:hover {
    color: darkBlue;
  }
`

const Panel = ({ business, userListItems, setListInfo, listInfo }) => {
  const dispatch = useDispatch()
  const userId = useSelector(state => state.Auth?.user?._id)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)

  const handleListChangeEv = item => {
    setListInfo({ listId: item?._id, listTitle: item?.name, listIcon: item?.icon })
    dispatch(getListEntriesById(item._id))
  }

  return (
    <DIV
      position="relative"
      display="flex"
      flexFlow="column"
      border="1px solid #d9d9d9"
      width="371px"
      height="fit-content"
      padding="20px 0px"
      margin-left="0px 0px 0px 10px"
      border-radius="10px"
      overflow="hidden"
      data-testid="left_lists_panel"
      id="left_lists_panel"
      overFlowX="hidden">
      <TitleText paddingLeft clickable>
        <Absolute top="20px">
          <Action
            onClick={() => {
              setIsModalOpen(true)
            }}>
            + New List
          </Action>
        </Absolute>
      </TitleText>
      <Underline />
      {userListItems?.length > 0 &&
        userListItems.map((item, index) => (
          <WhiteCard
            borderColor="transparent"
            padding="5px"
            height="30px"
            paddingLeft="15px"
            row
            noMargin
            clickable
            borderLeft={listInfo?.listTitle == item.name ? '#1976D2' : 'transparent'}
            borderRadius={listInfo?.listTitle == item.name ? '0' : ''}
            key={index}>
            {item?.icon && Icons[item?.icon] && (
              <IconSelector
                id={item?._id + '_icon'}
                icon={item.icon}
                size={24}
                style={{ color: IconColors[item.icon] }}
                twoToneColor={IconColors[item.icon]}
              />
            )}

            <DarkText
              clickable
              noMargin
              paddingLeft
              smallPadding="12px"
              hover
              onClick={() => {
                handleListChangeEv(item)
              }}>
              {item.name}
            </DarkText>
          </WhiteCard>
        ))}
      <ListManagementPanel
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        isEditMode={isEditMode}
        setIsEditMode={setIsEditMode}
        userId={userId}
        listInfo={listInfo}
      />
    </DIV>
  )
}

export default Panel
