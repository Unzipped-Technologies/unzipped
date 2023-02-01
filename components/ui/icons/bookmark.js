import React from 'react'

const BookmarkIcon = ({width, height, color="#E25050"}) => {
    return (
        <svg width={width} height={height} viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M95.02 103.17V24.91H32.98v78.26L64 85.33l31.02 17.84z" stroke={color} stroke-width="4" stroke-miterlimit="10"/><path d="M64.55 40.6l5.61 10.29 11.51 2.16-8.05 8.51 1.51 11.61-10.58-5.02-10.58 5.02 1.51-11.61-8.05-8.51 11.51-2.16 5.61-10.29z" stroke={color} stroke-width="4" stroke-miterlimit="10" stroke-linecap="round"/>
        </svg>
    )
}

export default BookmarkIcon

