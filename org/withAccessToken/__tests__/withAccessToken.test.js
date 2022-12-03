import React from 'react';
import {render, screen, cleanup} from '@testing-library/react';
import withAccessToken from '..';
import useAccessToken from 'utils/useAccessToken';

jest.mock('utils/useAccessToken');
jest.mock('@azure/msal-react');
jest.mock('@azure/msal-browser');

describe('withAccessToken HOC', () => {
    const testUrl = 'https://www.vanillavc.com/test/';
    const testToken = '123';

    beforeEach(() => {
        useAccessToken.mockReturnValue(testToken);
        const TestComponent = ({...props}) => {
            return (
                props.accessToken && (
                    <>
                        <p>Access passed as prop!</p>
                        <a href={props?.addAccessTokenToUrl(testUrl)}>Test Link</a>
                    </>
                )
            );
        };
        const WrappedComponent = withAccessToken(TestComponent);
        render(<WrappedComponent />);
    });

    test('The access token gets passed as a prop', async () => {
        expect(await screen.findByText('Access passed as prop!')).toBeInTheDocument();
    });
    test('addAccessTokenToUrl removes trailing slash and adds access token', async () => {
        const atag = await screen.findByText('Test Link');
        expect(atag.href).toEqual(`${testUrl.slice(0, -1)}?token=${testToken}`);
    });
    test('addAccessTokenToUrl works with urls that already have a query param', async () => {
        cleanup();

        const testUrl2 = 'https://www.vanillavc.com/test?test=0000';
        useAccessToken.mockReturnValue(testToken);
        const TestComponent = ({...props}) => {
            return (
                props.accessToken && (
                    <>
                        <p>Access passed as prop!</p>
                        <a href={props?.addAccessTokenToUrl(testUrl2)}>Test Link</a>
                    </>
                )
            );
        };
        const WrappedComponent = withAccessToken(TestComponent);
        render(<WrappedComponent />);

        const atag = await screen.findByText('Test Link');
        expect(atag.href).toEqual(`${testUrl2}&token=${testToken}`);
    });
});
