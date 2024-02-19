import React, { useState } from 'react';
import * as Icons from '@ant-design/icons/lib/icons';
import { FontIconsArray } from '../../utils/FontIcons';

const IconPicker = ({
    setListIcon,
    isIconDropdownOpen,
    setIsIconDropdownOpen,
    setIsIconSelected,
    isIconSelected,
    filteredIcons,
    setFilterdIcons
}) => {

    const handleIconSearch = event => {
        setTimeout(() => {
            const filterIconsArr = FontIconsArray
                .filter(icon => icon.toLowerCase().includes(event.target.value));
            setFilterdIcons(filterIconsArr);
        }, 1200)
    }

    const handleIconSelect = (icon) => {
        setListIcon(icon);
        setIsIconDropdownOpen(!isIconDropdownOpen);
        setIsIconSelected(!isIconSelected)
    }

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            {!isIconSelected && (<div>
                <input placeholder='Search Icon' type='text' onKeyDown={handleIconSearch} style={{ position: "relative" }} />
            </div>)}

            {!isIconDropdownOpen && (<div style={{
                width: '100%',
                height: "200px",
                padding: "10px",
                display: "flex",
                background: "#FAFBFB",
                borderRadius: "10px",
                position: 'absolute',
                zIndex: 10,
                top: "245px"
            }}>
                <div style={{
                    width: '100%',
                    height: '100%',
                    overflowY: "scroll",
                    flexWrap: "wrap",
                    display: "flex",
                }}>
                    {filteredIcons && filteredIcons.length > 0 ? (
                        <>
                            <div style={{ width: '100%', height: '100%', overflowY: "scroll", flexWrap: "wrap", display: "flex", }}>

                                {filteredIcons.map((icon) => {

                                    const Icon = Icons[icon];
                                    return (
                                        <div key={icon} style={{ fontSize: "28px", paddingLeft: "5px", color: "#1C1C1C" }}>
                                            <Icon onClick={() => { handleIconSelect(icon) }} />
                                        </div>
                                    );
                                })}
                            </div>
                        </>
                    ) : (
                        <>
                            {/* <div style={{ width: '100%', height: '100%', overflowY: "scroll", flexWrap: "wrap", display: "flex", }}> */}

                            {Object.keys(Icons).map((icon) => {
                                const Icon = Icons[icon];
                                return (
                                    <div key={icon} style={{ fontSize: "30px", paddingLeft: "10px", color: "#1C1C1C" }}>
                                        <Icon onClick={() => { handleIconSelect(icon) }} />
                                    </div>
                                );
                            })
                            }
                            {/* </div> */}
                        </>
                    )}

                </div>
            </div >)}

        </div>

    )
}

export default IconPicker;