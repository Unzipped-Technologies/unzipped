import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Message = styled.p`
    font-family: arial;
    font-weight: 400;
    font-size: ${props => props.theme.baseFontSize};
    font-style: normal;
    line-height: ${props => props.theme.baseLineHeight};
    margin-bottom: 25px;
    color: ${props => props.theme.textSecondary};
`;

const RequiredMessage = ({children}) => {
    return <Message>{children}</Message>;
};

RequiredMessage.propTypes = {
    /** Message to Display */
    children: PropTypes.node,
};

RequiredMessage.defaultProps = {
    children: 'All fields marked with an asterisk (*) are required.',
};

export default RequiredMessage;
