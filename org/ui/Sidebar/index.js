import React, {createContext, useState, useEffect} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import VanillaLogo from 'images/vanilla-wordmark-rgb-white.svg';
import VanillaLogoCollapsed from 'images/vanilla-v-mark.svg';
import {ReactComponent as ExpandSvg} from '../icons/expand.svg';
import {SideContext} from '../SideContent';
import {isSafari} from 'react-device-detect';
import 'simplebar';
import observeScrollbars from '../../../utils/scrollbar';

const SidebarContainer = styled.div`
    background: ${props => props.theme.primary};
    padding: 50px 0 20px 0;
    font-family: arial;
    color: #fff;
    width: ${props => (props.$expanded ? '320px' : '120px')};
    min-width: ${props => (props.$expanded ? '320px' : '120px')};
    display: flex;
    flex-direction: column;
    align-items: stretch;
    position: relative;
    font-size: ${props => props.theme.fontSizeM};
    overflow-y: visible;
    overflow-x: hidden;
    height: 100%;
    z-index: 3;
    margin-left: ${props => (props.$visible ? '0' : '-320px')};
    transition: margin-left 0.2s;
    .simplebar-offset {
        height: 100%;
    }
    .simplebar-track > .simplebar-scrollbar:before {
        background-color: ${props => props.theme.tint3};
        transition: none;
    }
    .simplebar-scrollbar.simplebar-visible:before {
        transition: none;
    }
    .simplebar-content-wrapper,
    .simplebar-content {
        display: flex;
    }
    .simplebar-content > div {
        display: flex;
        flex-flow: column;
        & > div {
            align-self: start;
        }
        & > nav {
            width: 100%;
            align-self: start;
        }
    }
`;

const SidebarContextContainer = styled.div`
    width: ${props => (props.$expanded ? '320px' : '120px')};
    min-width: ${props => (props.$expanded ? '320px' : '120px')};
    display: flex;
    flex-direction: column;
    height: 100%;
`;

const StyledVanillaLogoContainer = styled.div`
    height: 95px;
    max-height: 95px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${props => (props.$expanded ? '320px' : '120px')};
    flex-shrink: 0;
`;

const StyledVanillaLogo = styled.img`
    width: auto;
    height: ${props => (props.$expanded ? '100%' : '30%')};
    max-width: 280px;
    align-self: start;
    margin-top: ${props => (props.$expanded ? '0' : '-16px')};
`;

const ExpandIcon = styled(ExpandSvg)`
    display: ${props => (props.$hidden ? 'none' : 'block')};
    transform: ${props => (props.$expanded ? 'scaleX(-1)' : 'none')};
    cursor: pointer;
    position: fixed;
    left: ${props => (props.$expanded ? '305px' : '105px')};
    width: 30px;
    height: 30px;
    margin-top: 20px;
    filter: drop-shadow(3px 3px 5px rgba(0, 0, 0, 0.7));
`;
observeScrollbars();

const SidebarContext = createContext({expanded: true});

/**
 * Sidebar Component.
 */
const Sidebar = ({showBack, user, expanded, children, onChange}) => {
    const {showSidebar, mobileView, reducedView} = React.useContext(SideContext);
    const [isExpanded, setIsExpanded] = useState(mobileView || (!reducedView && expanded));
    useEffect(() => {
        setIsExpanded(mobileView || (!reducedView && expanded));
    }, [reducedView, expanded, mobileView]);

    const updateExpanded = () => {
        onChange && onChange(!isExpanded);
        setIsExpanded(!isExpanded);
    };

    //A workaround for simplebar causing issues in ios
    const simplebarAttr = isSafari ? {} : {'data-simplebar': 'data-simplebar'};

    return (
        <SidebarContainer
            $visible={showSidebar}
            role="navigation"
            $expanded={isExpanded}
            $showBack={showBack}
            {...simplebarAttr}>
            <SidebarContextContainer $expanded={isExpanded}>
                <SidebarContext.Provider value={{expanded: isExpanded}}>
                    <ExpandIcon $hidden={mobileView} $expanded={isExpanded} onClick={() => updateExpanded()}>
                        &lt;
                    </ExpandIcon>
                    <StyledVanillaLogoContainer $expanded={isExpanded}>
                        <StyledVanillaLogo
                            $expanded={isExpanded}
                            src={isExpanded ? VanillaLogo : VanillaLogoCollapsed}
                            alt="Cooley Vanilla logo"
                        />
                    </StyledVanillaLogoContainer>
                    {children}
                    {user}
                </SidebarContext.Provider>
            </SidebarContextContainer>
        </SidebarContainer>
    );
};

Sidebar.propTypes = {
    /** Sidebar children components */
    children: PropTypes.node,
    /** If to show back to dashboard link */
    showBack: PropTypes.bool,
    /* path for back button */
    backTo: PropTypes.string,
    /** User object to show */
    user: PropTypes.bool,
    /** If the sidebar is expanded */
    expanded: PropTypes.bool,
    /** run this function when isExpanded Changes */
    onChange: PropTypes.func,
};

Sidebar.defaultProps = {
    children: null,
    showBack: false,
    user: null,
    expanded: true,
    onChange: () => {},
};

export default Sidebar;
export {SidebarContext};
