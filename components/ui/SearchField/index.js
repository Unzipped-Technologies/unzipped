import React from 'react'
import Select from 'react-select'

const SearchField = ({
  border,
  borderRadius,
  required,
  onBlur,
  onFocus,
  value = null,
  onChange,
  name,
  placeholder = '',
  options = [],
  isMulti,
  disableMenu,
  isSearchable,
  disabled,
  valueFontSize,
  menuListFontSize,
  menuListColor,
  indicator,
  width,
  dropdownWidth,
  height,
  padding,
  display,
  alignItems,
  margin,
  disableBorder,
  zIndex
}) => {
  const customStyles = {
    dropdown: (provided, state) => ({
      ...provided,
      display: 'none'
    }),
    container: defaultStyles => ({
      ...defaultStyles,
      width: dropdownWidth ? dropdownWidth : width ? width : '200px',
      fontSize: menuListFontSize ? menuListFontSize : '16px'
    }),
    control: (provided, state) => ({
      ...provided,
      boxShadow: 'none',
      fontSize: valueFontSize ? valueFontSize : '16px',
      width: width ? width : '200px',
      minHeight: height ? height : '30px !important',
      padding: padding ? padding : '0px !important',
      margin: margin ? margin : '0px !important',
      display: display ? display : 'flex',
      alignItems: alignItems ? alignItems : 'center',
      border: disableBorder ? 'none' : border ? border : '1px solid #ccc',
      borderRadius: borderRadius ? borderRadius : '0px'
    }),
    input: (provided, state) => ({
      ...provided,
      margin: '0',
      paddingBottom: '5px',
      height: height ? height : '30px  !important',
      verticalAlign: 'middle'
    }),
    option: (defaultStyles, state) => ({
      ...defaultStyles
    }),
    menuList: (defaultStyles, state) => ({
      ...defaultStyles,
      zIndex: zIndex,
      fontSize: menuListFontSize ? menuListFontSize : '16px',
      color: menuListColor ? menuListColor : '#000'
    }),
    indicatorSeparator: () => ({
      display: 'none'
    }),
    dropdownIndicator: () => ({
      display: indicator ? 'block' : 'none'
    }),
    clearIndicator: (provided, state) => ({
      ...provided,
      cursor: 'pointer'
    }),
    valueContainer: (provided, state) => ({
      ...provided,
      zIndex: state.isFocused ? 9999 : 1,
      marginTop: '-10px !important'
    }),

    singleValue: (provided, state) => ({
      ...provided,
      display: 'flex',
      gridArea: 'auto'
    })
  }
  return (
    <Select
      value={value}
      isMulti={isMulti}
      isDisabled={disabled ? disabled : false}
      isSearchable={isSearchable}
      openMenuOnClick={disableMenu ? false : true}
      styles={customStyles}
      aria-errormessage={name}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
      required={required}
      maxHeight={10}
      options={options}
      placeholder={placeholder}
      className="custom-react-select"
    />
  )
}

export default SearchField
