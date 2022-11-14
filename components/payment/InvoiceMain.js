import React, {useState, useRef, useEffect} from 'react';
import InvoiceItem from './InvoiceItem';
import CircularProgress from '@material-ui/core/CircularProgress';

const Invoice = ({index, item, changeFocus, email, loading, focus, phone, discount}) => {
    const [number, setNumber] = useState(index);
    const [vehicle, setVehicle] = useState(`${item.Vehicle.year} ${item.Vehicle.make} ${item.Vehicle.model}`);
    const [status, setStatus] = useState(item.status);
    const wrapperRef = useRef(null);

    const splitAddress = (item, num) => {
        let address = item.split(', ');
        return address[num];
    }

    // useEffect(() => {
    //     function handleClickOutside(event) {
    //         if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
    //             changeFocus(false);
    //         }
    //     }
    //     // Bind the event listener
    //     document.addEventListener("mousedown", handleClickOutside);
    //     return () => {
    //         // Unbind the event listener on clean up
    //         document.removeEventListener("mousedown", handleClickOutside);
    //     };
    // }, [wrapperRef]);
    useEffect(() => {
        console.log(phone)
    }, [])
    return (
        <React.Fragment>
                <div className="invoice-box" id={`invoicebox-${index}`} key={index}>
                    <div className="invoice-title">
                        <div className="order-number-i">
                            <h6 className="titles-invoice">ORDER NUMBER</h6>
                            <p className="sub-invoice">{item.orderNumber}</p>
                        </div>
                        <div className="order-number-i">
                            <h6 className="titles-invoice">ORDER DATE</h6>
                            <p className="sub-invoice">{item.orderDate}</p>
                        </div>
                        <div className="order-number-i">
                            <h6 className="titles-invoice">ORDER TOTAL</h6>
                            <p className="sub-invoice">{item.total > 1 ? `$${item.total}.00` : `$${item.total.toFixed(2)}`}</p>
                        </div>
                        <div className="view-invoice-button">
                            <button className="invoice-btn" onClick={() => changeFocus(index)}>VIEW INVOICE</button>
                        </div>
                    </div>
                    <div className="user-i-container">
                    <div className="invoice-user">
                        <div className="invoice-pickup-l">
                            <p className="titles-invoice">PICKUP LOCATION:</p>
                            <p className="titles-invoice">{item.location.name}</p>
                            <p className="sub-invoice-2">{splitAddress(item.location.address, 0)}</p>
                            <p className="sub-invoice-3">{splitAddress(item.location.address, 1) ? `${splitAddress(item.location.address, 1)} ${splitAddress(item.location.address, 2) ? splitAddress(item.location.address, 2) : ''}` : ""}</p>
                        </div>
                        <div className="phone-invoice">
                            <p className="titles-invoice">Phone</p>
                            <p className="sub-invoice">{item.phone}</p>
                        </div>
                        <div id="email-invoice">
                            <p className="titles-invoice">Email</p>
                            <p className="sub-invoice">{email}</p>
                        </div>
                    </div>
                    </div>
                    {focus === index &&
                    <>
                    {loading &&
                    <CircularProgress />
                    }
                    {!loading &&
                    <>
                    {item.services.map((order, index) => {
                        return (
                        <div key={index} style={{width: '100%'}}>
                        <InvoiceItem orderHistory={order} index={index} date={item.date} discount={item.promo.discount ? item.promo.discount : 1} vehicle={vehicle} status={status}/>
                        </div>
                    )})}
                    </>
                    }
                    </>
                    }
                </div>
        </React.Fragment>
    )
}

export default Invoice;