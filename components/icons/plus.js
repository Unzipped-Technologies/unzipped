import React from 'react'

const Plus = ({ width = '18', height = '18', color = 'none' }) => {
  const maskStyle = { maskType: 'alpha' }
  const rectStyle = { fill: '#D9D9D9' }
  const pathStyle = { fill: '#5E6062' }

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 17 17" fill={color}>
      <mask id="mask0_4186_4688" style={maskStyle} maskUnits="userSpaceOnUse" x="0" y="0" width="17" height="17">
        <rect width="17" height="17" style={rectStyle} />
      </mask>
      <g mask="url(#mask0_4186_4688)">
        <path
          d="M8.25 8.66667H4V7.25H8.25V3H9.66667V7.25H13.9167V8.66667H9.66667V12.9167H8.25V8.66667Z"
          style={pathStyle}
        />
      </g>
    </svg>
  )
}

export default Plus
