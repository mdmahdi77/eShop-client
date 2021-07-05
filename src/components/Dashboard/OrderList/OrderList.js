import React, { useEffect } from 'react';
import { useState } from 'react';
import OrderListTable from './OrderListTable';

const OrderList = () => {
    const [totalOrders, setTotalOrders] = useState([])

    useEffect( () => {
        fetch('https://dry-woodland-65414.herokuapp.com/orders')
        .then(res => res.json())
        .then(data => {
            setTotalOrders(data)
            console.log(data)
        })
    },[])

    const orderList = totalOrders.map(order => order.orderItems)
    const email = totalOrders.map(order => order.email)
    
    return (
        <div className="container my-5">
            <h3 className="mb-5 text-danger">Total Clients Orders</h3>
            <div className="row">
                {
                    orderList.map(orders => <OrderListTable email={email} orders={orders} />)
                }
            </div>
        </div>
    );
};

export default OrderList;