import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ActionItemsContainer = styled.div`
    margin: 30px 20px;
    padding: 0 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    box-sizing: border-box;
`;

/**
 * Sidebar action items container.
 */
const SidebarActionItems = ({children}) => {
    return <ActionItemsContainer>{children}</ActionItemsContainer>;
};

SidebarActionItems.propTypes = {
    /** Sidebar Action children */
    children: PropTypes.node,
};

SidebarActionItems.defaultProps = {
    children: null,
};

export default SidebarActionItems;
