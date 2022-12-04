import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

// The !important tags are necessary to override Menlo stylings
const linkStyles = color => `
    &:link {
        color: ${color} !important;
        text-decoration: none !important;
    }
    &:visited {
        color: ${color} !important;
        text-decoration: none !important;
    }
    &:hover {
        color: ${color} !important;
        text-decoration: none !important;
    }
    &:active {
        color: ${color} !important;
        text-decoration: none !important;
    }
`;

const Link = styled.a`
    display: inline-flex;
    align-items: center;
    font-family: arial;
    cursor: pointer;
    font-style: normal;
    font-size: ${props => props.theme.baseFontSize};
    font-weight: 700;
    color: ${props => props.theme.secondary} !important;
    white-space: nowrap;
    ${linkStyles(props => props.theme.secondary)}
`;

/**
 * InlineLink Item Component.
 */
const InlineLink = ({children = null, onClick, className = ''}) => (
    <Link role="button" onClick={onClick} data-testid="inline-link" className={className}>
        {children}
    </Link>
);

InlineLink.propTypes = {
    /** Children to display in the action link */
    children: PropTypes.node,
    /** onClick event */
    onClick: PropTypes.func.isRequired,
    /** Additional classNames */
    className: PropTypes.string,
};

export default InlineLink;
