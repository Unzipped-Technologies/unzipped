import React, {useState} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {get} from 'lodash';
import Icon from '../Icon';

const SearchContainer = styled.div`
    display: flex;
    border: 2px solid ${props => props.theme.tint3};
    border-radius: 4px;
    width: ${props => props.width};
    @media (max-width: ${props => props.theme.mobileWidth}px) {
        width: 100%;
    }
    background: #ffffff;
`;

const Input = styled.input`
    outline: none; // Override user agent stylesheet
    width: 100%;
    border: none;
    height: ${props => (props.large ? '56px' : '40px')};
    background: transparent;
    padding: 20px;
    font-family: arial;
    font-size: ${props => props.theme.fontSizeM};
    color: ${props => props.theme.textSecondary};
    ::placeholder {
        color: ${props => props.theme.tint2};
    }
    @media (max-width: ${props => props.theme.mobileWidth}px) {
        font-size: ${props => props.theme.baseFontSize};
    }
    &:focus {
        border: none !important;
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
    display: ${({$show}) => ($show ? 'inherit' : 'none')};
`;

const SearchIcon = styled.span`
    ${icon};
    svg {
        width: 25px;
        height: 25px;
    }
`;

/**
 * Generic Search bar component, filters and returns filtered items in onChange
 */
const Search = ({
    filterCondition = (value, inputValue) => {
        return value?.toLowerCase().includes(inputValue.trim().toLowerCase());
    },
    keys = [],
    large = false,
    onAction = () => {},
    onChange = () => {},
    placeholder = '',
    searchableItems = [],
    width = '36.75rem',
    initialValue = '',
    ...rest
}) => {
    const [inputValue, setInputValue] = useState(initialValue);

    const handleClearInput = () => {
        setInputValue('');
        onChange(searchableItems);
        onAction('');
    };

    const handleOnChange = e => {
        setInputValue(e.target.value);
        onAction(e.target.value);
        const filteredItems = searchableItems.filter(item => {
            for (const key of keys) {
                if (filterCondition(get(item, key), e.target.value)) {
                    return true;
                }
            }
        });
        onChange(filteredItems, e.target.value);
    };

    return (
        <SearchContainer width={width} {...rest}>
            <Input
                data-testid="search-bar-input"
                type="text"
                placeholder={placeholder}
                value={inputValue}
                large={large}
                onChange={handleOnChange}
            />
            <ClearIcon onClick={handleClearInput} $show={inputValue !== ''}>
                <Icon name="closeBtn" />
            </ClearIcon>
            <SearchIcon>
                <Icon name="search" />
            </SearchIcon>
        </SearchContainer>
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
    searchableItems: PropTypes.arrayOf(PropTypes.object),
    /** width of the input  */
    width: PropTypes.string,
    /** Initial value of the input  */
    initialValue: PropTypes.string,
};

export default Search;
