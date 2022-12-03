import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import SidebarNavItem from 'components/ui/SidebarNavItem';

const SidebarNavItemStyled = styled(SidebarNavItem)`
    & div {
        & svg {
            width: 23px;
            height: 23px;
        }
    }
`;

/**
 * Account Sidebar Center Component.
 */
const AccountSidebar = ({title, onClick}) => (
    <SidebarNavItemStyled footer icon="profile" onClick={onClick}>
        {title}
    </SidebarNavItemStyled>
);

AccountSidebar.propTypes = {
    /** Title text for the sidebar */
    title: PropTypes.string.isRequired,
    /** On click handler for sidebar */
    onClick: PropTypes.func.isRequired,
};

export default AccountSidebar;
