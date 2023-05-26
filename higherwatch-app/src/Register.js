import React, {useEffect, useState} from 'react';
import './assets/bootstrap/css/bootstrap.min.css';
import './assets/css/untitled.css';
import './assets/js/bs-init.js';
import './assets/js/bold-and-bright.js';
import "./S.css"
import {ReactComponent as Reg} from "./assets/img/register.svg";
import { MultiSelect } from "react-multi-select-component";

import {HeaderComponent} from "./component/headerComponent";
import api from './api/api';


function Register() {
    useEffect(() => {
        // Function to execute when the page is loading
        getRoles()
            .then((roles) => {
                setRoles(roles);
            })
            .catch((error) => {
                console.log(error);
            });
        // Example: Log a message
        console.log('Page is loading');

        // Example: Make an API call
        // myApiCall();
    }, []);


    const [rolesS, setRoles] = useState([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setSex] = useState('');
    const [birthDate, setBirthday] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [selectedRoles, setSelectedRole] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        let roles =selectedRoles.map((options)=> options.value)

        api.post('api/auth/signUp',
            {email, password, roles , firstName, lastName, gender, birthDate, address, phone})
            .then((response) => {
                console.log(response.data)
            })
            .catch((error) => {
                // Handle the error
                console.error(error);
            });
    };
    const getRoles = async () => {

        localStorage.getItem("token");
        const response = await api.get('/getRoles');
        return response.data.map(role => ({label:role.name , value:role.name}))
    };

    return (
        <div>
            <HeaderComponent></HeaderComponent>
            <div>
                <main>

                    <div className="container py-md-5">
                        <div className="row d-flex align-items-center">
                            <div className="col-md-6 text-center">

                                <Reg/>

                            </div>

                            <div className="col-md-5 col-xl-4 text-center text-md-start">
                                <h2 className="display-6 fw-bold mb-4"> Registration Form</h2>
                                <form method="post" onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="firstNameInput" className="form-label">First Name</label>
                                        <input type="text" className="form-control" name="firstName" id="firstNameInput"
                                               onChange={(e) => setFirstName(e.target.value)}
                                               placeholder="First Name" required/>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="lastNameInput" className="form-label">Last Name</label>
                                        <input type="text" className="form-control" name="lastName" id="lastNameInput"
                                               onChange={(e) => setLastName(e.target.value)}
                                               placeholder="Last Name" required/>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="emailInput" className="form-label">Email</label>
                                        <input type="email" className="form-control" name="email" id="emailInput"
                                               onChange={(e) => setEmail(e.target.value)}
                                               placeholder="Email" required/>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="passwordInput" className="form-label">Password</label>
                                        <input type="password" className="form-control" name="password"
                                               onChange={(e) => setPassword(e.target.value)}
                                               id="passwordInput" placeholder="Password" required/>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="sexInput" className="form-label">Sex</label>
                                        <select className="form-select" name="sex" id="sexInput"
                                                onChange={(e) => setSex(e.target.value)} required>
                                            <option value="">--Select Sex--</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                        </select>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="birthdayInput" className="form-label">Birthday</label>
                                        <input type="date" className="form-control" name="birthday" id="birthdayInput"
                                               onChange={(e) => setBirthday(e.target.value)}
                                               required/>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="addressInput" className="form-label">Address</label>
                                        <textarea className="form-control" name="address" id="addressInput"
                                                  onChange={(e) => setAddress(e.target.value)}
                                                  required></textarea>
                                    </div>


                                    <div className="mb-3">
                                        <label htmlFor="phoneInput" className="form-label">Phone</label>
                                        <input type="tel" className="form-control" name="phone" id="phoneInput"
                                               onChange={(e) => setPhone(e.target.value)}
                                               required/>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="addressInput" className="form-label">Select Role:</label>
                                        <pre>{JSON.stringify(selectedRoles)}</pre>
                                        <MultiSelect  options={rolesS}
                                                      value={selectedRoles}
                                                      onChange={setSelectedRole}
                                                      labelledBy='value'
                                        ></MultiSelect>

                                    </div>


                                    <div className="mb-3">
                                        <button className="btn btn-primary shadow d-block w-100" type="submit">Register
                                        </button>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>

                </main>
            </div>
            <footer>
                <div className="footer-down" style={{marginBottom: "0px", marginTop: "0px"}}>
                    <div className="text-muted d-flex justify-content-between align-items-center pt-3">
                        <p className="mb-0">Copyright © 2023 HigherWatch</p>
                        <ul className="list-inline mb-0">
                            <li className="list-inline-item">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor"
                                     viewBox="0 0 16 16" className="bi bi-facebook">
                                    <path
                                        d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"></path>
                                </svg>
                            </li>
                            <li className="list-inline-item">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor"
                                     viewBox="0 0 16 16" className="bi bi-twitter">
                                    <path
                                        d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"></path>
                                </svg>
                            </li>
                            <li className="list-inline-item">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor"
                                     viewBox="0 0 16 16" className="bi bi-instagram">
                                    <path
                                        d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"></path>
                                </svg>
                            </li>
                        </ul>
                    </div>
                </div>
            </footer>


        </div>
    );
}

export default Register;
