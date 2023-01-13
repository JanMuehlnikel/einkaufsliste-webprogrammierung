import React, { useState } from "react";
import Navigation from '../components/navbar';
import "../css/LoginPage.css"
import { useForm } from "react-hook-form";
import 'bootstrap/dist/css/bootstrap.min.css';
import Toast from 'react-bootstrap/Toast';

function LoginPage() {
    const [authentification, setAuth] = useState("")
    const [loginMessage, setLoginMessage] = useState("")
    

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onLogin = data => {
        fetch("https://8080-janmuehlnik-einkaufslis-o4z085hqnla.ws-eu82.gitpod.io/api/login?" +
            "email=" + data.email +
            "&password=" + data.password,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
            })
            .then(response => response.json())
            .then(response => {

                if (response.auth != "error") {
                    console.log("Successful Login!")
                    setAuth(response.auth)
                    setLoginMessage("Erfolgreich angemeldet!")
                } else {
                    console.log("Login failed1")
                    setLoginMessage("Die Email Adresse oder das Passwort sind falsch!")
                }

            })
            .catch(function (response) { console.log(response) })
    }

    function failed(){
        return (
            <h1>failed</h1>
        )
    }
    return (
        <main class="container-fluid" id="con-loginpage">

            <Navigation></Navigation>
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
                        <button type="submit" class="btn btn-light btn-primary">Einloggen</button>
                    </form>
                </div>

                <div class="col"></div>

                <p>{loginMessage}</p>

            </div>
        </main >

    )
}

export default LoginPage