import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Shipment from "./components/Shipment/Shipment";
import ProductDetails from "./components/Shop/ProductDetails";

function App() {


// delivery controll
  const [deliverDetails, setDeliveryDetails] = useState({
    name: null, phone: null, address: null
  })
  const getDeliveryDetails = (data) => {
    setDeliveryDetails(data)
  }


// cart controller
  const [cart, setCart] = useState([])

  const cartHandler = (data) => {
    const alreadyAdded = cart.find(item => item._id === data._id);
    const newCart = [...cart, data]
    setCart(newCart)
    if(alreadyAdded){
      const remaining = cart.filter(item => item._id != data)
      setCart(remaining)
    }
    else{
      const newCart = [...cart, data]
      setCart(newCart)
    }
  }

  const checkOutHandler = (productId, productQuantity) => {
    const newCart = cart.map(item => {
      if(item._id == productId){
        item.quantity = productQuantity
      }
      return item
    })
    const filteredCart = newCart.filter(item => item.quantity > 0)
    setCart(filteredCart)
  }

  return (
    <Router>
      <Switch>
        <Route path="/home">
          <Home cart={cart} />
        </Route>
        <Route path="/product-details/:productId">
          <Navbar cart={cart} />
          <ProductDetails cart={cart} cartHandler={cartHandler} />
        </Route>
        <Route path="/shipment">
          <Navbar cart={cart} />
          <Shipment cart={cart} checkOutHandler={checkOutHandler} getDeliveryDetails={getDeliveryDetails} deliverDetails={deliverDetails} />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
