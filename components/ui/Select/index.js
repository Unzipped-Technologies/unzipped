import React, { useState } from 'react'
import PropTypes from 'prop-types'
import theme from '../theme'
import Select, { createFilter } from 'react-select'
import FormError from '../FormError'
import Checkbox from '../Checkbox'
import styled from 'styled-components'

/**
 * Select dropdown Component.
 */

const CheckboxStyled = styled(Checkbox)`
  & {
    margin-bottom: 0;
    padding-left: 10px;
    &:hover {
      cursor: pointer;
      background-color: #002269;
      color: white;
      & span > svg path {
        fill: white;
      }
      & span > svg path:nth-of-type(2) {
        fill: #5046ff;
      }
      & label {
        color: white;
        cursor: pointer;
      }
    }
  }

  & label {
    width: 100%;
  }

  & label > div {
    align-items: center;
    font-size: ${props => props.theme.fontSizeS};
    height: auto;
    ${'' /* min-height: 31px; */}
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    padding-right: 15px;
    & div:first-of-type {
      order: 1;
    }
    & span:first-of-type {
      order: 2;
      width: 16.5px;
      visibility: ${({ viewAll }) => (viewAll ? 'hidden' : 'visible')};
      display: flex;
      align-items: center;
      & svg {
        position: relative;
        top: 0px;
        left: -4px;
      }
    }
    @media (max-width: ${props => props.theme.mobileWidth}px) {
      font-size: ${props => props.theme.fontSizeXS};
    }
  }
`

const SelectInput = ({
  mobile,
  valueForMulti,
  small,
  input,
  widthInModal,
  disableBorder,
  dateTime = false
}) => {
  const [isFocused, setIsFocused] = useState(false)

  let border = theme.border
  if (error) {
    border = theme.error
  } else if (accepted) {
    border = theme.primary
  }

  const filterConfig = {
    ignoreCase: true,
    ignoreAccents: true,
    trim: true,
    matchFrom: 'start'
  }

  const getMinWidth = (dateTime, small) => {
    if (dateTime) {
      return '146px'
    }
    if (small) {
      return '200px'
    }
    return '40px'
  }

  const styles = {
    container: defaultStyles => ({
      ...defaultStyles,
      pointerEvents: 'auto',
      border: disableBorder ? 'none' : `2px solid ${isFocused ? 'black' : border}`,
      borderRadius: '4px',
      height: height ? height : '100%',
      width: width ? width : '360px',
      minWidth: `${getMinWidth(dateTime, small)}`,
      maxWidth: `650px`,
      fontFamily: 'arial',
      fontSize: `${mobile ? '16px' : fontSize}`,
      zIndex: 1000
    }),
    control: defaultStyles => ({
      ...defaultStyles,
      border: 0,
      boxShadow: 'none',
      margin: 0,
      borderRadius: borderRadius ? borderRadius : '2px',
      height: `${dateTime ? '100%' : small ? '40px' : '56px'}`,
      cursor: `${disabled ? 'not-allowed' : 'default'}`,
      zIndex: 1000,
      svg: {
        fill: `${disabled ? theme.tint2 : theme.textSecondary}`
      }
    }),
    option: (defaultStyles, state) => ({
      ...defaultStyles,
      fontFamily: 'Roboto',
      padding: '0px 22px',
      zIndex: 1000,
      backgroundColor: state.isFocused ? theme.backgorund3 : state.isSelected ? theme.backgorund3 : theme.text3,
      color: state.isFocused ? theme.text3 : state.isSelected ? theme.text3 : theme.text2
    }),
    menu: (defaultStyles, state) => {
      const isTop = state.placement === 'top'
      const isBottom = state.placement === 'bottom'

      return {
        ...defaultStyles,
        width: width ? (width === '100%' ? `calc(${width} + 4px)` : width) : '360px',
        margin: '2px 0 0 -2px',
        fontWeight: '600',
        borderRadius: borderRadius ? borderRadius : '4px'
      }
    },
    menuList: (defaultStyles, state) => ({
      ...defaultStyles,
      padding: 0,
      width: width ? width : '360px',
      borderRadius: borderRadius ? borderRadius : '0',
      zIndex: 1000,
      boxShadow: '2px 2px 0px 0px rgba(0, 0, 0, 0.1)'
    }),
    dropdownIndicator: defaultStyles => ({
      ...defaultStyles,
      color: theme.textSecondary,
      zIndex: 1000,
      display: disableBorder ? 'none' : 'block',
      '&:hover': {
        color: theme.textSecondary
      }
    }),
    placeholder: defaultStyles => ({
      ...defaultStyles,
      color: '#757575'
    })
  }

  const Option = ({ label }) => (
    <CheckboxStyled
      isMulti={isMulti}
      options={[label]}
      onChange={onChange}
      viewAll={label === 'View All' && viewAll}
      selectedValues={valueForMulti}
    />
  )

  const IndicatorSeparator = () => null
  return (
    <>
      <Select
        isMulti={isMulti}
        data-testid="ui-select-component"
        styles={styles}
        placeholder={isMulti && valueForMulti?.length > 0 ? `${valueForMulti.length} selected` : placeholder}
        value={value}
        name={name}
        input={input}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        menuIsOpen={menuIsOpen}
        menuPlacement={$modalSelect ? 'bottom' : 'auto'}
        options={options}
        onChange={onChange}
        borderRadius={borderRadius}
        isSearchable={isSearchable}
        filterOption={createFilter(filterConfig)}
        widthInModal={widthInModal}
        modalSelect={$modalSelect}
        isDisabled={disabled}
        components={isMulti ? { Option, IndicatorSeparator } : { IndicatorSeparator }}
        height={height}
      />
      {error && <FormError>{error}</FormError>}
    </>
  )
}

SelectInput.propTypes = {
  /** default text of input */
  placeholder: PropTypes.string,
  /** name of input */
  name: PropTypes.string,
  /* Override default font size for menu items */
  fontSize: PropTypes.string,
  /** selections in the dropdown */
  options: PropTypes.array,
  /** error message to display */
  error: PropTypes.string,
  /** handles onChange event */
  onChange: PropTypes.func,
  /** If the value has been accepted */
  accepted: PropTypes.bool,
  /** value is the currently selected data from options */
  value: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.number]),
  isSearchable: PropTypes.bool,
  /** Adds checkboxes to dropdown */
  isMulti: PropTypes.bool,
  /** If the select will be used in a modal */
  $modalSelect: PropTypes.bool,
  /** Pass a view all button that resets select box */
  viewAll: PropTypes.bool,
  /** This is to control if the menu is open or closed */
  menuIsOpen: PropTypes.bool,
  /** Pass on blur to component */
  onBlur: PropTypes.func,
  /** Pass on focus to component */
  onFocus: PropTypes.func,
  /** Width of component */
  width: PropTypes.string,
  /** Width of component in a modal */
  widthInModal: PropTypes.bool,
  /** Is the input disabled */
  disabled: PropTypes.bool,
  /** Input is for Date Time Component */
  dateTime: PropTypes.bool,
  /** Height of component */
  height: PropTypes.string,
  /** Border radius of component */
  borderRadius: PropTypes.string,
  /** Disable border of component */
  disableBorder: PropTypes.bool
}

export default SelectInput
