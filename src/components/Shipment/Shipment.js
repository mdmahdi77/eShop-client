import React, { useContext, useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Payment from '../Payments/Payment'
import { UserContext } from '../../App';
import { Link } from 'react-router-dom'

const Shipment = (props) => {

    const [loggedIn, setLoggedIn] = useContext(UserContext)

    const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');
    const [paid, setPaid] = useState(null)
    const markAsPaid = paymentInfo => {
        setPaid(paymentInfo)
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    },[])

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => {
        props.getDeliveryDetails(data)
        props.getUserEmail(loggedIn.email)
    };
    const { name, phone, address } = props.deliveryDetails


    // cart quantity controller
    const subTotal = props.cart.reduce((total, products) => {
        return (total + (products.price * products.quantity))
    }, 0)
    const totalQuantity = props.cart.reduce((total, products) => {
        return (total + products.quantity)
    }, 0)
    const tax = (subTotal / 100) * 5
    const delivery = totalQuantity * 2
    const grandTotal = tax + delivery + subTotal

    return (
        <div className="container my-5">
            <div className="row">
                <div style={{ display: (name && phone && address) ? "none" : "block" }} className="col-md-6">
                    <h1 className="my-5">Delivery Details</h1>
                    <hr />
                    <form className="my-5" onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group my-3">
                            <input className="form-control" type="text" name="name" defaultValue={name} {...register("name", { required: true })} placeholder="Your Name" />
                            {errors.name && <span>This name is required</span>}
                        </div>
                        <div className="form-group my-3">
                            <input className="form-control" type="number" name="phone" defaultValue={phone} {...register("phone", { required: true })} placeholder="Phone" />
                            {errors.phone && <span>This phone is required</span>}
                        </div>
                        <div className="form-group">
                            <textarea className="form-control" name="address" defaultValue={address} {...register("address", { required: true })} placeholder="Address" cols="30" rows="3"></textarea>
                            {errors.address && <span className="error">This field is required</span>}
                        </div>
                        <div className="form-group my-3">
                            <button className="btn form-control bg-danger text-light fw-bold">Save & Continue</button>
                        </div>
                    </form>
                </div>
                <div style={{ display: (name && phone && address) ? "block" : "none" }} className="col-md-6">
                    <h3 className="my-5">Have to complete payment</h3>
                    <hr />
                    <Elements stripe={stripePromise}>
                        <Payment markAsPaid={markAsPaid} />
                    </Elements>
                </div>
                <div className="col-md-6">
                    {
                        props.cart.map(item =>
                            <div className="single-checkout-item d-flex justify-content-between align-items-center mb-2 bg-light rounded p-3">
                                <img src={item.img} width="100px" className="mx-3" alt="" />
                                <div className="">
                                    <h6 className="text-primary">{item.name}</h6>
                                    <h6 className="text-dark">Price: <span className="text-secondary">${item.price}</span></h6>
                                    <div className="">
                                        {
                                            item.stock >= item.quantity ? <button className="btn btn-outline-primary" onClick={() => props.checkOutHandler(item._id, (item.quantity + 1))}>+</button>
                                                :
                                                <p>out of stock</p>
                                        }
                                        <span className="fw-bold mx-3">{item.quantity}</span>
                                        {
                                            item.quantity > 0 ? <button className="btn btn-outline-danger" onClick={() => props.checkOutHandler(item._id, (item.quantity - 1))}>-</button>
                                                :
                                                <button>-</button>
                                        }
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    <div className="mx-3">
                        <div className="d-flex justify-content-between align-items-center">
                            <p className="fw-bolder text-secondary">Total ({totalQuantity}) Product Price:</p>
                            <p className="fw-bolder text-secondary">$ {subTotal.toFixed(2)}</p>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                            <p className="fw-bolder text-secondary">Tax:</p>
                            <p className="fw-bolder text-secondary">$ {tax.toFixed(2)}</p>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                            <p className="fw-bolder text-secondary">Delivery Fee:</p>
                            <p className="fw-bolder text-secondary">$ {delivery.toFixed(2)}</p>
                        </div>
                        <hr />
                        <div className="d-flex justify-content-between align-items-center">
                            <p className="fw-bolder">Total cost:</p>
                            <p className="fw-bolder">$ {grandTotal.toFixed(2)}</p>
                        </div>
                        {
                            totalQuantity ? 
                            paid ?
                            <Link to="/orderComplete">
                                <button className="btn btn-block btn-danger" onClick={ () => props.clearCart()}>Check out your food</button>
                            </Link>
                            :
                                <button disabled className="btn btn-block btn-secondary">Check Out Your Food</button>
                            :
                            <button disabled className="btn btn-block btn-secondary">Nothing to checkout</button>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shipment;