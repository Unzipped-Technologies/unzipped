import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { get } from 'lodash';
import Icon from '../Icon';
import { ifCondition } from '@cloudinary/url-gen/actions/conditional';

const SearchContainer = styled.div`
    display: flex;
    height:37px;
    border: 1px solid ${props => props.theme.tint3};
    border-radius: 4px;
    width: ${props => props.width};
    @media (max-width: ${props => props.theme.mobileWidth}px) {
        width: 100%;
    }
    background: #ffffff;

    @media(max-width: 680px) {
        border: 1px solid #C4C4C4;
    }
`;

const Input = styled.input`
    outline: none !important; // Override user agent stylesheet
    height:2.3rem !important;
    width: 100%;
    margin:0 !important;
    border: none !important;
    background: transparent;
    outline: none;
    font-family: arial;
    font-size: ${props => props.theme.fontSizeM};
    color: ${props => props.theme.textSecondary};
    ::placeholder {
        color: ${props => props.placeHolderColor ? props.placeHolderColor : props.theme.tint2};
    }
    @media (max-width: ${props => props.theme.mobileWidth}px) {
        font-size: ${props => props.theme.baseFontSize};
    }
    &:focus {
        border: none !important;
        outline: none !important;
        box-shadow: 0 0px 0 0 #26a69a !important;
    }
`;

const icon = `
    display: flex;
    align-items: center;
    svg {
        path {
            fill: #8d8d8d;
        }
    }
    padding-right: 20px;
`;

const ClearIcon = styled.span`
    ${icon};
    svg {
        width: 14px;
        height: 14px;
    }
    cursor: pointer;
    display: ${({ $show }) => ($show ? 'inherit' : 'none')};
`;

const SearchIcon = styled.span`
    padding: 0px 15px;
    ${icon};
    svg {
        width: 25px;
        height: 25px;
    }
`;

const Searchbutton = styled.button`
border-radius: 4px;
background: #1772EB;
color: #FFF;
padding: 8px 27px;
border: 3.2px solid #1772EB;
margin-left: 9px;
`

/**
 * Generic Search bar component, filters and returns filtered items in onChange
 */
const Search = ({
    filterCondition = (value, inputValue) => {
        return value?.toLowerCase().includes(inputValue.trim().toLowerCase());
    },
    keys = [],
    large = false,
    placeHolderColor,
    theme,
    onAction = () => { },
    onChange = () => { },
    placeholder = '',
    width = '36.75rem',
    initialValue = '',
    handleSearch,
    searchButton,
    ...rest
}) => {
    const [inputValue, setInputValue] = useState(initialValue);

    useEffect(() => {
        if (!inputValue) {
            handleSearch()
        }
    }, [inputValue])

    const handleClearInput = () => {
        setInputValue('');
        onAction('');
        onChange('');
        // handleSearch();
    };



    const handleSearchText = () => {
        if (inputValue) {
            handleSearch()
        }
    }
    const handleOnChange = e => {
        setInputValue(e.target.value);
        onAction(e.target.value);
        onChange(e.target.value);
    };
    const handleEnter = (e) => {
        if (e.keyCode === 13) {
            handleSearchText()
        }
    }

    return (
        <>
            <SearchContainer width={width} {...rest} theme={theme}>
                <SearchIcon onClick={handleSearchText}>
                    <Icon name="search" />
                </SearchIcon>
                <Input
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
            {searchButton && <Searchbutton onClick={handleSearchText}>
                Search
            </Searchbutton>}
        </>
    );
};

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
    initialValue: PropTypes.string,
};

export default Search;
