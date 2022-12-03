import React from 'react';
import {render, screen} from 'testing/utils';
import InitialsIcon from '..';

test('Render an Initials Icon - 0 initials', async () => {
    render(<InitialsIcon />);

    const node = screen.getByTestId('initials-icon');
    expect(node).toHaveTextContent('');
});

test('Render an Initials Icon - 1 initial', async () => {
    render(<InitialsIcon initials="K" />);

    const node = screen.getByTestId('initials-icon');
    expect(node).toHaveTextContent('K');
});

test('Render an Initials Icon - 2 initials', async () => {
    render(<InitialsIcon initials="TK" />);

    const node = screen.getByTestId('initials-icon');
    expect(node).toHaveTextContent('TK');
});
