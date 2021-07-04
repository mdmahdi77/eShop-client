import React from 'react';
import './Testimonials.css'

const ReviewList = (props) => {

    const { name, title, desc } = props.rev

    return (
        <div className="col-md-12">
            <div className="my-5 test-bg">
                <p className="px-3 text-muted">{desc}</p>
                <h3 className="">{name}</h3>
                <h6 className="text-secondary">{title}</h6>
            </div>
        </div>
    );
};

export default ReviewList;