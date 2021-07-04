import React, { useEffect, useState } from 'react';
import './Testimonials.css'
import ReviewList from '../Testimonials/ReviewList'
import Slider from "react-slick";


const Testimonials = () => {
    const [review, setReview] = useState([])

    useEffect(() => {
        fetch('http://localhost:8000/review')
            .then(res => res.json())
            .then(data => setReview(data))
    }, [])

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 2,
        autoplay: true
    };

    return (
        <div className="bg-light py-5">
            <div className="container">
                <div className="row">
                    <div className="col-12 text-center">
                        <h6>See What Out Clients Say About Us</h6>
                        <h1 className="text-danger">TESTIMONIALS</h1>
                        <Slider {...settings}>
                            {
                                review.map((rev, index) => <ReviewList key={index} rev={rev} />)
                            }
                        </Slider>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Testimonials;