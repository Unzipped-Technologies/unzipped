import React from 'react'

const alertDoneIcon = ({ width, height, color = 'none' }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 5 4" fill={color} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4.44259 0L0.557588 0C0.261338 0 0.0813379 0.32625 0.242588 0.5775L2.18509 3.63C2.33134 3.8625 2.66884 3.8625 2.81884 3.63L4.75759 0.5775C4.91884 0.32625 4.73884 0 4.44259 0Z"
        fill="current"
      />
    </svg>
  )
}

export default alertDoneIcon
