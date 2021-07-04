import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartArrowDown } from '@fortawesome/free-solid-svg-icons'
import logo from '../../images/logo/logo.png'
import { useContext } from 'react';
import { UserContext } from '../../App';
import './Navbar.css'

const Navbar = (props) => {
    const [loggedIn, setLoggedIn] = useContext(UserContext)
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);
    const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
    return (
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container">
                <Link class="navbar-brand" to="/">
                    <img src={logo} alt="eShop logo here" style={{width: "120px"}} />
                </Link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-expanded={!isNavCollapsed ? true : false} aria-label="Toggle navigation" onClick={handleNavCollapse}>
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarNav">
                    <ul class="navbar-nav justify-content-end" style={{width:"100%"}}>
                        <li class="nav-item">
                            <Link class="nav-link active" aria-current="page" to="/home">Home</Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link active" to="/shipment"><FontAwesomeIcon icon={faCartArrowDown} /> {props.cart?.length}</Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link active" to="/login">Login</Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link active" to="/">{loggedIn.name}</Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link active" to="/orders">Orders</Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link active" to="/review">Review</Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link active" to="/dashboard">Dashboard</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;