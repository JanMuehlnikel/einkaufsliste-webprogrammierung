import React from "react";
import "./Navbar.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Navbar } from 'react-bootstrap'

import { Link } from "react-router-dom";


function Navigation() {

    return (
            <Navbar bg="light" expand="lg" id="navbar-normal">
            <container className="container-fluid">
                <Nav className="ms-auto">
                    <Navbar.Brand  href="/">THE LIST</Navbar.Brand>
                </Nav>


                <Navbar.Toggle aria-controls="basic-navbar-nav" />
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
                </container>
            </Navbar>



    )
}

export default Navigation