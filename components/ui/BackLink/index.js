import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Link from 'next/link';
import theme from '../theme';
import Icon from '../Icon';

const Links = styled(Link)`
    display: inline-flex;
    align-items: flex-start;
    max-height: 20px;
    font-family: arial;
    font-size: ${props => props.theme.fontSizeS};
    font-weight: 400;
    margin: ${props => props.margin};
    color: ${theme.secondary};
    &:link {
        color: ${theme.secondary};
        text-decoration: none;
    }
    &:visited {
        color: ${theme.secondary};
        text-decoration: none;
    }
    &:hover {
        color: ${theme.secondary};
        text-decoration: none;
    }
    &:active {
        color: ${theme.secondary};
        text-decoration: none;
    }
    svg {
        width: 8px;
        height: 14px;
        margin-right: 10px;
        margin-top: 1px;
        path {
            fill: ${theme.secondary};
        }
    }
`;

const BackLink = ({link, label, margin, children, hideIcon = false, ...rest}) => {
    const linkTestId = `${label}-link`;
    return (
        <Links data-testid={linkTestId} margin={margin} to={link} {...rest}>
            {!hideIcon && <Icon name="back" />}
            {children}
        </Links>
    );
};

BackLink.propTypes = {
    /** String of address to navigate to */
    link: PropTypes.string.isRequired,
    /** Label of the link for data-testid */
    label: PropTypes.string.isRequired,
    /** Label of the link for data-testid */
    margin: PropTypes.string,
    /** value to hide back icon*/
    hideIcon: PropTypes.bool,
};

export default BackLink;
