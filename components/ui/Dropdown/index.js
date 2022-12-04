import React, {useRef, useEffect, useState} from 'react';
import 'simplebar';
import styled from 'styled-components';
import Link from 'next/link';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
    display: flex;
    flex-direction: ${props => (props.sidebar ? 'column' : 'row')};
    justify-content: ${props => (props.sidebar ? 'center' : 'flex-end')};
    visibility: ${({visible}) => (visible ? 'visible' : 'hidden')};
`;

const DropdownOutline = styled.div`
    height: ${({$height}) => ($height ? $height : 'auto')};
    display: flex;
    position: ${({btnDropdown}) => (btnDropdown ? 'absolute' : 'fixed')};
    z-index: 9999;
    bottom: ${props => (props.sidebar && !props.dashboard ? '20px' : null)};
    border: 2px solid ${props => props.theme.border};
    box-sizing: border-box;
    border-radius: 4px;
    @media (max-width: ${props => props.theme.phoneWidth}px) {
        margin-left: ${props => (props.sidebar && !props.dashboard ? '-80px' : '0')};
    }
    ${props =>
        props.btnDropdown &&
        `
        right: -3px;
        top: 42px;
        text-align: left;`};
`;
DropdownOutline.displayName = 'DropdownOutline';

const DropdownList = styled.ul`
    margin: 0;
    min-width: 200px;
    width: ${({width}) => width};
    background: #fff;
    padding: 15px 15px 0 15px;
    font-family: arial;
    @media (max-width: ${props => props.theme.phoneWidth}px) {
        min-width: ${props => (props.sidebar ? '160px' : '200px')};
    }
`;
DropdownList.displayName = 'DropdownList';

const LinkWrapper = styled.li`
    text-transform: uppercase;
    padding-bottom: 15px;
    list-style-type: none;
    overflow-wrap: anywhere;
`;

const LinkContainer = styled(Link)`
    color: ${props => props.theme.primary};
    text-decoration: none;
    font-size: ${props => props.theme.fontSizeXS};
    font-weight: bold;
    letter-spacing: 0.031rem;
`;

const DivContainer = styled(LinkContainer).attrs({as: 'div'})`
    cursor: pointer;
    white-space: ${({width}) => (width === 'unset' ? 'nowrap' : 'pre-line')};
`;

const SimpleBar = styled.div`
    .simplebar-wrapper {
        height: unset;
        width: ${({$width}) => ($width ? $width : '200px')};
    }
    .simplebar-track > .simplebar-scrollbar:before {
        background-color: ${props => props.theme.tint2};
    }
    .simplebar-track[style] {
        background-color: transparent !important;
    }
`;
SimpleBar.displayName = 'SimpleBar';

const DropdownItems = ({links, width}) => {
    return (
        <>
            {links.map((item, index) => {
                const ItemContainer = item.onClick ? DivContainer : LinkContainer;
                return (
                    <LinkWrapper key={item.text + index}>
                        <ItemContainer to={item.to} onClick={item.onClick} width={width}>
                            {item.text}
                        </ItemContainer>
                    </LinkWrapper>
                );
            })}
        </>
    );
};
DropdownItems.displayName = 'DropdownItems';

/**
 * Dropdown Component.
 */
const Dropdown = ({visible, links, dashboard, sidebar, btnDropdown, width, className}) => {
    const first10Ref = useRef();
    const [first10Height, setFirst10Height] = useState(0);
    const first10Items = links.filter((_, index) => index < 10);
    const itemsAfter10 = links.filter((_, index) => index >= 10);

    useEffect(() => {
        if (!visible) {
            return;
        }
        const paddingAndBordersHeight = 19;
        const height = first10Ref.current.clientHeight + paddingAndBordersHeight;
        setFirst10Height(height);
    }, [links, visible]);

    return (
        <Wrapper sidebar={sidebar} className={className} visible={visible}>
            <DropdownOutline
                $height={first10Height ? `${first10Height}px` : '0px'}
                sidebar={sidebar}
                dashboard={dashboard}
                btnDropdown={btnDropdown}
                data-testid="dropdown">
                <SimpleBar data-simplebar $width={width}>
                    <DropdownList width={width} sidebar={sidebar}>
                        <div ref={first10Ref}>
                            <DropdownItems links={first10Items} width={width} />
                        </div>
                        <DropdownItems links={itemsAfter10} width={width} />
                    </DropdownList>
                </SimpleBar>
            </DropdownOutline>
        </Wrapper>
    );
};

Dropdown.propTypes = {
    /** Is the dropdown visible */
    visible: PropTypes.bool,
    /** List of objects for links, in form: [{text: 'link text', to: 'url'}, ...] */
    links: PropTypes.array,
    /** Is the component in the sidebar */
    sidebar: PropTypes.bool,
    /** Is the component in the dashboard sidebar */
    dashboard: PropTypes.bool,
    /** To set button dropdown styling */
    btnDropdown: PropTypes.bool,
    /** Additional classNames  */
    className: PropTypes.string,
    /** Width of popout, with a minimum of 200px */
    width: PropTypes.string,
};

Dropdown.defaultProps = {
    visible: false,
    links: [],
    sidebar: false,
    dashboard: false,
    btnDropdown: false,
    width: '200px',
};

export default Dropdown;
