import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const SubtitleContainer = styled.h1`
    color: #54565b;
    font-family: Arial;
    font-style: normal;
    font-weight: 400;
    font-size: ${props => props.theme.baseFontSize};
    margin-bottom: 10px;
    line-height: ${props => props.theme.baseLineHeight};
`;

/**
 * Subtitle Component.
 */
const Subtitle = ({children}) => <SubtitleContainer>{children}</SubtitleContainer>;

Subtitle.propTypes = {
    /** Children the component contains */
    children: PropTypes.node,
};

Subtitle.defaultProps = {
    children: null,
};

export default Subtitle;
