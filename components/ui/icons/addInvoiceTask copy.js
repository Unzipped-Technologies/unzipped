import React from 'react'

function AddInvoiceTask({ width = '21', height = '22', color = '#8EDE64' }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 21 22" fill="none">
      <path
        d="M11.5418 6.03516H9.4585V10.0977H5.29183V12.1289H9.4585V16.1914H11.5418V12.1289H15.7085V10.0977H11.5418V6.03516ZM10.5002 0.957031C4.75016 0.957031 0.0834961 5.50703 0.0834961 11.1133C0.0834961 16.7195 4.75016 21.2695 10.5002 21.2695C16.2502 21.2695 20.9168 16.7195 20.9168 11.1133C20.9168 5.50703 16.2502 0.957031 10.5002 0.957031ZM10.5002 19.2383C5.90641 19.2383 2.16683 15.5922 2.16683 11.1133C2.16683 6.63437 5.90641 2.98828 10.5002 2.98828C15.0939 2.98828 18.8335 6.63437 18.8335 11.1133C18.8335 15.5922 15.0939 19.2383 10.5002 19.2383Z"
        fill={color}
      />
    </svg>
  )
}

export default AddInvoiceTask