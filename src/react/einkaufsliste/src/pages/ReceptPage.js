import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/ReceptPage.css'

function ReceptPage() {

    const Recepts = {
        bolgnese: {
            name: "Spaghetti Blognese",
            pic: "https://img.chefkoch-cdn.de/rezepte/772011180069862/bilder/668334/crop-642x428/die-echte-sauce-bolognese.jpg",
            decribtion: "Describtion",
            items: [
                { Olivenöl: { quantity: "50", unit: "Milliliter" } },
                { Zwiebel: { quantity: "1", unit: "Stück" } },
                { Rinderhackfleisch: { quantity: "500", unit: "Gramm" } },
                { Tomaten: { quantity: "400", unit: "Gramm" } },
                { Knoblauchzehe: { quantity: "2", unit: "" } },
                { Spaghetti: { quantity: "500", unit: "Gramm" } },
                { Salz: { quantity: "", unit: "" } },
                { Pfeffer: { quantity: "", unit: "" } }
            ],
        },
        chilli: {
            name: "Chilli con Carne",
            pic: "https://img.chefkoch-cdn.de/rezepte/1578671265353584/bilder/1232237/crop-642x428/chili-con-carne.jpg",
            decribtion: "Describtion",
            items: [
                { Olivenöl: { quantity: "50", unit: "Milliliter" } },
                { Zwiebel: { quantity: "2", unit: "Stück" } },
                { Rinderhackfleisch: { quantity: "500", unit: "Gramm" } },
                { Tomaten: { quantity: "500", unit: "Gramm" } },
                { Mais: { quantity: "200", unit: "Gramm" } },
                { Kidneybohnen: { quantity: "500", unit: "Gramm" } },
                { Knoblauchzehe: { quantity: "1", unit: "" } },
                { Salz: { quantity: "Salz", unit: "" } },
                { Pfeffer: { quantity: "", unit: "" } },
                { Chillipulver: { quantity: "", unit: "" } }
            ],
        },
        pfannekuchen: {
            name: "Pfannekuchen",
            pic: "https://img.chefkoch-cdn.de/rezepte/772011180069862/bilder/668334/crop-642x428/die-echte-sauce-bolognese.jpg",
            decribtion: "Describtion",
            items: [
                { Mehl: { quantity: "500", unit: "Gramm" } },
                { Milch: { quantity: "750", unit: "Milliliter" } },
                { Eier: { quantity: "3", unit: "Stück" } },
                { Butter: { quantity: "200", unit: "Gramm" } },
                { Salz: { quantity: "", unit: "" } },
            ],
        },
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
                                    <a href="#" class="btn btn-light btn-primary">Zum Rezept</a>
                                </div>
                            </div>
                        </div>

                        <div class="col"></div>
                    </div>
                )
            })
        )
    }

    return (
        <main class="container-fluid" id="con-receptPage">
            <div class="row">
                <div class="col"></div>

                <div class="col">
                    <h1>Rezeptwelt</h1>
                </div>

                <div class="col"></div>

                {showRecepts()}
            </div>
        </main>

    )
}

export default ReceptPage