import React from 'react';
import {render, screen} from 'testing/utils';
import BackButton from '..';

test('Check button text for amendment pages 2 or higher', async () => {
    render(<BackButton step="AA" amendmentCount={2} isChangedPages={false} type="SA" />);

    const backButtonText = screen.getByTestId('backButton');
    expect(backButtonText).toHaveTextContent('Back to previous Fund Amendment');
});

test('Check button text for amendment page 1', async () => {
    render(<BackButton step="AA" amendmentCount={1} isChangedPages={false} type="FA" />);

    const backButtonText = screen.getByTestId('backButton');
    expect(backButtonText).toHaveTextContent('Back to Fund Agreement');
});

test('Check button text for fund agreement', async () => {
    render(<BackButton step="FA" amendmentCount={111} isChangedPages={false} type="AA" />);

    const backButtonText = screen.getByTestId('backButton');
    expect(backButtonText).toHaveTextContent('Back to Subscription Agreement');
});

test('Check button text for subscription agreement', async () => {
    render(<BackButton step="SA" amendmentCount={111} isChangedPages={false} type="SA" />);

    const backButtonText = screen.getByTestId('backButton');
    expect(backButtonText).toHaveTextContent('Back to Review & Confirm');
});

test('BackButton component rerenders correctly with different props', () => {
    const {rerender} = render(
        <BackButton fundId="12345" step="SA" amendmentCount={111} isChangedPages={false} type="SL" />,
    );
    expect(screen.getByTestId('backButton')).toHaveTextContent('Back to Actions Required');

    // re-render the same component with different props
    rerender(<BackButton step="AA" amendmentCount={2} isChangedPages={false} type="W9" />);
    expect(screen.getByTestId('backButton')).toHaveTextContent('Back to Submit W9 Form');

    // re-render the same component with different props
    rerender(<BackButton step="AA" amendmentCount={111} isChangedPages={false} type="AA" />);
    expect(screen.getByTestId('backButton')).toHaveTextContent('Back to previous Fund Amendment');
});
