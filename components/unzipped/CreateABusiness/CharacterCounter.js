import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Grid } from '../../../components/unzipped/dashboard/style';
import { useSelector } from 'react-redux';

export const MinMaxCharSpan = styled.span`
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 1px;
    padding-top: 2px;
    color: ${(({ color }) => color ? color : "#000")};
    text-transform: ${({ textTransform }) => textTransform ? textTransform : 'none'}
`;

const CharacterCounterWrapper = styled.div`
    display: flex; 
    justify-content: space-between; 
    color: #A1A1A1; 
    width: 100%;
     @media screen and (max-width: 600px) {
        height: 20px;
        justify-content: space-between;
     }
`
const CharacterCounter = ({ field }) => {
    const { businessForm } = useSelector(state => state.Business);
    const minCharLimit = (field === 'challenge' || field === 'role') ? 200 : 100;

    return (
        <CharacterCounterWrapper >
            <div>
                {businessForm?.[field]
                    && businessForm?.[field].length < minCharLimit
                    && businessForm?.isFieldSubmitted && (
                        <MinMaxCharSpan color='#D13823' textTransform="uppercase">
                            Please enter atleast {minCharLimit} character
                        </MinMaxCharSpan>
                    )}
            </div>
            <div>
                <MinMaxCharSpan>
                    {field ? businessForm[field].length : 0} / 1000
                </MinMaxCharSpan>

            </div>
        </CharacterCounterWrapper>
    )
}

export default CharacterCounter