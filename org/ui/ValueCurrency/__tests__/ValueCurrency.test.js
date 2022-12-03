import React from 'react';
import {render} from 'testing/utils';
import ValueCurrency from '..';

test('Render the fund view component with numbers', async () => {
    render(<ValueCurrency size="big" amount={888} title="closed" currency={1500000} />);
});

test('Render the fund view component with strings', async () => {
    render(<ValueCurrency size="big" amount="888" title="closed" currency="1500000" />);
});

test('Render the fund view component with strings and numbers', async () => {
    render(<ValueCurrency size="big" amount="888" title="closed" currency={1500000} />);
});
