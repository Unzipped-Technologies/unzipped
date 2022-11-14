import React, {useEffect, useState} from 'react'


const Invoice = ({orderHistory, index, date, discount, vehicle, status}) => {

    const setDiscount = (price) => {
        let disc;
        if (discount) {
            disc = price - (discount * price)
        } else { disc = 0.00}
        return disc.toFixed(2);
    }

    return (
        <React.Fragment>
            <div className="invoice-order">
                <div className="invoice-left">
                    <p className="product-subtext" id="mobile-name">{orderHistory.name}</p>
                    <div className="left-product-img-container">
                    <img src={`/img/${orderHistory.image[0]}`} alt="" className="product-image"/>
                    <div className="below-img-info">
                        <p id="cost-invoice">{orderHistory.price > 1 ? `$${orderHistory.price}.00` : `$${orderHistory.price.toFixed(2)}`}</p>
                        <p className="product-subtext">Qty: {orderHistory.quantity}</p>
                        <p className="product-subtext">w/Discount: <span>${setDiscount(orderHistory.price)}</span></p>
                    </div>
                    </div>
                    <div className="right-product-img-container">
                    <div className="product-title-invoice">
                        <p className="product-subtext" id="desk-name">{orderHistory.name}</p>
                        <p>{vehicle}</p>
                    </div>
                    <div className="product-title-invoice">
                        <p className="product-subtext">SERVICE DATE</p>
                        <p>{date}</p>
                    </div>
                    </div>
                </div>
                <div className="invoice-right">
                    <div className="invoice-left-box">
                    <p className="status-mobile">Status:</p>
                    <h6 className="left-status">
                        {status}
                    </h6>
                    </div>
                    <div className="track-return-button">
                        <button className="tracker-btn">TRACK</button>
                        <button className="tracker-btn">CUSTOMER SUPPORT</button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Invoice;