import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Features from './Features';
import Preloader from '../Preloader/Preloader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartArrowDown, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const ProductDetails = (props) => {
    const { productId } = useParams()
    const [productDetails, setProductDetails] = useState([])
    const [quantity, setQuantity] = useState(1)
    const [preloaderVisibility, setPreloaderVisibility] = useState("block")
    const [isSuccess, setIsSuccess] = useState(false)
    // const [notSuccess, setNotSuccess] = useState(true)

    useEffect(() => {
        fetch('http://localhost:8000/products')
            .then(res => res.json())
            .then(data => {
                setProductDetails(data)
                setPreloaderVisibility("none")
            })
    }, [])

    useEffect(() => {
        window.scrollTo(0, 0)
    },[])

    const pdDe = productDetails.find(pd => pd._id == productId)

    const finalCartHandler = (pdDe) => {
        pdDe.quantity = quantity
        props.cartHandler(pdDe)
        setIsSuccess(true)
    }
    console.log(pdDe)
    if (isSuccess) {
        setTimeout(() => setIsSuccess(false), 2500)
    }

    return (
        <div className="container my-5">
            <Preloader visibility={preloaderVisibility} />
            <div className="row">
                <div className="col-md-4">
                    <img className="img-fluid" src={pdDe?.img} alt="" />
                    <div className="d-flex justify-content-between align-items-center mt-5">
                        <h3 className="text-dark">Price: <span className="text-secondary">${pdDe?.price}</span></h3>
                        <div className="cart-controller">
                            <button className="btn btn-outline-danger mx-3" onClick={() => setQuantity(quantity <= 1 ? 1 : quantity - 1)}>-</button>
                            <span className="fw-bold">{quantity}</span>
                            {
                                pdDe?.stock >= quantity ? <button className="btn btn-outline-primary mx-3" onClick={() => setQuantity(quantity + 1)}>+</button>
                                    :
                                    <p className="text-warning fw-bold">out of stock</p>
                            }
                        </div>
                    </div>
                    <div className="mt-5">
                        <button className="btn btn-outline-danger" onClick={() => finalCartHandler(pdDe)}><FontAwesomeIcon icon={faCartArrowDown} /> / Add</button>
                    </div>
                    <div className="">
                        {
                            isSuccess && <p className="text-success ml-3 success-mgs"><FontAwesomeIcon icon={faCheckCircle} />  Item added to Cart</p>
                        }
                        {/* {
                            notSuccess && <p className="text-danger ml-3 success-mgs"><FontAwesomeIcon icon={faCheckCircle} />  Item already added to Cart</p>
                        } */}
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="bg-light rounded p-3">
                        <h4 className="text-primary">{pdDe?.name}</h4>
                        <div className="row">
                            <div className="col-md-6">
                                <h5 className="my-3 text-info fw-bold">Product Features</h5>
                                {
                                    pdDe?.features.map((fe, index) => <Features index={index} fe={fe} />)
                                }
                            </div>
                            <div className="col-md-6 my-5 text-center">
                                <h6 className="text-dark">Stock: <span className="text-secondary mx-3">{pdDe?.stock}</span></h6>
                                <h6 className="text-dark">Whole Sell: <span className="text-secondary mx-3">${pdDe?.wholePrice}</span></h6>
                                <h6 className="text-dark">Fixed Price: <span className="text-secondary mx-3">${pdDe?.price}</span></h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;