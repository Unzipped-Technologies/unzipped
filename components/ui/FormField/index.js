import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import Select from '../Select'
import Radio from '../Radio'
import Checkbox from '../Checkbox'
import Input from '../Input'
import Image from '../Image'
import SimpleBar from 'simplebar-react'
import PhoneNumberInput from '../PhoneNumberInput'
import PropTypes from 'prop-types'
import FormLabel from '../FormLabel'
import { TitleText, DarkText, Absolute, WhiteCard, Underline, Grid2 } from '../../unzipped/dashboard/style'

const types = {
  radio: Radio,
  checkbox: Checkbox,
  input: Input,
  phoneNumberInput: PhoneNumberInput,
  select: Select
}

const FormFieldContainer = styled.div`
  vertical-align: top;
  width: ${({width}) => width ? width : '100%'};
  justify-self: ${({justifySelf}) => justifySelf ? justifySelf : 'auto'};
  height: 100%;
  z-index: ${({ zIndex }) => (zIndex ? '1000' : '10')};
  color: ${props => props.theme.textSecondary};
  font-weight: 400;
  font-size: ${props => (props.fontSize ? props.fontSize : props.theme.baseFontSize)};
  line-height: ${props => props.theme.baseLineHeight};
  font-family: arial;
  display: ${props => (props.$inline ? 'inline-block' : 'block')};
  max-width: ${props => props.maxWidth};
  margin: ${({ margin }) => (margin ? margin : 'unset')};
  padding-bottom: ${({ $bottom }) => $bottom};
  borderradius: ${props => (props.borderRadius ? props.borderRadius : '0px')};
  position: relative;
  ::placeholder {
    font-size: ${props => (props.fontSize ? props.fontSize : props.theme.baseFontSize)};
    color: ${props => props.theme.textSecondary};
  }

  & > label:first-of-type {
    // Override menlo styling here, line 659
    // src/pages/Dashboard/index.scss
    // label { margin-bottom: 0 !important; }
    margin-bottom: ${({ noMargin }) => (noMargin ? '0px' : '14px !important')};
  }
  & > label {
    width: 100%;
  }
`

const Item = styled.div`
  display: flex;
  position: relative;
  flex-flow: row;
  align-items: center;
  width: 100%;
  max-width: ${props => props.maxWidth};
  justify-content: space-between;
  &:hover {
    color: blue;
  }
`

const Scroll = styled(SimpleBar)`
  width: 100%;
  z-index: 1;
  height: 300px;
  overflow: hidden auto;
  .simplebar-track > .simplebar-scrollbar:before {
    background-color: ${props => props.theme.tint2};
    opacity: 0.1;
  }
  .simplebar-track > .simplebar-scrollbar.simplebar-visible:before {
    opacity: 0.3;
  }
  .simplebar-track[style] {
    background-color: transparent !important;
  }
  .simplebar-placeholder {
    width: auto !important;
    height: 1px !important;
  }
`

/**
 * Form Field Component. Handles the presentation of an entire form field, including label and the control. Holds error state of the field.
 */
const FormField = ({
  className,
  fieldType,
  required,
  inline,
  error,
  children,
  name,
  help,
  bottom,
  requiredError,
  validate,
  disabled,
  onBlur,
  maxWidth,
  modalSelect,
  currency,
  onChange,
  onFocus,
  noMargin,
  dropdownList = [],
  margin,
  display,
  onUpdate,
  clickType,
  fontSize = '',
  handleEnterKey,
  handleInputFocusChange,
  isFocused,
  borderRadius,
  height,
  ...rest
}) => {
  const Control = types[fieldType]
  const [currentError, setCurrentError] = useState(error)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [isClicked, setIsClicked] = useState(!!rest.value)
  const wrapperRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setDropdownOpen(false)
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [wrapperRef])
  const handleBlur = e => {
    const value = e?.label || e?.target?.value || e?.value || null
    if (required && (!value || !validate(value))) {
      setCurrentError(requiredError)
    } else {
      if (!value || !validate(value)) {
        setCurrentError(error)
      } else {
        setCurrentError(null)
      }
    }
    onBlur && onBlur(e)
  }
  if (disabled && currentError) {
    setCurrentError('')
  }
  const onInputChange = e => {
    const value = fieldType === 'select' ? e.value : e.target.value
    onChange && onChange(e)

    if (!required || (value && validate(value))) {
      setCurrentError(null)
    }
  }

  const updateInput = data => {
    onUpdate({
      [clickType]: data.FirstName ? `${data?.FirstName} ${data?.LastName || ''}` : data?.tagName ? data?.tagName : data
    })
    setDropdownOpen(false)
    setIsClicked(true)
  }

  const handleFocus = e => {
    setIsClicked(false)
    return onFocus && onFocus(e)
  }

  const handleInputFocus = value => {
    if (handleInputFocusChange) {
      handleInputFocusChange(value)
    }
  }

  const handleHeight = () => {
    if (height) {
      return height
    }else{
      return 'auto'
    }
  }

  const handleEnter = e => {
    if(handleEnterKey){
      handleEnterKey(e)
    }
  }

  useEffect(() => {
    setCurrentError(error)
  }, [error])

  useEffect(() => {
    if (!isClicked) {
      setDropdownOpen(dropdownList.length > 0)
    } else {
      setDropdownOpen(false)
    }
  }, [dropdownList])

  return (
    <FormFieldContainer
      zIndex={dropdownOpen}
      className={className}
      $inline={inline}
      noMargin={noMargin}
      margin={margin}
      $bottom={bottom}
      maxWidth={maxWidth}>
      {children && (
        <FormLabel forId={name} fontSize={fontSize} help={help} required={required}>
          {children}
        </FormLabel>
      )}
      <Control
        onBlur={handleBlur}
        error={currentError}
        name={name}
        id={name}
        onKeyDown={handleEnter}
        fontSize={fontSize}
        disabled={disabled}
        $modalSelect={modalSelect}
        currency={currency}
        onChange={fieldType === 'input' || fieldType === 'select' ? onInputChange : onChange}
        onFocus={handleFocus}
        borderRadius={borderRadius}
        handleInput={handleInputFocus}
        isFocused={isFocused}
        height={handleHeight}
        {...rest}
      />
      {dropdownList.length > 0 && dropdownOpen && (
        <Absolute smallLeft {...rest}>
          <WhiteCard
            height={50 * dropdownList.length < 300 ? 50 * dropdownList.length + 15 + 'px' : '300px'}
            padding="10px 10px"
            maxWidth={maxWidth}
            ref={wrapperRef}>
            <Scroll>
              {dropdownList.map((item, key) => (
                <Item key={key} onClick={() => setDropdownOpen(false)}>
                  {item?.profileImage && (
                    <Image src={item.profileImage} width="35px" height="32px" alt="profile pic" radius="50%" />
                  )}
                  <DarkText
                    half
                    hover
                    clickable
                    onClick={() => updateInput(item)}
                    paddingLeft
                    topPadding="10px"
                    value={`${item.FirstName} ${item.LastName}`}>
                    {item.FirstName || item?.tagName || item} {item.LastName}
                  </DarkText>
                </Item>
              ))}
            </Scroll>
          </WhiteCard>
        </Absolute>
      )}
    </FormFieldContainer>
  )
}

FormField.propTypes = {
  /** The type of field this is: select, radio, input, phoneNumberInput, checkbox, datetime */
  fieldType: PropTypes.string.isRequired,
  /** Show field as inline */
  inline: PropTypes.bool,
  /** Is this field required */
  required: PropTypes.bool,
  /** Children the component contains */
  children: PropTypes.node,
  /** If there is an error */
  error: PropTypes.string,
  /** The message to show for a required error */
  requiredError: PropTypes.string,
  /** Unique name for this field */
  name: PropTypes.string,
  /** Help tooltip text */
  help: PropTypes.string,
  /** Validate the input. Returns true if input is valid. */
  validate: PropTypes.func,
  /** Function to call on blur of Control */
  onBlur: PropTypes.func,
  /** Format input as currency */
  currency: PropTypes.bool,
  /** Bottom Padding */
  bottom: PropTypes.string,
  /** If the field is a select and will be used in a modal */
  modalSelect: PropTypes.bool,
  /** On change of the FormField */
  onChange: PropTypes.func,
  /** maxWidth for FormFieldContainer */
  maxWidth: PropTypes.string,
  /** Additional classNames, supports styled-components  */
  className: PropTypes.string,
  /** Function to call on blur of Control */
  onFocus: PropTypes.func,
  /** String to override the base font size */
  fontSize: PropTypes.string
}

FormField.defaultProps = {
  required: false,
  inline: false,
  children: null,
  error: null,
  requiredError: 'This field is required.',
  name: null,
  help: null,
  validate: () => true,
  onBlur: null,
  currency: false,
  bottom: '0px',
  modalSelect: false,
  onChange: () => {},
  maxWidth: 'none',
  onFocus: () => {},
}

export default FormField
