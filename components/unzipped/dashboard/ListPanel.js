import React from 'react'
import styled from 'styled-components'
import LeftListPanel from './LeftListPanel'
import RightListPanel from './RightListPanel'

const Container = styled.div`
  overflow: overlay;
  display: grid;
  grid-template-columns: 1fr 3fr;
  margin: 40px 10%;
  border-radius: 10px;
  /* Hide the scrollbar but keep it functional */
  ::-webkit-scrollbar {
    width: 0; /* Set width to 0 to hide it */
    height: 0; /* Set height to 0 if you're hiding the horizontal scrollbar */
  }

  /* Optionally, you can style the scrollbar track and thumb as needed */
  ::-webkit-scrollbar-track {
    background-color: transparent; /* Make the track transparent */
  }

  ::-webkit-scrollbar-thumb {
    background-color: transparent; /* Make the thumb transparent */
  }
`

const ListPanel = ({
  selectList,
  addCommentToStory,
  user,
  access,
  reorderStories,
  createNewStory,
  dropdownList,
  form,
  list,
  business,
  selectedList,
  type,
  tags = [],
  stories = [],
  updateCreateStoryForm,
  updateTasksOrder,
  departments = []
}) => {
  return (
    <Container>
      <LeftListPanel
        selectList={selectList}
        list={list}
        business={business}
        selectedList={selectedList}
        departments={departments}
        type={type}
      />
      <RightListPanel
        updateTasksOrder={updateTasksOrder}
        updateCreateStoryForm={updateCreateStoryForm}
        addCommentToStory={addCommentToStory}
        reorderStories={reorderStories}
        tags={tags}
        dropdownList={dropdownList}
        stories={stories}
        list={list}
        access={access}
        createNewStory={createNewStory}
        user={user}
        business={business}
        selectedList={selectedList}
        type={type}
        form={form}
        departments={departments}
      />
    </Container>
  )
}

export default ListPanel
