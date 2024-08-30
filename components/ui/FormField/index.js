import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import Select from '../Select'
import SearchField from '../SearchField'
import Radio from '../Radio'
import Checkbox from '../Checkbox'
import Input from '../Input'
import Image from '../Image'
import SimpleBar from 'simplebar-react'
import PhoneNumberInput from '../PhoneNumberInput'
import PropTypes from 'prop-types'
import FormLabel from '../FormLabel'
import { DarkText, Absolute, WhiteCard } from '../../unzipped/dashboard/style'

const types = {
  radio: Radio,
  checkbox: Checkbox,
  input: Input,
  phoneNumberInput: PhoneNumberInput,
  select: Select,
  searchField: SearchField
}

const FormFieldContainer = styled.div`
  border: none !important;
  vertical-align: top;
  width: ${({ width }) => (width ? width : '100%')};
  height: ${({ height }) => (height ? height : '100%')};
  justify-self: ${({ justifySelf }) => (justifySelf ? justifySelf : 'auto')};
  z-index: ${({ zIndex, zIndexUnset }) => (zIndex ? zIndex : zIndexUnset ? '0' : 'auto')};
  color: ${props => props.theme.textSecondary};
  font-weight: 400;
  font-size: ${props => (props.fontSize ? props.fontSize : props.theme.baseFontSize)};
  line-height: ${props => props.theme.baseLineHeight};
  font-family: ${({ fontFamily }) => (fontFamily ? fontFamily : 'arial')};
  display: ${({ display }) => (display ? display : 'block')};
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
    margin-bottom: ${({ noMargin }) => (noMargin ? '0px' : '5px !important')};
    color: #333;
    font-size: ${({ fontSize }) => (fontSize ? fontSize : '12px')};
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
  mobile,
  zIndexUnset,
  zIndex,
  className,
  fieldType,
  inputType,
  id,
  width,
  required = false,
  inline = false,
  children = null,
  error = null,
  requiredError = 'This field is required.',
  name = null,
  help = null,
  validate = () => true,
  bottom = '0px',
  disabled,
  onBlur = null,
  maxWidth = 'none',
  modalSelect = false,
  currency = false,
  onChange = () => {},
  onFocus = () => {},
  dropdownList = [],
  noMargin,
  margin,
  display,
  onUpdate,
  clickType,
  fontSize = '',
  handleEnterKey,
  borderRadius,
  borderColor,
  disableBorder,
  border,
  height,
  placeholder,
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

  const handleHeight = () => {
    if (height) {
      return height
    } else {
      return 'auto'
    }
  }

  const handleEnter = e => {
    if (handleEnterKey) {
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
      zIndexUnset={zIndexUnset}
      zIndex={zIndex}
      className={className}
      name="aria-live-color"
      $inline={inline}
      noMargin={noMargin}
      display={display}
      margin={margin}
      $bottom={bottom}
      width={width}
      height={handleHeight()}
      fontSize={fontSize}
      maxWidth={maxWidth}>
      {children && (
        <FormLabel forId={name} fontSize={fontSize} help={help} required={required}>
          {children}
        </FormLabel>
      )}
      <Control
        mobile={mobile}
        onBlur={handleBlur}
        error={currentError}
        type={fieldType === 'input' && inputType}
        name={name}
        id={id || name}
        placeholder={placeholder}
        onKeyDown={handleEnter}
        fontSize={fontSize}
        disabled={disabled}
        display={display}
        $modalSelect={modalSelect}
        currency={currency}
        onChange={fieldType === 'input' || fieldType === 'select' ? onInputChange : onChange}
        onFocus={handleFocus}
        borderRadius={borderRadius}
        borderColor={borderColor}
        border={border}
        disableBorder={disableBorder}
        height={handleHeight()}
        zIndex={zIndex}
        width={width}
        {...rest}
      />
      {dropdownList.length > 0 && dropdownOpen && (
        <Absolute smallLeft {...rest} zIndex="10000">
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
  /** Unique id for this field */
  id: PropTypes.string,
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
  /** width for FormFieldContainer */
  width: PropTypes.string,
  /** Additional classNames, supports styled-components  */
  className: PropTypes.string,
  /** Function to call on blur of Control */
  onFocus: PropTypes.func,
  /** String to override the base font size */
  fontSize: PropTypes.string,
  /** String to override the base border */
  disableBorder: PropTypes.bool,
  /** String to override the base border */
  border: PropTypes.string,
  /** boolean to override the display*/
  display: PropTypes.string,
  /** string to override the zIndex*/
  zIndex: PropTypes.string
}

export default FormField
