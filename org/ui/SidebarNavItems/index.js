import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {useHistory} from 'react-router-dom';
import SidebarNavItem from '../SidebarNavItem';
import {UserUtils} from 'utils';

const NavItemsContainer = styled.nav`
    padding: 0 0 0 20px;
    margin: 40px 0 20px 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
    box-sizing: border-box;
    flex-shrink: 0;
`;

/**
 * Sidebar navigation items container.
 */
const SidebarNavItems = ({children, className = '', showDashboardNavItem = true, dashboardPath = ''}) => {
    let history = useHistory();

    return (
        <NavItemsContainer className={className}>
            {showDashboardNavItem && (
                <SidebarNavItem
                    current={false}
                    icon="dashboard"
                    onClick={() => history.push(`${dashboardPath || UserUtils.getUserDefaultDashboard()}`)}>
                    Dashboard
                </SidebarNavItem>
            )}
            {children}
        </NavItemsContainer>
    );
};

SidebarNavItems.propTypes = {
    /** Sidebar Navigation children */
    children: PropTypes.node,
    /** Additional classNames, supports styled-components  */
    className: PropTypes.string,
    /** show link back to dashboard nav item*/
    showDashboardNavItem: PropTypes.bool,
    /** Path to use to navigate back to the dashboard*/
    dashboardPath: PropTypes.string,
};

export default SidebarNavItems;
