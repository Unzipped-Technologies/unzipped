import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import theme from 'themes/default';
import {Constants} from 'utils';

const BadgeContainer = styled.div`
    background: ${props => props.color.background};
    color: ${props => props.color.text};
    border: 0;
    box-sizing: border-box;
    border-radius: 14px;
    font-size: ${props => (props.small ? '0.688rem' : '0.813rem')};
    padding: 6px 12px;
    margin-right: 10px;
    font-family: arial;
    display: inline-block;
    font-weight: 700;
    text-transform: uppercase;
    white-space: nowrap;
`;

const statusColor = {
    [Constants.subscriptionStatus.actionRequired]: 'highlight',
    [Constants.subscriptionStatus.documentsComplete]: 'success',
    [Constants.subscriptionStatus.invited]: 'highlight',
    [Constants.subscriptionStatus.inProgress]: 'secondaryLight',
    [Constants.subscriptionStatus.closeReady]: 'success',
    [Constants.subscriptionStatus.closed]: 'primary',
    [Constants.subscriptionStatus.declined]: 'highlight',
};

const colors = {
    default: {
        text: theme.text,
        background: theme.tint3,
    },
    primary: {
        text: '#fff',
        background: theme.primary,
    },
    secondary: {
        text: '#fff',
        background: theme.secondary,
    },
    secondaryLight: {
        text: theme.secondary,
        background: theme.secondaryLight,
    },
    success: {
        text: theme.successText,
        background: theme.success,
    },
    highlight: {
        text: theme.text,
        background: theme.important,
    },
    green: {
        text: theme.green,
        background: theme.greenLight,
    },
    red: {
        text: theme.error,
        background: theme.errorLight,
    },
    darkRed: {
        text: '#fff',
        background: theme.error,
    },
};

const getStatusColor = status => statusColor[status];
const getColor = color => (colors[color] ? colors[color] : colors.default);
/**
 * Badge Component. Colors can be set either through status value, or directly by providing color name.
 */
const Badge = ({children, className, color, status, small}) => {
    const badgeColor = status ? getStatusColor(status) : color;
    return (
        <BadgeContainer color={getColor(badgeColor)} small={small} className={className}>
            {children}
        </BadgeContainer>
    );
};

Badge.propTypes = {
    /** Children the component contains */
    children: PropTypes.node,
    /** specific colors to use */
    color: PropTypes.string,
    /** status value to translate to color */
    status: PropTypes.string,
    /** display a smaller version */
    small: PropTypes.bool,
};

Badge.defaultProps = {
    children: null,
    color: null,
    status: null,
    small: false,
};

export default Badge;
