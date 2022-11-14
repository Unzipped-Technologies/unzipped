import React from 'react';
import Form from '../../payment/form';
import FormMobile from '../../payment/form-mobile';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormMobiletwo from '../../payment/form-mobile-2';

const PaymentForm = ({paymentFocus, setPaymentFocus, scrollView, changePaymentFocus, valid}) => {

    return (
        <React.Fragment>
            <div className={paymentFocus === 'credit' ? "payment-info-1" : "payment-info"}>
                <div className="payment-title-container">
                <p className="credit-title">CREDIT CARD OPTIONS</p>
                </div>
                {!paymentFocus &&
                    <p style={{float: 'left', width: '100%', paddingLeft: '10px', color: 'red'}}>Select a payment method...</p>
                }
                <div className="payment-box-content">
                <div className={paymentFocus === 'credit' ? "payment-box-1" : "payment-box"} onClick={() => setPaymentFocus('credit')}>
                    <p className="credit-desc">Credit/ Debit Card</p>
                    <div className="img-container">
                        <img src={'/img/creditOptions.png'} alt="" id="debit-picture" />
                    </div>
                    {paymentFocus === 'verified' &&
                        <img src={"/img/verifiedCheck.png"} alt='' className="img-check-cart"/>
                    }
                    {paymentFocus === 'loading' &&
                        <CircularProgress className="load-check-cart"/>
                    }
                </div>
                </div>
                {paymentFocus === 'credit' &&
                <div className="padding-bottom payment-form">
                    <div id="form-desktop">
                    {valid &&
                    <p style={{float: 'left', width: '100%', paddingLeft: '10px', color: 'red'}}>Enter valid credit/ debit card...</p>
                    }
                    <Form changeFocus={changePaymentFocus} scrollView={scrollView} />
                    </div>
                    <div id="form-mobile">
                    <FormMobile changeFocus={changePaymentFocus} scrollView={scrollView} />
                    </div>
                    <div id="form-mobile-2">
                    <FormMobiletwo changeFocus={changePaymentFocus} scrollView={scrollView} />
                    </div>
                </div>
                }
            </div>
        </React.Fragment>
    )
}

export default PaymentForm;