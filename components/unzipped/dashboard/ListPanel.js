import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import LeftListPanel from './LeftListPanel'
import RightListPanel from './RightListPanel'
import { useDispatch, useSelector } from 'react-redux';
import { getListEntriesById } from '../../../redux/actions';

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
    @media screen and (max-width: 600px){
        display: none;
    }

`;

const ListPanel = ({ selectList, addCommentToStory, user, access, reorderStories, createNewStory, dropdownList, form, list, business, selectedList, type, tags = [], stories = [], updateCreateStoryForm, updateTasksOrder, departments = [], userListItems = [] }) => {
    const [isFavourite, setIsFavourite] = useState(true);
    const [isRecentlyViewed, setIsRecentlyViewed] = useState(false);
    const [isMyTeam, setIsMyTeam] = useState(false);
    const [listInfo, setListInfo] = useState({ listId: null, listTitle: null, listIcon: null });
    const [defaultList, setDefaultList] = useState(null);
    const dispatch = useDispatch();
    const userRoleInfo = useSelector(state => state.Auth.user);
    const { updatedList } = useSelector(state => state.Lists);
    useEffect(() => {
        if (updatedList) {
            setListInfo({ listId: updatedList._id, listTitle: updatedList.name, listIcon: updatedList.icon });
            setDefaultList({ _id: updatedList._id, name: updatedList.name, icon: updatedList.icon })
            return;
        }
        if (userListItems && userListItems.length > 0) {
            const selectedListObj = userListItems?.find(list => list.name == 'Favorites');
            if (selectedListObj) {
                setListInfo({ listId: selectedListObj._id, listTitle: selectedListObj.name, listIcon: selectedListObj.icon });
                setDefaultList({ _id: selectedListObj._id, name: selectedListObj.name, icon: selectedListObj.icon })
            }
        }
    }, [userListItems, updatedList])

    useEffect(() => {
        if (defaultList) {
            dispatch(getListEntriesById(defaultList._id))
        }
    }, [defaultList])

    return (
        <>
            <Container>
                <LeftListPanel
                    selectList={selectList}
                    list={list}
                    business={business}
                    selectedList={selectedList}
                    departments={departments}
                    type={type}
                    setIsFavourite={setIsFavourite}
                    setIsRecentlyViewed={setIsRecentlyViewed}
                    setIsMyTeam={setIsMyTeam}
                    userListItems={userListItems}
                    setListTitle={setListInfo}
                    listInfo={listInfo}
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
                    isFavourite={isFavourite}
                    isRecentlyViewed={isRecentlyViewed}
                    isMyTeam={isMyTeam}
                    listInfo={listInfo}
                    setIsFavourite={setIsFavourite}
                />
            </Container>
        </>
    )
}

export default ListPanel
