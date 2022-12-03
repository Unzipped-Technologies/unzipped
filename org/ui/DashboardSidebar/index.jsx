import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import 'simplebar';
import Icon from 'components/ui/Icon';
import VanillaLogo from 'images/vanilla-wordmark-rgb.svg';

const Sidebar = styled.aside`
    position: fixed !important;
    top: 0;
    left: 0;
    background: ${({theme}) => theme.tint5};
    font-family: arial;
    color: ${({theme}) => theme.primary};
    width: 100vw;
    min-width: 100vw;
    font-size: ${props => props.theme.fontSizeM};
    overflow-y: visible;
    height: 100vh;
    z-index: 5;
    margin-left: ${({$visible}) => ($visible ? '0' : '-100vw')};
    transition: margin-left 0.2s;
    .simplebar-track > .simplebar-scrollbar:before {
        background-color: ${({theme}) => theme.tint3};
    }
    .simplebar-content-wrapper,
    .simplebar-content {
        width: 100%;
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        justify-content: flex-start;
    }
    @media (min-width: ${({theme}) => theme.tableMobileWidth}px) {
        width: 320px;
        min-width: 320px;
        margin-left: ${({$visible}) => ($visible ? '0' : '-320px')};
    }
`;

const StyledVanillaLogoContainer = styled.div`
    margin: 60px auto;
`;

const StyledVanillaLogo = styled.img`
    width: auto;
    height: 60px;
    max-width: 280px;
    align-self: center;
`;

const DashboardSidebarItems = styled.section`
    width: calc(100% - 40px);
    padding: 20px;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    align-content: center;
    justify-content: center;
    margin-right: 30px;
    @media (min-width: ${({theme}) => theme.tableMobileWidth}px) {
        align-items: flex-start;
        margin-right: 0;
    }
`;

const ClosingIcon = styled(Icon)`
    position: relative;
    top: 25px;
    left: 125px;
    z-index: 4;
    path {
        fill: ${({theme}) => theme.primary};
    }
    &:hover {
        cursor: pointer;
    }
`;

/**
 * Sidebar designed to fit the Vanilla dashboard
 */
const DashboardSidebar = ({children, toggleShowSidebar, showSidebar}) => {
    return (
        <Sidebar role="navigation" $visible={showSidebar} $expanded={showSidebar} data-simplebar>
            <ClosingIcon height="17" width="17" name="close" onClick={toggleShowSidebar} />
            <StyledVanillaLogoContainer>
                <StyledVanillaLogo $expanded={true} src={VanillaLogo} alt="Cooley Vanilla logo" />
            </StyledVanillaLogoContainer>
            <DashboardSidebarItems>{children}</DashboardSidebarItems>
        </Sidebar>
    );
};

DashboardSidebar.propTypes = {
    /* Child elements or components */
    children: PropTypes.node,
    /* Boolean to show or hide sidebar */
    showSidebar: PropTypes.bool,
    /* Function that toggles sidebar show state */
    toggleShowSidebar: PropTypes.func,
};

DashboardSidebar.defaultProps = {
    children: null,
    showSidebar: false,
    toggleShowSidebar: () => null,
};

export default DashboardSidebar;
