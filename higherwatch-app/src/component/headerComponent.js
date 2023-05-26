import {Link} from "react-router-dom";
import React from "react";
import '../assets/bootstrap/css/bootstrap.min.css';
import '../assets/css/untitled.css';
import '../assets/js/bs-init.js';
import '../assets/js/bold-and-bright.js';

export function HeaderComponent() {
    const user =JSON.parse(localStorage.getItem("user"));
    const logout = () => {

        localStorage.removeItem("user");
        localStorage.removeItem("token");
        window.location.assign("/")
    }

    return <header className="HWP bg-info-light" >
        <nav className="navbar navbar-light navbar-expand-md sticky-top navbar-shrink py-3" id="mainNav">
            <div className="container">
                <button data-bs-toggle="collapse" className="navbar-toggler" data-bs-target="#navcol-1"><span
                    className="navbar-toggler-icon"></span></button>
                <div className="collapse navbar-collapse" id="navcol-1">
                    <img src={require("../assets/img/hw5.png")} alt={'logo'} className="hw"/>

                    <ul className="navbar-nav mx-auto">
                        <Link to="/" className="nav-link">Home</Link>
                        <li className="nav-item"><a className="nav-link" href="services.html">Services</a></li>
                        <li className="nav-item"><a className="nav-link" href="projects.html">Projects</a></li>
                        <li className="nav-item"></li>
                        <li className="nav-item"><a className="nav-link" href="contacts.html">Contacts</a></li>
                    </ul>
                    {user ? (
                        <>
                            <h6>{user.firstName} {user.lastName} </h6>
                            <Link to="/" className="btn btn-primary shadow" role="button"
                                  style={{marginLeft: '50px', marginRight: '54px'}}
                                  onClick={logout}>
                                Log-out
                            </Link>
                        </>) : (
                        <Link to="/login" className="btn btn-primary shadow" role="button"
                              style={{marginLeft: '50px', marginRight: '54px'}}>
                            Log-in
                        </Link>
                    )
                    }


                </div>
            </div>
        </nav>
    </header>;
}


