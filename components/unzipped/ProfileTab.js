import React from 'react'
import {
    TitleText,
    DarkText,
    Underline,
    WhiteCard
} from './dashboard/style'
import styled from 'styled-components'

const Container = styled.div``;
const Menu = styled.div`
    display: flex;
    align-items: center;
    padding-left: 15%;
    border-top: 1px solid #666;
    border-bottom: 1px solid #666;
    height: 63px;
    @media (max-width: 680px) {
            padding-left: 4%;
      }
`;
const MenuItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    height: 100%;
    width: 98px;
    border-bottom: ${({ selected }) => selected ? '4px solid #333' : '0px'}
`;

const ProfileTab = ({ tabs, selected, setSelected, children }) => {
    return (
        <Container>
            <Menu>
                {tabs.map((item, index) => (
                    <MenuItem selected={selected === index} onClick={() => setSelected(index)}>
                        <DarkText noMargin key={index}>{item}</DarkText>
                    </MenuItem>
                ))}
            </Menu>
            {children}
        </Container>
    )
}

export default ProfileTab