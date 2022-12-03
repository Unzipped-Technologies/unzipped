import DashboardHeader from '..';
import React from 'react';
import {render, screen} from 'testing/utils';

test('Render our DashboardHeader component with props', () => {
    render(<DashboardHeader leftElements={['left']} rightElements={['right']} />);

    const leftText = screen.getByText('left');
    const rightText = screen.getByText('right');

    expect(leftText).toBeInTheDocument();
    expect(rightText).toBeInTheDocument();
});
