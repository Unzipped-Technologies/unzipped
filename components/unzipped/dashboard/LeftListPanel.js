import React from 'react'
import styled from 'styled-components'
import {
    TitleText,
    DarkText,
    Absolute,
    WhiteCard,
    Underline,
} from './style'

const Container = styled.div`
    position: relative;
    display: flex;
    flex-flow: column;
    border: 1px solid #D9D9D9;
    width: 100%;
    max-height: 900px;
    padding: 20px 0px;
    margin-left: 10px;
    border-radius: 10px;
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

const Panel = ({list, business, selectList, type}) => {
    return (
        <Container>
            <TitleText paddingLeft clickable>{business}<Absolute top="20px"><Action>{type === 'department' ? '' : '+ New List'}</Action></Absolute></TitleText>
            <Underline />   
            {list.map(item => (
                <WhiteCard borderColor="transparent" height="30px" row noMargin clickable onClick={() => selectList(item)}>
                    {item.icon}
                    <DarkText clickable noMargin paddingLeft hover>{item.text}</DarkText>
                </WhiteCard>
            ))}
        </Container>
    )
}

export default Panel;