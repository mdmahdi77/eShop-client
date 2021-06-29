import React from 'react';
import Navbar from '../Navbar/Navbar';
import Shop from '../Shop/Shop';

const Home = (props) => {
    return (
        <div>
            <Navbar cart={props.cart} />
            <Shop />
        </div>
    );
};

export default Home;