import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../App';
import OrderList from './OrderList';

const Orders = () => {
    const [loggedIn, setLoggedIn] = useContext(UserContext)
    const [orders, setOrders] = useState([])

    useEffect(() => {
        fetch('http://localhost:8000/ordersList?email='+loggedIn.email)
        .then(res => res.json())
        .then(data => {
            setOrders(data)
        })
    },[])

    const orderList = orders.map(order => order.orderItems)
    

    console.log(orderList)

    return (
        <div className="container my-5">
            <h3 className="mb-5 text-danger">Your Total Order List </h3>
            <div className="row">
                {
                    orderList.map((order, index) => <OrderList index={index} order={order} />)
                }
            </div>
        </div>
    );
};

export default Orders;