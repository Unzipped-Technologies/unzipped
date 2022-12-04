import React from 'react';
import {render, screen, fireEvent} from 'testing/utils';
import NotificationCard from '..';

describe('<NotificationCard />', () => {
    let singleNotificationCard;
    let dismissBtn;
    const mockDismissAlert = jest.fn(() => {});

    beforeEach(() => {
        render(<NotificationCard dismissAlert={mockDismissAlert} cardId={1} card={{}} />);
        singleNotificationCard = screen.getByTestId('single-notification-card');
        dismissBtn = screen.getByTestId('single-notification-card-dismiss-btn');
    });

    test('renders a notification card', () => {
        expect(singleNotificationCard).toBeInTheDocument();
    });

    test('clicking dismiss button fires event', () => {
        fireEvent.click(dismissBtn);
        expect(mockDismissAlert).toHaveBeenCalled();
    });
});
