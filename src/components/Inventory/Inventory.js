import React from 'react';
import food from '../../data/foods.json'
import fakeData from '../../fakeData';

const Inventory = () => {
    const data = fakeData
    const handleProducts = () => {
        fetch('http://localhost:8000/addProducts', {
            method: 'POST',
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify(data)
        })
    }
    return (
        <div>
            <button onClick={handleProducts}>click</button>
        </div>
    );
};

export default Inventory;