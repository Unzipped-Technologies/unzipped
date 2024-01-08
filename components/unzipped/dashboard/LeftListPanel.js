import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {
    TitleText,
    DarkText,
    Absolute,
    WhiteCard,
    Underline,
} from './style'
import Icon from '../../../components/ui/Icon'
import {
    getListEntriesById,
    getTeamMembers,
    getRecentlyViewedList
} from '../../../redux/ListEntries/action'
import { useDispatch, useSelector } from 'react-redux'
import ListManagementPanel from './ListManagementPanel'
import { IconPicker } from 'react-fa-icon-picker';
import { IconPickerItem } from 'react-fa-icon-picker'

const Container = styled.div`
    position: relative;
    display: flex;
    flex-flow: column;
    border: 1px solid #D9D9D9;
    width: 371px;
    height: fit-content;
    padding: 20px 0px;
    margin-left: 10px;
    border-radius: 10px;
    overflow: hidden
`;

const Action = styled.div`
    width: 100%;
    color: blue;
    cursor: pointer;
    font-weight: 400;
    font-size: 16px;
    &:hover {
        color: darkBlue;
    }
`;

const Panel = ({ list, business, selectList, type, setIsFavourite, setIsRecentlyViewed, setIsMyTeam, userListItems, setListTitle, listInfo }) => {
    const isDepartment = type === 'department';
    const dispatch = useDispatch();
    const userId = useSelector(state => state.Auth?.user?._id);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [selectedMenuOption, setSelectedMenuOption] = useState({ name: '', icon: '', _id: null });

    const handleListChangeEv = (item) => {
        let isDefaultListItem = false;

        if (item.name === 'Favorites') {
            setIsFavourite(true)
            setIsRecentlyViewed(false);
            setIsMyTeam(false);
            isDefaultListItem = true;
            dispatch(getListEntriesById(item._id));
        }
        if (item.name === 'Recently Viewed') {
            setIsRecentlyViewed(true);
            setIsFavourite(false);
            setIsMyTeam(false);
            isDefaultListItem = true;
            dispatch(getRecentlyViewedList(item._id));
        }
        if (item.name === 'My Team') {
            setIsMyTeam(true)
            setIsRecentlyViewed(false);
            setIsFavourite(false);
            isDefaultListItem = true;
            dispatch(getTeamMembers(userId))
        }

        setListTitle({ listId: item._id, listTitle: item.name, listIcon: item.icon });
        if (!isDefaultListItem) {
            setIsMyTeam(false)
            setIsRecentlyViewed(false);
            setIsFavourite(false);
            dispatch(getListEntriesById(item._id))
        }

    }
    useEffect(() => {
        if (userListItems && userListItems.length > 0) {
            const selectedItem = userListItems.find(list => list.name.toLowerCase().includes("favorites"));
            if (selectedItem) {
                setSelectedMenuOption(selectedItem)
            }
        }
    }, [userListItems])
    // borderLeft={selectedMenuOption === index ? "#1976D2" : "transparent"}
    // borderRadius={selectedMenuOption === index ? "0" : ""}
    const store = useSelector(state => state);
    console.log('store', store)
    return (
        <Container>
            <TitleText paddingLeft clickable>
                {business}
                <Absolute top="20px">
                    <Action
                        onClick={() => {
                            console.log('modal_open')
                            setIsModalOpen(true)
                        }}
                    >
                        {isDepartment ? '' : '+ New List'}
                    </Action>
                </Absolute>
            </TitleText>
            <Underline />
            {userListItems.filter(item => isDepartment ? item.tags.length > 0 : true).map((item, index) => (
                <WhiteCard
                    borderColor="transparent"
                    padding="5px"
                    height="30px"
                    paddingLeft="15px"
                    row
                    noMargin
                    clickable

                    borderLeft={selectedMenuOption?.name == item.name ? "#1976D2" : "transparent"}
                    borderRadius={selectedMenuOption?.name == item.name ? "0" : ""}
                    key={index}
                >
                    {(item?.isDefault && item.icon == 'FaEye') && (
                        <IconPickerItem icon={item.icon} size={24} color="#8EDE64" />
                    )}

                    {(item?.isDefault && item.icon == 'FaRegHeart') && (
                        <IconPickerItem icon={item.icon} size={24} color="#FA00FF" />
                    )}
                    {(item?.isDefault && item.icon == 'FaUsers') && (
                        <IconPickerItem icon={item.icon} size={24} color="#FFC24E" />
                    )}
                    {!item?.isDefault && (<IconPickerItem icon={item.icon} size={24} color="#e25050" />)}
                    <DarkText
                        clickable
                        noMargin
                        paddingLeft
                        hover
                        onClick={() => {
                            handleListChangeEv(item)
                            setSelectedMenuOption(item)
                        }
                        }
                    >
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

export default Panel;