import React from 'react';
import {render, screen, waitFor, fireEvent} from 'testing/utils';
import ImpersonationBanner from '..';

describe('ImpersonationBanner Renders and Works', () => {
    const testId = 'Impersonation-Banner';
    const testName = 'First Middle Last';
    const testLogout = jest.fn();
    let logoutButton;

    beforeEach(() => {
        render(<ImpersonationBanner show name={testName} logout={testLogout} />);
    });
    test('ImpersonationBanner has testId', () => {
        const bannerById = screen.getByTestId(testId);
        expect(bannerById).toBeInTheDocument();
    });
    test('ImpersonationBanner has expected content', () => {
        const bannerByText = screen.getByText(testName);
        expect(bannerByText).toBeInTheDocument();
    });
    test('ImpersonationBanner has logout button', () => {
        logoutButton = screen.getByText('Stop Viewing');
        expect(logoutButton).toBeInTheDocument();
    });
    test('ImpersonationBanner logout button fires clicks', () => {
        if (logoutButton) fireEvent.click(logoutButton);
        waitFor(() => {
            expect(testLogout).toHaveBeenCalled();
        });
    });
});
