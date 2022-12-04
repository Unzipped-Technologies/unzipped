import {currencyFormatter} from '../formHelper';

test('currencyFormatter works as expected', () => {
    expect(currencyFormatter(1000)).toEqual('$1,000.00');
    expect(currencyFormatter(1000, false)).toEqual('$1,000');
});
