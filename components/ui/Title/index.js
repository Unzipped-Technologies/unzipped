import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const levelToRem = {
    1: '3rem',
    2: '2.25rem',
    3: '1.5rem',
};

const levelToLine = {
    1: '4rem',
    2: '3.25rem',
    3: '2.25rem',
};

const titleStyles = props => `
    color: ${props.$color ? props.$color : props.theme.heading};
    font-family: arial;
    font-style: normal;
    font-weight: 600;
    font-size: ${levelToRem[props.level]};
    line-height: ${levelToLine[props.level]};
    margin: ${props.linkAbove ? '30px 0 20px 0' : '40px 0 20px 0'};
    max-width: ${props.$width};
`;

const Title1 = styled.h1`
    ${props => titleStyles(props)}
`;

const Title2 = styled.h2`
    ${props => titleStyles(props)}
`;

const Title3 = styled.h3`
    ${props => titleStyles(props)}
`;

const levelToTitle = {
    1: Title1,
    2: Title2,
    3: Title3,
};

/**
 * Title Component.
 */
const Title = ({children, className, level, color, width, linkAbove}) => {
    const TitleContainer = levelToTitle[level];

    return (
        <TitleContainer className={className} level={level} linkAbove={linkAbove} $color={color} $width={width}>
            {children}
        </TitleContainer>
    );
};

Title.propTypes = {
    /** Children the component contains */
    children: PropTypes.node,
    /** set the heading level */
    level: PropTypes.oneOf([1, 2, 3]),
    /** set alternate colors for title */
    color: PropTypes.string,
    /** limit total width of title */
    width: PropTypes.string,
    /** get rid of margin up top if link is above */
    linkAbove: PropTypes.bool,
};

Title.defaultProps = {
    children: null,
    level: 1,
    color: '',
    width: '100%',
    linkAbove: false,
};

export default Title;
