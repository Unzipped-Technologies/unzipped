import {renderHook} from '@testing-library/react-hooks';
import useSessionTimer from '../useSessionTimer';

const sleep = time => new Promise(resolve => setTimeout(resolve, time));

describe('useSessionTimer custom hook', () => {
    test('it runs onPrompt and onIdle when time is met', async () => {
        const onPrompt = jest.fn();
        const onIdle = jest.fn();
        const options = {warningTimeout: 100, finalTimeout: 200};

        renderHook(() => useSessionTimer(true, onPrompt, onIdle, options)); // there is approx a 100ms increase to each timer under the hood

        await expect(onPrompt).toBeCalledTimes(0);
        await expect(onIdle).toBeCalledTimes(0);
        await sleep(100);
        await expect(onPrompt).toBeCalledTimes(1);
        await expect(onIdle).toBeCalledTimes(0);
        await sleep(200);
        await expect(onPrompt).toBeCalledTimes(1);
        await expect(onIdle).toBeCalledTimes(1);
    });
});
