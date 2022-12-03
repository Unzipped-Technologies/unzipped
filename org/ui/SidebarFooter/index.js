import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const SidebarFooterContainer = styled.div`
    padding: 0 0 0 20px;
    margin-top: auto;
    min-width: 320px;
`;

/**
 * SidebarFooter Component.
 */
const SidebarFooter = ({children}) => <SidebarFooterContainer>{children}</SidebarFooterContainer>;

SidebarFooter.propTypes = {
    /** Children of footer */
    children: PropTypes.node,
};

SidebarFooter.defaultProps = {
    children: null,
};

export default SidebarFooter;
