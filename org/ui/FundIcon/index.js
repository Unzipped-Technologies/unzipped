import React from 'react';
import styled from 'styled-components';
import fundNav from '../icons/fund.svg';

const FundIconContainer = styled.div`
    background: ${({theme}) => theme.tint3};
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    place-self: start;
    height: 100%;
    padding: 1.5rem;
`;

const FundImage = styled.img`
    height: 100%;
`;

/**
 * Fund Icon Component
 */
const FundIcon = () => {
    return (
        <FundIconContainer>
            <FundImage src={fundNav} />
        </FundIconContainer>
    );
};

export default FundIcon;
