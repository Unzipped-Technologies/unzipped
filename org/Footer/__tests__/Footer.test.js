import React from 'react';
import {render, screen} from 'testing/utils';
import Footer from '..';

test('regular footer', async () => {
    render(<Footer />);
    screen.getByText('Terms of Service');
    screen.getByText('Privacy Policy');
    const BigFAQ = screen.queryByText('Vanilla FAQs');
    expect(BigFAQ).not.toBeInTheDocument();
});

test('homepage footer', async () => {
    render(<Footer bigFAQ />);
    screen.getByText('Vanilla FAQs');
    const navFAQ = screen.queryByText('FAQs');
    expect(navFAQ).not.toBeInTheDocument();
});

test('b2c footer', async () => {
    render(<Footer showCooleyLogin />);
    screen.getByText('Cooley User Sign In');
});
