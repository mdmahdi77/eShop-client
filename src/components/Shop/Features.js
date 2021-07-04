import React from 'react';

const Features = (props) => {
    const { description, value } = props.fe
    return (
        <div className="my-2">
            <div className="d-flex justify-content-between">
                <div className="d-flex">
                    <h6 className="text-dark fw-bold">{props.index + 1}.</h6>
                    <h6 className="text-dark">{description}</h6>
                </div>
                <h6 className="text-secondary">{value}</h6>
            </div>
        </div>
    );
};

export default Features;