import React, { useEffect, useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../Login/firebase.config'
import './Login.css'
import { useHistory, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../App';
import google from '../../images/google.png'
import logo from '../../images/logo/logo2.png'

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig)
}

const Login = () => {


    const [newUser, setNewUser] = useState(false)
    const [user, setUser] = useState({
        isSignIn: false,
        name: '',
        email: '',
        password: '',
        error: '',
        success: ''
    })

    const [loggedIn, setLoggedIn] = useContext(UserContext)

    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const handleBlur = (e) => {
        console.log(e.target.value)
        let isFieldValid = true
        if (e.target.name === "email") {
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value)
            console.log(isFieldValid)
        }
        if (e.target.name === "password") {
            const isPasswordValid = e.target.value.length > 6
            const passwordHasNumber = /\d{1,}/.test(e.target.value)
            isFieldValid = (isPasswordValid && passwordHasNumber)
            console.log(isFieldValid)
        }
        if (isFieldValid) {
            const newUserInfo = { ...user }
            newUserInfo[e.target.name] = e.target.value
            setUser(newUserInfo)
        }
    }

    const handleSubmit = (e) => {
        if (newUser && user.email && user.password) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const newUserInfo = { ...user }
                    newUserInfo.error = ''
                    newUserInfo.success = true
                    setUser(newUserInfo)
                    setLoggedIn(newUserInfo)
                    updateUserName()
                    history.replace(from);
                })
                .catch((error) => {
                    const newUserInfo = { ...user }
                    newUserInfo.error = error.message
                    newUserInfo.success = false
                    setUser(newUserInfo)
                });
        }
        if (!newUser && user.email && user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const newUserInfo = { ...user }
                    newUserInfo.error = ''
                    newUserInfo.success = true
                    setUser(newUserInfo)
                    setLoggedIn(newUserInfo)
                    history.replace(from);
                })
                .catch((error) => {
                    const newUserInfo = { ...user }
                    newUserInfo.error = error.message
                    newUserInfo.success = false
                    setUser(newUserInfo)
                });
        }
        console.log(user)
        e.preventDefault()
        e.target.reset()
    };


    const updateUserName = (name) => {
        const user = firebase.auth().currentUser;

        user.updateProfile({
            displayName: name
        }).then(() => {
            console.log("Updated successfully")
        }).catch((error) => {
            console.log(error)
        });
    }

    const handleGoogleSignIn = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                const { displayName, email } = result.user;
                const signInUser = {
                    name: displayName,
                    email: email,
                    password: '',
                    isSignIn: true
                }
                setUser(signInUser)
                setLoggedIn(signInUser)
                history.replace(from);
            }).catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                console.log(errorCode, errorMessage, email)
            });
    }


    return (
        <div className="container my-5 login-area">
            <div className="row">
                <div className="col-12">
                    <div className="text-center">
                        <img src={logo} alt="" />
                    </div>
                    {newUser ?
                        <form onSubmit={handleSubmit}>
                            <div className="form-group my-4">
                                <input onBlur={handleBlur} className="form-control" type="text" name="name" required placeholder="Your Name" />
                            </div>
                            <div className="form-group my-4">
                                <input onBlur={handleBlur} className="form-control" type="email" name="email" required placeholder="Email" />
                            </div>
                            <div className="form-group my-4">
                                <input onBlur={handleBlur} className="form-control" type="password" name="password" required placeholder="Password" />
                            </div>
                            <div className="form-group my-4">
                                <button className="form-control btn bg-danger text-light fw-bolder" type="submit">Submit</button>
                            </div>
                            <p className="text-dark text-center fw-bold" onClick={() => setNewUser(!newUser)}>Already have an account? <span style={{ cursor: 'pointer' }} className="text-danger fw-bold">Sign In</span></p>
                        </form>
                        :
                        <form onSubmit={handleSubmit}>
                            <div className="form-group my-4">
                                <input onBlur={handleBlur} className="form-control" type="email" name="email" required placeholder="Email" />
                            </div>
                            <div className="form-group my-4">
                                <input onBlur={handleBlur} className="form-control" type="password" name="password" required placeholder="Password" />
                            </div>
                            <div className="form-group my-4">
                                <button className="form-control btn bg-danger text-light fw-bolder" type="submit">Submit</button>
                            </div>
                            <p className="text-dark text-center fw-bold" onClick={() => setNewUser(!newUser)}>Don't have an account? <span style={{ cursor: 'pointer' }} className="text-success fw-bold">create an account</span></p>
                        </form>
                    }
                    <p className="text-danger text-center">{user.error}</p>
                    {
                        user.success && <p className="text-success text-center">User {newUser ? 'create in' : 'logged in'} successfully</p>
                    }

                    <h6 className="text-center my-4">or</h6>
            
                    <div className="google text-center">
                        <img src={google} alt="" />
                        <button onClick={handleGoogleSignIn}>google sign in</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;