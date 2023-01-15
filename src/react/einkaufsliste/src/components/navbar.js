import React, { useContext } from "react";
import "./Navbar.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Navbar } from 'react-bootstrap'

import { Link } from "react-router-dom";

import { Logging } from "../context/context";
import { Authentification } from '../context/context';


function Navigation() {

    const { loggedIn, setLoggedIn } = useContext(Logging)
    const { userID, setUserID } = useContext(Authentification)

    function logOut() {
        setLoggedIn(false)
        setUserID("")
    }

    return (


        <Navbar bg="light" expand="lg" id="navbar-normal">
            <container className="container-fluid">
                <Nav className="ms-auto">
                    <Navbar.Brand href="/">THE LIST</Navbar.Brand>
                </Nav>


                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                {loggedIn && userID !="" ?
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Link class="nav-link" to="/">Homepage</Link>
                            <Link class="nav-link" to="/list">Einkaufsliste</Link>
                            <Link class="nav-link" to="/planner">Wochenplaner</Link>
                            <Link class="nav-link" to="/recepts">Rezepte</Link>
                        </Nav>
                        <Nav className="mr-auto">
                                <Nav className="mr-auto"></Nav>
                                {/*<Navbar.Text><a href="#login">Account</a></Navbar.Text>*/}
                                <Link class="nav-link" onClick={() => logOut()}>Ausloggen</Link>
                        </Nav>
                    </Navbar.Collapse>
                    :
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Link class="nav-link" to="/">Homepage</Link>
                            <Link class="nav-link" to="/list">Einkaufsliste</Link>
                            <Link class="nav-link" to="/">Wochenplaner</Link>
                            <Link class="nav-link" to="/">Rezepte</Link>
                        </Nav>
                        <Nav className="mr-auto">
                            <Link class="nav-link" to="/login">Anmelden</Link>
                            <Link class="nav-link" to="/register">Registrieren</Link>
                        </Nav>
                    </Navbar.Collapse>
                }
            </container>
        </Navbar>



    )
}

export default Navigation