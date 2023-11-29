import React from 'react';

const SvgComponent = ({ name, ...props }) => {
    const svgs = {
        DownArrowVerifyEmail: (
            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="10" viewBox="0 0 11 10" fill="none">
                <path d="M11 5C11 7.76142 8.53757 10 5.5 10C2.46243 10 0 7.76142 0 5C0 2.23858 2.46243 0 5.5 0C8.53757 0 11 2.23858 11 5Z" fill="#4285F4" />
                <path d="M3.80453 4.13326L5.62735 5.90091L7.45017 4.13326C7.63339 3.95558 7.92936 3.95558 8.11258 4.13326C8.2958 4.31093 8.2958 4.59795 8.11258 4.77563L5.95621 6.86674C5.77299 7.04442 5.47701 7.04442 5.29379 6.86674L3.13742 4.77563C2.95419 4.59795 2.95419 4.31093 3.13742 4.13326C3.32064 3.96014 3.62131 3.95558 3.80453 4.13326Z" fill="white" />
            </svg>
        ),
        UpArrowVerifyEmail: (
            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="10" viewBox="0 0 11 10" fill="none">
                <path d="M11 5C11 2.23858 8.53757 0 5.5 0C2.46243 0 0 2.23858 0 5C0 7.76142 2.46243 10 5.5 10C8.53757 10 11 7.76142 11 5Z" fill="#4285F4" />
                <path d="M3.80453 5.86674L5.62735 4.09909L7.45017 5.86674C7.63339 6.04442 7.92936 6.04442 8.11258 5.86674C8.2958 5.68907 8.2958 5.40205 8.11258 5.22437L5.95621 3.13326C5.77299 2.95558 5.47701 2.95558 5.29379 3.13326L3.13742 5.22437C2.95419 5.40205 2.95419 5.68907 3.13742 5.86674C3.32064 6.03986 3.62131 6.04442 3.80453 5.86674Z" fill="white" />
            </svg>
        )
    };

    const Svg = svgs[name] || null;

    return Svg;
};

export default SvgComponent;