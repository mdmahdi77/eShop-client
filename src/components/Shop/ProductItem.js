import React from 'react';
import { Link } from 'react-router-dom'

const ProductItem = (props) => {
    const { name, img, price, _id } = props.filPro
    return (
        <div className="col-md-4">
            <div className="container-fluid">
                <div class="card">
                    <img src={img} alt="" />
                    <div className="card-body">
                        <Link to={"/product-details/"+_id}><h5 className="card-title">{name}</h5></Link>
                        <p className="card-text">Price: ${price}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductItem;