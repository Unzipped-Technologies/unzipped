import React from 'react';
import {render, screen, fireEvent} from 'testing/utils';
import OptionTileGroup from '..';

const tileList = [
    {
        iconName: 'profileNew',
        label: 'Sign In to existing account',
        value: 'onlineAccount',
    },
    {
        iconName: 'desktop',
        label: 'Subscribe online without an account',
        value: 'onlineNoAccount',
    },
];

test('Correctly sets a selected OptionTile', async () => {
    render(<OptionTileGroup tileList={tileList} selectedValue="onlineAccount" />);

    const input = screen.getByLabelText('Sign In to existing account', {exact: false});
    expect(input.checked).toBeTruthy();
});

test('Correctly updates selected OptionTile when a user selected a new choice', async () => {
    let selectedValue = 'onlineAccount';
    const mockOnChange = jest.fn(e => (selectedValue = e.target.value));

    render(<OptionTileGroup tileList={tileList} selectedValue={selectedValue} onChange={mockOnChange} />);

    const input = screen.getByLabelText('Subscribe online without an account', {exact: false});
    fireEvent.click(input);

    expect(mockOnChange).toHaveBeenCalled();
    expect(input.value).toBe(selectedValue);
});
