import React from 'react';
import styled from 'styled-components';
import Text from '../Text';
import PropTypes from 'prop-types';
import {HelpIcon} from '..';
import theme from '../theme';
import {
    TitleText,
} from '../../unzipped/dashboard/style'

/**
 * Toggle Component.
 */

const calculateColor = ({toggled, disabled}) => {
    if (disabled) {
        return toggled ? theme.secondaryLight : theme.tint3;
    }
    return toggled ? theme.secondary : theme.tint2;
};

const ToggleDiv = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 30px;
    justify-content: space-between;
    width: 90%;
    @media(max-width: 1516px) {
        width: 98%;
    }
`;

const ToggleText = styled(Text)`
    color: ${props => (props.disabled ? props.theme.tint2 : '')};
    font-size: 13px;
    margin: 0px;
`;

const ToggleContainer = styled.div`
    position: relative;
    width: 60px;
    height: 30px;
    border-radius: 19px;
    border: 2px solid ${props => calculateColor(props)};
    &:hover {
        cursor: ${({disabled}) => (disabled ? 'not-allowed' : 'pointer')};
    }
`;

const TextContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
    margin: 0px;
`;

const StyledIcon = styled(HelpIcon)`
    margin-left: 10px;
    margin-top: 5px;
`;
const Notch = styled.div`
    position: absolute;
    left: ${props => (props.toggled ? `32px` : `2px`)};
    top: 2px;
    border-radius: 50px;
    background-color: ${props => calculateColor(props)};
    width: 22px;
    height: 22px;
    transition: left 0.3s linear;
    &:hover {
        cursor: ${({disabled}) => (disabled ? 'not-allowed' : 'pointer')};
    }
`;

const Toggle = ({toggled, isToggled, sideText, help, helpText, title, className = '', disabled, handleSetToggle}) => {
    const handleToggle = () => {
        handleSetToggle(!toggled)
        if (disabled) {
            return;
        }
        isToggled();
    };

    return (
        <ToggleDiv className={className}>
            <TextContainer>
                {title && <TitleText noMargin>{title}</TitleText>}
                <ToggleText level={2} disabled={disabled}>
                    {sideText}
                </ToggleText>
                {help && <StyledIcon text={helpText} />}
            </TextContainer>
            <ToggleContainer role="button" toggled={toggled} onClick={handleToggle} disabled={disabled}>
                <Notch role="button" toggled={toggled} disabled={disabled}></Notch>
            </ToggleContainer>

        </ToggleDiv>
    );
};

Toggle.propTypes = {
    /** Controls if the toggle switches styles */
    toggled: PropTypes.bool,
    /** Function to control true or false */
    isToggled: PropTypes.func,
    /** adds text to the side of the toggle */
    sideText: PropTypes.string,
    /** adds help icon to side of toggle */
    help: PropTypes.bool,
    /** adds text to help icon */
    helpText: PropTypes.string,
    /** Additional classNames  */
    className: PropTypes.string,
    /** Disable the toggle */
    disabled: PropTypes.bool,
};

Toggle.defaultProps = {
    toggled: false,
    isToggled: () => {},
    sideText: 'Enable Notifications',
    disabled: false,
};

export default Toggle;
