import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import keys from "../config/keys";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { createStripeCustomerAndSetupIntent, createPaymentMethod } from "../redux/actions";

const stripePromise = loadStripe(`${keys.stripePublishableKey}`);

const CardDetails = ({userId, email, access_token, stripeSession, createPaymentMethod, createStripeCustomerAndSetupIntent}) => {

  const handleCheckout = async () => {
    const data = {
      email:email,
      userId: userId
    }
    createStripeCustomerAndSetupIntent(data,access_token);
  };
  return (
    <div>
      <button onClick={handleCheckout}>Add Card details</button>
      {Object.keys(stripeSession).length ? (
        <Elements stripe={stripePromise}>
          <CheckoutForm
            sessionId={stripeSession?.clientSecret}
            data={stripeSession?.intent}
            createPaymentMethod={(body)=>createPaymentMethod(body,access_token)}
          />
        </Elements>
      ):null}
    </div>
  );
};

const mapStateToProps = (state) => {
    return {
      access_token: state.Auth.token,
      email: state.Auth.email,
      userId: state.Auth.user._id,
      stripeSession: state.Stripe.session,
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
      createStripeCustomerAndSetupIntent: bindActionCreators(createStripeCustomerAndSetupIntent, dispatch),
      createPaymentMethod: bindActionCreators(createPaymentMethod, dispatch),
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(CardDetails)