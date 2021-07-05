import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../App';
import logo from '../../../images/logo/logo.png'

const DashNavbar = () => {
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);
    const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

    const [loggedIn, setLoggedIn] = useContext(UserContext)
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
        fetch('https://dry-woodland-65414.herokuapp.com/isAdmin', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ email: loggedIn.email })
        })
            .then(res => res.json())
            .then(data => {
                setIsAdmin(data)
            })
    }, [])

    return (
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container">
                <Link class="navbar-brand" to="/">
                    <img src={logo} alt="eShop logo here" style={{ width: "120px" }} />
                </Link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-expanded={!isNavCollapsed ? true : false} aria-label="Toggle navigation" onClick={handleNavCollapse}>
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarNav">
                    <ul class="navbar-nav justify-content-end" style={{ width: "100%" }}>
                        <li class="nav-item">
                            <Link class="nav-link active" aria-current="page" to="/home">Home</Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link active" to="/dashboard">Dashboard</Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link active" to="/orders">Orders</Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link active" to="/review">Review</Link>
                        </li>
                        {
                            isAdmin && <div>
                                <li class="nav-item">
                                    <Link class="nav-link active" to="/orderList">OrderList</Link>
                                </li>
                                <li class="nav-item">
                                    <Link class="nav-link active" to="/makeAdmin">Make-Admin</Link>
                                </li>
                            </div>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default DashNavbar;