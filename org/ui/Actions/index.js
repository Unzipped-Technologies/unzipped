import React, {useState} from 'react';
import {useInView} from 'react-intersection-observer';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Icon from 'components/ui/Icon';
import OutsideAlerter from 'components/ui/OutsideAlerter';

const ActionsContainer = styled.div`
    position: relative;
    display: inline-block;
`;

const ActionsItems = styled.div`
    width: auto;
    background: #fff;
    border: 2px solid ${props => props.theme.border};
    box-sizing: border-box;
    border-radius: 4px;
    padding: 15px 15px 0 15px;
    font-family: arial;
    display: flex;
    flex-direction: column;
    position: absolute;
    z-index: 10000;
    left: 75%;
    @media (max-width: ${props => props.theme.phoneWidth}px) {
        left: -100%;
    }
    visibility: ${props => (props.$hide ? 'hidden' : 'visible')};
    transform: translateX(-75%) translateY(${props => (props.$top ? '-100%' : '0')});
    top: ${props => (props.$top ? '-9px' : '33px')};
    & * {
        margin-bottom: 20px;
    }
    &:after,
    &:before {
        ${props => (props.$top ? 'top' : 'bottom')}: 100%;
        left: calc(75% - 5px);
        @media (max-width: ${props => props.theme.phoneWidth}px) {
            left: calc(90% - 5px);
        }
        border: solid transparent;
        content: '';
        height: 0;
        width: 0;
        position: absolute;
        pointer-events: none;
        transform: scaleY(${props => (props.$top ? '-100%' : 'none')});
    }
    &:after {
        border-color: rgba(136, 183, 213, 0);
        border-bottom-color: #fff;
        border-width: 10px;
        margin-left: -10px;
    }
    &:before {
        border-color: rgba(194, 225, 245, 0);
        border-bottom-color: ${props => props.theme.border};
        border-width: 13px;
        margin-left: -13px;
    }
`;

const MenuIcon = styled(Icon)`
    height: 25px;
    cursor: ${props => (props.$disabled ? 'default' : 'pointer')};
    display: inline-block;
    path {
        fill: ${props => (props.$color ? props.theme[props.$color] : props.theme.textSecondary)};
    }
`;

/**
 * Actions list Component. It will automatically roll up any children if more than one given into a dropdown.
 */
const Actions = ({children, className, color, forceMenu, disabled}) => {
    const [isVisible, setVisible] = useState(false);
    const onMenuClick = () => !disabled && setVisible(!isVisible);
    const onClickOutside = () => setVisible(false);
    const isMenu = forceMenu || React.Children.toArray(children).length > 1;

    const ActionsMenu = () => {
        const [isMenuTop, setIsMenuTop] = useState(false);
        const {ref, inView, entry} = useInView({
            threshold: 1,
        });

        if (isMenuTop && !inView && entry !== undefined && entry.boundingClientRect.top < 0) {
            setIsMenuTop(false);
        } else if (
            !inView &&
            !isMenuTop &&
            entry !== undefined &&
            entry.boundingClientRect.bottom > window.innerHeight
        ) {
            setIsMenuTop(true);
        }

        return (
            <ActionsItems $hide={!entry} $top={isMenuTop} ref={ref} onClick={onMenuClick}>
                {children}
            </ActionsItems>
        );
    };

    return (
        <OutsideAlerter onClickOutside={onClickOutside}>
            <ActionsContainer className={className}>
                {isMenu && (
                    <MenuIcon
                        $color={color}
                        $disabled={disabled}
                        role="button"
                        name="dotmenu"
                        data-testid="actions-menu"
                        onClick={onMenuClick}
                    />
                )}
                {isMenu && isVisible && <ActionsMenu />}
                {!isMenu && <>{children}</>}
            </ActionsContainer>
        </OutsideAlerter>
    );
};

Actions.propTypes = {
    /** Children actions */
    children: PropTypes.node,
    /** Custom color for the menu button */
    color: PropTypes.string,
    /** Boolean to disable the menu button */
    disabled: PropTypes.bool,
};

Actions.defaultProps = {
    children: null,
    color: null,
    disabled: false,
};

export default Actions;
