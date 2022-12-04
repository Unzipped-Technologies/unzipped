import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

/**
 * Styling for Button Group
 */
const ButtonWrapper = styled.div`
    width: 100%;
    display: flex;
    margin-top: 20px;
    justify-content: ${({justifyContent}) => justifyContent};
    flex-flow: row nowrap;
    text-align: right;
    & > *${({$flush}) => ($flush ? ':not(:first-child)' : '')} {
        margin-left: 10px;
        min-width: 107px;
    }
`;

/**
 * Buttons Component - This component will automatically group multiple Button components together.
 */
const Buttons = ({children, justifyContent, flush, className}) => (
    <ButtonWrapper className={className} $flush={flush} justifyContent={justifyContent}>
        {children}
    </ButtonWrapper>
);

Buttons.propTypes = {
    /** Children of ButtonGroup */
    children: PropTypes.node.isRequired,
    /** Value for justify-content */
    justifyContent: PropTypes.string,
    /** Remove left margin on first button */
    flush: PropTypes.bool,
};

Buttons.defaultProps = {
    justifyContent: 'flex-start',
    flush: false,
};

export default Buttons;
