import React from 'react'

const DownWideIcon = ({ width = '16', height = '16', color = '#999999' }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 29 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4.44407 0.755125L14.513 10.7718L24.5819 0.755125C25.594 -0.251708 27.2289 -0.251708 28.2409 0.755125C29.253 1.76196 29.253 3.38838 28.2409 4.39522L16.3295 16.2449C15.3174 17.2517 13.6825 17.2517 12.6705 16.2449L0.75906 4.39522C-0.25302 3.38838 -0.25302 1.76196 0.75906 0.755125C1.77114 -0.225892 3.43199 -0.251708 4.44407 0.755125Z"
        fill={color}
      />
    </svg>
  )
}

export default DownWideIcon
