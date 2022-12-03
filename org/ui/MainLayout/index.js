import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.div`
    background: ${props => props.theme.tint4};
    display: flex;
    flex-direction: row;
    align-items: stretch;
    align-content: flex-start;
    width: 100vw;
    height: 100vh;
    position: fixed;
    overflow: hidden;
    @media (max-width: ${props => props.theme.mobileWidth}px) {
        flex-direction: column;
        width: 100%;
        height: auto;
        position: relative;
    }
`;

/**
 * Main Layout Component.
 */
const MainLayout = ({children, className = ''}) => <Container className={className}>{children}</Container>;

MainLayout.propTypes = {
    /** Children the component contains */
    children: PropTypes.node,
    /** Classname for unique styling */
    className: PropTypes.string,
};

MainLayout.defaultProps = {
    children: null,
};

export default MainLayout;
