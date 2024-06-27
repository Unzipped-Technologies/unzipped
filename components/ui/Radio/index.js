import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import theme from '../theme'
import { FormError, HelpIcon } from '../'

const RadioControl = styled.div`
    color: ${props => props.theme.textSecondary};
    font-weight: 400;
    font-size: ${props => props.theme.baseFontSize};
    height: 100%;
    padding: 10px 0;
    font-family: Arial, sans-serif;
    display: inline-flex;
    flex-direction: ${props => (props.$vertical ? 'column' : 'row')};
    > :not(:last-child) {
        margin${props => (props.$vertical ? '-bottom: 20px' : '-right: 40px')};
    }
`
const HelpIconStyled = styled.div`
  margin-left: 10px;
`

const RadioOption = styled.div`
  position: relative;
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  input {
    transform: scale(1.01);
    align-self: ${({ centered }) => (centered ? 'center' : 'flex-start')};
    margin: 3px 0 0 0;
    appearance: none;
    border-radius: 50%;
    min-width: 18px;
    width: 18px;
    height: 18px;
    border: 2px solid ${props => props.theme.tint2};
  }
  input: checked {
    border: 5px solid ${props => (props.disabled ? props.theme.tint2 : props.theme.secondary)};
  }
`

const LabelContainer = styled.div`
  margin-left: 0.875rem;
  display: flex;
  flex-direction: column;
`

const RadioOptionLabel = styled.label`
  font-size: ${({ fontSize }) => fontSize && fontSize}px;
  font-weight: ${({ fontWeight }) => fontWeight && fontWeight};
`

/**
 * Bare Radio Component.
 */
const Radio = ({
  centered = false,
  options = [],
  vertical = false,
  accepted = false,
  error = null,
  name = '',
  selectedValue = '',
  subOption = '',
  onChange = () => {},
  disabled = false,
  customValue = '',
  optionHelperDescript = [],
  ...rest
}) => {
  let border = theme.tint3
  if (error) {
    border = theme.error
  } else if (accepted) {
    border = theme.primary
  }
  const optionElements = options.map((option, index) => {
    const id = `${name}-${option}-${index}`
    const value = customValue?.[index] || customValue || option || name
    const isValueSelected = value == selectedValue
    const testId = `radio-option-${id}`
    const handleChange = e => onChange(e, index)

    return (
      <RadioOption centered={centered} disabled={disabled} data-testid={testId} key={testId}>
        <input
          type="radio"
          id={id}
          name={name}
          value={value}
          checked={isValueSelected}
          onChange={handleChange}
          disabled={disabled || isValueSelected}
        />
        {option && (
          <LabelContainer>
            <RadioOptionLabel fontWeight={rest.fontWeight} fontSize={rest.fontSize} htmlFor={id}>
              {option}
            </RadioOptionLabel>
            {subOption && <RadioOptionLabel>{subOption}</RadioOptionLabel>}
          </LabelContainer>
        )}
        {option && optionHelperDescript.length > 0 && optionHelperDescript[index] && (
          <HelpIconStyled>
            <HelpIcon key={index} name="help" text={optionHelperDescript[index]} />
          </HelpIconStyled>
        )}
      </RadioOption>
    )
  })

  return (
    <>
      <RadioControl
        $vertical={vertical}
        key={`${name}-${selectedValue}`}
        data-testid={`radio-control-${name}`}
        border={border}
        accepted={accepted}
        {...rest}>
        {optionElements}
      </RadioControl>
      {error && <FormError>{error}</FormError>}
    </>
  )
}

Radio.propTypes = {
  /** Boolean to determine if the input should be centered or not */
  centered: PropTypes.bool,
  /** Function handling input change */
  onChange: PropTypes.func,
  /** array of options for select */
  options: PropTypes.array,
  /** If the value has been accepted */
  accepted: PropTypes.bool,
  /** If there is an error */
  error: PropTypes.string,
  /** If to show items vertically instead of horizontally */
  vertical: PropTypes.bool,
  /** When the value is unable to be clicked */
  disabled: PropTypes.bool,
  /** The function to run to set the radio's state */
  setRadioState: PropTypes.func,
  /** Optional string to be used underneath the option */
  subOption: PropTypes.string,
  /** The value set RadioState should be updating*/
  radioState: PropTypes.string,
  /** Sets custom value for the radio */
  customValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool, PropTypes.array]),
  /** The descriptions of the helper icon  */
  optionHelperDescript: PropTypes.array
}

export default Radio
