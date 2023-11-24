import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import theme from '../theme'
import FormError from '../FormError'
import CurrencyInput from 'react-currency-input-field'
import { set } from 'react-ga'

const ControlContainer = styled.div`
    position: relative;
    display: inline-block;
    height: ${props => (props.height ? props.height : 'auto')};
    min-width: ${props => {
        if (props.autosize) {
            return 'auto'
        } else if (props.width) {
            return 'none'
        } else {
            return '360px'
        }
    }};
    max-width: ${props => (props.autosize ? 'none' : '850px')};
    @media (max-width: ${props => props.theme.mobileWidth}px) {
        width: 100%;
        min-width: ${props => (props.autosize ? 'auto' : '280px')};
    }
    width: ${props => {
        if (props.textarea) {
            return '100%'
        } else if (props.width) {
            return props.width
        } else {
            return 'auto'
        }
    }};
`

const InputContainer = styled.div`
    ${props => inputContainerStyles(props)}
    padding-left: ${({ message }) => (message ? '45px' : '5px')} !important;
`

const inputContainerStyles = props => `
    background-color: ${props.disabled ? theme.tint4 : theme.tint5};
    border-radius: ${props.borderRadius ? props.borderRadius : '4px'};   
    height: 100%;
    padding-left: ${({ message }) => (message ? '45px' : '10px')} !important;
    -webkit-transition: border-color 0.15s;
    border: ${props.isFocused ? '2px solid black !important' : '2px solid #CED4DA !important'};
`

const inputStyles = props => `
    background-color: inherit;
    width: -moz-available !important;          /* WebKit-based browsers will ignore this. */
    width: -webkit-fill-available !important;  /* Mozilla-based browsers will ignore this. */
    width: fill-available !important;
    border: none;
    outline: none;
    color: ${props.disabled ? props.theme.tint2 : props.theme.textSecondary};
    font-weight: 400;
    font-size: ${props.fontSize ? props.fontSize : props.theme.baseFontSize};
    padding: ${props.mobile?'0px 2px !important':'0px 12px !important'};
    font-family: arial;
    box-sizing: border-box;
    line-height: normal;
    &::placeholder {
        color: #757575;
        font-size: ${props.fontSize ? props.fontSize : props.theme.baseFontSize};
    }
    &:focus {
        border: none !important; // Overriding global css
        outline: none !important;
    }
    :disabled {
        cursor: not-allowed;
    }
`

const InputControl = styled.input`
    ${props => inputStyles(props)}
    border-bottom: none !important;
    margin-bottom: 0px !important;
    height: 100%;
    &:hover {
        border-bottom: none !important;
    }
    &:focus {
        box-shadow: 0 0 0 0 #ffffff !important;
    }
`

const CurrencyControl = styled(CurrencyInput).attrs({
    prefix: '$',
    allowNegativeValue: false
})`
    ${props => inputStyles(props)}
`

const Bullet = styled.div`
    color: ${props => props.border};
    font-size: ${props => props.theme.fontSizeL};
    display: inline-block;
    align-items: center;
    padding-right: 18px;
    display: flex;
`

const InputControlArea = styled(InputControl).attrs({ as: 'textarea' })`
    margin: ${props=>props.mobile?'5px 4px 0px 0px' : '8px 5px 0px 0px'};
    resize: vertical;
    height: 120px;
`

/**
 * Form Input Component.
 */
const Input = ({
    mobile,
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
    onFocus,
    handleInput,
    isFocused,
    borderRadius,
    ...rest
}) => {
    const Control = textarea ? InputControlArea : currency ? CurrencyControl : InputControl
    let border = borderColor ? theme[borderColor] : theme.tint3
    if (error) {
        border = theme.error
    } else if (accepted) {
        border = theme.primary
    }

    const handleFocus = value => {
        if (handleInput) {
            handleInput(value)
        }
    }
    return (
        <ControlContainer textarea={textarea} height={height} autosize={autosize} width={width} mobile={mobile}>
            <InputContainer
                disabled={disabled}
                border={border}
                borderRadius={borderRadius}
                message={message}
                isFocused={isFocused}
                height={height}
                onFocus={() => handleFocus(true)}
                onBlur={() => handleFocus(false)}>
                <Control
                    mobile={mobile}
                    height={height}
                    fontSize={fontSize}
                    type={type}
                    accepted={accepted}
                    disabled={disabled}
                    {...rest}
                />
                {accepted && <Bullet border={border}>&bull;</Bullet>}
            </InputContainer>
            {error && <FormError>{error}</FormError>}
            {children}
        </ControlContainer>
    )
}

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
    /** if Focused*/
    isFocused: PropTypes.bool,
    /** string to override the border radius*/
    borderRadius: PropTypes.string,
    /** string to override the height*/
    height: PropTypes.string
}

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
    isFocused: false,
    borderRadius: null,
    height: 'auto'
}

export default Input
