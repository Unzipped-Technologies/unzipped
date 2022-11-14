import React from 'react';

const SectionTwo = ({data}) => {
    const titles = ["Book", "Drop", "enjoy."]

    return (
        <div className="section-two-container">
            <div className="image-map">
            {data.map((item, index) => (
                <div className="image-bigger-container" key={index}>
                <div className="image-items-s">
                <img src={`/img/${item.image}`} alt="" className="display-m-ages"/>
                <p className={index !== 2 ? "call-to-action" : "call-to-action-alt"}>{titles[index]}</p>
                </div>
                <p className="image-description-m">{item.text}</p>
                </div>
            ))}
            <div className="horizontal-line" id="line-side-1"></div>
            <div className="horizontal-line" id="line-side-2"></div>
            </div>
        </div>
    )
}

export default SectionTwo;