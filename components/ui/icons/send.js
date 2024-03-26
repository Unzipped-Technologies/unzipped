import React from 'react'

const Send = ({ width = '26', height = '23', color = '#007FED' }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 26 23" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0.0123809 23L26 11.5L0.0123809 0L0 8.94444L18.5714 11.5L0 14.0556L0.0123809 23Z" fill={color} />
    </svg>
  )
}

export default Send
