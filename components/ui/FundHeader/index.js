import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import useWindowSize from '../hooks/useWindowSize';
import theme from '../theme';

const FundHeaderContainer = styled.div`
    width: ${({fullWidth, reducedView}) => (fullWidth || reducedView ? '100%' : '50%')};
    display: inline-block;
`;

/**
 * Fund Header Component
 */
const FundHeader = ({children, fullWidth}) => {
    const {width} = useWindowSize();
    const reducedView = width <= theme.reducedWidth;
    return (
        <FundHeaderContainer reducedView={reducedView} fullWidth={fullWidth}>
            {children}
        </FundHeaderContainer>
    );
};

FundHeader.propTypes = {
    /** Elements being passed into the header */
    children: PropTypes.element,
};

export default FundHeader;
