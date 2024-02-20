import React, {useState} from 'react';
import styled from 'styled-components'
import {
    DownIcon
} from '../icons'

const Search = styled.div`
    display: flex;
    flex-flow: row nowrap;
    border: 1px solid #c4c4c4;
    border-radius: 24px;
    height: 42px;
    width: 218px;
    align-items: center;
    overflow: hidden;
    @media (max-width: 1295px) {
        display: none;
    }
`;

const Magnify = styled.div`
    margin-left: 5px;
    margin-right: 5px;
    margin-top: 2px;
    color: #333;
`;

const Inputs = styled.input`
    position: relative;
    margin: 0px !important;
    padding-left: 5px;
    bottom: 0px;
    max-height: 24px;
    max-width: 100px;
    border: none !important;
    border-right: #888 solid 2px !important;
    outline: none !important;
`;

const Span = styled.span`
    display: flex;
    font-weight: 400;
    flex-flow: row;
    margin-left: 10px;
`;

const Span2 = styled.span`
    margin-left: 8px;
`;

const Input = ({placeholder, icon}) => {
    const [selected, setSelected] = useState('Ideas');

    const dropdown = [
        'Ideas',
        'Freelancers', 
        'Businesses'
    ]
    return (
        <Search>
            {icon && (
                <Magnify className="material-icons">
                    {icon}
                </Magnify>
            )}
            <Inputs placeholder={placeholder} />
            <Span>{selected}<Span2><DownIcon /></Span2></Span>
        </Search>
    )
}

export default Input;