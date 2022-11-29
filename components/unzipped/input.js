import React from 'react';
import styled from 'styled-components'

const Search = styled.div`
    display: flex;
    border: 1px solid #c4c4c4;
    border-radius: 16px;
    height: 35px;
    width: 196px;
    align-items: center;
    overflow: hidden;
`;

const Magnify = styled.div`
    margin-left: 5px;
    margin-right: 5px;
    margin-top: 2px;
    color: #333;
`;

const Inputs = styled.input`
    margin: 0px !important;
    padding-left: 5px;
`;

const Input = ({placeholder, icon}) => {
    return (
        <Search>
            {icon && (
                <Magnify className="material-icons">
                    {icon}
                </Magnify>
            )}
            <Inputs placeholder={placeholder} />
        </Search>
    )
}

export default Input;