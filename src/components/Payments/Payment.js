import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useEffect } from 'react';

const Payment = (props) => {
    const stripe = useStripe();
    const elements = useElements();

    const [paymentError, setPaymentError] = useState(null)
    const [paymentSuccess, setPaymentSuccess] = useState(null)

    useEffect(() =>{
        props.markAsPaid(paymentSuccess)
    },[paymentSuccess])

    const handleSubmit = async (event) => {
        // Block native form submission.
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const cardElement = elements.getElement(CardElement);

        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            setPaymentError(error)
            setPaymentSuccess(null)
        } else {
            setPaymentSuccess(paymentMethod)
            setPaymentError(null)
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <button className="btn btn-danger my-3" type="submit" disabled={!stripe}>
                Pay
            </button>
            {
                paymentError && <p style={{color: "red"}}>{paymentError.message}</p>
            }
            {
                paymentSuccess && <p style={{color: "green"}}>Your payment was successfully submitted</p>
            }
        </form>
    );
};

export default Payment;