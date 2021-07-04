import React, { useEffect } from 'react';
import Banner from '../Banner/Banner';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
import Shop from '../Shop/Shop';
import Testimonials from '../Testimonials/Testimonials';

const Home = (props) => {

    useEffect(() => {
        window.scrollTo(0, 0)
    },[])

    return (
        <div>
            <Navbar cart={props.cart} />
            <Banner />
            <Shop />
            <Testimonials />
            <Footer />
        </div>
    );
};

export default Home;