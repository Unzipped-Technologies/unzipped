import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'

import LeftListPanel from './LeftListPanel'
import RightListPanel from './RightListPanel'
import { getListEntriesById } from '../../../redux/actions'

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr;
  margin: 40px;
  border-radius: 10px;
  /* Hide the scrollbar but keep it functional */
  ::-webkit-scrollbar {
    width: 0px; /* Set width to 0 to hide it */
    height: 0px; /* Set height to 0 if you're hiding the horizontal scrollbar */
  }

  /* Optionally, you can style the scrollbar track and thumb as needed */
  ::-webkit-scrollbar-track {
    background-color: transparent; /* Make the track transparent */
  }

  ::-webkit-scrollbar-thumb {
    background-color: transparent; /* Make the thumb transparent */
  }
  @media (max-width: 1301px) {
    margin: 20px;
  }
  @media screen and (max-width: 600px) {
    display: none;
  }

  @media screen and (max-width: 600px) {
    display: none;
  }
`

const ListPanel = ({ userListItems = [] }) => {
  const dispatch = useDispatch()

  const [listInfo, setListInfo] = useState({ listId: null, listTitle: null, listIcon: null })

  const { updatedList } = useSelector(state => state.Lists)

  useEffect(() => {
    if (updatedList) {
      setListInfo({ listId: updatedList._id, listTitle: updatedList.name, listIcon: updatedList.icon })
      return
    }

    if (userListItems && userListItems.length > 0) {
      const selectedListObj = userListItems?.find(list => list.name === 'Favorites')
      if (selectedListObj?._id) {
        setListInfo({ listId: selectedListObj._id, listTitle: selectedListObj.name, listIcon: selectedListObj.icon })
      } else {
        setListInfo({
          listId: userListItems[0]._id,
          listTitle: userListItems[0].name,
          listIcon: userListItems[0].icon
        })
      }
    }
  }, [userListItems, updatedList])

  useEffect(() => {
    if (listInfo?.listId) {
      dispatch(getListEntriesById(listInfo.listId))
    }
  }, [listInfo])

  return (
    <Container>
      <LeftListPanel userListItems={userListItems} setListInfo={setListInfo} listInfo={listInfo} />
      <RightListPanel listInfo={listInfo} setListInfo={setListInfo} />
    </Container>
  )
}

export default ListPanel
