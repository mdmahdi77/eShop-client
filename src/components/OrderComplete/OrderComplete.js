import React from 'react';
import success from '../../images/success.gif'

const OrderComplete = (props) => {
    return (
        <div className="container my-5 py-5 text-center">
            <div className="row">
                <div className="col-12">
                    <img src={success} width="300px" alt="" />
                    <h3 className="text-success">Your order completed successfully</h3>
                    <h5 className="text-info">Your Address</h5>
                    <p className="text-dark fw-bold">{props.deliveryDetails.address}</p>
                </div>
            </div>
        </div>
    );
};

export default OrderComplete;