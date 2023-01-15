import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/WelcomePage.css'
import { useNavigate } from "react-router-dom";


function WelcomePage() {
    const navigate = useNavigate();

    return (
        <main class="container-fluid" id="con-signuppage">

            <h1 id="h-welcome">Willkommen!</h1>
            <h3 id="h-cta">Bitte registriere dich oder melde dich mit einem bestehenden Konto ein!</h3>
            <div class="row">
                <div class="col">
                    <button type="button" class="btn btn-light btn-primary btn-lg" id="btn-login" onClick={() => navigate("/login")}>Anmelden</button>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <button type="button" class="btn btn-light btn-primary btn-lg" id="btn-register" onClick={() => navigate("/register")}>Registrieren</button>
                </div>
            </div>
        </main>

    )
}

export default WelcomePage