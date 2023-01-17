import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/LandingPage.css'
import { Logging } from "../context/context";

function LandingPage() {
    const navigate = useNavigate();

    const { loggedIn, setLoggedIn } = useContext(Logging)

    function cta() {
        if (!loggedIn) {
            return (
                <><div class="row">
                    <div class="col">
                        <button type="button" class="btn btn-light btn-primary btn-lg" id="btn-login" onClick={() => navigate("/login")}>Hier anmelden</button>
                    </div>
                </div><div class="row">
                        <div class="col">
                            <button type="button" class="btn btn-light btn-primary btn-lg" id="btn-register" onClick={() => navigate("/register")}>Hier registrieren</button>
                        </div>
                    </div></>
            )
        }
    }

    return (
        <main class="container-fluid" id="con-signuppage">
            <div class="row">
                <div class="col">
                    <div class="card card-landing">
                        <img src="https://media.istockphoto.com/id/1328458850/de/foto/frau-kreuzt-artikel-der-einkaufsliste.jpg?s=612x612&w=0&k=20&c=gP1m2LOLJVEgpGIMZON1zMip8UBmdfOZrYzNl556h7s=" class="card-img-top" alt="IMAGE" />
                        <div class="card-body">
                            <h5 class="card-title">Erstelle deine Einkaufsliste</h5>
                        </div>
                    </div>

                </div>
                <div class="col">
                    <div class="card card-landing">
                        <img src="https://media.istockphoto.com/id/1173258771/photo/femalehand-of-planner-writing-daily-appointment.jpg?b=1&s=612x612&w=0&k=20&c=_bOUItixHjJuCDNRLWg7iGezWqf7riqy1zruPAE4P5g=" class="card-img-top" alt="IMAGE" />
                        <div class="card-body">
                            <h5 class="card-title">Plane deine Woche</h5>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card card-landing">
                        <img src="https://thumbs.dreamstime.com/b/kr%C3%A4uter-und-gew%C3%BCrze-f%C3%BCr-das-kochen-auf-dunklem-hintergrund-113655482.jpg" class="card-img-top" alt="IMAGE" />
                        <div class="card-body">
                            <h5 class="card-title">Füge Rezepte direkt deiner Einkaufsliste hinzu</h5>
                        </div>
                    </div>
                </div>
            </div>
            {cta()}
        </main>
    )
}

export default LandingPage