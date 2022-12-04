import React from 'react';
import NotificationsSidePanel from '..';
import {render, screen, fireEvent, waitFor} from 'testing/utils';

describe('<NotificationsSidePanel />', () => {
    let NotificationsSidePanelContainer;
    let closeBtn;
    let dismissAllBtn;
    beforeEach(() => {
        const setToggleMenu = jest.fn();
        render(<NotificationsSidePanel setToggleMenu={setToggleMenu} />);
        NotificationsSidePanelContainer = screen.getByTestId('notifications-side-panel');
        closeBtn = screen.getByTestId('close-btn');
        dismissAllBtn = screen.getByTestId('dismiss-all');
    });

    test('renders NotificationsSidePanel component', async () => {
        expect(NotificationsSidePanelContainer).toBeInTheDocument();
    });

    test('clicking on Dismiss All button clears all notifications', () => {
        fireEvent.click(dismissAllBtn);

        waitFor(() => {
            expect(screen.queryAllByTestId('notification-card')).not.toBeInTheDocument();
        });
    });

    test('clicking on the close button closes the side panel', () => {
        fireEvent.click(closeBtn);

        waitFor(() => {
            expect(screen.queryByTestId('notifications-side-panel')).not.toBeInTheDocument();
        });
    });
});
