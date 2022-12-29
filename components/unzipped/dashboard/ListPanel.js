import React from 'react'
import styled from 'styled-components'
import LeftListPanel from './LeftListPanel'
import RightListPanel from './RightListPanel'

const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 3fr;
    padding: 40px 12.5%;
    border-radius: 10px;
`;

const ListPanel = ({selectList, list, business, selectedList, type, tags = [], stories = [], updateTasksOrder, departments = []}) => {
    return (
        <Container>
            <LeftListPanel selectList={selectList} list={list} business={business} selectedList={selectedList} departments={departments}/>
            <RightListPanel 
                updateTasksOrder={updateTasksOrder} 
                tags={tags} 
                stories={stories} 
                list={list} 
                business={business} 
                selectedList={selectedList} 
                type={type}
                departments={departments}
            />
        </Container>
    )
}

export default ListPanel