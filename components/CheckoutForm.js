import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const CheckoutForm = ({ sessionId, data, createPaymentMethod }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { setupIntent, error } = await stripe.confirmCardSetup(sessionId, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (error) {
    } else if(setupIntent?.status === 'succeeded'){
        setupIntent.customer = data.metadata.customer
      const body = {
        paymentMethod: setupIntent,
        data: data.metadata
      }
      createPaymentMethod(body)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Confirm Card Details
      </button>
    </form>
  );
};

export default CheckoutForm;