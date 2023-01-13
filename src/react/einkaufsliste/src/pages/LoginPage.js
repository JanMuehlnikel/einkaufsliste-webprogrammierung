import React, { useContext, useState } from "react";
import Navigation from '../components/navbar';
import "../css/LoginPage.css"
import { useForm } from "react-hook-form";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Logging } from "../context/context";
import { Authentification } from "../context/context";

function LoginPage() {

    const {loggedIn, setLoggedIn} = useContext(Logging)
    const {userID, setUserID} = useContext(Authentification)

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
                    setUserID(response.auth)
                    setLoginMessage("Erfolgreich angemeldet!")
                    setLoggedIn(true)
                } else {
                    console.log("Login failed1")
                    setLoginMessage("Die Email Adresse oder das Passwort sind falsch!")
                }

            })
            .catch(function (response) { console.log(response) })
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
                        <button type="submit" class="btn btn-light btn-primary">Einloggen</button>
                    </form>
                </div>

                <div class="col"></div>
                    
                {loggedIn ? <h1>LOGGED IN</h1>: <h1>Not loggedIn</h1>}
                <p>{userID}</p>

            </div>
        </main >

    )
}

export default LoginPage