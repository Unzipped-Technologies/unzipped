import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

/**
 * Styling for Button Group
 */
const ButtonWrapper = styled.div`
    width: 100%;
    display: flex;
    position: relative;
    margin-top: 20px;
    justify-content: ${({justifyContent}) => justifyContent};
    flex-flow: row nowrap;
    text-align: right;
    & > *${({$flush}) => ($flush ? ':not(:first-child)' : '')} {
        margin-left: 10px;
        min-width: 107px;
    }
    @media(max-width: 564px) {
        flex-flow: ${({mobileCenter}) => mobileCenter ? 'column nowrap' : 'row nowrap'};
        width: ${({mobileCenter}) => mobileCenter ? '80%' : '100%'};
        justify-content: ${({mobileCenter, justifyContent}) => mobileCenter ? 'center' : justifyContent};
        & > *${({$flush}) => ($flush ? ':not(:first-child)' : '')} {
            margin-left: ${({mobileCenter}) => mobileCenter ? '0px' : '10px'};
            margin-top: ${({mobileCenter}) => mobileCenter ? '15px' : '0px'};
            min-width: 107px;
        }
    }
    @media(max-width: 448px) {
        position: ${({mobileAbsolute}) => mobileAbsolute ? 'absolute' : 'relative'};
        bottom: ${({mobileAbsolute}) => mobileAbsolute ? '15px' : 'unset'};
    }
`;

/**
 * Buttons Component - This component will automatically group multiple Button components together.
 */
const Buttons = ({children, justifyContent, flush, className, mobileCenter, mobileAbsolute}) => (
    <ButtonWrapper className={className} $flush={flush} justifyContent={justifyContent} mobileCenter={mobileCenter} mobileAbsolute={mobileAbsolute}>
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
