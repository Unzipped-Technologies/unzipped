import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    background: ${props => props.theme.tint4};
    display: flex;
    flex-direction: column;
    align-content: flex-start;
    align-items: center;
    min-height: 100vh;
    height: 100%;
    text-size-adjust: none;
`;

/**
 * Dashboard Layout Component.
 */
const DashboardLayout = ({children}) => {
    return <Container>{children}</Container>;
};

DashboardLayout.propTypes = {
    /** Children of the component  */
    children: PropTypes.node,
};

DashboardLayout.defaultProps = {
    children: null,
};

export default DashboardLayout;
