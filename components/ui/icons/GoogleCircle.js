import React from 'react'

const GoogleCircle = ({width, height, color="#E25050"}) => {
    return (
        <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="22.5" cy="22.5" r="22" fill="white" stroke="#4285F4"/>
        <path d="M33 23.2339C33 28.9395 29.0287 33 23.1639 33C17.541 33 13 28.5323 13 23C13 17.4677 17.541 13 23.1639 13C25.9016 13 28.2049 13.9879 29.9795 15.6169L27.2131 18.2339C23.5943 14.7984 16.8648 17.379 16.8648 23C16.8648 26.4879 19.6967 29.3145 23.1639 29.3145C27.1885 29.3145 28.6967 26.4758 28.9344 25.004H23.1639V21.5645H32.8402C32.9344 22.0766 33 22.5685 33 23.2339Z" fill="black"/>
        </svg>
    )
}

export default GoogleCircle

