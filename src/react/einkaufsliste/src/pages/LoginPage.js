import React, { useContext, useState } from "react";
import Navigation from '../components/navbar';
import "../css/LoginPage.css"
import { useForm } from "react-hook-form";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Logging } from "../context/context";
import { Authentification } from "../context/context";
import { useNavigate } from "react-router-dom";

function LoginPage() {

    const {loggedIn, setLoggedIn} = useContext(Logging)
    const {userID, setUserID} = useContext(Authentification)

    const [warnMessage, setLoginMessage] = useState("")

    const navigate = useNavigate();
    
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onLogin = data => {
        fetch("http://localhost:8080/api/login?" +
            "email=" + data.email +
            "&password=" + data.password,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
            })
            .then(res => res.json())
            .then(res => {

                if (res.auth != "error") {
                    setUserID(res.auth)
                    setLoginMessage("Erfolgreich angemeldet!")
                    setLoggedIn(true)
                    navigate("/list")
                } else {
                    setLoginMessage("Die Email Adresse oder das Passwort sind falsch!")
                }

            })
            .catch(function (res) { console.log(res) })
    }

    return (
        <main class="container-fluid" id="con-loginpage">

            <div class="row">
                <div class="col"></div>

                <div class="col">
                    <h1>Anmelden</h1>
                </div>

                <div class="col"></div>

            </div>

            <div class="row">
                <div class="col"></div>

                <div class="col">
                    <form onSubmit={handleSubmit(onLogin)} >
                        <div class="form-group">
                            <label for="input-email">Email Adresse</label>
                            <input {...register("email")} type="email" class="form-control" id="input-email" aria-describedby="emailHelp" placeholder="Email Adresse" />
                        </div>
                        <div class="form-group">
                            <label for="input-password">Passwort</label>
                            <input {...register("password")} type="password" class="form-control" id="input-password" placeholder="Passwort" />
                        </div>
                        <p class="txt-warnMessage">{warnMessage}</p>
                        <button type="submit" class="btn btn-light btn-primary">Einloggen</button>
                    </form>

                </div>

                <div class="col"></div>

            </div>
        </main >

    )
}

export default LoginPage