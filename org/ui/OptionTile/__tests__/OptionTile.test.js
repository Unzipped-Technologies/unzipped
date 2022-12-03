import React from 'react';
import {render, screen} from 'testing/utils';
import OptionTile from '..';

test('Correctly sets the label, value, and checked status of the OptionTile input', async () => {
    render(<OptionTile label="Hello World" value="helloWorld" checked={true} />);
    const input = screen.getByLabelText('Hello World');

    expect(input).toBeInTheDocument();
    expect(input.value).toEqual('helloWorld');
    expect(input.checked).toBeTruthy();
});
