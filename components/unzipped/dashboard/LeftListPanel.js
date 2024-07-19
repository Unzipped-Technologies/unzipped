import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { TitleText, DarkText, Absolute, WhiteCard, Underline } from './style'
import { getListEntriesById, getTeamMembers, getRecentlyViewedList } from '../../../redux/ListEntries/action'
import { useDispatch, useSelector } from 'react-redux'
import ListManagementPanel from './ListManagementPanel'
import IconSelector from './IconSelector'
import { IconColors } from '../../../utils/FontIcons'

const Container = styled.div`
  position: relative;
  display: flex;
  flex-flow: column;
  border: 1px solid #d9d9d9;
  width: 371px;
  height: fit-content;
  padding: 20px 0px;
  margin-left: 10px;
  border-radius: 10px;
  overflow: hidden;
  @media (max-width: 1301px) {
    width: 210px;
    margin-left: 5px;
  }
  @media (max-width: 1032px) {
    width: 200px;
  }
  @media (max-width: 900px) {
    width: max-content;
  }
`

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

const Panel = ({
  list,
  business,
  selectList,
  type,
  setIsFavourite,
  setIsRecentlyViewed,
  setIsMyTeam,
  userListItems,
  setListTitle,
  listInfo
}) => {
  const isDepartment = type === 'department'
  const dispatch = useDispatch()
  const userId = useSelector(state => state.Auth?.user?._id)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [selectedMenuOption, setSelectedMenuOption] = useState({ name: '', icon: '', _id: null })

  const handleListChangeEv = item => {
    let isDefaultListItem = false

    if (item?.name === 'Favorites') {
      setIsFavourite(true)
      setIsRecentlyViewed(false)
      setIsMyTeam(false)
      isDefaultListItem = true
      dispatch(getListEntriesById(item?._id))
    }
    if (item?.name === 'Recently Viewed') {
      setIsRecentlyViewed(true)
      setIsFavourite(false)
      setIsMyTeam(false)
      isDefaultListItem = true
      dispatch(getRecentlyViewedList(item?._id))
    }
    if (item?.name === 'My Team') {
      setIsMyTeam(true)
      setIsRecentlyViewed(false)
      setIsFavourite(false)
      isDefaultListItem = true
      dispatch(getTeamMembers(userId))
    }
    setListTitle({ listId: item?._id, listTitle: item?.name, listIcon: item?.icon })
    if (!isDefaultListItem) {
      setIsMyTeam(false)
      setIsRecentlyViewed(false)
      setIsFavourite(false)
      dispatch(getListEntriesById(item._id))
    }
  }

  useEffect(() => {
    setSelectedMenuOption(listInfo)
  }, [listInfo])

  return (
    <Container>
      <TitleText paddingLeft clickable>
        {business}
        <Absolute top="20px">
          <Action
            onClick={() => {
              setIsModalOpen(true)
            }}>
            {isDepartment ? '' : '+ New List'}
          </Action>
        </Absolute>
      </TitleText>
      <Underline />
      {userListItems?.length > 0 &&
        userListItems
          .filter(item => (isDepartment ? item.tags.length > 0 : true))
          .map((item, index) => (
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
              {item?.icon && (
                <IconSelector
                  icon={item.icon}
                  size={24}
                  style={{ color: IconColors[item.icon] || '#1C1C1C' }}
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
                  setSelectedMenuOption(item)
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
    </Container>
  )
}

export default Panel
