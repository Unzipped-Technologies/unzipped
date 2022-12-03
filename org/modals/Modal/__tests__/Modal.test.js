import React from 'react';
import {fireEvent, render, screen} from 'testing/utils';
import Modal from '..';

test('Modal shows on screen', async () => {
    render(<Modal isVisible={true} />);
    const modal = screen.getByRole('dialog');
    expect(modal).toBeVisible();
});

test('Modal hides on screen', async () => {
    render(<Modal isVisible={false} />);
    const modal = screen.getByRole('dialog', {hidden: true});
    expect(modal).not.toBeVisible();
});

test('Modal contains prop text', async () => {
    render(
        <Modal isVisible secondaryButton header={'Header Text'} primaryBtnText={'Confirm'} secondaryBtnText={'Close'}>
            Body Text
        </Modal>,
    );
    const headerText = screen.getByText('Header Text');
    const bodyText = screen.getByText('Body Text');
    const primaryButton = screen.getByTestId('modal-primary-btn');
    const secondaryButton = screen.getByTestId('modal-secondary-btn');

    expect(headerText).toBeInTheDocument();
    expect(bodyText).toBeInTheDocument();
    expect(primaryButton).toHaveTextContent('Confirm');
    expect(secondaryButton).toHaveTextContent('Close');
});

test('Modal contains secondary button', async () => {
    render(<Modal isVisible secondaryButton />);
    const secondaryButton = screen.getByTestId('modal-secondary-btn');
    expect(secondaryButton).toBeVisible();
});

test('Modal triggers close', async () => {
    const mockClose = jest.fn();

    render(<Modal isVisible onClose={mockClose} />);
    const closeButton = screen.getByTestId('modal-close-btn');
    fireEvent.click(closeButton);
    expect(mockClose).toHaveBeenCalled();
});

test('Modal triggers action on confirm', async () => {
    const mockSubmit = jest.fn();

    render(<Modal isVisible={true} onSubmit={mockSubmit} primaryBtnText={'Confirm'} />);
    const primaryButton = screen.getByTestId('modal-primary-btn');
    fireEvent.click(primaryButton);
    expect(mockSubmit).toHaveBeenCalled();
});
