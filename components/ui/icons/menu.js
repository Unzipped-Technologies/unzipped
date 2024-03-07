import React from 'react'

const alertDoneIcon = ({ width, height, color = '#E25050' }) => {
  return (
    <svg
      width={width ? width : '20'}
      height={height ? height : '14'}
      viewBox="0 0 20 14"
      fill={color ? color : 'black'}
      xmlns="http://www.w3.org/2000/svg">
      <path
        fill={color}
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M0 1.21459C0 0.603119 0.495697 0.107422 1.10717 0.107422H18.8928C19.5043 0.107422 20 0.603119 20 1.21459C20 1.82606 19.5043 2.32176 18.8928 2.32176H1.10717C0.495697 2.32176 0 1.82606 0 1.21459Z"
      />
      <path
        fill={color}
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M0 6.75072C0 6.13925 0.495697 5.64355 1.10717 5.64355H18.8928C19.5043 5.64355 20 6.13925 20 6.75072C20 7.3622 19.5043 7.85789 18.8928 7.85789H1.10717C0.495697 7.85789 0 7.3622 0 6.75072Z"
      />
      <path
        fill={color}
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M0 12.2859C0 11.6744 0.495697 11.1787 1.10717 11.1787H18.8928C19.5043 11.1787 20 11.6744 20 12.2859C20 12.8974 19.5043 13.3931 18.8928 13.3931H1.10717C0.495697 13.3931 0 12.8974 0 12.2859Z"
      />
    </svg>
  )
}

export default alertDoneIcon
