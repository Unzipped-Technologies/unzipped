import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
    width: ${props => (props.sidebar ? '30px' : '50px')};
    text-align: center;
`;

const Border = styled.div`
    display: inline-block;
    border: ${props => (props.borderWidth ? props.borderWidth : '2px')} solid
        ${props =>
            props.sidebar
                ? 'white'
                : props.borderThemeColor
                ? props.theme[props.borderThemeColor]
                : props.theme.primary};
    border-radius: 4px;
    width: ${({width, sidebar}) => (sidebar ? '30px' : width)};
    height: ${({width, sidebar}) => (sidebar ? '30px' : width)};
    margin: 0 auto;
    font-family: arial;
`;

const Text = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    color: ${props =>
        props.sidebar ? 'white' : props.textThemeColor ? props.theme[props.textThemeColor] : props.theme.primary};
    font-weight: ${({fontWeight}) => fontWeight};
    font-size: ${({fontSize}) => fontSize};
`;

/**
 * Initials Icon Component.
 */
const InitialsIcon = ({
    initials,
    sidebar,
    width,
    borderWidth,
    height,
    fontWeight,
    fontSize,
    textThemeColor = '',
    borderThemeColor = '',
    ...rest
}) => {
    if (initials.length === 0 || initials.length > 2) {
        return <div data-testid="initials-icon" {...rest} />;
    }

    return (
        <Wrapper data-testid="initials-icon" sidebar={sidebar} {...rest}>
            <Border
                sidebar={sidebar}
                width={width}
                borderWidth={borderWidth}
                height={height}
                borderThemeColor={borderThemeColor}>
                <Text sidebar={sidebar} fontWeight={fontWeight} fontSize={fontSize} textThemeColor={textThemeColor}>
                    {initials}
                </Text>
            </Border>
        </Wrapper>
    );
};

InitialsIcon.propTypes = {
    /** initial(s) for profile icon */
    initials: PropTypes.string,
    /** Is the component in the sidebar */
    sidebar: PropTypes.bool,
    /** Size of font */
    fontSize: PropTypes.string,
    /** Change size of font-weight */
    fontWeight: PropTypes.string,
    /** Change color of Initial Text */
    textThemeColor: PropTypes.string,
    /** Change color of Border */
    borderThemeColor: PropTypes.string,
    /** Change width of border */
    borderWidth: PropTypes.string,
    /** Change size of width of border */
    width: PropTypes.string,
    /** Change size of height of border */
    height: PropTypes.string,
};

InitialsIcon.defaultProps = {
    initials: '',
    sidebar: false,
    fontSize: '0.875rem',
    fontWeight: '700',
    borderWidth: '2px',
    width: '40px',
    height: '40px',
};

export default InitialsIcon;
