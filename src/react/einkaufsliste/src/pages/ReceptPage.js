import React, { useContext } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/ReceptPage.css'
import { Logging } from "../context/context";
import { Authentification } from '../context/context';

function ReceptPage() {

    const { loggedIn, setLoggedIn } = useContext(Logging)
    const { userID, setUserID } = useContext(Authentification)
    const Recepts = {
        bolgnese: {
            name: "Spaghetti Blognese",
            pic: "https://img.chefkoch-cdn.de/rezepte/772011180069862/bilder/668334/crop-642x428/die-echte-sauce-bolognese.jpg",
            description: "description",
            items: {
                Olivenöl: { name: "Olivenöl", quantity: "50", unit: "Milliliter" },
                Zwiebel: { name: "Zwiebel", quantity: "1", unit: "Stück" },
                Rinderhackfleisch: { name: "Rinderhackfleisch", quantity: "500", unit: "Gramm" },
                Tomaten: { name: "Tomaten", quantity: "400", unit: "Gramm" },
                Knoblauchzehe: { name: "Knoblauchzehe", quantity: "2", unit: "" },
                Spaghetti: { name: "Spaghetti", quantity: "500", unit: "Gramm" },
                Salz: { name: "Salz", quantity: "", unit: "" },
                Pfeffer: { name: "Pfeffer", quantity: "", unit: "" }
            },
        },
        chilli: {
            name: "Chilli con Carne",
            pic: "https://img.chefkoch-cdn.de/rezepte/1578671265353584/bilder/1232237/crop-642x428/chili-con-carne.jpg",
            description: "description",
            items: {
                Olivenöl: { name: "Olivenöl", quantity: "50", unit: "Milliliter" },
                Zwiebel: { name: "Zwiebel", quantity: "2", unit: "Stück" },
                Rinderhackfleisch: { name: "Rinderhackfleisch", quantity: "500", unit: "Gramm" },
                Tomaten: { name: "Tomaten", quantity: "500", unit: "Gramm" },
                Mais: { name: "Mais", quantity: "200", unit: "Gramm" },
                Kidneybohnen: { name: "Kidneybohnen", quantity: "500", unit: "Gramm" },
                Knoblauchzehe: { name: "Knoblauchzehe", quantity: "1", unit: "" },
                Salz: { name: "Salz", quantity: "Salz", unit: "" },
                Pfeffer: { name: "Pfeffer", quantity: "", unit: "" },
                Chillipulver: { name: "Chillipulver", quantity: "", unit: "" }
            },
        },
        pfannekuchen: {
            name: "Pfannekuchen",
            pic: "https://img.chefkoch-cdn.de/rezepte/1208161226570428/bilder/1435452/crop-642x428/der-perfekte-pfannkuchen-gelingt-einfach-immer.jpg",
            description: "description",
            items: {
                Mehl: { name: "Mehl", quantity: "500", unit: "Gramm" },
                Milch: { name: "Milch", quantity: "750", unit: "Milliliter" },
                Eier: { name: "Eier", quantity: "3", unit: "Stück" },
                Butter: { name: "Butter", quantity: "200", unit: "Gramm" },
                Salz: { name: "Salz", quantity: "", unit: "" },
            },
        },
    }

    function postRecept(receptValues) {

        Object.entries(receptValues["items"]).map(([item, itemValue]) => {
            console.log(itemValue)

            fetch("http://localhost:8080/api/users/items?" +
                "userID=" + userID +
                "&item=" + itemValue["name"] +
                "&quantity=" + itemValue["quantity"] +
                "&unit=" + itemValue["unit"] +
                "&responsible=" + "" +
                "&ticked=false",
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    method: "POST",
                })
                .then(function (res) { window.location.reload() })
                .catch(function (res) { console.log(res) })
        })
    }

    function showRecepts() {
        return (
            Object.entries(Recepts).map(([recept, receptValues]) => {

                return (
                    <div class="row">
                        <div class="col"></div>

                        <div class="col">
                            <div class="card">
                                <img src={receptValues["pic"]} class="card-img-top" alt="..." />
                                <div class="card-body">
                                    <h5 class="card-title">{receptValues["name"]}</h5>
                                    <p class="card-text" id="txt-ingreeds">{showIngredients(receptValues)}</p>

                                    <a href="#" class="btn btn-light btn-primary" onClick={() => postRecept(receptValues)}>Zutaten hinzufügen</a>
                                </div>
                            </div>
                        </div>

                        <div class="col"></div>
                    </div>
                )
            })
        )
    }
    function showIngredients(receptValues) {
        let ingreeds = ""
        Object.entries(receptValues["items"]).map(([item, itemValue]) => {
            ingreeds = ingreeds + itemValue["name"] + " " + itemValue["quantity"] + " " + itemValue["unit"] + " - "
        })
        ingreeds = ingreeds.slice(0, -2)
        return (

            <div>{ingreeds}</div>
        )

    }

    return (
        <main class="container-fluid" id="con-receptPage">
            <div class="row">
                <div class="col"></div>

                <div class="col">
                    <h1 id="header">Rezeptwelt</h1>
                </div>

                <div class="col"></div>

                {showRecepts()}
            </div>
        </main>

    )
}

export default ReceptPage