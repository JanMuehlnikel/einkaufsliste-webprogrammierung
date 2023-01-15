import React, { useContext, useState } from 'react';
import useFetch from "react-fetch-hook";
import { useForm } from "react-hook-form";
import "../css/PlannerPage.css"

import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';

import WelcomePage from './WelcomePage';
import { Logging } from "../context/context";
import { Authentification } from '../context/context';


function PlannerPage() {

    const { loggedIn, setLoggedIn } = useContext(Logging)
    const { userID, setUserID } = useContext(Authentification)

    // add article modal functions
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data => {
        fetch("http://localhost:8080/api/users/planner?" +
            "userID=" + userID +
            "&weekday=" + data.weekday +
            "&plan=" + data.plan,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
            })
            .then(function (res) { window.location.reload() })
            .catch(function (res) { console.log(res) })
    }

    // GET USER ITEMS
    const { isLoading, data, error } = useFetch("http://localhost:8080/api/user/plan/" + userID);


    if (isLoading) {
        return <div>IS loading</div>
    }

    if (error) {
        return <WelcomePage></WelcomePage>
    }



    function showDays() {

        return (


            Object.entries(data).map(([day, plan]) => {

                return (
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroup-sizing-default">{day + ": " + data[day]}</span>
                        </div>
                    </div>
                )
            })
        )
    }

    if (loggedIn
        ) {
        return (
            <main class="container-fluid" id="con-listpage">
                <div class="row">
                    <div class="col"></div>

                    <div class="col">
                        <h1>Wochenplaner</h1>
                    </div>

                    <div class="col"></div>

                </div>
                <div class="container">
                    <div class="row mt-3">
                        <div class="col">

                        </div>

                        <div class="col">
                            {showDays()}
                            <button class="btn btn-lg btn-light btn-primary" id="btn-edit" onClick={handleShow}>Bearbeiten</button>
                        </div>

                        <div class="col">

                        </div>
                    </div>

                    <Modal show={show} onHide={handleClose} animation={false}>

                        <Modal.Header closeButton>
                            <Modal.Title>Gericht hinzufügen</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <form onSubmit={handleSubmit(onSubmit)}>


                                <div class="input-group mb-3">
                                    <select {...register("weekday")} type="text" class="form-control" placeholder="Wochentag" aria-label="Wochentag" aria-describedby="basic-addon1">
                                        <option value="Montag">Montag</option>
                                        <option value="Dienstag">Dienstag</option>
                                        <option value="Mittwoch">Mittwoch</option>
                                        <option value="Donnerstag">Donnerstag</option>
                                        <option value="Freitag">Freitag</option>
                                        <option value="Samstag">Samstag</option>
                                        <option value="Sonntag">Sonntag</option>
                                    </select>
                                </div>

                                <div class="input-group mb-3">
                                    <input {...register("plan")} type="text" class="form-control" placeholder="Gericht" aria-label="Gericht" aria-describedby="basic-addon1" />
                                </div>

                                <button class="w-100 btn btn-light btn-lg btn-primary" id="btn-hinzufügen" type="submit">Gericht jetzt hinzufügen</button>

                            </form>
                        </Modal.Body>

                    </Modal>

                </div>
            </main>

        )
    } else {
        <WelcomePage></WelcomePage>
    }
}

export default PlannerPage