import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import theme from '../theme';
import FormError from '../FormError';
import CurrencyInput from 'react-currency-input-field';

const ControlContainer = styled.div`
    position: relative;
    display: inline-block;
    height: ${props => (props ? props.height : 'auto')};
    min-width: ${props => {
        if (props.autosize) {
            return 'auto';
        } else if (props.width) {
            return 'none';
        } else {
            return '360px';
        }
    }};
    max-width: ${props => (props.autosize ? 'none' : '800px')};
    @media (max-width: ${props => props.theme.mobileWidth}px) {
        width: 100%;
        min-width: ${props => (props.autosize ? 'auto' : '280px')};
    }
    width: ${props => {
        if (props.textarea) {
            return '95%';
        } else if (props.width) {
            return props.width;
        } else {
            return 'auto';
        }
    }};
`;

const InputContainer = styled.div`
    ${props => inputContainerStyles(props)}
    padding-left: ${({message}) => message ? '45px' : '5px'} !important;
`;

const inputContainerStyles = props => `
    background-color: ${props.disabled ? theme.tint4 : theme.tint5};
    border-radius: 4px;
    border: 2px solid ${props.border};
    height: 100%;
    padding-left: ${({message}) => message ? '45px' : '10px'} !important;
`;

const inputStyles = props => `
    background-color: inherit;
    width: 100%;
    border: none;
    outline: none;
    color: ${props.disabled ? props.theme.tint2 : props.theme.textSecondary};
    font-weight: 400;
    font-size: ${props.fontSize ? props.fontSize : props.theme.baseFontSize};
    padding: 14px 20px;
    font-family: arial;
    box-sizing: border-box;
    line-height: normal;
    &::placeholder {
        color: ${props.theme.tint2};
    }
    &:focus {
        border: none !important; // Overriding global css
        outline: none !important;
    }
    :disabled {
        cursor: not-allowed;
    }
`;

const InputControl = styled.input`
    ${props => inputStyles(props)}
    border-bottom: none !important;
    margin-bottom: 0px  !important;
    height: 100%;
    &:hover {
        border-bottom: none !important;
    }
`;

const CurrencyControl = styled(CurrencyInput).attrs({
    prefix: '$',
    allowNegativeValue: false,
})`
    ${props => inputStyles(props)}
`;

const Bullet = styled.div`
    color: ${props => props.border};
    font-size: ${props => props.theme.fontSizeL};
    display: inline-block;
    align-items: center;
    padding-right: 18px;
    display: flex;
`;

const InputControlArea = styled(InputControl).attrs({as: 'textarea'})``;

/**
 * Form Input Component.
 */
const Input = ({
    disabled,
    type,
    accepted,
    error,
    textarea,
    height,
    autosize,
    children,
    currency,
    message,
    width,
    fontSize = '',
    borderColor = '',
    ...rest
}) => {
    const Control = textarea ? InputControlArea : currency ? CurrencyControl : InputControl;
    let border = borderColor ? theme[borderColor] : theme.tint3;
    if (error) {
        border = theme.error;
    } else if (accepted) {
        border = theme.primary;
    }
    return (
        <ControlContainer textarea={textarea} height={height} autosize={autosize} width={width}>
            <InputContainer disabled={disabled} border={border} message={message}>
                <Control fontSize={fontSize} type={type} accepted={accepted} disabled={disabled} {...rest} />
                {accepted && <Bullet border={border}>&bull;</Bullet>}
            </InputContainer>
            {error && <FormError>{error}</FormError>}
            {children}
        </ControlContainer>
    );
};

Input.propTypes = {
    /** Input type. Default is text. */
    type: PropTypes.string,
    /** If input should not be accepted has been disabled */
    disabled: PropTypes.bool,
    /** If the value has been accepted */
    accepted: PropTypes.bool,
    /** If there is an error */
    error: PropTypes.string,
    /** Render this input as a text area */
    textarea: PropTypes.bool,
    /** Render this input without size constraints */
    autosize: PropTypes.bool,
    /** Render this input with currency formatting */
    currency: PropTypes.bool,
    /** Height of Control */
    height: PropTypes.string,
    /** Width of Control */
    width: PropTypes.string,
    /** String to override the base font size */
    fontSize: PropTypes.string,
    /** String to override the border color */
    borderColor: PropTypes.string,
};

Input.defaultProps = {
    type: 'text',
    disabled: false,
    accepted: null,
    error: null,
    textarea: null,
    autosize: null,
    currency: null,
    height: null,
    width: null,
};

export default Input;
