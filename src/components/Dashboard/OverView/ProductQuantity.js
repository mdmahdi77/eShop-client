import React from 'react';

const ProductQuantity = (props) => {
    const totalQuantity = props.quantity.reduce((total, products) => {
        return (total + products.productQuantity)
    }, 0)
    console.log(totalQuantity)
    
    return (
        <div>
                {/* {
                    props.quantity.map(ttt => <Quantity ttt={ttt} />)
                } */}
        </div>
    );
};

export default ProductQuantity;