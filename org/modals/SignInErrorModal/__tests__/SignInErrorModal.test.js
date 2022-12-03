import React from 'react';
import SignInErrorModal from '..';
import {render, screen, fireEvent} from 'testing/utils';
import {createMemoryHistory} from 'history';

test('As a user who cannot sign into Vanilla, I expect a modal to notify me that I cannot sign in', async () => {
    const history = createMemoryHistory();
    const state = {
        loginError: true,
    };
    history.push('/', state);

    render(<SignInErrorModal />, {
        history,
    });

    expect(screen.getByText('Unable to Sign In')).toBeVisible();
});

test('As a user who cannot sign into Vanilla, I expect a modal to notify me that I cannot sign in', async () => {
    const history = createMemoryHistory();
    const state = {
        loginError: true,
    };
    history.push('/', state);

    render(<SignInErrorModal />, {
        history,
    });

    const button = screen.getByText('OK');
    await fireEvent.click(button);

    expect(screen.getByText('Unable to Sign In')).not.toBeVisible();
});

test('As a user who is on the Vanilla homepage, I expect to not see a modal notifying me that I cannot sign in', async () => {
    render(<SignInErrorModal />);

    expect(screen.getByText('Unable to Sign In')).not.toBeVisible();
});
