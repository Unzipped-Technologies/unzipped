import React from 'react';

const CircleLightning = () => {
    return (
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="15" cy="15" r="14.5" stroke="#DE4E4E"/>
            {/* Removed style attribute and used camelCase for maskUnits */}
            <mask id="mask0_5086_56" maskUnits="userSpaceOnUse" x="7" y="7" width="16" height="16">
                <rect x="7" y="7" width="16" height="16" fill="#D9D9D9"/>
            </mask>
            <g mask="url(#mask0_5086_56)">
                <path d="M14.0332 19.1334L17.4832 15H14.8165L15.2998 11.2167L12.2165 15.6667H14.5332L14.0332 19.1334ZM12.3332 21.6667L12.9998 17H9.6665L15.6665 8.33337H16.9998L16.3332 13.6667H20.3332L13.6665 21.6667H12.3332Z" fill="#E05959"/>
            </g>
        </svg>
    )
}

export default CircleLightning;
