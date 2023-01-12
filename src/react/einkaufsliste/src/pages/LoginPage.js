import React from "react";
import Navigation from '../components/navbar';
import "../css/LoginPage.css"
import { useForm } from "react-hook-form";

function LoginPage() {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onLogin = data => {
        console.log(data.email)
        console.log(data.password)
    }

    return (
        <main class="container-fluid" id="con-listpage">
            <Navigation></Navigation>
            <div class="row">
                <div class="col"></div>

                <div class="col">
                    <h1>Anmeldung</h1>
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

            </div>
        </main >

    )
}

export default LoginPage