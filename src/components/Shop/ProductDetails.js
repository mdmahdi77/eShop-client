import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Features from './Features';
import Preloader from '../Preloader/Preloader'

const ProductDetails = () => {
    const { productId } = useParams()
    const [productDetails, setProductDetails] = useState([])
    const [quantity, setQuantity] = useState(1)
    const [preloaderVisibility, setPreloaderVisibility] = useState("block")

    useEffect(() => {
        fetch('http://localhost:8000/products')
            .then(res => res.json())
            .then(data => {
                setProductDetails(data)
                setPreloaderVisibility("none")
            })
    }, [])

    const pdDe = productDetails.find(pd => pd._id == productId)

    return (
        <div className="container my-5">
            <Preloader visibility={preloaderVisibility} />
            <div className="row">
                <div className="col-md-4">
                    <img src={pdDe?.img} alt="" />
                    <div className="d-flex justify-content-around align-items-center mt-5">
                        <h3>${pdDe?.price}</h3>
                        <div className="cart-controller">
                            <button onClick={() => setQuantity(quantity <= 1 ? 1 : quantity - 1)}>-</button>
                            {quantity}
                            <button onClick={() => setQuantity(quantity + 1)}>+</button>
                        </div>
                    </div>
                </div>
                <div className="col-md-8">
                    <h4>{pdDe?.name}</h4>
                    <div className="row">
                        <div className="col-md-6">
                            <h5 className="my-3">Product Features</h5>
                            {
                                pdDe?.features.map((fe, index) => <Features index={index} fe={fe} />)
                            }
                        </div>
                        <div className="col-md-6 my-5 py-5">
                            <h6>Stock: {pdDe?.stock}</h6>
                            <h6>Whole Sell: {pdDe?.wholePrice}</h6>
                            <h6>Fixed Price: {pdDe?.price}</h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;