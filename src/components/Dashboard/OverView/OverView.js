import React, { useState } from 'react';
import { useEffect } from 'react';

const OverView = () => {
    const [products, setProducts] = useState([])
    const [totalOrders, setTotalOrders] = useState([])

    useEffect(() => {
        fetch('https://dry-woodland-65414.herokuapp.com/products')
            .then(res => res.json())
            .then(data => {
                setProducts(data)
            })
    }, [])

    useEffect(() => {
        fetch('https://dry-woodland-65414.herokuapp.com/orders')
        .then(res => res.json())
        .then(data => {
            setTotalOrders(data)
            console.log(data)
        })
    },[])

    return (
        <div className="my-5 container">
            <h2>Overview</h2>
            <div className="row">
                <div className="col-md-3">
                    <div className="bg-success p-4 border-radius-2 text-light my-5 d-flex justify-content-between align-items-center">
                        <h6 className="h4">Total Product</h6>
                        <h6 className="display-6 fw-bolder">{products.length}</h6>
                    </div>
                </div>
                <div className="col-md-3">
                <div className="bg-warning p-4 border-radius-2 text-light my-5 d-flex justify-content-between align-items-center">
                        <h6 className="h4">Total Clients</h6>
                        <h6 className="display-6 fw-bolder">2</h6>
                    </div>
                </div>
                <div className="col-md-3">
                <div className="bg-danger p-4 border-radius-2 text-light my-5 d-flex justify-content-between align-items-center">
                        <h6 className="h4">Total Sells</h6>
                        <h6 className="display-6 fw-bolder">{totalOrders.length}</h6>
                    </div>
                </div>
                <div className="col-md-3">
                <div className="bg-info p-4 border-radius-2 text-light my-5 d-flex justify-content-between align-items-center">
                        <h6 className="h4">Total Income</h6>
                        <h6 className="display-6 fw-bolder">$130</h6>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OverView;