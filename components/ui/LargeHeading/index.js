import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import theme from '../theme';

const DisplayHeading = styled.h1`
    color: ${({$color}) => $color};
    font-family: arial;
    font-style: normal;
    font-weight: 700;
    font-size: 3.125rem;
    line-height: 3.594rem;
    max-width: ${({$width}) => $width};
    @media (max-width: ${props => props.theme.mobileWidth}px) {
        font-size: ${props => props.theme.fontSizeXXL};
        line-height: 2.875rem;
    }
`;

/**
 * The LargeHeading component is a larger heading. For smaller headings, use the Title component.
 */
const LargeHeading = ({children, className, color, width}) => {
    return (
        <DisplayHeading className={className} $color={color} $width={width}>
            {children}
        </DisplayHeading>
    );
};

LargeHeading.propTypes = {
    /** Children the component contains */
    children: PropTypes.node,
    /** Change LargeHeading color */
    color: PropTypes.string,
    /** set a max width on the LargeHeading */
    width: PropTypes.string,
};

LargeHeading.defaultProps = {
    children: null,
    color: theme.text,
    width: '100%',
};

export default LargeHeading;
