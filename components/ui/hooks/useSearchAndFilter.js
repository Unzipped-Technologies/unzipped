import {useReducer, useCallback} from 'react';

const SET_ITEMS = 'SET_ITEMS';
const SET_SEARCH_TEXT = 'SET_SEARCH_TEXT';
const TOGGLE_FILTER = 'TOGGLE_FILTER';

const freeze = Object.freeze;
const initialState = freeze({displayItems: [], items: [], searchText: '', searchKeys: [], filters: {}});
const getValueFromSearchKey = (item, key) => {
    if (typeof key === 'string') {
        return item[key];
    }
    return key(item);
};
const applyFilters = filters => item => {
    const areAllValuesEmpty = Object.values(filters).every(values => values.length === 0);
    if (areAllValuesEmpty) {
        return true;
    }
    const hasAllFilters = Object.entries(filters)
        .map(([key, values]) => {
            if (values.length === 0) {
                return true;
            }
            if (values.includes(item[key])) {
                return true;
            }
            return false;
        })
        .every(item => item);
    return hasAllFilters;
};
const applySearch = ({searchKeys, searchText}) => item => {
    if (searchKeys.length === 0) {
        return true;
    }
    const valueContainsInput = (value, inputValue) => {
        return value?.toLowerCase().includes(inputValue.trim().toLowerCase());
    };
    for (const key of searchKeys) {
        const value = getValueFromSearchKey(item, key);
        if (valueContainsInput(value, searchText)) {
            return true;
        }
    }
    return false;
};
const calculateDisplayItems = ({items, searchKeys, searchText, filters}) => {
    return items.filter(applyFilters(filters)).filter(applySearch({searchKeys, searchText}));
};
const reducer = (state, action) => {
    const {
        type,
        payload: {items, searchText, filterKey, filterValue},
    } = action;

    switch (type) {
        case SET_ITEMS: {
            const {searchKeys, filters, searchText} = state;
            const displayItems = calculateDisplayItems({items, searchKeys, searchText, filters});
            return freeze({...state, displayItems, items: [...items]});
        }
        case SET_SEARCH_TEXT: {
            const {items, searchKeys, filters} = state;
            const displayItems = calculateDisplayItems({items, searchKeys, searchText, filters});
            return freeze({...state, searchText, displayItems});
        }
        case TOGGLE_FILTER: {
            const filterValues = new Set(state.filters[filterKey]);
            if (filterValues.has(filterValue)) {
                filterValues.delete(filterValue);
            } else {
                filterValues.add(filterValue);
            }
            const newFilters = {...state.filters, [filterKey]: Array.from(filterValues)};
            const {items, searchKeys, searchText} = state;
            const displayItems = calculateDisplayItems({
                items,
                searchKeys,
                searchText,
                filters: newFilters,
            });
            return freeze({...state, filters: newFilters, displayItems});
        }
    }
    return state;
};

const useSearchAndFilter = ({searchKeys, filters}) => {
    const [state, dispatch] = useReducer(reducer, freeze({...initialState, searchKeys, filters}));

    const setItems = useCallback(items => dispatch({type: SET_ITEMS, payload: {items}}), []);
    const setSearchText = useCallback(searchText => dispatch({type: SET_SEARCH_TEXT, payload: {searchText}}), []);
    const toggleFilter = useCallback(
        (filterKey, filterValue) => dispatch({type: TOGGLE_FILTER, payload: {filterKey, filterValue}}),
        [],
    );

    return [state, {setItems, setSearchText, toggleFilter}];
};

export default useSearchAndFilter;

export {reducer, initialState, SET_ITEMS, SET_SEARCH_TEXT, TOGGLE_FILTER};
