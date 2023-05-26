import React, {useState} from 'react';
import './assets/bootstrap/css/bootstrap.min.css';
import './assets/css/untitled.css';
import './assets/js/bs-init.js';
import './assets/js/bold-and-bright.js';
import "./S.css"
import {Link} from "react-router-dom";
import {ReactComponent as DeskSvg} from "./assets/img/desk.svg";

import api from './api/api';
import {HeaderComponent} from "./component/headerComponent";
import {FooterComponent} from "./component/footerComponent";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleSubmit = async (event) => {
        event.preventDefault();
        api.post('/api/auth/signIn', {email, password})
            .then((response) => {
                // Store the JWT token in local storage
                localStorage.setItem('token', response.data.token);

                // Redirect to the home page or a protected route
                localStorage.setItem('user', JSON.stringify(response.data.user));
                const user =JSON.parse(localStorage.getItem("user"))

                const isAdmin = user.authorities.some((authority) => authority.authority === "ADMIN");
                console.log(response.data.token)

                if (isAdmin) {
                    window.location.href = '/AdminSpace1';
                }
            })
            .catch((error) => {
                // Handle the error
                console.error(error);
            });
    };
    return (
        <div>
            <HeaderComponent></HeaderComponent>
            <div>
                <main>

                    <div className="container py-md-5">
                        <div className="row d-flex align-items-center">
                            <div className="col-md-6 text-center">

                                <DeskSvg/>

                            </div>

                            <div className="col-md-5 col-xl-4 text-center text-md-start">
                                <h2 className="display-6 fw-bold mb-4"> Login Form</h2>
                                <form method="post" onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="emailInput" className="form-label">Email</label>
                                        <input type="email" className="form-control" name="email" id="emailInput"
                                               placeholder="Email"
                                               onChange={(e) => setEmail(e.target.value)} required/>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="passwordInput" className="form-label">Password</label>
                                        <input type="password" className="form-control" name="password"
                                               id="passwordInput" placeholder="Password"
                                               onChange={(e) => setPassword(e.target.value)} required/>
                                    </div>
                                    <div className="mb-3">
                                        <button className="btn btn-primary shadow d-block w-100" type="submit">Log
                                            in
                                        </button>
                                    </div>
                                    <div className="mb-3">
                                        <div>
                                            <Link to="/ForgotpasswordForm" className="text-muted">Forgot your
                                                password?</Link>
                                        </div>

                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>

                </main>
            </div>
            <FooterComponent></FooterComponent>

        </div>
    );
}

export default Login;
