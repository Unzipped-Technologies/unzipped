import {reducer, initialState, SET_ITEMS, SET_SEARCH_TEXT, TOGGLE_FILTER} from 'components/ui/hooks/useSearchAndFilter';

describe('useSearchAndFilter reducer', () => {
    test('sets initial items and display items', async () => {
        const items = [{id: 1}, {id: 2}];
        const action = {type: SET_ITEMS, payload: {items}};

        const newState = reducer(initialState, action);

        expect(newState.items).toStrictEqual(items);
        expect(newState.displayItems).toStrictEqual(items);
        expect(newState.searchText).toStrictEqual('');
        expect(newState.searchKeys).toStrictEqual([]);
        expect(newState.filters).toStrictEqual({});
    });
    test('sets initial items and display items with existing search / filters', async () => {
        const items = [
            {id: 1, type: 'good', name: 'abc'},
            {id: 2, type: 'better', name: 'abcdef'},
            {id: 3, type: 'good', name: 'def'},
        ];
        const action = {type: SET_ITEMS, payload: {items}};

        const state = Object.assign({}, initialState, {
            searchKeys: ['name'],
            searchText: 'abc',
            filters: {type: ['good']},
        });
        const newState = reducer(state, action);

        expect(newState.items).toStrictEqual(items);
        expect(newState.displayItems).toStrictEqual([items[0]]);
        expect(newState.searchText).toStrictEqual('abc');
        expect(newState.searchKeys).toStrictEqual(['name']);
        expect(newState.filters).toStrictEqual({type: ['good']});
    });
    test('sets search text and updates display items with searchKey of string type', async () => {
        const items = [
            {id: 1, name: 'abc'},
            {id: 2, name: 'abcdef'},
            {id: 3, name: 'def'},
        ];
        const state = Object.assign({}, initialState, {items, searchKeys: ['name']});
        const action = {type: SET_SEARCH_TEXT, payload: {searchText: 'abc'}};

        const newState = reducer(state, action);

        expect(newState.items).toStrictEqual(items);
        expect(newState.displayItems).toStrictEqual([
            {id: 1, name: 'abc'},
            {id: 2, name: 'abcdef'},
        ]);
        expect(newState.searchText).toStrictEqual('abc');
        expect(newState.searchKeys).toStrictEqual(['name']);
        expect(newState.filters).toStrictEqual({});
    });
    test('sets search text and updates display items with searchKey of object type', async () => {
        const items = [
            {id: 1, name: 'abc'},
            {id: 2, name: 'abcdef'},
            {id: 3, name: 'def'},
        ];
        const keyFunc = item => item.name;
        const state = Object.assign({}, initialState, {items, searchKeys: [keyFunc]});
        const action = {type: SET_SEARCH_TEXT, payload: {searchText: 'abc'}};

        const newState = reducer(state, action);

        expect(newState.items).toStrictEqual(items);
        expect(newState.displayItems).toStrictEqual([
            {id: 1, name: 'abc'},
            {id: 2, name: 'abcdef'},
        ]);
        expect(newState.searchText).toStrictEqual('abc');
        expect(newState.searchKeys).toStrictEqual([keyFunc]);
        expect(newState.filters).toStrictEqual({});
    });
    test('toggles filter and updates display items', async () => {
        const items = [
            {id: 1, type: 'good'},
            {id: 2, type: 'good'},
            {id: 3, type: 'better'},
        ];
        const state = Object.assign({}, initialState, {items});
        const action = {type: TOGGLE_FILTER, payload: {filterKey: 'type', filterValue: 'better'}};

        const newState = reducer(state, action);

        expect(newState.items).toStrictEqual(items);
        expect(newState.displayItems).toStrictEqual([{id: 3, type: 'better'}]);
        expect(newState.searchText).toStrictEqual('');
        expect(newState.searchKeys).toStrictEqual([]);
        expect(newState.filters).toStrictEqual({type: ['better']});
    });
    test('toggles filter, searches, and updates display items', async () => {
        const items = [
            {id: 1, name: 'abc', type: 'good'},
            {id: 2, name: 'abcdef', type: 'better'},
            {id: 3, name: 'def', type: 'good'},
        ];
        const state = Object.assign({}, initialState, {
            items,
            filterKey: 'type',
            filterValue: 'better',
            searchKeys: ['name'],
            filters: {type: ['better']},
        });
        const action = {type: SET_SEARCH_TEXT, payload: {searchText: 'abc'}};

        const newState = reducer(state, action);

        expect(newState.items).toStrictEqual(items);
        expect(newState.displayItems).toStrictEqual([{id: 2, name: 'abcdef', type: 'better'}]);
        expect(newState.searchText).toStrictEqual('abc');
        expect(newState.searchKeys).toStrictEqual(['name']);
        expect(newState.filters).toStrictEqual({type: ['better']});
    });
});
