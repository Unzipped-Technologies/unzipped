import React from 'react';
import {render, screen} from 'testing/utils';
import Radio from '..';

test('Render a radio button', async () => {
    render(<Radio options={['what', 'apple', 'bear']} name="test" />);
});

test('Render a radio button', async () => {
    render(<Radio options={['what', 'apple', 'bear']} name="test" />);
    const radioBox = screen.getByTestId('radio-option-test-apple-1');
    expect(radioBox).toHaveTextContent('apple');
});

test('Radio component rerenders correctly with different props', () => {
    // render(<Radio options={['what', 'apple', 'bear']} name="test" />);
    const {rerender} = render(<Radio options={['what', 'apple', 'bear']} name="test" />);
    expect(screen.getByTestId('radio-option-test-apple-1')).toHaveTextContent('apple');

    // re-render the same component with different props
    rerender(<Radio options={['what', 'chicken', 'bear']} name="test" />);
    expect(screen.getByTestId('radio-option-test-chicken-1')).toHaveTextContent('chicken');

    // re-render the same component with different props
    rerender(<Radio options={['what', 'kiwi', 'bear']} name="test" />);
    expect(screen.getByTestId('radio-option-test-kiwi-1')).toHaveTextContent('kiwi');
});
