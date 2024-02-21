import React, { useState } from 'react'
import { Icon } from '../ui'
import styled from 'styled-components'

const Container = styled.div`
    position: relative;
`;

const ButtonTwo = styled.div`
    transform: rotate(90deg);
    outline: none;
    border: none;
    left: 10px;
    position: relative;
`;

const Dropdown = styled.div`
    width: 170px;
    background: #fff;
    position: absolute;
    top: 30px;
    border: solid 1px black;
    right: -10px;
    padding: 10px 0px;
`;

const ButtonSubmit = styled.button`
    background: transparent;
    outline: none;
    border: none;
    width: 100%;
    text-align: left;
    padding: 4px 15px;
    &:hover {
        background: #d8d8d8;
    }
`;

const VerticalDropdown = ({dropdownOptions}) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <Container>
            <ButtonTwo onClick={() => setIsOpen(!isOpen)}>
                <Icon name="actionIcon" color="#333" />
            </ButtonTwo>
            {isOpen && (
                <Dropdown onMouseLeave={() => setIsOpen(false)}>
                    {dropdownOptions.map((item) => {
                        return (
                            <ButtonSubmit onClick={item.action}>{item.name}</ButtonSubmit>
                        )
                    })}
                </Dropdown>
            )}
        </Container>
    )
}

export default VerticalDropdown