import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const levelToRem = {
    1: '3rem',
    2: '2.25rem',
    3: '1.5rem',
    4: '2.25rem',
    5: '1.375rem',
};

const levelToLine = {
    1: '4rem',
    2: '2.75rem',
    3: '2.25rem',
    4: '2.5rem',
    5: '2rem',
};

const titleStyles = props => `
    color: ${props.$color ? props.$color : props.theme.heading};
    font-family: arial;
    font-style: normal;
    font-weight: 600;
    font-size: ${levelToRem[props.level] || '2.25rem'};
    line-height: ${levelToLine[props.level] || '2.25rem'};
    margin: ${props.linkAbove ? '15px 0px 5px 0px' : props.margin ? props.margin : '40px 0 20px 0'};
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

const Title4 = styled.h4`
    ${props => titleStyles(props)}
`;

const Title5 = styled.h5`
    ${props => titleStyles(props)}
`;

const levelToTitle = {
    1: Title1,
    2: Title2,
    3: Title3,
    4: Title4,
    5: Title5,
};

/**
 * Title Component.
 */
const Title = ({children, className, level, color, width, linkAbove, margin}) => {
    const TitleContainer = levelToTitle[level];

    return (
        <TitleContainer className={className} margin={margin} level={level} linkAbove={linkAbove} $color={color} $width={width}>
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
