import React from 'react';
import { Link } from 'react-router-dom'
import './Shop.css'

const ProductItem = (props) => {
    const { name, img, price, _id } = props.filPro
    return (
        <div className="col-md-4">
            <div className="container-fluid text-center">
                <div className="product-item">
                    <img className="text-center" src={img} alt="" />
                    <div className="product-body">
                        <Link to={"/product-details/"+_id}><h6 className="product-title my-4">{name}</h6></Link>
                        <p className="product-text text-danger fw-bold">Price: <span className="text-secondary fw-bold">${price}</span></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductItem;