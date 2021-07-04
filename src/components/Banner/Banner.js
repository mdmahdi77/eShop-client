import React from 'react';
import './Banner.css'

const Banner = () => {
    return (
        <div className="banner">
            <div className="container py-5">
                <div className="row">
                    <div className="col-12 text-center">
                        <h1 className="banner-header my-5 text-light">eShop is always by your side</h1>
                        <h6 className="banner-header-2 text-info">We are ready to give any support to buy the product</h6>
                        <p className="banner-shop mt-5">shop now</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;