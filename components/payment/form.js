import React, { useState, useEffect } from "react";
import keys from '../../config/keys';
import {
  Elements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  CardElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import {connect, useDispatch} from 'react-redux';
import { orderDetail } from '../../redux/actions';
import { loadStripe } from "@stripe/stripe-js";
// import "./Payment.scss";


const Payment = ({changeFocus}) => {
  const stripe = loadStripe(
    // `${process.env.STRIPE_PUBLISHABLE_KEY}`
    'pk_live_51IBOwxJBXTGShTxE1q9q4wSWoLuQbFZMNMVvETlX8mg3ovTE6bTjgOWZ77uhcpUG2qaS2hc6LUoVJVEeevv6HydV00xEfuZBHD'
  );
  return (
    <Elements stripe={stripe}>
      <CheckoutForm changeFocus={changeFocus}/>
    </Elements>
  );
};
function CheckoutForm({changeFocus}) {
    const [isPaymentLoading, setPaymentLoading] = useState(false);
    // const [orderDetails, setOrderDetails] = useState({});
    const stripe = useStripe();
    const dispatch = useDispatch();
    const elements = useElements();

    const handleSubmit = async (event) => {
        // Block native form submission.
        event.preventDefault();
        setPaymentLoading(true);
        if (!stripe || !elements) {
          // Stripe.js has not loaded yet. Make sure to disable
          // form submission until Stripe.js has loaded.
          return;
        }
    
        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const cardElement = elements.getElement(CardNumberElement);
    
        // Use your card Element with other Stripe.js APIs
        const {error, paymentMethod} = await stripe.createPaymentMethod({
          type: 'card',
          card: cardElement,
          billing_details: {
              name: document.getElementById("inputFirstName").value + ' ' + document.getElementById("inputLastName").value,
              address: {
                  postal_code: document.getElementById('inputZip').value
              },
          phone: document.getElementById('inputPhone').value
          }
        })
    
        if (error) {
          console.log('[error]', error);
          setPaymentLoading(false);
          changeFocus('credit')
        } else {
          console.log('[PaymentMethod]', paymentMethod);
          dispatch(orderDetail({
              ...paymentMethod
          }))
          changeFocus('verified')
        }
      };

      const scrollView = (id) => {
        document.getElementById(id).scrollIntoView();
    }


    // useEffect(() => {
    //     console.log(orderDetails)
    // }, [orderDetails])

    return (
      <div id="sb">
        <form onSubmit={handleSubmit}>
        <div style={{
            borderRadius: '0px', 
            border: '1px darkgray solid', 
            overflow: 'hidden', 
            display: 'grid', 
            gridTemplateColumns: '3fr 3fr', 
            justifyItems: 'center',
            height: '47px'
            }}>
        <div style={{
            borderRight: '1px solid darkgray',
            width: '100%'
        }}>
        <input 
            placeholder="First" 
            id="inputFirstName"
            required 
            onClick={() => scrollView("sb")}
            style={{
                width:'95%', 
                position: 'relative',
                left: '4px',
                           
            }}/>
        </div>
        <input 
            placeholder="Last" 
            id="inputLastName"
            required 
            style={{
                width:'95%',
                position: 'relative',
                left: '0px',
                }}/>
        </div>
        <div style={{
            marginTop: '10px',
            border: '1px solid darkgray',
            borderRadius: '0px', 
            height: '47px',
            display: 'grid',
            alignItems: 'center'
        }}>
        <div style={{
            width: '98%',
            position: 'relative',
            marginLeft: '10px',
        }}>
        <CardNumberElement 
            options={{
                style: {
                    fontSize: '16px',
                    float: 'left',
                    '::placeholder': {
                        color: 'lightgrey',
                    },
                    invalid: {
                        color: '#9e2146',
                    },
                },
            }}
        />
        </div>
        </div>
        <div style={{
            display: 'grid',
            alignItems: 'center',
            gridTemplateColumns: '1fr 1fr',
            height: '47px',
            border: '1px solid darkgray',
            borderRadius: '0px', 
            marginTop: '10px',
        }}>
        <div style={{
            height: '100%',
            borderRight: '1px solid darkgray',
            alignItems: 'center',

        }}>
        <div style={{
            marginTop: '15px',
            marginLeft: '10px',
        }}>
        <CardExpiryElement 
            options={{
                style: {
                    fontSize: '16px',
                    float: 'left',
                    height: '47px',
                    // width: '90%',
                    position: 'relative',
                    left: '10px',
                    '::placeholder': {
                        color: 'lightgray',
                    },
                    invalid: {
                        color: '#9e2146',
                    },
                },
            }}
        />
        </div>
        </div>
        <div style={{
            marginLeft: '10px',
        }}>
        <CardCvcElement 
            options={{
                style: {
                    fontSize: '16px',
                    float: 'left',
                    height: '47px',
                    // width: '90%',
                    position: 'relative',
                    left: '10px',
                    '::placeholder': {
                        color: 'lightgray',
                    },
                    invalid: {
                        color: '#9e2146',
                    },
                },
            }}
        />
        </div>
        </div>
        <div style={{
            display: 'grid',
            justifyItems: 'center',
            gridTemplateColumns: '1fr',
            height: '47px',
            overflow: 'hidden',
            border: '1px solid darkgray',
            borderRadius: '0px', 
            marginTop: '10px',
        }}>
        <div style={{
            position: 'relative',
            width: '100%',
            left: '10px',
        }}>
        <input placeholder="zip-code" id="inputZip" required/>
        </div>
        </div>
        <div style={{
            display: 'grid',
            justifyItems: 'center',
            gridTemplateColumns: '1fr',
            height: '47px',
            overflow: 'hidden',
            border: '1px solid darkgray',
            borderRadius: '0px', 
            marginTop: '10px',
        }}>
        <div style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            left: '10px',
        }}>
        <input 
            type="phone" 
            placeholder="phone"  
            id="inputPhone"           
            style={{
                width:'103%', 
                height: '110%',
                position: 'relative',
                top: '-3px',
                left: '-12px',  
                paddingLeft: '10px'        
            }}
            required />
        </div>
        </div>
        <button 
            type="submit" 
            disabled={!stripe}
            style={{
                float: 'right',
                marginTop: '10px',
            }}
            >
            Save
        </button>
        </form>
      </div>
    );
  }

// const mapStateToProps = (state) => {
//     return {
//         location: state.Booking.location,
//         cart: state.Booking.cart,
//         date: state.Booking.date,
//         time: state.Booking.time,
//     }
// }

export default connect(null, { orderDetail })(Payment);