import React from 'react'

const backArrow = ({ width, height, color = '#000000' }) => {
  return (
    <svg width="14" height="20" viewBox="0 0 17 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M16.8058 3.48211L14.2841 0.974609L0.273315 14.9996L14.2983 29.0246L16.8058 26.5171L5.28832 14.9996L16.8058 3.48211Z"
        fill={color}
      />
    </svg>
  )
}

export default backArrow
