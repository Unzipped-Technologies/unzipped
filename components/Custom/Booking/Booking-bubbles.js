import React, { useState } from 'react';

const BookingBubbles = ({ change }) => {
    const [focus, setFocus] = useState('CAR CARE');

    const services = [
        'CAR CARE',
        'CAR SERVICE',
        'CAR REPAIR'
    ]

    const displayClick = (e) => {
        change(e)
        setFocus(e)
    }

    return (
        <React.Fragment>
            <div className="service-headers-2">
                {services.map((item, index) => {
                    return (
                    <div className={focus !== item ? "header-container" : "header-container-2"} onClick={ () => displayClick(item)} key={index}>
                        <h6 className="title-service-type">{item}</h6>
                    </div>
                    )
                })}
            </div>
        </React.Fragment>
    )
}

export default BookingBubbles;