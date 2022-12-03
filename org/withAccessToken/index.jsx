import React from 'react';
import useAccessToken from 'utils/useAccessToken';

const withAccessToken = Component => {
    return function AccessTokenWrapper(props) {
        const accessToken = useAccessToken();
        const isString = value => typeof value === 'string' || value instanceof String;

        const addAccessTokenToUrl = (url = '') => {
            if (!isString(url)) return url;
            const hasQueryParams = url.includes('?');
            const tokenQueryParam = `token=${accessToken}`;
            const checkAndRemoveTrailingSlash = url => (url.slice(-1) === '/' ? url.slice(0, -1) : url);

            return hasQueryParams
                ? `${url}&${tokenQueryParam}`
                : `${checkAndRemoveTrailingSlash(url)}?${tokenQueryParam}`;
        };

        return accessToken ? (
            <Component {...props} accessToken={accessToken} addAccessTokenToUrl={addAccessTokenToUrl} />
        ) : null;
    };
};

export default withAccessToken;
