import React, { useState } from "react";
import { createContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard/Dashboard";
import DashNavbar from "./components/Dashboard/DashNavbar/DashNavbar";
import MakeAdmin from "./components/Dashboard/MakeAdmin/MakeAdmin";
import OrderList from "./components/Dashboard/OrderList/OrderList";
import Orders from "./components/Dashboard/Orders/Orders";
import Review from "./components/Dashboard/Review/Review";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import PrivateRoute from "./components/Login/PrivateRoute";
import Navbar from "./components/Navbar/Navbar";
import OrderComplete from "./components/OrderComplete/OrderComplete";
import Shipment from "./components/Shipment/Shipment";
import ProductDetails from "./components/Shop/ProductDetails";

export const UserContext = createContext()

function App() {
  const [loggedIn, setLoggedIn] = useState({})
  const [cart, setCart] = useState([])
  const [orderId, setOrderId] = useState(null)
  const [userEmail, setUserEmail] = useState(null)

  // delivery controller
  const [deliveryDetails, setDeliveryDetails] = useState({
    name: null, phone: null, address: null
  })
  const getDeliveryDetails = (data) => {
    setDeliveryDetails(data)
  }

  const getUserEmail = email => {
    setUserEmail(email)
  }

  // orders controller

  const clearCart = () => {
    const orderItems = cart.map(item => {
      return { productId: item._id, productName: item.name, productPrice: item.price, productQuantity: item.quantity }
    })

    const ordersDetailsData = { orderItems, deliveryDetails, email: userEmail, orderTime: new Date()}

    fetch('http://localhost:8000/submitOrders', {
      method: 'POST',
      headers: { "content-type": "application/json" },
      body: JSON.stringify(ordersDetailsData)
    })
      .then(res => res.json())
      .then(data => {
        setOrderId(data)
        console.log(data)
      })
    setCart([])
  }



  // cart controller

  const cartHandler = (data) => {
    const alreadyAdded = cart.find(item => item._id === data._id);
    const newCart = [...cart, data]
    setCart(newCart)
    if (alreadyAdded) {
      const remaining = cart.filter(item => item._id != data)
      setCart(remaining)
    }
    else {
      const newCart = [...cart, data]
      setCart(newCart)
    }
  }

  const checkOutHandler = (productId, productQuantity) => {
    const newCart = cart.map(item => {
      if (item._id == productId) {
        item.quantity = productQuantity
      }
      return item
    })
    const filteredCart = newCart.filter(item => item.quantity > 0)
    setCart(filteredCart)
  }

  
  

  return (
    <UserContext.Provider value={[loggedIn, setLoggedIn]}>
      <Router>
        <Switch>
          <Route path="/home">
            <Home cart={cart} />
          </Route>
          <Route path="/product-details/:productId">
            <Navbar cart={cart} />
            <ProductDetails cart={cart} cartHandler={cartHandler} />
            <Footer />
          </Route>
          <PrivateRoute path="/shipment">
            <Navbar cart={cart} />
            <Shipment cart={cart} checkOutHandler={checkOutHandler} getDeliveryDetails={getDeliveryDetails} deliveryDetails={deliveryDetails} clearCart={clearCart} getUserEmail={getUserEmail} />
            <Footer />
          </PrivateRoute>
          <PrivateRoute path="/orderComplete">
            <Navbar cart={cart} />
            <OrderComplete orderId={orderId} deliveryDetails={deliveryDetails} />
          </PrivateRoute>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/orders">
            <DashNavbar />
            <Orders />
          </Route>
          <Route path="/review">
            <DashNavbar />
            <Review />
          </Route>
          <Route path="/orderList">
            <DashNavbar />
            <OrderList />
          </Route>
          <Route path="/makeAdmin">
            <DashNavbar />
            <MakeAdmin />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
