import React, {useContext, useEffect, useMemo} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Icon from 'components/ui/Icon';
import {SidebarContext} from '../Sidebar';
import {SideContext} from '../SideContent';

const LinkContainer = styled(Link)`
    background: ${props => (props.$current ? props.theme.primaryBack : 'transparent')};
    margin-right: ${props => (props.$current ? '0' : '20px')};
    color: ${props => (props.$current || props.$footer ? '#fff' : props.theme.accent4)} !important;
    box-sizing: border-box;
    display: ${props => (props.hidden ? 'none' : 'flex')};
    flex-grow: 1;
    width: auto;
    text-decoration: none;
    padding: ${({$noPadding}) => ($noPadding ? '0 0' : '15px 20px')};
    &:hover {
        background: ${props => props.theme.primaryHover};
        color: #fff;
        svg {
            path {
                fill: ${props => (props.$alert ? props.theme.important : '#fff')};
                stroke: #fff;
            }
        }
    }
`;

const NavItemContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    color: ${props => (props.$current || props.$footer ? '#fff' : props.theme.accent4)} !important;
    border-radius: 4px;
    font-family: arial;
    white-space: nowrap;
`;

const AContainer = styled(LinkContainer).attrs({as: 'a'})`
    cursor: pointer;
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
    visibility: ${props => (props.$forceVisible ? 'visible' : 'inherit')};
    position: ${props => (props.$forceVisible ? 'absolute' : 'inherit')};
    top: ${props => (props.$forceVisible ? '0' : 'initial')};
    left: ${props => (props.$forceVisible ? '40px' : 'initial')};
`;

const CurrentIndicator = styled.div`
    width: 8px;
    align-items: center;
    border-radius: 4px 0px 0px 4px;
    background: #fff;
    padding: 20px 0px;
`;

const ChildContainer = styled.div`
    display: ${({$condensed, $hasIcon}) => ($condensed && $hasIcon ? 'none' : 'inline-block')};
`;

const NavigationIcon = styled.div`
    display: inline-block;
    margin-right: 12px;
    width: 30px;
    text-align: center;
    svg {
        path {
            fill: ${props => {
                if (props.$alert) {
                    return props.theme.important;
                }
                return props.$current || props.$footer ? '#fff' : props.theme.accent4;
            }};
            stroke: ${props => {
                if (props.$alert) {
                    return props.theme.important;
                }
                return props.$current || props.$footer ? '#fff' : props.theme.accent4;
            }};
        }
    }
`;

const NavItem = ({current, icon, footer, expanded, children, alert}) => (
    <NavItemContainer $current={current}>
        {icon && (
            <NavigationIcon $footer={footer} $current={current} $alert={alert}>
                <Icon name={icon} />
            </NavigationIcon>
        )}
        <ChildContainer $condensed={!expanded} $hasIcon={!!icon}>
            {children}
        </ChildContainer>
    </NavItemContainer>
);

/**
 * Sidebar Navigation Item Component.
 */
const SidebarNavItem = ({current, icon, children, footer, onClick, noPadding, hidden = false, alert, ...rest}) => {
    const {expanded} = useContext(SidebarContext);
    const {mobileView, mobileOpen, onForward, onClose, hasSubSidebar, setCurrentItem} = useContext(SideContext);
    const NavigationItemContainer = rest.to ? LinkContainer : AContainer;
    const onClickItem = e => {
        if (mobileView && hasSubSidebar && current) {
            onForward();
            e.stopPropagation();
        } else if (onClick) {
            onClose();
            onClick(e);
        }
    };

    const item = useMemo(
        () => (
            <NavItem current={current} footer={footer} icon={icon} expanded={expanded} alert={alert}>
                {children}
            </NavItem>
        ),
        [current, footer, icon, expanded, alert, children],
    );

    useEffect(() => {
        if (current && !mobileOpen && setCurrentItem) {
            setCurrentItem(item);
        }
    }, [current, item, setCurrentItem, mobileOpen]);

    return (
        <Wrapper>
            <NavigationItemContainer
                onClick={onClickItem}
                $current={current}
                $noPadding={noPadding}
                $alert={alert}
                hidden={hidden}
                {...rest}>
                {item}
            </NavigationItemContainer>
            {current && !hidden && <CurrentIndicator />}
        </Wrapper>
    );
};

SidebarNavItem.propTypes = {
    /** Is this the current navigated to item */
    current: PropTypes.bool,
    /** Children the component contains */
    children: PropTypes.node,
    /** Item icon */
    icon: PropTypes.node,
    /** Path to navigate - this will create a Link */
    to: PropTypes.string,
    /** Href of link - this will create an anchor */
    href: PropTypes.string,
    /** item is in the footer, has a diff. look */
    footer: PropTypes.bool,
    /** item will be hidden from view */
    hidden: PropTypes.bool,
    /** Disable item padding */
    noPadding: PropTypes.bool,
};

SidebarNavItem.defaultProps = {
    current: false,
    children: null,
    icon: null,
    href: null,
    to: null,
    footer: false,
    noPadding: false,
};

export default SidebarNavItem;
