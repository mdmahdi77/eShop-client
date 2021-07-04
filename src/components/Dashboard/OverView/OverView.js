import React, { useState } from 'react';
import { useEffect } from 'react';
import ProductQuantity from './ProductQuantity';

const OverView = () => {
    const [products, setProducts] = useState([])
    const [totalOrders, setTotalOrders] = useState([])

    useEffect(() => {
        fetch('http://localhost:8000/products')
            .then(res => res.json())
            .then(data => {
                setProducts(data)
            })
    }, [])

    // useEffect(() => {
    //     fetch('http://localhost:8000/orders')
    //     .then(res => res.json())
    //     .then(data => {
    //         setTotalOrders(data)
    //         // console.log(data)
    //     })
    // },[])


    const all = totalOrders.map(totalOrd => totalOrd.ordersDetailsData.orderItems)

    // const subTotal = all.reduce((total, products) => {
    //     return (total + (products.productPrice * products.productQuantity))
    // }, 0)




    // console.log(all)


    //ordersDetailsData, orderItems, productQuantity

    return (
        <div className="my-5 container">
            <h2>Overview</h2>
            <div className="row">
                <div className="col-md-3">
                    <div className="bg-success p-4 border-radius-2 text-light my-5">
                        <h6>Total Product</h6>
                        <h6>{products.length}</h6>
                    </div>
                </div>
                <div className="col-md-3">
                <div className="bg-warning p-4 border-radius-2 text-light my-5">
                        <h6>Total Clients</h6>
                    </div>
                </div>
                <div className="col-md-3">
                <div className="bg-danger p-4 border-radius-2 text-light my-5">
                        <h6>Total Sells</h6>
                        {
                            all.map(item => <ProductQuantity quantity={item} />)
                        }
                    </div>
                </div>
                <div className="col-md-3">
                <div className="bg-info p-4 border-radius-2 text-light my-5">
                        <h6>Total Income</h6>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OverView;