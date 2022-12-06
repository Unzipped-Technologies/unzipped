import React from 'react'
import styled from 'styled-components'
import {
    BlackCard,
    WhiteText,
    TitleText,
    DarkText,
    Absolute,
    WhiteCard,
    Dismiss
} from './style'
import LeftListPanel from './LeftListPanel'
import RightListPanel from './RightListPanel'

const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 3fr;
    padding: 40px 12.5%;
    border-radius: 10px;
`;

const ListPanel = ({list, business, selectedList, type}) => {
    return (
        <Container>
            <LeftListPanel list={list} business={business} selectedList={selectedList}/>
            <RightListPanel list={list} business={business} selectedList={selectedList} type={type}/>
        </Container>
    )
}

export default ListPanel