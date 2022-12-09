import {timeLeft} from '../timeHelper';

const ISOFormat = '2055-03-25';
const shortDate = '03/25/2015';
const longDate = 'Mar 25 2015';
const ISOString = '2022-01-27T09:00:00.221Z';
const withOffset = '2042-06-21 20:49:00.3290000 +00:00';
jest.useFakeTimers('modern').setSystemTime(new Date('2030-01-27T09:00:00.221Z'));

describe('timeLeft', () => {
    test('works with date formats that do NOT have time', () => {
        const expected = -468468000221;
        expect(timeLeft(shortDate)).toBeLessThanOrEqual(expected);
        expect(timeLeft(longDate)).toBeLessThanOrEqual(expected);
    });

    test('works with date formats that have time', () => {
        expect(timeLeft(ISOFormat)).toEqual(793810799779);
        expect(timeLeft(ISOString)).toEqual(-252460800000);
        expect(timeLeft(withOffset)).toEqual(391261740108);
    });

    test('works with null and undefined', () => {
        expect(timeLeft(null)).toEqual(-1895734800221);
        expect(timeLeft()).toBeNaN();
    });
});
