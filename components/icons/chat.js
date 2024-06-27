import React from 'react'

const Chat = ({ width = '18', height = '18', color = 'none' }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 18 18" fill={color}>
      <g mask="url(#mask0_4186_4785)">
        <path
          d="M1.5 16.5V3C1.5 2.5875 1.64688 2.23438 1.94063 1.94063C2.23438 1.64688 2.5875 1.5 3 1.5H15C15.4125 1.5 15.7656 1.64688 16.0594 1.94063C16.3531 2.23438 16.5 2.5875 16.5 3V12C16.5 12.4125 16.3531 12.7656 16.0594 13.0594C15.7656 13.3531 15.4125 13.5 15 13.5H4.5L1.5 16.5ZM3.8625 12H15V3H3V12.8438L3.8625 12Z"
          fill="#0057FF"
        />
      </g>
    </svg>
  )
}

export default Chat
