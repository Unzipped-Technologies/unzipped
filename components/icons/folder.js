import React from 'react'

const FolderIcon = ({width, height, color="#E25050"}) => {
    return (
        <svg width={width} height={height} viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M98.89 98.758l-.107-52.202-38.339.064-13.096-13.394H28.755v65.532h70.136z" stroke={color} stroke-width="4" stroke-miterlimit="10"/>
            <path d="M51.459 37.115h39.903v9.695" stroke={color} stroke-width="4"/><path d="M41.25 80.314h43.852M41.25 68.905h43.852" stroke={color} stroke-width="4" stroke-miterlimit="10"/>
        </svg>
    )
}

export default FolderIcon

