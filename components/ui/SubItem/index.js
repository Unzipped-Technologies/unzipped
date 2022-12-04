import React, {useEffect, useMemo} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Icon from '../Icon';

const LinkContainer = styled(Link)`
    background: ${props => (props.$current ? props.theme.accent1 : 'transparent')};
    margin-right: ${props => (props.$current ? '0' : '18px')};
    box-sizing: border-box;
    width: auto;
    padding: 10px 20px;
    font-size: ${props => props.theme.fontSizeM};
    color: #fff;
    flex-grow: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    text-decoration: none;
    &:hover {
        background: transparent;
    }
    @media (min-width: 420px) {
        &:hover {
            background: ${props => props.theme.primaryBackHover};
        }
    }
`;

const NavItemContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    color: #fff;
    border-radius: 4px;
    font-family: arial;
    font-weight: normal;
`;

const DivContainer = styled(LinkContainer).attrs({as: 'div'})`
    cursor: pointer;
`;

const Wrapper = styled.div`
    display: ${props => (props.hidden ? 'none' : 'flex')};
    flex-direction: row;
    gap: 10px;
`;

const CurrentIndicator = styled.div`
    width: 8px;
    border-radius: 4px 0px 0px 4px;
    background: #fff;
    padding: 20px 0px;
`;

const NavigationIcon = styled(Icon)`
    display: inline-block;
    margin-right: 10px;
`;

const ChildContainer = styled.div`
    display: inline-block;
`;

const NavSubItem = ({current, icon, children}) => (
    <NavItemContainer $current={current}>
        {icon && <NavigationIcon name={icon} />}
        <ChildContainer>{children}</ChildContainer>
    </NavItemContainer>
);

/**
 * Sub Navigation Item Component. Consumes SideContext.
 */
const SubItem = ({to, bannerShown, onClick, current, children, alert, done, hidden}) => {
    let icon = null;
    if (alert || done) {
        icon = done ? 'alertDone' : 'alert';
    }
    const {mobileOpen, onClose, setCurrentItem} = React.useContext();
    const NavigationItemContainer = onClick ? DivContainer : LinkContainer;
    const onItemClick = e => {
        if (onClick) {
            onClose();
            onClick(e);
        }
    };

    const item = useMemo(
        () => (
            <NavSubItem current={current} icon={icon}>
                {children}
            </NavSubItem>
        ),
        [children, current, icon],
    );

    useEffect(() => {
        if (current && !mobileOpen && setCurrentItem) {
            setCurrentItem(item, true);
        }
    }, [current, item, setCurrentItem, mobileOpen]);

    return (
        <Wrapper hidden={hidden} $bannerShown={bannerShown}>
            <NavigationItemContainer to={to} role="link" $current={current} onClick={onItemClick}>
                {item}
            </NavigationItemContainer>
            {current && <CurrentIndicator />}
        </Wrapper>
    );
};

SubItem.propTypes = {
    /** Is this the current navigated to item */
    current: PropTypes.bool,
    /** Children the component contains */
    children: PropTypes.node,
    /** Path to navigate for a link */
    to: PropTypes.string,
    /** if an alert todo item */
    alert: PropTypes.bool,
    /** if a done item */
    done: PropTypes.bool,
    /** onClick even on this item. Will create item as a div, not Link */
    onClick: PropTypes.func,
    /** This item is hidden from the page */
    hidden: PropTypes.bool,
};

SubItem.defaultProps = {
    current: false,
    children: null,
    icon: null,
    alert: false,
    done: false,
    onClick: null,
    hidden: false,
};

export default SubItem;
