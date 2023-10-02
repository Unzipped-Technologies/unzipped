import React from 'react'
import IconComponent from '../icons/IconComponent';

function MobileSearchBar({ handleFilterOpenClose, setFilter, filter, handleSearch }) {
    return (
        <div style={{ borderTop: "3px solid #F6F7F9", borderBottom: "3px solid #F6F7F9", boxShadow: '0 -1px 0 rgb(246, 247, 249)', top: "76px", position: "fixed", zIndex: "1", background: "white", width: "-webkit-fill-available" }}>
            <div className="d-flex align-items-center justify-content-between mx-3 bg-white">
                <div className='d-flex align-items-center w-100'>
                    <span onClick={() => { handleSearch() }}><IconComponent name="mobileSearchicon" width="20" height="18" viewBox="0 0 20 18" fill="#333333" /></span>
                    <input type='text' value={filter} onChange={(e) => setFilter(e.target.value)} placeholder='SEARCH' style={{ borderBottom: "0", margin: "0 0 0 16px" }} />
                </div>
                <div className='d-flex align-items-center'>
                    <span style={{ color: "#0057FF", fontSize: "12px", marginRight: "17px" }}>SAVE</span>
                    <span onClick={() => { handleFilterOpenClose(true) }}><IconComponent name="mobileFiltericon" width="24" height="24" viewBox="0 0 24 24" fill="black" /></span>
                </div>
            </div>
        </div>
    )
}

export default MobileSearchBar