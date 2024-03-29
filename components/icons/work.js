import React from 'react'

const WorkIcon = ({ width, height, color = '#E25050' }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M94.867 70.112V95.22H32.885V54.26h61.982v15.851zM63.876 41.076c6.007 0 10.877-4.87 10.877-10.877 0-6.007-4.87-10.877-10.877-10.877C57.87 19.322 53 24.192 53 30.2c0 6.007 4.87 10.877 10.877 10.877zM46.794 54.975a19.345 19.345 0 0134.208 0"
        stroke={color}
        strokeWidth="4"
        strokeMiterlimit="10"
      />
      <path d="M63.893 94.809v11.937m-9.677 0h19.32" stroke={color} strokeWidth="4" />
      <path d="M63.876 77.221a2.29 2.29 0 100-4.58 2.29 2.29 0 000 4.58z" fill={color} />
    </svg>
  )
}

export default WorkIcon
