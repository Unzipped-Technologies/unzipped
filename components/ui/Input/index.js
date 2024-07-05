import React, { useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import theme from '../theme'
import FormError from '../FormError'
import CurrencyInput from 'react-currency-input-field'

const ControlContainer = styled.div`
  position: relative;
  display: ${props => (props.display ? props.display : 'inline-block')};
  height: ${props => (props.height ? props.height : 'auto')} !important;
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

  @media (max-width: 850px) and (min-width: 680px) {
    width: 87%;
  }

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
    background-color: ${props.disabled ? 'transparent' : theme.tint5};
    border-radius: ${props.borderRadius ? props.borderRadius : '4px'};   
  height: ${({ height }) => (height ? height : '100%')};
    padding-left: ${({ message }) => (message ? '45px' : '10px')} !important;
    -webkit-transition: border-color 0.15s;
    border: ${
      props.disableBorder
        ? 'none'
        : props.isFocused
        ? '1px solid black !important'
        : props.border
        ? props.border
        : '1px solid #CED4DA !important'
    };

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
    font-size: ${props.mobile ? '16px' : props.fontSize ? props.fontSize : props.theme.baseFontSize};
    padding: ${props.mobile ? '0px 8px !important' : '0px 12px !important'};
    font-family: arial;
    box-sizing: border-box;
    line-height: normal;
    &::placeholder {
        color: #757575;
        font-size: ${props.mobile ? '16px' : props.fontSize ? props.fontSize : props.theme.baseFontSize};
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
  height: ${({ height }) => (height ? height : '100%')};
  &:hover {
    border-bottom: none !important;
  }
  &:focus {
    box-shadow: 0 0 0 0 #ffffff !important;
  }
  &[type='number']::-webkit-inner-spin-button,
  &[type='number']::-webkit-outer-spin-button {
    opacity: 1;
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
  margin: ${props => (props.mobile ? '5px 4px 0px 0px' : '8px 5px 0px 0px')};
  resize: vertical;
`

/**
 * Form Input Component.
 */
const Input = ({
  type = 'text',
  disabled = false,
  accepted = null,
  error = null,
  textarea = null,
  autosize = null,
  currency = null,
  width = null,
  borderRadius = null,
  height = 'auto',
  mobile,
  children,
  message,
  border,
  fontSize = '',
  borderColor = '',
  onFocus,
  display,
  placeholder,
  disableBorder,
  id,
  name,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false)

  const Control = textarea ? InputControlArea : currency ? CurrencyControl : InputControl

  return (
    <ControlContainer
      textarea={textarea}
      height={height}
      autosize={autosize}
      width={width}
      mobile={mobile}
      placeholder={placeholder}
      display={display}>
      <InputContainer
        disabled={disabled}
        border={border}
        disableBorder={disableBorder}
        borderRadius={borderRadius}
        message={message}
        isFocused={isFocused}
        height={height}
        display={display}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}>
        <Control
          rows="6"
          placeholder={placeholder}
          data-testid={id ?? name}
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
  /** string to override the border radius*/
  borderRadius: PropTypes.string,
  /** string to override the height*/
  height: PropTypes.string,
  /** boolean to override the border*/
  disableBorder: PropTypes.bool,
  /** boolean to override the display*/
  display: PropTypes.string
}

export default Input
