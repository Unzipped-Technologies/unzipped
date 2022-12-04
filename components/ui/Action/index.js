import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ItemContainer = styled.div`
    cursor: pointer;
    font-family: arial;
    font-size: ${props => props.theme.fontSizeS};
    font-weight: 700;
    white-space: nowrap;
    color: ${props => (props.$color ? props.theme[props.$color] : props.theme.secondary)};
`;

/**
 * Action Item Component.
 */
const Action = ({children, color, onClick, className}) => (
    <ItemContainer role="button" onClick={onClick} data-testid="action-item" $color={color} className={className}>
        {children}
    </ItemContainer>
);

Action.propTypes = {
    /** Children to display in the action link */
    children: PropTypes.node,
    /** onClick event */
    onClick: PropTypes.func.isRequired,
    /** Theme color to use instead of the default (secondary)  */
    color: PropTypes.string,
    /** Additional classNames  */
    className: PropTypes.string,
};

Action.defaultProps = {
    children: null,
    color: null,
    className: '',
};

export default Action;
