import React, { useEffect } from 'react';
import Banner from '../Banner/Banner';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
import Shop from '../Shop/Shop';
import Testimonials from '../Testimonials/Testimonials';
import Blogs from '../../components/Blogs/Blogs'

const Home = (props) => {

    useEffect(() => {
        window.scrollTo(0, 0)
    },[])

    return (
        <div>
            <Navbar cart={props.cart} />
            <Banner />
            <Shop />
            <Blogs />
            <Testimonials />
            <Footer />
        </div>
    );
};

export default Home;