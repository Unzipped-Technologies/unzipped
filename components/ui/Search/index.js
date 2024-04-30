import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { get } from 'lodash'
import Icon from '../Icon'
import { ifCondition } from '@cloudinary/url-gen/actions/conditional'

const SearchContainer = styled.div`
  display: flex;
  alignitems: center;
  height: ${({ height }) => (height ? height : '37px')};
  border: ${({ border }) => (border ? border : `1px solid #212529`)};
  border-radius: ${({ borderRadius }) => (borderRadius ? borderRadius : '4px')};
  width: ${props => props.width};
  @media (max-width: ${props => props.theme.mobileWidth}px) {
    width: 100%;
  }
  background: #ffffff;

  @media (max-width: 680px) {
    border: 1px solid #c4c4c4;
  }
`

const Input = styled.input`
  margin-top: 2px !important;
  outline: none !important; // Override user agent stylesheet
  width: 100%;
  border: none !important;
  background: transparent;
  outline: none;
  font-family: arial;
  height: ${({ height }) => (height ? height : '2.3rem !important')};
  font-size: ${props => props.theme.fontSizeM};
  color: ${props => props.theme.textSecondary};
  ::placeholder {
    color: ${props => (props.placeHolderColor ? props.placeHolderColor : props.theme.tint2)};
  }
  @media (max-width: ${props => props.theme.mobileWidth}px) {
    font-size: ${props => props.theme.baseFontSize};
  }
  &:focus {
    border: none !important;
    outline: none !important;
    box-shadow: 0 0px 0 0 #26a69a !important;
  }
`

const icon = `
    display: flex;
    align-items: center;
    svg {
        path {
            fill: #8d8d8d;
        }
    }
    padding-right: 20px;
`

const ClearIcon = styled.span`
  ${icon};
  svg {
    width: 14px;
    height: 14px;
  }
  cursor: pointer;
  display: ${({ $show }) => ($show ? 'inherit' : 'none')};
`

const SearchIcon = styled.span`
  padding: 0px 15px;
  color: #333333;
  ${icon};
  svg {
    width: 25px;
    height: 25px;
    fill: red !important;
  }
`

const Searchbutton = styled.button`
  border-radius: 4px;
  background: #1772eb;
  color: #fff;
  padding: 8px 27px;
  border: 3.2px solid #1772eb;
  margin-left: 9px;
`

/**
 * Generic Search bar component, filters and returns filtered items in onChange
 */
const Search = ({
  filterCondition = (value, inputValue) => {
    return value?.toLowerCase().includes(inputValue.trim().toLowerCase())
  },
  keys = [],
  large = false,
  placeHolderColor,
  theme,
  onAction = () => {},
  onChange = () => {},
  placeholder = '',
  width = '36.75rem',
  initialValue = '',
  handleSearch,
  searchButton,
  height,
  border,
  borderRadius,
  ...rest
}) => {
  const [inputValue, setInputValue] = useState(initialValue)

  const isInitialMount = useRef(true)

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
    } else {
      if (!inputValue && handleSearch) {
        handleSearch()
      }
    }
  }, [inputValue])

  const handleClearInput = () => {
    setInputValue('')
    onAction('')
    onChange('')
  }

  const handleSearchText = () => {
    if (inputValue) {
      handleSearch()
    }
  }
  const handleOnChange = e => {
    setInputValue(e.target.value)
    onAction(e.target.value)
    onChange(e.target.value)
  }
  const handleEnter = e => {
    if (e.keyCode === 13) {
      handleSearchText()
    }
  }

  return (
    <>
      <SearchContainer
        width={width}
        {...rest}
        theme={theme}
        height={height}
        border={border}
        borderRadius={borderRadius}>
        <SearchIcon
          onClick={handleSearchText}
          style={{
            color: '#333333',
            fill: 'red !important'
          }}>
          <Icon
            name="search"
            style={{
              color: '#333333',
              fill: 'red !important'
            }}
          />
        </SearchIcon>
        <Input
          height={height}
          placeHolderColor={placeHolderColor}
          data-testid="search-bar-input"
          type="text"
          placeholder={placeholder}
          value={inputValue}
          large={large}
          onChange={handleOnChange}
          onKeyDown={handleEnter}
        />
        <ClearIcon onClick={handleClearInput} $show={inputValue !== ''}>
          <Icon name="closeBtn" />
        </ClearIcon>
      </SearchContainer>
      {searchButton && <Searchbutton onClick={handleSearchText}>Search</Searchbutton>}
    </>
  )
}

Search.propTypes = {
  /** function called to filter the searchableItems */
  filterCondition: PropTypes.func,
  /** name of the key(s) you want to search on, in the object */
  keys: PropTypes.arrayOf(PropTypes.string),
  /** display a larger version */
  large: PropTypes.bool,
  /** function to call when input clears */
  onAction: PropTypes.func,
  /** function called when input value changes */
  onChange: PropTypes.func,
  /** the placeholder for the input */
  placeholder: PropTypes.string,
  /** array of unflattened searchable objects */
  // searchableItems: PropTypes.arrayOf(PropTypes.object),
  /** width of the input  */
  width: PropTypes.string,
  /** Initial value of the input  */
  initialValue: PropTypes.string
}

export default Search
