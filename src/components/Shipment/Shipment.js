import React from 'react';
import { useForm } from "react-hook-form";

const Shipment = (props) => {


    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data =>{ 
        props.getDeliveryDetails(data)
    };
    const { name, phone, address} = props.deliverDetails


// cart quantity controller
    const subTotal = props.cart.reduce((total, products) => {
        return (total + (products.price * products.quantity))
    }, 0)
    const totalQuantity = props.cart.reduce((total, products) => {
        return (total + products.quantity)
    },0)
    const tax = (subTotal / 100) * 5
    const delivery = totalQuantity * 2
    const grandTotal = tax + delivery + subTotal

    return (
        <div className="container my-5">
            <div className="row">
                <div style={{display: (name && phone && address) ? "none" : "block"}} className="col-md-6">
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
                {/* <div className="col-md-6">

                </div> */}
                <div className="col-md-6">
                    {
                        props.cart.map(item =>
                            <div className="single-checkout-item d-flex justify-content-between align-items-center">
                                <img src={item.img} width="100px" alt="" />
                                <div className="">
                                    <h6>{item.name}</h6>
                                    <p>{item.price}</p>
                                    <div className="">
                                         {
                                             item.stock >= item.quantity ? <button onClick={() => props.checkOutHandler(item._id, (item.quantity + 1))}>+</button>
                                             :
                                             <p>out of stock</p>
                                         }
                                            {item.quantity}
                                        {
                                            item.quantity > 0 ? <button onClick={() => props.checkOutHandler(item._id, (item.quantity - 1))}>-</button>
                                            :
                                            <button>-</button>
                                        }
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    <div className="">
                        <p><span>Sub Total: ${subTotal.toFixed(2)}</span></p>
                        <p><span>Tax: ${tax.toFixed(2)}</span></p>
                        <p><span>Delivery Fee: ${delivery.toFixed(2)}</span></p>
                        <p><span>Total cost: ${grandTotal.toFixed(2)}</span></p>
                        {
                            totalQuantity ? 
                            <button>Check out your product</button>
                            :
                            <button>Nothing to check out</button>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shipment;