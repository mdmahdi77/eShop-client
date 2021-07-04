import React from 'react';
import logo from '../../images/logo/logo2.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faFacebookF, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import './Footer.css'

const Footer = () => {
    return (
        <div className="bg-dark footer">
            <div className="container py-5">
            <div className="row">
                <div className="col-md-3">
                    <img src={logo} width="250px" alt="" />
                </div>
                <div className="col-md-3">
                    <ul className="text-light part">
                        <li>Home</li>
                        <li>About</li>
                        <li>Login</li>
                        <li>Sign In</li>
                    </ul>
                </div>
                <div className="col-md-3">
                <ul className="text-light part">
                        <li>Get Help</li>
                        <li>Read Faq</li>
                        <li>View all cities</li>
                        <li>Privacy & policy</li>
                    </ul>
                </div>
                <div className="col-md-3">
                <ul className="text-light part d-flex social">
                        <li><FontAwesomeIcon icon={faFacebookF} /></li>
                        <li><FontAwesomeIcon className="mx-3" icon={faLinkedin} /></li>
                        <li><FontAwesomeIcon icon={faGithub} /></li>
                    </ul>
                </div>
            </div>
            </div>
            <p className="text-secondary text-center m-0 pb-2">@copyright design by || Mehedi Hasan</p>
        </div>
    );
};

export default Footer;